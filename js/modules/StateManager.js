export class StateManager {
    static state = {
        form: {
            fullName: '',
            inn: '',
            isValid: false
        }
    };

    static getState() {
        return this.state;
    }

    static updateFormField(field, value) {
        this.state.form[field] = value;
        this.validateForm();
    }

    static validateForm() {
        const { fullName, inn } = this.state.form;
        this.state.form.isValid = fullName.trim() !== '' && /^\d{12}$/.test(inn);
    }
}
