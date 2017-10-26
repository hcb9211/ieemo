apiready = function () {
      var height = 0;
    var header =$("div[name=header]")[0];


    if (api.systemType == "ios") {
        height = 20;
        
    } else {
         height = 25;
    }
    $(".top_nof").css({
        height: $(".top_nof").height() + height
    });
    $api.fixStatusBar(header);

    var mine_xx_ewm=document.getElementsByClassName("mine_xx_ewm")[0];
    mine_xx_ewm.style.height=mine_xx_ewm.offsetWidth+"px";
    $(window).resize(function(){
        var mine_xx_ewm=document.getElementsByClassName("mine_xx_ewm")[0];
    mine_xx_ewm.style.height=mine_xx_ewm.offsetWidth+"px";
    })


    var userinfo = user.getuserinfo();
    var userNo = user.getuserNo();
    var headportrait = userinfo.headPortrait;
    var nickname = userinfo.nickName;
    $('.headportrait').attr('src',headportrait);
    $('.nickname').text(nickname);
    var recode = {
        type:"myqrcode",
        value:{
            userNo: userNo,
            headportrait : headportrait,
            nickname : nickname
        }
    }
    var reg=/^[\u0391-\uFFE5]+$/;

    var recodeJSON = JSON.stringify(recode);
    if(recodeJSON!=""&&!reg.test(recodeJSON)){ 
        $("#code").qrcode({
            render: "canvas", //table方式
            width: 188, //宽度
            height:188, //高度
            text: utf16to8(recodeJSON),//任意内容
            typeNumber  : -1,      //计算模式    
            correctLevel    : 0,//纠错等级    
            background      : "#ffffff",//背景颜色    
            foreground      : "#000000" //前景颜色  
        });
    }else{
        
        $("#code").qrcode({
            render: "canvas", //table方式
            width: 188, //宽度
            height:188, //高度
            text:  utf16to8(recodeJSON),//任意内容,
            typeNumber  : -1,      //计算模式    
            correctLevel: 0,//纠错等级    
            background: "#ffffff",//背景颜色    
            foreground : "#000000" //前景颜色
        });
    }

       var mycanvas1=document.getElementsByTagName('canvas')[0];

        //将转换后的img标签插入到html中
        var img = convertCanvasToImage(mycanvas1);
    
        $("#qrimg").attr("src",img.src)
}

function utf16to8(str) {  
        var out, i, len, c;  
        out = "";  
        len = str.length;  
        for(i = 0; i < len; i++) {  
        c = str.charCodeAt(i);  
        if ((c >= 0x0001) && (c <= 0x007F)) {  
            out += str.charAt(i);  
        } else if (c > 0x07FF) {  
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));  
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));  
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));  
        } else {  
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));  
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));  
        }  
        }  
        return out;  
    }


 function convertCanvasToImage(canvas){
     //新Image对象,可以理解为DOM;
     var image = new Image();
     //canvas.toDataURL返回的是一串Base64编码的URL
     image.src = canvas.toDataURL("image/png");
     return image;
}