/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (options = {}) => {
    const headers = options.headers;

    const xhr = new XMLHttpRequest();
    try {
        xhr.open(options.method, options.url, true);
    } catch (err) {
        console.error(err);
    }
    for (let key in headers) {
        xhr.setRequestHeader(key, headers[key]);
    }
    xhr.responseType = 'json';
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Здесь можно обработать ответ и получить информацию
            options.callback(xhr.response);
        } else {
            console.log("Ошибка: " + xhr.status);
        }
    };
    try {
        xhr.send();
    } catch (err) {
        console.error(err);
    }
};
