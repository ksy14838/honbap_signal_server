/*
jwt 생성 및 검증에 사용 
*/ 

const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/secret').secretKey;
const options = require('../config/secret').options;
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {

    sign: async (user) => {
        /* 현재는 idx와 email을 payload로 넣었지만 필요한 값을 넣으면 됨! */
        const payload = {
            idx: user.userIdx
        };
        const result = {
            //sign메소드를 통해 access token 발급!
            token: jwt.sign(payload, secretKey, options),
            refreshToken: randToken.uid(256)
        };
        return result;
    },
    verify: async (token) => {
        let decoded;
        try {
            // verify를 통해 값 decode!
            decoded = jwt.verify(token, secretKey);
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                return TOKEN_EXPIRED;
            } else if (err.message === 'invalid token') {
                console.log('invalid token');
                console.log(TOKEN_INVALID);
                return TOKEN_INVALID;
            } else {
                console.log("invalid token");
                return TOKEN_INVALID;
            }
        }
        return decoded;
    }
}