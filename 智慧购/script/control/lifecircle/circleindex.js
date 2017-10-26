apiready = function(){
	api.addEventListener({
	    name: 'addcirclebutton'
	}, function(ret, err) {
		$("#testinput").focus();
        $(".shq_bottom_box").toggleClass("shq_bottom_box_tc");
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
            var index = $("#typeli .sj_list_li_click").index();
            contentVue.pageNo[index] = 1;
            contentVue.list[index].info = [];
            contentVue.init(index);
            
            
            setTimeout("api.refreshHeaderLoadDone()",'1000');
		}

	});

	//上拉加载
	$(window).scroll(function () {
	    if($(window).scrollTop()!= 0 && $(window).scrollTop() >= $(document).height() - $(window).height()){
	    	 var index = $("#typeli .sj_list_li_click").index();
            contentVue.pageNo[index] = contentVue.pageNo[index] + 1;
            contentVue.next(index);
            
            setTimeout("api.refreshHeaderLoadDone()",'1000');
	    }
	});

	vm.init();
}



function addexperience(){
    var data = {
        url:{
            url: api.wgtRootDir+"/html/lifecircle/experience/add/addexperiece_frm.html",
            name:"my_lifecircle_win",
            title:"写经验"
        },
	    islogin:"1",//是否需要验证 0否 1是 默认是否
	  	callback:[]
    }
    openWinFrame("addexperiece_win", api.wgtRootDir+"/html/lifecircle/experience/add/addexperiece_win.html",data);
}

function questionaddpage(){
	
	 var data = {
        url:{
            url: api.wgtRootDir+"/html/lifecircle/question/add/addquestion_frm.html",
            name:"addquestion_frm",
            title:"写问题"
        },
         islogin:"1",//是否需要验证 0否 1是 默认是否
	  	callback:["addexperiece"]
    }
    openWinFrame("addquestion_win", api.wgtRootDir+"/html/lifecircle/question/add/addquestion_win.html",data);
}

//回答問題頁面
function answerpage(){
	 var data = {
        url:{
            url:filepath.getPath(filepath.lifecircle.question.answerlist.frm),
            name:"answerlist_frm",
            title:"回答问题"
        }
    }
    openWinFrame("answerlist_win", filepath.getPath(filepath.comm.headback.win),data);
}




var vm = new Vue({
	el: "#typeli",
	data:{
		typelist:[],
		coterieNo:""
	},
	methods:{
		
		init:function(){
			var _self = this;
			var data = {
				userNo:user.getuserNo()
			}
			postAjax(ApiUrl.queryCoterieType,data, function (ret, err) {

				if (ret) {
					if(ret.retCode=='0'){

					  if(ret.data){
					  	var bean = {
					  		coterieNo:"0",
					  		coterieName:"推荐"
					  	}
					  	_self.typelist.push(bean);

					
					  	for(ind in ret.data){
					  		_self.typelist.push(ret.data[ind]);
					  	}
					  	// setTimeout(function(){
					  	// 	test();
					  	// },100);
					  	_self.coterieNo = _self.typelist[0].coterieNo;
					  	_self.index = _self.typelist[0].index;
					  	
					  	for (var i = 0; i < _self.typelist.length; i++) {
					  		contentVue.list.push( {info:[]});
					  		contentVue.pageNo.push(1);
					  		contentVue.pageSize.push(10);

					  	}
					  	contentVue.init(0);

					  }
					}else{
						// openDialog('0',ret.retMsg);
					 return false;
					}
				} else {
					
	                return false;
				}
			});

		}
		

	}

});

var contentVue = new Vue({
	el: "#content",
	data:{
		list:[],
		typelist:vm.typelist,
		pageNo:[],
		pageSize:[]
	},
	methods:{
		init: function(index){
			var _self = this;
			var data = {
				coterieNo :vm.coterieNo,
				pageNo: _self.pageNo[index], //第几页 
				pageSize:_self.pageSize[index], //分页条数
				srcTitle: ""
			};
			if(_self.list[index].info.length > 0){
				return false;
			}
			postAjax(ApiUrl.queryCoterieByCoterieNoPage,data, function (ret, err) {
				// alert(JSON.stringify(ret));
				
				if (ret) {
					if(ret.retCode=='0'){
					  if(ret.data){
					  	for(ind in ret.data){
					  		// if("0" == ret.data[ind].srcId){
					  		// 	ret.data[ind].coverPic = cacheimage.cache({
					  		// 		url:ret.data[ind].coverPic
					  		// 	});
					  		// }
					  		_self.list[index].info.push(ret.data[ind]);
					  	}
					  	
					  	 _self.$nextTick(function(){
					    	textauto();
					    });
					  	setTimeout(function(){
					  		test();
					  		// textauto();
					  	},500);
					  }
					 
					}else{
						// openDialog('0',ret.retMsg);
					 return false;
					}
				} else {
					
	                return false;
				}
			});

		},
		//下一页
		next:function (index){
			var _self = this;
			var data = {
				coterieNo :vm.coterieNo,
				pageNo: _self.pageNo[index], //第几页 
				pageSize:_self.pageSize[index], //分页条数
				srcTitle: ""
			};
			postAjax(ApiUrl.queryCoterieByCoterieNoPage,data, function (ret, err) {
				// alert(JSON.stringify(ret));
				
				if (ret) {
					if(ret.retCode=='0'){
					  if(ret.data){
					  	for(ind in ret.data){
					  		_self.list[index].info.push(ret.data[ind]);
					  	}
					  	
					  	 _self.$nextTick(function(){
					    	textauto();
					    });

					  	Vue.nextTick(function(){
						   setTimeout(function(){
					  		test();
					  		
					  	},500);
						})
					  	
					  }
					 
					}else{
						// openDialog('0',ret.retMsg);
					 return false;
					}
				} else {
					
	                return false;
				}
			});
		},
		experiecepage:function(bean){
			 var data = {
		        url:{
		            url: api.wgtRootDir+"/html/lifecircle/experience/info/experieceinfo_frm.html",
		            name:"experieceinfo_frm",
		            title:"经验"
		        },
		        info:{
		        	srcNo:bean.srcNo
		        }
		       
		    }
		    openWinFrame("experieceinfo_win", api.wgtRootDir+"/html/lifecircle/experience/info/experieceinfo_win.html",data);
		},
		//问题详情页面
		questionpage:function(bean){
			var data = {
		        url:{
		            url: api.wgtRootDir+"/html/lifecircle/question/info/questioninfo_frm.html",
		            name:"questioninfo_frm",
		            title:"问题详情"
		        },
		        info:{
		        	srcNo:bean.srcNo
		        }
		    }
		    openWinFrame("questioninfo_win", api.wgtRootDir+"/html/lifecircle/question/info/questioninfo_win.html",data);
		}

	}
})
	
function test(){

var mySwiper2 = new Swiper('#typeswiper',{
	 observer:true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents:true,//修改swiper的父元素时，自动初始化swiper
    // aginationClickable: true,
     // freeMode: true,
watchSlidesProgress : true,
watchSlidesVisibility : true,
slidesPerView: 10,
onTap: function(){
			mySwiper3.slideTo( mySwiper2.clickedIndex)
		}
})
var mySwiper3 = new Swiper('#contentSwiper',{
	autoHeight: true,
	calculateHeight:true,
	onSlideChangeStart: function(){
		api.setFrameAttr({
                    name: "lifecircle",
                    bounces: false
                });
			updateNavPosition(mySwiper3)
		},
	onInit: function(swiper){

     // GetOrderList(swiper);
    },
    onTouchEnd: function(swiper) {
                api.setFrameAttr({
                    name: "lifecircle",
                    bounces: true
                });
            }
})

function GetOrderList(swiper) {
    setTimeout(function() {
        //异步获取数据后再改变swiper-container的高度,我这里用了setTimeout代替...
          var index = swiper.activeIndex;
        var eHeight = swiper.slides[index].offsetHeight;
        var winH = api.frameHeight - 50;
      
        if(winH > eHeight){
        	eHeight = winH;
        }
        // $(swiper.container[swiper.activeIndex]).height(eHeight)
        $("#contentSwiper").height(eHeight)
		// $(".swiper-wrapper").css('height', eHeight + 'px');
         // swiper.slides[index].height(eHeight);
        // $("#content").eq(index).height(eHeight);
        // $(".swiper-container").height(activeHight);
    },100);
}



function updateNavPosition(mySwiper3){
		$('#typeswiper .sj_list_li_click').removeClass('sj_list_li_click')
		var activeNav = $('#typeswiper .swiper-slide').eq(mySwiper3.activeIndex).addClass('sj_list_li_click');

		if (!activeNav.hasClass('swiper-slide-visible')) {
			if (activeNav.index()>mySwiper2.activeIndex) {
				var thumbsPerNav = Math.floor(mySwiper2.width/activeNav.width())-1
				mySwiper2.swipeTo(activeNav.index()-thumbsPerNav)
			}
			else {
				mySwiper2.swipeTo(activeNav.index())
			}	
		}

		var index = mySwiper3.activeIndex;
		vm.coterieNo = vm.typelist[index].coterieNo;
		contentVue.init(index);
		GetOrderList(mySwiper3);
	}
}




function textauto(){
	 $(".main_shq_list_con").each(function(){
            var box_height = $(this).height();
            var $p = $("p", $(this)).eq(0);
            while ($p.outerHeight() > box_height) {
                $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
            };
        });
}