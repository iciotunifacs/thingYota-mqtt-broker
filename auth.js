const axios = require("axios").default;

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
  await axios.post('http://localhost:3000/api/v1/alunos/broken/auth', {
      macAdress: macAdress,
  })
      .then((response) => {
         data =response.data
      }, (error) => {
        console.log(error);
      });
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
const authSub = (topic, username,password) => {
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

module.exports = {seachUser,authPub, authSub}