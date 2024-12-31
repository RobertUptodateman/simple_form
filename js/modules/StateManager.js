/**
 * Менеджер состояния формы
 * Отвечает за хранение и валидацию данных формы
 */
export class StateManager {
    static state = {
        form: {
            fullName: '',
            inn: '',
            isValid: false
        }
    };

    /**
     * Получить текущее состояние
     * @returns {Object} Текущее состояние
     */
    static getState() {
        return this.state;
    }

    /**
     * Обновить поле формы
     * @param {string} field - Имя поля
     * @param {string} value - Значение поля
     */
    static updateFormField(field, value) {
        this.state.form[field] = value;
        this.validateForm();
    }

    /**
     * Проверить формат ФИО
     * @param {string} fullName - Строка с ФИО
     * @returns {Object} Результат проверки с описанием ошибки
     */
    static validateFullName(fullName) {
        if (!fullName.trim()) {
            return {
                isValid: false,
                error: 'Поле обязательно для заполнения'
            };
        }

        // Разбиваем строку на части
        const parts = fullName.trim().split(/\s+/);
        
        // Проверяем количество частей
        if (parts.length !== 3) {
            return {
                isValid: false,
                error: 'Введите полностью Фамилию, Имя и Отчество, разделяя их пробелом'
            };
        }

        // Проверяем на наличие цифр
        if (/\d/.test(fullName)) {
            return {
                isValid: false,
                error: 'ФИО не может содержать цифры'
            };
        }

        // Проверяем на латиницу
        if (/[a-zA-Z]/.test(fullName)) {
            return {
                isValid: false,
                error: 'Используйте только русские буквы'
            };
        }

        // Проверяем каждую часть на корректность
        const namePattern = /^[А-ЯЁ][а-яё]+(-[А-ЯЁ][а-яё]+)*$/;
        
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (!namePattern.test(part)) {
                const partName = i === 0 ? 'Фамилия' : i === 1 ? 'Имя' : 'Отчество';
                if (!/^[А-ЯЁ]/.test(part)) {
                    return {
                        isValid: false,
                        error: `${partName} должна начинаться с заглавной буквы`
                    };
                }
                if (/[А-ЯЁ]/.test(part.slice(1))) {
                    return {
                        isValid: false,
                        error: `${partName} должна содержать только одну заглавную букву в начале`
                    };
                }
                return {
                    isValid: false,
                    error: `${partName} содержит недопустимые символы`
                };
            }
        }

        return {
            isValid: true,
            error: ''
        };
    }

    /**
     * Проверить формат ИНН
     * @param {string} inn - Строка с ИНН
     * @returns {Object} Результат проверки с описанием ошибки
     */
    static validateINN(inn) {
        if (!inn.trim()) {
            return {
                isValid: false,
                error: 'Поле обязательно для заполнения'
            };
        }

        if (!/^\d+$/.test(inn)) {
            return {
                isValid: false,
                error: 'ИНН может содержать только цифры'
            };
        }

        if (inn.length !== 12) {
            return {
                isValid: false,
                error: `ИНН должен содержать 12 цифр. Сейчас: ${inn.length}`
            };
        }

        return {
            isValid: true,
            error: ''
        };
    }

    /**
     * Валидация формы
     */
    static async validateForm() {
        const { fullName, inn } = this.state.form;
        
        // Проверяем поля
        const fullNameValidation = this.validateFullName(fullName);
        const innValidation = this.validateINN(inn);

        // Обновляем отображение ошибок
        const DOMManager = (await import('./DOMManager.js')).DOMManager;
        const fullNameInput = DOMManager.getElement(DOMManager.SELECTORS.fullName);
        const innInput = DOMManager.getElement(DOMManager.SELECTORS.inn);

        if (!fullNameValidation.isValid) {
            DOMManager.showError(fullNameInput, fullNameValidation.error);
        } else {
            DOMManager.clearError(fullNameInput);
        }

        if (!innValidation.isValid) {
            DOMManager.showError(innInput, innValidation.error);
        } else {
            DOMManager.clearError(innInput);
        }

        // Обновляем состояние валидности формы
        this.state.form.isValid = fullNameValidation.isValid && innValidation.isValid;
        
        // Обновляем состояние кнопки
        DOMManager.updateButtonState(this.state.form.isValid);
    }
}
