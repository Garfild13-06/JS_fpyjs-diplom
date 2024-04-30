class VK {

    static ACCESS_TOKEN = '958eb5d439726565e9333aa30e50e0f937ee432e927f0dbd541c541887d919a7c56f95c04217915c32008';
    static accessToken = '2c54105f2c54105f2c54105f3e2f47a0ef22c542c54105f48166eddc6cf300374d04e18'
    static apiVersion = '5.199'
    static apiMethod = 'photos.get'
    static lastCallback;

    /**
     * Получает изображения
     * */
    static get(id = '', callback) {
        // п.1
        VK.lastCallback = callback;
        // п.2
        const script = document.createElement('script');
        script.id = 'vkSrc';
        // п.3
        script.src = `https://api.vk.com/method/${VK.apiMethod}?owner_id=${id}&access_token=${VK.accessToken}&v=${VK.apiVersion}&album_id=profile&callback=handleResponse`;
        // получаем данные через элемент script из источникав теге script
        window['handleResponse'] = function (data) {
            VK.processData(JSON.stringify(data));
        };
        //добавляем созданный элемент script в тело страницы
        document.body.appendChild(script);
    }

    /**
     * Передаётся в запрос VK API для обработки ответа.
     * Является обработчиком ответа от сервера.
     */
    static processData(result) {
        //находим элемент script на странице
        const scriptVK = document.getElementById("vkSrc");
        try {
            document.body.removeChild(scriptVK);
        } catch (e) {
            alert(e);
        }
        // обрабатываем ответ, полученный в функции get, ищем самые больше изображения. Они, как правило последние в массиве
        const items = JSON.parse(result).response.items;
        const photos = [];
        items.forEach((item) => {
            photos.push(item.sizes[item.sizes.length - 1].url);
        })

        this.lastCallback(photos)
        this.lastCallback = () => {
        }
    }
}
