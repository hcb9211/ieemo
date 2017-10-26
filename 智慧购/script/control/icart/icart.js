apiready = function () {

    // 初始化加载所有门店
    getLocations(0.0,0.0);
    //  上拉加载
    $(window).scroll(function () {
        if($(window).scrollTop() >= $(document).height() - $(window).height()){
            getstoreVm.pageSize +=6;
            getstoreVm.neawInit();

            getstoreVm.salesVolumeInit(1);
        }
    });
//   下拉刷新
    api.setRefreshHeaderInfo({
        visible:true,
        bgColor:'#ccc',
        textColor:'#fff',
        textDown:'下拉刷新...',
        textup:'松开刷新...',
        showTime:true
    },function (ret,err) {
        getstoreVm.pageNo = 0;
        getstoreVm.todos = [];
        getLocations(0.0,0.0);
        // 筛选销量
        getstoreVm.salesVolumeInit(1);
        setTimeout(function() {
            api.refreshHeaderLoadDone();
        }, 1500)
    });


    $('#big').click(function () {
        getstoreVm.salesVolumeInit(1)
    })
    $('#small').click(function () {
        getstoreVm.salesVolumeInit(0)
    })

};  // apiready
function getLocations(startDistance,endDistance) {
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

            getstoreVm.lat1 = lat;
            getstoreVm.lng1 = lon;
            getstoreVm.pageNo = 0;
            getstoreVm.pageSize = 6;
            getstoreVm.startDistance = startDistance;
            getstoreVm.endDistance = endDistance;
            getstoreVm.type = 1;//查询类型为筛选
            getstoreVm.type2 = 2;
            getstoreVm.types = 'aa';
            getstoreVm.neawInit();
        }else{
            toast('请在设置里授权定位哦~','bottom');
        }
    });
}

var getstoreVm = new Vue({
    el:'#stores',
    data : {
        todos: [],
        pageSize : '',
        pageNo : '',
        lat1 : '',
        lng1 : '',
        startDistance : '',
        endDistance : '',
        salesVolumeList : [],
        types : 'aa'
    },
    methods:{
        neawInit:function () {
            //			 获取所有超市门店信息
            getDistance(getstoreVm.lat1,getstoreVm.lng1,getstoreVm.pageNo,getstoreVm.pageSize,getstoreVm.startDistance,getstoreVm.endDistance);
        },
        salesVolumeInit : function (SalesStatus) {
            // 销量排序
            var data = {
                SalesStatus : SalesStatus,
                lat1 : getstoreVm.lat1,
                lng1 : getstoreVm.lng1,
                pageNo : 1,
                pageSize : getstoreVm.pageSize
            };
            postAjax(ApiUrl.queryStoresBycomprehensive,data,function (ret,err) {
                if(ret){
                    if(ret.data){
                        if(getstoreVm.type2 == 2){
                            getstoreVm.salesVolumeList = ret.data;
                        }else{
                            for(var i=0;i<ret.data.length;i++){
                                getstoreVm.salesVolumeList.push(ret.data[i]);
                            }
                        }
                    }
                }
            },{progress:'1'});
        },
        neawclick : function () {
          getstoreVm.types = 'aa'
        },
        salesVolume : function (){
            getstoreVm.types = 'bb';
            // getstoreVm.salesVolumeList(1);
        },
        getData : function (goods) {
            openWin('icartGoods',goods);
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
function getTypes(strdistance,enddistance) {
    getLocations(strdistance,enddistance);
}

function getDistance(lat1,lng1,pageNo,pageSize,startDistance,endDistance) {
    var data = {
        lat1 : lat1,
        lng1 : lng1,
        pageNo : pageNo,
        pageSize : pageSize,
        startDistance : startDistance,
        endDistance : endDistance
    };
    postAjax(ApiUrl.queryNearByStores,data,function (ret,err) {
        if(ret){
            // alert(JSON.stringify(ret))
            if(ret.data){
                if(getstoreVm.type == 1){
                    getstoreVm.todos = ret.data;
                }else{
                    if(ret.data){
                        for(var i=0;i<ret.data.length;i++){
                            getstoreVm.todos.push(ret.data[i]);
                        }
                    }
                }
            }
        }else{
            toast('网络开小差了,请稍后重试...')
        }
    },{ progress:'1'});
}



//  搜索店家
function searchInputStore() {
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
                info:{searchText:searchText},
                url:{
                    url: api.wgtRootDir+"/html/search/searchStore_frm.html",
                    name:"搜索结果",
                    title:"搜索结果"
                }
            }
            openWinFrame("test", api.wgtRootDir+"/html/comm/head_back.html",data);
        }
       });
}