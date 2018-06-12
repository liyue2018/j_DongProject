/*
* @Author: liyue2018
* @Date:   2018-06-08 15:40:09
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-06-08 16:46:53
*/

// 移动端的tap 事件

// 判断是否是一个手指
// 判断是否是长按
//  判断是否有抖动

var tools = {
    tap: function (element, callback) {
        // 判断是否传入对象，同时对象是一个dom元素
        if (!element || typeof element != "object") {
            return;
        }

        var startTime, startX,startY;

        element.addEventListener('touchstart', function (e) {
            // 判断是否只有一个手指进行操作
            if (e.targetTouches.length > 1) {
                return;
            } 
            // 记录手指开始触摸的时间
            startTime = Date.now();
            // 记录当前手指的坐标
            startX = e.targetTouches[0].clientX;
            startY = e.targetTouches[0].clientY;
            // 来做一些与事件有关的操作
        });
        element.addEventListener('touchend', function(e) {
            // 判断是否只有一根手指进行操作
            if (e.changedTouches.lenght > 1) {
                return;
            }
            // 判断事件差异 150

            if (Date.now() - startTime > 150) {
                // 长按操作
                return;
            }
            // 判断手指松开时，与触摸开始时的坐标差异

            var endX = e.changedTouches[0].clientX;
            var endY = e.changedTouches[0].clientY;
            // 距离差异

            if (Math.abs(endX - startX) < 6 && Math.abs(endY - startY) < 6) {
                console.log("这是移动端的单击事件 --- tap事件");
                // 执行tap事件响应后的处理

                // 判断是否传入回调函数
                callback && callback(e);
            }

        })

    }
};
