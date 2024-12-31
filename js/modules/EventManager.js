import { StateManager } from './StateManager.js';
import { DOMManager } from './DOMManager.js';
import { TelegramService } from './TelegramService.js';

/**
 * Менеджер событий
 * Отвечает за обработку всех событий формы
 */
export class EventManager {
    /**
     * Инициализировать обработчики событий
     * @param {StateManager} stateManager - Менеджер состояния
     * @param {DOMManager} domManager - Менеджер DOM
     */
    static init(stateManager, domManager) {
        this.stateManager = stateManager;
        this.domManager = domManager;
        this.setupFormSubmit();
        this.setupInputValidation();
    }

    /**
     * Настроить обработку отправки формы
     */
    static setupFormSubmit() {
        const form = this.domManager.getForm();
        
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            if (!this.stateManager.isFormValid()) {
                this.domManager.showError('Пожалуйста, исправьте ошибки в форме');
                return;
            }

            const formData = {
                name: this.stateManager.getFullName(),
                inn: this.stateManager.getInn()
            };

            try {
                this.domManager.setSubmitting(true);
                await TelegramService.sendData(formData);
                this.domManager.showSuccess('Данные успешно отправлены');
                form.reset();
                this.stateManager.resetState();
            } catch (error) {
                this.domManager.showError(error.message);
            } finally {
                this.domManager.setSubmitting(false);
            }
        });
    }

    /**
     * Настроить валидацию при вводе
     */
    static setupInputValidation() {
        const fullNameInput = this.domManager.getFullNameInput();
        const innInput = this.domManager.getInnInput();

        fullNameInput.addEventListener('input', (event) => {
            const value = event.target.value;
            const isValid = this.stateManager.validateFullName(value);
            this.domManager.updateFullNameValidation(isValid);
        });

        innInput.addEventListener('input', (event) => {
            const value = event.target.value;
            const isValid = this.stateManager.validateInn(value);
            this.domManager.updateInnValidation(isValid);
        });
    }
}
