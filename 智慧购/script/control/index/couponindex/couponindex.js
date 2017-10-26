/**
 * Created by HonyBob on 2017/8/11.
 */
var youhui = new Vue({
    el:"#maskBox",
    data:{
        youhuiList:[],
        latitude:"",
        longitude:""
    },
    methods:{
        //优惠券——亿猫专享
        youhuiquan:function(){
            var self = this;
            var yhUpdata = {pageNo:1,pageSize:9999,userNo:user.getuserNo(),latitude:self.latitude,longitude:self.longitude};
            postAjax(ApiUrl.queryShopCouponPage,yhUpdata,function(ret,err){
                if (ret) {
                    if (ret.data) {
                        for (var i=0;i<ret.data.length;i++) {
                            self.youhuiList = ret.data;
                        }
                        youhui.$nextTick(function () {
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
        shanchu:function(bean){
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
        }
    }
})

function discount(){
    var winW = api.winWidth;
    var winH = api.winHeight;
    $('.mask').css({
        width:winW,
        height:winH,
        background:'rgba(0,0,0,0.5)',
        position:'absolute',
        left : 0,
        top:0,
    });
    //定位
    var bMap = api.require('bMap');
    bMap.getLocation({
        autoStop: true,
        filter: 1
    }, function(ret, err) {
        if (ret.status) {
            youhui.latitude = ret.lat;
            youhui.longitude = ret.lon;
            //亿猫专项优惠券
            youhui.youhuiquan();
        }
    });

    //插入已打开优惠券页面记录
   var couponstr  = localStorage.getItem("couponindex");
   var coupon = {};
   var currentdate = getNowFormatDate("");
   var userNo = "couponindexcurrent";
   if(couponstr){
       coupon =  JSON.parse(couponstr)
   }
  
   if(!coupon[currentdate]){
        coupon[currentdate] = {};
   }
   if(user.islogin()){
     userNo =  user.getuserNo();
   }
   coupon[currentdate][userNo] = "1";
   localStorage.setItem('couponindex',JSON.stringify(coupon));
}

$('.discountClose').click(function () {
    api.closeFrame();
})

apiready = function () {
    discount();
}
