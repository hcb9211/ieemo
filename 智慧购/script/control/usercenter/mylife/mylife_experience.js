var experience = new Vue({
	el:"#mylife_experience",
	data:{
		userNo:user.getuserNo(),
		experienceList:[],
		experiencepageNo:"1",
	},
	methods:{
		init:function(){
			var self = this;
			var updata = {pageNo:self.experiencepageNo,pageSize:"8",userNo:self.userNo};
			postAjax(ApiUrl.queryMyCoterieExpPage,updata,function(ret,err){
				if (ret) {
					if (ret.data) {
						for (var i=0;i<ret.data.length;i++) {
							self.experienceList.push(ret.data[i]);
						}
					}
				}
			},{progress:'1',islogin:"1"})
		},
		particulars:function(bean){
			var data = {
		        url:{
		            url: api.wgtRootDir+"/html/lifecircle/experience/info/experieceinfo_frm.html",
		            name:"experieceinfo_frm",
		            title:"经验详情"
		        },
		        info:{
		        	srcNo:bean.exNo
		        }
		    }
		    openWinFrame("experieceinfo_win", api.wgtRootDir+"/html/lifecircle/experience/info/experieceinfo_win.html",data);
		}
	}
})
apiready=function(){
	experience.init();
	api.setRefreshHeaderInfo({
	    visible : true,
	    loadingImg : 'widget://image/refresh.png',
	    bgColor : '#ccc',
	    textColor : '#fff',
	    textDown : '下拉刷新...',
	    textUp : '松开刷新...',
	    showTime : true
	}, function(ret, err) {
		experience.experiencepageNo = 1;
		experience.experienceList = [];
        experience.init();
        setTimeout("api.refreshHeaderLoadDone()",'1000');
	});
	//  上拉加载
    $(window).scroll(function () {
        if($(window).scrollTop() >= $(document).height() - $(window).height()){
            experience.experiencepageNo += 1;
            experience.init()
            // alert(index.pageNo)
        }
    });
}
//    多行文本溢出
$(".myshq_experience_con").each(function(){
    var box_height = $(this).height();
    var $p = $("p", $(this)).eq(0);
    while ($p.outerHeight() > box_height) {
        $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
    };
});