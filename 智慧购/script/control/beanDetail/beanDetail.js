var beanVm = new Vue({
    el : '#app',
    data : {
        bean : {},
        storeMsg : {},
        code : '',
        storeId : '',
        imgPath : "https://blob00.blob.core.chinacloudapi.cn/ieemoo-blob/",
        type : 1,
        productEvaluationlist : [],
        averageScore : []
    },
    methods : {
        beanInit: function () {
            var data = {
                code : beanVm.code,
                storeId : beanVm.storeId,
            };
            postAjax(ApiUrl.Queryfordetails,data,function (ret,err) {
            if(ret){
                if(ret.data){
                    beanVm.bean = ret.data;
                }
              }
          })
        },
        shareInit : function (bean) {
            var beanname = bean.name?bean.name : '暂无';
            var beanpicture = bean.picture?beanVm.imgPath + bean.picture : '暂无';
            var beanweight = bean.weight?bean.weight : '暂无';
            var beanprice = bean.nowPrice?bean.nowPrice:'暂无';
            var beanplace = bean.placeofproduction?bean.placeofproduction:'暂无';
            var beandescription = bean.description?bean.description:'暂无';
            var url = encodeURI('http://www.ieemoo.com/admin/remote/buysLists/html/beandetail.html?name=' + beanname + '&&' + 'nowPrice=' + beanprice + '&&' + 'picture=' + beanpicture + '&&' + 'weight=' + beanweight + '&&' + 'place=' + beanplace + '&&' + 'description=' + beandescription)
                var option = {
                    title: beanname,
                    description: '这个商品不错,我要加入购物车了!',
                    imgUrl: beanpicture,
                    url: url
                }
                dialog.share(option);
        },
        storeInit : function(){
            var data = {
                storeId : beanVm.storeId
            };
            postAjax(ApiUrl.queryStoreByStoreId,data,function (ret,err) {
                if(ret){
                   beanVm.storeMsg = ret.data;
                }
            },{progress:'1'})
        },
        valuteInit : function () {
            var data = {
                evaluation : {
                    storeId : beanVm.storeId,
                    goodsCode :beanVm.code,
                }
            };
            postAjax(ApiUrl.queryProductEvaluation,data,function (ret,err) {
                if(ret){
                    if(ret.retCode == 0){
                        beanVm.productEvaluationlist = ret.data.productEvaluationlist;
                        beanVm.averageScore = ret.data.averageScore/2;
                        if($('.xingBox>.xing').length == 0){
                            for(var i=0;i<beanVm.averageScore;i++){
                                $('.xingBox').append('<div class="xing"></div>');
                            }
                        }
                    }else if(ret.retCode == 1){
                        $('.valute').css({height:'200px',textAlign:'center',lineHeight:'180px'}).html(ret.retMsg);
                        $('.xingBox').html('暂无评分');
                    }
                }
            },{progress:"1"})
        },
        clickgoods : function () {
            beanVm.type = 1;
        },
        clickevalute : function () {
             beanVm.type = 2;
              beanVm.valuteInit();
        }
    }
});

var checkIcartVm = new Vue({
    el : '#checkIcart',
    data : {
        code : '',
        storeId : '',
        userNo : '',
        resultIcart : 1,
        resultCollect : 1,
    },
    methods : {
        checkIcart : function () {
            if(!user.islogin()){
                return false;
            }
            var data = {
                code : checkIcartVm.code,
                storeId : checkIcartVm.storeId,
                userNo : user.getuserNo()
            };
            postAjax(ApiUrl.checkShopSalesAdvertiseSDtoAtShopICart,data,function (ret,err) {
                if(ret){
                    if(ret.retCode == '0'){
                        if(ret.data.result == 'success'){
                            checkIcartVm.resultIcart = 0;
                        }else{
                            checkIcartVm.resultIcart = 1;
                        }
                    }
                }
            })
        },
        clickIcart: function () {
            var data = {
                code : checkIcartVm.code,
                storeId : checkIcartVm.storeId,
                userNo : user.getuserNo()
            };
            postAjax(ApiUrl.saveShopICartData,data,function (ret,err) {
                if(ret){
                    if(ret.retCode == '0'){
                        checkIcartVm.resultIcart = 0;
                    }
                }
            },{islogin:"1",progress:"1",callback:["refushbeandetail"]})
        },
        clickCannelIcart : function () {
            var data = {
                code : checkIcartVm.code,
                storeId : checkIcartVm.storeId,
                userNo : user.getuserNo()
            };
            postAjax(ApiUrl.removeShopICartData,data,function (ret,err) {
                if(ret){
                    if(ret.retCode == '0'){
                        checkIcartVm.resultIcart = 1;
                    }
                }
            },{islogin:"1",progress:"1",callback:["refushbeandetail"]})
        },
        checkCollect : function () {
            if(!user.islogin()){
                return false;
            }
            var data = {
                code : checkIcartVm.code,
                storeId : checkIcartVm.storeId,
                userNo : checkIcartVm.userNo
            };
            postAjax(ApiUrl.checkShopCollectDtoByUserNoAndCode,data,function (ret,err) {
                if(ret){
                    if(ret.retCode == '0'){
                        if(ret.data.result == true){
                            checkIcartVm.resultCollect = 0;
                        }else{
                            checkIcartVm.resultCollect = 1;
                        }
                    }
                }
            },{progress:"1"})
        },
        clickCollect:function () {
            var data = {
                code : checkIcartVm.code,
                storeId : checkIcartVm.storeId,
                userNo : checkIcartVm.userNo
            };
            postAjax(ApiUrl.saveShopCollectDto,data,function (ret,err) {
                if(ret) {
                    if(ret.retCode == '0001'){
                        checkIcartVm.resultCollect = 0;
                    }
                }
            },{islogin:"1",progress:"1",callback:["refushbeandetail"]})
        },
        clickCannleCollect : function () {
            var data = {
                code : checkIcartVm.code,
                storeId : checkIcartVm.storeId,
                userNo : checkIcartVm.userNo
            };
            postAjax(ApiUrl.removeShopCollectDto,data,function (ret,err) {
                if(ret){
                    if(ret.retCode == '0001'){
                        checkIcartVm.resultCollect = 1;
                    }
                }
            },{islogin:"1",progress:"1",callback:["refushbeandetail"]})
        },
        enterSupermarket : function () {
            var goods = {
                id : checkIcartVm.storeId,
                icartFlag : checkIcartVm.icartFlag
            }
            openWin('../icart/icartGoods',goods);
        }
    }
});

apiready = function () {
    var bean = api.pageParam.param;
    var code = bean.code;
    var storeId = bean.storeId;
    beanVm.code = code;
    beanVm.storeId = storeId;
    // alert(JSON.stringify(bean));
    // beanVm.goodsCode = code;
    beanVm.type = 1;
    beanVm.storeInit();
    beanVm.beanInit();
    beanVm.valuteInit();

    checkIcartVm.code = code;
    checkIcartVm.storeId = storeId;
    checkIcartVm.userNo = user.getuserNo();
    checkIcartVm.checkIcart();
    checkIcartVm.checkCollect();

    api.addEventListener({
        name: 'refushbeandetail'
    }, function(ret, err) {
        if (ret) {
            checkIcartVm.userNo = user.getuserNo();
            checkIcartVm.checkIcart();
            checkIcartVm.checkCollect();
        }
    });


}; // apiready -- end



// 点击进入联系客服
function enterserviceOnlines() {
    var data = {
        url:{
            url: api.wgtRootDir+"/html/service/service.html",
            name:"service",
            title:"客服热线"
        },
        islogin : '0',
    }
    openWinFrame("community", api.wgtRootDir+"/html/comm/head_back.html",data);
};

//  评价和商品点击变化
$(".icart_gz_list").children("li").click(function(){
    $(this).addClass("icart_gz_list_border").siblings().removeClass("icart_gz_list_border");
})
//  点击进入收藏夹
function enterConnect() {
    var data = {
        url:{
            url: api.wgtRootDir+"/html/favorite/favorite.html",
            name:"collect",
            title:"收藏夹"
        },
        islogin : '1',
        info:{},
    }
    openWinFrame("community", api.wgtRootDir+"/html/comm/head_back.html",data);
}

// 点击右上角icart进入icart夹
function enterIcart() {
    var data = {
        url:{
            url: api.wgtRootDir+"/html/icartBox/shopCart.html",
            name:"shopCart",
            title:"iCart购物车"
        },
        islogin : '1',
        info:{},
    }
    openWinFrame("community", api.wgtRootDir+"/html/icartBox/head_icart.html",data);
}
//  对商品图片的高度进行设置
var spxq_pic=document.getElementsByClassName("spxq_pic");
for(var i=0;i<spxq_pic.length;i++){
    spxq_pic[i].index=i;
    spxq_pic[i].style.height=0.90666*(spxq_pic[i].offsetWidth)+"px";
}
$(window).resize(function(){
    for(var i=0;i<spxq_pic.length;i++){
        spxq_pic[i].index=i;
        spxq_pic[i].style.height=0.90666*(spxq_pic[i].offsetWidth)+"px";
    }
});