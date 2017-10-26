var goodsVm = new Vue({
    el : '#app',
    data : {
        storeId : '',
        storeInfo : '',
        userNo : '',
        typeid : '',
        ischeck : false,
        icartDetailList :[],
        goodsList : [],
        shopSaleList:[]
    },
    methods : {
        goodsInit : function () {
            var data = {
                storeId : goodsVm.storeId
            };
            postAjax(ApiUrl.queryShopSalesInfoByStorId,data,function (ret,err) {
                if(ret){
                   if(ret.data){
                       goodsVm.storeInfo = ret.data.storeInfo;
                       goodsVm.shopSaleList = ret.data.shopSaleList;
                       goodsVm.icartDetailList = ret.data.catalogList;

                       // if(icartDetailList && icartDetailList.length > 0){
                       //      goodsVm.typeid = icartDetailList[0].catalogId;
                       // }
                       setTimeout(function(){
                        $("#leftBox li").eq(0).click();
                       },500);
                   }
                }
            },{progress : '1'})
        },
        clickGetgoods : function (catalogId,e) {
            goodsVm.typeid = catalogId;
            var el = e.target;
            $(el).css({color:'#d12e2f',fontSize : '14px',borderLeft:'2px solid #d12e2f',boxSizing:'border-box',background:'white'}).siblings().css({background:'#EDEEF2',color:'#333',fontSize: '12px',borderLeft:'0px'});
        },
        clickGoodsDetail : function (code) {
            var storeId = goodsVm.storeInfo.id;
            var bean = {
                code : code,
                storeId : storeId
            }
            openWin('../beanDetail/beanDetail',bean);
        },
        checkstoreinit : function () {
            if(!user.islogin()){
                return false;
            }
            var data = {
                userNo : goodsVm.userNo,
                storeId :goodsVm.storeId
            };
            postAjax(ApiUrl.checkStoreAttention,data,function (ret,err) {
                if(ret){
                    goodsVm.ischeck = ret.data;
                }
            },{progress:'1'})
        },
        clickCheckStore : function () {
            var data = {
                userNo : goodsVm.userNo,
                storeId : goodsVm.storeId
            };
            postAjax(ApiUrl.saveStoreAttention,data,function (ret,err) {
                if(ret){
                    if(ret.retCode == 0){
                        goodsVm.ischeck = true;
                    }
                }
            },{islogin:'1',progress:'1',callback : ["checkstore"]})
        },
        clickCannleStore : function () {
            var data = {
                userNo : goodsVm.userNo,
                storeId : goodsVm.storeId
            };
            postAjax(ApiUrl.removeStoreAttention,data,function (ret,err) {
                if(ret){
                    if(ret.retCode == 0){
                        goodsVm.ischeck = false;
                    }
                }
            },{islogin:'1',progress:'1',callback : ["checkstore"]})
        }
    }
});

apiready = function () {
    var goods = api.pageParam.param;
    var storeId = goods.id;
    var icartFlag = goods.icartFlag;
    var userNo = user.getuserNo();
    goodsVm.userNo = userNo;
    goodsVm.storeId = storeId;
    goodsVm.goodsInit();
    goodsVm.checkstoreinit();

    api.addEventListener({
        name: 'checkstore'
    }, function(ret, err) {
        if (ret) {
            goodsVm.userNo = user.getuserNo();
            goodsVm.checkstoreinit();
            goodsVm.clickCheckStore();
            goodsVm.clickCannleStore();
        }
    });

}
    //  搜索店家
    function entersearch() {
        var UISearchBar = api.require('UISearchBar');
        UISearchBar.open({
            placeholder: '请输入搜索内容',
            historyCount: 10,
            showRecordBtn: false,
            dataBase:"searchcircle",
            texts: {
                cancelText: '取消',
                clearText: '清除搜索记录'
            },
            styles: {
                navBar: {
                    bgColor: '#d0302f',
                    borderColor: '#000'
                },
                searchBox: {
                    bgImg: '',
                    color: '#000',
                    height: 44
                },
                cancel: {
                    bg: 'rgba(0,0,0,0)',
                    color: '#fff',
                    size: 16
                },
                list: {
                    color: '#696969',
                    bgColor: '#FFFFFF',
                    borderColor: '#eee',
                    size: 16
                },
                clear: {
                    color: '#000000',
                    borderColor: '#ccc',
                    size: 16
                }
            }
        }, function(ret, err) {
            if (ret) {
                var searchText = ret.text;
                // openWin('../search/searchStore_win',searchText);
                var data = {
                    url:{
                        url: api.wgtRootDir+"/html/search/searchResult.html",
                        name:"searchResult",
                        title:"搜索结果"
                    },
                    info :{
                      searchtext : searchText,
                      storeId: api.pageParam.param.id
                    },
                    islogin : '0',
                }
                openWinFrame("searchResult", api.wgtRootDir+"/html/comm/head_back.html",data);
            }
        });
    }
