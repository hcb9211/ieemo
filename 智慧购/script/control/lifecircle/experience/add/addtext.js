apiready = function(){
   var vm = new Vue({
	el: "#info",
	data:{
		bean:{
			delFlag:"1",//0为草稿 1位发布
			answContent:""
		}
	},
	methods:{
		save:function(){
			var _self = this;
			var info = api.pageParam.info;

			if($.trim(_self.bean.answContent) == "" ){
				alert("内容不能为空")
				return false;
			}
			// if(_self.bean.answContent > 200){
			// 	alert("内容不允许超过200个字");
			// 	return false;
			// }
			
			var index = api.pageParam.index;
			api.sendEvent({
			    name: 'addexpericetext',
			    extra: {
			        content: $.trim(_self.bean.answContent),
			        index:index
			    }
			});

			closeWin();
		}
	}
})
    var content = api.pageParam.content;
    vm.bean.answContent = content;

    vm.$nextTick(function(){
    	$("#answContent").TextAreaExpander(400);
    });

	// $("#answContent").TextAreaExpander(400);

	//保存按钮监听
	api.addEventListener({
	    name: 'addtextsave'
	}, function(ret, err) {
	   vm.save();
	});
}
