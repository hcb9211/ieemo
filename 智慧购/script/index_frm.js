//猜你喜欢页数
var a = 1;
//vue函数
var index = new Vue({
	el : "#index_frm",
	data:{
		tool:[],
        pageNo :1,
        pageSize : '',
        carouselfist:[],
        carousel:[],
        coterielist:[],
        fireStormList:[],
        headlineList:[]
	},
	methods:{
		//广告轮播
		carouselfun:function(){
			var _self = this;
			postAjax(ApiUrl.queryAllAdvertisesForMobile,{},function(ret,err){
				if (ret) {
					for (i=0;i<ret.data.length;i++) {
						index.carousel.push(ret.data[i]);
					};
			    	_self.$nextTick(function(){
						new Swiper('.swiper-container',{
				            observer:true,//修改swiper自己或子元素时，自动初始化swiper
	    					observeParents:true,//修改swiper的父元素时，自动初始化swiper
	    					autoplay: 5000//可选选项，自动滑动
				    	});
					});
				}
			});	
		},
		headline :function(){
			var _self = this;
			var headlineData = {dataType:0};
			postAjax(ApiUrl.queryShopNotifyMsgDtoByType,headlineData,function(ret,err){
				if (ret) {
					_self.headlineList = ret.data;
					//ajax 加载完成以后执行函数
					_self.$nextTick(function(){
						notice_wheelplay();
					});
				}
			});
		},
		//火爆全城
		fireStorm: function (){
			var _self = this;
			postAjax(ApiUrl.queryHotPictures,{},function(ret,err){
				if (ret) {
					_self.fireStormList = ret.data;
				}
			})
		},
		//猜你喜欢
		doyoulike:function(){
			var self = this;
			var indexdata = {
				pageNo : self.pageNo,
				pageSize :8,
				userNo : user.getuserNo()
			};
			postAjax(ApiUrl.queryShopSalesAdvertiseSByIsRecommend,indexdata,function(ret,err){
				if (ret) {
					if(ret.data){
						for(var i=0;i<ret.data.length;i++){
							self.tool.push(ret.data[i]);
						}
					}
				}
			})
		},
		queryCoterieExpPage:function(){
			var _self = this;
			var data = {
				pageNo:1,
				pageSize:4
			};
			postAjax(ApiUrl.queryCoterieExpPage,data,function(ret,err){
				if (ret) {
					if(ret.data){
						_self.coterielist = ret.data
					}
				}
			})
		},
		experiecepage:function(bean){
		 	var data = {
		        url:{
		            url: api.wgtRootDir+"/html/lifecircle/experience/info/experieceinfo_frm.html",
		            name:"experieceinfo_frm",
		            title:"经验"
		        },
		        info:{
		        	srcNo:bean.exNo
		        }
		    }
	   		openWinFrame("experieceinfo_win", api.wgtRootDir+"/html/lifecircle/experience/info/experieceinfo_win.html",data);
		},
		discount:function(){
			var data = {
			        url:{
			            url: api.wgtRootDir+"/html/discount/discount.html",
			            name:"discount_frm",
			            title:"优惠券"
			        }
			    }
	   		openWinFrame("discount_win", api.wgtRootDir+"/html/comm/head_back.html",data);
		},
		getData: function (bean) {
			openWin('../html/beanDetail/beanDetail',bean);
        },
        //跳转排行榜
		 rankpage:function(){
		     var data = {
		        url:{
		            url: api.wgtRootDir+"/html/index/rank/rank_frm.html",
		            name:"rank_frm",
		            title:"排行榜"
		        }
		    }
   		 openWinFrame("rank_win", api.wgtRootDir+"/html/comm/head_back.html",data);
		}
	},
});

apiready= function(){
	var couponstr  = localStorage.getItem("couponindex");
	var currentdate = getNowFormatDate("");//获取当前时间
	var userNo = user.getuserNo();
	if(couponstr){
		if(!JSON.parse(couponstr)[currentdate]){
			localStorage.removeItem("couponindex");
		}
	}
	if(user.islogin()){
		if(!couponstr || !JSON.parse(couponstr)[currentdate] || 
			!JSON.parse(couponstr)[currentdate][userNo]){
			api.openFrame({
		        name: "couonindex",
		        url: api.wgtRootDir+"/html/index/coupon/couponindex.html",
		        delay: 300,
		        slidBackType: 'edge',
		        bgColor:'rgba(0,0,0,0)'
		    });
		}
	}else{
		userNo = "couponindexcurrentdate";
		if(!couponstr || !JSON.parse(couponstr)[currentdate]){
			api.openFrame({
		        name: "couonindex",
		        url: api.wgtRootDir+"/html/index/coupon/couponindex.html",
		        delay: 300,
		        slidBackType: 'edge',
		        bgColor:'rgba(0,0,0,0)'
		    });
		}
	}
	
   

	// 猜你喜欢
	index.pageNo = 1;
	// index.pageSize = 6;
    index.doyoulike();
    index.queryCoterieExpPage();
	
	//热门头条
	index.headline();
    // 轮播
    index.carouselfun();
    //火爆全城
    index.fireStorm();
    //  上拉加载
    $(window).scroll(function () {
        if($(window).scrollTop() >= $(document).height() - $(window).height()){
            index.pageNo += 1;
            index.doyoulike();
        }
    });

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
            index.pageNo = 1;
            index.tool = [];
            //才你喜欢
            index.doyoulike();
            //热门头条
			index.headline();
		    // 轮播
		    index.carouselfun();
		    //火爆全城
		    index.fireStorm();
            index.queryCoterieExpPage();
            // 查询平板是否登录
            checkPadlogin();
            setTimeout("api.refreshHeaderLoadDone()",'1000');
		}
	});

	//  监听扫一扫
	api.addEventListener({
		name : 'qrCode'
	},function (ret,err) {
		if(ret){
			$('.top_login').css({display:'block',height:'30px'})
		}
    })

    checkPadlogin();

	//  监听滚动
    $(window).scroll(function () {
        if($(window).scrollTop() >= 100){
           $('.top_login').css({
			   height:0,
			   color:'transparent'
		   })
			$('.top_login img').fadeOut();
        }else{
            $('.top_login').css({
                height:30,
                color:'#fff'
            })
            $('.top_login img').fadeIn()
		}
    });
} // apiready

//  平板退出
function signOut() {
	dialog.alert({text:'确定要退出吗'},function () {
		var userNo = user.getuserNo();
		if(userNo){
			var data = {userNo : userNo};
			postAjax(ApiUrl.mobileNoticePadLoginOut,data,function (ret,err) {
				if(ret){
					if(ret.retCode == 0){
						alert(ret.retMsg);
						$('.top_login').css({
							display:'none'
						});
					}
				}
            })
		}
    })
}

// 查询平板是否登录
function checkPadlogin() {
	var userNo = user.getuserNo();
	if(userNo){
		var data = {userNo : userNo};
		postAjax(ApiUrl.queryPadIsExistLoginIn,data,function (ret,err) {
			if(ret){
				if(ret.retMsg == '0'){
                    $('.top_login').css({display:'block',height:'30px'})
				}else{
                    $('.top_login').css({display:'none'});
				}
			}
        })
	}
}

