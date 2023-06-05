const crypto = require('crypto');

function generateRondomId(length){
    const randomID = crypto.randomUUID({ length })
    return randomID
}

console.log(generateRondomId(2));