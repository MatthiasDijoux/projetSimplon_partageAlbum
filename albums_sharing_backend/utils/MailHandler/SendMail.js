const nodemailer = require ("nodemailer");
const {templateSelection} = require("./TemplateSelection")
const {formatUserName} = require("../utilities")
require('dotenv').config();
const ejs = require("ejs");

let sendMail = async (
  data,
  recipient,
  links,
  mailType
) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: process.env.MAIL_USERNAME,
           pass: process.env.MAIL_PASSWORD
       }
   });
  
  const mData = templateSelection(data,mailType,links)
  const subject  = mData.subject
  const attachments = mData.attachments
  const selectedTemplate  = mData.selectedTemplate
  const mLinks = mData.links
  
  ejs.renderFile(__dirname + selectedTemplate, {data, mLinks, formatUserName}, function (err, template) {
    if (err) {
        console.log(err);
    } else {

    console.log("recipient")
    console.log(`${recipient}`)

    const message = {
      from: "L'équipe Album photo <albumphotosimplon@gmail.com>",
      to: `${recipient} <${recipient}>`,
      subject: subject+" ✔",
      text: "Bonjour,",
      html: `${template}`,
      attachments:attachments
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log("Error occurred. " + err.message);
      }else{
        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }

    }); 
  }
 })
};

exports.sendMail = sendMail