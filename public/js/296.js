"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[296],{296:(e,t,n)=>{n.r(t),n.d(t,{default:()=>r});var i=n(821),a={class:"relative"};const r={__name:"Dropdown",props:{align:{type:String,default:"right"},width:{type:String,default:"48"},contentClasses:{type:String,default:"py-1 bg-white"}},setup:function(e){var t=e,n=function(e){o.value&&"Escape"===e.key&&(o.value=!1)};(0,i.bv)((function(){return document.addEventListener("keydown",n)})),(0,i.SK)((function(){return document.removeEventListener("keydown",n)}));var r=(0,i.Fl)((function(){return{48:"w-48"}[t.width.toString()]})),l=(0,i.Fl)((function(){return"left"===t.align?"origin-top-left left-0":"right"===t.align?"origin-top-right right-0":"origin-top"})),o=(0,i.iH)(!1);return function(t,n){return(0,i.wg)(),(0,i.iD)("div",a,[(0,i._)("div",{onClick:n[0]||(n[0]=function(e){return o.value=!o.value})},[(0,i.WI)(t.$slots,"trigger")]),(0,i.wy)((0,i._)("div",{class:"fixed inset-0 z-40",onClick:n[1]||(n[1]=function(e){return o.value=!1})},null,512),[[i.F8,o.value]]),(0,i.Wm)(i.uT,{"enter-active-class":"transition ease-out duration-200","enter-from-class":"opacity-0 scale-95","enter-to-class":"opacity-100 scale-100","leave-active-class":"transition ease-in duration-75","leave-from-class":"opacity-100 scale-100","leave-to-class":"opacity-0 scale-95"},{default:(0,i.w5)((function(){return[(0,i.wy)((0,i._)("div",{class:(0,i.C_)(["absolute z-50 mt-2 rounded-md shadow-lg",[r.value,l.value]]),style:{display:"none"},onClick:n[2]||(n[2]=function(e){return o.value=!1})},[(0,i._)("div",{class:(0,i.C_)(["rounded-md ring-1 ring-black ring-opacity-5",e.contentClasses])},[(0,i.WI)(t.$slots,"content")],2)],2),[[i.F8,o.value]])]})),_:3})])}}}}}]);