/**
  * priorityNav native (works with go-native)
  * 
  * v0.1.0
  * @author William Lin
  * @license The MIT License (MIT)
  * https://github.com/ganlanyuan/priorityNav
  */
var priorityNav=function(){"use strict";function t(t){t=gn.extend({nav:".priority-nav",button:"more",showAll:0,hideAll:0},t||{});var e=document.querySelectorAll(t.nav);if(0!==e.length)for(var n=e.length;n--;){var s=t;return s.nav=e[n],new i(s)}}function i(t){this.nav=t.nav,this.visibleContainer=this.nav.querySelector("ul"),this.visibleItems=this.visibleContainer.children,this.fragment=document.createDocumentFragment(),this.buttonContent=t.button,this.showAll=t.showAll,this.hideAll=t.hideAll,this.bp=[],this.bpV=[],this.bpH=[],this.initialized=!1,this.nav.classList.add("js-priority-nav"),this.updateNav();var i=this;gn.optimizedResize.add(function(){i.updateNav()})}return i.prototype={init:function(){this.nav.querySelector("ul").classList.add("js-nav-visible"),gn.prepend(this.nav,'<button class="js-nav-toggle" data-count="">'+this.buttonContent+"</button>"),gn.append(this.nav,'<ul class="js-nav-hidden is-hidden"></ul>'),this.hiddenContainer=this.nav.querySelector(".js-nav-hidden"),this.hiddenItems=this.hiddenContainer.children,this.btn=this.nav.querySelector(".js-nav-toggle"),this.btnWidth=gn.getOuterWidth(this.btn);var t=this;this.btn.addEventListener("click",function(){t.hiddenContainer.classList.toggle("is-hidden")}),this.initialized=!0,this.getBreakpoints()},destory:function(){this.nav.classList.remove("js-priority-nav"),this.visibleContainer.classList.remove("js-nav-visible"),this.hiddenContainer.remove(),this.btn.remove(),this.initialized=!1},getBreakpoints:function(){for(var t=!1,i=this.visibleItems.length;i--;){t&&(this.visibleItems[i+1].style.display="none");var e=gn.getOuterWidth(this.visibleContainer)+1;this.bp.unshift(e),this.bpV.unshift(e),t=!0}for(var n=0,s=this.visibleItems.length;s>n;n++)this.visibleItems[n].style.display=""},prependItemsToFragment:function(){gn.prepend(this.fragment,this.visibleItems[this.bpV.length-1]),this.bpH.unshift(this.bpV[this.bpV.length-1]),this.bpV.splice(-1,1)},appendItemsToFragment:function(){gn.append(this.fragment,this.hiddenItems[0]),this.bpV.push(this.bpH[0]),this.bpH.shift()},updateNav:function(){if(this.windowWidth=window.innerWidth,this.outerWidth=gn.getOuterWidth(this.nav),this.outerWidth>=this.bp[this.bp.length-1]||this.windowWidth<this.showAll){if(this.initialized){if(this.bpH.length>0){for(;this.bpH.length>0;)this.appendItemsToFragment();this.visibleContainer.appendChild(this.fragment)}this.destory()}}else{if(this.initialized||this.init(),this.availableSpace=this.outerWidth-this.btnWidth,0===this.hideAll||this.windowWidth>=this.hideAll)if(this.availableSpace<=this.bpV[this.bpV.length-1]){for(;this.availableSpace<=this.bpV[this.bpV.length-1];)this.prependItemsToFragment();this.hiddenContainer.insertBefore(this.fragment,this.hiddenContainer.firstChild)}else{for(this.hiddenItems=this.hiddenContainer.children;this.availableSpace>this.bpH[0];)this.appendItemsToFragment();this.visibleContainer.appendChild(this.fragment)}else{if(this.bpH.length===this.bp.length)return;for(;this.bpV.length>0;)this.prependItemsToFragment();this.hiddenContainer.insertBefore(this.fragment,this.hiddenContainer.firstChild)}this.currentCount=this.currentCount||0,this.count=this.bpH.length||0,this.count!==this.currentCount&&(this.currentCount=this.btn.getAttribute("data-count"),this.btn.setAttribute("data-count",this.count))}}},t}();