const axios = require("axios").default;
require("dotenv").config();

const url = process.env.API;
/**
 * @author Victor Raton
 * @version 1.0
 * @description Buscar dados de usuário a partir do mac
 * @param {string} username 
 * @param {string} id 
 * @returns {Object}
 */
const seachUser = async (macAdress) => {
    let data = undefined;
    await axios.post(url.concat("/alunos/broken/auth"), {
        macAdress: macAdress,
    })
    .then((response) => {
        data = response.data
    }, (error) => {
        console.log(error);
    });
    return data;
}

const seachAula = async (macAdress) => {
    let data = undefined;
    await axios.post(url.concat("/aulas/broken/auth"), {
        macAdress: macAdress
    })
        .then(response => {
            data = response.data;
        }, error => {
            console.log(error)
        })
    return data;
}

const registerAula = async (aulaId, alunoId) => {
    let data;
    await axios.put(url.concat(`/aulas/1/registro`),{
        aluno: alunoId,
        aula: aulaId
    })
        .then(res => {
            data = res
        },(error) => console.log(error))
    return data;
}

/**
 * @author Victor Raton
 * @version 1.0
 * @description Verificar autorização de subscribe
 * @param {Object} topic 
 * @param {string} username 
 * @param {string} password 
 * @returns {boolean}
 */
const authSub = (topic, username, password) => {
  // TODO: unção de validação
}

/**
 * @author Victor Raton
 * @version 1.0
 * @description Verificar autorização de publish
 * @param {Object} topic 
 * @param {string} username 
 * @param {string} password 
 * @returns {Object}
 */
const authPub = (topic, username, password) => {
  // TODO: Verificar permissão de pblicação
}

module.exports = { seachUser, authPub, authSub, seachAula, registerAula }