//数据提交，不更新，使用数据双向绑定。
var  topheader= new Vue({
    el:"#top_header",
    data:{
    	//已经加入社区
        community:{},
        //附近社区列表
        communityList:[],
        //用户名
        userNo : user.getuserNo(),
        //默认城市
        commCity:"南京市",
        //搜索社区列表
		searchList:[],
		//当前所在社区 
		present:[],
		//搜索值
		commsearch:"",
		//搜索是否框转换
		nearby:true,
		search:false
    },
    methods:{
        //社区定位
        communitylocation:function(lat,lon){
        	var self = this;
            var commdata = {lat1:lat,lng1:lon,pageNo:1,pageSize:8,userNo:user.getuserNo()};
            postAjax(ApiUrl.queryNearByCommunity,commdata,function(ret,err){
                if (ret) {
                    if(ret.data){
                    	self.list = ret.data;
                    	self.community = ret.data.community;
                        self.communityList = ret.data.communityList;
                        self.present = self.communityList[0]; 
                    };
                };
            },{progress:'1'});
        },
        //加入社区
        addCommunity:function(bean,index){
        	var _self = this;
        	var add = {communtiyNo:bean.communityNo,status:"1",userNo:user.getuserNo()};
        	if ((index==2)&&(topheader.community.countyId != undefined)) {
        		toast("请退出您已加入的社区！");
        		_self.commsearch="";
        		return false;
        	}
        	dialog.alert({text:"是否加入本社区？"},function(){
        		postAjax(ApiUrl.saveMemberCommunity,add,function(ret,err){
	        		if(ret){
	        			//验证是否成功加入社区
	        			if(ret.retCode == "1001"){
	        				_self.community = bean;	
                            user.setuserbyKey("communityNo",bean.communityNo);
	        				api.sendEvent({
								name : 'communty',
								extra : {
									communtyName : bean.communityName
								}
							})
	        			}
	        			_self.commsearch="";
	        			
	        		}
	        	},{islogin:"1",progress:"1",callback:["cmmounityinit"]});
        	});	
        },
        //退出社区
        quitCommunity:function(bean){
        	var _self = this;
        	var add = {
        		communtiyNo:bean.communityNo,
        		status:"0",
        		userNo:topheader.userNo,
        	};
        	dialog.alert({text:"是否退出当前社区？"},function(){
        		postAjax(ApiUrl.saveMemberCommunity,add,function(ret,err){
	        		if(ret){
	        			//验证属否成功推出社区
	        			if(ret.retCode == "1003"){
                            user.setuserbyKey("communityNo","");
	        				api.alert({
		        				title : '提示',
		        				msg : ret.retMsg
		        			})
	        				_self.community = {};
	        				_self.nearbyclick();
	        			}
	        		}
	        	},{islogin:"1",progress:"1",callback:["cmmounityinit"]});
        	});
        },
        //重新定位
        poiList:function(){forminit();api.toast({msg:'刷新成功',duration: 1000,});},
        //搜索到的社区
        searchinit:function(){
        	var selfsear = this;
			var updata = {communityName:selfsear.commsearch};
			postAjax(ApiUrl.queryCommunityByName,updata,function(ret,err){
				if (ret) {
					if(ret.retMsg != ""){
						api.toast({
							msg:selfsear.commCity+"暂无该社区！",
							duration: 2000,
						})
					}
					selfsear.searchList=ret.data;
					selfsear.commsearch ='';
				}
			},{progress:"1"});
		},
		//搜索是否显示
		nearbyclick:function(){
			topheader.nearby = true;
			topheader.search = false;
		},
		searchclick:function(){
			topheader.search = true;
			topheader.nearby = false;
		}
    }
})
//api
apiready = function () {
    forminit();
    api.addEventListener({
        name: 'cmmounityinit'
    }, function(ret, err) {
       forminit();
    });
}
function forminit(){
    var userNo = user.getuserNo();
    var bMap = api.require('bMap');
    bMap.getLocation({
        accuracy: '100m',
        autoStop: true,
        filter: 1
    }, function(ret, err) {
        if (ret.status) {
            var latitude = ret.lat;
            var longitude = ret.lon;
            topheader.userNo = userNo;
            topheader.communitylocation(latitude,longitude);
            bMap.getNameFromCoords({
                lon : longitude,
                lat : latitude
            },function (ret,err) {
                if(ret.status){
//                  alert(JSON.stringify(ret));
                    $('.top_id').html(ret.city);
                    for(var i in ret.poiList){
                        $('.nowAddress').text(ret.poiList[0].name);
                    }
                };
            })
        }else{
            toast('请在设置里授权定位哦~','bottom');
        }
    });
}

//var communityName = $('.dd').html();
//api.sendEvent({
//	name : 'communty',
//	extra : {
//		communtyName : communityName
//	}
//})
//
//api.addEventListener({
//	name : 'communty'
//},function(ret,err){
//	if(ret){
//		alert(ret.value.communtyName);
//		
//	}
//})
