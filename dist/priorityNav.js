/**
  * priorityNav 
  * 
  * v0.0.1
  * @author William Lin
  * @license The MIT License (MIT)
  * https://github.com/ganlanyuan/priorityNav
  *
  * DEPENDENCIES:
  *
  * == IE8 ==
  * html5shiv
  * forEach
  * pageXOffset
  * addEventListener
  *
  * == all ==
  * remove
  * classlist
  * Length.js
  * getOuterWidth
  * isNodeList
  * prepend
  * append
  * requestAnimationFrame
  * optimizedResize
  * extend
  */
!function(t){window.priorityNav=t()}(function(){"use strict";function t(t){t=gn.extend({nav:".priority-nav",button:"more",showAll:0,hideAll:0},t||{});var n=document.querySelectorAll(t.nav);if(0!==n.length)for(var i=n.length;i--;){var s=t;return s.nav=n[i],new e(s)}}function e(t){var e=t.nav,n=e.querySelector("ul"),i=n.children,s,r,o,h,d=document.createDocumentFragment(),a=[],l=[],u=[],g,c,p,f=!1;e.classList.add("js-priority-nav"),this.init=function(){e.querySelector("ul").classList.add("js-nav-visible"),gn.prepend(e,'<button class="js-nav-toggle" data-count="">'+t.button+"</button>"),gn.append(e,'<ul class="js-nav-hidden is-hidden"></ul>'),s=e.querySelector(".js-nav-hidden"),r=s.children,o=e.querySelector(".js-nav-toggle"),h=gn.getOuterWidth(o);var n=this;o.addEventListener("click",function(){s.classList.toggle("is-hidden")}),f=!0},this.destory=function(){e.classList.remove("js-priority-nav"),n.classList.remove("js-nav-visible"),s.remove(),o.remove(),f=!1},this.getBreakpoints=function(){for(var t=!1,e=i.length;e--;){t&&(i[e+1].style.display="none");var s=gn.getOuterWidth(n)+1;a.unshift(s),l.unshift(s),t=!0}for(var r=0,o=i.length;o>r;r++)i[r].style.display=""},this.getBreakpoints(),this.prependItemsToFragment=function(){gn.prepend(d,i[l.length-1]),u.unshift(l[l.length-1]),l.splice(-1,1)},this.appendItemsToFragment=function(){gn.append(d,r[0]),l.push(u[0]),u.shift()},this.updateNav=function(){if(this.windowWidth=window.innerWidth,this.outerWidth=gn.getOuterWidth(e),this.outerWidth>=a[a.length-1]||this.windowWidth<t.showAll){if(f){if(u.length>0){for(;u.length>0;)this.appendItemsToFragment();n.appendChild(d)}this.destory()}}else{if(f||this.init(),g=this.outerWidth-h,0===t.hideAll||this.windowWidth>=t.hideAll)if(g<=l[l.length-1]){for(;g<=l[l.length-1];)this.prependItemsToFragment();s.insertBefore(d,s.firstChild)}else{for(r=s.children;g>u[0];)this.appendItemsToFragment();n.appendChild(d)}else{if(u.length===a.length)return;for(;l.length>0;)this.prependItemsToFragment();s.insertBefore(d,s.firstChild)}c=c||0,p=u.length||0,p!==c&&(c=o.getAttribute("data-count"),o.setAttribute("data-count",p))}},this.updateNav();var v=this;gn.optimizedResize.add(function(){v.updateNav()})}return t});