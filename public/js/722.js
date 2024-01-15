"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[722,7337,8003,6738,6790,4053,2210,7285],{2994:(e,t,r)=>{r.d(t,{R:()=>c});var n=r(8129),o=r.n(n),l=r(821),u=r(7879);function a(e){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e,t,r){return(t=function(e){var t=function(e,t){if("object"!==a(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==a(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===a(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},r),a=(0,l.qj)(r),c=(0,l.iH)(!1),d=function(){c.value=!1,t("update:show",!1),function(){for(var e in n)a[e]=n[e]}()};return{form:a,isSubmit:c,submit:function(){u.Nd.post(o()(e),a,{preserveState:function(e){return Object.keys(e.props.errors).length},onStart:function(){c.value=!0},onError:function(e){Object.keys(e).length||d(),c.value=!1}})},close:d}}},1083:(e,t,r)=>{r.d(t,{Z:()=>l});var n=r(3645),o=r.n(n)()((function(e){return e[1]}));o.push([e.id,".fade-enter-active,.fade-leave-active{transition:opacity .1s ease}.fade-enter-from,.fade-leave-to{opacity:0}",""]);const l=o},7337:(e,t,r)=>{r.r(t),r.d(t,{default:()=>v});var n=r(821),o=r(8003),l=r(7285),u={class:"flex justify-center items-center"},a={class:"text-center w-full"},i={class:"inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100"},s={key:0},c=["src"],d={key:1},p={class:"mt-5 flex justify-center"},f={for:"photo",class:"cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"},m={class:"py-2"};const v={__name:"Avatar",props:{src:null,errors:null},emits:["updateSrc"],setup:function(e,t){var r=t.emit,v=function(e){var t=new FileReader,n=e.target.files[0];t.onloadend=function(){r("updateSrc",t.result,n)},n&&t.readAsDataURL(n)};return function(t,r){return(0,n.wg)(),(0,n.iD)("div",u,[(0,n._)("div",a,[(0,n._)("div",i,[e.src?((0,n.wg)(),(0,n.iD)("div",s,[(0,n._)("img",{src:e.src,alt:"user avatar",class:"rounded-full"},null,8,c)])):((0,n.wg)(),(0,n.iD)("div",d,[(0,n.Wm)(l.default)]))]),(0,n._)("div",p,[(0,n._)("label",f,(0,n.zw)(t.$t("users.load")),1),(0,n._)("input",{onChange:r[0]||(r[0]=function(){return(0,n.SU)(v)&&(0,n.SU)(v).apply(void 0,arguments)}),class:"sr-only",type:"file",id:"photo",accept:".jpg, .jpeg, .png, .webp"},null,32)]),(0,n._)("div",m,[(0,n.Wm)(o.default,{class:"mt-2",message:e.errors},null,8,["message"])])])])}}}},8003:(e,t,r)=>{r.r(t),r.d(t,{default:()=>l});var n=r(821),o={class:"text-xs text-red-600"};const l={__name:"InputError",props:{message:{type:String}},setup:function(e){return function(t,r){return(0,n.wy)(((0,n.wg)(),(0,n.iD)("div",null,[(0,n._)("p",o,(0,n.zw)(e.message),1)],512)),[[n.F8,e.message]])}}}},6738:(e,t,r)=>{r.r(t),r.d(t,{default:()=>u});var n=r(821),o=["textContent"];const l={name:"InputErrorV2",props:{error:String}};const u=(0,r(3744).Z)(l,[["render",function(e,t,r,l,u,a){return r.error?((0,n.wg)(),(0,n.iD)("div",{key:0,textContent:(0,n.zw)(r.error),class:"text-red-500 text-xs mt-1 px-1.5 w-72"},null,8,o)):(0,n.kq)("",!0)}]])},6790:(e,t,r)=>{r.r(t),r.d(t,{default:()=>a});var n=r(821),o={class:"block text-sm font-medium text-gray-700"},l={key:0},u={key:1};const a={__name:"InputLabel",props:{value:{type:String}},setup:function(e){return function(t,r){return(0,n.wg)(),(0,n.iD)("label",o,[e.value?((0,n.wg)(),(0,n.iD)("span",l,(0,n.zw)(e.value),1)):((0,n.wg)(),(0,n.iD)("span",u,[(0,n.WI)(t.$slots,"default")]))])}}}},4053:(e,t,r)=>{r.r(t),r.d(t,{default:()=>a});var n=r(821),o=["value"],l=["value","disabled"];const u={props:{value:"",options:Object,default:Object},setup:function(e){return{dis:void 0!==e.default&&Object.keys(e.default).length}},mounted:function(){void 0!==this.$props.default&&Object.keys(this.$props.default).length>0&&this.$props.options.unshift(this.$props.default)},unmounted:function(){void 0!==this.$props.default&&Object.keys(this.$props.default).length>0&&this.$props.options.splice(0,1)}};const a=(0,r(3744).Z)(u,[["render",function(e,t,r,u,a,i){return(0,n.wg)(),(0,n.iD)("select",{onInput:t[0]||(t[0]=function(t){return e.$emit("update:value",t.target.value)}),value:r.value,class:"shadow-sm text-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md h-10 px-3"},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(r.options,(function(e,t){return(0,n.wg)(),(0,n.iD)("option",{value:e.id,key:t,disabled:0===t&&r.value===t&&u.dis},(0,n.zw)(e.name),9,l)})),128))],40,o)}]])},2210:(e,t,r)=>{r.r(t),r.d(t,{default:()=>l});var n=r(821),o=["value"];const l={__name:"TextInput",props:{modelValue:{type:[String,Number],required:!0}},emits:["update:modelValue"],setup:function(e,t){var r=t.expose,l=(0,n.iH)(null);return(0,n.bv)((function(){l.value.hasAttribute("autofocus")&&l.value.focus()})),r({focus:function(){return l.value.focus()}}),function(t,r){return(0,n.wg)(),(0,n.iD)("input",{class:"shadow-sm text-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md h-10 px-3",value:e.modelValue,onInput:r[0]||(r[0]=function(e){return t.$emit("update:modelValue",e.target.value)}),ref_key:"input",ref:l},null,40,o)}}}},722:(e,t,r)=>{r.r(t),r.d(t,{default:()=>C});var n=r(821),o=r(2994),l=r(6790),u=r(2210),a=r(7337),i=r(4053),s=r(6738),c={key:0,class:"fixed top-0 inset-x-0 px-4 pt-6 z-50 sm:px-0 sm:flex sm:items-top sm:justify-center"},d=[(0,n._)("div",{class:"absolute inset-0 bg-black opacity-70"},null,-1)],p={class:"bg-white rounded-lg overflow-hidden shadow-xl transform w-full"},f={class:"px-6 py-4"},m={class:"text-lg py-4"},v={class:"mt-4"},g={class:"mt-10"},b={class:"grid grid-cols-2 gap-6"},y=["textContent"],_={class:"mt-10 grid grid-cols-2 gap-6"},w={class:"flex justify-between items-center"},h={class:"p-4"},x=(0,n._)("span",{class:"ml-4 text-sm font-medium text-gray-700"},"Type:",-1),S={class:"px-6 py-4 flex items-center gap-4"},k=(0,n._)("label",{for:"car"},[(0,n._)("img",{class:"w-12 h-12",src:"/images/car.png",alt:"car"})],-1),U=(0,n._)("label",{for:"trucks"},[(0,n._)("img",{class:"w-12 h-12",src:"/images/trucks.png",alt:"trucks"})],-1),j={class:"px-6 py-4 text-right"},O=["disabled"];const $={__name:"DeviceDialog",props:{show:{type:Boolean,default:!1},options:Object,formData:Object,errors:Object},emits:["update:show"],setup:function(e,t){var r=this,$=t.emit,D=e,V=(0,n.qj)({option:null,src:null}),W=(0,o.R)("create.device",$,{name:"",car_model:"",car_number:"",id_tracker:"",uuid:"",photo:null,group_id:0,type:"car"}),P=W.form,C=W.isSubmit,z=W.submit,q=W.close;(0,n.YP)((function(){return D.formData}),(function(e){for(var t in e)P[t]=e[t];V.src=e.src,V.option=e.group_id}));var I=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;V.src=e,P.photo=t};return(0,n.YP)(P,(function(){void 0!==P.uuid&&""===P.uuid&&(V.option=null,V.src=null)})),function(t,o){return e.show?((0,n.wg)(),(0,n.iD)("div",c,[(0,n._)("div",{onClick:o[0]||(o[0]=function(){return(0,n.SU)(q)&&(0,n.SU)(q).apply(void 0,arguments)}),class:"fixed inset-0 transform transition-all"},d),(0,n._)("div",null,[(0,n._)("div",p,[(0,n._)("form",{onSubmit:o[9]||(o[9]=(0,n.iM)((function(){return(0,n.SU)(z)&&(0,n.SU)(z).apply(void 0,arguments)}),["prevent"]))},[(0,n._)("div",f,[(0,n._)("div",m,(0,n.zw)(t.$t("devices.device_info")),1),(0,n._)("div",null,[(0,n.Wm)(a.default,{src:(0,n.SU)(V).src,onUpdateSrc:I,errors:t.$page.props.errors.photo},null,8,["src","errors"]),(0,n._)("div",v,[(0,n.Wm)(l.default,{for:"name",value:t.$t("users.user_name")},null,8,["value"]),(0,n.Wm)(u.default,{id:"name",type:"text",class:"mt-1 block w-full",modelValue:(0,n.SU)(P).name,"onUpdate:modelValue":o[1]||(o[1]=function(e){return(0,n.SU)(P).name=e}),required:""},null,8,["modelValue"]),(0,n.Wm)(s.default,{error:t.$page.props.errors.name},null,8,["error"])]),(0,n._)("div",g,[(0,n._)("div",b,[(0,n._)("div",null,[(0,n.Wm)(l.default,{for:"id_tracker",value:t.$t("devices.device_id")},null,8,["value"]),""===(0,n.SU)(P).uuid?((0,n.wg)(),(0,n.j4)(u.default,{key:0,id:"id_tracker",type:"text",class:"mt-1 block w-72",modelValue:(0,n.SU)(P).id_tracker,"onUpdate:modelValue":o[2]||(o[2]=function(e){return(0,n.SU)(P).id_tracker=e}),required:""},null,8,["modelValue"])):((0,n.wg)(),(0,n.iD)("div",{key:1,class:"p-2 mt-1",textContent:(0,n.zw)((0,n.SU)(P).id_tracker)},null,8,y)),(0,n.Wm)(s.default,{error:t.$page.props.errors.id_tracker},null,8,["error"])]),(0,n._)("div",null,[(0,n.Wm)(l.default,{for:"group",value:t.$t("devices.profession")},null,8,["value"]),(0,n.Wm)(i.default,{name:"group",id:"group",options:e.options,default:{id:0,name:r.$t("ui.choose_group")},value:(0,n.SU)(P).group_id,"onUpdate:value":o[3]||(o[3]=function(e){return(0,n.SU)(P).group_id=e}),class:"mt-1 block w-72"},null,8,["options","default","value"]),(0,n.Wm)(s.default,{error:t.$page.props.errors.group_id},null,8,["error"])])]),(0,n._)("div",_,[(0,n._)("div",null,[(0,n.Wm)(l.default,{for:"car_number",value:t.$t("devices.car_number")},null,8,["value"]),(0,n.Wm)(u.default,{id:"car_number",type:"text",class:"mt-1 block w-72",modelValue:(0,n.SU)(P).car_number,"onUpdate:modelValue":o[4]||(o[4]=function(e){return(0,n.SU)(P).car_number=e}),required:""},null,8,["modelValue"]),(0,n.Wm)(s.default,{error:t.$page.props.errors.car_number},null,8,["error"])]),(0,n._)("div",null,[(0,n.Wm)(l.default,{for:"car_brand",value:t.$t("devices.car_brand")},null,8,["value"]),(0,n.Wm)(u.default,{id:"car_model",type:"text",class:"mt-1 block w-72",modelValue:(0,n.SU)(P).car_model,"onUpdate:modelValue":o[5]||(o[5]=function(e){return(0,n.SU)(P).car_model=e}),required:""},null,8,["modelValue"]),(0,n.Wm)(s.default,{error:t.$page.props.errors.car_model},null,8,["error"])])])])])]),(0,n._)("div",w,[(0,n._)("div",h,[x,(0,n._)("div",S,[(0,n._)("div",null,[(0,n.wy)((0,n._)("input",{type:"radio",id:"car",name:"device",value:"car","onUpdate:modelValue":o[6]||(o[6]=function(e){return(0,n.SU)(P).type=e})},null,512),[[n.G2,(0,n.SU)(P).type]]),k]),(0,n._)("div",null,[(0,n.wy)((0,n._)("input",{type:"radio",id:"trucks",name:"device",value:"trucks","onUpdate:modelValue":o[7]||(o[7]=function(e){return(0,n.SU)(P).type=e})},null,512),[[n.G2,(0,n.SU)(P).type]]),U])])]),(0,n._)("div",j,[(0,n._)("button",{type:"submit",disabled:(0,n.SU)(C),class:(0,n.C_)([(0,n.SU)(C)?"opacity-50":"","w-24 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-500 ml-3 text-sm"])},(0,n.zw)(t.$t("buttons.save")),11,O),(0,n._)("button",{onClick:o[8]||(o[8]=function(){return(0,n.SU)(q)&&(0,n.SU)(q).apply(void 0,arguments)}),type:"button",class:"mt-3 w-24 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 mt-0 ml-3 text-sm"},(0,n.zw)(t.$t("buttons.cancel")),1)])])],32)])])])):(0,n.kq)("",!0)}}};var D=r(3379),V=r.n(D),W=r(1083),P={insert:"head",singleton:!1};V()(W.Z,P);W.Z.locals;const C=$},7285:(e,t,r)=>{r.r(t),r.d(t,{default:()=>a});var n=r(821),o={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 512 512",style:{"enable-background":"new 0 0 512 512"},class:"rounded-full","xml:space":"preserve"},l=[(0,n._)("path",{style:{fill:"#455A64"},d:"M511.676,498.752l-12.8-51.2c-6.073-24.838-24.485-44.813-48.747-52.885l-93.867-31.275\n            c-22.891-9.536-33.365-46.4-35.627-60.395c17.442-14.504,28.665-35.14,31.36-57.664c-0.385-3.847,0.523-7.713,2.581-10.987\n            c3.326-0.833,6.049-3.215,7.317-6.4c6.142-14.872,9.997-30.588,11.435-46.613c0.003-0.871-0.104-1.738-0.32-2.581\n            c-1.528-6.227-5.189-11.722-10.347-15.531v-56.555c0-34.368-10.496-48.469-21.547-56.64C339.004,33.472,321.276,0,255.996,0\n            c-57.917,2.332-104.335,48.75-106.667,106.667v56.555c-5.158,3.809-8.819,9.304-10.347,15.531c-0.216,0.843-0.323,1.711-0.32,2.581\n            c1.436,16.033,5.291,31.756,11.435,46.635c0.924,3.015,3.347,5.334,6.4,6.123c1.195,0.597,3.435,3.691,3.435,11.243\n            c2.711,22.588,13.999,43.271,31.531,57.771c-2.24,13.973-12.651,50.816-34.901,60.117l-94.699,31.445\n            c-24.243,8.071-42.643,28.026-48.725,52.843l-12.8,51.2c-1.449,5.71,2.005,11.514,7.715,12.963c0.853,0.217,1.73,0.327,2.61,0.328\n            h490.667c5.891-0.002,10.665-4.779,10.664-10.67C511.993,500.461,511.886,499.595,511.676,498.752z"},null,-1)];const u={name:"IconProfile"};const a=(0,r(3744).Z)(u,[["render",function(e,t,r,u,a,i){return(0,n.wg)(),(0,n.iD)("svg",o,l)}]])}}]);