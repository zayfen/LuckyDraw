(function(t){function e(e){for(var i,s,o=e[0],c=e[1],l=e[2],d=0,h=[];d<o.length;d++)s=o[d],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&h.push(a[s][0]),a[s]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);u&&u(e);while(h.length)h.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],i=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(i=!1)}i&&(r.splice(e--,1),t=s(s.s=n[0]))}return t}var i={},a={app:0},r=[];function s(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=i,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(n,i,function(e){return t[e]}.bind(null,i));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0e43":function(t,e,n){},"334d":function(t,e,n){},"33e8":function(t,e,n){"use strict";var i=n("46d4"),a=n.n(i);a.a},"3c9f":function(t,e,n){"use strict";var i=n("334d"),a=n.n(i);a.a},"46d4":function(t,e,n){},"47ab":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("a026"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},r=[],s=n("2877"),o={},c=Object(s["a"])(o,a,r,!1,null,null,null),l=c.exports,u=n("5c96"),d=n.n(u),h=(n("0fae"),n("b970")),p=(n("157a"),n("8c4f")),f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"luckydraw"},[n("el-row",[n("h2",{staticClass:"title"},[t._v("2019年瓶子科技年会抽奖")])]),n("el-row",[n("el-col",{staticClass:"luckydraw-participant",attrs:{span:6}},[n("h4",{staticClass:"luckydraw-participant__title"},[t._v(" 参与抽奖("+t._s(t.validParticipantList.length)+"人) ")]),n("lucky-image-grid",{staticClass:"luckydraw-participant__wrapper",attrs:{data:t.validParticipantList}})],1),n("el-col",{attrs:{span:12}},[n("div",{staticClass:"luckydraw-main"},[t.context.state===t.context.S_START?n("el-button",{staticClass:"luckydraw-main__button luckydraw-main__start",attrs:{size:"large",round:!0,type:"primary"},on:{click:function(e){return t.onDrawButtonClick(t.context.S_START)}}},[t._v(" 开始抽奖 ")]):t._e(),t.context.state===t.context.S_DRAWING?n("el-button",{staticClass:"luckydraw-main__button luckydraw-main__drawing",attrs:{size:"large",round:!0,type:"primary"},on:{click:function(e){return t.onDrawButtonClick(t.context.S_DRAWING)}}},[t._v(" 停止 ")]):t._e(),t.context.state===t.context.S_CONFIRM?n("el-row",{staticClass:"luckydraw-main__confirm"},[n("el-col",{attrs:{span:12}},[n("el-button",{staticClass:"luckydraw-main__button luckydraw-main__confirm-yes",attrs:{round:!0,type:"primary"},on:{click:t.onConfirmYesButtonClick}},[t._v("抽奖有效")])],1),n("el-col",{attrs:{span:12}},[n("el-button",{staticClass:"luckydraw-main__button luckydraw-main__confirm-no",attrs:{type:"weak",round:!0},on:{click:t.toStartState}},[t._v("抽奖无效")])],1)],1):t._e(),n("el-input",{staticClass:"luckydraw-main__count-input",attrs:{placeholder:"抽奖个数",max:t.validParticipantList.length,min:0},on:{input:t.onCountInputChange},model:{value:t.context.numLuckyPeople,callback:function(e){t.$set(t.context,"numLuckyPeople",t._n(e))},expression:"context.numLuckyPeople"}}),n("div",{staticClass:"luckydraw-main__image"},[n("h3",{directives:[{name:"show",rawName:"v-show",value:t.context.randomIndex>-1,expression:"context.randomIndex > -1"}]},[t._v(" "+t._s(t.validParticipantList[t.context.randomIndex]&&t.validParticipantList[t.context.randomIndex].name)+" ")]),n("div",{staticClass:"luckydraw-main__image-viewport"},[t._l(t.validParticipantList,(function(e,i){return n("div",{key:i,staticClass:"img-bg",style:{backgroundImage:"url("+e.src+")",zIndex:i===t.context.randomIndex?"1":"0"}})})),n("div",{staticClass:"img-bg img-bg__cover"})],2)]),n("lucky-image-grid",{staticClass:"luckydraw-main__luckypeople",attrs:{images:t.context.luckyPeople,align:"left",size:"small",showname:!0}})],1)]),n("el-col",{attrs:{span:6}},[n("div",{staticClass:"luckydraw-forbidden"},[n("h4",{staticClass:"luckydraw-forbidden__title"},[t._v("中奖("+t._s(t.forbiddenParticipantList.length)+"人)")]),n("lucky-image-grid",{staticClass:"luckydraw-forbidden__wrapper",attrs:{data:t.forbiddenParticipantList}})],1)])],1),n("div",{staticClass:"lucky-register-container"},[n("lucky-register-qrcode",{attrs:{text:t.QrCodeText}})],1),n("div",{staticClass:"lucky-checkin"},[n("div",{staticClass:"lucky-checkin__indicator"},[n("el-button",{staticClass:"lucky-checkin__indicator-button",attrs:{size:"small",icon:"el-icon-location"},on:{click:t.toggleWhiteList}},[t._v("签到")])],1),n("lucky-white-list",{style:{transform:t.whiteListVisible?"translateY(35px)":"translateY(130%)"},attrs:{list:t.participantNameList,session:t.session},on:{changed:t.onWhiteListChanged}})],1)],1)},m=[],g=(n("99af"),n("4de4"),n("a630"),n("c975"),n("d81d"),n("a434"),n("b0c0"),n("a9e3"),n("25eb"),n("d3b7"),n("25f0"),n("3ca3"),n("498a"),n("159b"),n("2909")),v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"lucky-image-grid"},[n("div",{staticClass:"grid",class:[{left:"grid-left",center:"grid-center",right:"grid-right"}[t.align]||"center"]},t._l(t.data,(function(e,i){return n("div",{key:i,staticClass:"grid-item",class:[{small:"grid-item__small",normal:"grid-item__normal",large:"grid-item__large"}[t.size]||"normal",t.showname?"grid-item__showname":""]},[n("div",{staticClass:"grid-item__img",style:{backgroundImage:"url("+e.src+")"}}),n("div",{staticClass:"grid-item__container"},[n("h2",[t._v(t._s(e.name))])])])})),0)])},y=[],w={name:"LuckyImageGrid",props:{data:{type:Array,default:function(){return[]}},align:{type:String,default:"center",validator:function(t){return["left","center","right"].indexOf(t)>-1}},size:{type:String,default:"normal",validator:function(t){return["normal","small","large"].indexOf(t)>-1}},showname:{type:Boolean,default:!1}},data:function(){return{}}},b=w,k=(n("e373"),Object(s["a"])(b,v,y,!1,null,"ea66413a",null)),_=k.exports,x=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"lucky-register"},[n("img",{attrs:{src:t.qrcodeBase64Data}})])},L=[],S=n("d055"),C=n.n(S);function P(t){return C.a.toDataURL(t,{type:"svg",margin:0,version:6,errorCorrectionLevel:"H",color:{dark:"#000",light:"#FFFFFF"}})}var I={name:"LuckyRegisterQrcode",props:{text:String},data:function(){return{qrcodeBase64Data:""}},created:function(){var t=this;return P(this.text).then((function(e){t.qrcodeBase64Data=e}))}},O=I,N=(n("33e8"),Object(s["a"])(O,x,L,!1,null,"66c7cc76",null)),D=N.exports,j=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"lucky-white-list"},[n("el-card",{attrs:{shadow:"always"}},[n("h5",{staticStyle:{padding:"0",margin:"0",color:"#990008"}},[t._v(" 签到表("+t._s(t.tableData.filter((function(e){return t.list.indexOf(e.name.trim())>-1})).length)+"/"+t._s(t.tableData.filter((function(t){return t.name.trim()})).length)+") ")]),n("el-table",{staticClass:"lucky-white-list__table",staticStyle:{width:"100%"},attrs:{data:t.tableData,"empty-text":"签到表为空"}},[n("el-table-column",{attrs:{prop:"name",label:"姓名",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.editable?n("el-input",{attrs:{autofucus:"true",placeholder:"请输入姓名"},model:{value:e.row.name,callback:function(n){t.$set(e.row,"name",n)},expression:"scope.row.name"}}):n("span",{staticClass:"user-name",on:{dblclick:function(t){e.row.editable=!0}}},[t._v(t._s(e.row.name))])]}}])}),n("el-table-column",{attrs:{prop:"status",label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.list.indexOf(e.row.name.trim())>-1?n("i",{staticClass:"el-icon-circle-check",attrs:{color:"green"}}):n("i",{staticClass:"el-icon-circle-close"}),n("span",[t._v(t._s(t.list.indexOf(e.row.name.trim())>-1?"已签到":"未签到"))])]}}])}),n("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){return t.edit(e.$index,e.row)}}},[t._v(t._s(e.row.editable?"确定":"修改"))]),n("el-button",{attrs:{size:"mini",type:"weak"},on:{click:function(n){return t.deleteRow(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),n("el-button",{attrs:{type:"primary",icon:"el-icon-circle-plus-outline"},on:{click:t.addWhiteItem}},[t._v("添加")])],1)],1)},W=[],M={name:"LuckyWhiteList",props:{session:{type:String,required:!0},list:{type:Array,default:function(){return[]}}},data:function(){return{tableData:[]}},watch:{tableData:function(t,e){this.notifyWhiteListChange()}},created:function(){this.loadWhiteListFromLocal()},methods:{addWhiteItem:function(){this.tableData.push({name:"",editable:!0})},notifyWhiteListChange:function(){this.$emit("changed",this.tableData)},edit:function(t,e){e.editable=!e.editable,e.editable||(this.notifyWhiteListChange(),this.saveLocal())},deleteRow:function(t){this.tableData.splice(t,1),this.saveLocal()},saveLocal:function(){var t="lucky-white-list-".concat(this.session),e=[];this.tableData.forEach((function(t){return e.push(t.name)})),localStorage.setItem(t,JSON.stringify(e))},loadWhiteListFromLocal:function(){var t=this,e="lucky-white-list-".concat(this.session),n=JSON.parse(localStorage.getItem(e)||JSON.stringify([]));n.forEach((function(e){t.tableData.push({name:e,editable:!1})}))}}},R=M,T=(n("cdae"),n("3c9f"),Object(s["a"])(R,j,W,!1,null,"559375b7",null)),E=T.exports,z=n("d4ec"),A=n("bee2"),$=n("bc3a"),F=n.n($),U=F.a.create({timeout:5e3,withCredentials:!0});function B(){}U.interceptors.response.use((function(t){return t}),(function(t){return Promise.reject(t)})),B.prototype.get=function(t,e){var n=e||{};return new Promise((function(e,i){return U.get(t,{params:n}).then((function(t){e(t.data)})).catch((function(t){i(t)}))}))},B.prototype.post=function(t,e,n){var i=e||{};return new Promise((function(e,a){U.post(t,i,n).then((function(t){e(t.data)})).catch((function(t){a(t)}))}))};var q=new B;function J(t){return"/api/"+t}function G(t){return window.WebSocket?new window.WebSocket(t):window.MozWebSocket?new window.MozWebSocket(t):null}var V=function(){function t(){Object(z["a"])(this,t)}return Object(A["a"])(t,null,[{key:"register",value:function(t,e,n){var i=J("register");return q.post(i,{avatar:e,name:t,session:n})}},{key:"syncUser",value:function(t,e,n,i){var a=window.location.host,r="ws://"+a+"/syncUser?session="+t;console.log("url: ",r);var s=G(r);if(null===s)throw Error("Browser dont support websocket");s.onopen=function(t){"function"===typeof e&&e(t)},s.onmessage=function(t){"function"===typeof n&&n(t)},s.onclose=function(t){"function"===typeof i&&i(t)}}}]),t}(),Q=V,Y={components:{LuckyImageGrid:_,LuckyRegisterQrcode:D,LuckyWhiteList:E},data:function(){return{participantList:[{name:"张云峰",src:"https://res.cloudinary.com/zayfen/image/upload/v1576564059/img/mbzfmu8fbbtt9vtfsrrk.jpg"},{name:"张三",src:"https://res.cloudinary.com/zayfen/image/upload/v1576564059/img/ch1mmihskxrt3wia7v6j.jpg"}],session:"",whiteListVisible:!1,whiteList:["张云峰","张三"],context:{S_START:"start",S_DRAWING:"drawing",S_CONFIRM:"confirm",numLuckyPeople:1,state:"start",randomIndex:-1,luckyPeople:[],proposalLuckyPeopleIndexes:[]},computedUpdateTrigger:0}},computed:{QrCodeText:function(){var t=function(t){return!("NaN"===Number.parseInt(t).toString())},e=this.$route.query.interval||"",n=window.location.protocol,i=window.location.host,a="".concat(n,"//").concat(i,"/register?session=").concat(this.session);return e&&t(e)&&(a="".concat(a,"&interval=").concat(e)),a},validParticipantList:function(){return this.checkedParticipantList.filter((function(t){return!t.forbidden}))},forbiddenParticipantList:function(){return this.checkedParticipantList.filter((function(t){return t.forbidden}))},checkedParticipantList:function(){var t=this;return this.participantList.filter((function(e){return t.whiteList.indexOf(e.name.trim())>-1}))},participantNameList:function(){return this.participantList.map((function(t){return t.name}))}},created:function(){this.session=this.$route.query.session||""+Date.now()},mounted:function(){Q.syncUser(this.session,this.onWebSocketOpen.bind(this),this.onWebSocketMessage.bind(this),this.onWebSocketClose.bind(this)),window.addEventListener("beforeunload",(function(t){return t=t||window.event,t&&(t.returnValue="确定离开抽奖页面吗？"),"确定离开抽奖页面吗？"}))},methods:{onWebSocketOpen:function(){console.log("onWebSocketOpen")},onWebSocketMessage:function(t){var e=JSON.parse(t.data);if(console.log("onWebSocketMessage Data: ",e),"AllUsers"===e.action){var n=this.loadLuckyNamesLocal();this.participantList=e.data.map((function(t){return{session:t.session,name:t.user.trim(),src:t.avatar,forbidden:n.indexOf(t.user.trim())>-1}}))}"NewUser"===e.action&&this.participantList.splice(0,0,{session:e.data.session,name:e.data.user,src:e.data.avatar,forbidden:!1})},onWebSocketClose:function(){console.log("onWebSocketClose")},toNextState:function(){var t={start:this.toDrawingState.bind(this),drawing:this.toConfrimState.bind(this),confirm:this.toStartState.bind(this)};t[this.context.state]()},toStartState:function(){this.context.state=this.context.S_START,this.context.numLuckyPeople=1,this.context.randomIndex=-1,this.context.luckyPeople.splice(0,this.context.luckyPeople.length),this.context.proposalLuckyPeopleIndexes.splice(0,this.context.proposalLuckyPeopleIndexes.length)},toDrawingState:function(){this.context.state=this.context.S_DRAWING,this.validParticipantList.length<=0||this.context.numLuckyPeople<1||this.startDrawing()},toConfrimState:function(){var t=this;this.context.state=this.context.S_CONFIRM,this.context.proposalLuckyPeopleIndexes.forEach((function(e){setTimeout((function(){t.context.luckyPeople.push(t.validParticipantList[e])}),500)}))},onDrawButtonClick:function(){this.validParticipantList.length<=0||this.context.numLuckyPeople<1||this.toNextState()},onConfirmYesButtonClick:function(){var t=this;this.context.luckyPeople.forEach((function(e){Array.from({length:t.participantList.length}).forEach((function(n,i){var a=t.participantList[i];a.name===e.name&&(a.forbidden=!0,t.participantList.splice(i,1,a))}))})),this.toNextState()},startDrawing:function(){var t=this;requestAnimationFrame((function(e){var n;console.log("requestAnimationFrame: ",e);var i=t.generateRandomIndexes(t.context.numLuckyPeople);(n=console).log.apply(n,["indexes: "].concat(Object(g["a"])(i))),t.context.randomIndex=i[0]||0,console.log("randomIndex: ",t.context.randomIndex),t.context.state===t.context.S_DRAWING?t.startDrawing():t.context.randomIndex=t.context.proposalLuckyPeopleIndexes[0]||0}))},generateRandomIndexes:function(t){var e=this.validParticipantList.length,n=this._.cloneDeep(this.validParticipantList);n=n.map((function(t,e){return t.index=e,t})),t=Math.min(t,e),this.context.proposalLuckyPeopleIndexes.splice(0,this.context.proposalLuckyPeopleIndexes.length);while(this.context.proposalLuckyPeopleIndexes.length<t){e=n.length;var i=Math.round(Math.random()*Math.pow(10,(""+e).length)),a=i%e;this.context.proposalLuckyPeopleIndexes.push(n[a].index),n.splice(a,1)}return this.context.proposalLuckyPeopleIndexes},toggleWhiteList:function(){console.log("toggle white list"),this.whiteListVisible=!this.whiteListVisible},onWhiteListChanged:function(t){var e=this;this.whiteList.splice(0,this.whiteList.length),t.map((function(t){return t.name})).forEach((function(t){return e.whiteList.push(t)}))},onCountInputChange:function(t){t>this.validParticipantList.length&&(this.context.numLuckyPeople=this.validParticipantList.length),t<this.validParticipantList.length&&(this.context.numLuckyPeople=Math.min(1,this.validParticipantList.length))},saveLuckyNamesLocal:function(){var t=this.forbiddenParticipantList.map((function(t){return t.name}))||[],e=this.session+"-lucky-names";localStorage.setItem(e,JSON.stringify(t))},loadLuckyNamesLocal:function(){var t=this.session+"-lucky-names",e=localStorage.getItem(t)||JSON.stringify([]);return JSON.parse(e)}}},H=Y,K=(n("7313"),Object(s["a"])(H,f,m,!1,null,"24d488c5",null)),X=K.exports,Z=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"register"},[n("p",{staticClass:"title"},[t._v("瓶子科技2019年会抽奖")]),n("van-row",{attrs:{type:"flex",justify:"center"}},[n("van-col",{attrs:{span:8}},[n("van-uploader",{attrs:{"after-read":t.afterRead}},[n("van-button",{staticClass:"upload-face-button",attrs:{plain:"",type:"primary"}},[t._v("上传人脸")])],1)],1)],1),n("van-image",{staticStyle:{"margin-top":"1rem",overflow:"hidden"},attrs:{src:t.avatar,width:"8rem",height:"8rem",round:"",fit:"cover"}}),n("van-row",{staticClass:"form"},[n("van-field",{attrs:{label:"用户名:",placeholder:"请输入姓名"},model:{value:t.userName,callback:function(e){t.userName=e},expression:"userName"}})],1),n("van-row",{staticClass:"submit-button",attrs:{type:"flex",justify:"center"}},[n("van-col",{attrs:{span:"20"}},[n("van-button",{attrs:{type:"primary",size:"large"},on:{click:t.register}},[t._v("参与抽奖")])],1)],1),n("van-loading",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"toast-loading",attrs:{size:"24px"}},[t._v("请求中")])],1)},tt=[],et=(n("a15b"),n("f564")),nt=(n("ddb0"),n("2b3d"),n("6f45"));function it(t){return new Promise((function(e,n){var i=new Image;i.src=window.URL.createObjectURL(t),i.onload=function(){nt["getData"](i,(function(){var t=nt["getTag"](this,"Orientation"),n=document.createElement("canvas"),a=n.getContext("2d");switch(t){case 3:n.width=i.width,n.height=i.height,a.rotate(180*Math.PI/180),a.drawImage(i,-i.width,-i.height,i.width,i.height);break;case 6:n.width=i.height,n.height=i.width,a.rotate(90*Math.PI/180),a.drawImage(i,0,-i.height,i.width,i.height);break;case 8:n.width=i.height,n.height=i.width,a.rotate(-90*Math.PI/180),a.drawImage(i,-i.width,0,i.width,i.height);break;default:n.width=i.width,n.height=i.height,a.drawImage(i,0,0,i.width,i.height);break}n.toBlob((function(t){if(/\/(?:jpeg|png|jpg|gif)/i.test(t.type)&&t.size>1e6){var i=document.createElement("canvas"),a=i.getContext("2d"),r=new Image;return r.src=URL.createObjectURL(t),void(r.onload=function(){var t=r.height/r.width;i.width=800,i.height=800*t,a.drawImage(r,0,0,i.width,i.height),i.toBlob((function(t){e({content:i.toDataURL("image/jpeg",.92),file:t})}))})}e({content:n.toDataURL("image/jpeg",.92),file:t})}),"image/jpeg",.92)}))}}))}function at(t,e){return new Promise((function(t){var n="https://storage.xgeeklab.com/presignedUrl",i=(new Date).getTime()+Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2);F.a.get(n,{params:{name:i}}).then((function(n){F.a.put(n.data.data.url,e).then((function(e){200===e.status?t({code:0,data:{visit_url:n.data.data.visit_url}}):t({code:-1,message:"error"})}))}))}))}var rt="key-session-history-of-luckdraw",st=2880,ot={data:function(){return{userName:"",avatar:"",session:"",intervalMinutes:st,loading:!1}},computed:{FormDisabled:function(){return!(this.userName&&this.avatar)}},created:function(){this.session=this.$route.query.session||"0",this.intervalMinutes=Number.parseInt(this.$route.query.interval||st)},methods:{validateAndSaveSession:function(){var t=this.sessionHistory(),e=t[this.session],n={id:this.session,intervalMs:60*this.intervalMinutes*1e3,updateTimestamp:Date.now()};return!!this.preSessionExpired(e,n)&&(t[this.session]=n,localStorage.setItem(rt,JSON.stringify(t)),!0)},clearSession:function(){localStorage.removeItem(rt)},preSessionExpired:function(t,e){if(!t)return!0;var n=e.updateTimestamp-t.updateTimestamp;return n>t.intervalMs},sessionHistory:function(){var t=localStorage.getItem(rt)||"{}";return JSON.parse(t)},register:function(){var t=this;if(!this.userName||!this.avatar||!this.session){var e=[];return!this.userName.trim()&&e.push("姓名"),!this.avatar.trim()&&e.push("图像"),this.toast(e.join("、")+"必填","danger")}if(this.loading)return this.toast("已在请求中","danger");this.loading=!0,Q.register(this.userName.trim(),this.avatar.trim(),this.session.trim()).then((function(e){t.loading=!1,0===e.code?t.toast("参加成功"):11e3===e.code?t.toast("此用户名已参加","warning"):t.toast(e.message||"参加失败，请稍后重试","warning")})).catch((function(e){t.toast(e||"网络或者服务器异常","danger"),t.loading=!1}))},afterRead:function(t){var e=this;it(t.file).then((function(t){at("img",t.file).then((function(t){0===t.code&&(e.avatar=t.data.visit_url)}))}))},toast:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"success";Object(et["a"])({type:e,message:t})}}},ct=ot,lt=(n("d4bb"),Object(s["a"])(ct,Z,tt,!1,null,"b2271dea",null)),ut=lt.exports;i["default"].use(p["a"]);var dt=new p["a"]({mode:"history",base:"/",routes:[{path:"/",name:"index",alias:"/index",component:X},{path:"/register",name:"register",component:ut}]}),ht=n("2ef0"),pt=n.n(ht);i["default"].config.productionTip=!1,i["default"].use(d.a),i["default"].use(h["a"]),i["default"].prototype._=pt.a,new i["default"]({router:dt,render:function(t){return t(l)}}).$mount("#app")},7313:function(t,e,n){"use strict";var i=n("47ab"),a=n.n(i);a.a},"86ae":function(t,e,n){},cdae:function(t,e,n){"use strict";var i=n("0e43"),a=n.n(i);a.a},d4bb:function(t,e,n){"use strict";var i=n("86ae"),a=n.n(i);a.a},e373:function(t,e,n){"use strict";var i=n("fbb0"),a=n.n(i);a.a},fbb0:function(t,e,n){}});
//# sourceMappingURL=app.acb01ffc.js.map