"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3850,3122,4447,3668,7535,1794],{3850:(t,e,o)=>{o.r(e),o.d(e,{default:()=>L});var n=o(821),r={class:"bg-gray-800 shadow-md z-20"},a={class:"px-6"},s={class:"flex h-20 items-center justify-between"},l={class:"flex"},u={class:"flex items-center gap-3 mr-10 w-64"},i={class:"flex items-center gap-4"},c={class:"text-white"},d={class:"text-white"},f={class:"text-white"},p={class:"flex items-center gap-4"},h={class:"bg-gray-700 px-4 py-2 rounded-lg"},g={class:"relative inline-flex items-center cursor-pointer"},w=(0,n._)("div",{class:"w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sky-500"},null,-1),m={class:"ml-3 text-sm font-medium text-white"};var v=o(3122),k=o(4447),x=o(3668),b=o(1794),y=o(8129),_=o.n(y);const C={components:{IconSettingsV2:b.default,IconCalendar:x.default,LogoutButton:k.default,ActionButton:v.default},props:{lastLocation:Object,modelValue:{type:Boolean,default:!1}},data:function(){return{checked:this.$props.modelValue}},methods:{showModal:function(){this.$emit("open",!0)},goToLocation:function(){this.$emit("goToLocation",[this.$props.lastLocation.lat,this.$props.lastLocation.long])},updateMode:function(t){this.$emit("updateMode",t.target.checked)},goSettings:function(){window.location.href=_()("settings")}}};const L=(0,o(3744).Z)(C,[["render",function(t,e,o,v,k,x){var b=(0,n.up)("IconLogo"),y=(0,n.up)("Link"),_=(0,n.up)("IconLocation"),C=(0,n.up)("ActionButton"),L=(0,n.up)("IconCalendar"),M=(0,n.up)("IconSettingsV2"),$=(0,n.up)("LogoutButton");return(0,n.wg)(),(0,n.iD)("nav",r,[(0,n._)("div",a,[(0,n._)("div",s,[(0,n._)("div",l,[(0,n._)("div",u,[(0,n.Wm)(b),(0,n.Wm)(y,{href:t.route("dashboard"),class:"font-bold text-xl text-white"},{default:(0,n.w5)((function(){return[(0,n.Uk)((0,n.zw)(t.$t("headers.dashboard")),1)]})),_:1},8,["href"])]),(0,n._)("div",i,[(0,n.Wm)(C,{onClick:x.goToLocation},{default:(0,n.w5)((function(){return[(0,n.Wm)(_,{class:"w-5 h-5 mr-2"}),(0,n._)("span",c,(0,n.zw)(t.$t("buttons.location")),1)]})),_:1},8,["onClick"]),(0,n.Wm)(C,{onClick:x.showModal},{default:(0,n.w5)((function(){return[(0,n.Wm)(L,{class:"w-5 h-5 mr-2"}),(0,n._)("span",d,(0,n.zw)(t.$t("buttons.interval")),1)]})),_:1},8,["onClick"]),(0,n.Wm)(C,{onClick:x.goSettings},{default:(0,n.w5)((function(){return[(0,n.Wm)(M,{class:"w-5 h-5 mr-2"}),(0,n._)("span",f,(0,n.zw)(t.$t("buttons.settings")),1)]})),_:1},8,["onClick"])])]),(0,n._)("div",p,[(0,n._)("div",h,[(0,n._)("label",g,[(0,n.wy)((0,n._)("input",{type:"checkbox",value:"","onUpdate:modelValue":e[0]||(e[0]=function(t){return k.checked=t}),onChange:e[1]||(e[1]=function(){return x.updateMode&&x.updateMode.apply(x,arguments)}),class:"sr-only peer"},null,544),[[n.e8,k.checked]]),w,(0,n._)("span",m,(0,n.zw)(t.$t("ui.update_location")),1)])]),(0,n.Wm)($)])])])])}]])},3122:(t,e,o)=>{o.r(e),o.d(e,{default:()=>s});var n=o(821),r={class:"w-32 bg-gray-800 border border-[#38569e] hover:bg-sky-500 hover:border-sky-600 flex items-center justify-center text-white active:text-blue-400 hover:bg-opacity-70 text-xs font-medium uppercase px-2 py-2 h-10 rounded outline-none focus:outline-none ease-linear transition-all duration-150"};const a={name:"ActionButton"};const s=(0,o(3744).Z)(a,[["render",function(t,e,o,a,s,l){return(0,n.wg)(),(0,n.iD)("button",r,[(0,n.WI)(t.$slots,"default")])}]])},4447:(t,e,o)=>{o.r(e),o.d(e,{default:()=>i});var n=o(821),r={class:"text-white border-l border-gray-300 px-2"};var a=o(7535),s=o(8129),l=o.n(s);const u={name:"LogoutButton",components:{IconLogout:a.default},methods:{logout:function(){window.location.href=l()("logout")}}};const i=(0,o(3744).Z)(u,[["render",function(t,e,o,a,s,l){var u=(0,n.up)("IconLogout");return(0,n.wg)(),(0,n.iD)("button",r,[(0,n._)("div",{onClick:e[0]||(e[0]=function(){return l.logout&&l.logout.apply(l,arguments)}),class:"flex gap-2 items-center"},[(0,n.Wm)(u,{class:"w-5 h-5 text-gray-100"}),(0,n.Uk)(" "+(0,n.zw)(t.$t("buttons.logout")),1)])])}]])},3668:(t,e,o)=>{o.r(e),o.d(e,{default:()=>l});var n=o(821),r={xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},a=[(0,n._)("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"},null,-1)];const s={name:"IconCalendar"};const l=(0,o(3744).Z)(s,[["render",function(t,e,o,s,l,u){return(0,n.wg)(),(0,n.iD)("svg",r,a)}]])},7535:(t,e,o)=>{o.r(e),o.d(e,{default:()=>l});var n=o(821),r={xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},a=[(0,n._)("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"},null,-1)];const s={name:"IconLogout"};const l=(0,o(3744).Z)(s,[["render",function(t,e,o,s,l,u){return(0,n.wg)(),(0,n.iD)("svg",r,a)}]])},1794:(t,e,o)=>{o.r(e),o.d(e,{default:()=>l});var n=o(821),r={xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},a=[(0,n._)("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"},null,-1)];const s={name:"IconSettingsV2"};const l=(0,o(3744).Z)(s,[["render",function(t,e,o,s,l,u){return(0,n.wg)(),(0,n.iD)("svg",r,a)}]])}}]);