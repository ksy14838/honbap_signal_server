const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");



// 회원 정보 확인
exports.userIdCheck = async function (userId) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const userIdCheckResult = await userDao.existUserId(connection, userId);
    connection.release();

    return userIdCheckResult;
  } catch (err) {
    logger.error(`userIdCheck Provider error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};
exports.emailCheck = async function (email) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const emailCheckResult = await userDao.existUserEmail(connection, email);
    connection.release();

    return emailCheckResult;
  } catch (err) {
    logger.error(`emailCheck Provider error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};
exports.phoneNumCheck = async function (phoneNum) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const phoneNumCheckResult = await userDao.existUserPhone(connection, phoneNum);
    connection.release();

    return phoneNumCheckResult;
  } catch (err) {
    logger.error(`phoneNumCheck Provider error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};
exports.passwordCheck = async function (userId, password) {
  const loginParams = [userId, password];
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const phoneNumCheckResult = await userDao.checkpassword(connection, loginParams);
    connection.release();

    return phoneNumCheckResult;
  } catch (err) {
    logger.error(`phoneNumCheck Provider error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
}
//======================================
//mypage

// 닉네임 체크
exports.nickNameCheck = async function (nickName) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const nickNameCheckResult = await userDao.existUserNickname(connection, nickName);
    connection.release();

    return nickNameCheckResult;
  } catch (err) {
    logger.error(`nicknameCheck Provider error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

// 유저 IDX 조회
exports.getUserIdx = async function (userId) {
    try {
      const connection = await pool.getConnection(async (conn) => conn);
  
      const userIdxCheckResult = await userDao.selectUserIdx(connection, userId);
      connection.release();

      //console.log(userIdxCheckResult[0])
  
      return userIdxCheckResult[0];

    } catch (err) {
      logger.error(`getUserIdx Provider error\n: ${err.message}`);
      return errResponse(baseResponse.DB_ERROR);
    }
};

// 유저 개인정보 조회
exports.getUserInfo = async function (userIdx) {
    try {
      const connection = await pool.getConnection(async (conn) => conn);

      const userInfoResult = await userDao.selectUserInfo(connection, userIdx);
      connection.release();

      return userInfoResult[0];
    } catch (err) {
      logger.error(`getUserInfo Provider error\n: ${err.message}`);
      return errResponse(baseResponse.DB_ERROR);
    }
}

// 유저 마이페이지(프로필) 조회
exports.getUserProfile = async function (userIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    
    const userProfileResult = await userDao.selectUserProfile(connection, userIdx);
    connection.release();

    return userProfileResult[0];
  } catch (err) {
    logger.error(`getUserProfile Provider error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
}
