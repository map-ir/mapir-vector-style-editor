import{__assign as e}from"../../node_modules/tslib/tslib.es6.js";var r=function(r,t,n,a,l,o){if(r&&t){switch(n){case"layout":null==t||t.setLayoutProperty(r,a,l);break;case"paint":null==t||t.setPaintProperty(r,a,l);break;case"zoom":null==t||t.setLayerZoomRange(r,a,l)}o((function(t){var o,i,s;if(!t)return null;var u=null===(s=t.layers)||void 0===s?void 0:s.filter((function(e){return e.id===r})),c=t.layers.findIndex((function(e){return e.id===u[0].id})),d=[].concat(t.layers);return d[c]=e(e({},u[0]),((o={})[n]=e(e({},u[0][n]),((i={})[a]=l,i)),o)),e(e({},t),{layers:d})}))}};export{r as default};
//# sourceMappingURL=update-style.js.map
