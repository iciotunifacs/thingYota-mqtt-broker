const Log = (args) => {
    const that = {
        status : "OK",
        code : 500,
        message: "",
        timestamp: new Date().toUTCString(),
    };
    
    const keys = Object.keys(args);
    
    keys.map(el => {
        const value = args[el];
        that[el] = value;
    })
    
    return that;
}

module.exports = Log;
