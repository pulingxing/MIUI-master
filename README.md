# 仿小米官网

  这是一个仿小米官网的web前端项目，主要用到的技术栈： HTML+CSS3+JavaScript+DOM+BOM+AJAX+JSON。
  
  该项目项目遵循W3C标准和web语义化规范。主页主要分为头部<heade>，内容部分<article>，和页脚部分<footer>。
  
  通过原生js实现了页面的轮播功能，主要运用到js中的定时器和帧动画，运用到函数的封装，调用以及闭包回调。
  
  通过ajax和封装json数据实现了页面与数据分离，（要运行项的话目需要搭建一个本地的服务器，也可以用webstorm直接打开运行项目）
  用Ajax的异步加载的形式去请求“文档片段”或通过JSON数据配合DOM动态生成页面，这样可以使得页面不需要再去加载子页面内的整个个css和js等文件，和一些不必要的标签（包括整个<head>标签和文档声明）。这样一来就使得页面加载的速度得到很大提升，页面也不会因为跳转刷新出现短暂白屏的情况，从而使得用户体验得到提升。不需要页面跳转，网站所有功能都通过一个页面完成的页面现在的术语叫法为“SPA”（single page application，译为：单页面应用程序。也有叫“SPWA”，其中的“W”表示“web”）
              function GetJson(url, success, fail) {
              // 异常处理
              assert(url, "缺乏请求参数！");
              // 创建请求对象
              var request = new XMLHttpRequest();
              // 配置请求
              request.open("GET", url, true);
              // 发送请求
              request.send(null);
              // 监听请求
              request.onreadystatechange = function() {
                if(request.readyState == 4 && request.status == 200) {
                  // 请求成功
                  // 解析数据
                  var response = JSON.parse(request.responseText);
                  if(success) { success(response); }
                }else {
                  // 请求失败
                  if(fail) { fail(request.status); }
                }
              }
            }
 网站的部分模块通过DOM创建元素节点
 通过BOM实现了页面的跳转
