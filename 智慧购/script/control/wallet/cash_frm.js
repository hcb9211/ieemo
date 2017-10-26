/**
 * Created by HonyBob on 2017/5/10.
 */
apiready = function () {
    var total = api.pageParam.total;
    var phone = user.getuserinfo().mobile;
    var mobileStr = phone.substr(3,4);
    var phone1 = phone.replace(mobileStr, '****');
    // $('.payInput1').val(phone1);
    $('.phone').text(phone1);
    $('.credit').text(total + '元');
    // alert(phone)
    // 获取验证码*/
    $(".codeBtn").click(function () {
        var payInput3 = parseFloat($('.payInput3').val());
        var myreg =  /^[0-9]+(.[0-9]{1,2})?$/;
        if(!myreg.test(payInput3)){
            toast('请输入正确的金额哦','2000');
            return false;
        }
        if(payInput3<10){
            toast('满10元才能提现哦','2000');
            return false;
        }
        if(payInput3>total){
            toast('不能大于可用余额哦','2000');
            return false;
        }

        if("1" == $(".codeBtn").attr("data-timering")){
            return false;
        }
        $(".codeBtn").attr("data-timering","1");
        var data = {
            mobile : phone,
            verificationCodeType : '1'
        }
        postAjax(ApiUrl.getSmscode, data,function (ret, err) {
            if (ret) {
                var voice_interval = 60;
                var int1 = setInterval(function(){
                    var i = voice_interval--;
                    $(".codeBtn").text("已发送("+i+")");
                    if(0 == i){
                        clearInterval(int1);
                        $(".codeBtn").attr("data-timering","0");
                        $(".codeBtn").text("发送验证码");
                    }
                },1000);
            } else {
                api.alert({ msg: JSON.stringify(err) });
            }
        })

    })
    //  提现功能
    var userNo = user.getuserNo();
    var data = {
        userNo : userNo
    }
    postAjax(ApiUrl.queryUserCashCard,data,function (ret,err) {
        if(ret){
            if(ret.retCode == '1003'){
                tixian('','',phone);
            }else{
                var cashAccount = ret.data.cashAccount;
                var cashName = ret.data.cashName;
                if(cashAccount && cashName){
                    $('.payInput1').val(cashAccount);
                    $('.payInput2').val(cashName);
                }
                // $('.payRight').removeClass('aui-hide').addClass('aui-show');
                var data = {
                    cashAccount : cashAccount,
                    phone : phone
                }
                // $('.updatePay').click(function () {
                //     openWin('updatePay_win',data);
                // });
                tixian(cashAccount,cashName,phone);
            }
        }
    })
} // apiready
// 提现
function tixian(cashAccount,cashName,phone) {
    $('.withdrawalBtn').click(function () {
        var payInput1 = $('.payInput1').val();
        var payInput2 = $('.payInput2').val();
        var payInput3 = $('.payInput3').val();
        var payInput4 = $('.payInput4').val();
        var total = api.pageParam.total;
        var myreg =  /^[0-9]+(.[0-9]{1,2})?$/;
        if(payInput1 == ''){
            toast('请输入正确的支付宝账号');
        }
        else if(payInput2 == ''){
            toast('请输入正确的姓名');
        }
        else if(payInput3 == ''){
            toast('请输入正确提现金额');
        }
        else if(payInput4 == ''){
            toast('请输入正确的短信验证码');
        }else if(!myreg.test(payInput3)){
            toast('请输入正确的金额哦','2000');
            return false;
        }else if(payInput3<10){
            toast('满10元才能提现哦','2000');
            return false;
        }else if(payInput3>total){
            toast('不能大于可用余额哦','2000');
            return false;
        }else{
            // 提现审核
            var data = {
                memberUserWithdrawalReviewDto : {
                    userNo : user.getuserNo(),
                    accountType : '1',
                    cashAccount : payInput1,
                    cashName : payInput2,
                    guestAmount : payInput3,
                    mobile : phone,
                    sysCode : payInput4
                }
            };
         
            postAjax(ApiUrl.saveGuestWithdrawalReview,data,function (ret,err) {
         
                if(ret){
                    if(ret.retCode == '0'){
                        alert("提现成功");
                        return false;
                    }else{
                        api.alert({
                            title : '提示',
                            msg : ret.retMsg
                        })
                    }
                }
            })
        }
    })
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
        slidBackEnabled : false,
        vScrollBarEnabled : false,
        pageParam : {
            param : param
        },
        reload :true
    });
};
