const bcrypt = require('bcrypt')

ptPass = "123456"
hashedPass = ''


const hashPass = async (ptPass) => {
    try {
        const hashedPass = await bcrypt.hash(ptPass, 5)
        return hashedPass
    } catch (err) {
        throw err
    }
}

const comparePass = async (pass, hash) => {
    try {
        const res = await bcrypt.compare(pass, hash);
        return res;
    } catch (err) {
        throw err; // Propagate the error if bcrypt.compare fails
    }
};

hashPass(ptPass).then(res => {
    hashedPass = res
    console.log(hashedPass)
    return hashedPass
}).then((hashedPass) => {
    comparePass('123456', hashedPass).then(isMatch => {
        console.log(isMatch)
    })
})

