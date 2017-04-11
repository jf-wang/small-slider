# small-slider
利用jq实现跟随鼠标小滑块

原生js+css3过渡写的滑块跟随,仅供学习可参考

![demo](https://raw.githubusercontent.com/jf-wang/small-slider/master/demo.gif)

[演示地址](https://jf-wang.github.io/small-slider/index.html)
####安装及使用方法
1.在页面底部引入js文件

```javascript
<script src="js/slide.js"></script>
```
2.将要插入滑块的元素添加class属性为slideBox

```html
<ul>
<li class="slideBox"></li>
<li class="slidBox"></li>
</ul>
<!--如果需要添加文本内容可以直接在父元素里添加滑块元素并加入class属性slide>
<ul>
<li class="slideBox"><div class="slide">文本内容</li>
<li class="slideBox"><div class="slide">文本内容</li>
</ul>
```
3.在你的css文件中添加slideBox和slide的类样式

```css
.slideBox{
  width: 150px;
  height: 100px;
  border:1px solid #fff;
  float: left;
  margin:-1px 0 0 -1px;
  background: #1ABC9C;
  position: relative;
  overflow: hidden;
}
.slide{
  width: 100%;
  height: 100%;
  font-size: 20px;
  color: #fff;
  position: absolute;
  left:-100%;
  top:0;
  background:rgba(17, 18, 18, 0.81);
  text-align: center;
}
```

本插件还有很多不足的地方希望大家一起讨论学习，如需使用请各位亲自行diy一下自己想要的样式
