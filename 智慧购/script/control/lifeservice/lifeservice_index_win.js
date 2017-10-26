apiready = function(){
	vm.init();
	jxvm.init();
	
	//搜索
	$(".life_top").click(function(){
		var UISearchBar = api.require('UISearchBar');
	    UISearchBar.open({
	        placeholder: '请输入搜索内容',
	        historyCount: 10,
	        showRecordBtn: false,
	        dataBase:"lifeservice_search_index",
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
	                    url: api.wgtRootDir+"/html/lifeservice/lifeservice_search.html",
	                    name:"搜索结果",
	                    title:"搜索结果"
	                }
	            }
	            openWinFrame("test", api.wgtRootDir+"/html/comm/head_back.html",data);
	        }
	       });
	});
}

//加载服务类型
var vm = new Vue({
	el: ".life_dt",
	data:{
		typeList:[]
	},
	methods:{
		init:function(){
			var _self = this;
			var reqdata = {
				pageNo:1,
				pageSize:999
			};
			postAjax(ApiUrl.queryAllCommunityServiceType,reqdata,function(ret,err){
				if (ret) {
					for (var i=0;i<ret.data.length;i++) {
						_self.typeList.push(ret.data[i]);
					}
				} else{}
			})
		},
      	querylist:function(serviceTypeNo, serviceName){
      		//分类展示列表
      		var data = {
	                url:{
	                    url: api.wgtRootDir+"/html/lifeservice/lifeservice_list.html",//frm地址
	                    name:"lifeservice_list",//frm的名字
	                    title:serviceName//窗口的title
	                },
	                info:{serviceTypeNo:serviceTypeNo}
	            };
	
	            openWinFrame("head_back", api.wgtRootDir+"/html/comm/head_back.html",data);
      	}
	}
});

$(window).scroll(function () {
	    if($(window).scrollTop()!= 0 && $(window).scrollTop() >= $(document).height() - $(window).height()){
	    	jxvm.next();
	    }
	});
	
//加载精选服务
var jxvm = new Vue({
	el: "#jxUl",
	data:{
		list:[],
		pageNo:1,
		pageSize:999
	},
	methods:{
		init:function(){
			var _self = this;
			var reqdata = {
				pageNo:_self.pageNo,
				pageSize:_self.pageSize
			};
			postAjax(ApiUrl.queryAllCommunityServiceByHighQuality,reqdata,function(ret,err){
				if (ret) {
					if("0" == ret.retCode){
						for (var i=0;i<ret.data.length;i++) {
							_self.list.push(ret.data[i]);
						}
					}else{
						toast(ret.retMsg);
					}
				} else{
					toast(err.msg);
				}
			})
		},
		next:function(){
			this.pageNo = this.pageNo + 1;
			this.init();
		},
      	detail:function(seviceNo){
      		var data = {
	                url:{
	                    url: api.wgtRootDir+"/html/lifeservice/lifeservice_info.html",//frm地址
	                    name:"lifeservice_info",//frm的名字
	                    title:"服务详情",//窗口的title
	                },
	                info:{seviceNo:seviceNo}
	            };
	
	            openWinFrame("head_back", api.wgtRootDir+"/html/comm/head_back.html",data);
      	},
		call:function(bean){
			//展示内容
			$(".sjindex_lxtc_con").eq(1).html(bean.realName + " " + bean.telNo);
			$(".sjindex_lxtc_btn_yes").attr("data-no", bean.telNo);
			$(".fixed_tc").show();
      	}
	}
});

//打电话
function callPhone(){
	var number = $(".sjindex_lxtc_btn_yes").attr("data-no");
	api.call({
	    type: 'tel',
	    number: number
	});
}