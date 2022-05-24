// API

// See: https://cryptojs.gitbook.io/docs/
// AES Encryption
// Plain text encryption

var CryptoJS = require("crypto-js");

// Encrypt
var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();

// Decrypt
var bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
var originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(originalText); // 'my message'

// JWT //////////////////////////////////////////////////////////////////////////////////////////

jwt.sign(payload, secretOrPrivateKey, [options, callback])

// (Asynchronous) If a callback is supplied, the callback is called with the err or the JWT.
// (Synchronous) Returns the JsonWebToken as string
// payload could be an object literal, buffer or string representing valid JSON.

jwt.sign({
data: 'foobar'
}, 'secret', { expiresIn: '1h' });

jwt.verify(token, secretOrPublicKey, [options, callback])

// (Asynchronous) If a callback is supplied, function acts asynchronously. The callback is called with the decoded payload if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will be called with the error.

// (Synchronous) If a callback is not supplied, function acts synchronously. Returns the payload decoded if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will throw the error.token is the JsonWebToken string secretOrPublicKey is a string or buffer containing either the secret for HMAC algorithms, or the PEM encoded public key for RSA and ECDSA. If jwt.verify is called asynchronous, secretOrPublicKey can be a function that should fetch the secret or public key. See below for a detailed example

// verify a token symmetric
jwt.verify(token, 'shhhhh', function (err, decoded) {
console.log(decoded.foo) // bar
});
