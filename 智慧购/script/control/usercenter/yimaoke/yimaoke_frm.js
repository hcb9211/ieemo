/**
 * Created by HonyBob on 2017/9/16.
 */


//更多
function clickBtn() {
    var data = {
        url:{
            url: api.wgtRootDir+"/html/usercenter/yimaoke/moreincome.html",
            name:"yimaokedetail",
            title:"收益明细"
        },
        islogin : '1',
        info:{}
    }
    openWinFrame("yimaodetail", api.wgtRootDir+"/html/usercenter/yimaoke/head_back.html",data);
}
//  提现
function tixianBtn() {
    var data = {
        url:{
            url: api.wgtRootDir+"/html/usercenter/yimaoke/tixian.html",
            name:"yimaokedetail",
            title:"提现明细"
        },
        islogin : '1',
        info:{}
    }
    openWinFrame("yimaodetail", api.wgtRootDir+"/html/usercenter/yimaoke/head_back.html",data);
}
//  转入钱包
function getoutWallet(){
    var price = $('.price').text();
    api.openFrame({
        name: "outwallet",
        url: api.wgtRootDir+"/html/usercenter/yimaoke/maskyimaoke.html",
        delay: 300,
        slidBackType: 'edge',
        bgColor:'rgba(0,0,0,0.3)',
        pageParam : {
            param : price
        }
    });
}
//  转入钱包
function getwallet(){
    var walletnum = $('.walletnum').val();
    var price = JSON.parse(api.pageParam.param);
    if(walletnum==''){
        api.alert({
            title : '温馨提示',
            msg:'请输入您的金额哦'
        })
        return false;
    }
    if(walletnum == 0){
        api.alert({
            title:'温馨提示',
            msg:'转出的金额不能为0哦'
        })
        return false;
    }
    if(walletnum < 0){
        api.alert({
            title:'温馨提示',
            msg:'转出的金额有误哦'
        })
        return false;
    }
    if(walletnum<=price && walletnum!=0){
        var userNo = user.getuserNo();
        var data = {
            amount : walletnum,
            userNo : userNo
        }
        postAjax(ApiUrl.transGuestAmountToPurseByUserNo,data,function(ret,err){
            if(ret.retCode == '0'){
                var prices = JSON.parse(price)- JSON.parse(data.amount);
                api.sendEvent({
                    name: 'price',
                    extra: {
                        price : prices
                    }
                });
                api.closeFrame();
            }
        })
    }else{
        api.alert({
            title : '温馨提示',
            msg : '您转出的金额不能多于您的余额哦'
        })
        return false;
    }
}
//  申请专业亿猫客
// function applyyimaoke() {
//     var data = {
//         url:{
//             url: api.wgtRootDir+"/html/usercenter/yimaoke/apply.html",
//             name:"yimaoke",
//             title:"申请专业亿猫客"
//         },
//         islogin : '1',
//     }
//     openWinFrame("applyyimaoke", api.wgtRootDir+"/html/usercenter/yimaoke/head_back.html",data);
// }
//  分享亿猫客
    function shareyimaoke(){
        var userInfo = user.getuserinfo();
        var headPortrait = userInfo.headPortrait?userInfo.headPortrait:'../../../image/active.png'
        var yimaocodenum = $('.yimaocodenum').html();
        var option = {
            title: '全民亿猫客，推广赚赚赚',
            description: '快来加入亿猫客，推荐新人使用亿猫智慧购可以赚取佣金哟~还不快来！',
            imgUrl: headPortrait,
            url: 'http://www.ieemoo.com/admin/remote/buysLists/html/yimaoke.html?yimaocodenum=' + yimaocodenum
        }
        dialog.share(option);
    }
//  上传身份证正面
function onloadFile() {
    var data = {
        type : 10,
        userNo : user.getuserNo()
    };
    carmersystem({
        data:data,
        url:_FileUploadServerUrl,
        callback:function(data){
            // var _self = this;
            $('.showPositionId').removeClass('display');
            $('.showImg1').attr('src',data.absoluteUrl);
            // _self.bean.exCover = data.relativeUrl;//不带服务器地址的路径,用于接口字段保存
            // _self.options.imgbase64 = data.locationsrc;//图片base64
        }
    })
}
// 上传身份证反面
function onloadFile2() {
    var data = {
        type : 10,
        userNo : user.getuserNo()
    };
    carmersystem({
        data:data,
        url:_FileUploadServerUrl,
        callback:function(data){
            $('.showReverseId').removeClass('display');
            $('.showImg2').attr('src',data.absoluteUrl);
            // _self.bean.exCover = data.relativeUrl;//不带服务器地址的路径,用于接口字段保存
            // _self.options.imgbase64 = data.locationsrc;//图片base64
        }
    })
}
// 提交身份证信息
function submitBtn() {
    var name = $('.nameinput').val();
    var idcard = $('.idinput').val();
    var showImg1 = $('.showImg1').attr('src');
    var showImg2 = $('.showImg2').attr('src');
    if(name == ''){
        api.alert({
            title : '温馨提示',
            msg : '请填写姓名哟~'
        })
         return false;
    } if(idcard == ''){
        api.alert({
            title : '温馨提示',
            msg : '请填写身份证号哟~'
        })
         return false;
    }
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(reg.test(idcard) === false) {
        api.alert({
            title : '温馨提示',
            msg : '身份证输入不合法'
        })
        return false;
    }
    if(showImg1 == ''){
        api.alert({
            title : '温馨提示',
            msg : '请上传身份证正面哟~'
        })
         return false;
    } if(showImg2 == ''){
        api.alert({
            title : '温馨提示',
            msg : '请上传身份证反面哟~'
        })
         return false;
    }
    var data = {
        userGuestReviewDto:{
            userNo : user.getuserNo(),
            userName : name,
            idNumber : idcard,
            foreImage : showImg1,
            backImage : showImg2
        }

    }
    postAjax(ApiUrl.saveGuestReview,data,function (ret,err) {
        if(ret){
            api.openFrame({
                name: "examineResult",
                url: api.wgtRootDir+"/html/usercenter/yimaoke/examineResult.html",
                delay: 300,
                slidBackType: 'edge',
                bgColor:'rgba(0,0,0,0.3)',
            });
            setTimeout(function () {
                closeWin();
            },500)
            api.sendEvent({
                name:'submit',
                extra : {
                    submitResult:'suc'
                }
            })
        }
    })


}

apiready = function () {
    api.addEventListener({
        name: 'price'
    }, function(ret, err) {
       var price = ret.value.price;
       $('.price').text(price);
    });
    api.addEventListener({
        name: 'submit'
    }, function(ret, err) {
        if(ret){
            vm.yimaokeinit();
        }
    });
    // 如果有驳回原因改变样式
    if($('.rejecttitle').text()!=''){
        $('.toasttitle').height('103px')
    }

    var vm = new Vue({
        el: "#info",
        data:{
            info:{
                incomedetails:[],
                userTotal:{},
                auditStatus : ''
            },
            userinfo:{},
            referralCode:user.getuserinfo().referralCode
        },
        methods:{
            yimaokeinit:function(){
                var _self = this;
                _self.userinfo = user.getuserinfo();
                if(!_self.userinfo.referralCode){
                    var data = {
                        userNo:user.getuserNo()
                    }
                    postAjax(ApiUrl.queryMemberUserInfoDataByUserNo,data,function (ret,err) {
                    if(ret){
                        // alert(JSON.stringify(ret));
                        if("0" == ret.retCode){
                            var referralCode = ret.data.referralCode;
                            var isGuest = ret.data.isGuest;
                            user.setuserbyKey("referralCode",referralCode);
                            user.setuserbyKey("isGuest",isGuest);
                            _self.userinfo = user.getuserinfo();
                        }
                       
                    }
                 })

                }
                var data = {
                    userNo:user.getuserNo()
                }
                 postAjax(ApiUrl.queryIeemooGuestByUserNo,data,function (ret,err) {
                    if(ret){
                        // alert(JSON.stringify(ret));
                        _self.info = ret.data;
                        _self.auditStatus = ret.data.userTotal.auditStatus;
                    }
                 })
            },
            cashpage:function(guestAmount){
                var data = {
                    url:{
                        url: api.wgtRootDir+"/html/wallet/cash_frm.html",
                        name:"cash_frm",
                        title:"提现"
                    },
                    islogin : '1',
                    info:{
                        total:guestAmount
                    }
                }
                openWinFrame("yimaodetail", api.wgtRootDir+"/html/comm/head_back.html",data);
            },
            applyyimaoke:function () {
                var _self = this;
                var auditStatus = _self.auditStatus;
                if(auditStatus && auditStatus ==0){
                    api.alert({
                        title : '温馨提示',
                        msg : '您的资料正在审核中哟...'
                    })
                }else{
                    var data = {
                        url:{
                            url: api.wgtRootDir+"/html/usercenter/yimaoke/apply.html",
                            name:"yimaoke",
                            title:"申请专业亿猫客"
                        },
                        islogin : '1',
                    }
                    openWinFrame("applyyimaoke", api.wgtRootDir+"/html/usercenter/yimaoke/head_back.html",data);
                }
            }
        }
    })
    vm.yimaokeinit();
}