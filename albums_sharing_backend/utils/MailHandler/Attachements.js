const {ressourcePath} = require("../utilities")
const path = require('path')

let attachementsConfirmMail = (data)=>{
    console.log(data)
    const attachments  = []
    return attachments
}

let attachementsResetPassword = (data)=>{
  console.log(data)
    const attachments  = []
    return attachments
}

let attachementsPasswordUpdated = (data)=>{
  console.log(data)
  const attachments  = [
    // {
    //   filename: (data?.pictures) ? data?.pictures : 'anonymous.png',
    //   path: (data?.pictures) ? data?.pictures  : path.join(__dirname,"assets/pictures/anonymous.png"),
    //   cid: (data?.pictures) ? data?.pictures : 'anonymous.png',        
    // },
    // {
    //     filename: (data?.pictures2) ? data?.pictures2 : 'images1.png',
    //     path: (data?.pictures2) ? data?.pictures2  : path.join(__dirname,"assets/pictures/images1.png"),
    //     cid: (data?.pictures2) ? data?.pictures2 : 'images1.png',        
    //   },
  ]
  return attachments
}

exports.attachementsConfirmMail = attachementsConfirmMail
exports.attachementsResetPassword = attachementsResetPassword
exports.attachementsPasswordUpdated = attachementsPasswordUpdated