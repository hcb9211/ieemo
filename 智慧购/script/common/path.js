//dv:开发
//pre:测试
//prd:生产

var filepath = {
	comm:{
		headback:{
			win:"/html/comm/head_back.html"
		}
	},
	index:{
		fr:"",
		win:""
	},
	usercenter:{
		index:{
			fr:""
		},

	},
	lifecircle:{
		experience:{
			add:{
				win: "/html/lifecircle/experience/experience/add/addexperiece_win",
				frm: "/html/lifecircle/experience/experience/add/addexperiece_frm"
			},
			comment:{
				frm:"/html/lifecircle/experience/comment/experiececomment_frm.html"
			},
			addtext:{
				win:"/html/lifecircle/experience/add/addtext_win.html",
				frm: "/html/lifecircle/experience/add/addtext.html"
			}
		},
		question:{
			answer:{
				frm:"/html/lifecircle/question/answer/answer_frm.html"
			},//回答
			answerlist:{
				frm:"/html/lifecircle/question/answer/answerlist_frm.html"
			},
			answerinfo:{
				frm:"/html/lifecircle/question/answer/answerinfo_frm.html"
			},
			answercomment:{
				frm:"/html/lifecircle/question/answer/answercomment_frm.html"
			}
		},
		index:{
			win:"",
			frm:""
		}
	},
	login:{
		head:"",
		frm:"/html/login/login.html"
	},
	getPath:function(url){
		return api.wgtRootDir + url;
	}
}




var _FileUploadServerUrl = "http://www.ieemoo.com:8085/emall-mobile/file/uploadEmcFile.do";

var _imagpath = "https://blob00.blob.core.chinacloudapi.cn/ieemoo-blob/";