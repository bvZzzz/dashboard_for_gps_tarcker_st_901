"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7021,8003,6790,5776,2210],{8003:(e,t,a)=>{a.r(t),a.d(t,{default:()=>u});var n=a(821),r={class:"text-xs text-red-600"};const u={__name:"InputError",props:{message:{type:String}},setup:function(e){return function(t,a){return(0,n.wy)(((0,n.wg)(),(0,n.iD)("div",null,[(0,n._)("p",r,(0,n.zw)(e.message),1)],512)),[[n.F8,e.message]])}}}},6790:(e,t,a)=>{a.r(t),a.d(t,{default:()=>l});var n=a(821),r={class:"block text-sm font-medium text-gray-700"},u={key:0},s={key:1};const l={__name:"InputLabel",props:{value:{type:String}},setup:function(e){return function(t,a){return(0,n.wg)(),(0,n.iD)("label",r,[e.value?((0,n.wg)(),(0,n.iD)("span",u,(0,n.zw)(e.value),1)):((0,n.wg)(),(0,n.iD)("span",s,[(0,n.WI)(t.$slots,"default")]))])}}}},5776:(e,t,a)=>{a.r(t),a.d(t,{default:()=>s});var n=a(821),r={class:"inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"};const u={},s=(0,a(3744).Z)(u,[["render",function(e,t){return(0,n.wg)(),(0,n.iD)("button",r,[(0,n.WI)(e.$slots,"default")])}]])},2210:(e,t,a)=>{a.r(t),a.d(t,{default:()=>u});var n=a(821),r=["value"];const u={__name:"TextInput",props:{modelValue:{type:[String,Number],required:!0}},emits:["update:modelValue"],setup:function(e,t){var a=t.expose,u=(0,n.iH)(null);return(0,n.bv)((function(){u.value.hasAttribute("autofocus")&&u.value.focus()})),a({focus:function(){return u.value.focus()}}),function(t,a){return(0,n.wg)(),(0,n.iD)("input",{class:"shadow-sm text-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md h-10 px-3",value:e.modelValue,onInput:a[0]||(a[0]=function(e){return t.$emit("update:modelValue",e.target.value)}),ref_key:"input",ref:u},null,40,r)}}}},7021:(e,t,a)=>{a.r(t),a.d(t,{default:()=>g});var n=a(821),r=a(8003),u=a(6790),s=a(5776),l=a(2210),i=a(7879),o=(0,n._)("header",null,[(0,n._)("h2",{class:"text-lg font-medium text-gray-900"},"Profile Information"),(0,n._)("p",{class:"mt-1 text-sm text-gray-600"}," Update your account's profile information and email address. ")],-1),m={key:0},d={class:"text-sm mt-2 text-gray-800"},c={class:"mt-2 font-medium text-sm text-green-600"},f={class:"flex items-center gap-4"},p={key:0,class:"text-sm text-gray-600"};const g={__name:"UpdateProfileInformationForm",props:{mustVerifyEmail:{type:Boolean},status:{type:String}},setup:function(e){var t=(0,i.qt)().props.auth.user,a=(0,i.cI)({name:t.name,email:t.email});return function(g,v){return(0,n.wg)(),(0,n.iD)("section",null,[o,(0,n._)("form",{onSubmit:v[2]||(v[2]=(0,n.iM)((function(e){return(0,n.SU)(a).patch(g.route("profile.update"))}),["prevent"])),class:"mt-6 space-y-6"},[(0,n._)("div",null,[(0,n.Wm)(u.default,{for:"name",value:"Name"}),(0,n.Wm)(l.default,{id:"name",type:"text",class:"mt-1 block w-full",modelValue:(0,n.SU)(a).name,"onUpdate:modelValue":v[0]||(v[0]=function(e){return(0,n.SU)(a).name=e}),required:"",autofocus:"",autocomplete:"name"},null,8,["modelValue"]),(0,n.Wm)(r.default,{class:"mt-2",message:(0,n.SU)(a).errors.name},null,8,["message"])]),(0,n._)("div",null,[(0,n.Wm)(u.default,{for:"email",value:"Email"}),(0,n.Wm)(l.default,{id:"email",type:"email",class:"mt-1 block w-full",modelValue:(0,n.SU)(a).email,"onUpdate:modelValue":v[1]||(v[1]=function(e){return(0,n.SU)(a).email=e}),required:"",autocomplete:"username"},null,8,["modelValue"]),(0,n.Wm)(r.default,{class:"mt-2",message:(0,n.SU)(a).errors.email},null,8,["message"])]),e.mustVerifyEmail&&null===(0,n.SU)(t).email_verified_at?((0,n.wg)(),(0,n.iD)("div",m,[(0,n._)("p",d,[(0,n.Uk)(" Your email address is unverified. "),(0,n.Wm)((0,n.SU)(i.rU),{href:g.route("verification.send"),method:"post",as:"button",class:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"},{default:(0,n.w5)((function(){return[(0,n.Uk)(" Click here to re-send the verification email. ")]})),_:1},8,["href"])]),(0,n.wy)((0,n._)("div",c," A new verification link has been sent to your email address. ",512),[[n.F8,"verification-link-sent"===e.status]])])):(0,n.kq)("",!0),(0,n._)("div",f,[(0,n.Wm)(s.default,{disabled:(0,n.SU)(a).processing},{default:(0,n.w5)((function(){return[(0,n.Uk)("Save")]})),_:1},8,["disabled"]),(0,n.Wm)(n.uT,{"enter-active-class":"transition ease-in-out","enter-from-class":"opacity-0","leave-active-class":"transition ease-in-out","leave-to-class":"opacity-0"},{default:(0,n.w5)((function(){return[(0,n.SU)(a).recentlySuccessful?((0,n.wg)(),(0,n.iD)("p",p,"Saved.")):(0,n.kq)("",!0)]})),_:1})])],32)])}}}}}]);