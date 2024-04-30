/**
 * Класс SearchBlock
 * Используется для взаимодействия со строкой ввода и поиска изображений
 * */
class SearchBlock {
    static searchElement;
    static images = null;

    constructor(element) {
        this.searchBlock = element;
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

        SearchBlock.searchElement.querySelector('.replace').addEventListener('click', () => {
            const vkId = SearchBlock.searchElement.getElementsByTagName('input')[0].value;
            if (vkIdCheck(vkId)) {
                VK.get(vkId, get_callback);
                setTimeout(() => {
                    App.imageViewer.clear();
                    App.imageViewer.drawImages(SearchBlock.images);
                }, 1000);
            }
        })
        SearchBlock.searchElement.querySelector('.add').addEventListener('click', () => {
            const vkId = SearchBlock.searchElement.getElementsByTagName('input')[0].value;
            SearchBlock.searchElement.getElementsByTagName('input')[0].value;
            if (vkIdCheck(vkId)) {
                VK.get(vkId, get_callback);
                setTimeout(() => {
                    App.imageViewer.drawImages(SearchBlock.images);
                }, 1000);
            }
        })
    }
}