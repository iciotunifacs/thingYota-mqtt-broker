/**
 * @author Victor Raton
 * @version 1.0
 * @description Gerar modelo padrão de log
 * @param {Object*} args
 * @returns {Object* Log} 
 * @example var log = Log({username: "username", code: 10})
 */
const Log = (args) => {
    // that: padrão de logbase
    const that = {
        status : "OK",
        code : 500,
        message: "",
        timestamp: new Date().toUTCString(),
    };
    // lista de chaves dos objetos passados en args
    const keys = Object.keys(args);
    // mapeqmento de parâmetros adicionais no log
    keys.map(el => {
        const value = args[el];
        that[el] = value;
    })
    return that;
}
module.exports = Log;
