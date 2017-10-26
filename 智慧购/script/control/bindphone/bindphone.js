/**
 * Created by HonyBob on 2017/7/19.
 */
/**
 * Created by HonyBob on 2017/6/18.
 */
apiready = function() {
    api.parseTapmode();
//  向右返回
    swipeRight();

    $("#btn-sms-send").click(function () {
        //  对手机号进行设置
        var mobile = $("#mobile").val();
        mobile = mobile.replace(/(^\s+)|(\s+$)/g,'');
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!mobile || !myreg.test(mobile)){
            api.alert({msg :'请输入有效的手机号码'});
            return false;
        }

        if("1" == $("#btn-sms-send").attr("data-timering")){
            return false;
        }
        $("#btn-sms-send").attr("data-timering","1");

        var data = {
            mobile : mobile,
            verificationCodeType : '2'
        }
        postAjax(ApiUrl.getSmscode, data,function (ret, err) {
            if (ret) {
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
                api.alert({msg : ret.retMsg});
            }
        })
    })

    $('#btn_reg').click(function() {
        api.showProgress({ text: '正在处理,请稍后....' });

        var mobile = $('#mobile').val();
        var smsCode = $('#smsCode').val();
        var referralCode = $('#referralCode').val();


        //  对手机号进行设置
        if("" == mobile){
            api.alert({msg:"请输入手机号码"});
            api.hideProgress();
            return false;
        }
        mobile = mobile.replace(/(^\s+)|(\s+$)/g,'');
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!mobile || !myreg.test(mobile)){
            api.alert({msg :'请输入有效的手机号码'});
            api.hideProgress();
            return false;
        }
        //  对验证码进行设置
        if("" == smsCode){
            api.alert({msg:"请输入短信验证码"});
            api.hideProgress();
            return false;
        }

        //			验证短信验证码
        var data = {
            mobile : mobile,
            smsCode : smsCode,
            verificationCodeType : '2'
        }

        postAjax(ApiUrl.checkSmscode,data,function (ret,err) {
            if(ret){
                if(ret.retCode == 0){
                    var data= {
                        mobile : mobile,
                        smsCode : smsCode,
                        userNo : user.getuserNo(),
                        verificationCodeType : '2',
                        recommendMobile:referralCode
                    }
                    postAjax(ApiUrl.bindMobileNumber,data,function(ret, err) {
                        api.hideProgress();
                        if(ret){
                            if(ret.retCode == 0){
                                api.hideProgress();
                                api.sendEvent({
                                    name : 'bindphone',
                                    extra : {
                                        bindphone : mobile
                                    }
                                })
                                openDialog('0',ret.retMsg);
                                user.setuserbyKey('mobile',mobile);
                                api.closeWin();
                            }else{
                                api.hideProgress()
                                openDialog('1',ret.retMsg)
                            }
                        }else{
                            api.hideProgress()
                            openDialog('1',ret.retMsg);
                        }
                    })
                }
            }else{
                api.alert({
                    msg : '请输入有效的短信验证码'
                })
            }
        })
    })
}



var dialog = new auiDialog();
function openDialog(type,msg){
    switch (type) {
        case "1":
            dialog.alert({
                title:"绑定失败",
                msg:msg,
                buttons:['确定']
            },function(ret){
                api.hideProgress();
                console.log(ret);
            })
            break;
        case "0":
            dialog.alert({
                title:"温馨提示",
                msg:'绑定成功!',
                buttons:['确定']
            },function(ret){
                // if(ret.buttonIndex==1){
                //     closeWin();
                // }
            })
            break;
        default:
            break;

    }
};
