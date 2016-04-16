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