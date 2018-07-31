/*!
 * /*
 * * Averto 1.1.0
 * * @homepage https://github.com/mishamyrt/averto#readme
 * * @license MIT
 * * /
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.averto=e():t.averto=e()}(window,function(){return function(t){var e={};function o(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}return o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){"use strict";o.r(e);const n=o(1).toString();const i=t=>{const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null},r=t=>Math.round((299*t.r+587*t.g+114*t.b)/1e3),s=t=>`0px 12px 85px 0px rgba(${t.r}, ${t.g}, ${t.b}, .61)`;o.d(e,"default",function(){return u});const a="is__visible",c="is__blocking",l=(()=>{const t=document.createElement("div");t.innerHTML='<div class="averto-box"><div class="averto-gradient"><span class="averto-title"></span><span class="averto-message"></span></div></div>',t.className="averto";const e=document.createElement("style");return e.innerHTML=n,t.appendChild(e),{container:t,box:t.querySelector(".averto-box"),title:t.querySelector(".averto-title"),message:t.querySelector(".averto-message")}})();class u{static initite(){this.container=l.container,this.box=l.box,this.title=l.title,this.message=l.message,this.visible=!1,document.body.appendChild(this.container),window.addEventListener("keydown",t=>{this._keyDown(t)},!0),this.box.onclick=(()=>{this._hide()})}static _keyDown(t){13!==t.keyCode&&27!==t.keyCode||!this.visible||(t.preventDefault(),this._hide())}static _applyParameters(t){const e=i(t.color);this.title.innerText=t.title,this.message.innerText=t.message,this.box.style.boxShadow=s(e),this.box.style.backgroundColor=t.color,this.box.style.color=r(e)>135?"#000":"#FFF",this._setModal(t.blocking)}static _setModal(t){this.blocking=t,this.container.classList.toggle(c,t)}static _parseParameters(t){const e={timeout:3e3,autohide:!0,color:"#F31D2F",title:"",message:"",blocking:!1};for(const o in t)e[o]=t[o];return Object.freeze(e)}static _hide(){requestAnimationFrame(()=>{clearTimeout(this.waiter),this._setModal(!1),this.container.classList.remove(a),this.visible=!1})}static show(t){const e=this._parseParameters(t);this._applyParameters(e),requestAnimationFrame(()=>{this.container.classList.add(a),this.visible=!0,e.autohide&&(this.waiter=setTimeout(()=>{this._hide()},e.timeout))})}}},function(t,e,o){var n=o(2);t.exports="string"==typeof n?n:n.toString()},function(t,e,o){(t.exports=o(3)(!1)).push([t.i,".averto{pointer-events:none;position:fixed;display:flex;top:0;justify-content:center;left:0;width:100%;height:100%}.averto.is__blocking{pointer-events:all}.averto-box{z-index:1000;bottom:85px;position:absolute;display:inline-block;opacity:0;transition:opacity .2s .15s ease-out,transform .5s cubic-bezier(.43,.18,.78,.36);color:#fff;max-width:470px;min-width:270px;border-radius:4px;transform:translateY(150px);margin:0 auto}.averto.is__visible .averto-box{opacity:1;transform:translateY(0);transition:opacity .25s ease-out,transform .5s cubic-bezier(.075,.82,.165,1)}.averto-gradient{pointer-events:all;padding:22px 23px;box-shadow:0 16px 31px -2px rgba(0,0,0,.17);background:linear-gradient(to bottom,rgba(255,255,255,.1) 0%,rgba(0,0,0,.1) 100%)}.averto-message,.averto-title{font-size:1.1em}.averto-title{line-height:1.1em;display:block;font-weight:700}.averto-message,.averto-title{cursor:default}",""])},function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var o=function(t,e){var o=t[1]||"",n=t[3];if(!n)return o;if(e&&"function"==typeof btoa){var i=function(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}(n),r=n.sources.map(function(t){return"/*# sourceURL="+n.sourceRoot+t+" */"});return[o].concat(r).concat([i]).join("\n")}return[o].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+o+"}":o}).join("")},e.i=function(t,o){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},i=0;i<this.length;i++){var r=this[i][0];"number"==typeof r&&(n[r]=!0)}for(i=0;i<t.length;i++){var s=t[i];"number"==typeof s[0]&&n[s[0]]||(o&&!s[2]?s[2]=o:o&&(s[2]="("+s[2]+") and ("+o+")"),e.push(s))}},e}}])});