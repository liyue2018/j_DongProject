/*
* @Author: liyue2018
* @Date:   2018-06-06 18:27:12
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-06-07 19:30:57
*/

window.onload = function () {

    // 头部搜索块的js效果
    headerEffect();

    // 倒计时特效
    timeCountDown();

    // 轮播图

    bannerEffect();

}

//chrome 和 ie11 兼容性问题
//获取页面滚动出去的距离

function getScroll() {
   return {
       scrollTop:document.documentElement.scrollTop || document.body.scrollTop,
       scrollLeft:document.documentElement.scrollLeft || document.body.scrollLeft
   }
}

// 设置元素之间的内容 兼容性问题
function setInnerText(element,content) {
   // 判断element是否支持innerText
   if(typeof element.innerText === 'string') {
       return element.innerText = content;
   } else {
       return element.textContent = content;
   }
}

// 头部搜索块的js效果
function headerEffect() {
    // 获取当前banner的高度
    var jd_banner = document.querySelector('.jd_banner');
    var jd_bannerHeight = jd_banner.offsetHeight;
    var jd_search = document.querySelector('.jd_search');
    // 获取当前屏幕滚动时，banner滚动出屏幕的距离
    window.onscroll = function () {
        var offsetTop = getScroll().scrollTop;
        var opacity = 0;

        if (offsetTop < jd_bannerHeight) {
            // 计算比例值，获取透明度，设置背景颜色的样式
             opacity = offsetTop / jd_bannerHeight;
             // 设置jd_search样式
             jd_search.style.backgroundColor = 'rgba(233,35,34,' + opacity + ' )';
        } else {
            jd_search.style.backgroundColor = 'rgba(233,35,34,1)';
        }
    }
}

// 倒计时

function timeCountDown () {
    // 获取用于展示时间的span
    var spans = document.querySelectorAll('.jd_sk_time span');
    // 设置初始的倒计时间，以秒作单位
    var totalTime = 3700;
    // 开启定时器
    var timerId = setInterval(function () {
        totalTime --;
        if (totalTime <= 0) {
            clearInterval(timerId);
        }
        // 获取时分秒
        var hour = Math.floor(totalTime / 3600);
        var minute = Math.floor(totalTime % 3600 / 60);
        var second = Math.floor(totalTime % 60);
        // 赋值
        setInnerText(spans[0], Math.floor(hour / 10))
        setInnerText(spans[1], Math.floor(hour % 10))
        setInnerText(spans[2], Math.floor(minute / 10));
        setInnerText(spans[3], Math.floor(minute % 10));
        setInnerText(spans[4], Math.floor(second / 10));
        setInnerText(spans[5], Math.floor(second % 10));
    }, 1000);
}

// 轮播图效果开始

function bannerEffect() {
    // 设置修改轮播图的页面结构
    // 在开始位置添加原始的最后一张图片
    // 在结束位置添加原始的第一张图片

    var jd_banner = document.querySelector('.jd_banner');

    var jd_bannerImg = jd_banner.querySelector('ul.jd_bannerImg');
    var firstImg = jd_bannerImg.querySelector('li:first-of-type');
    var lastImg = jd_bannerImg.querySelector('li:last-of-type');
    // 插入相应的图片
    jd_bannerImg.appendChild(firstImg.cloneNode(true));
    jd_bannerImg.insertBefore(lastImg.cloneNode(true), jd_bannerImg.firstChild);

    // 设置样式
    // 获取子元素数量
    var all_li = jd_bannerImg.querySelectorAll('li');
    var li_count = all_li.length;
    // 获取banner宽度
    var bannerWidth = jd_banner.offsetWidth;
    // 设置图片盒子的宽度
    jd_bannerImg.style.width = bannerWidth * li_count + 'px';
    
    for(var i=0; i < all_li.length; i++) {
        all_li[i].style.width = bannerWidth + 'px';
    }
     var index = 1;
    // 设置默认的偏移
    jd_bannerImg.style.left = - bannerWidth + 'px';


    // 当屏幕变化时。重新计算宽度

    window.onresize = function () {
        // 获取banner宽度 覆盖全局的宽度
        bannerWidth = jd_banner.offsetWidth;

        // 设置图片盒子的宽度
        jd_bannerImg.style.width = bannerWidth * li_count + 'px';

        // 设置单个li的宽度 
        // var li = jd_bannerImg.querySelector('li');
        for(var i = 0; i < all_li.length; i++) {
            all_li[i].style.width = bannerWidth + 'px';
        }
        jd_bannerImg.style.left = - bannerWidth + 'px';

    }
    // 获取小圆点 设置样式
    var setIndicator = function(index) {
        var jd_bannerDot = document.querySelector('.jd_bannerDot');
        // 清除全部圆点的样式
        var len = jd_bannerDot.children.length;

        for(var i = 0; i < len; i++) {
            jd_bannerDot.children[i].classList.remove("active");
        }

        // 为当前li元素添加active样式
        jd_bannerDot.children[index - 1].classList.add("active");
    }
    // 自动轮播
    // 定义图片索引： 图片已经有了一个宽度的默认偏移

     var jd_timerId;
    
    var startTime = function() {
        jd_timerId = setInterval(function () {
        // 变换索引
        index ++;

        // 添加过渡效果

        jd_bannerImg.style.transition = 'left 0.5s ease-in-out';
        // 如果是最后一张
        // 延迟操作
        setTimeout(function () {
            if (index == li_count) {
               index = 1;
               // 偏移指定位置
               jd_bannerImg.style.left = -index * bannerWidth + 'px';
               // 如果某个元素添加过过渡效果，那么过毒属性会一直存在。不想要，需要清除
               jd_bannerImg.style.transition = 'none';
               index --;
            }
        }, 500);
        // 设置偏移
        jd_bannerImg.style.left = -index * bannerWidth + 'px';

       }, 1500);
    }
    startTime();

    // 实现手动轮播
    var startX,moveX,distanceX;
    // 标记当前的过渡效果是否已经执行完毕
    var isEnd = true;
    // 为图片添加触摸事件---起始位置
     jd_bannerImg.addEventListener('touchstart', function(e) {
        // touch 事件的触发，必须保证元素有具体的宽高值，否则不会触发
        // 清除定时器
        clearInterval(jd_timerId);
        // 获取当前手指的起始位置
        startX = e.targetTouches[0].clientX;
     });

     // 为图片添加手指滑动事件
     jd_bannerImg.addEventListener('touchmove', function(e) {
        if (isEnd == true) {
            // 记录手指在华东货场中的位置
            moveX = e.targetTouches[0].clientX;
            // 计算坐标的差值

            distanceX = moveX - startX;
            // 清除过渡效果
            jd_bannerImg.style.transition = 'none';
            // 实现元素的偏移 本次的滑动操作应该基于之前轮播图已经偏移的距离
            jd_bannerImg.style.left = -index*bannerWidth + distanceX + 'px';
        }
        
     });
     // 触摸结束事件
     // 松开手指后的操作

     jd_bannerImg.addEventListener('touchend', function () {
        // 松开手指，标记当前的过渡效果正在执行
        isEnd = false;
         // 获取当前滑动的距离 判断是否超出某个值
         if (Math.abs(distanceX) > 100) {
            // 判断方向
            if (distanceX > 0) {
               // 上一张
               index --;
            } else {
               // 下一张
               index ++;
           }
            // 翻页
            jd_bannerImg.style.transition = "left 0.5s ease-in-out";
            jd_bannerImg.style.left = -index * bannerWidth + 'px';
        } else if (Math.abs(distanceX) > 0){
            // 保证确实进行过滑动操作
            // 回弹
            jd_bannerImg.style.transition = "left 0.5s ease-in-out";
            jd_bannerImg.style.left = -index * bannerWidth + 'px';

        }
        // 将上一次move产生的所有数据重置为0
        startX = 0;
        moveX = 0;
        distanceX = 0;
     })

     // webkitTransitionEnd 可以监听当前元素的过渡效果执行完毕后执行
     jd_bannerImg.addEventListener('webkitTransitionEnd', function () {
        // 如果是最后一张（li_count - 1），就回到索引1
        // 如果到第一张，就回到索引 li_count - 2

        if (index == li_count - 1) {
            index = 1;
            // 清除过渡
            jd_bannerImg.style.transition = 'none';
            jd_bannerImg.style.left = -index * bannerWidth + 'px';
        }
        else if (index == 0) {
            index = li_count - 2;
            // 清除过渡
            jd_bannerImg.style.transition = 'none';
            jd_bannerImg.style.left = -index * bannerWidth + 'px';
         }
         // 设置标识
         setIndicator(index);
         setTimeout(function() {
            isEnd = true;
            // 清除之前的定时器
            clearInterval(jd_timerId);
            // 重新开启定时器
            startTime();
         }, 500);
     });
}

// 轮播图效果结束

