const crypto = require('crypto');

function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex') // Convert to hexadecimal format // Trim to desired length
}

// Usage example: Generate a random string of length 32
const randomString = generateRandomString(128);
console.log(randomString);
