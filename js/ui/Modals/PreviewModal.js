/**
 * Класс PreviewModal
 * Используется как обозреватель загруженный файлов в облако
 */
class PreviewModal extends BaseModal {
    static DomElement;

    constructor(element) {
        super(element);
        // console.log(element)
        PreviewModal.DomElement = element[0];
        this.SemanticElement = element;
        this.showImages = this.showImages.bind(this)
        this.registerEvents();
    }

    /**
     * Добавляет следующие обработчики событий:
     * 1. Клик по крестику на всплывающем окне, закрывает его
     * 2. Клик по контроллерам изображения:
     * Отправляет запрос на удаление изображения, если клик был на кнопке delete
     * Скачивает изображение, если клик был на кнопке download
     */
    registerEvents() {
        PreviewModal.DomElement.querySelector(".x").addEventListener('click', (e) => {
            App.getModal("filePreviewer").close();
        })

        PreviewModal.DomElement.querySelector('.content').addEventListener("click", (e) => {
            if (e.target.tagName.toLowerCase() === "button") {
                if (e.target.classList.contains("delete")) {
                    e.target.querySelector('i').classList.add('icon', 'spinner', 'loading');
                    e.target.classList.add('disabled');

                    function callback(result) {
                        if (result == null) {
                            const imagePreviewContainer = e.target.closest(".image-preview-container");
                            imagePreviewContainer.remove()
                        }
                        // console.log(result)
                    }

                    Yandex.removeFile(e.target.dataset.path, callback)

                }
                if (e.target.classList.contains("download")) {
                    Yandex.downloadFileByUrl(e.target.dataset.file);
                }
            }
        })
    }


    /**
     * Отрисовывает изображения в блоке всплывающего окна
     */
    showImages(data) {
        const loading = PreviewModal.DomElement.querySelector('.loading')

        const items = data.items;

        const values = Object.entries(items).reverse()
        let itemsToDraw = []

        values.forEach((value) => {
            let val = value[1];
            let item = {
                'picturePath': val.sizes[0]['url'],
                'name': val.name,
                'created': val.created,
                'size': parseFloat((val.size / 1024).toFixed(2)),
                'path': val.path,
                'file': val.file
            }
            itemsToDraw.push(this.getImageInfo(item))
        })
        PreviewModal.DomElement.querySelector('.content').innerHTML = itemsToDraw.join()
    }

    /**
     * Форматирует дату в формате 2021-12-30T20:40:02+00:00(строка)
     * в формат «30 декабря 2021 г. в 23:40» (учитывая временной пояс)
     * */
    formatDate(date) {
        let dateString = "2022-08-08T15:54:51+00:00";
        let newDate = new Date(date);
        let options = {year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric"};

        return newDate.toLocaleString('ru-RU', options);


    }

    /**
     * Возвращает разметку из изображения, таблицы с описанием данных изображения и кнопок контроллеров (удаления и скачивания)
     */
    getImageInfo(item) {
        const div = document.createElement('div')
        const divImagePreviewContainer = document.createElement('div');
        divImagePreviewContainer.classList.add('image-preview-container');
        const img = document.createElement('img');
        img.src = item["picturePath"];
        divImagePreviewContainer.appendChild(img);
        const table = document.createElement('table');
        table.classList.add('ui', 'celled', 'table');
        divImagePreviewContainer.appendChild(table);
        const thead = document.createElement('thead');
        table.appendChild(thead);
        const trHead = document.createElement('tr');
        const thHeadName = document.createElement('th');
        thHeadName.innerText = 'Имя';
        const thHeadCreated = document.createElement('th');
        thHeadCreated.innerText = 'Создано';
        const thHeadSize = document.createElement('th');
        thHeadSize.innerText = 'Размер';
        trHead.appendChild(thHeadName);
        trHead.appendChild(thHeadCreated);
        trHead.appendChild(thHeadSize);
        thead.appendChild(trHead);
        const tbody = document.createElement('tbody')
        const trBody = document.createElement('tr')

        const tdBodyName = document.createElement('td');
        tdBodyName.innerText = item['name'];
        const tdBodyCreated = document.createElement('td');
        tdBodyCreated.innerText = this.formatDate(item['created']);
        // tdBodyCreated.innerText = item['created'];
        const tdBodySize = document.createElement('td');
        tdBodySize.innerText = item['size'];
        trBody.appendChild(tdBodyName);
        trBody.appendChild(tdBodyCreated);
        trBody.appendChild(tdBodySize);
        tbody.appendChild(trBody);
        table.appendChild(tbody);
        divImagePreviewContainer.appendChild(table);
        const divButtonsWrapper = document.createElement('div');
        divButtonsWrapper.classList.add('buttons-wrapper')
        // доделать блок с кнопками
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add("ui", "labeled", "icon", "red", "basic", 'button', 'delete')
        deleteBtn.dataset["path"] = item.path
        const deleteBtnI = document.createElement('i')
        deleteBtnI.classList.add("trash", "icon")
        deleteBtn.innerHTML = "Удалить" + deleteBtnI.outerHTML

        const downloadBtn = document.createElement("button")
        downloadBtn.classList.add("ui", "labeled", "icon", "red", "basic", 'button', 'download')
        downloadBtn.dataset["file"] = item.file
        const downloadBtnI = document.createElement('i')
        downloadBtnI.classList.add("download", "icon")

        downloadBtn.innerHTML = "Скачать" + downloadBtnI.outerHTML
        divButtonsWrapper.appendChild(deleteBtn)
        divButtonsWrapper.appendChild(downloadBtn)
        divImagePreviewContainer.appendChild(divButtonsWrapper);

        div.appendChild(divImagePreviewContainer)

        let arrayFromDiv = Array.from(div.childNodes); // преобразуем содержимое div в массив узлов
        let stringFromDiv = arrayFromDiv.map(node => node.outerHTML).join(''); // объединяем содержимое массива в строку

        return String(stringFromDiv);
    }
}
