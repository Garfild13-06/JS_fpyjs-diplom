/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
    static element;
    static imagesList;
    static previewBlock;

    constructor(element) {
        ImageViewer.element = element;
        ImageViewer.imagesList = element.querySelector(".images-list");
        ImageViewer.previewBlock = element.querySelectorAll(".wide")[1].querySelector(".image");
        this.registerEvents();
    }

    /**
     * Добавляет следующие обработчики событий:
     * 1. Клик по изображению меняет класс активности у изображения
     * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
     * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
     * Добавляет или удаляет класс активности у всех изображений
     * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
     * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
     */
    registerEvents() {
        ImageViewer.imagesList.addEventListener("dblclick", (e) => {
            if (e.target.tagName.toLowerCase() === 'img') {
                ImageViewer.previewBlock.src = e.target.src;
            }
        })

        ImageViewer.imagesList.addEventListener("click", (e) => {
            if (e.target.tagName.toLowerCase() === "img") {
                e.target.classList.toggle('selected');
                this.checkButtonText()
            }
            if (e.target.tagName.toLowerCase() === "button") {
                if (e.target.classList.contains('select-all')) {
                    const images = ImageViewer.imagesList.querySelectorAll("img");
                    let justOneSelected = false;
                    for (let i = 0; i < images.length; i++) {
                        if (images[i].classList.contains('selected')) {
                            justOneSelected = true;
                            break;
                        }
                    }
                    if (justOneSelected) {
                        images.forEach((image) => {
                            image.classList.remove("selected");
                            this.checkButtonText()
                        })
                    } else {
                        images.forEach((image) => {
                            image.classList.add("selected");
                            this.checkButtonText()
                        })
                    }
                }
                if (e.target.classList.contains('show-uploaded-files')) {
                    const filePreviewer = App.getModal('filePreviewer');
                    // console.log(filePreviewer)
                    filePreviewer.open();
                    Yandex.getUploadedFiles(filePreviewer.showImages);
                }
                if (e.target.classList.contains('send')) {
                    const fileUploader = App.getModal('fileUploader');
                    fileUploader.innerHTML = '<i class="asterisk loading icon massive"></i>';
                    const allImages = ImageViewer.imagesList.querySelectorAll('img');
                    let selectedImages = []
                    allImages.forEach((image) => {
                        if (image.classList.contains('selected')) {
                            selectedImages.push(image.src);
                        }
                    })
                    fileUploader.open()
                    fileUploader.showImages(selectedImages)
                }
            }
        })
    }

    /**
     * Очищает отрисованные изображения
     */
    clear() {
        const images = ImageViewer.imagesList.querySelectorAll(".image-wrapper")
        images.forEach((image) => {
            image.parentNode.removeChild(image);
        })

    }

    /**
     * Отрисовывает изображения.
     */
    drawImages(images) {
        // console.log(images)
        if (images.length > 0) {
            const grid = ImageViewer.imagesList.querySelector(".grid");
            images.forEach((image) => {
                const div = document.createElement("div");
                const img = document.createElement("img");
                img.src = image;
                div.classList.add("four", "wide", "column", "ui", "medium", "image-wrapper");
                div.appendChild(img);
                grid.appendChild(div);
            });
            ImageViewer.imagesList.querySelector(".select-all").classList.remove("disabled");
        } else {
            ImageViewer.imagesList.querySelector(".select-all").classList.add("disabled");
        }
    }

    /**
     * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
     */
    checkButtonText() {
        const images = ImageViewer.imagesList.querySelectorAll("img");
        const selectAllBtn = ImageViewer.imagesList.querySelector(".select-all");
        const sendBtn = ImageViewer.imagesList.querySelector(".send");
        let allSelected = true;
        for (let i = 0; i < images.length; i++) {
            if (!images[i].classList.contains('selected')) {
                allSelected = false;
                break;
            }
        }
        if (ImageViewer.imagesList.querySelectorAll(".selected").length > 0) {
            sendBtn.classList.remove("disabled");
        } else {
            sendBtn.classList.add("disabled");
        }
        if (allSelected) {
            selectAllBtn.innerText = "Снять выделение";
        } else {
            selectAllBtn.innerText = "Выбрать всё";
        }
    }

}