import axios from "axios";


const sendResetPasswordEmail = async (email) => {
    try {
        const response = await axios.post('http://localhost:3001/mail/reset-password', { email });
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : 'Error al enviar el correo de recuperación de contraseña');
    }
}


const changePassword = async ({newPassword,token}) => {
    try {
        console.log("Enviando nueva contraseña para:", newPassword, "con token:", token);
        const response = await axios.post('http://localhost:3001/mail/new-password', { newPassword, token });
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : 'Error al enviar el correo de recuperación de contraseña');
    }
}

export const mailService = {
    sendResetPasswordEmail,
    changePassword
};