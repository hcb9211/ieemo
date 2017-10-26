var vue=new Vue({
	el:"#discount",
	data:{
		koubeiList:[],
		yimaoList:[],
		pageNo:[1,1],
		yimao:false,
		koubei:true,
		latitude:"",
		longitude:"",
	},
	methods:{
		//口碑优惠券数据获取
		koubeiInit:function(){
			var self = this;
			var updata = {pageNo:this.pageNo[0],pageSize:8};
			postAjax(ApiUrl.queryKoubeiVooucherPage,updata,function(ret,err){
				if (ret) {
					if (ret.data) {
						for (var i=0;i<ret.data.length;i++) {
						self.koubeiList.push(ret.data[i])
						}
					}
				}
			},{progress:'1'})
		},
		//口碑优惠券领取
		koubeiGet:function(shortLinkUrl){
			//android 包名com.eg.android.AlipayGphone
			//ios
			var appBundlestr = "";
			if (api.systemType == 'ios') {
		       appBundlestr = "alipay";
			}else{
				appBundlestr = "com.eg.android.AlipayGphone";
		    }
			// api.closeWin({name:"alipay"});
		 	api.appInstalled({
		 		appBundle: appBundlestr
			}, function(ret, err) {
			  	if (ret.installed) {
			  		api.closeWin({name:"alipay"});
			  		api.openFrame({
			  			name: 'koubeike',
			  			url: shortLinkUrl,
			  			rect: {
			  				x: 0,
			  				y: 0,
			  				w: 0,
			  				h: 0
			  			}
			  		});
			  	}else{
			  		if (api.systemType == 'ios') {
				      	toast('暂时无法领取');
						return false;
					}else{
						toast('请安装支付宝再领取');
						return false;
				    }
			  		return false;

		  		}
		  	});
		},
		//亿猫专享优惠券数据获取
		yimaoInit:function(){
			var self = this;
			var yimaoUpdata = {pageNo:self.pageNo[1],pageSize:10,userNo:user.getuserNo(),latitude:self.latitude,longitude:self.longitude};
			postAjax(ApiUrl.queryShopCouponPage,yimaoUpdata,function(ret,err){
				if (ret) {
					if (ret.data) {
						for (var i=0;i<ret.data.length;i++) {
                            ret.data[i].percentage = Math.round((ret.data[i].receiveNum/ret.data[i].totalNum)*100);
                            self.yimaoList.push(ret.data[i]);
						}
						self.$nextTick(function () {
                            $('.circle').each(function(index, el) {
                                var num = $(this).find('span').text() * 3.6;
                                if (num<=180) {
                                    $(this).find('.right').css('transform', "rotate(" + num + "deg)");
                                } else {
                                    $(this).find('.right').css('transform', "rotate(180deg)");
                                    $(this).find('.left').css('transform', "rotate(" + (num - 180) + "deg)");
                                };
                            });
                        })
					}
				}
			})
        },
		//亿猫优惠券领取
		yimaoGet:function(bean){
			var getUpdata = {couponRuleNo:bean.couponRuleNo,userNo:user.getuserNo()}
			postAjax(ApiUrl.receiveShopCoupon,getUpdata,function(ret,err){
				if (ret) {
					if (ret.retCode == 0) {
						toast("领取成功！");
						bean.isReceive = 1;
					}else{
						toast("领取失败！请稍后再来！")
					}
				}
			},{progress:"1",islogin:"1"})
		},
		//副导航栏跳转
		koubeiSkip:function(){
			vue.yimao = true;
			vue.koubei = false;
		},
		yimaoSkip:function(){
			vue.koubei = true;
			vue.yimao = false;
		}
		//副导航栏跳转END
	}
});
apiready=function(){
	vue.koubeiInit();
	loc(function(ret){
     	vue.latitude = ret.lat;
        vue.longitude = ret.lon;
     	vue.yimaoInit();
	})
	/*api.setRefreshHeaderInfo({
	    visible : true,
	    loadingImg : 'widget://image/refresh.png',
	    bgColor : '#ccc',
	    textColor : '#fff',
	    textDown : '下拉刷新...',
	    textUp : '松开刷新...',
	    showTime : true
	}, function(ret, err) {
		vue.pageNo = 1;
		vue.list = [];
        vue.init();
        setTimeout("api.refreshHeaderLoadDone()",'1000');
	});*/
	//  上拉加载
	$(window).scroll(function () {
        if($(window).scrollTop() >= $(document).height() - $(window).height()){
        	if (vue.yimao == false) {
        		vue.pageNo[1] +=1;
        		vue.yimaoInit();
        	} else{
        		vue.pageNo[0] += 1;
            	vue.koubeiInit();
        	}

        }
    });
}
