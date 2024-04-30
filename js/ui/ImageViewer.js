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
        ImageViewer.previewBlock = element.querySelector(".wide");
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
            const target = e.target;
            if (target.tagName.toLowerCase() == "img") {

            }
        })
        ImageViewer.imagesList.addEventListener("click", (e) => {
            const target = e.target;
            if (target.tagName.toLowerCase() == "img") {

            }
        })
    }

    /**
     * Очищает отрисованные изображения
     */
    clear() {
        // console.log("clear");
        const images = ImageViewer.imagesList.querySelectorAll("img")
        images.forEach((image) => {
            image.parentNode.removeChild(image);
        })

    }

    /**
     * Отрисовывает изображения.
     */
    drawImages(images) {
        // console.log("drawImages")
        const grid = ImageViewer.imagesList.querySelector(".grid")
        images.forEach((image) => {
            const img = document.createElement("img")
            img.src = image
            img.classList.add("four", "wide", "column", "ui", "medium", "image-wrapper")
            grid.appendChild(img)
        })
    }

    /**
     * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
     */
    checkButtonText() {

    }

}