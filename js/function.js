/**
 * Created by pp on 2017/9/25.
 * 功能：传值
 */

(function goods(){

    //nav-drop
    var oItem = Array.prototype.slice.call(document.querySelectorAll('.item'));
    var oImg  = Array.prototype.slice.call(document.querySelectorAll('.prod-img img'));
    var oFlag = Array.prototype.slice.call(document.querySelectorAll('.flags'));
// console.log(oFlag);
    GET("js/datas.json", function (response) {
        var data = response["drop"];
        // console.log(data);
        oItem.forEach(function (oLi, idx) {
            oImg[idx].src = "images/" +   data[idx]["photo"];
            oLi.children[1].textContent = data[idx]["name"];
            oLi.children[2].textContent = data[idx]["money"];
            // oFlag[idx].textContent = data[idx]["commodity"];
        });
    }, function (errorStatus) {

    });

    //banner-slider
    var aGoods   = Array.prototype.slice.call(document.querySelectorAll('.goods-item'));
    var aImg     = Array.prototype.slice.call(document.querySelectorAll('.goods-item img'));
    var aP       = Array.prototype.slice.call(document.querySelectorAll('.goods-item p'));
    var aA       = Array.prototype.slice.call(document.querySelectorAll('.goods-item a'));

    //获取数据
    GET("js/datas.json", function (response) {
        var datas =response["goods"];
        aGoods.forEach(function (goods,idx) {
            aImg[idx].src = "images/" + datas[idx]["photo"];
            aP[idx].textContent = datas[idx]["name"];

            if(datas[idx]["shopping"]){
                aA[idx].textContent = datas[idx]["shopping"];
            }else{
                aA[idx].textContent = "";
                aA[idx].style.border = "transparent";
            }
        });
    },function (errorStatus) {

    });


    var oCategory  = Array.prototype.slice.call(document.querySelectorAll('.category-item'));
    var oC         = Array.prototype.slice.call(document.querySelectorAll('.category-item>a'));

    GET("js/datas.json", function (response) {
        var data =response["category"];
        oCategory.forEach(function (category,idx) {
            oC[idx].textContent = data[idx]["title"];
        });
    },function (errorStatus) {

    });


}());

function  updateElectricalface(datas) {
    // 获取元素
    var oBoxItems = Array.prototype.slice.call(document.querySelectorAll('.electrical .box-item'));
    var oTopBox = document.querySelector('.electrical .top');
    var oBottomBox = document.querySelector('.electrical .bottom');
    // 遍历元素li
    oBoxItems.forEach(function (oBoxItem, idx) {
        // 设置第1、6个的图片
        if(idx == 0 || idx == 5) {
            oBoxItem.style.background = "url('images/" + datas[idx] + "') no-repeat 50% 50%";
        }else if(idx == 9) {
            // 更新上方盒子
            oTopBox.querySelector('.title').textContent = datas[idx]["top-Title"];
            oTopBox.querySelector('.price').textContent = datas[idx]["top-price"];
            oTopBox.querySelector('img').src = "images/" + datas[idx]["top-imgName"];
            // 更新浏览更多模块
            oBottomBox.querySelector('.des').textContent = datas[idx]["bottom-des"];
        }else {
            // 设置图片
            oBoxItem.children[0].style.background = "url('images/" + datas[idx]["imgName"] + "') no-repeat 50% 50%";
            // 设置标题
            oBoxItem.children[1].textContent = datas[idx]["title"];
            // 设置价格
            oBoxItem.children[2].textContent = datas[idx]["price"];
            // 设置评论
            oBoxItem.children[3].textContent = datas[idx]["appraise"];
            // 设置tips
            oBoxItem.children[4].textContent = "";
            oBoxItem.children[4].style.background = "";
            if(datas[idx]["tips"]) {
                oBoxItem.children[4].textContent = datas[idx]["tips"];
                oBoxItem.children[4].style.backgroundColor = datas[idx]["tips"] == "新品" ? "#83c44e" : "#e53935";
            }
            // 设置滑条内容
            oBoxItem.children[5].firstElementChild.textContent = datas[idx]["appraiseDes"];
            oBoxItem.children[5].lastElementChild.textContent = datas[idx]["appraiseFrom"];

        }
    });

};

function  updateIntelligentface(datas) {
    // 获取元素
    var oBoxItems = Array.prototype.slice.call(document.querySelectorAll('.intelligent .box-item'));
    var oTopBox = document.querySelector('.intelligent .top');
    var oBottomBox = document.querySelector('.intelligent .bottom');
    // 遍历元素li
    oBoxItems.forEach(function (oBoxItem, idx) {
        // 设置第1、6个的图片
        if(idx == 0 || idx == 5) {
            oBoxItem.style.background = "url('images/" + datas[idx] + "') no-repeat 50% 50%";
        }else if(idx == 9) {
            // 更新上方盒子
            oTopBox.querySelector('.title').textContent = datas[idx]["top-Title"];
            oTopBox.querySelector('.price').textContent = datas[idx]["top-price"];
            oTopBox.querySelector('img').src = "images/" + datas[idx]["top-imgName"];
            // 更新浏览更多模块
            oBottomBox.querySelector('.des').textContent = datas[idx]["bottom-des"];
        }else {
            // 设置图片
            oBoxItem.children[0].style.background = "url('images/" + datas[idx]["imgName"] + "') no-repeat 50% 50%";
            // 设置标题
            oBoxItem.children[1].textContent = datas[idx]["title"];
            // 设置价格
            oBoxItem.children[2].textContent = datas[idx]["price"];
            // 设置评论
            oBoxItem.children[3].textContent = datas[idx]["appraise"];
            // 设置tips
            oBoxItem.children[4].textContent = "";
            oBoxItem.children[4].style.background = "";
            if(datas[idx]["tips"]) {
                oBoxItem.children[4].textContent = datas[idx]["tips"];
                oBoxItem.children[4].style.backgroundColor = datas[idx]["tips"] == "新品" ? "#83c44e" : "#e53935";
            }
            // 设置滑条内容
            oBoxItem.children[5].firstElementChild.textContent = datas[idx]["appraiseDes"];
            oBoxItem.children[5].lastElementChild.textContent = datas[idx]["appraiseFrom"];

        }
    });

};

function  updateMatchface(datas) {
    // 获取元素
    var oBoxItems = Array.prototype.slice.call(document.querySelectorAll('.match .box-item'));
    var oTopBox = document.querySelector('.match .top');
    var oBottomBox = document.querySelector('.match .bottom');
    // 遍历元素li
    oBoxItems.forEach(function (oBoxItem, idx) {
        // 设置第1、6个的图片
        if(idx == 0 || idx == 5) {
            oBoxItem.style.background = "url('images/" + datas[idx] + "') no-repeat 50% 50%";
        }else if(idx == 9) {
            // 更新上方盒子
            oTopBox.querySelector('.title').textContent = datas[idx]["top-Title"];
            oTopBox.querySelector('.price').textContent = datas[idx]["top-price"];
            oTopBox.querySelector('img').src = "images/" + datas[idx]["top-imgName"];
            // 更新浏览更多模块
            oBottomBox.querySelector('.des').textContent = datas[idx]["bottom-des"];
        }else {
            // 设置图片
            oBoxItem.children[0].style.background = "url('images/" + datas[idx]["imgName"] + "') no-repeat 50% 50%";
            // 设置标题
            oBoxItem.children[1].textContent = datas[idx]["title"];
            // 设置价格
            oBoxItem.children[2].textContent = datas[idx]["price"];
            // 设置评论
            oBoxItem.children[3].textContent = datas[idx]["appraise"];
            // 设置tips
            oBoxItem.children[4].textContent = "";
            oBoxItem.children[4].style.background = "";
            if(datas[idx]["tips"]) {
                oBoxItem.children[4].textContent = datas[idx]["tips"];
                oBoxItem.children[4].style.backgroundColor = datas[idx]["tips"] == "新品" ? "#83c44e" : "#e53935";
            }
            // 设置滑条内容
            oBoxItem.children[5].firstElementChild.textContent = datas[idx]["appraiseDes"];
            oBoxItem.children[5].lastElementChild.textContent = datas[idx]["appraiseFrom"];

        }
    });

};

function updatePartsface(datas) {
    // 获取元素
    var oBoxItems = Array.prototype.slice.call(document.querySelectorAll('.parts .box-item'));
    var oTopBox = document.querySelector('.parts .top');
    var oBottomBox = document.querySelector('.parts .bottom');
    // 遍历元素li
    oBoxItems.forEach(function (oBoxItem, idx) {
        // 设置第1、6个的图片
        if(idx == 0 || idx == 5) {
            oBoxItem.style.background = "url('images/" + datas[idx] + "') no-repeat 50% 50%";
        }else if(idx == 9) {
            // 更新上方盒子
            oTopBox.querySelector('.title').textContent = datas[idx]["top-Title"];
            oTopBox.querySelector('.price').textContent = datas[idx]["top-price"];
            oTopBox.querySelector('img').src = "images/" + datas[idx]["top-imgName"];
            // 更新浏览更多模块
            oBottomBox.querySelector('.des').textContent = datas[idx]["bottom-des"];
        }else {
            // 设置图片
            oBoxItem.children[0].style.background = "url('images/" + datas[idx]["imgName"] + "') no-repeat 50% 50%";
            // 设置标题
            oBoxItem.children[1].textContent = datas[idx]["title"];
            // 设置价格
            oBoxItem.children[2].textContent = datas[idx]["price"];
            // 设置评论
            oBoxItem.children[3].textContent = datas[idx]["appraise"];
            // 设置tips
            oBoxItem.children[4].textContent = "";
            oBoxItem.children[4].style.background = "";
            if(datas[idx]["tips"]) {
                oBoxItem.children[4].textContent = datas[idx]["tips"];
                oBoxItem.children[4].style.backgroundColor = datas[idx]["tips"] == "新品" ? "#83c44e" : "#e53935";
            }
            // 设置滑条内容
            oBoxItem.children[5].firstElementChild.textContent = datas[idx]["appraiseDes"];
            oBoxItem.children[5].lastElementChild.textContent = datas[idx]["appraiseFrom"];

        }
    });

};

function updateAroundface(datas) {
    // 获取元素
    var oBoxItems = Array.prototype.slice.call(document.querySelectorAll('.around .box-item'));
    var oTopBox = document.querySelector('.around .top');
    var oBottomBox = document.querySelector('.around .bottom');
    // 遍历元素li
    oBoxItems.forEach(function (oBoxItem, idx) {
        // 设置第1、6个的图片
        if(idx == 0 || idx == 5) {
            oBoxItem.style.background = "url('images/" + datas[idx] + "') no-repeat 50% 50%";
        }else if(idx == 9) {
            // 更新上方盒子
            oTopBox.querySelector('.title').textContent = datas[idx]["top-Title"];
            oTopBox.querySelector('.price').textContent = datas[idx]["top-price"];
            oTopBox.querySelector('img').src = "images/" + datas[idx]["top-imgName"];
            // 更新浏览更多模块
            oBottomBox.querySelector('.des').textContent = datas[idx]["bottom-des"];
        }else {
            // 设置图片
            oBoxItem.children[0].style.background = "url('images/" + datas[idx]["imgName"] + "') no-repeat 50% 50%";
            // 设置标题
            oBoxItem.children[1].textContent = datas[idx]["title"];
            // 设置价格
            oBoxItem.children[2].textContent = datas[idx]["price"];
            // 设置评论
            oBoxItem.children[3].textContent = datas[idx]["appraise"];
            // 设置tips
            oBoxItem.children[4].textContent = "";
            oBoxItem.children[4].style.background = "";
            if(datas[idx]["tips"]) {
                oBoxItem.children[4].textContent = datas[idx]["tips"];
                oBoxItem.children[4].style.backgroundColor = datas[idx]["tips"] == "新品" ? "#83c44e" : "#e53935";
            }
            // 设置滑条内容
            oBoxItem.children[5].firstElementChild.textContent = datas[idx]["appraiseDes"];
            oBoxItem.children[5].lastElementChild.textContent = datas[idx]["appraiseFrom"];

        }
    });

}

