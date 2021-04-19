
require('dotenv').config();

const PORT = process.env.API_PORT || 4000;
const ADDRESS = process.env.API_ADDRESS || '127.0.0.1';

const ressourcePath = `http://${ADDRESS}:${PORT}/files/`;

const formatUserName = (prenom,nom) => {
    let formatedName = "" 
    if(prenom && nom){
      formatedName = prenom[0].toUpperCase() + prenom.slice(1)+ " "+ nom.substring(0, 1).toUpperCase() + "."
    }else if (!prenom && nom){
      formatedName = nom[0].toUpperCase() + nom.slice(1)
    }else if (prenom && !nom){
      formatedName = prenom[0].toUpperCase() + prenom.slice(1)
    }		
    return formatedName
}

exports.ressourcePath = ressourcePath
exports.formatUserName = formatUserName