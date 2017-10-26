/**
 * Created by HonyBob on 2017/6/24.
 */
var searchresultVm = new Vue({
    el : '#app',
    data : {
        name : '',
        pageNo : 1,
        pageSize : 100,
        searchgoodsList :[],
        storeId:""
    },
    methods : {
        searchgoodsInit : function () {
            var data = {
                name : searchresultVm.name,
                storeId:searchresultVm.storeId,
                pageNo : searchresultVm.pageNo,
                pageSize : searchresultVm.pageSize
            };
            postAjax(ApiUrl.queryShopSalesAdvertiseSByLikeName,data,function (ret,err) {
                if(ret){
                    if(ret.data){
                        searchresultVm.searchgoodsList = ret.data;
                    }
                }
            })
        },
       enterSupermarket : function(storeId){
            var storeId = {
                id : storeId
            }
            openWin('../../html/icart/icartGoods',storeId);
       },
       entergoodsDetail : function(bean){
            var bean = {
                code : bean.code,
                storeId : bean.storeId
            };
            openWin('../../html/beanDetail/beanDetail',bean);
       } 
    }
})
apiready = function () {
    var searchtext = api.pageParam.searchtext;
    var storeId = api.pageParam.storeId;
    searchresultVm.name = searchtext;
     searchresultVm.storeId = storeId;
    searchresultVm.searchgoodsInit();
}