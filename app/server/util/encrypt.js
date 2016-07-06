// import crypto from 'crypto'
//
// const ALGORITHM = 'aes-128-ecb';
//
// function fromUrlSafe(str) {
//     return str.replace(/-/g, "+").replace(/_/g, "/");
// }
// function toUrlSafe(str) {
//     return str.replace(/\+/g, "-").replace(/\//g, "_");
// }
//
// export default (key, data) => {
//     var algorithm = 'aes-128-ecb';
//    var clearEncoding = 'utf8';
//    var iv = "";
//    //var cipherEncoding = 'hex';
//    //If the next line is uncommented, the final cleartext is wrong.
//    var cipherEncoding = 'base64';
//    var cipher = crypto.createCipheriv(algorithm, key,iv);
//
//    var cipherChunks = [];
//    cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
//    cipherChunks.push(cipher.final(cipherEncoding));
//    //console.log(cipherEncoding + ' ciphertext: ' + cipherChunks.join(''));
//
//
//     return  cipherChunks.join('')
// }
/**
 * "AES/cbc/pkcs5Padding" encription and decription.
 * setAutoPadding(true) is actually pkcs5Padding,.
 */
'use strict';

var crypto = require('crypto');

var IV = new Buffer([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var keySize = 128;
var algorithm = 'aes-128-ecb';
var outputEncoding = 'base64';
var inputEncoding = 'utf8';

// var setKeySize = function(size) {
//     if (size !== 128 && size !== 256) {
//         throw ('AES.setKeySize error: ' + size);
//     }
//     keySize = size;
//     algorithm = 'aes-' + keySize + '-cbc';
//     // console.log('setkeySize:%j',keySize);
// };


var pkcs5PaddingBytes = new Buffer([ 0x00,
  0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10,
  0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F
]);
// /**
//  * pkcs5Padding for encription = autoPadding
//  * @param  {bytes} buff plaintext bytes
//  * @return {bytes} after padding bytes
//  */
var pkcs5Padding = function(buff) {
  var len = buff.length;
  var padLen = (keySize / 8);
  var padding = len % padLen;
  if (padding !== 0) {
    padLen = padLen - padding;
  }
  // var appendBuf = new Buffer(padLen);
  //  Buffer.concat([appendBuf,new Buffer([0x10,0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F])]);
  var buff2 = new Buffer(16);
  buff2.fill(0x10)
  var outBuff = Buffer.concat([buff, buff2]);
  console.log(outBuff)
 // console.log('after padding:%s,len:%d',outBuff.length, outBuff);
  return outBuff;
};

function str_repeat (input, multiplier) { // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/str_repeat/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // improved by: Ian Carter (http://euona.com/)
  //   example 1: str_repeat('-=', 10)
  //   returns 1: '-=-=-=-=-=-=-=-=-=-='

  var y = ''
  while (true) {
    if (multiplier & 1) {
      y += input
    }
    multiplier >>= 1
    if (multiplier) {
      input += input
    } else {
      break
    }
  }
  return y
}

function chr (codePt) {
  //  discuss at: http://locutus.io/php/chr/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: chr(75) === 'K'
  //   example 1: chr(65536) === '\uD800\uDC00'
  //   returns 1: true
  //   returns 1: true

  if (codePt > 0xFFFF) { // Create a four-byte string (length 2) since this code point is high
    //   enough for the UTF-16 encoding (JavaScript internal use), to
    //   require representation with two surrogates (reserved non-characters
    //   used for building other characters; the first is "high" and the next "low")
    codePt -= 0x10000
    return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF))
  }
  return String.fromCharCode(codePt)
}

function padding(text, size) {
    const pad = size - (text.length % size);
	return text + str_repeat(chr(pad), pad);
}

// /**
//  * pkcs5PaddingClear after decription
//  * @param  {Buffer} buff decription result
//  * @return {Buffer}      original plaintext
//  */
// var pkcs5PaddingClear = function(buff) {
//   var len = buff.length;
//   var e = buff[len - 1];
//   // console.log('clear padding:%s,len:%d,e:%d',printBuf(buff),len,e);
//   return buff.slice(0, len - e);
// };

/**
 * the key must match the keySize/8 , like:16 ,32
 * @param  {Buffer} key
 * @return {}
 */
var checkKey = function(key) {
    if (!key) {
        throw 'AES.checkKey error: key is null ';
    }
    if (key.length !== (keySize / 8)) {
        throw 'AES.checkKey error: key length is not ' + (keySize / 8) + ': ' + key.length;
    }
};

/**
 * buffer/bytes encription
 * @param  {Buffer} buff
 * @param  {Buffer} key  the length must be 16 or 32
 * @param  {Buffer} [newIv]   default is [0,0...0]
 * @return {encripted Buffer}
 */
export function encBytes(buff, key, newIv) {


    // var cipher = crypto.createCipheriv('aes-128-ecb', key, '');
    // cipher.setAutoPadding(true);
    // var re = Buffer.concat([cipher.update(buff), cipher.final()]);
    // return re;



    // checkKey(key);
    // var iv = newIv || IV;
    // var cipher = crypto.createCipheriv(algorithm, key, iv);
    // //cipher.setAutoPadding(false);
    // //var re = Buffer.concat([cipher.update(pkcs5Padding(buff)), cipher.final()]);
    // cipher.setAutoPadding(false);
    // //console.log(new Buffer(buff).toString().length)
    // //var pad =  padding(new Buffer(buff).toString(), 16);
    // //console.log(pad.length);
    // //var buff = new Buffer(false);
    // var re = Buffer.concat([cipher.update(buff), cipher.final()]);
    // // console.log('enc re:%s,len:%d', printBuf(re), re.length);
    // return re;
    checkKey(key);
    var iv = newIv || IV;
    var cipher = crypto.createCipheriv(algorithm, key, '');
    // cipher.setAutoPadding(false);
    // var re = Buffer.concat([cipher.update(pkcs5Padding(buff)), cipher.final()]);
    cipher.setAutoPadding(true);
    var re = Buffer.concat([cipher.update(buff), cipher.final()]);
    // console.log('enc re:%s,len:%d', printBuf(re), re.length);
    return re;

};

/**
 * text encription
 * @param  {string} text
 * @param  {Buffer} key         the length must be 16 or 32
 * @param  {Buffer} [newIv]       default is [0,0...0]
 * @param  {string} [input_encoding]  ["utf8" -default,"ascii","base64","binary"...](https://nodejs.org/api/buffer.html#buffer_buffer)
 * @param  {string} [output_encoding] ["base64" -default,"hex"]
 * @return {string}                 encription result
 */
export function encText(text, key, newIv, input_encoding, output_encoding) {
    checkKey(key);
    var iv = newIv || IV;
    var inEncoding = input_encoding || inputEncoding;
    var outEncoding = output_encoding || outputEncoding;
    var buff = new Buffer(text, inEncoding);
    var out = encBytes(buff, key, iv);
    var re = new Buffer(out).toString(outEncoding);
    return re;
};


/**
 * buffer/bytes decription
 * @param  {Buffer} buff
 * @param  {Buffer} key  the length must be 16 or 32
 * @param  {Buffer} [newIv] default is [0,0...0]
 * @return {encripted Buffer}
 */
export function decBytes (buff, key, newIv) {
    checkKey(key);
    var iv = newIv || IV;
    var decipher = crypto.createDecipheriv(algorithm, key, iv);
    // decipher.setAutoPadding(false);
    decipher.setAutoPadding(true);
    var out = Buffer.concat([decipher.update(buff), decipher.final()]);
    // return pkcs5PaddingClear(out);
    return out;
};
/**
 * text decription
 * @param  {string} text
 * @param  {Buffer} key         the length must be 16 or 32
 * @param  {Buffer} [newIv]       default is [0,0...0]
 * @param  {string} [input_encoding]  ["utf8" - default,"ascii","base64","binary"...](https://nodejs.org/api/buffer.html#buffer_buffer)
 * @param  {string} [output_encoding] ["base64"- default ,"hex"]
 * @return {string}                 decription result
 */
export function decText(text, key, newIv, input_encoding, output_encoding) {
    checkKey(key);
    var iv = newIv || IV;
    var inEncoding = input_encoding || inputEncoding;
    var outEncoding = output_encoding || outputEncoding;
    var buff = new Buffer(text, outEncoding);
    var re = new Buffer(decBytes(buff, key, iv)).toString(inEncoding);
    return re;
};
