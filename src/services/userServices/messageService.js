const { sendEmail } = require('./emailService');
const ERROR_MESSAGES = require('../../constants/errorMessages');
const SUCCESSFULL_MESSAGES = require('../../constants/successfullMessages');

const messageService = {
    async sendConfirmationEmail(user) {
        return await sendEmail(user.email, 'Confirm your email', 'Please confirm your email by clicking the following link...');
    },

    async sendRecoveryEmail(user, token) {
        const recoveryMessage = `Here is your password recovery token: ${token}`;
        return await sendEmail(user.email, 'Password Recovery',  recoveryMessage);
    },

    getErrorMessage(errorKey) {
        return ERROR_MESSAGES[errorKey] || "Unknown error occurred.";
    },

    getSuccessMessage(actionType) { 
        return SUCCESSFULL_MESSAGES[actionType] || 'Action completed successfully.';
    }
};

module.exports = messageService;
