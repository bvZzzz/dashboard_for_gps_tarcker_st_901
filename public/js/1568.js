/*! For license information please see 1568.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1568,7848,7337,8003,6738,6790,5428,9608,4053,2210,722,7819,7285],{2994:(e,t,r)=>{r.d(t,{R:()=>c});var n=r(8129),o=r.n(n),a=r(821),i=r(7879);function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e,t,r){return(t=function(e){var t=function(e,t){if("object"!==l(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==l(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===l(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},r),l=(0,a.qj)(r),c=(0,a.iH)(!1),d=function(){c.value=!1,t("update:show",!1),function(){for(var e in n)l[e]=n[e]}()};return{form:l,isSubmit:c,submit:function(){i.Nd.post(o()(e),l,{preserveState:function(e){return Object.keys(e.props.errors).length},onStart:function(){c.value=!0},onError:function(e){Object.keys(e).length||d(),c.value=!1}})},close:d}}},120:(e,t,r)=>{r.d(t,{d:()=>s});var n=r(7879),o=r(6154),a=r(821);function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function l(){l=function(){return t};var e,t={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(e,t,r){e[t]=r.value},a="function"==typeof Symbol?Symbol:{},u=a.iterator||"@@iterator",s=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function d(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{d({},"")}catch(e){d=function(e,t,r){return e[t]=r}}function f(e,t,r,n){var a=t&&t.prototype instanceof w?t:w,i=Object.create(a.prototype),l=new V(n||[]);return o(i,"_invoke",{value:D(e,r,l)}),i}function p(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}t.wrap=f;var m="suspendedStart",v="suspendedYield",g="executing",h="completed",y={};function w(){}function b(){}function x(){}var _={};d(_,u,(function(){return this}));var k=Object.getPrototypeOf,S=k&&k(k(P([])));S&&S!==r&&n.call(S,u)&&(_=S);var j=x.prototype=w.prototype=Object.create(_);function U(e){["next","throw","return"].forEach((function(t){d(e,t,(function(e){return this._invoke(t,e)}))}))}function O(e,t){function r(o,a,l,u){var s=p(e[o],e,a);if("throw"!==s.type){var c=s.arg,d=c.value;return d&&"object"==i(d)&&n.call(d,"__await")?t.resolve(d.__await).then((function(e){r("next",e,l,u)}),(function(e){r("throw",e,l,u)})):t.resolve(d).then((function(e){c.value=e,l(c)}),(function(e){return r("throw",e,l,u)}))}u(s.arg)}var a;o(this,"_invoke",{value:function(e,n){function o(){return new t((function(t,o){r(e,n,t,o)}))}return a=a?a.then(o,o):o()}})}function D(t,r,n){var o=m;return function(a,i){if(o===g)throw new Error("Generator is already running");if(o===h){if("throw"===a)throw i;return{value:e,done:!0}}for(n.method=a,n.arg=i;;){var l=n.delegate;if(l){var u=L(l,n);if(u){if(u===y)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===m)throw o=h,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=g;var s=p(t,r,n);if("normal"===s.type){if(o=n.done?h:v,s.arg===y)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(o=h,n.method="throw",n.arg=s.arg)}}}function L(t,r){var n=r.method,o=t.iterator[n];if(o===e)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=e,L(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),y;var a=p(o,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,y;var i=a.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,y):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,y)}function $(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function E(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function V(e){this.tryEntries=[{tryLoc:"root"}],e.forEach($,this),this.reset(!0)}function P(t){if(t||""===t){var r=t[u];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}throw new TypeError(i(t)+" is not iterable")}return b.prototype=x,o(j,"constructor",{value:x,configurable:!0}),o(x,"constructor",{value:b,configurable:!0}),b.displayName=d(x,c,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===b||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,x):(e.__proto__=x,d(e,c,"GeneratorFunction")),e.prototype=Object.create(j),e},t.awrap=function(e){return{__await:e}},U(O.prototype),d(O.prototype,s,(function(){return this})),t.AsyncIterator=O,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new O(f(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},U(j),d(j,c,"Generator"),d(j,u,(function(){return this})),d(j,"toString",(function(){return"[object Generator]"})),t.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=P,V.prototype={constructor:V,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(E),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return l.type="throw",l.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],l=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),s=n.call(i,"finallyLoc");if(u&&s){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=e,i.arg=t,a?(this.method="next",this.next=a.finallyLoc,y):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),y},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),E(r),y}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;E(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:P(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),y}},t}function u(e,t,r,n,o,a,i){try{var l=e[a](i),u=l.value}catch(e){return void r(e)}l.done?t(u):Promise.resolve(u).then(n,o)}function s(){var e=null,t=(0,a.iH)({}),r=(0,a.iH)(!1);function i(){var e;return e=l().mark((function e(n,a,i){var u;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Z.post(n,{uuid:a},{onUploadProgress:function(){r.value=!r.value},onDownloadProgress:function(){r.value=!r.value}}).catch((function(e){}));case 2:u=e.sent,t.value=u.data,i.value=!i.value;case 5:case"end":return e.stop()}}),e)})),i=function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function i(e){u(a,n,o,i,l,"next",e)}function l(e){u(a,n,o,i,l,"throw",e)}i(void 0)}))},i.apply(this,arguments)}return{showModal:function(t){t=!0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:""},editItem:function(e,t,r){return i.apply(this,arguments)},deleteItem:function(e,t){n.Nd.delete(e,{onBefore:function(){return confirm(t)},onError:function(e){}})},uuid:e,loading:r,formData:t}}},6517:(e,t,r)=>{r.d(t,{R:()=>a});var n=r(821),o=r(7879);function a(e,t){var r,a=(0,n.iH)(null!==(r=t.q)&&void 0!==r?r:"");return(0,n.YP)(a,(function(){o.Nd.get("/settings/"+e,{q:a.value},{preserveState:!0})}),{deep:!0}),{search:a,clear:function(){a.value=""}}}},6838:(e,t,r)=>{r.d(t,{Z:()=>a});var n=r(3645),o=r.n(n)()((function(e){return e[1]}));o.push([e.id,".loader[data-v-4f0c7356]{animation:spinner-4f0c7356 1.5s linear infinite;border-top-color:#3498db}@keyframes spinner-4f0c7356{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes placeHolderShimmer-4f0c7356{0%{background-position:-468px 0}to{background-position:468px 0}}.animated-background[data-v-4f0c7356]{animation-duration:1s;animation-fill-mode:forwards;animation-iteration-count:infinite;animation-name:placeHolderShimmer-4f0c7356;animation-timing-function:linear;background:#f6f7f8;background:linear-gradient(90deg,#eee 8%,#ddd 18%,#eee 33%);background-size:800px 104px;position:relative}",""]);const a=o},1083:(e,t,r)=>{r.d(t,{Z:()=>a});var n=r(3645),o=r.n(n)()((function(e){return e[1]}));o.push([e.id,".fade-enter-active,.fade-leave-active{transition:opacity .1s ease}.fade-enter-from,.fade-leave-to{opacity:0}",""]);const a=o},7848:(e,t,r)=>{r.r(t),r.d(t,{default:()=>i});var n=r(821),o={class:"mt-1 w-full bg-white py-3 rounded-lg shadow"};const a={name:"Pagination",props:{links:Array}};const i=(0,r(3744).Z)(a,[["render",function(e,t,r,a,i,l){return(0,n.wg)(),(0,n.iD)("div",o,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(r.links,(function(e){return(0,n.wg)(),(0,n.j4)((0,n.LL)(e.url?"Link":"span"),{href:e.url,innerHTML:e.label,class:(0,n.C_)(["mx-1 px-4 py-2",{"font-medium bg-gray-100":e.active,"text-gray-700 transition-colors duration-300 transform rounded-md sm:inline hover:bg-gray-200 hover:text-black":e.url}])},null,8,["href","innerHTML","class"])})),256))])}]])},7337:(e,t,r)=>{r.r(t),r.d(t,{default:()=>v});var n=r(821),o=r(8003),a=r(7285),i={class:"flex justify-center items-center"},l={class:"text-center w-full"},u={class:"inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100"},s={key:0},c=["src"],d={key:1},f={class:"mt-5 flex justify-center"},p={for:"photo",class:"cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"},m={class:"py-2"};const v={__name:"Avatar",props:{src:null,errors:null},emits:["updateSrc"],setup:function(e,t){var r=t.emit,v=function(e){var t=new FileReader,n=e.target.files[0];t.onloadend=function(){r("updateSrc",t.result,n)},n&&t.readAsDataURL(n)};return function(t,r){return(0,n.wg)(),(0,n.iD)("div",i,[(0,n._)("div",l,[(0,n._)("div",u,[e.src?((0,n.wg)(),(0,n.iD)("div",s,[(0,n._)("img",{src:e.src,alt:"user avatar",class:"rounded-full"},null,8,c)])):((0,n.wg)(),(0,n.iD)("div",d,[(0,n.Wm)(a.default)]))]),(0,n._)("div",f,[(0,n._)("label",p,(0,n.zw)(t.$t("users.load")),1),(0,n._)("input",{onChange:r[0]||(r[0]=function(){return(0,n.SU)(v)&&(0,n.SU)(v).apply(void 0,arguments)}),class:"sr-only",type:"file",id:"photo",accept:".jpg, .jpeg, .png, .webp"},null,32)]),(0,n._)("div",m,[(0,n.Wm)(o.default,{class:"mt-2",message:e.errors},null,8,["message"])])])])}}}},8003:(e,t,r)=>{r.r(t),r.d(t,{default:()=>a});var n=r(821),o={class:"text-xs text-red-600"};const a={__name:"InputError",props:{message:{type:String}},setup:function(e){return function(t,r){return(0,n.wy)(((0,n.wg)(),(0,n.iD)("div",null,[(0,n._)("p",o,(0,n.zw)(e.message),1)],512)),[[n.F8,e.message]])}}}},6738:(e,t,r)=>{r.r(t),r.d(t,{default:()=>i});var n=r(821),o=["textContent"];const a={name:"InputErrorV2",props:{error:String}};const i=(0,r(3744).Z)(a,[["render",function(e,t,r,a,i,l){return r.error?((0,n.wg)(),(0,n.iD)("div",{key:0,textContent:(0,n.zw)(r.error),class:"text-red-500 text-xs mt-1 px-1.5 w-72"},null,8,o)):(0,n.kq)("",!0)}]])},6790:(e,t,r)=>{r.r(t),r.d(t,{default:()=>l});var n=r(821),o={class:"block text-sm font-medium text-gray-700"},a={key:0},i={key:1};const l={__name:"InputLabel",props:{value:{type:String}},setup:function(e){return function(t,r){return(0,n.wg)(),(0,n.iD)("label",o,[e.value?((0,n.wg)(),(0,n.iD)("span",a,(0,n.zw)(e.value),1)):((0,n.wg)(),(0,n.iD)("span",i,[(0,n.WI)(t.$slots,"default")]))])}}}},5428:(e,t,r)=>{r.r(t),r.d(t,{default:()=>l});var n=r(821),o=r(7819),a={class:"relative"},i=["value","placeholder"];const l={__name:"InputSearch",props:{modelValue:{type:String,required:!0},placeholder:String},emits:["update:modelValue","clearSearch"],setup:function(e,t){var r=t.emit,l=(0,n.iH)(null),u=function(){r("clearSearch")};return function(t,r){return(0,n.wg)(),(0,n.iD)("div",a,[(0,n._)("input",{value:e.modelValue,onInput:r[0]||(r[0]=function(e){return t.$emit("update:modelValue",e.target.value)}),ref_key:"input",ref:l,name:"search",type:"text",placeholder:e.placeholder,class:"bg-[#344670] w-96 rounded-md pl-3 pr-8 text-sm text-gray-100 focus:border-transparent focus:ring-0 outline-none focus:outline-none border border-transparent placeholder-gray-300"},null,40,i),e.modelValue?((0,n.wg)(),(0,n.iD)("button",{key:0,onClick:u,class:"absolute right-2 top-2 hover:bg-gray-700 rounded-md"},[(0,n.Wm)(o.default,{class:"h-5 w-5 text-gray-400"})])):(0,n.kq)("",!0)])}}}},9608:(e,t,r)=>{r.r(t),r.d(t,{default:()=>f});var n=r(821),o={class:"fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center"},a=function(e){return(0,n.dD)("data-v-4f0c7356"),e=e(),(0,n.Cn)(),e}((function(){return(0,n._)("div",{class:"loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"},null,-1)})),i={class:"text-center text-white"};const l={name:"LoadingSpinner",props:{message:String,default:""}};var u=r(3379),s=r.n(u),c=r(6838),d={insert:"head",singleton:!1};s()(c.Z,d);c.Z.locals;const f=(0,r(3744).Z)(l,[["render",function(e,t,r,l,u,s){return(0,n.wg)(),(0,n.iD)("div",o,[a,(0,n._)("h2",i,(0,n.zw)(r.message),1)])}],["__scopeId","data-v-4f0c7356"]])},4053:(e,t,r)=>{r.r(t),r.d(t,{default:()=>l});var n=r(821),o=["value"],a=["value","disabled"];const i={props:{value:"",options:Object,default:Object},setup:function(e){return{dis:void 0!==e.default&&Object.keys(e.default).length}},mounted:function(){void 0!==this.$props.default&&Object.keys(this.$props.default).length>0&&this.$props.options.unshift(this.$props.default)},unmounted:function(){void 0!==this.$props.default&&Object.keys(this.$props.default).length>0&&this.$props.options.splice(0,1)}};const l=(0,r(3744).Z)(i,[["render",function(e,t,r,i,l,u){return(0,n.wg)(),(0,n.iD)("select",{onInput:t[0]||(t[0]=function(t){return e.$emit("update:value",t.target.value)}),value:r.value,class:"shadow-sm text-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md h-10 px-3"},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(r.options,(function(e,t){return(0,n.wg)(),(0,n.iD)("option",{value:e.id,key:t,disabled:0===t&&r.value===t&&i.dis},(0,n.zw)(e.name),9,a)})),128))],40,o)}]])},2210:(e,t,r)=>{r.r(t),r.d(t,{default:()=>a});var n=r(821),o=["value"];const a={__name:"TextInput",props:{modelValue:{type:[String,Number],required:!0}},emits:["update:modelValue"],setup:function(e,t){var r=t.expose,a=(0,n.iH)(null);return(0,n.bv)((function(){a.value.hasAttribute("autofocus")&&a.value.focus()})),r({focus:function(){return a.value.focus()}}),function(t,r){return(0,n.wg)(),(0,n.iD)("input",{class:"shadow-sm text-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md h-10 px-3",value:e.modelValue,onInput:r[0]||(r[0]=function(e){return t.$emit("update:modelValue",e.target.value)}),ref_key:"input",ref:a},null,40,o)}}}},1568:(e,t,r)=>{r.r(t),r.d(t,{default:()=>I});var n=r(821),o=r(8129),a=r.n(o),i=r(120),l=r(6517),u=r(8552),s=r(722),c=r(7285),d=r(7848),f=r(5428),p=r(9608),m={class:"absolute right-32 top-5 z-30"},v={class:"relative"},g={class:"bg-gray-50 grid grid-cols-4 items-center py-1.5 rounded-t-md"},h={class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},y={class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},w={class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},b={class:"bg-white divide-gray-200 divide-y min-w-full rounded-b-md"},x={class:"px-6 py-3 flex items-center"},_={class:"flex items-center"},k={class:"flex-shrink-0 h-12 w-12"},S=["src"],j={key:1},U={class:"ml-4"},O={class:"text-sm font-medium text-gray-900"},D={class:"text-sm text-gray-500"},L={class:"px-6 py-2 flex items-center text-sm text-gray-500"},$={class:"px-6 py-1.5 flex items-center text-sm text-gray-500"},E={class:"flex items-center gap-2"},V=["onClick"],P=[(0,n._)("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[(0,n._)("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})],-1)],C=["onClick"],z=[(0,n._)("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[(0,n._)("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})],-1)],W={key:0,class:"text-gray-500 p-4"};const I={__name:"Devices",props:{data:Object,filters:Object},setup:function(e,t){var r=t.expose,o=e,I=(0,n.iH)(!1),q=(0,i.d)(),H=(q.uuid,q.loading),N=q.formData,T=q.editItem,Z=q.deleteItem,G=(0,l.R)("devices",o.filters),M=G.search,Y=G.clear,A=(0,u.QT)().t;return r({modal:function(){I.value=!I.value}}),function(t,r){return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(p.default,{class:(0,n.C_)((0,n.SU)(H)?"":"hidden"),message:t.$t("ui.loading_message")},null,8,["class","message"]),(0,n._)("div",m,[(0,n.Wm)(f.default,{onClearSearch:(0,n.SU)(Y),modelValue:(0,n.SU)(M),"onUpdate:modelValue":r[0]||(r[0]=function(e){return(0,n.dq)(M)?M.value=e:M=e}),placeholder:t.$t("users.search")},null,8,["onClearSearch","modelValue","placeholder"])]),(0,n._)("div",v,[(0,n._)("div",g,[(0,n._)("div",h,(0,n.zw)(t.$t("devices.name")),1),(0,n._)("div",y,(0,n.zw)(t.$t("devices.car_number_brand")),1),(0,n._)("div",w,(0,n.zw)(t.$t("devices.device_id")),1)]),(0,n._)("div",b,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.data.db.data,(function(e){return(0,n.wg)(),(0,n.iD)("div",{key:e.id_tracker,class:"grid grid-cols-4 hover:bg-gray-50"},[(0,n._)("div",x,[(0,n._)("div",_,[(0,n._)("div",k,[(0,n._)("div",null,[e.photo?((0,n.wg)(),(0,n.iD)("img",{key:0,src:e.photoUrl,alt:"user avatar",class:"h-12 w-12 rounded-full"},null,8,S)):((0,n.wg)(),(0,n.iD)("div",j,[(0,n.Wm)(c.default)]))])]),(0,n._)("div",U,[(0,n._)("span",O,(0,n.zw)(e.name),1),(0,n._)("div",D,(0,n.zw)(e.group_name),1)])])]),(0,n._)("div",L,(0,n.zw)(e.car_model)+" - "+(0,n.zw)(e.car_number),1),(0,n._)("div",$,(0,n.zw)(e.id_tracker),1),(0,n._)("div",E,[(0,n._)("a",{onClick:function(t){return function(e){T(a()("get.device"),e,I)}(e.uuid)},class:"text-gray-600 hover:text-blue-500 cursor-pointer",title:"Изменить данные"},P,8,V),(0,n._)("a",{onClick:function(t){return function(e){Z(a()("delete.device",{uuid:e}),A("devices.confirm_delete"))}(e.uuid)},class:"text-gray-600 hover:text-red-500 cursor-pointer",title:"Удалить"},z,8,C)])])})),128)),0===e.data.db.data.length?((0,n.wg)(),(0,n.iD)("div",W,(0,n.zw)(t.$t("ui.empty")),1)):(0,n.kq)("",!0)])]),e.data.db.links?((0,n.wg)(),(0,n.j4)(d.default,{key:0,links:e.data.db.links},null,8,["links"])):(0,n.kq)("",!0),(0,n.Wm)(n.uT,{name:"fade"},{default:(0,n.w5)((function(){return[(0,n.Wm)(s.default,{show:(0,n.SU)(I),"onUpdate:show":r[1]||(r[1]=function(e){return(0,n.dq)(I)?I.value=e:I=e}),options:e.data.groups,"form-data":(0,n.SU)(N)},null,8,["show","options","form-data"])]})),_:1})],64)}}}},722:(e,t,r)=>{r.r(t),r.d(t,{default:()=>P});var n=r(821),o=r(2994),a=r(6790),i=r(2210),l=r(7337),u=r(4053),s=r(6738),c={key:0,class:"fixed top-0 inset-x-0 px-4 pt-6 z-50 sm:px-0 sm:flex sm:items-top sm:justify-center"},d=[(0,n._)("div",{class:"absolute inset-0 bg-black opacity-70"},null,-1)],f={class:"bg-white rounded-lg overflow-hidden shadow-xl transform w-full"},p={class:"px-6 py-4"},m={class:"text-lg py-4"},v={class:"mt-4"},g={class:"mt-10"},h={class:"grid grid-cols-2 gap-6"},y=["textContent"],w={class:"mt-10 grid grid-cols-2 gap-6"},b={class:"flex justify-between items-center"},x={class:"p-4"},_=(0,n._)("span",{class:"ml-4 text-sm font-medium text-gray-700"},"Type:",-1),k={class:"px-6 py-4 flex items-center gap-4"},S=(0,n._)("label",{for:"car"},[(0,n._)("img",{class:"w-12 h-12",src:"/images/car.png",alt:"car"})],-1),j=(0,n._)("label",{for:"trucks"},[(0,n._)("img",{class:"w-12 h-12",src:"/images/trucks.png",alt:"trucks"})],-1),U={class:"px-6 py-4 text-right"},O=["disabled"];const D={__name:"DeviceDialog",props:{show:{type:Boolean,default:!1},options:Object,formData:Object,errors:Object},emits:["update:show"],setup:function(e,t){var r=this,D=t.emit,L=e,$=(0,n.qj)({option:null,src:null}),E=(0,o.R)("create.device",D,{name:"",car_model:"",car_number:"",id_tracker:"",uuid:"",photo:null,group_id:0,type:"car"}),V=E.form,P=E.isSubmit,C=E.submit,z=E.close;(0,n.YP)((function(){return L.formData}),(function(e){for(var t in e)V[t]=e[t];$.src=e.src,$.option=e.group_id}));var W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;$.src=e,V.photo=t};return(0,n.YP)(V,(function(){void 0!==V.uuid&&""===V.uuid&&($.option=null,$.src=null)})),function(t,o){return e.show?((0,n.wg)(),(0,n.iD)("div",c,[(0,n._)("div",{onClick:o[0]||(o[0]=function(){return(0,n.SU)(z)&&(0,n.SU)(z).apply(void 0,arguments)}),class:"fixed inset-0 transform transition-all"},d),(0,n._)("div",null,[(0,n._)("div",f,[(0,n._)("form",{onSubmit:o[9]||(o[9]=(0,n.iM)((function(){return(0,n.SU)(C)&&(0,n.SU)(C).apply(void 0,arguments)}),["prevent"]))},[(0,n._)("div",p,[(0,n._)("div",m,(0,n.zw)(t.$t("devices.device_info")),1),(0,n._)("div",null,[(0,n.Wm)(l.default,{src:(0,n.SU)($).src,onUpdateSrc:W,errors:t.$page.props.errors.photo},null,8,["src","errors"]),(0,n._)("div",v,[(0,n.Wm)(a.default,{for:"name",value:t.$t("users.user_name")},null,8,["value"]),(0,n.Wm)(i.default,{id:"name",type:"text",class:"mt-1 block w-full",modelValue:(0,n.SU)(V).name,"onUpdate:modelValue":o[1]||(o[1]=function(e){return(0,n.SU)(V).name=e}),required:""},null,8,["modelValue"]),(0,n.Wm)(s.default,{error:t.$page.props.errors.name},null,8,["error"])]),(0,n._)("div",g,[(0,n._)("div",h,[(0,n._)("div",null,[(0,n.Wm)(a.default,{for:"id_tracker",value:t.$t("devices.device_id")},null,8,["value"]),""===(0,n.SU)(V).uuid?((0,n.wg)(),(0,n.j4)(i.default,{key:0,id:"id_tracker",type:"text",class:"mt-1 block w-72",modelValue:(0,n.SU)(V).id_tracker,"onUpdate:modelValue":o[2]||(o[2]=function(e){return(0,n.SU)(V).id_tracker=e}),required:""},null,8,["modelValue"])):((0,n.wg)(),(0,n.iD)("div",{key:1,class:"p-2 mt-1",textContent:(0,n.zw)((0,n.SU)(V).id_tracker)},null,8,y)),(0,n.Wm)(s.default,{error:t.$page.props.errors.id_tracker},null,8,["error"])]),(0,n._)("div",null,[(0,n.Wm)(a.default,{for:"group",value:t.$t("devices.profession")},null,8,["value"]),(0,n.Wm)(u.default,{name:"group",id:"group",options:e.options,default:{id:0,name:r.$t("ui.choose_group")},value:(0,n.SU)(V).group_id,"onUpdate:value":o[3]||(o[3]=function(e){return(0,n.SU)(V).group_id=e}),class:"mt-1 block w-72"},null,8,["options","default","value"]),(0,n.Wm)(s.default,{error:t.$page.props.errors.group_id},null,8,["error"])])]),(0,n._)("div",w,[(0,n._)("div",null,[(0,n.Wm)(a.default,{for:"car_number",value:t.$t("devices.car_number")},null,8,["value"]),(0,n.Wm)(i.default,{id:"car_number",type:"text",class:"mt-1 block w-72",modelValue:(0,n.SU)(V).car_number,"onUpdate:modelValue":o[4]||(o[4]=function(e){return(0,n.SU)(V).car_number=e}),required:""},null,8,["modelValue"]),(0,n.Wm)(s.default,{error:t.$page.props.errors.car_number},null,8,["error"])]),(0,n._)("div",null,[(0,n.Wm)(a.default,{for:"car_brand",value:t.$t("devices.car_brand")},null,8,["value"]),(0,n.Wm)(i.default,{id:"car_model",type:"text",class:"mt-1 block w-72",modelValue:(0,n.SU)(V).car_model,"onUpdate:modelValue":o[5]||(o[5]=function(e){return(0,n.SU)(V).car_model=e}),required:""},null,8,["modelValue"]),(0,n.Wm)(s.default,{error:t.$page.props.errors.car_model},null,8,["error"])])])])])]),(0,n._)("div",b,[(0,n._)("div",x,[_,(0,n._)("div",k,[(0,n._)("div",null,[(0,n.wy)((0,n._)("input",{type:"radio",id:"car",name:"device",value:"car","onUpdate:modelValue":o[6]||(o[6]=function(e){return(0,n.SU)(V).type=e})},null,512),[[n.G2,(0,n.SU)(V).type]]),S]),(0,n._)("div",null,[(0,n.wy)((0,n._)("input",{type:"radio",id:"trucks",name:"device",value:"trucks","onUpdate:modelValue":o[7]||(o[7]=function(e){return(0,n.SU)(V).type=e})},null,512),[[n.G2,(0,n.SU)(V).type]]),j])])]),(0,n._)("div",U,[(0,n._)("button",{type:"submit",disabled:(0,n.SU)(P),class:(0,n.C_)([(0,n.SU)(P)?"opacity-50":"","w-24 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-500 ml-3 text-sm"])},(0,n.zw)(t.$t("buttons.save")),11,O),(0,n._)("button",{onClick:o[8]||(o[8]=function(){return(0,n.SU)(z)&&(0,n.SU)(z).apply(void 0,arguments)}),type:"button",class:"mt-3 w-24 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 mt-0 ml-3 text-sm"},(0,n.zw)(t.$t("buttons.cancel")),1)])])],32)])])])):(0,n.kq)("",!0)}}};var L=r(3379),$=r.n(L),E=r(1083),V={insert:"head",singleton:!1};$()(E.Z,V);E.Z.locals;const P=D},7819:(e,t,r)=>{r.r(t),r.d(t,{default:()=>l});var n=r(821),o={xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},a=[(0,n._)("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6 18L18 6M6 6l12 12"},null,-1)];const i={name:"IconCancel"};const l=(0,r(3744).Z)(i,[["render",function(e,t,r,i,l,u){return(0,n.wg)(),(0,n.iD)("svg",o,a)}]])},7285:(e,t,r)=>{r.r(t),r.d(t,{default:()=>l});var n=r(821),o={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 512 512",style:{"enable-background":"new 0 0 512 512"},class:"rounded-full","xml:space":"preserve"},a=[(0,n._)("path",{style:{fill:"#455A64"},d:"M511.676,498.752l-12.8-51.2c-6.073-24.838-24.485-44.813-48.747-52.885l-93.867-31.275\n            c-22.891-9.536-33.365-46.4-35.627-60.395c17.442-14.504,28.665-35.14,31.36-57.664c-0.385-3.847,0.523-7.713,2.581-10.987\n            c3.326-0.833,6.049-3.215,7.317-6.4c6.142-14.872,9.997-30.588,11.435-46.613c0.003-0.871-0.104-1.738-0.32-2.581\n            c-1.528-6.227-5.189-11.722-10.347-15.531v-56.555c0-34.368-10.496-48.469-21.547-56.64C339.004,33.472,321.276,0,255.996,0\n            c-57.917,2.332-104.335,48.75-106.667,106.667v56.555c-5.158,3.809-8.819,9.304-10.347,15.531c-0.216,0.843-0.323,1.711-0.32,2.581\n            c1.436,16.033,5.291,31.756,11.435,46.635c0.924,3.015,3.347,5.334,6.4,6.123c1.195,0.597,3.435,3.691,3.435,11.243\n            c2.711,22.588,13.999,43.271,31.531,57.771c-2.24,13.973-12.651,50.816-34.901,60.117l-94.699,31.445\n            c-24.243,8.071-42.643,28.026-48.725,52.843l-12.8,51.2c-1.449,5.71,2.005,11.514,7.715,12.963c0.853,0.217,1.73,0.327,2.61,0.328\n            h490.667c5.891-0.002,10.665-4.779,10.664-10.67C511.993,500.461,511.886,499.595,511.676,498.752z"},null,-1)];const i={name:"IconProfile"};const l=(0,r(3744).Z)(i,[["render",function(e,t,r,i,l,u){return(0,n.wg)(),(0,n.iD)("svg",o,a)}]])}}]);