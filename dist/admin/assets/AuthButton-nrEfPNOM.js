import{u as f,j as n}from"./index-BMoS0DUA.js";import{r as j}from"./index-TNyY8g-O.js";const l={set(e,t){localStorage.setItem(e,JSON.stringify(t))},get(e){const t=localStorage.getItem(e);if(!t)return"";try{return JSON.parse(t)}catch{return""}},remove(e){localStorage.removeItem(e)},clear(){localStorage.clear()}},s=window.antd.Button;function I({authCode:e,authScript:t,...r}){var a;const{projectId:o,pageId:u,id:c}=f(),m=l.get("buttons")||[],g=l.get("pageMap"),d=o+"_"+((a=g[Number(u)])==null?void 0:a.id)+"_"+e;return!e||c&&!window.microApp||o&&e&&m.find(i=>i.code===d)?n.jsx(s,{...r,onClick:r.onClick,children:r.children}):t&&c?j(t.value,{authCode:e})?n.jsx(s,{...r,onClick:r.onClick,children:r.children}):null:n.jsx(n.Fragment,{})}export{I as A};
