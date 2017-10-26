/**
 * Created by HonyBob on 2017/6/7.
 */
// 获取焦点时线条变化
$(".register_list").children("li").find("input").focus(function(){
    $(this).parent("li").addClass("register_list_li_focus");
})
$(".register_list").children("li").find("input").blur(function(){
    $(this).parent("li").removeClass("register_list_li_focus");
})
apiready = function () {

}
apiready = function() {
    api.parseTapmode();
//  向右返回
    swipeRight();


}
// 发送验证码
$("#btn-sms-send").click(function () {
    var mobile = $("#mobile").val();
    mobile = mobile.replace(/(^\s+)|(\s+$)/g,'');
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if(!mobile || !myreg.test(mobile)){
        api.alert({msg :'请输入有效的手机号码'});
        return false;
    }
    //  验证码倒计时
    if("1" == $("#btn-sms-send").attr("data-timering")){
        return false;
    }
    $("#btn-sms-send").attr("data-timering","1");
var data = {
    mobile : mobile,
    verificationCodeType : 0
}
    postAjax(ApiUrl.getSmscode, data, function (ret, err) {
        if (ret) {
            if(ret.retCode == 0){
                var voice_interval = 60;
                var int1 = setInterval(function(){
                    var i = voice_interval--;
                    $("#btn-sms-send").text("已发送("+i+")");
                    if(0 == i){
                        clearInterval(int1);
                        $("#btn-sms-send").attr("data-timering","0");
                        $("#btn-sms-send").text("发送验证码");
                    }
                },1000);
            }else{
                api.alert({msg : JSON.stringify(ret.retMsg)})
            }
        } else {
            api.alert({ msg: JSON.stringify(err) });
        }
    })
});

// 点击注册
$('#btn_reg').click(function(){
    api.showProgress({ text: '正在处理,请稍后....' });
    var password = $('#password').val();
    var mobile = $('#mobile').val();
    var smsCode = $('#smsCode').val();
    var passwordtest = /^.{6,}$/;
    var referralCode =  $("#referralCode").val()

    // 对手机号进行设置
    mobile = mobile.replace(/(^\s+)|(\s+$)/g,'');
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if(!mobile || !myreg.test(mobile)){
        api.alert({msg :'请输入有效的手机号码'});
        api.hideProgress();
        return false;
    }
    // 对验证码进行设置
    if("" == smsCode){
        api.alert({msg:"请输入正确的验证码"});
        api.hideProgress();
        return false;
    }
    //  对密码进行设置
    if("" == password){
        api.alert({msg:"请设置密码"});
        api.hideProgress();
        return false;
    }
    if(passwordtest.test(password) == false){
        api.alert({msg:"请输入不至少6位的新密码"});
        api.hideProgress();
        return false;
    }

//			验证短信验证码
    var data = {
        mobile : mobile,
        verificationCodeType : '0',
        smsCode : smsCode
    }
    postAjax(ApiUrl.checkSmscode,data,function (ret,err) {
        if(ret){
            if(ret.retCode == 0){
                var data= {memberUserInfo:{
                    loginName : mobile,
                    mobile : mobile,
                    password : hex_md5(password),
                    smsCode : smsCode,
                    recommendMobile:referralCode,
                    verificationCodeType : '0'
                }}
                postAjax(ApiUrl.register, data, function(ret, err) {
                    if(ret.retCode=='0'){
                        api.sendEvent({
                            name: 'userReg',
                            extra: {
                                userNo: ret.data.userNo,
                                mobile : mobile
                            }
                        });
                        openDialog('0',ret.retMsg);
                        api.hideProgress();
                    }else{
                        openDialog('1',ret.retMsg,'');
                        api.hideProgress();
                    }
                })
            }else{
                openDialog('1',ret.retMsg);
                api.hideProgress();
            }
        }else{
            api.alert({
                msg : '请输入有效的短信验证码'
            })
            api.hideProgress();
        }
    })
})



var dialog = new auiDialog({})
function openDialog(type,msg){
    switch (type) {
        case "1":
            dialog.alert({
                title:"注册失败",
                msg:msg,
                buttons:['确定']
            },function(ret){
                console.log(ret);
            })
            break;
        case "0":
            dialog.alert({
                title:"注册成功",
                msg:'注册成功,请登录!',
                buttons:['确定']
            },function(ret){
                if(ret.buttonIndex == 1){
                    // openWin('../index')
                    closeWin();
                }
            })
            break;
        default:
            break;
    }
}

