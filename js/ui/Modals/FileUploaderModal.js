/**
 * Класс FileUploaderModal
 * Используется как всплывающее окно для загрузки изображений
 */
class FileUploaderModal extends BaseModal {
    static DomElement;

    constructor(element) {
        super(element);
        FileUploaderModal.DomElement = element[0];
        this.SemanticElement = element;
        this.registerEvents();

    }

    open() {
        super.open();
    }

    /**
     * Добавляет следующие обработчики событий:
     * 1. Клик по крестику на всплывающем окне, закрывает его
     * 2. Клик по кнопке "Закрыть" на всплывающем окне, закрывает его
     * 3. Клик по кнопке "Отправить все файлы" на всплывающем окне, вызывает метод sendAllImages
     * 4. Клик по кнопке загрузке по контроллерам изображения:
     * убирает ошибку, если клик был по полю вода
     * отправляет одно изображение, если клик был по кнопке отправки
     */
    registerEvents() {
        FileUploaderModal.DomElement.querySelector(".x").addEventListener('click', (e) => {
            App.getModal("fileUploader").close();
        })
        FileUploaderModal.DomElement.querySelector('.actions').addEventListener("click", (e) => {
            if (e.target.classList.contains("close")) {
                App.getModal("fileUploader").close();
            }
            if (e.target.classList.contains("send-all")) {
                this.sendAllImages()
            }
        })
        FileUploaderModal.DomElement.querySelector('.content').addEventListener('click', (e) => {
            if (e.target.classList.contains('button') || e.target.parentNode.classList.contains('button')) {
                this.sendImage(e.target.closest('.image-preview-container'))
            }
            if (e.target.classList.contains('input')) {
                e.target.classList.remove('error')
            }
        })
    }

    /**
     * Отображает все полученные изображения в теле всплывающего окна
     */
    showImages(images) {
        let itemsToDraw = []
        images.reverse().forEach((image) => {
            itemsToDraw.push(this.getImageHTML(image))
        })
        FileUploaderModal.DomElement.querySelector('.content').innerHTML = itemsToDraw.join()
    }

    /**
     * Формирует HTML разметку с изображением, полем ввода для имени файла и кнопкой загрузки
     */
    getImageHTML(item) {
        const div = document.createElement('div')
        const divImagePreviewContainer = document.createElement('div');
        divImagePreviewContainer.classList.add("image-preview-container");
        const img = document.createElement('img');
        img.src = item;
        const divInput = document.createElement("div");
        divInput.classList.add('ui', 'action', 'input');
        const inputText = document.createElement('input');
        inputText.type = 'text';
        inputText.placeholder = 'Путь к файлу';
        const btn = document.createElement('button');
        btn.classList.add('ui', 'button');
        const btnIcon = document.createElement('i');
        btnIcon.classList.add('upload', 'icon');
        btn.innerHTML = btnIcon.outerHTML

        divInput.appendChild(inputText);
        divInput.appendChild(btn);
        divImagePreviewContainer.appendChild(img);
        divImagePreviewContainer.appendChild(divInput);
        div.appendChild(divImagePreviewContainer)

        let arrayFromDiv = Array.from(div.childNodes); // преобразуем содержимое div в массив узлов
        let stringFromDiv = arrayFromDiv.map(node => node.outerHTML).join(''); // объединяем содержимое массива в строку

        return String(stringFromDiv);
    }

    /**
     * Отправляет все изображения в облако
     */
    sendAllImages() {
        let images = FileUploaderModal.DomElement.querySelector('.content').querySelectorAll('.image-preview-container')
        images.forEach((image) => {
            this.sendImage(image);
        })
    }

    /**
     * Валидирует изображение и отправляет его на сервер
     */
    sendImage(imageContainer) {
        // console.log(imageContainer)
        const path = imageContainer.querySelector('input')
        if (path.value === '') {
            path.parentNode.classList.add('error');
        } else {
            const url = imageContainer.querySelector('img').src;

            function callback(result) {
                if (result['status'] === 'success') {
                    imageContainer.remove();
                    setTimeout((e) => {
                        if (FileUploaderModal.DomElement.querySelector('.content').querySelectorAll('.image-preview-container').length === 0) {
                            App.getModal("fileUploader").close();
                        }
                    }, 1000)
                } else {
                    console.log(result);
                }
            }

            Yandex.uploadFile(path.value, url, callback);
        }
    }
}