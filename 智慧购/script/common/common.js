// 接口地址
//  var _ApiPath = "http://www.ieemoo.com:8085";   /*(微软云)*/
var _ApiPath = "http://114.215.253.127:8085";   /*(阿里云)*/

// var _ApiPath = "http://192.168.199.136:8085"; /*(承志的Id)*/
    
// var _ApiPath = "http://192.168.199.77:8085"; /*(褚伟的iId)*/

// var _ApiPath = "http://192.168.199.233:8086"; /*(段誉的iId)*/

var ApiUrl = {
    getSmscode: _ApiPath + "/emall-mobile/memberUserForMobile/sendSmsCode.do",
    checkSmscode : _ApiPath + "/emall-mobile/memberUserForMobile/validateSmsCode.do",
    login: _ApiPath + "/emall-mobile/memberUserForMobile/validateLoginPassword.do",
    loginOld: _ApiPath + "/emall-mobile/memberUser/validateLoginPassword.do",
    register:_ApiPath + "/emall-mobile/memberUserForMobile/registerMemberUserInfo.do",
    forgetPass:_ApiPath + "/emall-mobile/memberUserForMobile/modifyLoginPassword.do",
    authorizedLogin : _ApiPath + "/emall-mobile/memberUserForMobile/thirdPartyLoginForMobile.do", // 第三方登录
    qrCode:_ApiPath + "/emall-mobile/memberUserForMobile/qrCodeLogin.do", // 首页扫一扫
    checkStoreAttention : _ApiPath + "/emall-mobile/storeForMobile/checkStoreAttention.do", // check门店是否已经关注
    saveStoreAttention : _ApiPath + "/emall-mobile/storeForMobile/saveStoreAttention.do", //  添加关注门店
    queryStoreAttentionByPage : _ApiPath + "/emall-mobile/storeForMobile/queryStoreAttentionByPage.do", //  查询关注门店
    queryNearByStores : _ApiPath + "/emall-mobile/storeForMobile/queryNearByStores.do", // 查询附近门店
    queryStoresByName : _ApiPath + "/emall-mobile/storeForMobile/queryStoresByName.do" ,//  根据门店名称模糊查询门店
    removeStoreAttention : _ApiPath + "/emall-mobile/storeForMobile/removeStoreAttention.do", //  移除关注门店
    queryHotSearchPage : _ApiPath + "/emall-mobile/shop/queryHotSearchPage.do", //  分页查询热门关键字
    queryShopSalesAdvertiseSByLikeName : _ApiPath + "/emall-mobile/productForMobile/queryShopSalesAdvertiseSByLikeName.do", // 根据商品名称模糊查询商品
    queryHotPictures: _ApiPath + "/emall-mobile/advertisementForMobile/queryHotPictures.do",//火爆全城
    queryShopSalesAdvertiseSByIsRecommend: _ApiPath + "/emall-mobile/productForMobile/queryShopSalesAdvertiseSByIsRecommend.do", // 猜你喜欢
    queryAllAdvertisesForMobile: _ApiPath + "/emall-mobile/shop/queryAllAdvertisesForMobile.do",
    queryNearByCommunity: _ApiPath + "/emall-mobile/communityForMobile/queryNearByCommunity.do", // 查询附近社区
    saveMemberCommunity: _ApiPath + "/emall-mobile/communityForMobile/saveMemberCommunity.do",//加入退出社区
    queryKoubeiVooucherPage:_ApiPath + "/emall-mobile/koubei/queryKoubeiVooucherPage.do",//首页优惠券——分页查询口碑优惠券
    queryShopCouponPage: _ApiPath + "/emall-mobile/shopCouponForMobile/queryShopCouponPage.do",//亿猫专享优惠券
    receiveShopCoupon: _ApiPath + "/emall-mobile/shopCouponForMobile/receiveShopCoupon.do",//亿猫专享优惠券-领取
    queryMyhopCouponPage:_ApiPath + "/emall-mobile/shopCouponForMobile/queryMyhopCouponPage.do",//已领取亿猫专享优惠券查询
    queryAllCounty:_ApiPath + "/emall-mobile/communityForMobile/queryAllCounty.do",//根据城市查询区
    queryCommunityByName:_ApiPath + "/emall-mobile/communityForMobile/queryCommunityByName.do",//查询社区名
    queryAllAdvertisesForMobile: _ApiPath + "/emall-mobile/shop/queryAllAdvertisesForMobile.do",    
    Queryfordetails : _ApiPath + "/emall-mobile/productForMobile/Queryfordetails.do",// 查询商品详情
    queryStoreByStoreId : _ApiPath + "/emall-mobile/storeForMobile/queryStoreByStoreId.do", // 根据商家id查询商家信息
    checkShopSalesAdvertiseSDtoAtShopICart : _ApiPath + "/emall-mobile/storeForMobile/checkShopSalesAdvertiseSDtoAtShopICart.do", //  判断商品是否已经加入iCart
    saveShopICartData : _ApiPath + "/emall-mobile/storeForMobile/saveShopICartData.do", // 添加商品到iCart
    removeShopICartData : _ApiPath + "/emall-mobile/storeForMobile/removeShopICartData.do", // 从ICart移除商品
    queryShopICartDataByUserNo : _ApiPath + "/emall-mobile/storeForMobile/queryShopICartDataByUserNo.do", // 查询ICart中的商品
    checkShopCollectDtoByUserNoAndCode : _ApiPath + "/emall-mobile/productForMobile/checkShopCollectDtoByUserNoAndCode.do",  // 查询商品是否收藏
    saveShopCollectDto : _ApiPath + "/emall-mobile/productForMobile/saveShopCollectDto.do", // 商品收藏Collect
    queryUserOrder : _ApiPath + "/emall-mobile/orderForMobile/queryUserOrder.do",//我的订单详情查询 (Zhiping)
    queryUserOrderDetail :_ApiPath + "/emall-mobile/orderForMobile/queryUserOrderDetail.do",//我的订单查询某个订单(Zhiping)
    removeShopCollectDto : _ApiPath + "/emall-mobile/productForMobile/removeShopCollectDto.do", // 取消商品Collect
    queryCollectShopSalesAdvertiseSByUserNo : _ApiPath + "/emall-mobile/productForMobile/queryCollectShopSalesAdvertiseSByUserNo.do", // 查询所有收藏Collect
    queryShopSalesInfoByStorId : _ApiPath + "/emall-mobile/productForMobile/queryShopSalesInfoByStorId.do", // 根据门店id查询促销商品
    queryShopNotifyMsgDtoByType : _ApiPath + "/emall-mobile/shopCart/queryShopNotifyMsgDtoByType.do",//亿猫大喇叭
    queryShopNotifyMsgDtoByIdType : _ApiPath + "/emall-mobile/shopCart/queryShopNotifyMsgDtoByIdType.do",//亿猫大喇叭详情
    querySysMessage : _ApiPath + "/emall-mobile/messageForMobile/querySysMessage.do",//系统消息
    querySysMessageById : _ApiPath + "/emall-mobile/messageForMobile/querySysMessageById.do",//系统消息查询
    releaseDynamic : _ApiPath + "/emall-mobile/communityDynamicForMobile/releaseDynamic.do",  //  社区动态发布
    bindMobileNumber : _ApiPath + "/emall-mobile/memberUserForMobile/bindMobileNumber.do", // 绑定手机号
    //查询动态分类
    queryCoterieType: _ApiPath + "/emall-mobile/coterieForMobile/queryCoterieType.do",
    queryCoterieByCoterieNoPage: _ApiPath + "/emall-mobile/coterieForMobile/queryCoterieByCoterieNoPage.do",
    queryFriendDynamicList:_ApiPath + "/emall-mobile/communityDynamicForMobile/queryFriendDynamicList.do",
    queryOwnDynamicList:_ApiPath + "/emall-mobile/communityDynamicForMobile/queryOwnDynamicList.do",
    queryNearbyDynamicList:_ApiPath + "/emall-mobile/communityDynamicForMobile/queryNearbyDynamicList.do",
    pushedDynamic:_ApiPath + "/emall-mobile/communityDynamicForMobile/pushedDynamic.do",
    queryAllCommunityServiceType:_ApiPath + "/emall-mobile/communityServiceController/queryAllCommunityServiceType.do",
    queryAllCommunityServiceByName:_ApiPath + "/emall-mobile/communityServiceController/queryAllCommunityServiceByName.do",
    queryNoneReadList:_ApiPath + "/emall-mobile/communityDynamicForMobile/queryNoneReadList.do",//查询未读评论、点赞、动态查看邀请的详细信息
    queryDynamicDetail:_ApiPath + "/emall-mobile/communityDynamicForMobile/queryDynamicDetail.do",//查询动态详细信息
    smsInviteForFriends:_ApiPath + "/emall-mobile/communityFriendsForMobile/smsInviteForFriends.do",//邀请进入社区
    querySingleFriendDynamicList:_ApiPath + "/emall-mobile/communityDynamicForMobile/querySingleFriendDynamicList.do",//查询好友动态
    queryNearFriends:_ApiPath + "/emall-mobile/communityFriendsForMobile/queryNearFriends.do",//查询附近的人

    queryAllCommunityServiceByHighQuality:_ApiPath + "/emall-mobile/communityServiceController/queryAllCommunityServiceByHighQuality.do",
    queryCommunityService:_ApiPath + "/emall-mobile/communityServiceController/queryCommunityService.do",
    publishCommunityService:_ApiPath + "/emall-mobile/communityServiceController/publishCommunityService.do",
    queryAllCommunityServiceByType:_ApiPath + "/emall-mobile/communityServiceController/queryAllCommunityServiceByType.do",
    commentDynamic:_ApiPath + "/emall-mobile/communityDynamicForMobile/commentDynamic.do",
    saveCoterieQuestion:_ApiPath + "/emall-mobile/coterieForMobile/saveCoterieQuestion.do",//保存活更新问题
    saveCoterieExp:_ApiPath + "/emall-mobile/coterieForMobile/saveCoterieExp.do", //保存问题
    queryCoterieExpDetail:_ApiPath + "/emall-mobile/coterieForMobile/queryCoterieExpDetail.do", //经验详情
    saveCoteriePushed: _ApiPath + "/emall-mobile/coterieForMobile/saveCoteriePushed.do", //点赞
    saveCoterieCollect: _ApiPath + "/emall-mobile/coterieForMobile/saveCoterieCollect.do",//收藏
    queryCoterieQuestionDetail: _ApiPath + "/emall-mobile/coterieForMobile/queryCoterieQuestionDetail.do",//查询问题详情
    saveUserToFans: _ApiPath + "/emall-mobile/coterieForMobile/saveUserToFans.do",//关注,
    uploadFile : _ApiPath + "/emall-mobile/file/upload.do", // 上传头像
    queryMemberUserInfoDataByUserNo : _ApiPath + "/emall-mobile/memberUserForMobile/queryMemberUserInfoDataByUserNo.do", // 查询用户信息
    saveMemberUserInfo : _ApiPath + "/emall-mobile/memberUserForMobile/saveMemberUserInfo.do", // 添加用户信息
    saveCoterieAnswer: _ApiPath + "/emall-mobile/coterieForMobile/saveCoterieAnswer.do",//保存发布回答
    queryFriendsByMobile: _ApiPath + "/emall-mobile/communityFriendsForMobile/queryFriendsByMobile.do",
    queryCoterieQuestionPage: _ApiPath + "/emall-mobile/coterieForMobile/queryCoterieQuestionPage.do",
    queryCoterieQuesAnswerPage:_ApiPath + "/emall-mobile/coterieForMobile/queryCoterieQuesAnswerPage.do",
    queryFriends: _ApiPath + "/emall-mobile/communityFriendsForMobile/queryFriends.do",//给谁看
    addFriendsInvite: _ApiPath + "/emall-mobile/communityFriendsForMobile/addFriendsInvite.do",//好友添加邀请
    queryCoterieAnswerDetail: _ApiPath + "/emall-mobile/coterieForMobile/queryCoterieAnswerDetail.do",//查询回答详情
    updateCoterieCollect: _ApiPath + "/emall-mobile/coterieForMobile/updateCoterieCollect.do",//查询回答详情
    updateUserToFans: _ApiPath + "/emall-mobile/coterieForMobile/updateUserToFans.do",//查询回答详情
    queryFriendsByCondition: _ApiPath + "/emall-mobile/communityFriendsForMobile/queryFriendsByCondition.do",//根据手机号或昵称查询会员信息
    queryFriendsRequest:_ApiPath + "/emall-mobile/communityFriendsForMobile/queryFriendsRequest.do",//查询好友申请列表
    addFriends:_ApiPath + "/emall-mobile/communityFriendsForMobile/addFriends.do",//添加好友
    queryUnHandleRequestCount:_ApiPath + "/emall-mobile/communityFriendsForMobile/queryUnHandleRequestCount.do",//未处理的好友添加请求的数量
    saveCoterieQuestionFans: _ApiPath + "/emall-mobile/coterieForMobile/saveCoterieQuestionFans.do",
    updateCoterieQuestionFans: _ApiPath + "/emall-mobile/coterieForMobile/updateCoterieQuestionFans.do",
    queryUserPurseByUserNo : _ApiPath + "/emall-mobile/redPackForMobile/queryUserPurseByUserNo.do", // 钱包
    addSign : _ApiPath + "/emall-mobile/memberUserForMobile/signInMemberUserIntegralDto.do", // 用户签到
    querySign : _ApiPath + "/emall-mobile/memberUserForMobile/checkSignInOrNot.do",  // 查询是否签到
    queryMemberOfTheFamily : _ApiPath + "/emall-mobile/memberOfTheFamilyForMobile/queryMemberOfTheFamily.do",  // 查询所有家庭成员
    sendMessageForMemberOfTheFamily : _ApiPath + "/emall-mobile/memberOfTheFamilyForMobile/sendMessageForMemberOfTheFamily.do",  // 发送添加家庭成员请求
    
    //我的生活圈
    queryMyCoterie: _ApiPath + "/emall-mobile/coterieForMobile/queryMyCoterie.do",//我的生活圈首页
    queryMyCoterieAnswerPage: _ApiPath + "/emall-mobile/coterieForMobile/queryMyCoterieAnswerPage.do",//我的生活圈--我的回答列表查询
	queryMyCoterieCollectPage:_ApiPath + "/emall-mobile/coterieForMobile/queryMyCoterieCollectPage.do",//我的生活圈--收藏列表查询
	queryMyCoterieExpPage:_ApiPath + "/emall-mobile/coterieForMobile/queryMyCoterieExpPage.do",//我的生活圈--我发布的经验列表查询
	queryMyCoterieQuestionPage:_ApiPath + "/emall-mobile/coterieForMobile/queryMyCoterieQuestionPage.do",//我的生活圈--我的问题列表 ->我的提问
	queryCoterieQuestionFocusPage:_ApiPath + "/emall-mobile/coterieForMobile/queryCoterieQuestionFocusPage.do",//我的生活圈--我关注的问题 
	queryUserToFansFocusPage:_ApiPath + "/emall-mobile/coterieForMobile/queryUserToFansFocusPage.do",//我的生活圈--我关注的人 
	queryFansToUserFocusPage:_ApiPath + "/emall-mobile/coterieForMobile/queryFansToUserFocusPage.do",//我的生活圈--关注我的人 
    queryUserCashCard : _ApiPath + "/emall-mobile/redPackForMobile/queryUserCashCard.do", //  查看钱包提现卡
    saveMemberUserWithdrawalReview : _ApiPath + "/emall-mobile/redPackForMobile/saveMemberUserWithdrawalReview.do", //  用户钱包提现审核
    updateUserCashCard : _ApiPath + "/emall-mobile/redPackForMobile/updateUserCashCard.do", //  修改用户绑定账号
    queryNoticeInfo:_ApiPath + "/emall-mobile  /coterieForMobile/queryNoticeInfo.do",
    queryCoterieCommentPage:_ApiPath + "/emall-mobile/coterieForMobile/queryCoterieCommentPage.do",//查询评论（经验\问题\答案）
    saveCoterieComment:_ApiPath + "/emall-mobile/coterieForMobile/saveCoterieComment.do",//评论(经验\问题\答案)
    saveProductEvaluation: _ApiPath + "/emall-mobile/productForMobile/saveProductEvaluation.do",//评价上传
    saveCoterieComment:_ApiPath + "/emall-mobile/coterieForMobile/saveCoterieComment.do",//评论(经验\问题\答案)
    queryCoterieRankPage:_ApiPath + "/emall-mobile/coterieForMobile/queryCoterieRankPage.do", //查询热门话题
    queryCoterieExpPage:_ApiPath + "/emall-mobile/coterieForMobile/queryCoterieExpPage.do", //查询热门话题
    queryTotalIntegralByUserNo : _ApiPath + "/emall-mobile/memberUserForMobile/queryTotalIntegralByUserNo.do", // 查询用户总积分
    queryMemberUserIntegralDtoByUserNo : _ApiPath + "/emall-mobile/memberUserForMobile/queryMemberUserIntegralDtoByUserNo.do", //  根据会员编号查询会员积分明细
    queryShopMemberICartInfoDtoByData : _ApiPath + "/emall-mobile/memberUserForMobile/queryShopMemberICartInfoDtoByData.do", // 查询用户icart行程
    queryProductEvaluation : _ApiPath + "/emall-mobile/productForMobile/queryProductEvaluation.do", //  查询商品评价
    queryStoresBycomprehensive : _ApiPath + "/emall-mobile/storeForMobile/queryStoresBycomprehensive.do", //  综合情况查询门店
    mobileNoticePadLoginOut : _ApiPath + "/emall-mobile/memberUserForMobile/mobileNoticePadLoginOut.do", // 通知平板退出
    queryPadIsExistLoginIn : _ApiPath + "/emall-mobile/memberUserForMobile/queryPadIsExistLoginIn.do", //  查询平板是否登录
     queryConfig:_ApiPath + "/emall-mobile/messageForMobile/queryConfig.do",//获取系统参数
    addMemberOfTheFamily: _ApiPath + "/emall-mobile/memberOfTheFamilyForMobile/addMemberOfTheFamily.do",//同意或拒绝请求
    queryAllRequest:_ApiPath + "/emall-mobile/memberOfTheFamilyForMobile/queryAllRequest.do",//查询家庭申请记录
    deleteMemberOfTheFamily:_ApiPath + "/emall-mobile/memberOfTheFamilyForMobile/deleteMemberOfTheFamily.do", //删除家庭成员
    queryShopICartByFamilyNo : _ApiPath + "/emall-mobile/memberOfTheFamilyForMobile/queryShopICartByFamilyNo.do", //  查询家庭成员icart
    queryIeemooGuestByUserNo : _ApiPath + "/emall-mobile/redPackForMobile/queryIeemooGuestByUserNo.do", // 亿猫客页面查询
    saveGuestWithdrawalReview : _ApiPath + "/emall-mobile/redPackForMobile/saveGuestWithdrawalReview.do", // 亿猫客提现审核
    queryGuestTranslistByUserNo : _ApiPath + "/emall-mobile/redPackForMobile/queryGuestTranslistByUserNo.do", // 亿猫客收入明细
    transGuestAmountToPurseByUserNo : _ApiPath + "/emall-mobile/redPackForMobile/transGuestAmountToPurseByUserNo.do", // 余额转明细
    queryGuestWithdrawlistByUserNo : _ApiPath + "/emall-mobile/redPackForMobile/queryGuestWithdrawlistByUserNo.do",  // 提现明细
    saveGuestReview : _ApiPath + "/emall-mobile/redPackForMobile/saveGuestReview.do", //  自由亿猫客转专业亿猫客审核
    bindRecommendMobile : _ApiPath + "/emall-mobile/memberUser/bindRecommendMobile.do" // 绑定亿猫客
};  

var _ImgReadUrl = "http://blob00.blob.core.chinacloudapi.cn/ieemoo-blob/";

// 点击事件(click)优化

   if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
      //动态加载JS
        loadjs();
        FastClick.attach(document.body);
    }, false);
  }

var decToHex = function(str) {
    var res=[];
    for(var i=0;i < str.length;i++)
        res[i]=("00"+str.charCodeAt(i).toString(16)).slice(-4);
    return "\\u"+res.join("\\u");
}

function loadjs(){
  var rootsrc =  document.getElementsByTagName("script")[0].src;

  var script_ind = rootsrc.indexOf("/script/");
  rootsrc = rootsrc.substr(0,script_ind);
  var bundlepath =rootsrc+"/script/tool/lry/lrz.bundle.js";
//var cloudwisepath = rootsrc + "/script/tool/cloudwise/cloudwise.js"
  // alert(bundlepath)
  reloadAbleJSFn("bundle",bundlepath);
//reloadAbleJSFn("cloudwisepath",cloudwisepath);

}
//动态加载JS
function reloadAbleJSFn(id,newJS)
{
  var oldjs = null; 
  var t = null; 
  var oldjs = document.getElementById(id); 
  if(oldjs) oldjs.parentNode.removeChild(oldjs); 
  var scriptObj = document.createElement("script"); 
  scriptObj.src = newJS; 
  scriptObj.type = "text/javascript"; 
  scriptObj.id   = id; 
  document.getElementsByTagName("head")[0].appendChild(scriptObj);
}

//转化表情
function utf16toEntities(str) {  
    var patt=/[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则  
    str = str.replace(patt, function(char){  
            var H, L, code;  
            if (char.length===2) {  
                H = char.charCodeAt(0); // 取出高位  
                L = char.charCodeAt(1); // 取出低位  
                code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法  
                return "&#" + code + ";";  
            } else {  
                return char;  
            }  
        });  
    return str;  
}

var topWin= (function (p,c){
    while(p!=c){
        c = p
        p = p.parent
    }
    return c
})(window.parent,window);

function getAjax(url,  callback,options) {
    var _self = {};
    _self.options = $.extend({
        islogin:"0",  // 判断用户是否登录
        callback:[],  // 回调
        progress:"0"  // 进度条
    }, options);

    //判断是否需要登录
    if(_self.options.islogin == "1"){
        if(!user.islogin()){
            user.trunlogin(_self.options.callback);
            return false;
        }
    }

    //判断是否需要加载
    if(_self.options.progress == "1"){
        api.showProgress({
            style: 'default',
            animationType: 'fade',
            // title: '保存中',
            text: '请稍候',
            modal: true
        });
    }


    // 添加公共字段
    api.ajax({
        url: url,
        method: 'get',
        timeout: 300,
        dataType: 'json',
        returnAll: false,
        contentType: 'application/json; charset=utf-8',  //不可缺参数
        processData: false,  // 告诉jQuery不要去处理发送的数据
        contentType: false   // 告诉jQuery不要去设置Content-Type请求头
    }, function (ret, err) {
        if (callback) {
            callback(ret,err)
        }else{
            // api.alert({
            //     msg : ('错误码：' + err.code + '；错误信息：' + err.msg + '网络状态码：' + err.statusCode)
            // })
        }
    });
}

function postAjax(url, data, callback,options) {
  var _self = {};
  _self.options = $.extend({
    islogin:"0",  // 判断用户是否登录
    callback:[],  // 回调
    progress:"0"  // 进度条
  }, options);

  //判断是否需要登录
  if(_self.options.islogin == "1"){
     if(!user.islogin()){
        user.trunlogin(_self.options.callback);
        return false;
     }
  }

  //判断是否需要加载
  if(_self.options.progress == "1"){
    api.showProgress({
      style: 'default',
      animationType: 'fade',
      // title: '保存中',
      text: '请稍候',
      modal: true
    });
  }
    // 添加公共字段

  api.ajax({
      url: url,
      method: 'post',
      timeout: 300,
      dataType: 'json',
      returnAll: false,
      data: {
          values: data
      },
      contentType: 'application/json; charset=utf-8',  //不可缺参数
      processData: false,  // 告诉jQuery不要去处理发送的数据
      contentType: false   // 告诉jQuery不要去设置Content-Type请求头
  }, function (ret, err) {
     if(_self.options.progress == "1"){
      api.hideProgress(); 
     }
      if (callback) {
          callback(ret,err)
      }else{
          // api.alert({
          //     msg : ('错误码：' + err.code + '；错误信息：' + err.msg + '网络状态码：' + err.statusCode)
          // })
      }
  });
}

// signAture  个性签名
/**
 * @param  {json}	
 * @return {[type]}
 * @author luyingchun
 * @version v1.0
 */

function carmersystem(options) {
	var _self = {};
	_self.options = $.extend({
		data:{},
		url:"",
		callback:function(){

		}
	}, options);

		api.confirm({
			        msg:"添加图片",
			        buttons:["相机","相册","取消"]
			    },function (ret,err) {
			        if(3 == ret.buttonIndex){  //  用户取消
			            return;
			        }
			        var sourceType = 'album';
			        if(1 == ret.buttonIndex){  //  打开相机
			            sourceType = 'camera';
			        }
			        api.getPicture({
			            sourceType : sourceType,
			            encodingType : 'jpg',
			            mediaValue : 'pic',
			            quality :50,
			            targetWidth : 800
                  // allowEdit:true 
			        },function (ret,err) {
			            if(ret && ret.data){
                    api.showProgress({
                      style: 'default',
                      animationType: 'fade',
                      title: '上传中',
                      text: '请稍候',
                      modal: true
                    });
			          var pictureMsg = ret.data;
                       lrz(pictureMsg, {
                                width: 1024,
                                quality:0.5
                            }).then(function (rst) {
                              // alert(JSON.stringify(rst.base64Len * 0.8 / 1024))
                              // alert(rst.base64)
                               var  base64 = rst.base64.substring(23);
                              options.data.uploadFile = base64;
                              postAjax(_self.options.url,_self.options.data,function (ret,err) {
                                     api.hideProgress(); 
                                     // alert(JSON.stringify(ret.data))
                                      if(ret){
                                        if(ret.data){
                                          ret.data.base64 = rst.base64;
                                          ret.data.locationsrc = pictureMsg;
                                          _self.options.callback(ret.data);
                                        }
                                      }else{
                                          // alert(JSON.stringify(err));
                                          alert("服务器繁忙");
                                          return false;
                                      }
                                  })
                            })

			                localStorage.setItem('picMsg',pictureMsg);
			            }
			        });
			    });
        //链式返回
        return this;
    };

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL("image/"+ext);
    return dataURL;
}

//  打开一个窗口（*）
function openWin(name,param) {
    var delay = 0;
    if (api.systemType != 'ios') {
        delay = 300;
    }
    api.openWin({
        name : '' + name + '',
        url : '' + name + '.html',
        bounces : false,
        delay : delay,
        slidBackEnabled : true,
        vScrollBarEnabled : true,
        pageParam : {
            param : param
        },
        reload :true
    });
};

//  关闭窗口 （*）
function closeWin() {
    api.closeWin({
   });
};
// 向右滑动
function swipeRight() {
    api.addEventListener({
        name:'swiperight'
    }, function(ret, err){
        if(ret){closeWin()}
    });
}
// 核实是否为空 （*）
function checkEmpty(str) {
    if (str === undefined) {
        return '不能为空';
    }
    if (str == "" || str == null) {
        return '不能为空';
    }
    return '';
}
// 核实字符串长度 （*）
function checkLength(str, min, max) {
    min = min || 6;
    max = max || 20;
    var pat = new RegExp("^.{" + min + "," + max + "}$", "i");

    if (!pat.test(str)) {
        return "长度为" + min + "~" + max + "位字符";
    }
    return '';
}

function checkMobile(str) {
    var pat = new RegExp("^(?:13|14|15|17|18)[0-9]{9}$", "i");
    if (!pat.test(str)) {
        return '手机号格式错误';
    }
    return '';
}
//  2秒后自动消失的提示 （*）
function toast(text,location){
    if(!location){
      location = "buttom";
    }
    api.toast({
        msg : text,
        location : location,
        duration : 2000,
    });
};
// 弹窗
function alertDiolog() {
	var html = '';
    html +='<div style="width:80%;height:100px;background-color:rgba(0,0,0,0.5);position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;border-radius:4px;transition:all .5s ease;"></div>';
    $(document.body).append(html);
};


 /**
  * 打开新窗口
  * @param  {[type]} name [description]
  * @param  {[type]} url  [description]
  * @param  {[type]} data [description]
  * @return {[type]}      [description]
  */
 function openWinFrame(name, url, options) { //打开新窗口并且需要验证登录
   var _self = {};
   _self.options = $.extend({
      islogin:"0",
      callback:[]
    }, options);

    //判断是否需要登录
    if(_self.options.islogin == "1"){
      if(!user.islogin()){
        user.trunlogin(_self.options.callback);
        return false;
      }
    }
   	var pageParam = _self.options;
   	var times;
   	if (api.systemType == "ios") {
   		times = 0;
   	} else {
   		 times = 300;
   	}
   	api.openWin({
   		name: name,
   		url: url,
   		delay: times,
   		slidBackType: 'edge',
   		pageParam: _self.options
   	});
   }

//  2秒后自动消失的提示 （*）
function toasts(text,location){
    api.toast({
        msg : text,
        location : "buttom",
        duration : 2000
    });
}


var user = {
      //获取用户信息
      getuserinfo:function(){
        var userstr = localStorage.getItem("user");
        return  JSON.parse(userstr);
      },
      //添加用户信息
      setuserinfo:function(userbean){
        localStorage.setItem("user",JSON.stringify(userbean));
      },
      //操作用户的某个字段属性
      setuserbyKey:function(key,val){
        var userstr = localStorage.getItem("user");
        if(userstr){
          var users = JSON.parse(userstr);
          users[key] = val;
          localStorage.setItem("user",JSON.stringify(users));
          // alert(localStorage.getItem('user'))
        }
      },
      //删除用户
      clearuser:function(){
        localStorage.removeItem("user");
        // localStorage.removeItem('mobile');
      },
      //判断登录
      islogin:function(){
        var userstr = localStorage.getItem("user");
        if(userstr){
          return true;
        }
        return false;
      },
      //是否加入社区
      isaddcommunity:function(){
        var _self = this;
        if(_self.islogin()){
            var userstr = localStorage.getItem("user");
            var communityNo = JSON.parse(userstr).communityNo;
            if(!communityNo){
              return false;
            }
            if(communityNo == ""){
              return false;
            }
            return true;
          }else{
            return false;
        }
      },
      trunlogin:function(options){
        //如果不传方法默认一个空方法
        var frmurl = filepath.getPath(filepath.login.frm);
        api.openWin({
            name : "login_frm",
            url : frmurl,
            bounces : false,
            slidBackEnabled : true,
            vScrollBarEnabled : true,
            pageParam : {
                param : options
            },
            reload :true
        });
      },
      //获取用户唯一标识
      getuserNo:function(){
        var _self = this;
        if(_self.islogin()){
          var userstr = localStorage.getItem("user");
          return JSON.parse(userstr).userNo;
        }else{
          return "";
        }
//         return "1000000000000000034";
      },
      getnickName:function(){
         var _self = this;
        if(_self.islogin()){
          var userstr = localStorage.getItem("user");
          return JSON.parse(userstr).nickName;
        }else{
          return "";
        }
      },
      getsignAture:function(){
        var _self = this;
        if(_self.islogin()){
          var userstr = localStorage.getItem("user");
          return JSON.parse(userstr).signAture;
        }else{
          return "";
        }
      },
      getcommunityNo:function(){
         var _self = this;
          if(_self.islogin()){
            var userstr = localStorage.getItem("user");
            return JSON.parse(userstr).communityNo;
          }else{
            return "";
          }
      }
   }

// 获取当前时间
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    /*  + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds(); */

var coupon = {
    todytime : currentdate
   }


   var cacheimage = {
      json:function(){
         selector.each(function(data) {! function(data) {
                
        }(data);
        });
      },
      cache:function(options){
        var _self = {};
         _self.options = $.extend({
          url:"",
          type:"object",
          key:[],
          vueobj:{},
          callback:function(){

          },

        }, options);
         var url = _self.options.url;

         if(type = "array"){
            for(ind in url){
             _self.options.key.push(ind); 
            }
         }
         
         if(url == "" || undefined){
            return url ;
         }
          for(ind in _self.options.key){
            var _key = _self.options.key[ind];
            var currenturl = url[_key];
            // url[_key] = api.wgtRootDir+"/image/nick.png";
            _self.options.url[_key] = "";
            var pos = currenturl.lastIndexOf("/");
            var filename = currenturl.substring(pos + 1);
            var path = api.cacheDir + "/pic/" + filename;
            var obj = api.require('fs');

            var existobj = obj.existSync({path : path})
            if(existobj.exist){
              if (!existobj.directory) {
                 path = api.cacheDir + "/pic/" + filename;
                 _self.options.url[_key] = path;
              }
            }else{
              api.download({
                      url : currenturl,
                      savePath : path,
                      report : false,
                      cache : true,
                      allowResume : true,
                      test:"3232"
              }, function(ret, err,event) {
                      //msg(ret);
                      alert(event);
                       _self.options.vueobj.$forceUpdate();
                      if (ret) {
                               _self.options.url[_key] = ret.savePath;
                      } else {
                              // var value = err.msg;
                      };
              });
            }
          }
          
          return path;
      }

   }
/**
 * 下拉选项
 * @param  {[type]}   data     [数据]
 * @param  {Function} callback [回调事件]
 * @return {[type]}   [description]
 */
function select(data,callback){
   var UIActionSelector = api.require('UIActionSelector');
        UIActionSelector.open({
            datas: data,
            layout: {
                row: 5,
                col: 1,
                height: 45,
                size: 15,
                sizeActive: 15,
                rowSpacing: 1,
                colSpacing: 10,
                maskBg: 'rgba(0,0,0,0.2)',
                bg: '#fff',
                color: '#666666',
                colorActive: '#d02e2e',
                colorSelected: '#d02e2e'
            },
            animation: true,
            cancel: {
                text: '取消',
                size: 12,
                w: 90,
                h: 35,
                bg: '#fff',
                bgActive: '#fff',
                color: '#d02e2e',
                colorActive: '#d02e2e'
            },
            ok: {
                text: '确定',
                size: 12,
                w: 90,
                h: 35,
                bg: '#fff',
                bgActive: '#fff',
                color: '#d02e2e',
                colorActive: '#d02e2e'
            },
            title: {
                text: '血型',
                size: 12,
                h: 44,
                bg: '#fff',
                color: '#fff'
            },
            fixedOn: api.frameName
        }, function(ret, err) {
            if (ret) {
              if("ok" == ret.eventType){
                // alert(ret.selectedInfo[0].name + ret.selectedInfo[1].name +ret.selectedInfo[2].name);
                // alert(JSON.stringify( ret.selectedInfo)); 
                if(callback){
                  callback(ret.selectedInfo);
                }

                // $("#storetype").val(ret.selectedInfo[0].name + ret.selectedInfo[1].name +ret.selectedInfo[2].name);
                // storeType = ret.selectedInfo[2].id;
              }
                // alert(JSON.stringify(ret));
            } else {
                alert(JSON.stringify(err));
            }
        });
}

function getDateDiff(dateTimeStamp){
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if(diffValue < 0){return;}
  var monthC =diffValue/month;
  var weekC =diffValue/(7*day);
  var dayC =diffValue/day;
  var hourC =diffValue/hour;
  var minC =diffValue/minute;
  if(monthC>=1){
    result="" + parseInt(monthC) + "月前";
  }
  else if(weekC>=1){
    result="" + parseInt(weekC) + "周前";
  }
  else if(dayC>=1){
    result=""+ parseInt(dayC) +"天前";
  }
  else if(hourC>=1){
    result=""+ parseInt(hourC) +"小时前";
  }
  else if(minC>=1){
    result=""+ parseInt(minC) +"分钟前";
  }else
  result="刚刚";
  return result;
}

function getDateTimeStamp(dateStr){
 return Date.parse(dateStr.replace(/-/gi,"/"));
}

var dialog = {
  alert:function(options,callback){
    var dialogBox = api.require('dialogBox');
    dialogBox.alert({
        texts: {
            title: '温馨提示',
            content: options.text,
            leftBtnTitle : '取消',
            rightBtnTitle: '确认'
        },
        styles: {
            bg: '#fff',
            w: 300,
            title: {
                marginT: 20,
                iconSize: 40,
                titleSize: 14,
                titleColor: '#000'
            },
            content: {
                color: '#000',
                size: 14
            },
            left: {
                marginB: 7,
                marginL: 20,
                w: 130,
                h: 35,
                corner: 2,
                bg: '#D0302F',
                size: 12,
                color:'#fff'
            },
            right: {
                marginB: 7,
                marginL: 10,
                w: 130,
                h: 35,
                corner: 2,
                bg: '#D0302F',
                size: 12,
                color:'#fff'
            }
        }
    }, function(ret) {
        if (ret.eventType == 'left') {
            // var dialogBox = api.require('dialogBox');
            dialogBox.close({
                dialogName: 'alert'
            });
        }else{
            if(callback){callback()};
            dialogBox.close({
                dialogName: 'alert'
            });
        }
    });
  },
  input:function(options){
  var _self = {};
  _self.options = $.extend({
    title:"",
    placeholder:"请输入",
    leftBtnTitle:"取消",
    rightBtnTitle:"确定",
    callback:function(){

    }
  }, options);

    var dialogBox = api.require('dialogBox');
    dialogBox.input({
        keyboardType: 'default',
        texts: {
            title: _self.options.title,
            placeholder:  _self.options.placeholder,
            leftBtnTitle: _self.options.leftBtnTitle,
            rightBtnTitle: _self.options.rightBtnTitle
        },
        styles: {
            bg: '#fff',
            corner: 2,
            w: 300,
            h: 200,
            title: {
                h: 60,
                alignment: 'center',
                size: 14,
                color: '#000',
                bg:"#696969"
            },
            input: {
                h: 60,
                marginUD: 6,
                textSize: 14,
                textColor: '#000'
            },
            dividingLine: {
                width: 0.5,
                color: '#696969'
            },
            left: {
                bg: '#D0302F',
                color: '#fff',
                size: 12
            },
            right: {
                bg: '#D0302F',
                color: '#fff',
                size: 12
            }
        }
    }, function(ret) {
        
        if (ret.eventType == 'left') {
            var dialogBox = api.require('dialogBox');
            dialogBox.close({
                dialogName: 'input'
            });
        }else if(ret.eventType == 'right'){
            
            if($.trim(ret.text) == ""){
                alert("内容不允许为空");
                return false;
            }
            var dialogBox = api.require('dialogBox');
            dialogBox.close({
                dialogName: 'input'
            });
           _self.options.callback(ret.text);
        }
    });
  },
  share : function (option) {
        var dialogBox = api.require('dialogBox');
        dialogBox.actionMenu ({
            rect:{
                h: 150
            },
            texts:{
                cancel: '取  消'
            },
            items:[
                {
                    text: '微信',
                    icon: 'widget://image/icon/wx.png'
                },
                {
                    text: 'QQ',
                    icon: 'widget://image/icon/qq.png'
                },
                {
                    text: '朋友圈',
                    icon: 'widget://image/icon/wx_friend.png'
                },
                {
                    text: 'QQ空间',
                    icon: 'widget://image/icon/qqZone.png'
                }
            ],
            styles:{
                bg:'#FFF',
                column: 4,
                itemText: {
                    color: '#000',
                    size: 12,
                    marginT:8,
                },
                itemIcon:{
                    size:50,
                },
                cancel:{
                    bg: 'fs://icon.png',
                    color:'#000',
                    h: 44 ,
                    size: 16
                }
            },
            isCuttingLine : true,
            tapClose : true
        }, function(ret){
            if(ret){
                var eventType = ret.eventType;
                var index = ret.index;
                if(eventType == 'cancel'){
                    dialogBox.close({
                        dialogName: 'actionMenu'
                    });
                }
                if(index == 0){
                    var imgUrl = option.imgUrl;
                    api.imageCache({
                        url: imgUrl,
                    },function(ret,err){
                        if (ret) {
                            var imgUrl = ret.url;

                            var wx = api.require('wx');
                            wx.shareWebpage({
                                apiKey: '',
                                scene: 'session',
                                title: option.title,
                                description: option.description,
                                thumb: imgUrl,  // 要求本地路径（fs://、widget://）大小不能超过32K,需要路径包含图片格式后缀，否则如果原图片为非png格式，会分享失败
                                contentUrl: option.url  // 分享网页的 url 地址，长度不能超过10k。
                            }, function(ret, err) {
                                if (ret.status) {
                                    toast('分享成功');
                                } else {
                                    toast('分享失败');
                                }
                            });
                        }
                    });
                }
                if(index == 1){
                    var imgUrl = option.imgUrl;
                    api.imageCache({
                        url : imgUrl
                    },function (ret,err) {
                        if(ret){
                            var imgUrl  = ret.url;
                            var qq = api.require('qq');
                            qq.shareNews({
                                type : 'QFriend',
                                title: option.title,
                                description: option.description,
                                imgUrl: imgUrl,
                                url: option.url
                            },function(ret,err) {
                                if(ret.status){
                                    toast('分享成功')
                                }else{
                                    toast('分享失败')
                                }
                            });
                        }
                    })
                }
                if(index == 2){
                    var imgUrl = option.imgUrl;
                    api.imageCache({
                        url: imgUrl,
                    },function(ret,err){
                        if(ret){
                            var imgUrl = ret.url;
                            var wx = api.require('wx');
                            wx.shareWebpage({
                                apiKey: '',
                                scene: 'timeline',
                                title: option.title,
                                description: option.description,
                                thumb: imgUrl,
                                contentUrl: option.url
                            }, function(ret, err) {
                                if (ret.status) {
                                    toast('分享成功');
                                } else {
                                    toast('分享失败');
                                }
                            });
                        }
                    })
                }
                if(index == 3){
                    var imgUrl = option.imgUrl;
                    api.imageCache({
                        url : imgUrl
                    },function (ret,err) {
                        if(ret){
                            var imgUrl = ret.url;
                            var qq = api.require('qq');
                            qq.shareNews({
                                title: option.title,
                                description: option.description,
                                imgUrl: imgUrl,
                                url: option.url,
                                type : 'QZone'
                            },function(ret,err) {
                                if(ret.status){
                                    toast('分享成功')
                                }else{
                                    toast('分享失败')
                                }
                            });
                        }
                    })
                }
            }
        });
    },
  shares : function (option) {
        var dialogBox = api.require('dialogBox');
        dialogBox.actionMenu ({
            rect:{
                h: 150
            },
            texts:{
                cancel: '取  消'
            },
            items:[
                {
                    text: '微信',
                    icon: 'widget://image/icon/wx.png'
                },
                {
                    text: '朋友圈',
                    icon: 'widget://image/icon/wx_friend.png'
                },
                {
                    text: 'QQ',
                    icon: 'widget://image/icon/qq.png'
                },
                {
                    text: 'QQ空间',
                    icon: 'widget://image/icon/qqZone.png'
                },
                {
                    text: '动态',
                    icon: 'widget://image/icon/content.png'
                }
            ],
            styles:{
                bg:'#FFF',
                column: 5,
                itemText: {
                    color: '#000',
                    size: 12,
                    marginT:8,
                },
                itemIcon:{
                    size:50,
                },
                cancel:{
                    bg: 'fs://icon.png',
                    color:'#000',
                    h: 44 ,
                    size: 16
                }
            },
            isCuttingLine : true,
            tapClose : true
        }, function(ret){
            if(ret){
                var eventType = ret.eventType;
                var index = ret.index;
                if(eventType == 'cancel'){
                    dialogBox.close({
                        dialogName: 'actionMenu'
                    });
                }
                if(index == 0){
                    var imgUrl = option.imgUrl;
                    api.imageCache({
                        url: imgUrl,
                    },function(ret,err){
                        if (ret) {
                            var imgUrl = ret.url;

                            var wx = api.require('wx');
                            wx.shareWebpage({
                                apiKey: '',
                                scene: 'session',
                                title: option.title,
                                description: option.description,
                                thumb: imgUrl,  // 要求本地路径（fs://、widget://）大小不能超过32K,需要路径包含图片格式后缀，否则如果原图片为非png格式，会分享失败
                                contentUrl: option.url  // 分享网页的 url 地址，长度不能超过10k。
                            }, function(ret, err) {
                                if (ret.status) {
                                    toast('分享成功');
                                } else {
                                    toast('分享失败');
                                }
                            });
                        }
                    });
                }
                if(index == 1){
                    var imgUrl = option.imgUrl;
                    api.imageCache({
                        url : imgUrl
                    },function (ret,err) {
                        if(ret){
                            var imgUrl  = ret.url;
                            var qq = api.require('qq');
                            qq.shareNews({
                                type : 'QFriend',
                                title: option.title,
                                description: option.description,
                                imgUrl: imgUrl,
                                url: option.url
                            },function(ret,err) {
                                if(ret.status){
                                    toast('分享成功')
                                }else{
                                    toast('分享失败')
                                }
                            });
                        }
                    })
                }
                if(index == 2){
                    var imgUrl = option.imgUrl;
                    api.imageCache({
                        url: imgUrl,
                    },function(ret,err){
                        if(ret){
                            var imgUrl = ret.url;
                            var wx = api.require('wx');
                            wx.shareWebpage({
                                apiKey: '',
                                scene: 'timeline',
                                title: option.title,
                                description: option.description,
                                thumb: imgUrl,
                                contentUrl: option.url
                            }, function(ret, err) {
                                if (ret.status) {
                                    toast('分享成功');
                                } else {
                                    toast('分享失败');
                                }
                            });
                        }
                    })
                }
                if(index == 3){
                    var imgUrl = option.imgUrl;
                    api.imageCache({
                        url : imgUrl
                    },function (ret,err) {
                        if(ret){
                            var imgUrl = ret.url;
                            var qq = api.require('qq');
                            qq.shareNews({
                                title: option.title,
                                description: option.description,
                                imgUrl: imgUrl,
                                url: option.url,
                                type : 'QZone'
                            },function(ret,err) {
                                if(ret.status){
                                    toast('分享成功')
                                }else{
                                    toast('分享失败')
                                }
                            });
                        }
                    })
                }
                if(index == 4){
                    var imgUrl = option.imgUrl?option.imgUrl:'';
                    var title = option.title?option.title:'';
                    var description = option.description?option.description:'';
                    var url = option.url;
                    var userNo = user.getuserNo();
                    var data = {
                        dynamicInfo:{
                            content:description,
                            image:imgUrl,
                            title : title,
                            type:3,
                            createBy:userNo,
                            authority:0,
                        }
                    }
                    postAjax(ApiUrl.releaseDynamic,data,function (ret,err) {
                        if(ret){
                           api.alert({
                               title : '温馨提示',
                               msg:'分享动态成功'
                           })
                            api.sendEvent({
                                name:'shares',
                                extra:{
                                    imgUrl :imgUrl,
                                    description:description,
                                    title:title
                                }
                            })
                        }else{
                            api.alert({
                                title : '温馨提示',
                                msg:ret.retMsg
                            })
                        }
                    })
                }
            }
        });
    },
  discount :function(option){  /* ../html/discount/discount_index.html */
        var dialogBox = api.require('dialogBox');
        var url = api.wgtRootDir + '/html/discount/discount_index.html'
            dialogBox.webView({
                tapClose : true,
                path: url,
                styles : {
                    bg : '#E63223',
                    corner : 10,
                    w : 335,
                    h : 500,
                    webView : {
                        h : 500,
                        bg : 'green',
                    },
                }
            }, function(ret) {
                api.alert({
                    msg : JSON.stringify(ret)
                });
                if (ret.eventType == 'left') {
                    var dialogBox = api.require('dialogBox');
                    dialogBox.close({
                        dialogName : 'webView'
                    });
                }
            });
    }
}

// 获取验证码
function getSmsCode(phone,btn,verificationCodeType) {
    btn.click(function () {
        if("1" == btn.attr("data-timering")){
            return false;
        }
        btn.attr("data-timering","1");
        var data = {
            mobile : phone,
            verificationCodeType : verificationCodeType
        }
        postAjax(ApiUrl.getSmscode, data,function (ret, err) {
            if (ret) {
                var voice_interval = 60;
                var int1 = setInterval(function(){
                    var i = voice_interval--;
                    btn.text("已发送("+i+")");
                    if(0 == i){
                        clearInterval(int1);
                        btn.attr("data-timering","0");
                        btn.text("发送验证码");
                    }
                },1000);
            } else {
                api.alert({ msg: JSON.stringify(err) });
            }
        })
    })
}
// 验证短信验证码
function checkSmsCode(phone,smscode,verificationCodeType,callBack) {
    var data = {
        mobile : phone,
        smsCode : smscode,
        verificationCodeType : verificationCodeType
    };
    postAjax(ApiUrl.checkSmscode,data,function (ret,err) {
        if(ret){
            if(ret.retCode == 0){
                callBack();
            }else{
                toast('请输入正确的短信验证码','2000')
            }
        }else{

        }
    })
}

// 获取当前时间
function getNowFormatDate(joinstr) {
    if(!joinstr){
        joinstr = "";
    }
    var date = new Date();
    var seperator1 = joinstr;
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var todayendDate =date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return todayendDate;
}


//坐标位置获取
function loc(back){
	var bMap = api.require('bMap');
    bMap.getLocation({
        autoStop: true,
        filter: 1
    }, function(ret, err) {
        if (ret.status) {
            back(ret);
        }
    });
}