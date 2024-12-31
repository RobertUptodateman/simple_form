/**
 * Менеджер DOM элементов
 * Отвечает за работу с DOM элементами формы
 */
export class DOMManager {
    static SELECTORS = {
        form: '#dataForm',
        fullName: '#fullName',
        inn: '#inn',
        submitButton: '#submitButton',
        fullNameError: '#fullNameError',
        innError: '#innError'
    };

    /**
     * Получить элемент по селектору
     * @param {string} selector - CSS селектор элемента
     * @returns {HTMLElement} DOM элемент
     */
    static getElement(selector) {
        return document.querySelector(selector);
    }

    /**
     * Показать ошибку для поля
     * @param {HTMLElement} input - Поле ввода
     * @param {string} message - Текст ошибки
     */
    static showError(input, message) {
        input.classList.add('is-invalid');
        const errorElement = document.querySelector(`#${input.id}Error`);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    /**
     * Очистить ошибку для поля
     * @param {HTMLElement} input - Поле ввода
     */
    static clearError(input) {
        input.classList.remove('is-invalid');
        const errorElement = document.querySelector(`#${input.id}Error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    /**
     * Обновить состояние кнопки отправки
     * @param {boolean} isValid - Валидна ли форма
     */
    static updateButtonState(isValid) {
        const submitButton = this.getElement(this.SELECTORS.submitButton);
        submitButton.disabled = !isValid;
    }
}
