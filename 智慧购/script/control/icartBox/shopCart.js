/**
 * Created by HonyBob on 2017/6/21.
 */
var shopCartVm = new Vue({
    el : '#app',
    data : {
        pageNo : 1,
        pageSize : 999,
        userNo : user.getuserNo(), // 1000000000000000034
        todos : [],
        familytodos : {},
        type : 1,
        lat1 : '',
        lng1 : '',
    },
    methods : {
        shopCartInit : function () {
            var _self = this;
            var data = {
                pageNo : _self.pageNo,
                pageSize : _self.pageSize,
                userNo : _self.userNo
            };
            postAjax(ApiUrl.queryShopICartDataByUserNo,data,function (ret,err) {
                if(ret){
                    if(ret.data){
                        for(var i=0;i<ret.data.length;i++){
                            _self.todos.push(ret.data[i]);
                        }
                    }
                    // if(ret.data.length == 0){
                    //     $('.mycart').html('暂无商品加入ICart！').css({height:'200px',lineHeight:'200px',textAlign:'center'})
                    // }
                }
            },{progress:'1'})
        },
        familyInit : function () {
            var _self = this;
            var data = {
                lat1 : _self.lat1,
                lng1 : _self.lng1,
                userNo : _self.userNo
            };
            postAjax(ApiUrl.queryShopICartByFamilyNo,data,function (ret,err) {
                if(ret){
                    if(ret.data){
                        _self.familytodos = ret.data;
                    }
                }
            },{progress:'1'})
        },
        enterStore : function (bean) {
            var storeId = bean.storeId;
            var goods = {
                id : storeId
            }
            openWin('../icart/icartGoods',goods);
        },
        enterGoods : function (good) {
            var code = good.code;
            var storeId = good.storeId;
            var goods = {
                code : code,
                storeId :storeId
            }
            openWin('../beanDetail/beanDetail',goods)
        },
        shopCart : function () {
          shopCartVm.type = 1;
        },
        familyIcart : function () {
            shopCartVm.type = 2;
            shopCartVm.familyInit();
        }
    }
});
apiready = function () {
    shopCartVm.shopCartInit();
    var bMap = api.require('bMap');
    bMap.getLocation({
        accuracy: '100m',
        autoStop: true,
        filter: 1
    }, function(ret, err) {
        if (ret.status) {
            var latitude = ret.lat;
            var longitude = ret.lon;
            shopCartVm.lat1 = latitude;
            shopCartVm.lng1 = longitude;
        }
    });
    
}