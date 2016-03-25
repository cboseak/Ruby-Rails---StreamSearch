/*!

Holder - 2.3.2 - client side image placeholders
(c) 2012-2014 Ivan Malopinsky / http://imsky.co

Provided under the MIT License.
Commercial use requires attribution.

*/
var Holder=Holder||{};!function(t,e){function i(t,e,i){e=parseInt(e,10),t=parseInt(t,10);var n=Math.max(e,t),a=Math.min(e,t),o=1/12,r=Math.min(.75*a,.75*n*o);return{height:Math.round(Math.max(i.size,r))}}function n(t){var e=[];for(p in t)t.hasOwnProperty(p)&&e.push(p+":"+t[p]);return e.join(";")}function a(t){var e=t.ctx,n=t.dimensions,a=t.template,o=t.ratio,r=t.holder,s="literal"==r.textmode,d="exact"==r.textmode,l=i(n.width,n.height,a),h=l.height,u=n.width*o,c=n.height*o,f=a.font?a.font:"Arial,Helvetica,sans-serif";canvas.width=u,canvas.height=c,e.textAlign="center",e.textBaseline="middle",e.fillStyle=a.background,e.fillRect(0,0,u,c),e.fillStyle=a.foreground,e.font="bold "+h+"px "+f;var g=a.text?a.text:Math.floor(n.width)+"x"+Math.floor(n.height);if(s){var n=r.dimensions;g=n.width+"x"+n.height}else if(d&&r.exact_dimensions){var n=r.exact_dimensions;g=Math.floor(n.width)+"x"+Math.floor(n.height)}var m=e.measureText(g).width;return m/u>=.75&&(h=Math.floor(.75*h*(u/m))),e.font="bold "+h*o+"px "+f,e.fillText(g,u/2,c/2,u),canvas.toDataURL("image/png")}function o(t){var e=t.dimensions,n=t.template,a=t.holder,o="literal"==a.textmode,r="exact"==a.textmode,s=i(e.width,e.height,n),d=s.height,l=e.width,h=e.height,u=n.font?n.font:"Arial,Helvetica,sans-serif",c=n.text?n.text:Math.floor(e.width)+"x"+Math.floor(e.height);if(o){var e=a.dimensions;c=e.width+"x"+e.height}else if(r&&a.exact_dimensions){var e=a.exact_dimensions;c=Math.floor(e.width)+"x"+Math.floor(e.height)}var f=E({text:c,width:l,height:h,text_height:d,font:u,template:n});return"data:image/svg+xml;base64,"+btoa(unescape(encodeURIComponent(f)))}function r(t){return x.use_canvas&&!x.use_svg?a(t):o(t)}function s(t,e,i,n){var a=i.dimensions,o=i.theme,s=i.text?decodeURIComponent(i.text):i.text,d=a.width+"x"+a.height;o=s?g(o,{text:s}):o,o=i.font?g(o,{font:i.font}):o,e.setAttribute("data-src",n),i.theme=o,e.holder_data=i,"image"==t?(e.setAttribute("alt",s?s:o.text?o.text+" ["+d+"]":d),(x.use_fallback||!i.auto)&&(e.style.width=a.width+"px",e.style.height=a.height+"px"),x.use_fallback?e.style.backgroundColor=o.background:(e.setAttribute("src",r({ctx:_,dimensions:a,template:o,ratio:k,holder:i})),i.textmode&&"exact"==i.textmode&&(y.push(e),h(e)))):"background"==t?x.use_fallback||(e.style.backgroundImage="url("+r({ctx:_,dimensions:a,template:o,ratio:k,holder:i})+")",e.style.backgroundSize=a.width+"px "+a.height+"px"):"fluid"==t&&(e.setAttribute("alt",s?s:o.text?o.text+" ["+d+"]":d),"%"==a.height.slice(-1)?e.style.height=a.height:null!=i.auto&&i.auto||(e.style.height=a.height+"px"),"%"==a.width.slice(-1)?e.style.width=a.width:null!=i.auto&&i.auto||(e.style.width=a.width+"px"),("inline"==e.style.display||""===e.style.display||"none"==e.style.display)&&(e.style.display="block"),l(e),x.use_fallback?e.style.backgroundColor=o.background:(y.push(e),h(e)))}function d(t,e){var i={height:t.clientHeight,width:t.clientWidth};return i.height||i.width?(t.removeAttribute("data-holder-invisible"),i):(t.setAttribute("data-holder-invisible",!0),void e.call(this,t))}function l(e){if(e.holder_data){var i=d(e,t.invisible_error_fn(l));if(i){var n=e.holder_data;n.initial_dimensions=i,n.fluid_data={fluid_height:"%"==n.dimensions.height.slice(-1),fluid_width:"%"==n.dimensions.width.slice(-1),mode:null},n.fluid_data.fluid_width&&!n.fluid_data.fluid_height?(n.fluid_data.mode="width",n.fluid_data.ratio=n.initial_dimensions.width/parseFloat(n.dimensions.height)):!n.fluid_data.fluid_width&&n.fluid_data.fluid_height&&(n.fluid_data.mode="height",n.fluid_data.ratio=parseFloat(n.dimensions.width)/n.initial_dimensions.height)}}}function h(e){var i;i=null==e.nodeType?y:[e];for(var n in i)if(i.hasOwnProperty(n)){var a=i[n];if(a.holder_data){var o=a.holder_data,s=d(a,t.invisible_error_fn(h));if(s){if(o.fluid){if(o.auto)switch(o.fluid_data.mode){case"width":s.height=s.width/o.fluid_data.ratio;break;case"height":s.width=s.height*o.fluid_data.ratio}a.setAttribute("src",r({ctx:_,dimensions:s,template:o.theme,ratio:k,holder:o}))}o.textmode&&"exact"==o.textmode&&(o.exact_dimensions=s,a.setAttribute("src",r({ctx:_,dimensions:o.dimensions,template:o.theme,ratio:k,holder:o})))}}}}function u(e,i){for(var n={theme:g(A.themes.gray,{})},a=!1,o=e.length,r=0;o>r;r++){var s=e[r];t.flags.dimensions.match(s)?(a=!0,n.dimensions=t.flags.dimensions.output(s)):t.flags.fluid.match(s)?(a=!0,n.dimensions=t.flags.fluid.output(s),n.fluid=!0):t.flags.textmode.match(s)?n.textmode=t.flags.textmode.output(s):t.flags.colors.match(s)?n.theme=t.flags.colors.output(s):i.themes[s]?i.themes.hasOwnProperty(s)&&(n.theme=g(i.themes[s],{})):t.flags.font.match(s)?n.font=t.flags.font.output(s):t.flags.auto.match(s)?n.auto=!0:t.flags.text.match(s)&&(n.text=t.flags.text.output(s))}return a?n:!1}function c(t,e){var i="complete",n="readystatechange",a=!1,o=a,r=!0,s=t.document,d=s.documentElement,l=s.addEventListener?"addEventListener":"attachEvent",h=s.addEventListener?"removeEventListener":"detachEvent",u=s.addEventListener?"":"on",c=function(r){(r.type!=n||s.readyState==i)&&(("load"==r.type?t:s)[h](u+r.type,c,a),!o&&(o=!0)&&e.call(t,null))},f=function(){try{d.doScroll("left")}catch(t){return void setTimeout(f,50)}c("poll")};if(s.readyState==i)e.call(t,"lazy");else{if(s.createEventObject&&d.doScroll){try{r=!t.frameElement}catch(g){}r&&f()}s[l](u+"DOMContentLoaded",c,a),s[l](u+n,c,a),t[l](u+"load",c,a)}}function f(t,e){var t=t.match(/^(\W)?(.*)/),e=e||document,i=e["getElement"+(t[1]?"#"==t[1]?"ById":"sByClassName":"sByTagName")],n=i.call(e,t[2]),a=[];return null!==n&&(a=n.length||0===n.length?n:[n]),a}function g(t,e){var i={};for(var n in t)t.hasOwnProperty(n)&&(i[n]=t[n]);for(var n in e)e.hasOwnProperty(n)&&(i[n]=e[n]);return i}var m={use_svg:!1,use_canvas:!1,use_fallback:!1},x={},w=!1;canvas=document.createElement("canvas");var v=1,b=1,y=[];if(canvas.getContext)if(canvas.toDataURL("image/png").indexOf("data:image/png")<0)m.use_fallback=!0;else var _=canvas.getContext("2d");else m.use_fallback=!0;document.createElementNS&&document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect&&(m.use_svg=!0,m.use_canvas=!1),m.use_fallback||(v=window.devicePixelRatio||1,b=_.webkitBackingStorePixelRatio||_.mozBackingStorePixelRatio||_.msBackingStorePixelRatio||_.oBackingStorePixelRatio||_.backingStorePixelRatio||1);var k=v/b,A={domain:"holder.js",images:"img",bgnodes:".holderjs",themes:{gray:{background:"#eee",foreground:"#aaa",size:12},social:{background:"#3a5a97",foreground:"#fff",size:12},industrial:{background:"#434A52",foreground:"#C2F200",size:12},sky:{background:"#0D8FDB",foreground:"#fff",size:12},vine:{background:"#39DBAC",foreground:"#1E292C",size:12},lava:{background:"#F8591A",foreground:"#1C2846",size:12}},stylesheet:""};t.flags={dimensions:{regex:/^(\d+)x(\d+)$/,output:function(t){var e=this.regex.exec(t);return{width:+e[1],height:+e[2]}}},fluid:{regex:/^([0-9%]+)x([0-9%]+)$/,output:function(t){var e=this.regex.exec(t);return{width:e[1],height:e[2]}}},colors:{regex:/#([0-9a-f]{3,})\:#([0-9a-f]{3,})/i,output:function(t){var e=this.regex.exec(t);return{size:A.themes.gray.size,foreground:"#"+e[2],background:"#"+e[1]}}},text:{regex:/text\:(.*)/,output:function(t){return this.regex.exec(t)[1]}},font:{regex:/font\:(.*)/,output:function(t){return this.regex.exec(t)[1]}},auto:{regex:/^auto$/},textmode:{regex:/textmode\:(.*)/,output:function(t){return this.regex.exec(t)[1]}}};var E=function(){if(window.XMLSerializer){var t=new XMLSerializer,e="http://www.w3.org/2000/svg",i=document.createElementNS(e,"svg");i.webkitMatchesSelector&&i.setAttribute("xmlns","http://www.w3.org/2000/svg");var a=document.createElementNS(e,"rect"),o=document.createElementNS(e,"text"),r=document.createTextNode(null);return o.setAttribute("text-anchor","middle"),o.appendChild(r),i.appendChild(a),i.appendChild(o),function(e){return i.setAttribute("width",e.width),i.setAttribute("height",e.height),a.setAttribute("width",e.width),a.setAttribute("height",e.height),a.setAttribute("fill",e.template.background),o.setAttribute("x",e.width/2),o.setAttribute("y",e.height/2),r.nodeValue=e.text,o.setAttribute("style",n({fill:e.template.foreground,"font-weight":"bold","font-size":e.text_height+"px","font-family":e.font,"dominant-baseline":"central"})),t.serializeToString(i)}}}();for(var S in t.flags)t.flags.hasOwnProperty(S)&&(t.flags[S].match=function(t){return t.match(this.regex)});t.invisible_error_fn=function(t){return function(t){if(t.hasAttribute("data-holder-invisible"))throw new Error("Holder: invisible placeholder")}},t.add_theme=function(e,i){return null!=e&&null!=i&&(A.themes[e]=i),t},t.add_image=function(e,i){var n=f(i);if(n.length)for(var a=0,o=n.length;o>a;a++){var r=document.createElement("img");r.setAttribute("data-src",e),n[a].appendChild(r)}return t},t.run=function(e){x=g({},m),w=!0;var i=g(A,e),n=[],a=[],o=[];for(null!=i.use_canvas&&i.use_canvas&&(x.use_canvas=!0,x.use_svg=!1),"string"==typeof i.images?a=f(i.images):window.NodeList&&i.images instanceof window.NodeList?a=i.images:window.Node&&i.images instanceof window.Node?a=[i.images]:window.HTMLCollection&&i.images instanceof window.HTMLCollection&&(a=i.images),"string"==typeof i.bgnodes?o=f(i.bgnodes):window.NodeList&&i.elements instanceof window.NodeList?o=i.bgnodes:window.Node&&i.bgnodes instanceof window.Node&&(o=[i.bgnodes]),h=0,l=a.length;l>h;h++)n.push(a[h]);var r=document.getElementById("holderjs-style");r||(r=document.createElement("style"),r.setAttribute("id","holderjs-style"),r.type="text/css",document.getElementsByTagName("head")[0].appendChild(r)),i.nocss||(r.styleSheet?r.styleSheet.cssText+=i.stylesheet:i.stylesheet.length&&r.appendChild(document.createTextNode(i.stylesheet)));for(var d=new RegExp(i.domain+'/(.*?)"?\\)'),l=o.length,h=0;l>h;h++){var c=window.getComputedStyle(o[h],null).getPropertyValue("background-image"),p=c.match(d),v=o[h].getAttribute("data-background-src");if(p){var b=u(p[1].split("/"),i);b&&s("background",o[h],b,c)}else if(null!=v){var b=u(v.substr(v.lastIndexOf(i.domain)+i.domain.length+1).split("/"),i);b&&s("background",o[h],b,c)}}for(l=n.length,h=0;l>h;h++){var y,_;_=y=c=null;try{_=n[h].getAttribute("src"),attr_datasrc=n[h].getAttribute("data-src")}catch(k){}if(null==attr_datasrc&&_&&_.indexOf(i.domain)>=0?c=_:attr_datasrc&&attr_datasrc.indexOf(i.domain)>=0&&(c=attr_datasrc),c){var b=u(c.substr(c.lastIndexOf(i.domain)+i.domain.length+1).split("/"),i);b&&(b.fluid?s("fluid",n[h],b,c):s("image",n[h],b,c))}}return t},c(e,function(){window.addEventListener?(window.addEventListener("resize",h,!1),window.addEventListener("orientationchange",h,!1)):window.attachEvent("onresize",h),w||t.run({}),"object"==typeof window.Turbolinks&&document.addEventListener("page:change",function(){t.run({})})}),"function"==typeof define&&define.amd&&define([],function(){return t}),function(){function t(t){this.message=t}var e="undefined"!=typeof exports?exports:this,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";t.prototype=Error(),t.prototype.name="InvalidCharacterError",e.btoa||(e.btoa=function(e){for(var n,a,o=0,r=i,s="";e.charAt(0|o)||(r="=",o%1);s+=r.charAt(63&n>>8-8*(o%1))){if(a=e.charCodeAt(o+=.75),a>255)throw new t("'btoa' failed");n=n<<8|a}return s}),e.atob||(e.atob=function(e){if(e=e.replace(/=+$/,""),1==e.length%4)throw new t("'atob' failed");for(var n,a,o=0,r=0,s="";a=e.charAt(r++);~a&&(n=o%4?64*n+a:a,o++%4)?s+=String.fromCharCode(255&n>>(6&-2*o)):0)a=i.indexOf(a);return s})}(),document.getElementsByClassName||(document.getElementsByClassName=function(t){var e,i,n,a=document,o=[];if(a.querySelectorAll)return a.querySelectorAll("."+t);if(a.evaluate)for(i=".//*[contains(concat(' ', @class, ' '), ' "+t+" ')]",e=a.evaluate(i,a,null,0,null);n=e.iterateNext();)o.push(n);else for(e=a.getElementsByTagName("*"),i=new RegExp("(^|\\s)"+t+"(\\s|$)"),n=0;n<e.length;n++)i.test(e[n].className)&&o.push(e[n]);return o}),window.getComputedStyle||(window.getComputedStyle=function(t){return this.el=t,this.getPropertyValue=function(e){var i=/(\-([a-z]){1})/g;return"float"==e&&(e="styleFloat"),i.test(e)&&(e=e.replace(i,function(){return arguments[2].toUpperCase()})),t.currentStyle[e]?t.currentStyle[e]:null},this}),Object.prototype.hasOwnProperty||(Object.prototype.hasOwnProperty=function(t){var e=this.__proto__||this.constructor.prototype;return t in this&&(!(t in e)||e[t]!==this[t])})}(Holder,window);