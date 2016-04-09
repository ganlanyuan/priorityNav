## PriorityNav
Dynamically show / hide menu items to make them fit their parent.

[demo](http://creatiointl.org/gallery/william/priority-nav/v0/tests/)  
[changelog](https://github.com/ganlanyuan/priorityNav/blob/master/CHANGELOG.md)  

## Install
```
bower install priorityNav --save
```

## Usage
##### 1. Include priorityNav
Include priorityNav (css, js) and [go-native](https://github.com/ganlanyuan/go-native) (10k),
```html
<link rel="stylesheet" href="priorityNav.css">

<!--[if (lt IE 9)]>
  <script src="go-native.ie8.js"></script>
<![endif]-->
<script src="go-native.js"></script>
<script src="priorityNav.js"></script>
```
or priorityNav (css, js) and [priorityNav.helper](https://github.com/ganlanyuan/priorityNav/tree/master/dist) (6k).
```html
<link rel="stylesheet" href="priorityNav.css">

<!--[if (lt IE 9)]>
  <script src="priorityNav.helper.ie8.js"></script>
<![endif]-->
<script src="priorityNav.helper.js"></script>
<script src="priorityNav.js"></script>
```
##### 2. Call priorityNav
Add class **.priority-nav** to nav container, Or include priority-nav if you use [SASS](http://sass-lang.com/):
```html
<!-- add class priority-nav -->
<nav class="nav priority-nav">
  <ul>
   <li>...</li>
   <li>...</li>
   <li>...</li>
  </ul>
</nav>
```

```scss
// or include priority-nav
.nav { @include priority-nav(); }
```

Then call `priorityNav`.
```javascript
priorityNav({
  nav: '.nav',
  hideAll: 300,
});
```

## Options
Default:
```javascript
{
  nav: '.priority-nav',
  button: 'more',
  showAll: 0,
  hideAll: 0,
}
```
- **nav**: 
- **button**: button inner html.
- **showAll**: breakpoint for show all menu items.
- **hideAll**: breakpoint for hide all menu items.

## Browser Support
Tested on IE8+ and mordern browsers.

## reference links
https://css-tricks.com/the-priority-navigation-pattern/  
https://css-tricks.com/diy-priority-plus-nav/

## License
This project is available under the [MIT](https://opensource.org/licenses/mit-license.php) license.  
