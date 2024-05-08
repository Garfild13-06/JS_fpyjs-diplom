/**
 * Класс BaseModal
 * Используется как базовый класс всплывающего окна
 */
class BaseModal {

    constructor(element) {
        this.SemanticElement = element;
    }

    /**
     * Открывает всплывающее окно
     */
    open() {
        this.SemanticElement.modal('show');
    }

    /**
     * Закрывает всплывающее окно
     */
    close() {
        this.SemanticElement.modal('hide');
    }
}