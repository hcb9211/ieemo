/**
 * Created by HonyBob on 2017/6/8.
 */

function getLocation(name) {
    // 引入百度模块
    var bMap = api.require('bMap');
    var lon;
    var lat;
// 获取当前位置
    bMap.getLocation({
        accuracy : '10m',
        autoStop : true,
        filter : 1
    }, function(ret, err) {
        if (ret.status == true) {
            lon = ret.lon;
            lon = lon.toFixed(2);
            lat = ret.lat;
            lat = lat.toFixed(2);
            vm.lat1 = lat;
            vm.lng1 = lon;
            vm.pageSize = 5;
            vm.pageNo = 0;
            vm.name = name;
            vm.init();
        }
    });
}

var vm = new Vue({
    el : '#app',
    data : {
        name : '',
        pageNo : 0,
        pageSize : 5,
        lat1 : '',
        lng1 : '',
        todos : []
    },
    methods : {
        init : function () {
            var data = {
                name : vm.name,
                pageNo : vm.pageNo,
                pageSize : vm.pageSize,
                lat1 : vm.lat1,
                lng1 : vm.lng1

            };
            postAjax(ApiUrl.queryStoresByName,data,function (ret,err) {
                if(ret){
                    if(ret.retCode == 0){
                        if(ret.data.length > 0){
                            for(var i=0;i<ret.data.length;i++){
                                if(ret.data[i] && ret.data[i] != []){
                                    vm.todos.push(ret.data[i])
                                }
                            }
                        }else{
                            toasts('暂无结果','middle');
                        }
                    }else{
                        toast(ret.retMsg,'middle');
                    }
                }
            })
        },
        getData : function (goods) {
            var goods = {
                id : goods.id,
                storeId : goods.storeId
            }
            openWin('../../html/icart/icartGoods',goods)
        },
        getGoods : function (bean) {
            var bean = {
                code : bean.code,
                storeId : bean.storeId
            }
            openWin('../../html/beanDetail/beanDetail',bean)
        }
    }
});
apiready = function () {
    //  向右返回
    swipeRight();
    var searchText = api.pageParam.searchText;
    vm.name = searchText;
    getLocation(searchText);

    //			下拉刷新
    api.setRefreshHeaderInfo({
        visible : true,
        loadingImg : 'widget://image/refresh.png',
        bgColor : '#ccc',
        textColor : '#fff',
        textDown : '下拉刷新...',
        textUp : '松开刷新...',
        showTime : true
    }, function(ret, err) {
        vm.pageNo = 0;
        vm.todos.splice(0,vm.todos.length);
        vm.init();
        setInterval("api.refreshHeaderLoadDone()",'1000');
    });
//			上拉加载
    api.addEventListener({
        name :'scrolltobottom',
        extra : {
            threshold:0 //设置距离底部多少距离时触发，默认值为0，数字类型
        }
    },function (ret,err) {
        vm.pageNo += 1;
        vm.init();
    })
};

//  2秒后自动消失的提示 （*）
function toasts(text,location){
    api.toast({
        msg : text,
        location : location,
        duration : 2000
    });
};


