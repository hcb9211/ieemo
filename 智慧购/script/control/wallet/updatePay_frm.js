apiready = function () {
    swipeRight();
    var param = api.pageParam.param;
    var phone = param.phone;
    var cashAccount = param.cashAccount;
    $('.bindPhone').text(phone);
    $('.payName').val(cashAccount);
    // 获取验证码
    var smsBtn = $('.smsBtn');
    getSmsCode(phone,smsBtn,'1');
    // 验证短信验证码
    $('.nextBox').click(function () {
        var smscode = $('.smscode').val();
        checkSmsCode(phone,smscode,'1',function () {
            openWin('updatePay_win1',param);
        });
    });
    $('.backBtn').click(function () {
        api.closeWin({});
    })
    $('.saveBtn').click(function () {
        var payVal = $('.payName').val();
        var userNo = localStorage.getItem('userNo');
        var data = {
            accountType : '1',
            cashAccount : payVal,
            userNo : userNo
        };
        postAjax(ApiUrl.updateUserCashCard,data,function (ret,err) {
            if(ret){
                if(ret.retCode == '1'){
                    api.sendEvent({
                        name : 'payVal',
                        extra : {
                            payVal : payVal
                        }
                    });
                    openWin('cash_win',payVal);
                }else{
                    api.alert({
                        title : '提示',
                        msg : ret.retMsg
                    })
                }
            }
        })
    })
} // apiready

function myInputOnchange(e) {
    var payNameVal = $('.payName').val();
    var closeBox = $('.closeBox');
    if(payNameVal == ''){
        closeBox.hide();
    }else{
        closeBox.show();
    }
}
function closeInput(e) {
    e.hide()
    $('.payName').val('');
    $('.payName').focus();
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