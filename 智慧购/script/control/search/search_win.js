apiready = function () {
    searchVm.searchInit();
}
//苹果手机不兼容出现input无法取值以下是解决方法
$(function(){
    $('.searchlocal li').click(function(){
        var div = $(this).text();
        $('.searchlocal').val(div);
        var data = {
            url:{
                url: api.wgtRootDir+"/html/search/searchResult.html",
                name:"searchResult",
                title:"搜索结果"
            },
            info :{
                searchtext : div
            },
            islogin : '0',
        }
        openWinFrame("searchResult", api.wgtRootDir+"/html/comm/head_back.html",data);

    })
    //取到值以后button存储无法取值，这里强迫浏览器强行刷新可解决
    $('.top_shopcat').click(function(){
        window.location.reload();
    })
})

var searchVm = new Vue({
    el : '#searchvm',
    data : {searchTodos :[]},
    methods : {
        searchInit : function () {
            var data = {
                pageNo : 1,
                pageSize : 10,
            };
            postAjax(ApiUrl.queryHotSearchPage,data,function (ret,err) {
                if(ret){
                    if(ret.data){
                        searchVm.searchTodos = ret.data;
                    }
                }
            })
        },
        clicksearch : function (text) {
            $('.sousuo_search_zi').val(text);
        }
    }
})

var hisTime;
var hisItem;
var firstKey;
function init (){
    hisTime = [];
    hisItem = [];
    for(var i=0;i<localStorage.length;i++){
        if(!isNaN(localStorage.key(i))){
            hisTime.push(localStorage.key(i));
        }
    }
    if(hisTime.length>0) {
        hisTime.sort();
        for (var y = hisTime.length-1; y>0; y--) {
            localStorage.getItem(hisTime[y]).trim() && hisItem.push(localStorage.getItem(hisTime[y]));
        }
    }
    $(".searchlocal").html("");
    for(var i=0;i<hisItem.length;i++){
        $('.searchlocal').prepend('<li class="word-break">'+hisItem[i]+'</li>')
    }
}
init();
function dellocal() {
    //清除记录功能
        for(var f=0;f<hisTime.length;f++){
            localStorage.removeItem(hisTime[f]);
        }
        init();
        // window.location.reload();
        $('.searchlocal').html('暂无历史记录');
        $('.his-dele').hide();
}

// 点击进入搜索结果页面
function enterSearchResult() {
    var searchText = $(".sousuo_search_zi").val();
    var time = (new Date()).getTime();

    if(!searchText){
        alert("你未输入搜索内容");
        return false;
    }
    //输入的内容localStorage有记录
    if($.inArray(searchText,hisItem)>=0){
        for(var j = 0;j<localStorage.length;j++){
            if(searchText==localStorage.getItem(localStorage.key(j))){
                localStorage.removeItem(localStorage.key(j));
            }
        }
        localStorage.setItem(time,searchText);
    }
    //输入的内容localStorage没有记录
    else{
        //由于限制了只能有10条记录，所以这里进行判断
        if(hisItem.length>9){
            firstKey = hisTime[0]
            localStorage.removeItem(firstKey);
            localStorage.setItem(time,searchText);
        }else{
            localStorage.setItem(time,searchText)
        }
    }
    init();

    var data = {
        url:{
            url: api.wgtRootDir+"/html/search/searchResult.html",
            name:"searchResult",
            title:"搜索结果"
        },
        info :{
          searchtext : searchText
        },
        islogin : '0',
    }
    openWinFrame("searchResult", api.wgtRootDir+"/html/comm/head_back.html",data);
}