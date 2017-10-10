/**
 * Created by pp on 2017/9/26.
 */

main();
function main() {

    // 1、获取DOM元素
    var aVideos     = Array.prototype.slice.call(document.querySelectorAll('.video-item'));
    var aA          = Array.prototype.slice.call(document.querySelectorAll('.figure a'));
    var aTitles     = Array.prototype.slice.call(document.querySelectorAll('h3.name'));
    var aDescs      = Array.prototype.slice.call(document.querySelectorAll('p.description'));

    var oClose      = document.querySelector('.video-close');
    var oVideoMask  = document.querySelector('.video-mask');
    var oVideoTitle = document.querySelector('.video-title');
    var oVideoShow  = document.querySelector('.video-show');
    var oVideoPlay  = document.querySelector('.video-play');
    var oVideo      = document.querySelector('video');

    // 2、请求数据
    GET("js/datas.json", function (response) {
        // 刷新页面
        var datas = response["video"];
        aVideos.forEach(function (video, idx) {
            // 加载视频列表缩略图
            aA[idx].firstElementChild.src = "images/" + datas[idx]["imgName"];
            // 将弹框播放视频的背景图地址存储在a标签的自定义属性中
            aA[idx].setAttribute("data-bgimg", datas[idx]["bgImgName"]);
            // 加载视频列表标题
            aTitles[idx].textContent = datas[idx]["title"];
            // 加载视频列表子标题
            aDescs[idx].textContent = datas[idx]["subTitle"];
        });
    }, function (errorStatus) {

    });

    // 3、点击链接显示视频窗口
    aA.forEach(function (a, idx) {
        // 设置自定义下标属性用于获取数据
        a.idx = idx;
        addEvent(a, "click", function () {
            // 更新视频弹框上的title
            oVideoTitle.textContent = aTitles[this.idx].textContent;
            // 加载视频背景图
            oVideoShow.style.background = "url(images/" + this.getAttribute('data-bgimg') + ") no-repeat 50% 50%";
            // 更新视频连接
            oVideo.src = this.getAttribute("data-video");
            // 显示视频窗口
            oVideoMask.style.display = "block";
        });
    });

    // 关闭视频窗口
    addEvent(oClose, "click", function () {
        // 暂停视频
        oVideo.pause();
        // 隐藏视频
        oVideo.style.display = "none";
        // 将播放按钮显示状态设置为block
        oVideoPlay.style.display = "block";
        // 隐藏视频窗口
        oVideoMask.style.display = "none";

    });
    // 点击播放视频
    addEvent(oVideoShow, "click", function () {
        oVideoPlay.style.display = "none";
        oVideo.style.display = "block";
        oVideo.play();
    });

}
