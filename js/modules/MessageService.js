/**
 * Сервис для работы с сообщениями
 */
export class MessageService {
    static MESSAGES = {
        FORM_INVALID: 'Пожалуйста, исправьте ошибки в форме',
        SENDING: 'Отправка...',
        SUCCESS: 'Форма успешно отправлена!',
        NETWORK_ERROR: 'Ошибка сети. Проверьте подключение к интернету.',
        SERVER_ERROR: 'Ошибка сервера. Попробуйте позже.',
        VALIDATION_ERROR: {
            INN_LENGTH: 'ИНН должен содержать 12 цифр',
            NAME_FORMAT: 'ФИО должно быть в формате "Фамилия Имя Отчество" на кириллице'
        }
    };

    /**
     * Показать сообщение пользователю
     * @param {string} message - Текст сообщения
     */
    static showMessage(message) {
        alert(message);
    }

    /**
     * Показать ошибку пользователю
     * @param {Error} error - Объект ошибки
     */
    static showError(error) {
        console.error('Ошибка:', error);
        
        // Определяем тип ошибки и выбираем соответствующее сообщение
        let message;
        if (error.message === 'Failed to fetch') {
            message = this.MESSAGES.NETWORK_ERROR;
        } else if (error.message.includes('Unexpected token')) {
            message = this.MESSAGES.SERVER_ERROR;
        } else {
            message = error.message;
        }

        this.showMessage(message);
    }
}
