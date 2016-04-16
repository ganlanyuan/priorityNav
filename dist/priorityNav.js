/** ChildNode.remove */
if(!("remove" in Element.prototype)){
	Element.prototype.remove = function(){
		if(this.parentNode)
			this.parentNode.removeChild(this);
	};
}


/** DOMTokenList */
!function(){"use strict";var n,r,t,e,i=window,o=document,u=Object,f=null,a=!0,c=!1,l=" ",s="Element",d="create"+s,h="DOMTokenList",m="__defineGetter__",p="defineProperty",v="class",g="List",y=v+g,w="rel",L=w+g,_="div",b="length",j="contains",S="apply",k="HTML",E=("item "+j+" add remove toggle toString toLocaleString").split(l),A=E[2],C=E[3],M=E[4],N="prototype",O=p in u||m in u[N]||f,T=function(n,r,t,e){u[p]?u[p](n,r,{configurable:c===O?a:!!e,get:t}):n[m](r,t)},x=function(r,t){var e=this,i=[],o={},f=0,s=0,d=function(){if(f>=s)for(;f>s;++s)(function(n){T(e,n,function(){return h(),i[n]},c)})(s)},h=function(){var n,e,u=arguments,c=/\s+/;if(u[b])for(e=0;e<u[b];++e)if(c.test(u[e]))throw n=new SyntaxError('String "'+u[e]+'" '+j+" an invalid character"),n.code=5,n.name="InvalidCharacterError",n;for(i=(""+r[t]).replace(/^\s+|\s+$/g,"").split(c),""===i[0]&&(i=[]),o={},e=0;e<i[b];++e)o[i[e]]=a;f=i[b],d()};return h(),T(e,b,function(){return h(),f}),e[E[6]]=e[E[5]]=function(){return h(),i.join(l)},e.item=function(n){return h(),i[n]},e[j]=function(n){return h(),!!o[n]},e[A]=function(){h[S](e,n=arguments);for(var n,u,c=0,s=n[b];s>c;++c)u=n[c],o[u]||(i.push(u),o[u]=a);f!==i[b]&&(f=i[b]>>>0,r[t]=i.join(l),d())},e[C]=function(){h[S](e,n=arguments);for(var n,u={},c=0,s=[];c<n[b];++c)u[n[c]]=a,delete o[n[c]];for(c=0;c<i[b];++c)u[i[c]]||s.push(i[c]);i=s,f=s[b]>>>0,r[t]=i.join(l),d()},e[M]=function(r,t){return h[S](e,[r]),n!==t?t?(e[A](r),a):(e[C](r),c):o[r]?(e[C](r),c):(e[A](r),a)},function(n,r){if(r)for(var t=0;7>t;++t)r(n,E[t],{enumerable:c})}(e,u[p]),e},D=function(n,r,t){T(n[N],r,function(){var n,e=this,i=m+p+r;if(e[i])return n;if(e[i]=a,c===O){for(var u,f=D.mirror=D.mirror||o[d](_),l=f.childNodes,s=l[b],h=0;s>h;++h)if(l[h]._R===e){u=l[h];break}u||(u=f.appendChild(o[d](_))),n=x.call(u,e,t)}else n=new x(e,t);return T(e,r,function(){return n}),delete e[i],n},a)};if(i[h])r=o[d](_)[y],N=i[h][N],r[A][S](r,E),2>r[b]&&(t=N[A],e=N[C],N[A]=function(){for(var n=0,r=arguments;n<r[b];++n)t.call(this,r[n])},N[C]=function(){for(var n=0,r=arguments;n<r[b];++n)e.call(this,r[n])}),r[M](g,c)&&(N[M]=function(r,t){var e=this;return e[(t=n===t?!e[j](r):t)?A:C](r),!!t});else{if(O)try{T({},"support")}catch(G){O=c}x.polyfill=a,i[h]=x,D(i[s],y,v+"Name"),D(i[k+"Link"+s],L,w),D(i[k+"Anchor"+s],L,w),D(i[k+"Area"+s],L,w)}}();


// Adapted from https://gist.github.com/paulirish/1579671 which derived from 
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller.
// Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen Slavič, Darius Bacon

// MIT license

if (!Date.now)
    Date.now = function() { return new Date().getTime(); };

(function() {
    'use strict';
    
    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                   || window[vp+'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() { callback(lastTime = nextTime); },
                              nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());


(function(window, document, undefined){
"use strict";

// create a test element
var testElem = document.createElement('test'),
    docElement = document.documentElement,
    defaultView = document.defaultView,
    getComputedStyle = defaultView && defaultView.getComputedStyle,
    computedValueBug,
    runit = /^(-?[\d+\.\-]+)([a-z]+|%)$/i,
    convert = {},
    conversions = [1/25.4, 1/2.54, 1/72, 1/6],
    units = ['mm', 'cm', 'pt', 'pc', 'in', 'mozmm'],
    i = 6; // units.length

// add the test element to the dom
docElement.appendChild(testElem);

// test for the WebKit getComputedStyle bug
// @see http://bugs.jquery.com/ticket/10639
if (getComputedStyle) {
    // add a percentage margin and measure it
    testElem.style.marginTop = '1%';
    computedValueBug = getComputedStyle(testElem).marginTop === '1%';
}

// pre-calculate absolute unit conversions
while(i--) {
    convert[units[i] + "toPx"] = conversions[i] ? conversions[i] * convert.inToPx : toPx(testElem, '1' + units[i]);
}

// remove the test element from the DOM and delete it
docElement.removeChild(testElem);
testElem = undefined;

// convert a value to pixels
function toPx(elem, value, prop, force) {
    // use width as the default property, or specify your own
    prop = prop || 'width';

    var style,
        inlineValue,
        ret,
        unit = (value.match(runit)||[])[2],
        conversion = unit === 'px' ? 1 : convert[unit + 'toPx'],
        rem = /r?em/i;

    if (conversion || rem.test(unit) && !force) {
        // calculate known conversions immediately
        // find the correct element for absolute units or rem or fontSize + em or em
        elem = conversion ? elem : unit === 'rem' ? docElement : prop === 'fontSize' ? elem.parentNode || elem : elem;

        // use the pre-calculated conversion or fontSize of the element for rem and em
        conversion = conversion || parseFloat(curCSS(elem, 'fontSize'));

        // multiply the value by the conversion
        ret = parseFloat(value) * conversion;
    } else {
        // begin "the awesome hack by Dean Edwards"
        // @see http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

        // remember the current style
        style = elem.style;
        inlineValue = style[prop];

        // set the style on the target element
        try {
            style[prop] = value;
        } catch(e) {
            // IE 8 and below throw an exception when setting unsupported units
            return 0;
        }

        // read the computed value
        // if style is nothing we probably set an unsupported unit
        ret = !style[prop] ? 0 : parseFloat(curCSS(elem, prop));

        // reset the style back to what it was or blank it out
        style[prop] = inlineValue !== undefined ? inlineValue : null;
    }

    // return a number
    return ret;
}

// return the computed value of a CSS property
function curCSS(elem, prop) {
    var value,
        pixel,
        unit,
        rvpos = /^top|bottom/,
        outerProp = ["paddingTop", "paddingBottom", "borderTop", "borderBottom"],
        innerHeight,
        parent,
        i = 4; // outerProp.length
    
    if (getComputedStyle) {
        // FireFox, Chrome/Safari, Opera and IE9+
        value = getComputedStyle(elem)[prop];
    } else if (pixel = elem.style['pixel' + prop.charAt(0).toUpperCase() + prop.slice(1)]) {
        // IE and Opera support pixel shortcuts for top, bottom, left, right, height, width
        // WebKit supports pixel shortcuts only when an absolute unit is used
        value = pixel + 'px';
    } else if (prop === 'fontSize') {
        // correct IE issues with font-size
        // @see http://bugs.jquery.com/ticket/760
        value = toPx(elem, '1em', 'left', 1) + 'px';
    } else {
        // IE 8 and below return the specified style
        value = elem.currentStyle[prop];
    }

    // check the unit
    unit = (value.match(runit)||[])[2];
    if (unit === '%' && computedValueBug) {
        // WebKit won't convert percentages for top, bottom, left, right, margin and text-indent
        if (rvpos.test(prop)) {
            // Top and bottom require measuring the innerHeight of the parent.
            innerHeight = (parent = elem.parentNode || elem).offsetHeight;
            while (i--) {
              innerHeight -= parseFloat(curCSS(parent, outerProp[i]));
            }
            value = parseFloat(value) / 100 * innerHeight + 'px';
        } else {
            // This fixes margin, left, right and text-indent
            // @see https://bugs.webkit.org/show_bug.cgi?id=29084
            // @see http://bugs.jquery.com/ticket/10639
            value = toPx(elem, value);
        }
    } else if ((value === 'auto' || (unit && unit !== 'px')) && getComputedStyle) {
        // WebKit and Opera will return auto in some cases
        // Firefox will pass back an unaltered value when it can't be set, like top on a static element
        value = 0;
    } else if (unit && unit !== 'px' && !getComputedStyle) {
        // IE 8 and below won't convert units for us
        // try to convert using a prop that will return pixels
        // this will be accurate for everything (except font-size and some percentages)
        value = toPx(elem, value) + 'px';
    }
    return value;
}

// expose the conversion function to the window object
window.Length = {
    toPx: toPx
};
}(this, this.document));

// *** gn *** //
var gn = {};

/** 
  * optimizedResize
  * https://developer.mozilla.org/en-US/docs/Web/Events/resize#requestAnimationFrame
  */

gn.optimizedResize = (function() {

  var callbacks = [],
  running = false;

  // fired on resize event
  function resize() {

    if (!running) {
      running = true;

      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(runCallbacks);
      } else {
        setTimeout(runCallbacks, 66);
      }
    }

  }

  // run the actual callbacks
  function runCallbacks() {

    callbacks.forEach(function(callback) {
      callback();
    });

    running = false;
  }

  // adds callback to loop
  function addCallback(callback) {

    if (callback) {
      callbacks.push(callback);
    }

  }

  return {
    // public method to add additional callback
    add: function(callback) {
      if (!callbacks.length) {
        window.addEventListener('resize', resize);
      }
      addCallback(callback);
    }
  };
}());

// start process
// optimizedResize.add(function() {
//   console.log('Resource conscious resize callback!')
// });

/* get elements size */
// 1. outer size: content + padding + border + margin //
gn.getOuterWidth = function (el) {
  var pattern = /\d/, // check if value contains digital number
      width = el.offsetWidth,
      style = el.currentStyle || getComputedStyle(el),
      marginLeft = (pattern.exec(style.marginLeft) === null) ? '0px' : style.marginLeft,
      marginRight = (pattern.exec(style.marginRight) === null) ? '0px' : style.marginRight;

  width += parseInt(Length.toPx(el, marginLeft)) + parseInt(Length.toPx(el, marginRight));
  return width;
};

gn.getOuterHeight = function (el) {
  var pattern = /\d/, // check if value contains digital number
      height = el.offsetHeight,
      style = el.currentStyle || getComputedStyle(el),
      marginTop = (pattern.exec(style.marginTop) === null) ? '0px' : style.marginTop,
      marginBottom = (pattern.exec(style.marginBottom) === null) ? '0px' : style.marginBottom;

  height += parseInt(Length.toPx(el, marginTop)) + parseInt(Length.toPx(el, marginBottom));
  return height;
};

// 2. offset size: content + padding + border //
//    el.offsetWidth  
//    el.offsetHeight

// 3. client size: content + padding
//    el.clientWidth  
//    el.clientHeight

/** isNodeList **/
gn.isNodeList = function (el) {
  // Only NodeList has the "item()" function
  return typeof el.item !== 'undefined'; 
};


/* append */
gn.append = function(els, data) {
  var els_new = (gn.isNodeList(els)) ? els : [els], i;

  if (typeof data.nodeType !== "undefined" && data.nodeType === 1) {
    for (i = els_new.length; i--;) {
      els_new[i].appendChild(data);
    }
  } else if (typeof data === "string") {
    for (i = els_new.length; i--;) {
      els_new[i].insertAdjacentHTML('beforeend', data);
    }
  } else if (gn.isNodeList(data)) {
    var fragment = document.createDocumentFragment();
    for (i = data.length; i--;) {
      fragment.insertBefore(data[i], fragment.firstChild);
    }
    for (var j = els_new.length; j--;) {
      els_new[j].appendChild(fragment);
    }
  }
};



/* prepend */
gn.prepend = function(els, data) {
  var els_new = (gn.isNodeList(els)) ? els : [els], i;

  if (typeof data.nodeType !== "undefined" && data.nodeType === 1) {
    for (i = els_new.length; i--;) {
      els_new[i].insertBefore(data, els_new[i].firstChild);
    }
  } else if (typeof data === "string") {
    for (i = els_new.length; i--;) {
      els_new[i].insertAdjacentHTML('afterbegin', data);
    }
  } else if (gn.isNodeList(data)) {
    var fragment = document.createDocumentFragment();
    for (i = data.length; i--;) {
      fragment.insertBefore(data[i], fragment.firstChild);
    }
    for (var j = els_new.length; j--;) {
      els_new[j].insertBefore(fragment, els_new[j].firstChild);
    }
  }
};

/* extend */
gn.extend = function () {
  var obj, name, copy,
  target = arguments[0] || {},
  i = 1,
  length = arguments.length;

  for (; i < length; i++) {
    if ((obj = arguments[i]) !== null) {
      for (name in obj) {
        copy = obj[name];

        if (target === copy) {
          continue;
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
};

/**
  * priorityNav native (works with go-native)
  * 
  * v0.1.0
  * @author William Lin
  * @license The MIT License (MIT)
  * https://github.com/ganlanyuan/priorityNav
  */

// DEPENDENCIES:
//
// == IE8 ==
// html5shiv
// forEach
// pageXOffset
// addEventListener
//
// == all ==
// remove
// classlist
// Length.js
// getOuterWidth
// isNodeList
// prepend
// append
// requestAnimationFrame
// optimizedResize
// extend

var priorityNav = (function () {
  'use strict';

  function priorityNav (options) {
    options = gn.extend({
      nav: '.priority-nav',
      button: 'more',
      showAll: 0,
      hideAll: 0,
    }, options || {});

    var navEls = document.querySelectorAll(options.nav),
        arr = [];
    if (navEls.length === 0) { return; }

    for (var i = navEls.length; i--;) {
      var newOptions = options;
      newOptions.nav = navEls[i];

      var a = new Core(newOptions);
      arr.unshift(a);
    }
    return arr;
  }

  function Core(options) {
    this.nav = options.nav;
    this.visibleContainer = this.nav.querySelector('ul');
    this.visibleItems = this.visibleContainer.children;
    this.fragment = document.createDocumentFragment();
    this.buttonContent = options.button;
    this.showAll = options.showAll;
    this.hideAll = options.hideAll;
    this.bp = [];
    this.bpV = [];
    this.bpH = [];
    this.initialized = false;

    this.nav.classList.add('js-priority-nav');

    // run updateNav
    this.getBreakpoints();
    this.updateNav();
    
    var scope = this;
    gn.optimizedResize.add(function () {
      scope.updateNav();
    });

  }

  Core.prototype = {
    // init
    init: function () {
      this.nav.querySelector('ul').classList.add('js-nav-visible');
      gn.prepend(this.nav, '<button class="js-nav-toggle" data-count="">' + this.buttonContent + '</button>');
      gn.append(this.nav, '<ul class="js-nav-hidden is-hidden"></ul>');

      this.hiddenContainer = this.nav.querySelector('.js-nav-hidden');
      this.hiddenItems = this.hiddenContainer.children;
      this.btn = this.nav.querySelector('.js-nav-toggle');
      this.btnWidth = gn.getOuterWidth(this.btn);

      var scope = this;
      this.btn.addEventListener('click', function () {
        scope.hiddenContainer.classList.toggle('is-hidden');
      });

      this.initialized = true;
    },

    // destory
    destory: function () {
      if (this.initialized) {
        if (this.bpH.length > 0) {
          while(this.bpH.length > 0) { 
            this.appendItemsToFragment(); 
          }
          this.visibleContainer.appendChild(this.fragment);
        }

        this.nav.classList.remove('js-priority-nav');
        this.visibleContainer.classList.remove('js-nav-visible');
        this.hiddenContainer.remove();
        this.btn.remove();
        this.initialized = false;
      }
    },
    
    // get breakpoints
    getBreakpoints: function () {
      var isLastItem = false;
      for (var i = this.visibleItems.length; i--;) {
        if (isLastItem) { this.visibleItems[i + 1].style.display = 'none'; }
        var width = gn.getOuterWidth(this.visibleContainer) + 1;
        this.bp.unshift(width);
        this.bpV.unshift(width);
        isLastItem = true;
      }

      for (var j = 0, len = this.visibleItems.length; j < len; j++) {
        this.visibleItems[j].style.display = '';
      }
    },

    // prepend
    prependItemsToFragment: function () {
      gn.prepend(this.fragment, this.visibleItems[this.bpV.length - 1]);

      this.bpH.unshift(this.bpV[this.bpV.length - 1]);
      this.bpV.splice(-1, 1);
    },

    // append
    appendItemsToFragment: function () {
      gn.append(this.fragment, this.hiddenItems[0]);

      this.bpV.push(this.bpH[0]);
      this.bpH.shift();
    },

    // update nav
    updateNav: function () {
      this.windowWidth = window.innerWidth;
      this.outerWidth = gn.getOuterWidth(this.nav);

      if (this.outerWidth >= this.bp[this.bp.length - 1] || this.windowWidth < this.showAll) {
        this.destory();
      } else {
        if (!this.initialized) { this.init(); }

        this.availableSpace = this.outerWidth - this.btnWidth;
        if (this.hideAll === 0 || this.windowWidth >= this.hideAll) {

          if (this.availableSpace <= this.bpV[this.bpV.length - 1]) {
            while(this.availableSpace <= this.bpV[this.bpV.length - 1]) { 
              this.prependItemsToFragment(); 
            }
            this.hiddenContainer.insertBefore(this.fragment, this.hiddenContainer.firstChild);

          } else {
            this.hiddenItems = this.hiddenContainer.children;
            while(this.availableSpace > this.bpH[0]) { 
              this.appendItemsToFragment(); 
            }
            this.visibleContainer.appendChild(this.fragment);
          }
        } else {
          if (this.bpH.length === this.bp.length) { return; }

          while(this.bpV.length > 0) { 
            this.prependItemsToFragment(); 
          }
          this.hiddenContainer.insertBefore(this.fragment, this.hiddenContainer.firstChild);
        }

        // update data-count
        this.currentCount = this.currentCount || 0;
        this.count = this.bpH.length || 0;
        if (this.count !== this.currentCount) {
          this.currentCount = this.btn.getAttribute("data-count");
          this.btn.setAttribute("data-count", this.count);
        }
      }

    }
  };

  return priorityNav;
})();

/**
  * priorityNav helper functions
  */
// @codekit-prepend "../bower_components/fix-ie/src/remove.js";
// @codekit-prepend "../bower_components/fix-ie/src/token-list.js";
// @codekit-prepend "../bower_components/requestAnimationFrame/requestAnimationFrame.js";
// @codekit-prepend "../bower_components/Units/Length.js";
// @codekit-prepend "../bower_components/go-native/src/components/gn.js";
// @codekit-prepend "../bower_components/go-native/src/components/optimizedResize.js";
// @codekit-prepend "../bower_components/go-native/src/components/getElementSize.js";
// @codekit-prepend "../bower_components/go-native/src/components/isNodeList.js";
// @codekit-prepend "../bower_components/go-native/src/components/append.js";
// @codekit-prepend "../bower_components/go-native/src/components/prepend.js";
// @codekit-prepend "../bower_components/go-native/src/components/extend.js";

// @codekit-prepend "priorityNav.native.js";


