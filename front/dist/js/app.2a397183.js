(function(t){function e(e){for(var a,s,o=e[0],c=e[1],u=e[2],l=0,f=[];l<o.length;l++)s=o[l],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&f.push(r[s][0]),r[s]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);d&&d(e);while(f.length)f.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],a=!0,o=1;o<n.length;o++){var c=n[o];0!==r[c]&&(a=!1)}a&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var a={},r={app:0},i=[];function s(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=a,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(n,a,function(e){return t[e]}.bind(null,a));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var d=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"1ddd":function(t,e,n){},"33e8":function(t,e,n){"use strict";var a=n("46d4"),r=n.n(a);r.a},"46d4":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("a026"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},i=[],s=n("2877"),o={},c=Object(s["a"])(o,r,i,!1,null,null,null),u=c.exports,d=n("5c96"),l=n.n(d),f=n("b970"),h=(n("157a"),n("8c4f")),p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"luckydraw"},[n("el-row",[n("h2",{staticClass:"title"},[t._v("2019年瓶子科技年会抽奖")])]),n("el-row",[n("el-col",{staticClass:"luckydraw-participant",attrs:{span:6}},[n("h4",{staticClass:"luckydraw-participant__title"},[t._v("抽奖参与者("+t._s(t.participantList.length)+"人)")]),n("lucky-image-grid",{staticClass:"luckydraw-participant__wrapper",attrs:{images:t.participantList}})],1),n("el-col",{attrs:{span:12}},[n("div",{staticClass:"luckydraw-main"},[n("el-button",{staticClass:"luckydraw-main__button",attrs:{size:"large",round:!0,type:t.running?"danger":"primary"},on:{click:t.onButtonClick}},[t._v(t._s(t.running?"产生幸运儿...":"开始抽奖"))]),n("div",{staticClass:"luckydraw-main__image"},[n("h3",{directives:[{name:"show",rawName:"v-show",value:t.randomIndex>-1,expression:"randomIndex > -1"}]},[t._v(t._s(t.participantList[t.randomIndex]&&t.participantList[t.randomIndex].name))]),n("div",{staticClass:"luckydraw-main__image-viewport"},[t._l(t.participantList,(function(e,a){return n("div",{key:a,staticClass:"img-bg",style:{backgroundImage:"url("+e.src+")",zIndex:a===t.randomIndex?"1":"0"}})})),n("div",{staticClass:"img-bg img-bg__cover"})],2)])],1)]),n("el-col",{attrs:{span:6}},[n("div",{staticClass:"luckydraw-forbidden"},[n("h4",{staticClass:"luckydraw-forbidden__title"},[t._v("禁止参与("+t._s(t.forbiddenList.length)+"人)")]),n("lucky-image-grid",{staticClass:"luckydraw-forbidden__wrapper",attrs:{images:t.forbiddenList}})],1)])],1),n("div",{staticClass:"lucky-register-container"},[n("lucky-register-qrcode",{attrs:{text:t.QrCodeText}})],1)],1)},g=[],m=(n("99af"),n("d81d"),n("a434"),n("a9e3"),n("25eb"),n("d3b7"),n("25f0"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"lucky-image-grid"},[n("div",{staticClass:"grid"},t._l(t.images,(function(e,a){return n("div",{key:a,staticClass:"grid-item"},[n("div",{staticClass:"grid-item__img",style:{backgroundImage:"url("+e.src+")"}}),n("div",{staticClass:"grid-item__container"},[n("h2",[t._v(t._s(e.name))])])])})),0)])}),v=[],w={name:"LuckyImageGrid",props:{images:{type:Array,default:function(){return[]}}},data:function(){return{}}},b=w,y=(n("cf47"),Object(s["a"])(b,m,v,!1,null,"2f3010f4",null)),_=y.exports,k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"lucky-register"},[n("img",{attrs:{src:t.qrcodeBase64Data}})])},x=[],C=n("d055"),I=n.n(C);function j(t){return I.a.toDataURL(t,{type:"svg",margin:0,version:6,errorCorrectionLevel:"H",color:{dark:"#000",light:"#FFFFFF"}})}var O={name:"LuckyRegisterQrcode",props:{text:String},data:function(){return{qrcodeBase64Data:""}},created:function(){var t=this;return j(this.text).then((function(e){t.qrcodeBase64Data=e}))}},S=O,L=(n("33e8"),Object(s["a"])(S,k,x,!1,null,"66c7cc76",null)),M=L.exports,N=n("d4ec"),P=n("bee2"),R=n("bc3a"),D=n.n(R),U=D.a.create({timeout:5e3,withCredentials:!0});function T(){}U.interceptors.response.use((function(t){return t}),(function(t){return Promise.reject(t)})),T.prototype.get=function(t,e){var n=e||{};return new Promise((function(e,a){return U.get(t,{params:n}).then((function(t){e(t.data)})).catch((function(t){a(t)}))}))},T.prototype.post=function(t,e,n){var a=e||{};return new Promise((function(e,r){U.post(t,a,n).then((function(t){e(t.data)})).catch((function(t){r(t)}))}))};var E=new T;function $(t){return"/api/"+t}function q(t){return window.WebSocket?new window.WebSocket(t):window.MozWebSocket?new window.MozWebSocket(t):null}var B=function(){function t(){Object(N["a"])(this,t)}return Object(P["a"])(t,null,[{key:"register",value:function(t,e,n){var a=$("register");return E.post(a,{avatar:e,name:t,session:n})}},{key:"syncUser",value:function(t,e,n,a){var r=window.location.host,i="ws://"+r+"/syncUser?session="+t;console.log("url: ",i);var s=q(i);if(null===s)throw Error("Browser dont support websocket");s.onopen=function(t){"function"===typeof e&&e(t)},s.onmessage=function(t){"function"===typeof n&&n(t)},s.onclose=function(t){"function"===typeof a&&a(t)}}}]),t}(),F=B,z={components:{LuckyImageGrid:_,LuckyRegisterQrcode:M},data:function(){return{participantList:[],forbiddenList:[],running:!1,randomIndex:-1,session:""}},computed:{QrCodeText:function(){var t=function(t){return!("NaN"===Number.parseInt(t).toString())},e=this.$route.query.interval||"",n=window.location.protocol,a=window.location.host,r="".concat(n,"//").concat(a,"/register?session=").concat(this.session);return e&&t(e)&&(r="".concat(r,"&interval=").concat(e)),r}},created:function(){this.session=this.$route.query.session||Date.now()},mounted:function(){var t=this;F.syncUser(this.session,(function(t){console.log("onConnection")}),(function(e){var n=JSON.parse(e.data);console.log("data: ",n),"AllUsers"===n.action&&(t.participantList=n.data.map((function(t){return{session:t.session,name:t.user,src:t.avatar}}))),"NewUser"===n.action&&t.participantList.splice(0,0,{session:n.data.session,name:n.data.user,src:n.data.avatar})}),(function(t){console.log("onClosed")}))},methods:{onButtonClick:function(){var t=this;this.running?(clearInterval(this.intervalHolder),setTimeout((function(){t.showResult()}),0)):this.startDraw(),this.running=!this.running},showResult:function(){},startDraw:function(){var t=this;requestAnimationFrame((function(e){t.running&&(t.randomIndex=t.generateRandomIndex(),console.log("randomIndex: ",t.randomIndex),t.startDraw())}))},generateRandomIndex:function(){var t=Math.max(1,this.participantList.length),e=Math.round(Math.random()*Math.pow(10,(""+t).length));return e%t}}},J=z,A=(n("c51b"),Object(s["a"])(J,p,g,!1,null,"40c5f323",null)),H=A.exports,Q=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"register"},[n("p",{staticClass:"title"},[t._v("瓶子科技2019年会抽奖")]),n("van-row",{attrs:{type:"flex",justify:"center"}},[n("van-col",{attrs:{span:8}},[n("van-uploader",{attrs:{"after-read":t.afterRead}},[n("van-button",{staticClass:"upload-face-button",attrs:{plain:"",type:"primary"}},[t._v("上传人脸")])],1)],1)],1),n("van-image",{staticStyle:{"margin-top":"1rem",overflow:"hidden"},attrs:{src:t.avatar,width:"8rem",height:"8rem",round:"",fit:"cover"}}),n("van-row",{staticClass:"form"},[n("van-field",{attrs:{label:"用户名:",placeholder:"请输入姓名"},model:{value:t.userName,callback:function(e){t.userName=e},expression:"userName"}})],1),n("van-row",{staticClass:"submit-button",attrs:{type:"flex",justify:"center"}},[n("van-col",{attrs:{span:"20"}},[n("van-button",{attrs:{type:"primary",size:"large"},on:{click:t.register}},[t._v("参与抽奖")])],1)],1),n("van-loading",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"toast-loading",attrs:{size:"24px"}},[t._v("请求中")])],1)},W=[],G=(n("a15b"),n("498a"),n("f564")),K=(n("3ca3"),n("ddb0"),n("2b3d"),n("6f45"));function V(t){return new Promise((function(e,n){var a=new Image;a.src=window.URL.createObjectURL(t),a.onload=function(){K["getData"](a,(function(){var t=K["getTag"](this,"Orientation"),n=document.createElement("canvas"),r=n.getContext("2d");switch(t){case 3:n.width=a.width,n.height=a.height,r.rotate(180*Math.PI/180),r.drawImage(a,-a.width,-a.height,a.width,a.height);break;case 6:n.width=a.height,n.height=a.width,r.rotate(90*Math.PI/180),r.drawImage(a,0,-a.height,a.width,a.height);break;case 8:n.width=a.height,n.height=a.width,r.rotate(-90*Math.PI/180),r.drawImage(a,-a.width,0,a.width,a.height);break;default:n.width=a.width,n.height=a.height,r.drawImage(a,0,0,a.width,a.height);break}n.toBlob((function(t){if(/\/(?:jpeg|png|jpg|gif)/i.test(t.type)&&t.size>1e6){var a=document.createElement("canvas"),r=a.getContext("2d"),i=new Image;return i.src=URL.createObjectURL(t),void(i.onload=function(){var t=i.height/i.width;a.width=800,a.height=800*t,r.drawImage(i,0,0,a.width,a.height),a.toBlob((function(t){e({content:a.toDataURL("image/jpeg",.92),file:t})}))})}e({content:n.toDataURL("image/jpeg",.92),file:t})}),"image/jpeg",.92)}))}}))}function X(t,e){return new Promise((function(t){var n="https://storage.xgeeklab.com/presignedUrl",a=(new Date).getTime()+Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2);D.a.get(n,{params:{name:a}}).then((function(n){D.a.put(n.data.data.url,e).then((function(e){200===e.status?t({code:0,data:{visit_url:n.data.data.visit_url}}):t({code:-1,message:"error"})}))}))}))}var Y="key-session-history-of-luckdraw",Z=2880,tt={data:function(){return{userName:"",avatar:"",session:"",intervalMinutes:Z,loading:!1}},computed:{FormDisabled:function(){return!(this.userName&&this.avatar)}},created:function(){this.session=this.$route.query.session||"0",this.intervalMinutes=Number.parseInt(this.$route.query.interval||Z)},methods:{validateAndSaveSession:function(){var t=this.sessionHistory(),e=t[this.session],n={id:this.session,intervalMs:60*this.intervalMinutes*1e3,updateTimestamp:Date.now()};return!!this.preSessionExpired(e,n)&&(t[this.session]=n,localStorage.setItem(Y,JSON.stringify(t)),!0)},clearSession:function(){localStorage.removeItem(Y)},preSessionExpired:function(t,e){if(!t)return!0;var n=e.updateTimestamp-t.updateTimestamp;return n>t.intervalMs},sessionHistory:function(){var t=localStorage.getItem(Y)||"{}";return JSON.parse(t)},register:function(){var t=this;if(!this.userName||!this.avatar||!this.session){var e=[];return!this.userName.trim()&&e.push("姓名"),!this.avatar.trim()&&e.push("图像"),this.toast(e.join("、")+"必填","danger")}if(this.loading)return this.toast("已在请求中","danger");this.loading=!0,F.register(this.userName.trim(),this.avatar.trim(),this.session.trim()).then((function(e){t.loading=!1,0===e.code?t.toast("参加成功"):11e3===e.code?t.toast("此用户名已参加","warning"):t.toast(e.message||"参加失败，请稍后重试","warning")})).catch((function(e){t.toast(e||"网络或者服务器异常","danger"),t.loading=!1}))},afterRead:function(t){var e=this;V(t.file).then((function(t){X("img",t.file).then((function(t){0===t.code&&(e.avatar=t.data.visit_url)}))}))},toast:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"success";Object(G["a"])({type:e,message:t})}}},et=tt,nt=(n("d4bb"),Object(s["a"])(et,Q,W,!1,null,"b2271dea",null)),at=nt.exports;a["default"].use(h["a"]);var rt=new h["a"]({mode:"history",base:"/",routes:[{path:"/",name:"index",alias:"/index",component:H},{path:"/register",name:"register",component:at}]});a["default"].config.productionTip=!1,a["default"].use(l.a),a["default"].use(f["a"]),new a["default"]({router:rt,render:function(t){return t(u)}}).$mount("#app")},"7ba1":function(t,e,n){},"86ae":function(t,e,n){},c51b:function(t,e,n){"use strict";var a=n("1ddd"),r=n.n(a);r.a},cf47:function(t,e,n){"use strict";var a=n("7ba1"),r=n.n(a);r.a},d4bb:function(t,e,n){"use strict";var a=n("86ae"),r=n.n(a);r.a}});
//# sourceMappingURL=app.2a397183.js.map