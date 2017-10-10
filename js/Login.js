/**
 * Created by admin on 2017/9/18.
 */
/**
 * 功能:登录
 */
display();
function display() {
    var scan = document.getElementById("scan-login"),
        account = document.querySelector(".accounts");
    var main = document.getElementById("main"),
        mainFooter = document.getElementById("main-footer"),
        scanBox = document.querySelector(".scan-box");
    scan.onclick = function () {
        main.style.display = "none";
        mainFooter.style.display ="none";
        scanBox.style.display = "block";
    };
    account.onclick = function () {
        main.style.display = "block";
        mainFooter.style.display ="block";
        scanBox.style.display = "none";
    }
}
//判断是否登陆成功
login("users");
function login(key) {
    var btn = document.querySelector(".obtn");
    var register = document.querySelector(".register");
    btn.onclick = function () {
        //获取值
        var ID = document.querySelector(".ID").value,
            pwd = document.querySelector(".pwd").value;
        var user = JSON.parse(localStorage[key]);
        for (var i = 0; i < user.length; i++) {
            console.log(user[i].username);
            if (user[i].username === ID && user[i].password === pwd) {
                alert("登录成功")
                //跳转页面
                location.href = "index.html"
            }else if(ID === "" || pwd === ""){
                alert("请输入帐号或密码");
            }else if(user[i].username !== ID && user[i].password !== pwd){
                alert("帐号或密码错误");
            }
        }
    };
    register.onclick = function () {
        location.href = "register.html"
    }
}