/**
 * Created by HonyBob on 2017/6/18.
 */
function registerView(){
    var data = {
        url:{
            url: api.wgtRootDir+"/html/register/register.html",
            name:"register",
            title:"注册"
        },
        info:{},
        islogin:"0",
        callback:[]
    }
    openWinFrame("register_head", api.wgtRootDir+"/html/comm/head_back.html",data);
}
apiready = function () {
    if(user.islogin()){
        var userNo = user.getuserNo();
        var data = {
            userNo : userNo
    };
        postAjax(ApiUrl.queryMemberUserInfoDataByUserNo,data,function (ret,err) {
            if(ret){
                if(ret.data){
                    var nickName = ret.data.nickName;
                    var headPortrait = ret.data.headPortrait;
                    var mobile = ret.data.phone;
                    if(nickName && headPortrait){
                        $('.userLogin').removeClass('hides').html(nickName);
                        $('.mine_top_con_tx img').attr('src',headPortrait);
                        $('.userLoginIng').addClass('hides');
                    }else{
                        $('.userLogin').removeClass('hides').html(mobile);
                        $('.userLoginIng').addClass('hides');
                    }
                }
            }
        })
    }
    //我的好友
    $("#myfriendLi").click(function(){
            var data = {
                url:{
                      url: api.wgtRootDir+"/html/usercenter/friend/my_friends.html",
                      name:"my_friends",
                      title:"我的好友"
                  },
                islogin : '1',
                  
            }

            openWinFrame("my_friends_frm", api.wgtRootDir+"/html/comm/head_back.html",data);
    });
    //家庭成员
    $("#myfamilyLi").click(function(){
            var data = {
                url:{
                      url: api.wgtRootDir+"/html/usercenter/family/my_family.html",
                      name:"my_family",
                      title:"家庭成员"
                  },
                islogin : '1',

            }

            openWinFrame("my_family_frm", api.wgtRootDir+"/html/comm/head_back.html",data);
    });

    // 监听登录事件
    api.addEventListener({
        name : 'userLogin'
    },function (ret,err) {
        if(ret){
            // 进入页面查询是否签到
            signVm.signinit();

            var mobile = ret.value.mobile;
            var nickname = ret.value.nickname;
            var headportrait = ret.value.headportrait;
           
            if(nickname && headportrait){
                $('.userLogin').removeClass('hides').html(nickname);
                $('.mine_top_con_tx img').attr('src',headportrait);
                $('.userLoginIng').addClass('hides');
            }else{
                $('.userLogin').removeClass('hides').html(mobile);
                $('.userLoginIng').addClass('hides');
            }
            window.location.reload();
        }
    })
    //  监听微信事件
    api.addEventListener({
        name : 'wxInfo'
    },function (ret,err) {
        if(ret){
            // 进入页面查询是否签到
            signVm.signinit();

            var nickname = ret.value.nickName;
            var headportrait = ret.value.headPortrait;
            var userNo = ret.value.userNo;

            if(nickname!='' && headportrait!=''){
                $('.userLogin').removeClass('hides').html(nickname);
                $('.mine_top_con_tx img').attr('src',headportrait);
                $('.userLoginIng').addClass('hides');
            }else{
                $('.userLogin').removeClass('hides').html(userNo);
                $('.userLoginIng').addClass('hides');
            }
            // window.location.reload();
        }
    })
    //  监听QQ事件
    api.addEventListener({
        name : 'qqInfo'
    },function (ret,err) {
        if(ret){
            // 进入页面查询是否签到
            signVm.signinit();

            var nickname = ret.value.nickName;
            var headportrait = ret.value.headPortrait;
            var userNo = ret.value.userNo;

            if(nickname!='' && headportrait!=''){
                $('.userLogin').removeClass('hides').html(nickname);
                $('.mine_top_con_tx img').attr('src',headportrait);
                $('.userLoginIng').addClass('hides');
            }else{
                $('.userLogin').removeClass('hides').html(userNo);
                $('.userLoginIng').addClass('hides');
            }
            // window.location.reload();
        }
    })

    // 监听退出事件
    api.addEventListener({
        name : 'loginOut'
    },function (ret,err) {
        if(ret){
            $('.userLoginIng').removeClass('hides');
            $('.userLogin').addClass('hides');
            $('.mine_top_con_tx img').attr('src','../../image/active.png');
            $('.signText').html('签到');
        }
    });

    // 监听更改用户信息事件
    api.addEventListener({
        name : 'headPortrait'
    },function (ret,err) {
        if(ret){
            $('.mine_top_con_tx img').attr('src',ret.value.headPortrait);
            $('.userLogin').html(ret.value.nickname);
        }
    });

    // 进入页面查询是否签到
    signVm.signinit();


} // apiready -- end

var signVm = new Vue({
    el :'#isSign',
    data :{
        isSign : ''
    },
    methods : {
        signinit :function () {
            var userNo = user.getuserNo();
            if(!userNo){
                return false;
            }else{
                var data = {userNo : userNo};
                postAjax(ApiUrl.querySign,data,function (ret,err) {
                    if(ret){
                        if(ret.data){
                            signVm.isSign = ret.data;
                        }
                    }
                })
            }
        },
        clicksign : function () {
            var userNo = user.getuserNo();
            if(userNo){
                if(signVm.isSign == true){
                    toast('今日已签到','middle')
                }else{
                    var data = {
                        userNo :userNo
                    };
                    postAjax(ApiUrl.addSign,data,function (ret,err) {
                        if(ret){
                            if(ret.retCode == 0){
                                $('.signText').html('已签到');
                            }
                        }
                    })
                }
            }else{
                user.trunlogin('');
            }
        },
    }
})

//  点击进入亿猫客
function enteryimaoke() {
    if(user.islogin()){
        var user_mobile = user.getuserinfo().mobile;
        if(user_mobile && user_mobile!=''){
            var data = {
                url:{
                    url: api.wgtRootDir+"/html/usercenter/yimaoke/yimaoke_frm.html",
                    name:"yimaoke",
                    title:"亿猫客"
                },
                islogin : '1',
            }
            openWinFrame("my_family_frm", api.wgtRootDir+"/html/usercenter/yimaoke/head_back.html",data);
        }else{
            var data = {
                url:{
                    url: api.wgtRootDir+"/html/bindphone/bindphone.html",
                    name:"bindphone",
                    title:"绑定手机号"
                },
                islogin : '1',
            }
            openWinFrame("my_family_frm", api.wgtRootDir+"/html/comm/head_back.html",data);
        }

    }else{
        openWinFrame("login",api.wgtRootDir + '/html/login/login.html');
    }

}
// 点击进入购物车
function enterIcart() {
    var data = {
        url:{
            url: api.wgtRootDir+"/html/icartBox/shopCart.html",
            name:"shopCart",
            title:"想买"
        },
        islogin : '1',
        info:{},
    }
    openWinFrame("community", api.wgtRootDir+"/html/icartBox/head_icart.html",data);
}
//  点击进入优惠券
function enterDiscount() {
    var data = {
        url:{
            url: api.wgtRootDir+"/html/discount/myDiscount.html",
            name:"disCount",
            title:"优惠券"
        },
        islogin : '1',
        info:{},
    }
    openWinFrame("community", api.wgtRootDir+"/html/comm/head_back.html",data);
}
//点击进入订单详情  (Zhiping)
function enterOrder(){
	var data = {
        url:{
            url: api.wgtRootDir+"/html/usercenter/order/order.html",
            name:"order",
            title:"我的订单"
        },
        //判断是否登录·需要就写1 
        islogin : '1',
        info:{},
    }
    openWinFrame("ord", api.wgtRootDir+"/html/comm/head_back.html",data);
};
//点击进入我的生活圈
function mylife(){
	var data = {
        url:{
            url: api.wgtRootDir+"/html/usercenter/mylife/mylifeindex.html",
            name:"mylifeindex",
            title:"我的生活圈"
        },
        //判断是否登录·需要就写1 
        islogin : '1',
        info:{},
    }
    openWinFrame("mylifeindex", api.wgtRootDir+"/html/comm/headkong.html",data);
};
//(ZhipingEND)

//  点击进入收藏夹
function enterConnect() {
    var data = {
        url:{
            url: api.wgtRootDir+"/html/favorite/favorite.html",
            name:"collect",
            title:"收藏夹"
        },
        islogin : '1',
        info:{},
    }
    openWinFrame("community", api.wgtRootDir+"/html/comm/head_back.html",data);
}
// 点击进入个人信息
function enteruserMsg() {
    var data = {
        url:{
            url: api.wgtRootDir+"/html/userMsg/userMsg.html",
            name:"userMsg",
            title:"个人信息"
        },
        islogin : '1',
    }
    openWinFrame("community", api.wgtRootDir+"/html/comm/head_back.html",data);
}
// 点击进入钱包
function enterWallet() {
    var data = {
        url:{
            url: api.wgtRootDir+"/html/wallet/wallet.html",
            name:"wallet",
            title:"我的钱包"
        },
        islogin : '1',
    }
    openWinFrame("community", api.wgtRootDir+"/html/comm/head_wallet.html",data);
}
// 点击进入积分
function enterIntegral() {
    var data = {
        url:{
            url: api.wgtRootDir+"/html/integral/integral.html",
            name:"integral",
            title:"我的积分"
        },
        islogin : '1',
    }
    openWinFrame("community", api.wgtRootDir+"/html/comm/head_share.html",data);
}
// 点击进入客服
function enterService() {
    var data = {
        url:{
            url: api.wgtRootDir+"/html/service/service.html",
            name:"service",
            title:"客服热线"
        },
        islogin : '0',
    }
    openWinFrame("community", api.wgtRootDir+"/html/comm/head_back.html",data);
}