/**
 * Created by HonyBob on 2017/6/6.
 */
apiready = function () {
    swipeRight();
    // qqInit();
    // wxInit();
    loginit();
}
//手机号登陆
function login_phone() {
    var loginName = $('#loginName').val();
    var loginPassword = $('#loginPassword').val();
    if(!login_phone_chk(loginName, loginPassword)){
        return false;
    }
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '登录中',
        text: '请稍候',
        modal: true
    });
    var data = {
        loginName : loginName,
        loginPassword : hex_md5(loginPassword)
    }
    postAjax(ApiUrl.login,data, function (ret, err) {
        if (ret) {
            if(ret.retCode=='0'){
                var userNo = ret.data.memberUserInfoDto.userNo;
                var nickname = ret.data.memberUserInfoDto.nickName;
                var headportrait = ret.data.memberUserInfoDto.headPortrait;
                var signAture = ret.data.memberUserInfoDto.signAture;
                var mobile = ret.data.memberUserInfoDto.phone;
                var name  = ret.data.memberUserInfoDto.name;
                var weight = ret.data.memberUserInfoDto.weight;
                var communityName = ret.data.memberUserInfoDto.communityName;
                var communityNo = ret.data.memberUserInfoDto.communityNo;
                var referralCode = ret.data.memberUserInfoDto.referralCode;
                var isGuest = ret.data.memberUserInfoDto.isGuest;
                var userbean = {
                    userNo:userNo,
                    mobile : mobile,
                    nickName : nickname,
                    headPortrait : headportrait,
                    signAture : signAture,
                    name : name,
                    weight: weight,
                    communityNo : communityNo,
                    communityName : communityName,
                    referralCode : referralCode,
                    isGuest : isGuest,
                };
                user.setuserinfo(userbean);

                //判断是否存在回调
                var param = api.pageParam.param;
                if(param){
                   for(ind in param){
                    callbacklist[param[ind]](userbean)
                   }
                }
                
                api.sendEvent({
                    name: 'userLogin',
                    extra: {
                        userNo: ret.data.userNo,
                        mobile : mobile,
                        nickname : nickname,
                        headportrait :　headportrait
                    }
                });
                api.closeWin();
            }else{
                openDialog('0',ret.retMsg);
            }
        }
    },{progress:'1'});
}

var callbacklist = {
    test:function(userbean){
         api.sendEvent({
            name: 'test',
            extra: {
               userbean:userbean
            }
        });
    },
    addexperiece:function(userbean){
        api.sendEvent({
            name: 'addexperiece',
            extra: {
               userbean:userbean
            }
        });
    },
    cmmounityinit:function(userbean){
        api.sendEvent({
            name: 'cmmounityinit',
            extra: {
                
            }
        });
    },
    refushbeandetail:function(userbean){
        api.sendEvent({
            name: 'refushbeandetail',
            extra: {
                
            }
        });
    },
    checkstore : function (userbean) {
        api.sendEvent({
            name: 'checkstore',
            extra: {

            }
        });
    }
}

//手机号登陆判断
function login_phone_chk(accountName, accountPwd)   {
    var msg = "";
    msg = checkEmpty(accountName);
    if (msg != "") {
        openDialog('1',"请输入用户名");
        return false;
    }
    msg = checkEmpty(accountPwd);
    if (msg != "") {
        openDialog('1',"请输入密码");
        return false;
    }
    msg = checkLength(accountPwd, 6, 12);
    if (msg != "") {
        openDialog('1',"登陆账号或密码有误");
        return false;
    }
    return true;
}

var dialog = new auiDialog({})
function openDialog(type,msg){
    switch (type) {
        case (type):
            api.alert({
                title:"温馨提示",
                msg:msg,
                buttons:['确定']
            },function(ret){
                // alert(ret);
            })
            break;
        case (type):
            api.alert({
                title:"登录失败",
                msg:msg,
                // buttons:['确定']
            },function(ret){
                // alert(ret);
            })
            break;
        default:
            break;
    }
}

// 点击进入忘记密码
function enterForgetPassword() {
    var data = {
        url:{
            url: api.wgtRootDir+"/html/forgetPassword/forgetPassword.html",
            name:"forgetpassword",
            title:"忘记密码"
        },
        islogin : '0',
    }
    openWinFrame("community", api.wgtRootDir+"/html/comm/head_back.html",data);
}

// 点击进入注册
function enterreg() {
    var data = {
        url:{
            url: api.wgtRootDir+"/html/register/register.html",
            name:"register",
            title:"注册"
        },
        islogin : '0',
    }
    openWinFrame("community", api.wgtRootDir+"/html/comm/head_back.html",data);
}

// // qq登录初始化

// function qqInit() {
//     api.appInstalled({
//         appBundle: 'mqq'
//     }, function(ret, err) {
//         if (ret.installed) {
//             $('.qqIconBox').removeClass('display');
//         }else{
//             $('.otherlogin ul').css({width:'50px',margin:'0 auto'})
//         }
//     });
// }
// //  微信登录初始化
// function wxInit() {
//     var wx = api.require('wx');
//     wx.isInstalled(function (ret,err) {
//         if (ret.installed == true){
//             $('.wxIconBox').removeClass('display');
//         }else{
//             $('.otherlogin ul').css({width:'50px',margin:'0 auto'})
//         }
//     })
// }

function loginit(){
    var data = {
        key : "otherloginway"
    }
    postAjax(ApiUrl.queryConfig,data,function (ret,err) {
        if("0" == ret.retCode){
            if("0" == ret.data){
                $(".login_third_party").removeClass('display');
            }
        }
    });
} 


//     QQ登录
function qqLogin() {
    var qq = api.require('qq');
    qq.installed(function (ret) {
        if(ret.status == true){
            qq.login(function (ret,err) {
                var openId= ret.openId;
                var access_token = ret.accessToken;
                if(ret.status == true){
                    qq.getUserInfo(function (ret,err) {
                        if(ret.status == true){
                            var nickName = ret.info.nickname;
                            var city = ret.info.city;
                            var province = ret.info.province;
                            var sex = ret.info.gender;
                            var figureurl_qq_2 = ret.info.figureurl_qq_2;
                            if(sex == '男'){
                                sex = 1;
                            }else if(sex == '女'){
                                sex = 2;
                            }
                            var qqinfourl = "https://graph.qq.com/oauth2.0/me?access_token="+access_token+"&unionid=1";
                            getAjax(qqinfourl,function (ret,err) {
                                var replaceStr = "";
                                var unionstr = err.body.replace("callback(","").replace(");","");
                                var union = $.parseJSON(unionstr);
                                var unionid = union.unionid;
                                // str.replace(new RegExp(replaceStr,'gm'),'');
                                // var union = ret.callback.replace(/-/g,'');
                                var data = {
                                    memberUserInfo : {
                                        createBy : 'qq',
                                        nickName : nickName,
                                        city : city,
                                        province : province,
                                        sex : sex,
                                        openId : openId,
                                        unionid : unionid,
                                        headimgurl : figureurl_qq_2
                                    }
                                };
                                postAjax(ApiUrl.authorizedLogin,data,function (ret,err) {
                                    if(ret){
                                        var userNo = ret.data.userNo;
                                        var mobile = ret.data.mobile;
                                        var nickname = ret.data.nickName;
                                        var headPortrait = ret.data.headPortrait;
                                        var referralCode = ret.data.referralCode;
                                        var isGuest = ret.data.isGuest;
                                        var userbean = {
                                            userNo:userNo,
                                            mobile : mobile,
                                            nickName : nickname,
                                            headPortrait : headPortrait,
                                            referralCode:referralCode,
                                            isGuest : isGuest
                                        };
                                        user.setuserinfo(userbean);

                                        //  判断是否存在回调
                                        var param = api.pageParam.param;
                                        if(param){
                                            for(ind in param){
                                                callbacklist[param[ind]](userbean)
                                            }
                                        }

                                        api.sendEvent({
                                            name : 'qqInfo',
                                            extra : {
                                                userNo : userNo,
                                                nickName : nickName,
                                                headPortrait : headPortrait,
                                                mobile : mobile
                                            }
                                        });
                                        api.closeWin();


                                    }
                                })
                            })

                        }
                    })
                }
            })
        }else{
            api.alert({ msg: "当前设备未安装qq客户端" });
        }
    })
}
// 微信登录
function wxLogin() {
    var wx = api.require('wx');
    wx.isInstalled(function (ret,err) {
        if (ret.installed == true){
            wx.auth({
                apiKey: 'wx691bf06b4d7ca60f'
            }, function(ret, err) {
                if(ret.status == true){
                    var code = ret.code;
                    wx.getToken({
                        apiKey: '',
                        apiSecret: '',
                        code: code
                    }, function(ret, err) {
                        if (ret.status) {
                            var accessToken = ret.accessToken;
                            var openId = ret.openId;
                            wx.getUserInfo({
                                accessToken: accessToken,
                                openId: openId
                            }, function(ret, err) {
                                if (ret.status) {
                                    var nickName = ret.nickname;
                                    var city = ret.city;
                                    var province = ret.province;
                                    var sex = ret.sex;
                                    var figureurl_qq_2 = ret.headimgurl;
                                    var unionid = ret.unionid;
                                    var data = {
                                        memberUserInfo : {
                                            createBy : 'weixin',
                                            nickName : nickName,
                                            city : city,
                                            province : province,
                                            sex : sex,
                                            openId : openId,
                                            unionid : unionid,
                                            headimgurl : figureurl_qq_2
                                        }
                                    };
                                    postAjax(ApiUrl.authorizedLogin,data,function (ret,err) {
                                        if(ret){
                                           if(ret.retCode == 0){
                                               var userNo = ret.data.userNo;
                                               var mobile = ret.data.mobile;
                                               var nickname = ret.data.nickName;
                                               var headPortrait = ret.data.headPortrait;
                                               var referralCode = ret.data.referralCode;
                                               var isGuest = ret.data.isGuest;
                                               var userbean = {
                                                   userNo:userNo,
                                                   mobile : mobile,
                                                   nickName : nickname,
                                                   headPortrait : headPortrait,
                                                   referralCode:referralCode,
                                                   isGuest : isGuest
                                               };
                                               user.setuserinfo(userbean);

                                               //  判断是否存在回调
                                               var param = api.pageParam.param;
                                               if(param){
                                                   for(ind in param){
                                                       callbacklist[param[ind]](userbean)
                                                   }
                                               }
                                               api.sendEvent({
                                                   name : 'wxInfo',
                                                   extra : {
                                                       userNo : userNo,
                                                       nickName : nickName,
                                                       headPortrait : headPortrait,
                                                       mobile : mobile
                                                   }
                                               });
                                               api.closeWin();

                                           }
                                        }else{
                                            alert(JSON.stringify(err))
                                        }
                                    })
                                }
                            });
                        }
                    });
                }
            });

        }else{
            alert('当前设备未安装微信客户端');
        }
    })
}
