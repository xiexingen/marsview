import{j as f}from"./index-BMoS0DUA.js";import{u as y,T as h,g,E as v,C as R}from"./createLoading--5nB-oeg.js";import{u as T,h as b}from"./index-TNyY8g-O.js";import"./_commonjsHelpers-BosuxZz1.js";import"./immer-DZPz5TFl.js";var C=function(e,i){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&i.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,t=Object.getOwnPropertySymbols(e);a<t.length;a++)i.indexOf(t[a])<0&&Object.prototype.propertyIsEnumerable.call(e,t[a])&&(r[t[a]]=e[t[a]]);return r};const p=window.React,E=window.React.useEffect,j=window.React.useImperativeHandle,O=window.React.forwardRef;var x=O(function(e,i){var r=e.chartRef,t=e.style,a=t===void 0?{height:"inherit"}:t,s=e.className,u=e.loading,c=e.loadingTemplate,m=e.errorTemplate,d=C(e,["chartRef","style","className","loading","loadingTemplate","errorTemplate"]),l=y(h,d),n=l.chart,o=l.container;return E(function(){g(r,n.current)},[n.current]),j(i,function(){return{getChart:function(){return n.current}}}),p.createElement(v,{errorTemplate:m},u&&p.createElement(R,{loadingTemplate:c,theme:e.theme}),p.createElement("div",{className:s,style:a,ref:o}))});const S=x,I=window.React.forwardRef,_=window.React.useEffect,N=window.React.useImperativeHandle,w=window.React.useState,$=window.antd.Spin,D=({config:e},i)=>{var l;const[r,t]=w([]),[a,s]=w(!0),[u,c]=w(!0),m=T(n=>n.page.variableData);_(()=>{d({})},[e.api,((l=e.api)==null?void 0:l.sourceType)=="variable"?m:""]);const d=n=>{s(!0),b(e.api,n).then(o=>{(o==null?void 0:o.ret)===0&&(Array.isArray(o.data)?t(o.data):(console.error("[TinyColumn]","data数据格式错误，请检查"),t([]))),s(!1)})};return N(i,()=>({show(){c(!0)},hide(){c(!1)},update:n=>{d(n)}})),u&&f.jsx("div",{style:e.style,children:f.jsx($,{spinning:a,size:"large",wrapperClassName:"spin-loading",children:f.jsx(S,{...e.props,data:r})})})},B=I(D);export{B as TinyColumn};
