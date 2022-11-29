import{useEffect as n}from"react";function t(t,e){n((function(){function n(n){t.current&&!t.current.contains(n.target)&&e(n)}return document.addEventListener("mousedown",n),function(){document.removeEventListener("mousedown",n)}}),[t])}export{t as default};
//# sourceMappingURL=useOutsideClickHandler.js.map
