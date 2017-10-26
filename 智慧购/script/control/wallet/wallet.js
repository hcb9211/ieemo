/**
 * Created by HonyBob on 2017/6/23.
 */
var walletVm = new Vue({
    el : '#app',
    data : {
        userNo : '',
        incomedetails : [],
        spendingdetails : [],
        userTotal : {},
        type : ''
    },
    methods : {
        walletInit : function () {
            var data = {
                userNo :　walletVm.userNo
            };
            postAjax(ApiUrl.queryUserPurseByUserNo,data,function (ret,err) {
                if(ret){
                    if(ret.data){
                     	// alert(JSON.stringify(ret))
                        walletVm.incomedetails = ret.data.incomedetails;
                        walletVm.spendingdetails = ret.data.spendingdetail;
                        walletVm.userTotal = ret.data.userTotal;
                        if(ret.data.userTotal && ret.data.userTotal!=''){
                            var payVal = ret.data.userTotal.total;
                            user.setuserbyKey('total',payVal);
                        }

                    }
                }
            })
        },
        incomedetailss : function () {
          walletVm.type = 1;
        },
        spendingdetailss : function () {
            walletVm.type = 2;
        },
        shareWallet : function (amount) {
            var userInfo = user.getuserinfo();
            var headPortrait = userInfo.headPortrait;
            var option = {
                title: '我的红包',
                description: '推着亿猫智能购物车我已经领了不少红包了呢',
                imgUrl: headPortrait,
                url: 'http://www.ieemoo.com/admin/remote/buysLists/html/wallet.html?amount=' + amount
            }
            dialog.share(option);
        }
    }
})

apiready = function () {
    var userNo = user.getuserNo();
    walletVm.userNo = userNo;
    walletVm.type = 1;
    walletVm.walletInit();
}