/*
* @Author: liyue2018
* @Date:   2018-06-08 11:17:32
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-06-08 17:55:52
*/

window.onload = function () {
    // 获取左侧栏
    var ct_cLeft= document.querySelector('.ct_cLeft');
    // 获取左侧栏的高度
    var leftHeight = ct_cLeft.offsetHeight;
    var ct_list = ct_cLeft.querySelector('ul:first-of-type');
    var ct_lis = ct_list.querySelectorAll('li');
    var ct_listHeight = ct_list.offsetHeight;

    // 设置静止状态下的最大值top
    var maxTop = 0;
    // 静止状态下的最小top值
    var minTop = leftHeight - ct_listHeight;

    // 滑动状态下设置最大top值
    var maxBounceTop = maxTop + 100;
    // 滑动状态下设置最小top值
    var minBounceTop = minTop - 100;
    // 定义全局变量
    var startY, moveY, distanceY;
    startY = 0;
    moveY = 0;
    distanceY = 0;
    // 记录当前滑到的距离
    var currentY = 0;

    // 注册手指触屏事件
    ct_list.addEventListener('touchstart', function(e) {
        startY = e.targetTouches[0].clientY;
    });
    // 注册滑动事件
    ct_list.addEventListener('touchmove', function(e) {
        moveY = e.targetTouches[0].clientY;
        // 计算滑动的距离
        distanceY = moveY - startY;
        // 判断是否超出滑动距离
        if (currentY + distanceY > maxBounceTop || currentY + distanceY < minBounceTop) {
            return;
        }
        // 先将可能存在的过渡效果清除
        ct_list.style.transition = 'none';
        // 实现偏移操作 应该在之前滑动距离的基础之上再滑动
        ct_list.style.top = (currentY + distanceY) + 'px';
    });
    ct_list.addEventListener('touchend', function(e) {
        // 记录当前滑动的距离是否在静止状态下和滑动状态下的top之间
        if (currentY + distanceY < minTop) {
            currentY = minTop;
            ct_list.style.transition = 'top 0.5s';
            ct_list.style.top = minTop + 'px';
        } else if (currentY + distanceY > maxTop) {
            currentY = maxTop;
            ct_list.style.transition = 'top 0.5s';
            ct_list.style.top = maxTop + 'px';
        }
        else {
           // 记录当前滑动的距离
           currentY += distanceY;
        }
    });
    // 为li元素添加索引
    for (var i = 0; i < ct_lis.length; i++) {
        ct_lis[i].index = i;
    }
    // 移动端的tap事件
    // tools.tap(ct_list, function(e) {
    //     // 修改Li元素样式
    //     for(var i = 0; i < ct_lis.length; i++) {
    //         ct_lis[i].classList.remove("active");
    //     }
    //     // 当前li元素设置样式
    //     var li = e.target.parentNode;
    //     var liHeight = li.offsetHeight;
    //     li.classList.add("active");

    //     // 获取当前li元素的索引值
    //     var li_index = li.index;
    //     // console.log(li_index);
    //     // 开启过渡

    //     ct_list.style.transition ="top .5s";

    //     // 判断偏移
    //     if (-li_index * liHeight < minTop) {
    //         ct_list.style.top = minTop + 'px';
    //         currentY = minTop;
    //     } else {
    //         ct_list.style.top = -li_index * liHeight + 'px';
    //         currentY = -li_index * liHeight;
    //     }
    // });

    // 使用fastclick 
    if ('addEventListener' in document) {
       document.addEventListener('DOMContentLoaded', function() {
           FastClick.attach(document.body);
       },    false);
    }

    // fastclick 使用的时候就是绑定添加click事件
    ct_list.addEventListener('click',function(e) {
        // 修改Li元素样式
        for(var i = 0; i < ct_lis.length; i++) {
            ct_lis[i].classList.remove("active");
        }
        // 当前li元素设置样式
        var li = e.target.parentNode;
        var liHeight = li.offsetHeight;
        li.classList.add("active");

        // 获取当前li元素的索引值
        var li_index = li.index;
        // console.log(li_index);
        // 开启过渡

        ct_list.style.transition ="top .5s";

        // 判断偏移
        if (-li_index * liHeight < minTop) {
            ct_list.style.top = minTop + 'px';
            currentY = minTop;
        } else {
            ct_list.style.top = -li_index * liHeight + 'px';
            currentY = -li_index * liHeight;
        }
     });   

    
}


