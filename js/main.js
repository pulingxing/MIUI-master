/**
 * Created by pp on 2017/9/25.
 * 功能：家电周边js部分
 */
(function electrical() {
    // 获取dom元素
    var aLis = Array.prototype.slice.call(document.querySelectorAll(".electrical .menu-list li"));

    // 获取数据
    GET("js/datas.json", function (response) {
        // 设置默认数据
        updateElectricalface(response["electrical"][0]);

        // 交互设计
        aLis.forEach(function (oLi, idx) {
            oLi.idx = idx;
            oLi.onmouseenter = function () {
                for(var i = 0; i < aLis.length; i++) {
                    if(aLis[i].classList.contains('tab-active')) {
                        aLis[i].classList.remove('tab-active');
                        break;
                    }
                }
                this.classList.add('tab-active');
                updateElectricalface(response["electrical"][this.idx]);
            }
        });
    }, function (fail) {});


}());

(function intelligent() {
    // 获取dom元素
    var aLis = Array.prototype.slice.call(document.querySelectorAll(".intelligent .menu-list li"));

    // 获取数据
    GET("js/datas.json", function (response) {
        // 设置默认数据
        updateIntelligentface(response["intelligent"][0]);

        // 交互设计
        aLis.forEach(function (oLi, idx) {
            oLi.idx = idx;
            oLi.onmouseenter = function () {
                for(var i = 0; i < aLis.length; i++) {
                    if(aLis[i].classList.contains('tab-active')) {
                        aLis[i].classList.remove('tab-active');
                        break;
                    }
                }
                this.classList.add('tab-active');
                updateIntelligentface(response["intelligent"][this.idx]);
            }
        });
    }, function (fail) {});


}());

(function match() {
    // 获取dom元素
    var aLis = Array.prototype.slice.call(document.querySelectorAll(".match .menu-list li"));

    // 获取数据
    GET("js/datas.json", function (response) {
        // 设置默认数据
        updateMatchface(response["match"][0]);

        // 交互设计
        aLis.forEach(function (oLi, idx) {
            oLi.idx = idx;
            oLi.onmouseenter = function () {
                for(var i = 0; i < aLis.length; i++) {
                    if(aLis[i].classList.contains('tab-active')) {
                        aLis[i].classList.remove('tab-active');
                        break;
                    }
                }
                this.classList.add('tab-active');
                updateMatchface(response["match"][this.idx]);
            }
        });
    }, function (fail) {});


}());

(function parts() {
    // 获取dom元素
    var aLis = Array.prototype.slice.call(document.querySelectorAll(".parts .menu-list li"));

    // 获取数据
    GET("js/datas.json", function (response) {
        // 设置默认数据
        updatePartsface(response["parts"][0]);

        // 交互设计
        aLis.forEach(function (oLi, idx) {
            oLi.idx = idx;
            oLi.onmouseenter = function () {
                for(var i = 0; i < aLis.length; i++) {
                    if(aLis[i].classList.contains('tab-active')) {
                        aLis[i].classList.remove('tab-active');
                        break;
                    }
                }
                this.classList.add('tab-active');
                updatePartsface(response["parts"][this.idx]);
            }
        });
    }, function (fail) {});


}());

(function around() {
    // 获取dom元素
    var aLis = Array.prototype.slice.call(document.querySelectorAll(".around .menu-list li"));

    // 获取数据
    GET("js/datas.json", function (response) {
        // 设置默认数据
        updateAroundface(response["around"][0]);

        // 交互设计
        aLis.forEach(function (oLi, idx) {
            oLi.idx = idx;
            oLi.onmouseenter = function () {
                for(var i = 0; i < aLis.length; i++) {
                    if(aLis[i].classList.contains('tab-active')) {
                        aLis[i].classList.remove('tab-active');
                        break;
                    }
                }
                this.classList.add('tab-active');
                updateAroundface(response["around"][this.idx]);
            }
        });
    }, function (fail) {});


}());

