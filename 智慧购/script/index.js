//社区定位经度
// var latitude = 32.083842;
//社区定位纬度
// var longitude = 118.776832;
var  topheader= new Vue({
    el:"#top_header",
    data:{
        community:{},
        communityList:[],
        userNo : user.getuserNo(),
    },
    methods:{
        //社区定位
        communitylocation:function(lat,lon){
        	topheader.community=[];
            var commdata = {
                lat1:lat,
                lng1:lon,
                pageNo:1,
                pageSize:8,
                userNo:topheader.userNo
            };
            postAjax(ApiUrl.queryNearByCommunity,commdata,function(ret,err){
                if (ret) {
                    if(ret.data){
                        if(ret.data.community.communityName != undefined){
                           topheader.community = ret.data.community;
                        }else{
                            topheader.community = ret.data.communityList[0];
                        }
                    }
                }
            });
        },
//      clickcommunity : function(){
//      	if(user.islogin()){
//      		var userNo = user.getuserNo();
//      		if(!userNo){
//      			user.trunlogin();
//      		}
//      	}
//      }
    }
});
apiready = function() {
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
        }else{
            toast('请在设置里授权定位哦~','bottom');
        }
    });
    //  向右返回
    api.parseTapmode();
    var header = $("#top_header").eq(0)[0];
    $api.fixStatusBar(header);
    var headerPos = $api.offset(header);
    var body_h = $api.offset($api.dom('body')).h;
    var footer_h = $api.offset($api.byId('nav')).h;
    api.openFrameGroup({
        name : 'footer_tab_index',
        scrollEnabled : false,
        rect : {
            x : 0,
            y : headerPos.h,
            w : 'auto',
            h : api.frameHeight - headerPos.h - footer_h
        },
        index : 0,
        preload : 0,
        frames : [{
            name : './html/index_frm',
            url : './html/index_frm.html'
        },
            {
                name : 'friend',
                url : './html/dynamic/dynamic_index_win.html',
                bounces : false
            },
            {
                name : 'lifecircle',
                url : './html/lifecircle/circle_frm.html',
                bounces : false
            },
            {
                name : 'news',
                url : './html/news/message.html',
                bounces : false
            }, {
                name : 'usercenter',
                url : './html/usercenter/usercenter_index_frm.html',
                bounces : false
            }]
    }, function(ret, err) {});

    api.setStatusBarStyle({
        style: 'light',
        color: '#ffffff'
    });

    $(".dynamic_bottom").on('touchstart', 'li', function(event) {
        event.preventDefault();
        $(this).find(".dynamic_bottom_img1").addClass("display").parent("li").find(".dynamic_bottom_img2").removeClass("display");
        $(this).siblings().find(".dynamic_bottom_img1").removeClass("display");
        $(this).siblings().find(".dynamic_bottom_img2").addClass("display");
        $(this).find(".dynamic_bottom_font").addClass("dynamic_bottom_font_click");
        $(this).siblings().find(".dynamic_bottom_font").removeClass("dynamic_bottom_font_click");
        $(this).find(".dynamic_bottom_img2").removeClass("dynamic_bottom_shq2_rotate");
        $(".shq_bottom_box").removeClass("shq_bottom_box_tc");
        var index = $(this).index();

        // $("header").hide();
        // $(":header").eq(index).show();

        if(index == 1){
            if(!user.islogin()){
                user.trunlogin(["test"])
                return false;
            }
            api.setFrameGroupAttr({
                name: 'footer_tab_index',
                rect : {
                    x : 0,
                    y : 0,
                    w : 'auto',
                    h : api.frameHeight  - footer_h
                },
            });
        }else{
            api.setFrameGroupAttr({
                name: 'footer_tab_index',
                rect : {
                    x : 0,
                    y : headerPos.h,
                    w : 'auto',
                    h : api.frameHeight - headerPos.h - footer_h
                },
            });
            $("div[name='header']").addClass('display')
            $("div[name='header']").eq(index).removeClass('display')
            var header = $("div[name='header']").eq(index)[0];
            $api.fixStatusBar(header);
        }


        api.setFrameGroupIndex({
            name : 'footer_tab_index',
            index : index,
            scroll : false,
        });
    });

    api.addEventListener({
        name: 'test'
    }, function(ret, err) {
       var index = 1;
         api.setFrameGroupAttr({
            name: 'footer_tab_index',
            rect : {
                x : 0,
                y : 0,
                w : 'auto',
                h : api.frameHeight  - footer_h
            },
        });
        api.setFrameGroupIndex({
            name : 'footer_tab_index',
            index : index,
            scroll : false,
        });
    });
  $(".dynamic_bottom").on('touchstart', '.dynamic_bottom_shq2', function(event) {
        $(this).attr('class', '');
        $(this).toggleClass("dynamic_bottom_shq2_rotate");
        api.sendEvent({
            name: 'addcirclebutton',
            extra: {
                key1: 'value1'
            }
        });

    });
     $(".dynamic_bottom").on('touchstart', '.dynamic_bottom_shq2_rotate', function(event) {
        $(this).attr('class', 'dynamic_bottom_img2 dynamic_bottom_shq2');
        api.sendEvent({
            name: 'addcirclebutton',
            extra: {
                key1: 'value1'
            }
        });

    });
    api.addEventListener({
		name : 'communty'
	},function(ret,err){
		if(ret){
		topheader.community.communityName = ret.value.communtyName;
		}
	});
 };
function enterCommunity() {
	var data = {
        url:{
            url: api.wgtRootDir+"/html/community/community.html",
            name:"community_frm",
            title:"定位社区"
        }
    }
 openWinFrame("community_win", api.wgtRootDir+"/html/comm/head_back.html",data);
}
function enterset()
{
    var data = {
        url:{
            url: api.wgtRootDir+"/html/set/set_index_win.html",
            name:"setting",
            title:"设置"
        },
        islogin : '0',
        info:{},
    }
    openWinFrame("community", api.wgtRootDir+"/html/comm/head_back.html",data);
}

function search_win() {
    openWin('html/search/search_win');
}
function search(){
    var UISearchBar = api.require('UISearchBar');
        UISearchBar.open({
            placeholder: '请输入话题',
            historyCount: 10,
            showRecordBtn: false,
            dataBase:"searchcircle",
            texts: {
                cancelText: '取消',
                clearText: '清除搜索记录'
            },
            styles: {
                navBar: {
                    bgColor: '#e02323',
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
                var srcTitle = ret.text;
                if("" == srcTitle){
                    alert("请输入搜索内容")
                    return false;
                }
                var data = {
                    info:{srcTitle:srcTitle},
                    url:{
                        url: api.wgtRootDir+"/html/lifecircle/search/searchcircle_frm.html",
                        name:"searchcircle_frm",
                        title:"话题"
                    }
                }
                openWinFrame("searchcircle_win", filepath.getPath(filepath.comm.headback.win),data);
            }
           });
}

/*扫一扫 二维码扫描*/
function doScanner(){
    if(user.islogin()){
        var type = '';  //  声明type
        var FNScanner = api.require('FNScanner');
        FNScanner.openScanner({
            sound : 'widget://res/bi.wav',
            autorotation: true,
        },function( ret, err ){
            if( ret ){
                if(ret.eventType == 'success'){
                    var userNo = user.getuserNo();
                    if(userNo){
                        var content = ret.content;
                        if(content.match(':') && content.length == 17){
                            var data = {
                                macId : ret.content,
                                userNo : userNo
                            };
                            postAjax(ApiUrl.qrCode,data,function (ret,err) {
                                if(ret){
                                    var qrCode = 1;
                                    type = 0; // 扫码平板登录；
                                    if(ret.retMsg == '通知平板二维码登录成功'){
                                        api.sendEvent({
                                            name : 'qrCode',
                                            extra : qrCode
                                        })
                                    }
                                    FNScanner.closeView();
                                }else{
                                    alert(ret.retMsg);
                                }
                            })
                        }else if(content.match('bindyimaoke')){
                            var recommendMobile = user.getuserinfo().referralCode;
                            //  绑定亿猫客
                           var data = {
                               mobile : '',
                               recommendMobile : recommendMobile,
                               userNo : userNo
                           }
                           postAjax(ApiUrl.bindRecommendMobile,data,function (ret,err) {
                               if(ret){
                                   alert(JSON.stringify(ret))
                               }else{
                                   alert(ret.retMsg);
                               }
                           })
                        }
                        else{
                            toast('请扫描正确二维码','middle');
                            return false;
                        }
                    }
                }
            }
        });
    }else{
        user.trunlogin('');
    }

}  //  doSanner
