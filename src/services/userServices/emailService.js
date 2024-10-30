const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS 
    }
});

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    };


};
const sendConfirmationReportMail = async (userId, reviewId, reason) => {
    const adminEmail = process.env.EMAIL_ADMIN;
    const subject = 'Nuevo reporte de reseña';
    const text = `El usuario con ID ${userId} ha reportado la reseña con ID ${reviewId} por el siguiente motivo: ${reason}.`;

    // Enviar el correo con los detalles del reporte
    return await sendEmail(adminEmail, subject, text);
};

module.exports = {
    sendEmail,
    sendConfirmationReportMail
};
