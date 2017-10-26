apiready = function () {
    /**
     * Created by HonyBob on 2017/9/19.
     */
   // 初始化
    tixianvm.inits();
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
            tixianvm.pageNo = 1;
            tixianvm.tixianlist = [];
            tixianvm.inits();
            setTimeout("api.refreshHeaderLoadDone()",'1000');
        }
    });
    //  上拉加载
    $(window).scroll(function () {
        if($(window).scrollTop() >= ($(document).height() - $(window).height())){
            tixianvm.pageNo += 1;
            tixianvm.inits();
        }
    });
}
var tixianvm = new Vue({
    el : '#tixianinfo',
    data : {
        tixianlist : [],
        pageNo: 1,
        pageSize: 20,
        userNo : user.getuserNo()
    },
    methods : {
        inits:function () {
            var _self = this;
            var querydata = {
                pageNo : _self.pageNo,
                pageSize : _self.pageSize,
                userNo : _self.userNo
            }
            postAjax(ApiUrl.queryGuestWithdrawlistByUserNo,querydata,function (ret,err) {
                if(ret){
                    if(ret.retCode == '0'){
                        for(var i=0;i<ret.data.length;i++){
                            _self.tixianlist.push(ret.data[i]);
                        }
                    }
                }else{
                    api.alert({
                        title : '温馨提示',
                        msg : '您还没有提现哟，快去提现吧~'
                    })
                }

            })
        }
    }
})