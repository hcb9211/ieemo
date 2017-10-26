var orderEva = new Vue({
	el:"#orderEva",
	data:{
		orderEvaNoVue:"",
//		orderEva:[],
		Updata: []
	},
	methods:{
		orderEvaInit:function(orderEvaNovue){
			var _self = this;
			var updata = {orderNo:orderEvaNovue};
			postAjax(ApiUrl.queryUserOrderDetail,updata,function(ret,err){
				if (ret) {
					orderEva.Updata = ret.data;
					for(ind in ret.data.commodityList){
						ret.data.commodityList[ind].evaluationScore = "";
						ret.data.commodityList[ind].storeEvaluationScore = "";
						ret.data.commodityList[ind].content = "";
						ret.data.commodityList[ind].baselist = [];
						ret.data.commodityList[ind].picturelist = [];
					}
					orderEva.Updata = ret.data;
//					orderEva.orderEva = ret.data.commodityList;
					Vue.nextTick(function(){
					    dianji();
					})
				} else{}
			},{progress:'1'})
		},
		addimg:function(bean){
			var _self = this;
		        var data = {
		            type : 10,
		            userNo : user.getuserNo()
		        };
		    carmersystem({
		        data:data,
		        url:_FileUploadServerUrl,
		        callback:function(data){
		        	 bean.baselist.push(data.locationsrc);
		        	 bean.picturelist.push(data.relativeUrl);
		        	 _self.$forceUpdate();//强行渲染页面
		        }
		    })
		},
		commoditygrade:function(bean,commodity){
			bean.evaluationScore=commodity;
		},
		shopgrade:function(bean,shop){
			bean.storeEvaluationScore=shop;
		},
		Submit:function(){
			var data = $.extend({}, orderEva.Updata);
			var Evaluation = {
				evaluationList:[],
				orderNo:api.pageParam.orderEva,
				storeId:data.storeId,
				userNo:user.getuserNo(),
			};
			for (var i=0;i<data.commodityList.length;i++) {
				var bean = data.commodityList[i];
				var obj = {};
				obj.content = bean.content;
				obj.evaluationScore = bean.evaluationScore;
				obj.goodsCode = bean.commodityCode;
				obj.storeEvaluationScore = bean.storeEvaluationScore;
				obj.picture = bean.picturelist.toString();
				Evaluation.evaluationList.push(obj);
			};
			for (var i=0;i<Evaluation.evaluationList.length;i++) {
				if(Evaluation.evaluationList[i].evaluationScore==""){
					api.toast({msg:"亲！你有商品未作出评分哦！",duration: 2000,});
					return false;
				}
				
				if(Evaluation.evaluationList[i].storeEvaluationScore==""){
						api.toast({msg:"亲！你有商品未作出评分哦！",duration: 2000,});
						return false;
				}
			}
			var data = {
				Evaluation:Evaluation
			}  
			postAjax(ApiUrl.saveProductEvaluation,data,function(ret,err){
				if (ret) {
					if (ret.retCode == 0){
						api.toast({
							msg:"恭喜您已完成评价！",
							duration: 2000
						});
						api.sendEvent({
							name : 'orderEvaluate',
							extra : {
								orderEvaluate : 1
							}
						});
						api.closeWin();
					}else if(ret.retCode == 3){
						api.toast({
							msg:"订单评价失败！请稍候再试！",
							duration: 2000
						});
					}
				} else{
					api.toast({
					    msg: '网络开了会小差！请刷新后在提交！',
					    duration: 2000,
					});
				}
			});
		}
	}
})
apiready = function(){
	var orderEvaNoApi = api.pageParam.orderEva;
	orderEva.orderEvaNoVue = orderEvaNoApi;
	orderEva.orderEvaInit(orderEvaNoApi);
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
            orderEva.orderEvaInit(orderEvaNoApi);
            setInterval("api.refreshHeaderLoadDone()",'1000');
		}
	});
};
function dianji(){
	//多行文本溢出
	$(".gwjl_pj_xq_name").each(function(){
	    var box_height = $(this).height();
	    var $p = $("p", $(this)).eq(0);
	    while ($p.outerHeight() > box_height) {
	        $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
	    };
	});
	/*商品评分-星星点击效果*/
	$(".main_dynamic").each(function(index){
   		$(this).find(".mine_plsj_pf_list1 li").each(function(ind){
   			if(ind == 0){
   			 	$(this).click(function(){$(this).parent().css({"background-position":"-3px -35px"});});
   			}else if(ind == 1){
   				$(this).click(function(){$(this).parent().css({"background-position":"-3px -68px"});});
   			}else if(ind == 2){
   				$(this).click(function(){$(this).parent().css({"background-position":"-3px -102px"});});
   			}else if(ind == 3){
   				$(this).click(function(){$(this).parent().css({"background-position":"-3px -135px"});});
   			}else if(ind == 4){
   				$(this).click(function(){$(this).parent().css({"background-position":"-3px -167px"});});
   			}
   		});
   		$(this).find(".mine_plsj_pf_list2 li").each(function(ind){
   			if(ind == 0){
   			 	$(this).click(function(){$(this).parent().css({"background-position":"-3px -35px"});});
   			}else if(ind == 1){
   				$(this).click(function(){$(this).parent().css({"background-position":"-3px -68px"});});
   			}else if(ind == 2){
   				$(this).click(function(){$(this).parent().css({"background-position":"-3px -102px"});});
   			}else if(ind == 3){
   				$(this).click(function(){$(this).parent().css({"background-position":"-3px -135px"});});
   			}else if(ind == 4){
   				$(this).click(function(){$(this).parent().css({"background-position":"-3px -167px"});});
   			}
   		});
	});
}