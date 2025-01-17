const jwtMiddleware = require("../../../config/jwtMiddleware");
const findProvider = require("../../app/SignalFind/findProvider");
const findService = require("../../app/SignalFind/findService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const logger = require("../../../config/winston");


/**
 * API No. 1
 * API Name : 내 위치 전송 API (초기에 한번 실행)
 * [POST] /app/signalFind/:myLocation
 */
 exports.postMyLocation = async function (req, res) {

    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
  
    // 빈 값 체크
    if(!latitude)
      return res.send(response(baseResponse.SIGNALFIND_LATITUDE_EMPTY));
  
    if(!longitude)
      return res.send(response(baseResponse.SIGNALFIND_LONGITUDE_EMPTY));
    
    const locationResponse = await findService.createUserLocation(
      latitude,
      longitude
    );
  
    return res.send(response(baseResponse.SUCCESS, locationResponse));
  }
/**
 * API No. 2
 * API Name : 내 위치 업데이트 API
 * [GET] /app/signalFind?myLocation={myLocation}&useridx={useridx}''
 */
  
  exports.patchMyLocation = async function (req, res) {
    var {latitude, longitude} = req.body;
    var userIdx = req.params.userIdx;

    console.log(`latitude : ${latitude}`);
    console.log(`longitude: ${longitude}`);
    console.log(`userIdx : ${userIdx}`);
  
    // 빈 값 체크
    if(!latitude)
      return res.send(response(baseResponse.SIGNALFIND_LATITUDE_EMPTY));
  
    if(!longitude)
      return res.send(response(baseResponse.SIGNALFIND_LONGITUDE_EMPTY));
  
    if(!userIdx)
    return res.send(response(baseResponse.SIGNALFIND_USERIDX_EMPTY)); 

    const params = [latitude, longitude, userIdx]
    const result = await findService.updateLocation(params);
    
    return res.send(response(baseResponse.SUCCESS, result[0]));
  }
/**
 * API No. 3
 * API Name : range = 3km에 해당되는 내 근처 시그널 목록 조회 API
 * [GET] /app/signalFind/list/:useridx'
 */
  
  exports.getSignalList = async function (req, res) {
    var userIdx = req.params.userIdx;
    console.log(`userIdx : ${userIdx}`);
  
    // 빈 값 체크
    if(!userIdx)
    return res.send(response(baseResponse.SIGNALFIND_USERIDX_EMPTY));
  
    const signalListResponse = await findProvider.getSignalList(userIdx);

    return res.send(response(baseResponse.SUCCESS,signalListResponse));
  }