import e from"react";import{ReactComponent as o}from"../assets/icons/geom.svg.js";import{ReactComponent as t}from"../assets/icons/point.svg.js";import{ReactComponent as s}from"../assets/icons/line.svg.js";import{ReactComponent as a}from"../assets/icons/polygon.svg.js";var n=function(n){var r=n.data,c=n.color;switch(r){case"point":case"symbol":case"circle":case"multipoint":return e.createElement(t,{color:c});case"linestring":case"line":case"multilinestring":return e.createElement(s,{color:c});case"polygon":case"fill":case"multipolygon":return e.createElement(a,{color:c});default:return e.createElement(o,{color:c})}};export{n as default};
//# sourceMappingURL=geo-icon.js.map
