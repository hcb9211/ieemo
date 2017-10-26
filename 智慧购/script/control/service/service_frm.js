apiready = function () {

} // apiready

var winW = $(window).width();
var winH= $(window).height();

$('.erweima').click(function () {
    $('.qrCodeMask').css({
        width:winW,
        height:winH,
        position:'absolute',
        left:0,top:0,
        right:0,bottom:0,
        margin:'auto',
        background:'rgba(0,0,0,0.3)',
        opacity:1
    });
})
$('.qrCodeMask').click(function () {
    $(this).css({
        height:0,
        opacity:0
    });
    $('.downImgBox').css({
        opacity:0
    })
})
touch.on('.imgQrCode','hold',function () {
    $('.downImgBox').css({
        opacity:1,
        height:'5rem'
    })
});
$('.cannelImg').click(function () {
    $('.downImgBox').css({
        opacity:0,
        height:0
    })
});
//  点击图片保存
$('.saveImg').click(function () {
    api.saveMediaToAlbum({
        path: "widget://image/setting/weixinGZH.png"  //  https://blob00.blob.core.chinacloudapi.cn/ieemoo-blob/product/ieemoo.png
    }, function(ret, err) {
        if (ret && ret.status) {
            toasts('保存成功','bottom');
        } else {
            alert('保存失败');
        }
    });
})
//  2秒后自动消失的提示 （*）
function toasts(text,location){
    api.toast({
        msg : text,
        location : location,
        duration : 2000
    });
};
//  打开一个窗口（*）
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
};
// 点击进入联系客服
function enterserviceOnline() {
    var data = {
        url: {
            url: api.wgtRootDir + '/html/service/serviceOnline_frm.html',
            name: 'serviceOnline_frm',
            title: "联系客服"
        },
        islogin: '0',
        info: {}
    }
    openWinFrame('forgetPassword',api.wgtRootDir + '/html/comm/head_back.html',data);
};