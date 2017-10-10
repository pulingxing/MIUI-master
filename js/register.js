/**
 * Created by admin on 2017/9/28.
 * 功能:注册验证
 */
//获取元素
   var accountNum = document.querySelector(".account-land"),
    pwd = document.querySelector(".pwd");
//获取点击按钮
var btn = document.querySelector(".btn");
//获取正则验证
var  tel = document.querySelector(".tel"),
    confirm = document.querySelector(".confirm");
//获取提示信息
var requestAccount = document.querySelector(".request-account"),
    placeTel = document.querySelector(".place-tel"),
    requestConfirm = document.querySelector(".request-confirm");
//获取图形验证码标签
var Verification = document.querySelector(".Verification");
var Vspan = Verification.getElementsByTagName("span");
var VerificationInput = document.querySelector(".Verification-input");
var request = document.querySelector(".request-verification");
//添加存储用户
function add(key,user,callBack) {
    var users = null;
    if(localStorage[key]){
        users = JSON.parse(localStorage[key]);
    }else {
        users = [];
    }
    users.push(user);
    localStorage[key] = JSON.stringify(users);
    if(callBack){
        callBack();
    }
}
//判断用户是否存在
//response 判断用户是否存在，0用户存在 1用户不存在
function judge(key,gist,value,response) {
    if(!localStorage[key]){
        response(1);
        return;
    }
    var users = JSON.parse(localStorage[key]);
    //默认用户不存在
    var tag = false;
    for(var i = 0; i < users.length; i++){
        if (users[i][gist] === value){
            tag = true;
        }
    }
    tag ? response(0) : response(1);
}
//电话验证
tel.onblur = function () {
    //进行正则验证
    var regs = /^1[34578]\d{9}$/;
    if(regs.test(tel.value)){
        placeTel.style.opacity = 0;
    }else{
        placeTel.style.opacity = 1;
        tel.value = "";
    }
};
//帐号验证
accountNum.onblur = function () {
    var regs = /^[a-zA-Z0-9_-]{4,16}$/;
    if(regs.test(accountNum.value)){
        requestAccount.style.opacity = 0;
    }else{
        requestAccount.style.opacity = 1;
        this.value = ""
    }
};
//密码验证
confirm.onblur = function () {
    if(pwd.value !== confirm.value){
        requestConfirm.style.opacity = 1;
    }else{
        requestConfirm.style.opacity = 0;
    }
};
//图形码验证
VerificationInput.onblur = function () {
    var str ="";
    for(var i = 0; i < Vspan.length; i++){
        str += Vspan[i].textContent;
    }
        if(str !== VerificationInput.value){
            request.style.opacity = 1;
            VerificationInput.value = ""
        }else {
            request.style.opacity = 0;
        }
    }
//点击时调用
Verification.onclick = function () {
    random_char(5);
};
function random_char(length) {
    var strCode = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var str_length = strCode.length;
    for (var i = 0; i < length; ++i) {
        //循环获取样式
        var color = Math.round(Math.random()*20+13);
        var randColor = "color-" + color;
        Vspan[i].textContent = "";
        Vspan[i].className = randColor;
        //获取随机数
        var rand = Math.floor(Math.random() * str_length);
        Vspan[i].textContent += strCode.charAt(rand);
    }
}
btn.onclick = function () {
    var user = {
        "username":accountNum.value,
        "password":pwd.value
    };
    judge("users","username",accountNum.value,function (status) {
        if(status === 0){
            alert("用户已存在!");
            accountNum.value = "";
            pwd.value = "";
        }else if(accountNum.value === "" || pwd.value === "" || tel.value === "" || confirm.value === "" || VerificationInput.value === ""){
            alert("表单信息有误，请重新输入")
        }else if(status === 1){
            add("users",user,function () {
                alert("注册成功");
                location.href = "index.html";
            })
        }
    })
    }
