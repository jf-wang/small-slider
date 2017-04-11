;(function(element){
  var slbox = document.getElementsByClassName(element);//获取滑块父元素的盒子
   function SLIDE(){ //创建构滑块类
     this.version = "1.0";
     this.programmer = "shun";
     //创建滑块位置数组顺序是0上,1右，2下，3左;
     this.direction = [{"top":"-100%","left":"0"},{"top":"0","left":"100%"},{"top":"100%","left":"0"},{"top":"0","left":"-100%"}];
}
       SLIDE.prototype = { //创建原型对象
          constructor:SLIDE, //将原型指会构造函数本身
              addincident:function(){ //动态创建元素即绑定事件函数
                var $this = this; //储存当前this指向，指向SLIDE本身，防止与事件绑定this冲突
                for(var i=0;i<slbox.length;i++){ //循环动态创建给每个容易添加滑块元素
                  var slide = document.createElement("div"); //创建滑块元素以及设置样式
                      slide.className="slide";
                      if(!slbox[i].querySelector('.slide')){ //判断内部是已经滑块
                        slbox[i].appendChild(slide);
                      }
                      slbox[i].addEventListener("mouseenter",function(e){ //移入事件
                         var Judge = $this.Judge(this,e);//获取鼠标进入元素方向的数值
                         var  Style= $this.direction[Judge];//获取样式数组中的值;
                         $this.Into(this,Style);//启动进入动画函数
                  });
                  slbox[i].addEventListener("mouseleave",function(e){ //移出事件
                    var Judge = $this.Judge(this,e);//获取鼠标进入元素方向的数值
                    var  Style= $this.direction[Judge];//获取样式数组中的值;
                    $this.Out(this,Style);//启动移出动画函数
              });
           }
          },
          Judge:function(element,e){ //判断鼠标进入方向判断
            var elementGauge = element.getBoundingClientRect(); //获取元素四个条边距离浏览器窗口的距离
            elementGauge.width = elementGauge.right - elementGauge.left; //计算出元素的宽度等于右边距-左边距
            elementGauge.height = elementGauge.bottom - elementGauge.top;//计算出元素的高度等于下边距-上边距
            //获取承载滑块的容易左上角x和y轴的坐标点,由于用浏览器可视区域左上角作为坐标点，所以容易在坐标系的第四象限里，y轴也就是top值都为负数 x轴也就是left都是正数
           var upX = elementGauge.left; //左上就x轴的值 即元素到浏览器左侧的距离
           var upY  = - elementGauge.top;//左上角y轴的值 即元素到浏览器顶部的距离
           var btmX = upX+elementGauge.width;//获取右下角x轴的值，即元素到浏览器左侧的距离+自身宽度
           var btmY = upY-elementGauge.height;//获取右下角y轴的值 即元素到浏览器顶部的距离负数再减去自身高度
           var EcenX = (upX+btmX)/2;//获取元素中心点的x轴坐标值
           var EcenY = (upY+btmY)/2;//获取元素中心的的y轴坐标值
           var elK = (btmY-upY)/(btmX-upX);//利用斜率公式计算初始元素左上角和右下角对应x轴的斜率，即这两个点和x轴夹脚的正切值;
           var ev = e||window.event; //获取event对象，鼠标
           var mouseX = ev.clientX;//获取鼠标的x轴值
           var mouseY = -ev.clientY;//获取鼠标的y轴值
           var moK = (mouseY-EcenY)/(mouseX-EcenX);//计算鼠标位置和元素中心的的斜率
           //因为以浏览器可是窗口左上角作为坐标系0点，所以elK的值是负值，根据对称关系元素左下角和右上角的的值就是正值，即-elk
           //如果鼠标和中心的斜率大于elk并且小于-elk 且鼠标移入的位置在左右区间里，反之上下区间
           if(moK>elK&&moK<-elK){ //左右
           return mouseX>EcenX ? 1:3; //三元运算，如果鼠标的x轴值大于元素中心点的x轴值即得到1右,反之得到3左;
           }else{//上下
           return mouseY>EcenY ? 0:2; //三元运算，如果鼠标的x轴值大于元素中心点的Y轴值即得到0上,反之得到2下;
           }
         },
           Into:function(element,style,n){ //进入动画函数
             var slide = element.querySelector(".slide");//获取容易内部class属性为slide的元素;
             slide.style.transition = ""; //先清空过度效果;防止调整位置有过度
             slide.style.left = style.left;//设置left和top的位置;
             slide.style.top = style.top;
             slide.offsetWidth;//重新计算滑块的宽度，即延迟添加过度效果的作用;
             slide.style.transition = "left,top 0.3s,0.3s";//设置过度;
             slide.style.left = 0; //元素进入样式
             slide.style.top = 0;
           },
           Out:function(element,style){ //移出动画函数
             var slide = element.querySelector(".slide");//获取容易内部class属性为slide的元素;
             slide.style.left = style.left;//设置left和top的位置;
             slide.style.top = style.top;
           }
         };
      var slidObj = new SLIDE();
      slidObj.addincident();
})("slideBox");
