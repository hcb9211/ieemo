var enshrine = new Vue({
	el:"#enshrine",
	data:{
		userNo:user.getuserNo(),
		enshrineList:[],
		enshrinepageNo:1,
		enshrinepageSize:8,
		lastbena:[],
		judgeval:0
	},
	methods:{
		init:function(){
			var self = this;
			var Updata = {pageNo:self.enshrinepageNo,pageSize:self.enshrinepageSize,userNo:self.userNo};
			postAjax(ApiUrl.queryMyCoterieCollectPage,Updata,function(ret,err){
				if (ret) {
					if (ret.data) {
						for (var i=0;i<ret.data.length;i++) {
							var List = ret.data[i];
							List.enshrinedisplay=true;
							self.enshrineList.push(List);
						}
					}
				}
			},{progress:'1'})
		},
		enshrinedisplay:function(bean){
			event.stopPropagation();
			this.judgeval = 1;
			if (this.lastbena.enshrinedisplay == false) {
				this.lastbena.enshrinedisplay = true;
			};
			bean.enshrinedisplay=false;
			this.lastbena = bean;
		},
		alldisplay:function(){
			var self = this;
			if (self.judgeval == 0) {
				return false;
			};
			for (var i=0;i<self.enshrineList.length;i++){
				self.enshrineList[i].enshrinedisplay = true;
			};
			self.judgeval = 0;
		},
		particulars:function(bean){
			if (bean.collectSrc=='0') {
				var data = {
			        url:{
			            url: api.wgtRootDir+"/html/lifecircle/experience/info/experieceinfo_frm.html",
			            name:"experieceinfo_frm",
			            title:"经验详情"
			        },
			        info:{
			        	srcNo:bean.srcNo
			        }
			    }
			    openWinFrame("experieceinfo_win", api.wgtRootDir+"/html/lifecircle/experience/info/experieceinfo_win.html",data);
			} else{
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
	}
});
apiready = function(){
	enshrine.init();
	api.setRefreshHeaderInfo({
	    visible : true,
	    loadingImg : 'widget://image/refresh.png',
	    bgColor : '#ccc',
	    textColor : '#fff',
	    textDown : '下拉刷新...',
	    textUp : '松开刷新...',
	    showTime : true
	}, function(ret, err) {
		enshrine.enshrinepageNo = 1;
		enshrine.enshrineList = [];
        enshrine.init();
        setTimeout("api.refreshHeaderLoadDone()",'1000');
	});
	//  上拉加载
    $(window).scroll(function () {
        if($(window).scrollTop() >= $(document).height() - $(window).height()){
            enshrine.enshrinepageNo += 1;
            enshrine.init()
            // alert(index.pageNo)
        }
    });
};
//    多行文本溢出
$(".myshq_experience_con").each(function(){
    var box_height = $(this).height();
    var $p = $("p", $(this)).eq(0);
    while ($p.outerHeight() > box_height) {
        $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
    };
});