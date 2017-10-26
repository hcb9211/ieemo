apiready = function () {
    // 初始化
    morevm.cashinit();
    //  下拉刷新
    api.setRefreshHeaderInfo({
        visible : true,
        loadingImg : 'widget://image/refresh.png',
        bgColor : '#ccc',
        textColor : '#fff',
        textDown : '下拉刷新...',
        textUp : '松开刷新...',
        showTime : true
    }, function(ret, err) {
        if(ret){
            morevm.pageNo = 1;
            morevm.list = [];
            morevm.cashinit();
            setTimeout("api.refreshHeaderLoadDone()",'1000');
        }
    });
    //  上拉加载
    $(window).scroll(function () {
        if($(window).scrollTop() >= ($(document).height() - $(window).height())){
            morevm.pageNo += 1;
            morevm.cashinit();
        }
    });
}
var morevm = new Vue({
    el: "#info",
    data:{
        list:[],
        pageNo: 1,
        pageSize: 20,
        userNo : user.getuserNo()
    },
    methods:{
        cashinit:function(){
            var _self = this;
            var querydata = {
                pageNo : _self.pageNo,
                pageSize : _self.pageSize,
                userNo : _self.userNo
            }
            postAjax(ApiUrl.queryGuestTranslistByUserNo,querydata,function (ret,err) {
                if(ret.retCode == '0'){
                    for(var i=0;i<ret.data.length;i++){
                        _self.list.push(ret.data[i]);
                    }
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
        }
    }
})
