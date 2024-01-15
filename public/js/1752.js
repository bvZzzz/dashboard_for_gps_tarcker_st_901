"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1752,6790,9608,2210],{6838:(e,t,a)=>{a.d(t,{Z:()=>o});var n=a(3645),r=a.n(n)()((function(e){return e[1]}));r.push([e.id,".loader[data-v-4f0c7356]{animation:spinner-4f0c7356 1.5s linear infinite;border-top-color:#3498db}@keyframes spinner-4f0c7356{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes placeHolderShimmer-4f0c7356{0%{background-position:-468px 0}to{background-position:468px 0}}.animated-background[data-v-4f0c7356]{animation-duration:1s;animation-fill-mode:forwards;animation-iteration-count:infinite;animation-name:placeHolderShimmer-4f0c7356;animation-timing-function:linear;background:#f6f7f8;background:linear-gradient(90deg,#eee 8%,#ddd 18%,#eee 33%);background-size:800px 104px;position:relative}",""]);const o=r},6790:(e,t,a)=>{a.r(t),a.d(t,{default:()=>l});var n=a(821),r={class:"block text-sm font-medium text-gray-700"},o={key:0},s={key:1};const l={__name:"InputLabel",props:{value:{type:String}},setup:function(e){return function(t,a){return(0,n.wg)(),(0,n.iD)("label",r,[e.value?((0,n.wg)(),(0,n.iD)("span",o,(0,n.zw)(e.value),1)):((0,n.wg)(),(0,n.iD)("span",s,[(0,n.WI)(t.$slots,"default")]))])}}}},9608:(e,t,a)=>{a.r(t),a.d(t,{default:()=>m});var n=a(821),r={class:"fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center"},o=function(e){return(0,n.dD)("data-v-4f0c7356"),e=e(),(0,n.Cn)(),e}((function(){return(0,n._)("div",{class:"loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"},null,-1)})),s={class:"text-center text-white"};const l={name:"LoadingSpinner",props:{message:String,default:""}};var i=a(3379),u=a.n(i),d=a(6838),c={insert:"head",singleton:!1};u()(d.Z,c);d.Z.locals;const m=(0,a(3744).Z)(l,[["render",function(e,t,a,l,i,u){return(0,n.wg)(),(0,n.iD)("div",r,[o,(0,n._)("h2",s,(0,n.zw)(a.message),1)])}],["__scopeId","data-v-4f0c7356"]])},2210:(e,t,a)=>{a.r(t),a.d(t,{default:()=>o});var n=a(821),r=["value"];const o={__name:"TextInput",props:{modelValue:{type:[String,Number],required:!0}},emits:["update:modelValue"],setup:function(e,t){var a=t.expose,o=(0,n.iH)(null);return(0,n.bv)((function(){o.value.hasAttribute("autofocus")&&o.value.focus()})),a({focus:function(){return o.value.focus()}}),function(t,a){return(0,n.wg)(),(0,n.iD)("input",{class:"shadow-sm text-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md h-10 px-3",value:e.modelValue,onInput:a[0]||(a[0]=function(e){return t.$emit("update:modelValue",e.target.value)}),ref_key:"input",ref:o},null,40,r)}}}},1752:(e,t,a)=>{a.r(t),a.d(t,{default:()=>U});var n=a(821),r=a(1024),o=a(7879),s=a(6154),l=a(8129),i=a.n(l),u=a(6790),d=a(2210),c=a(9608),m={class:"h-full md:gap-6 md:grid"},f={class:"mt-5 md:mt-0 md:col-span-2"},p={class:"shadow sm:overflow-hidden sm:rounded-md"},g={class:"bg-white shadow overflow-hidden sm:rounded-lg"},v={class:"px-4 py-5 sm:px-6"},b={class:"text-lg leading-6 font-medium text-gray-900"},x={class:"mt-1 max-w-2xl text-sm text-gray-500"},y={class:"border-t border-gray-200"},h={class:"bg-gray-50 px-4 py-5"},w={class:"text-sm font-medium text-gray-500"},_={class:"flex items-center"},k={class:"bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"},S={class:"text-sm font-medium text-gray-500"};const U={__name:"Key",props:{data:Object,filters:Object},setup:function(e){var t=e,a=(0,n.iH)(!1),l=(0,o.cI)({value:""}),U=function(){s.Z.post(i()("get.apikey"),{},{onUploadProgress:function(){a.value=!a.value},onDownloadProgress:function(){a.value=!a.value}}).then((function(e){l.value=e.data})).catch((function(e){}))};return(0,n.bv)((function(){l.value=t.data.value})),function(e,t){return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(c.default,{class:(0,n.C_)((0,n.SU)(a)?"":"hidden"),message:e.$t("ui.loading_message")},null,8,["class","message"]),(0,n._)("div",m,[(0,n._)("div",f,[(0,n._)("div",p,[(0,n._)("div",g,[(0,n._)("div",v,[(0,n._)("h3",b,(0,n.zw)(e.$t("templates.api_key_info")),1),(0,n._)("p",x,(0,n.zw)(e.$t("templates.api_key_desc")),1)]),(0,n._)("div",y,[(0,n._)("dl",null,[(0,n._)("div",h,[(0,n._)("dt",w,[(0,n.Wm)(u.default,{for:"car_number",value:"Key"}),(0,n._)("div",_,[(0,n.Wm)(d.default,{id:"uuid",type:"text",class:"mt-1 block w-96",modelValue:(0,n.SU)(l).value,"onUpdate:modelValue":t[0]||(t[0]=function(e){return(0,n.SU)(l).value=e}),required:""},null,8,["modelValue"]),(0,n._)("button",{onClick:U,type:"submit",class:"w-36 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-500 ml-3 text-sm"},(0,n.zw)(e.$t("buttons.generate")),1)])])]),(0,n._)("div",k,[(0,n._)("dt",S,[(0,n.SU)(l).value?((0,n.wg)(),(0,n.j4)((0,n.SU)(r.Z),{key:(0,n.SU)(l).value,width:200,height:200,value:(0,n.SU)(l).value,dotsOptions:{type:"classy",color:"#000000",gradient:{type:"linear",rotation:0,colorStops:[{offset:0,color:"#133e86"},{offset:1,color:"#000000"}]}},"corners-square-options":{type:"square"}},null,8,["value"])):(0,n.kq)("",!0)])])])])])])])])],64)}}}}}]);