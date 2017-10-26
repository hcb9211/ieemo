/**
 * Created by HonyBob on 2017/6/24.
 */
apiready = function () {
    var userNo = user.getuserNo();
    // 获取用户积分详情
    integralVm.integralInit();
    // 获取总里程
    integralVm.mileageInit();
    if(user.islogin()){
        if(userNo){
            var data = {userNo : userNo};
            postAjax(ApiUrl.queryTotalIntegralByUserNo,data,function (ret,err) {
                if(ret){
                    if(ret.data){
                        $('.myjf_con_number').html(ret.data.totalIntegral);
                        var getCal = JSON.parse(ret.data.totalIntegral * 0.275).toFixed(2);
                        $('.getCal').html(getCal + 'kg');

                        var totaldistance = ret.data.totaldistance;  // 总里程
                        var aggregatescore = ret.data.aggregatescore; // 总积分
                        var totalCal = JSON.parse(aggregatescore * 0.275).toFixed(2);
                        $('.totalCal').text(totalCal + 'kg');
                    }else{
                        $('.myjf_con_number').html(0);
                    }
                }
            })
        }
    }
    //  上拉加载
    $(window).scroll(function () {
        if($(window).scrollTop() >= $(document).height() - $(window).height()){
            integralVm.pageNo +=1;
            integralVm.integralInit();
        }
    });

}; // apiready

var integralVm = new Vue({
    el :'#integral',
    data : {
        userNo : user.getuserNo(),
        integraltodos : [],
        type : '1',
        mileage : {},
        pageNo : 1,
        pageSize : 8
    },
    methods : {
        integralInit : function () {
            var data = {
                userNo : integralVm.userNo,
                pageNo : integralVm.pageNo,
                pageSize : integralVm.pageSize
            };
            postAjax(ApiUrl.queryMemberUserIntegralDtoByUserNo,data,function (ret,err) {
                if(ret){
                    if(ret.data){
                        for(var i=0;i<ret.data.length;i++){
                            integralVm.integraltodos.push(ret.data[i]);
                        }
                    }
                }
            },{progress:'1'})
        },
        mileageInit : function () {
            var data = {userNo : user.getuserNo()};
            postAjax(ApiUrl.queryShopMemberICartInfoDtoByData,data,function (ret,err) {
                if(ret){
                    if(ret.data){
                        integralVm.mileage = ret.data;
                        var totalIntegral = $('.myjf_con_number').html();
                        var getCal = $('.getCal').html();
                        var totalCal = $('.totalCal').html();
                        var totalMileage = ret.data.totalMileage?ret.data.totalMileage : 0;
                        var totalCalorie = ret.data.totalCalorie?ret.data.totalCalorie : 0;
                        var getIntegral = ret.data.totalIntegral?ret.data.totalIntegral : 0;
                        var userInfo = user.getuserinfo();
                        var headPortrait = userInfo.headPortrait;
                    }
                    // 监听分享
                    api.addEventListener({
                        name : 'shares'
                    },function (ret,err) {
                        if(ret){
                            var option = {
                                title: '快来加入亿猫智慧购吧',
                                description: '健康购物,让我们一起消耗卡路里',
                                imgUrl: headPortrait,
                                url: 'http://www.ieemoo.com/admin/remote/buysLists/html/integral.html?totalIntegral=' + totalIntegral + '&&' + 'totalMileage=' + totalMileage + '&&' + 'totalCalorie=' + totalCalorie + '&&' + 'getIntegral=' + getIntegral + '&&' + 'getCal=' + getCal + '&&' + 'totalCal=' + totalCal
                            }
                            // alert(totalIntegral + '  ' + totalMileage + '  ' + totalCal + '  ' + totalCalorie + '   ' + getIntegral + '  ' + getCal);
                            dialog.share(option);
                        }
                    })
                }
            },{progress:'1'})
        },
        clickintegral : function () {
            integralVm.type = '1';
        },
        clickmileage : function () {
            integralVm.type = '2';
        }
    }
})