export class DOMManager {
    static SELECTORS = {
        form: '#userForm',
        fullName: '#fullName',
        inn: '#inn',
        submitButton: 'button[type="submit"]'
    };

    static getElement(selector) {
        return document.querySelector(selector);
    }

    static updateButtonState(isEnabled) {
        const button = this.getElement(this.SELECTORS.submitButton);
        button.disabled = !isEnabled;
    }

    static showError(element, message) {
        const errorDiv = element.nextElementSibling?.classList.contains('error-message') 
            ? element.nextElementSibling 
            : document.createElement('div');
        
        if (!errorDiv.classList.contains('error-message')) {
            errorDiv.classList.add('error-message');
            element.parentNode.insertBefore(errorDiv, element.nextSibling);
        }
        
        errorDiv.textContent = message;
    }

    static clearError(element) {
        const errorDiv = element.nextElementSibling;
        if (errorDiv?.classList.contains('error-message')) {
            errorDiv.remove();
        }
    }
}
