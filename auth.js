/**
 * @author Victor Raton
 * @version 1.0
 * @description Buscar dados de usuário
 * @param {string} username 
 * @param {string} id 
 * @returns {Object}
 */
const seachUser = (username,id) => {
    // TODO: Buscar usuário no banco e retornar os dados do usuário
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