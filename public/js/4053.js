"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4053],{4053:(e,t,s)=>{s.r(t),s.d(t,{default:()=>d});var u=s(821),o=["value"],n=["value","disabled"];const i={props:{value:"",options:Object,default:Object},setup:function(e){return{dis:void 0!==e.default&&Object.keys(e.default).length}},mounted:function(){void 0!==this.$props.default&&Object.keys(this.$props.default).length>0&&this.$props.options.unshift(this.$props.default)},unmounted:function(){void 0!==this.$props.default&&Object.keys(this.$props.default).length>0&&this.$props.options.splice(0,1)}};const d=(0,s(3744).Z)(i,[["render",function(e,t,s,i,d,r){return(0,u.wg)(),(0,u.iD)("select",{onInput:t[0]||(t[0]=function(t){return e.$emit("update:value",t.target.value)}),value:s.value,class:"shadow-sm text-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md h-10 px-3"},[((0,u.wg)(!0),(0,u.iD)(u.HY,null,(0,u.Ko)(s.options,(function(e,t){return(0,u.wg)(),(0,u.iD)("option",{value:e.id,key:t,disabled:0===t&&s.value===t&&i.dis},(0,u.zw)(e.name),9,n)})),128))],40,o)}]])}}]);