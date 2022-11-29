import n from"styled-components";import{__makeTemplateObject as e}from"../../node_modules/tslib/tslib.es6.js";import o from"react";import{FormattedMessage as t}from"react-intl";import{useAtomValue as i,useSetAtom as l}from"jotai";import m from"../../common/range-slider.js";import r from"../../common/input-number.js";import a from"../../common/utils/update-style.js";import{mapState as d,selectedLayerIDState as s,styleObjState as c,layerState as p}from"../../atoms/map.js";var f,u,x,v=function(){var n,e,f,u,x=i(d),v=i(s),y=l(c),z=i(p),b=function(n){v&&x&&a(v,x,"zoom",n[0],n[1],y)};return o.createElement(w,null,o.createElement(g,null,o.createElement(t,{id:"zoom_range"})),o.createElement(h,null,o.createElement(r,{min:1,max:20,value:null!==(n=null==z?void 0:z.maxzoom)&&void 0!==n?n:20,onChange:function(n){var e;return b([null!==(e=null==z?void 0:z.minzoom)&&void 0!==e?e:1,n])}}),o.createElement(m,{value:[null!==(e=null==z?void 0:z.minzoom)&&void 0!==e?e:1,null!==(f=null==z?void 0:z.maxzoom)&&void 0!==f?f:20],min:1,max:20,step:1,minStepsBetweenThumbs:0,"aria-label":"Zoom",onValueChange:function(n){return b(n)}}),o.createElement(r,{min:1,max:20,value:null!==(u=null==z?void 0:z.minzoom)&&void 0!==u?u:1,onChange:function(n){var e;return b([n,null!==(e=null==z?void 0:z.maxzoom)&&void 0!==e?e:20])}})))},w=n.div.withConfig({displayName:"zoom-range__Wrapper",componentId:"sc-1tqrxbi-0"})(f||(f=e(["\nwidth: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    padding: 1em 0;\n    gap: 1em;\n"],["\nwidth: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    padding: 1em 0;\n    gap: 1em;\n"]))),g=n.span.withConfig({displayName:"zoom-range__Title",componentId:"sc-1tqrxbi-1"})(u||(u=e(["\n  flex-shrink: 0;\n  width: max-content;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  color: var(--shade-2);\n  font-size: 0.8em;\n"],["\n  flex-shrink: 0;\n  width: max-content;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  color: var(--shade-2);\n  font-size: 0.8em;\n"]))),h=n.div.withConfig({displayName:"zoom-range__Slider",componentId:"sc-1tqrxbi-2"})(x||(x=e(["\n/* flex-grow: 3; */\nwidth: 70%;\ndisplay: flex;\n    flex-direction: row;\n    justify-content: flex-end;\n    align-items: center;\n    gap: 0.5em;\n"],["\n/* flex-grow: 3; */\nwidth: 70%;\ndisplay: flex;\n    flex-direction: row;\n    justify-content: flex-end;\n    align-items: center;\n    gap: 0.5em;\n"])));export{v as default};
//# sourceMappingURL=zoom-range.js.map
