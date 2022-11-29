import e from"styled-components";import{__makeTemplateObject as n,__read as t,__spreadArray as o}from"../../node_modules/tslib/tslib.es6.js";import l,{memo as r,useState as a,useCallback as i,useEffect as m}from"react";import{useAtomValue as c,useSetAtom as u}from"jotai";import{useIntl as s,FormattedMessage as d}from"react-intl";import p from"../../common/section-tab.js";import v from"../../common/input-number.js";import{PageSwitch as f,Page as g}from"../../common/page-switch.js";import{Row as E,Column as b}from"../../common/styles.js";import y from"../../common/color-picker.js";import h from"../../common/gradiant.js";import{splitArray as z,toFaDigits as j}from"../../common/utils/index.js";import C from"../../common/utils/update-style.js";import x from"../../hooks/useGetStyleKey.js";import{mapState as w,selectedLayerIDState as _,styleObjState as k,layerState as I}from"../../atoms/map.js";import{ReactComponent as q}from"../../assets/icons/plus.svg.js";import{ReactComponent as N}from"../../assets/icons/delete.svg.js";var F,R,S,T,K,W=[{id:"linear"},{id:"exponential",disabled:!1},{id:"cubic-bezier",disabled:!1}],X=r((function(e){var n,r,F=e.type,R=s(),S=c(w),T=c(_),K=u(k),X=c(I),P=x(F),U=P.styleKey,A=P.property,H=t(a([]),2),J=H[0],L=H[1],O=t(a(.5),2),Q=O[0],V=O[1],Z=t(a([[1,1],[1,1]]),2),$=Z[0],ee=Z[1],ne=t(a((function(){return null==W?void 0:W.filter((function(e){return!e.disabled})).slice(0)[0].id})),2),te=ne[0],oe=ne[1],le=i((function(e){var n;return(null===(n=W.find((function(n){return n.id===e})))||void 0===n?void 0:n.disabled)?void 0:oe(e)}),[W]);m((function(){var e=re(J);me(e)}),[te]),m((function(){var e,n,t,o,l=null===(e=null==X?void 0:X[U])||void 0===e?void 0:e[A],r=null!==(n=null==X?void 0:X.minzoom)&&void 0!==n?n:1,a=null!==(t=null==X?void 0:X.maxzoom)&&void 0!==t?t:20;"interpolate"===(null==l?void 0:l[0])?("exponential"===(null==l?void 0:l[1][0])?V(null==l?void 0:l[1][1]):"cubic-bezier"===(null==l?void 0:l[1][0])&&ee(z(null===(o=l[1])||void 0===o?void 0:o.slice(1),2)),oe(null==l?void 0:l[1][0]),L(z(null==l?void 0:l.slice(3),2))):L([[r,null!=l?l:["color","stroke-color"].includes(F)?"#C11010":1],[a,["color","stroke-color"].includes(F)?"#000000":1]])}),[X,A,U]);var re=i((function(e){return o(["interpolate","cubic-bezier"===te?[te].concat($.flat()):"exponential"===te?[te].concat([Q]):[te],["zoom"]],t(e.flat()),!1)}),[te,$,Q]),ae=i((function(e){return o(["interpolate",[te].concat([e]),["zoom"]],t(J.flat()),!1)}),[te,J]),ie=i((function(e){return o(["interpolate",[te].concat(e.flat()),["zoom"]],t(J.flat()),!1)}),[te,J]),me=i((function(e){T&&S&&A&&U&&J.length>0&&C(T,S,U,A,e,K)}),[T,S,U,A]);return l.createElement(b,{style:{width:"100%"}},l.createElement(Y,null,l.createElement(p,{tabs:W,align:"center",activeTabId:te,onTabChange:le,secondry:!0})),l.createElement(f,{pageId:te},l.createElement(g,{id:"linear"},l.createElement(l.Fragment,null)),l.createElement(g,{id:"exponential"},l.createElement(b,null,l.createElement(G,null,l.createElement(M,null,"*"),l.createElement(d,{id:"expo_desc"})),l.createElement(G,{style:{justifyContent:"space-between"}},l.createElement(d,{id:"expo_power"}),l.createElement(B,{style:{direction:"ltr",gap:"0.2em"}},"fa"===R.locale?j(2):2," ^"," ",l.createElement(v,{min:0,max:2,value:Q,onChange:function(e){var n=ae(e);me(n)}}))))),l.createElement(g,{id:"cubic-bezier"},l.createElement(b,null,l.createElement(G,null,l.createElement(M,null,"*"),l.createElement(d,{id:"cubic_desc"})),l.createElement(E,{style:{direction:"ltr"}},l.createElement(B,null,"X1:"," ",l.createElement(v,{min:0,max:1,value:$[0][0],onChange:function(e){ie([[e,$[0][1]],$[1]]);var n=ie([[e,$[0][1]],$[1]]);me(n)}}),"Y1:"," ",l.createElement(v,{min:0,max:1,value:$[0][1],onChange:function(e){var n=ie([[$[0][0],e],$[1]]);me(n)}})),l.createElement(B,null,"X2:"," ",l.createElement(v,{min:0,max:1,value:$[1][0],onChange:function(e){ie([$[0],[e,$[1][1]]]);var n=ie([$[0],[e,$[1][1]]]);me(n)}}),"Y2:"," ",l.createElement(v,{min:0,max:1,value:$[1][1],onChange:function(e){ie([$[0],[$[1][0],e]]);var n=ie([$[0],[$[1][0],e]]);me(n)}})))))),l.createElement(b,null,l.createElement(D,null,["color","stroke-color"].includes(F)?l.createElement(h,{pairs:J,min:null!==(n=null==X?void 0:X.minzoom)&&void 0!==n?n:1,max:null!==(r=null==X?void 0:X.maxzoom)&&void 0!==r?r:20,disabled:!0}):l.createElement(G,null,l.createElement(M,null,"*"),l.createElement(d,{id:"size"})," : ",l.createElement(d,{id:"zoom"})),l.createElement(q,{style:{cursor:"pointer"},color:"var(--color-primary)",onClick:function(){var e=o([],t(J),!1);e.push([Math.floor((e[0][0]+e[1][0])/2),["color","stroke-color"].includes(F)?"#FFB800":1]);var n=re(e.sort((function(e,n){return e[0]-n[0]})));me(n)}})),null==J?void 0:J.map((function(e,n){var r,a;return l.createElement(D,{key:n},l.createElement(B,null,["color","stroke-color"].includes(F)?l.createElement(y,{value:null==e?void 0:e[1],onChange:function(e){var l=o([],t(J),!1);l[n]=[l[n][0],e.target.value.toUpperCase()];var r=re(l);me(r)}}):l.createElement(v,{value:null==e?void 0:e[1],onChange:function(e){var l=o([],t(J),!1);l[n]=[l[n][0],e];var r=re(l);me(r)}})," ",":",l.createElement(v,{min:null!==(r=null==X?void 0:X.minzoom)&&void 0!==r?r:1,max:null!==(a=null==X?void 0:X.maxzoom)&&void 0!==a?a:20,value:null==e?void 0:e[0],onChange:function(e){var l=o([],t(J),!1);l[n]=[e,l[n][1]];var r=re(l);me(r)}})," "),l.createElement(N,{style:{cursor:J.length<3?"not-allowed":"pointer"},color:J.length<3?"var(--shade-3)":"var(--color-primary)",onClick:function(){if(!(J.length<3)){var e=null==J?void 0:J.filter((function(e,t){return n!==t})),t=re(e);me(t)}}}))}))))})),Y=e.div.withConfig({displayName:"zoom-base__TabWrapper",componentId:"sc-bqmf6w-0"})(F||(F=n(["\n  align-self: center;\n  background: var(--light-1);\n  padding: 0.5em;\n  border-radius: var(--radius-4);\n"],["\n  align-self: center;\n  background: var(--light-1);\n  padding: 0.5em;\n  border-radius: var(--radius-4);\n"]))),B=e(E).withConfig({displayName:"zoom-base__PairsWrap",componentId:"sc-bqmf6w-1"})(R||(R=n(["\n  justify-content: start;\n  gap: 1em;\n  padding: 0;\n"],["\n  justify-content: start;\n  gap: 1em;\n  padding: 0;\n"]))),D=e(E).withConfig({displayName:"zoom-base__StyledRow",componentId:"sc-bqmf6w-2"})(S||(S=n(["\n  padding: 0.3em 0;\n"],["\n  padding: 0.3em 0;\n"]))),G=e(E).withConfig({displayName:"zoom-base__Description",componentId:"sc-bqmf6w-3"})(T||(T=n(["\n  justify-content: start;\n  gap: 0.3em;\n  font-size: smaller;\n  font-weight: 300;\n  padding: 0;\n  color: var(--shade-1);\n  text-align: justify;\n"],["\n  justify-content: start;\n  gap: 0.3em;\n  font-size: smaller;\n  font-weight: 300;\n  padding: 0;\n  color: var(--shade-1);\n  text-align: justify;\n"]))),M=e.span.withConfig({displayName:"zoom-base__Star",componentId:"sc-bqmf6w-4"})(K||(K=n(["\n  color: var(--color-primary);\n"],["\n  color: var(--color-primary);\n"])));export{X as default};
//# sourceMappingURL=zoom-base.js.map
