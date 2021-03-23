
const {attachementsConfirmMail, attachementsResetPassword, attachementsPasswordUpdated } = require("./Attachements")

require('dotenv').config();

const PORT = process.env.API_PORT || 3000;
const ADDRESS = process.env.API_ADDRESS || '127.0.0.1';

exports.templateSelection = (data, mailType, objLinks)=>{

    const urlLinkPrefix = `http://${ADDRESS}:${PORT}`;
    let subject = ""
    let attachments = []
    let selectedTemplate = ""
    let links = {}
    switch (mailType){
        case 'confirmMail':
            {
                subject = "Confirmation d'email"
                attachments = attachementsConfirmMail(data)
                selectedTemplate = "/template/templateConfirmMail.ejs"
                links = {confirmLink: urlLinkPrefix+objLinks?.confirmLink}
            }
            break;       
        case 'resetPassword':
            {
                subject = "Réinitialisation de mots de passe"
                attachments = attachementsResetPassword(data)
                selectedTemplate = "/template/templateResetPassword.ejs"
                links = {resetBtnLink: urlLinkPrefix+objLinks?.resetBtnLink}
            }
            break;        
        case 'passwordUpdated':
            {
                subject = "Mots de passe mise à jour"
                attachments = attachementsPasswordUpdated(data)
                selectedTemplate = "/template/templatePasswordUpdated.ejs"
                links = {loginLink: urlLinkPrefix+objLinks?.loginLink}
            }
            break;
        default:
        console.log(notificationType)
    }

    return {subject, attachments, selectedTemplate, links}
}