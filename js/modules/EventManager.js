import { StateManager } from './StateManager.js';
import { DOMManager } from './DOMManager.js';

export class EventManager {
    static initialize() {
        this.initializeFormEvents();
    }

    static initializeFormEvents() {
        const form = DOMManager.getElement(DOMManager.SELECTORS.form);
        const fullNameInput = DOMManager.getElement(DOMManager.SELECTORS.fullName);
        const innInput = DOMManager.getElement(DOMManager.SELECTORS.inn);

        fullNameInput.addEventListener('input', (e) => {
            StateManager.updateFormField('fullName', e.target.value);
            DOMManager.updateButtonState(StateManager.getState().form.isValid);
        });

        innInput.addEventListener('input', (e) => {
            const value = e.target.value.replace(/\D/g, '');
            e.target.value = value;
            StateManager.updateFormField('inn', value);
            
            if (value.length === 12) {
                DOMManager.clearError(innInput);
            } else if (value.length > 0) {
                DOMManager.showError(innInput, 'ИНН должен содержать 12 цифр');
            }
            
            DOMManager.updateButtonState(StateManager.getState().form.isValid);
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const state = StateManager.getState();
            if (state.form.isValid) {
                console.log('Form submitted:', state.form);
                // Здесь будет логика отправки формы
            }
        });
    }
}
