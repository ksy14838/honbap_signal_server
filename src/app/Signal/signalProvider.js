const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const signalDao = require("./signalDao");


// 시그널 조회
exports.getSignalList = async function (userIdx) {
    try {
      const connection = await pool.getConnection(async (conn) => conn);
  
      const userIdxCheckResult = await signalDao.selectSignalList(connection, userIdx);
      connection.release();

      return userIdxCheckResult[0];

    } catch (err) {
      logger.error(`getSignalList Provider error\n: ${err.message}`);
      return errResponse(baseResponse.DB_ERROR);
    }
};

