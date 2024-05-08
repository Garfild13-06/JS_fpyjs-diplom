/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
    static HOST = 'https://cloud-api.yandex.net/v1/disk';

    /**
     * Метод формирования и сохранения токена для Yandex API
     */
    static getToken() {
        if (localStorage.getItem('yandexToken') == null || localStorage.getItem('yandexToken') == "null") {
            const yandexToken = prompt('Ваш Yandex Token:');
            if (yandexToken != '') {
                localStorage.setItem('yandexToken', yandexToken);
                return yandexToken;
            } else {
                alert("Токен не может быть пустым");
                this.getToken();
            }
        } else {
            return localStorage.getItem('yandexToken');
        }
    }

    /**
     * Метод загрузки файла в облако
     */
    static uploadFile(path, url, callback) {
        const newUrl = this.HOST + '/resources/upload?path=' + path + '&url=' + encodeURIComponent(url);
        createRequest({
            method: 'POST',
            url: newUrl,
            headers: {
                'Authorization': `OAuth ${this.getToken()}`, 'Accept': 'application/json'
            },
            callback: (response, err) => {
                setTimeout(() => {
                    createRequest({
                        method: 'GET',
                        url: response['href'],
                        headers: {
                            'Authorization': `OAuth ${this.getToken()}`, 'Accept': 'application/json'
                        },
                        callback: (response, err) => {
                            callback(response);
                        }
                    })
                }, 1000)
            }
        });

    }

    /**
     * Метод удаления файла из облака
     */
    static removeFile(path, callback) {
        createRequest({
            method: 'DELETE',
            url: `${this.HOST}/resources?path=${path}`,
            headers: {
                'Authorization': `OAuth ${this.getToken()}`, 'Accept': 'application/json'
            },
            callback: (response, err) => {
                callback(response);
            }
        });

    }

    /**
     * Метод получения всех загруженных файлов в облаке
     */
    static getUploadedFiles(callback) {
        createRequest({
            method: 'GET',
            url: `${this.HOST}/resources/files?media_type=image&fields=name,preview,created,size,path`,
            headers: {
                'Authorization': `OAuth ${this.getToken()}`, 'Accept': 'application/json'
            },
            callback: (response, err) => {
                callback(response);
            }
        });
    }

    /**
     * Метод скачивания файлов
     */
    static downloadFileByUrl(url) {
        const link = document.createElement('a')
        link.href = url;
        link.click();
    }
}
