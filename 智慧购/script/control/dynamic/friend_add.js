apiready = function (){
	//通讯录
	$("#phoneLi").click(function(){
		var data = {
            url:{
                url: api.wgtRootDir+"/html/dynamic/mobile_contact.html",//frm地址
                name:"mobile_contact",//frm的名字
                title:"通讯录"//窗口的title
            }
        };

        openWinFrame("mobile_contact_firm", api.wgtRootDir+"/html/comm/head_back.html",data);
	});
	
	//搜索
	$("#searchUl").click(function(){
		var UISearchBar = api.require('UISearchBar');
	    UISearchBar.open({
	        placeholder: '用户名/手机号码',
	        historyCount: 10,
	        showRecordBtn: false,
	        dataBase:"friend_add_index",
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
	            var condition = ret.text;
	            var data = {
	                info:{condition:condition},
	                url:{
	                    url: api.wgtRootDir+"/html/dynamic/friend_add_search.html",
	                    name:"添加好友搜索结果",
	                    title:"添加好友搜索结果"
	                }
	            }
	            openWinFrame("friend_add_search", api.wgtRootDir+"/html/comm/head_back.html",data);
	        }
	       });
	});

	//扫二维码
	$("#scannerLi").click(function(){
		// var scanner = api.require('scanner');

		// scanner.open(function(ret, err) {
		// 	alert(JSON.stringify(ret))
		// 	alert(3232)
		//     if (ret) {
		//     	if("success" == ret.eventType)
		//     	{
		//     		var bean = (new Function("","return" + ret.msg))();
		//     		if("addfried" == bean.type){
		//     			vm.bean = bean.value;
		//     			$(".fixed_tc_zIndex").show();
		//     		}else{
		//     			alert(bean.type);
		//     		}	
		//     	}
		//     } else {
		//         alert(JSON.stringify(err));
		//     }
		// });

		var FNScanner = api.require('FNScanner');
		FNScanner.openScanner({
		    autorotation: true
		}, function(ret, err) {
		    if (ret) {
		        var content = ret.content;
		        if(content){
		        	var bean = (new Function("","return" + content))();
		        	if("myqrcode" == bean.type){
		    			vm.bean = bean.value;
		    			$(".fixed_tc_zIndex").show();
		    		}else{
		    			// alert(bean.type);
		    		}	
		        }
		    } else {
		        toast("二维码扫描错误")
		    }
		});
	});
	
	//附近的人
	$("#nearbyLi").click(function(){
			var data = {
                url:{
                    url: api.wgtRootDir+"/html/dynamic/nearby_peop.html",//frm地址
                    name:"nearby_peop",//frm的名字
                    title:"附近的人"//窗口的title
                }
            };

            openWinFrame("nearby_peop_firm", api.wgtRootDir+"/html/comm/head_back.html",data);
	});
};

var vm = new Vue({
	el: "#bodyDiv",
	data:{
		bean:{
			
		}
	},
	methods:{
		ok:function(){
			var bean = this.bean;
			api.showProgress({
				style: 'default',
				animationType: 'fade',
				title: '添加好友中',
				text: '请稍候',
				modal: true
			});
			
        	//查询我的数据
        	var data = {
				userNo :user.getuserNo(),
				friendUserNo: bean.userNo
			};
			
			postAjax(ApiUrl.addFriendsInvite,data, function (ret, err) {
				api.hideProgress();	
				var dialog = new auiDialog({});
				if (ret) {
					if(ret.retCode=='0'){
		                toast("已发送好友申请");
		                $(".fixed_tc_zIndex").hide();
					}else{
		                toast(ret.retMsg);
					 return false;
					}
				} else {
					 toast("添加好友失败");
	                return false;
				}
			},{islogin:"1",progress:"1"});
		},
		cancel:function(){
			this.bean = {};
			$(".fixed_tc_zIndex").hide();
		}
	}

})