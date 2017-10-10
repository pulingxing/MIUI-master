/**
 * Created by pp on 2017/9/26.
 * 功能：轮播js
 */

(function carousel() {

// 获取页面元素
var oBanner  = document.getElementsByClassName('banner')[0];
var oPrev    = document.getElementsByClassName('prev')[0];
var oNext    = document.getElementsByClassName('next')[0];
var aImgs    = document.getElementsByClassName('imgs-box')[0].children;
var aIdots   = document.getElementsByClassName('idots-box')[0].children;
// 记录当前显示图片位置
var curImgIdx = 0;
// 记录动画执行状态
var isAnimating = false;
// 定时器（自动轮播）
var timer = null;

// 显示默认图片
tab();
//停止
stop();
// 自动轮播
autoplay();


/**
 * 事件添加
 */
oPrev.onclick = function () {
    // 异常处理，如果当前正在执行图片过渡，则不做任何处理
    if(isAnimating) {
        return;
    }
    curImgIdx = curImgIdx == 0 ? 5 : --curImgIdx;
    tab();
}
oNext.onclick = function () {
    if(isAnimating) {
        return;
    }
    curImgIdx = curImgIdx == 5 ? 0 : ++curImgIdx;
    tab();
}

// 为下面的小圆点添加事件（可点击切换）
for(var i = 0; i < aIdots.length; i++) {
    aIdots[i].idx = i;
    addEvent(aIdots[i], 'click', function () {
        if(isAnimating || this.classList.contains('active')) {
            return;
        }
        curImgIdx = this.idx;
        tab();
    });
}

oBanner.onmouseenter = stop;
oBanner.onmouseleave = autoplay;

/**
 * 函数封装
 */
function tab() {
    isAnimating = true;
    // 异常处理
    for(var i = 0; i < aImgs.length; i++) {
        if(aIdots[i].classList.contains('active')) {
            aIdots[i].classList.remove('active');
            fade(aImgs[i], 0);
            aImgs[i].style.zIndex = '0';
            break;
        }
    }
    aIdots[curImgIdx].classList.add('active');
    fade(aImgs[curImgIdx], 100, 1000, function () {
        isAnimating = false;
    });
    aImgs[curImgIdx].style.zIndex = '1';
}

/**
 * 自动播放
 */
function autoplay() {
    timer = setInterval(function () {
        oNext.onclick();
    }, 3000);
}

/**
 * 停止播放
 */
function stop() {
    clearInterval(timer);
}


/**
 * 淡入淡出效果-封装
 * @param element   执行元素
 * @param target    目标值
 * @param duration  持续时间
 * @param completed 回调函数
 */
function fade(element, target, duration, completed) {
    // Exception handling
    if(!element || target == undefined) {
        throw 'Error：Parameter is not complete in function \'changeOpacity\'.';
    }
    // Set the default value
    duration  = duration  ? duration  : 1000;
    // Gets the current opacity
    var curOpa = getCurrentOpacity();
    // Calculating offset
    var offset   = target - curOpa;
    // Set the interval
    var interval = 30;
    // Calculating speed
    var speed    = offset > 0 ? Math.ceil(offset / (duration / interval)) : Math.floor(offset / (duration / interval));
    // Execute transition animations
    var t = setInterval(function () {
        // Update the current opacity
        curOpa = getCurrentOpacity();
        // Determine whether to reach the target
        if((offset > 0 && curOpa < target) || (offset < 0 && curOpa > target)) {
            // Frame by frame change
            element.style.opacity = (curOpa + speed) / 100
        }else { // Has completed the transition animation
            element.style.opacity = target / 100;
            clearInterval(t);
            // Invoke the callback function
            if(completed) {
                completed();
            }
        }
    }, interval);

    function getCurrentOpacity() {
        var curOpa = 0;
        // Compatible with IE browser
        if(element.currentStyle) {
            curOpa = element.currentStyle['opacity'] * 100;
        }else {
            curOpa = getComputedStyle(element, false)['opacity'] * 100;
        }
        return curOpa;
    }
}


}());

//明星产品轮播
(function start() {
    var aList   = document.getElementsByClassName('xm-carousel-list')[0];
    var aLeft   = document.getElementsByClassName('xm-controls-left')[0];
    var aRight  = document.getElementsByClassName('xm-controls-right')[0];
    var isAnimating = false;//记录帧动画状态
    var _timer = null;
    aLeft.onclick = function () {
        if (aList.style.left = 0 + "px") {
            aLeft.setAttribute("disabled", "disabled");
        } else {
            aList.style.left = parseInt(getStyle(aList, "left")) + 1240 + "px"
        }
    }

    aRight.onclick = function () {
        if (aList.style.left <= -1240 + "px"){
            aRight.setAttribute("disabled","disabled");
        }else{
            aList.style.left = parseInt(getStyle(aList,"left")) - 1240 + "px"
        }
    }
    //自动播放
    function autoPlay() {
        _timer = setInterval(function () {
            aRight.onclick();
        },3000);
        _timer = setInterval(function () {
            aLeft.onclick();
        },6000);

    }

    /**
     * 添加事件
     * @param element  事件对象
     * @param type     事件类型
     * @param callBack 回调函数
     */
    function addEvent(element, type, callBack) {
        // 兼容IE10.0以下
        if(element.attachEvent) {
            element.attachEvent('on' + type, callBack);
        }else {
            element.addEventListener(type, callBack, false);
        }
    }

}());

//推荐产品轮播
(function recommend() {
    var aList   = document.getElementsByClassName('xm-recommend-list')[0];
    var aLeft   = document.getElementsByClassName('xm-left')[0];
    var aRight  = document.getElementsByClassName('xm-right')[0];
    aLeft.onclick = function () {
        if (aList.style.left = 0 + "px") {
            aLeft.setAttribute("disabled", "disabled");
        } else {
            aList.style.left = parseInt(getStyle(aList, "left")) + 1240 + "px"
        }
    }
    aRight.onclick = function () {
        if (aList.style.left <= -1240 + "px"){
            aRight.setAttribute("disabled","disabled");
        }else{
            aList.style.left = parseInt(getStyle(aList,"left")) - 1240 + "px"
        }
    }
    function addEvent(element, type, callBack) {
        // 兼容IE10.0以下
        if(element.attachEvent) {
            element.attachEvent('on' + type, callBack);
        }else {
            element.addEventListener(type, callBack, false);
        }
    }

}());

//内容轮播

(function content() {



var oPr    = document.getElementsByClassName('oprev')[0];
var oNe    = document.getElementsByClassName('onext')[0];
var oUl    = document.getElementsByClassName('detail-list')[0];
var aIdots = document.getElementsByClassName('idx-item');


var curImgsIdx   = 0;
var isAnimating = false;

/**
 * 事件添加
 */
oPr.onclick = function () {
    if(curImgsIdx == 0 || isAnimating) {return;}
    curImgsIdx--;
    tab(295);
    changeIdots();
}
oNe.onclick = function () {
    if(curImgsIdx == oUl.childElementCount - 1 || isAnimating) {return;}
    curImgsIdx++;
    tab(-295);
    changeIdots();
}

for(var i = 0; i < aIdots.length; i++) {
    aIdots[i].idx = i;
    aIdots[i].onclick = function () {
        if(this == aIdots[curImgsIdx] || isAnimating) {return;}
        var offset = -295 * (this.idx - curImgsIdx);
        curImgsIdx = this.idx;
        tab(offset);
        changeIdots();
    }
}

/**
 * 函数封装
 */

function tab(offset) {
    isAnimating = true;
    var curLeft = parseInt(getStyle(oUl, 'left'));
    var desLeft = curLeft + offset;

    var duration = 500;
    var interval = 20;
    var speed    = Math.ceil(offset / (duration / interval));
    var t = setInterval(function () {
        curLeft = parseInt(getStyle(oUl, 'left'));
        if((offset > 0 && curLeft < desLeft) || (offset < 0 && curLeft > desLeft)) {
            oUl.style.left = curLeft + speed + 'px';
        }else {
            clearInterval(t);
            isAnimating = false;
            oUl.style.left = desLeft + 'px';
        }
    }, interval);
}

function changeIdots() {
    for(var i = 0; i < aIdots.length; i++) {
        if(aIdots[i].classList.contains('active')) {
            aIdots[i].classList.remove('active');
            break;
        }
    }
    aIdots[curImgsIdx].classList.add('active');
}

function getStyle(element, attr) {
    if(element.currentStyle) {
        return element.currentStyle[attr];
    }else {
        return getComputedStyle(element, null)[attr];
    }
}


}());

(function content() {

    var oPr    = document.getElementsByClassName('aprev')[0];
    var oNe    = document.getElementsByClassName('anext')[0];
    var oUl    = document.getElementsByClassName('adetail-list')[0];
    var aIdots = document.getElementsByClassName('aidx-item');

    var curImgsIdx   = 0;
    var isAnimating = false;

    /**
     * 事件添加
     */
    oPr.onclick = function () {
        if(curImgsIdx == 0 || isAnimating) {return;}
        curImgsIdx--;
        tab(295);
        changeIdots();
    }
    oNe.onclick = function () {
        if(curImgsIdx == oUl.childElementCount - 1 || isAnimating) {return;}
        curImgsIdx++;
        tab(-295);
        changeIdots();
    }

    for(var i = 0; i < aIdots.length; i++) {
        aIdots[i].idx = i;
        aIdots[i].onclick = function () {
            if(this == aIdots[curImgsIdx] || isAnimating) {return;}
            var offset = -295 * (this.idx - curImgsIdx);
            curImgsIdx = this.idx;
            tab(offset);
            changeIdots();
        }
    }

    /**
     * 函数封装
     */

    function tab(offset) {
        isAnimating = true;
        var curLeft = parseInt(getStyle(oUl, 'left'));
        var desLeft = curLeft + offset;

        var duration = 500;
        var interval = 20;
        var speed    = Math.ceil(offset / (duration / interval));
        var t = setInterval(function () {
            curLeft = parseInt(getStyle(oUl, 'left'));
            if((offset > 0 && curLeft < desLeft) || (offset < 0 && curLeft > desLeft)) {
                oUl.style.left = curLeft + speed + 'px';
            }else {
                clearInterval(t);
                isAnimating = false;
                oUl.style.left = desLeft + 'px';
            }
        }, interval);
    }

    function changeIdots() {
        for(var i = 0; i < aIdots.length; i++) {
            if(aIdots[i].classList.contains('active')) {
                aIdots[i].classList.remove('active');
                break;
            }
        }
        aIdots[curImgsIdx].classList.add('active');
    }

    function getStyle(element, attr) {
        if(element.currentStyle) {
            return element.currentStyle[attr];
        }else {
            return getComputedStyle(element, null)[attr];
        }
    }


}());

(function content() {


    var oPr    = document.getElementsByClassName('bprev')[0];
    var oNe    = document.getElementsByClassName('bnext')[0];
    var oUl    = document.getElementsByClassName('bdetail-list')[0];
    var aIdots = document.getElementsByClassName('bidx-item');


    var curImgsIdx   = 0;
    var isAnimating = false;

    /**
     * 事件添加
     */
    oPr.onclick = function () {
        if(curImgsIdx == 0 || isAnimating) {return;}
        curImgsIdx--;
        tab(295);
        changeIdots();
    }
    oNe.onclick = function () {
        if(curImgsIdx == oUl.childElementCount - 1 || isAnimating) {return;}
        curImgsIdx++;
        tab(-295);
        changeIdots();
    }

    for(var i = 0; i < aIdots.length; i++) {
        aIdots[i].idx = i;
        aIdots[i].onclick = function () {
            if(this == aIdots[curImgsIdx] || isAnimating) {return;}
            var offset = -295 * (this.idx - curImgsIdx);
            curImgsIdx = this.idx;
            tab(offset);
            changeIdots();
        }
    }

    /**
     * 函数封装
     */

    function tab(offset) {
        isAnimating = true;
        var curLeft = parseInt(getStyle(oUl, 'left'));
        var desLeft = curLeft + offset;

        var duration = 500;
        var interval = 20;
        var speed    = Math.ceil(offset / (duration / interval));
        var t = setInterval(function () {
            curLeft = parseInt(getStyle(oUl, 'left'));
            if((offset > 0 && curLeft < desLeft) || (offset < 0 && curLeft > desLeft)) {
                oUl.style.left = curLeft + speed + 'px';
            }else {
                clearInterval(t);
                isAnimating = false;
                oUl.style.left = desLeft + 'px';
            }
        }, interval);
    }

    function changeIdots() {
        for(var i = 0; i < aIdots.length; i++) {
            if(aIdots[i].classList.contains('active')) {
                aIdots[i].classList.remove('active');
                break;
            }
        }
        aIdots[curImgsIdx].classList.add('active');
    }

    function getStyle(element, attr) {
        if(element.currentStyle) {
            return element.currentStyle[attr];
        }else {
            return getComputedStyle(element, null)[attr];
        }
    }


}());

(function content() {

    var oPr    = document.getElementsByClassName('cprev')[0];
    var oNe    = document.getElementsByClassName('cnext')[0];
    var oUl    = document.getElementsByClassName('cdetail-list')[0];
    var aIdots = document.getElementsByClassName('cidx-item');


    var curImgsIdx   = 0;
    var isAnimating = false;

    /**
     * 事件添加
     */
    oPr.onclick = function () {
        if(curImgsIdx == 0 || isAnimating) {return;}
        curImgsIdx--;
        tab(295);
        changeIdots();
    }
    oNe.onclick = function () {
        if(curImgsIdx == oUl.childElementCount - 1 || isAnimating) {return;}
        curImgsIdx++;
        tab(-295);
        changeIdots();
    }

    for(var i = 0; i < aIdots.length; i++) {
        aIdots[i].idx = i;
        aIdots[i].onclick = function () {
            if(this == aIdots[curImgsIdx] || isAnimating) {return;}
            var offset = -295 * (this.idx - curImgsIdx);
            curImgsIdx = this.idx;
            tab(offset);
            changeIdots();
        }
    }

    /**
     * 函数封装
     */

    function tab(offset) {
        isAnimating = true;
        var curLeft = parseInt(getStyle(oUl, 'left'));
        var desLeft = curLeft + offset;

        var duration = 500;
        var interval = 20;
        var speed    = Math.ceil(offset / (duration / interval));
        var t = setInterval(function () {
            curLeft = parseInt(getStyle(oUl, 'left'));
            if((offset > 0 && curLeft < desLeft) || (offset < 0 && curLeft > desLeft)) {
                oUl.style.left = curLeft + speed + 'px';
            }else {
                clearInterval(t);
                isAnimating = false;
                oUl.style.left = desLeft + 'px';
            }
        }, interval);
    }

    function changeIdots() {
        for(var i = 0; i < aIdots.length; i++) {
            if(aIdots[i].classList.contains('active')) {
                aIdots[i].classList.remove('active');
                break;
            }
        }
        aIdots[curImgsIdx].classList.add('active');
    }

    function getStyle(element, attr) {
        if(element.currentStyle) {
            return element.currentStyle[attr];
        }else {
            return getComputedStyle(element, null)[attr];
        }
    }


}());
















