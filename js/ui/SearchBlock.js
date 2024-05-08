/**
 * Класс SearchBlock
 * Используется для взаимодействия со строкой ввода и поиска изображений
 * */
class SearchBlock {
    static searchElement;
    static images = null;

    constructor(element) {
        // console.log(element)
        SearchBlock.searchElement = element;
        this.registerEvents();
    }

    /**
     * Выполняет подписку на кнопки "Заменить" и "Добавить"
     * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
     * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
     */
    registerEvents() {
        function vkIdCheck(vkId) {
            if (vkId == '') {
                return false;
            } else {
                return true;
            }
        }

        function get_callback(args) {
            SearchBlock.images = args;
        }

        SearchBlock.searchElement.addEventListener('click', (e) => {
            if (e.target.tagName.toLowerCase() === "button") {
                const vkId = SearchBlock.searchElement.getElementsByTagName('input')[0].value;
                if (vkIdCheck(vkId)) {
                    if (e.target.classList.contains('replace')) {
                        App.imageViewer.clear();
                    }
                    // if (e.target.classList.contains('add')) {
                    // }
                    VK.get(vkId, get_callback);
                    setTimeout(() => {
                        App.imageViewer.drawImages(SearchBlock.images);
                    }, 1000);
                }
            }
        })

    }
}