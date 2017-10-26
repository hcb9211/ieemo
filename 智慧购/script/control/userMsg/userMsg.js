var userMsg = new Vue({
    el : '#app',
    data : {
        userNo : '',
        userMsgTodo : {},
        headPortrait: ''
    },
    methods : {
        userMsgInit: function () {
            var data = {
                userNo: userMsg.userNo
            };
            postAjax(ApiUrl.queryMemberUserInfoDataByUserNo, data, function (ret, err) {
                if (ret) {
                    if(ret.data){
                        userMsg.userMsgTodo = ret.data;
                    }
                }
            })
        }
    }
})
 var FNImageClip;

apiready = function () {
    //加载裁切组件
     FNImageClip = api.require('FNImageClip');

        userMsg.userNo = user.getuserNo();
        userMsg.userMsgInit();

    $('.nicknameBox').click(function () {
        var nickname = $('.nickname').text();
        openWin('../userMsg/nickname',nickname);
    })
    // 监听获取的昵称
    api.addEventListener({
        name : 'updateNickName'
    },function (ret,err) {
        if(ret){
            var nickname = ret.value.nickname;
            $('.nickname').text(nickname);
        }
    });
    $('.qianmingBox').click(function () {
        var qianming = $('.qianming').text();
        openWin('../userMsg/qianming',qianming);
    })
    //  监听获取的签名
    api.addEventListener({
        name : 'qianming'
    },function (ret,err) {
        if(ret){
            var qianming = ret.value.qianming;
            $('.qianming').text(qianming);
        }
    });
    $('.nameBox').click(function () {
        var name = $('.name').text();
        openWin('../userMsg/name',name);
    })
    //  监听获取的名字
    api.addEventListener({
        name : 'name'
    },function (ret,err) {
        if(ret){
            var name = ret.value.name;
            $('.name').text(name);
        }
    });

    $('.weightBox').click(function () {
        var weight = $('.weight').text();
        openWin('../userMsg/weight',weight);
    })
    //  监听获取的体重
    api.addEventListener({
        name : 'weight'
    },function (ret,err) {
        if(ret){
            var weight = ret.value.weight;
            $('.weight').text(weight);
        }
    });
}

//      头像
function getPicture() {
    api.confirm({
        title : '提示',
        msg : '您想要从哪里选取图片？',
        buttons : ['优雅自拍', '相册收藏' , '取消'],
    },function (ret,err) {
        if(3 == ret.buttonIndex){  //  用户取消
            return;
        }
        var sourceType = 'album';
        if(1 == ret.buttonIndex){  //  打开相机
            sourceType = 'camera';
        }
        api.getPicture({
            sourceType : sourceType,
            encodingType : 'jpg',
            mediaValue : 'pic',
            quality : 50,
            // targetWidth : 100,
            // targetHeight : 100
        },function (ret,err) {
            if(ret && ret.data){
                $("#maindiv").hide();
                $("#headupdate").show();

                var pictureMsg = ret.data;
                // var FNImageClip = api.require('FNImageClip');
                FNImageClip.open({
                    rect: {
                        x: 0,
                        y: 0,
                        w: api.winWidth,
                        h: api.winHeight*0.6
                    },
                    srcPath: pictureMsg,
                    style: {
                        mask: 'rgba(55,55,55,0.3)',
                        clip: {
                            w: 140,
                            h: 140,
                            x: (api.winWidth-140)/2,
                            y: (api.winHeight*0.6 -140)/2,
                            borderColor: '#0f0', 
                            borderWidth: 1,
                            appearance: 'rectangle'
                        }
                    },
                    fixedOn: api.frameName
                }, function(ret, err) {
                    if (!ret) {
                        toast('裁剪错误');
                        return false;
                    }
                });
                
            }
        });
    });
}
//确认
function updateheadsure(){
    // var FNImageClip = api.require('FNImageClip');
    var savepath = 'fs://res/yimaoupdatehead' +Date.parse(new Date()) +'.png';
    FNImageClip.save({
        destPath: savepath,
        copyToAlbum: false,
        quality: 0.5
    },function(ret, err){
        // alert(JSON.stringify(ret))        
        if(ret) {
           var pictureMsg = ret.destPath;
           var images = new Image();
            images.src = pictureMsg;

            images.onload = function(){
                var base64 = getBase64Image(images);
                base64 = base64.substring(22);
                if(pictureMsg != ''){
                    var userNo = user.getuserNo();
                    var data = {
                        type : 3,
                        uploadFile : base64,
                        userNo : userNo
                    }
                    postAjax(ApiUrl.uploadFile,data,function (ret,err) {
                        if(ret){
                            var imgUrl = ret.data.absoluteUrl;
                            $(".myImg").attr('src',imgUrl);
                            
                            //关闭裁切
                            FNImageClip.close();
                            var fs = api.require('fs');
                            fs.removeSync({
                                path: pictureMsg
                            });
                            $("#maindiv").show();
                            $("#headupdate").hide();
                        }
                    })
                }
            }  // image
            // alert(JSON.stringify(ret));
        } else{
            toast('裁剪错误');
            return false;
        }
    });
}
// 取消
function updateheadback(){
    // var FNImageClip = api.require('FNImageClip');
    FNImageClip.close();
    $("#maindiv").show();
    $("#headupdate").hide();
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL("image/"+ext);
    return dataURL;
}

function getSex(){
    var data = [{val:"0",name:"男"},{val:"1",name:"女"}]
    select(data,function(ret){
        // alert(JSON.stringify(ret[0].name));
        var sexName = ret[0].name;
        $('.sex').text(sexName);
    })
}

//  点击修改完成
function updateOk() {
    var headPortrait = $('.myImg').attr('src');
    var nickname = $('.nickname').text();
    var phone = $('.phone').text();
    var name = $('.name').text();
    var sex = $('.sex').text();
    if(sex == '男'){
        sex = '0';
    }else{
        sex = '1';
    }
    var weight = $('.weight').text();
    var communityName = $('.communityName').text();
    var signAture = $('.signAture').text();
    var userNo = user.getuserNo();
    var data = {
            memberUserInfoDto : {
                communityName : communityName,
                nickName : nickname,
                name  : name,
                signAture : signAture,
                mobile : phone,
                weight: weight,
                gender : sex,
                headPortrait : headPortrait,
                userNo : userNo,
            }
    }
    postAjax(ApiUrl.saveMemberUserInfo,data,function (ret,err) {
        if(ret){
            if(ret.retCode == 0){
                toast('修改成功','bottom');
                api.sendEvent({
                    name : 'headPortrait',
                    extra : {
                        headPortrait : headPortrait,
                        nickname : nickname
                    }
                });

                var userinfo = user.getuserinfo();
                var isguest = user.getuserinfo().isGuest;
                var referralCode = user.getuserinfo().referralCode;
                userinfo.nickName = nickname;
                userinfo.headPortrait = headPortrait;
                userinfo.isGuest = isguest;
                userinfo.referralCode = referralCode;
                user.setuserinfo(userinfo);

            }
        }
    })
}