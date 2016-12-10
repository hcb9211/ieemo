//判断是否ios
function isIOS() {
	return api.systemType == "ios";
}
/************ 判断是否登录. ****************/
	function doLogin(name){
		var user = $api.getStorage('user');
		if(user){
			return;
		}else{
			api.alert({
			    title: '提示',
			    msg: '请先登录',
			    buttons: ['确定']
			},function( ret, err ){
			    if( ret ){
			         return;
			    }
			});
            
		}
	}
	function goLogin(){
		var user = $api.getStorage('user');
		if(user){
			return;
		}else{
			 if (api.systemType == "ios") {
				 var times = 0;
			 }else{
			 	var times = 300;
			 }
            api.openWin({
	            name: 'login',
	            url: '../login/login_head.html',
	            delay:times
            });
		}
	}
	function openWinto(name,url){//打开新窗口
		 if (api.systemType == "ios") {
			 var times = 0;
		 }else{
		 	var times = 300;
		 }
        api.openWin({
            name: name,
            url: url+'.html',
            delay:times,
            slidBackType:'edge'
        });
	}
	function openWin(name,url,islogin){//打开新窗口并且需要验证登录
		 if (api.systemType == "ios") {
			 var times = 0;
		 }else{
		 	var times = 300;
		 }
		 if(islogin){//判断是否需要登录验证
		 	var user = $api.getStorage('user');
				if(!user){
					api.alert({
					    title: '提示',
					    msg: '请先登录',
					    buttons: ['确定']
					});
		            return;
			 }else{
		        api.openWin({
		            name: name,
		            url: url+'.html',
		            delay:times,
		            slidBackType:'edge'
		        });
		    }
	    }
	}
	 function toast(text,location){	 	
		api.toast({
		    msg : text,
		    location : location
		});
	}
	function openFrame(name,url){//打开一个子窗口,一般用于打开分享页面
		api.openFrame({
		    name: name,
		    url: url+'.html',
		    rect:{
		    		x: 0,
		        y: 0,
		    },
		    bounces: false
		});
	}
	function call(tel){
		api.call({
		    type: 'tel_prompt',
		    number: tel
		});
	}
/*搜索相关方法*/
function doSearch(){
		$api.addCls($api.dom(".aui-searchbar-wrap"),"focus");
		$api.dom('.aui-searchbar-input input').focus();
	}
	function cancelSearch(){
		$api.removeCls($api.dom(".aui-searchbar-wrap.focus"),"focus");
		$api.val($api.byId("search-input"),'');
		$api.dom('.aui-searchbar-input input').blur();
	}
	function clearInput(){
		$api.val($api.byId("search-input"),'');
	}
	function search(){
		var content = $api.val($api.byId("search-input"));
		if(content){
			api.alert({
			    title: '搜索提示',
			    msg: '您输入的内容为：'+content
			});
		}else{
			api.alert({
			    title: '搜索提示',
			    msg: '您没有输入任何内容'
			});
		}
		cancelSearch();
	}

	/*扫一扫 二维码扫描*/
	 function doScanner(){
		var FNScanner = api.require('FNScanner');
		FNScanner.openScanner({
			sound : 'widget://res/bi.wav',
		    autorotation: true,
		},function( ret, err ){        
		    if( ret ){
		    		if(ret.eventType == 'success'){
		    			alert( JSON.stringify( ret.content ) );
		    		}		        
		    }else{
		        alert( JSON.stringify( err ) );
		    }
		});		
	}

/*scl add*/
function changebtn(obj){
	 if(obj.innerHTML.indexOf('加入icart') >= 0){
	 	obj.innerHTML='<div class="aui-label aui-label-gray aui-label-margin" tapmode>已加入</div>'
	 }else{
	 	obj.innerHTML='<div class="aui-label aui-label-danger aui-label-margin" tapmode>加入icart</div>'
	 }
}

function changebtnmax(obj){
	 if(obj.innerHTML.indexOf('加入icart') >= 0){
	 	obj.innerHTML='<div class="aui-label aui-label-gray aui-label-max2">已加入</div>'
	 }else{
	 	obj.innerHTML='<div class="aui-label aui-label-danger aui-label-max">加入icart</div>'
	 }
}

function changebtn_yhq(obj){
	 if(obj.innerHTML.indexOf('点击') >= 0){
	 	obj.innerHTML='<div class="aui-text-align-one">已领取</div>';
	 	obj.className='aui-col-xs-3 aui-col-xs-h aui-square-one';
	 } 

}



function openWin(name) {
	var delay = 0;
	if (api.systemType != 'ios') {
		delay = 300;
	}
	api.openWin({
		name : '' + name + '',
		url : '' + name + '.html',
		bounces : false,
		delay : delay,
		slidBackEnabled : true,
		vScrollBarEnabled : false
	});
}