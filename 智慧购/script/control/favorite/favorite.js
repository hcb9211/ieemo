/**
 * Created by HonyBob on 2017/6/21.
 */
var collectsVm = new Vue({
    el : '#app',
    data : {
        pageNo : 1,
        pageSize : 999,
        userNo : user.getuserNo(),
        collects : [],
        type : 1,
        mystoretodos : []
    },
    methods : {
        collectInit : function () {
            var data = {
                pageNo : collectsVm.pageNo,
                pageSize : collectsVm.pageSize,
                userNo : collectsVm.userNo
            };
            postAjax(ApiUrl.queryCollectShopSalesAdvertiseSByUserNo,data,function (ret,err) {
                if(ret){
                    if(ret.data){
                        for(var i=0;i<ret.data.length;i++){
                            collectsVm.collects.push(ret.data[i]);
                        }
                        // collectsVm.collects = ret.data;
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
        mystoreInit : function () {
            var data = {
                pageNo : collectsVm.pageNo,
                pageSize : collectsVm.pageSize,
                userNo : collectsVm.userNo
            };
            postAjax(ApiUrl.queryStoreAttentionByPage,data,function (ret,err) {
                if(ret){
                    if(ret.data){
                        collectsVm.mystoretodos = ret.data;
                    }
                }
            },{progress:'1'})
        },
        enterstore : function (store) {
            var goods = {
                id : store.id,
                icartFlag : store.icartFlag
            }
            openWin('../icart/icartGoods',goods);
        },
        clickmysupermarket : function () {
            collectsVm.type = 1;
        },
        clickstore : function () {
            collectsVm.type = 2;
        },
    }
});
apiready = function () {
    collectsVm.collectInit();
    collectsVm.mystoreInit();
}