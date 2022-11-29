import e from"styled-components";import{__makeTemplateObject as n,__rest as t,__assign as a}from"../node_modules/tslib/tslib.es6.js";import r,{forwardRef as o,useCallback as i}from"react";import{useIntl as l}from"react-intl";import{toFaDigits as s,toNumberString as u,toEnDigits as m,toNumber as d}from"./utils/index.js";var c,p=o((function(e,n){var o=e.className,c=e.value,p=e.min,f=e.max,v=e.step,g=void 0===v?1:v,x=e.onChange,b=e.as,w=t(e,["className","value","min","max","step","onChange","as"]),y=l(),N=d(c),C=i((function(e){var n=null!=p?p:-1/0,t=null!=f?f:1/0,a=e||0;null==x||x(a<n?n:a>t?t:a)}),[p,f,x]),E=i((function(e){var n=e.target;switch(e.code){case"ArrowUp":C(N+g),n.selectionEnd=n.value.length;break;case"ArrowDown":C(N-g),n.selectionEnd=n.value.length}}),[N,C]),I=(Math.round(100*((null!=N?N:10)+Number.EPSILON))/100).toFixed(1).replace(/[.,]0$/,"");return r.createElement(h,a({ref:n,as:b,className:o},null!=w?w:{},{value:"en"===y.locale?I:s(I),onChange:function(e){C(parseFloat(u(m(e.target.value))))},onKeyUp:function(e){return E(e)}}))})),h=e.input.withConfig({displayName:"input-number__StyledInput",componentId:"sc-1pxx0zn-0"})(c||(c=n(["\n  width: 2em;\n  height: 2em;\n  text-align: center;\n  border: 1px solid var(--shade-3);\n  border-radius: var(--radius-4);\n  font-family: inherit;\n"],["\n  width: 2em;\n  height: 2em;\n  text-align: center;\n  border: 1px solid var(--shade-3);\n  border-radius: var(--radius-4);\n  font-family: inherit;\n"])));export{p as default};
//# sourceMappingURL=input-number.js.map
