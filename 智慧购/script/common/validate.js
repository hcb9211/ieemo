var validate = {
  validator:{
  	methods:{}
  },
  addMethod: function (name, method) {
            this.validator.methods[name] = method;
  },
  validate:function(options){
	var rules = options.rules;
			var message = options.messages;
            var dialog = new auiDialog({});
            if(rules){
            	for(var item in rules){
				  // console.dir(rules[item]);
				  var valobj = rules[item];

				  if(!$("#"+item).length){
				  	continue;
				  }
				  var val  = $("#"+item).val();

				  for(var method in valobj){
				  	var mothodval = valobj[method];
                     if(val != ""){
                     	if(this.validator.methods[method] && this.validator.methods[method](val,mothodval) == false){
                     		dialog.alert({
			                    title:"消息提醒",
			                    msg:message[item][method],
			                    buttons:['确定']
			                },function(ret){
		//	                    console.log(ret);
			                });
                     		return false;
                     	}
                     }
                     if("required" == method && mothodval){
                     	if("" == val){
                     		dialog.alert({
			                    title:"消息提醒",
			                    msg:message[item][method],
			                    buttons:['确定']
			                },function(ret){
		//	                    console.log(ret);
			                })
                     		return false;
                     	}
                     }
                     
				  }
				}
            }
			return true;
  },
  validateJSON:function(options,data){
  var rules = options.rules;
      var message = options.messages;
            // var dialog = new auiDialog({});
            if(rules){
              for(var item in rules){
                // console.dir(rules[item]);
                var valobj = rules[item];
                //由于vue绑定页面 页面对象输入值后才会在vue对象中加入相关参数
                // if(!data[item]){
                //   continue;

                // }
                // var val  = $("#"+item).val();
                var val  = data[item];


                for(var method in valobj){
                  var mothodval = valobj[method];
                           if(val != "" && "required" != method){
                            if(this.validator.methods[method] && this.validator.methods[method](val,mothodval) == false){
          //                     dialog.alert({
          //                       title:"消息提醒",
          //                       msg:message[item][method],
          //                       buttons:['确定']
          //                   },function(ret){
          // //                      console.log(ret);
          //                   });
                            toast(message[item][method]);
                              return false;
                            }
                           }
                           if("required" == method && mothodval){
                            if("" == val || undefined == val){
          //                     dialog.alert({
          //                       // title:"消息提醒",
          //                       msg:message[item][method],
          //                       buttons:['确定']
          //                   },function(ret){
          // //                      console.log(ret);
          //                   })
                             toast(message[item][method]);
                              return false;
                            }
                           }
                           
                }
              }
            }
      return true;
  }
}	

//校验手机号码
validate.addMethod("isMobile",function(value, param) {  
   var isMobile=/^(?:13\d|14\d|15\d|18\d|17\d)\d{5}(\d{3}|\*{3})$/; // ^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$
   return (isMobile.test(value));
});

validate.addMethod("maxlength",function(value, param) {  
   // var isMobile=/^(?:13\d|14\d|15\d|18\d|17\d)\d{5}(\d{3}|\*{3})$/; // ^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$
   return (value.length <= param);
});

validate.addMethod("isIDCard",function(value, param) {  
   // var isMobile=/^(?:13\d|14\d|15\d|18\d|17\d)\d{5}(\d{3}|\*{3})$/; // ^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$
    var isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
    var isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

    return isIDCard1.test(value) || isIDCard2.test(value);
});

validate.addMethod("busCode", function(value, param) {
  // var isMobile=/^(?:13\d|14\d|15\d|18\d|17\d)\d{5}(\d{3}|\*{3})$/; // ^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$
  var ret = false;
  if (busCode.length == 15) {
    var sum = 0;
    var s = [];
    var p = [];
    var a = [];
    var m = 10;
    p[0] = m;
    for (var i = 0; i < busCode.length; i++) {
      a[i] = parseInt(busCode.substring(i, i + 1), m);
      s[i] = (p[i] % (m + 1)) + a[i];
      if (0 == s[i] % m) {
        p[i + 1] = 10 * 2;
      } else {
        p[i + 1] = (s[i] % m) * 2;
      }
    }
    if (1 == (s[14] % m)) {
      //营业执照编号正确! 
      //alert("营业执照编号正确!"); 
      ret = true;
    } else {
      //营业执照编号错误! 
      ret = false;
      //alert("营业执照编号错误!"); 
    }
  } else if ("" == busCode) {
    ret = true;
  }
  return ret;
});