var userName = document.querySelector("#userName"),
    password = document.querySelector("#password"),
    passwordWarning = document.querySelector(".password-warning"),
    passwordCheck = document.querySelectorAll(".passwordCheck"),
    passwordAgain = document.querySelector("#passwordAgain"),
    trueName = document.querySelector("#trueName"),
    idNum = document.querySelector("#idNum"),
    email = document.querySelector("#email"),
    tel = document.querySelector("#tel"),
    description = document.querySelectorAll(".form__important-description"),
    cho = document.querySelector("#choose"),
    next = document.querySelector("#nextStep");
console.log(cho.checked);
var test_userName = false,
    test_password = false,
    test_passwordAgain = false,
    test_trueName = false,
    test_idNum = false,
    test_email = false,
    test_tel = false;

// 获取元素
var getElem = function( selector ){
    return document.querySelector(selector);
}
var getAllElem = function( selector ){
    return document.querySelectorAll(selector);
}
// 获取元素的样式
var getCls = function ( element ) {
    return element.getAttribute('class');
}
// 设置元素的样式
var setCls = function( element ,cls){
    return element.setAttribute('class',cls);
}  
// 为元素添加样式
var addCls = function( element , cls ){
    var baseCls  = getCls(element);
    if( baseCls.indexOf(cls) === -1){
        setCls(element,baseCls+' '+cls); // 注意空格
    }
    return ;
}
// 为元素删减样式
var delCls = function( element , cls){
    var baseCls  = getCls(element);
    if( baseCls.indexOf(cls) > -1){ // 更精确的需要用正则表达式 ,因为这里只用于切换 _animate_in 所以没事
        setCls( element,baseCls.split(cls).join(' ').replace(/\s+/g,' ') );
    }
    return ;
}

// 用户名
userName.onblur = function() {
    var reg = /^\w{6,30}$/;
    if (this.value == "" || !reg.exec(userName.value)) {
        description[0].innerHTML = "6-30位字母、数字或'_'，字母开头";
        description[0].style.color = "red";
        userName.focus();
    } else {
        description[0].innerHTML = "用户名输入正确";
        description[0].style.color = "green";
        test_userName = true;
    }
};

// 密码 check
password.onblur = function() {
    var reg = /^[\w~!@#$%^&*()_+`\-={}:';"<>?,.\/]{6,20}$/;
    var weak = /^\d{6,20}$|^[a-zA-Z]{6,20}$|^[~!@#$%^&*()_+`\-={}:';"<>?,.\/]{6,20}$/;
    var medium = /^[\da-zA-Z]{6,20}$|^[a-zA-Z~!@#$%^&*()_+`\-={}:';"<>?,.\/]{6,20}$|^[\d~!@#$%^&*()_+`\-={}:';"<>?,.\/]{6,20}$/;
    if (this.value == "" || !reg.exec(password.value)) {
        passwordWarning.innerHTML = "6-20位字母,数字或符号";
        passwordWarning.style.color = "red";
        delCls(passwordCheck[1], 'medium');
        delCls(passwordCheck[2], 'strong')
        password.focus();
    }else if (weak.exec(password.value)) {
        passwordWarning.innerHTML = "";
        test_password = true;
        delCls(passwordCheck[1], 'medium');
        delCls(passwordCheck[2], 'strong')
        console.log("weak");
    } else if (medium.exec(password.value)) {
        passwordWarning.innerHTML = "";
        addCls(passwordCheck[1], 'medium');
        delCls(passwordCheck[2], 'strong')
        test_password = true;
        console.log(medium.exec(password.value));
        console.log("medium");
    } else if (reg.exec(password.value)) {
        passwordWarning.innerHTML = "";
        addCls(passwordCheck[1], 'medium');
        addCls(passwordCheck[2], 'strong');
        test_password = true;
        console.log("strong");
    }
};

// 密码确认
passwordAgain.onblur = function() {
    if (this.value == "") {
        description[1].innerHTML = "输入框不能为空";
        description[1].style.color = "red";
        console.log(passwordAgain.value);
        passwordAgain.focus();
    } else {
        if (this.value != password.value) {
            description[1].innerHTML = "两次密码输入不一致，请重新输入";
            description[1].style.color = "red";
            console.log(passwordAgain.value);
            passwordAgain.focus();
        } else {
            description[1].innerHTML = "两次输入一致";
            description[1].style.color = "green";
            test_passwordAgain = true;
        }
    }
};

// 姓名
trueName.onblur = function() {
    //var reg = /^[a-zA-Z]{3,30}$/;
    var reg = /^[\u4e00-\u9fa5]{2,15}|[a-zA-Z]{3,30}$/;
    if (this.value == "" || !reg.exec(trueName.value)) {
        description[2].innerHTML = "姓名只能包含中文或者英文,且字符在3-30个之间!";
        description[2].style.color = "red";
        trueName.focus();
    } else {
        description[2].innerHTML = "姓名输入正确";
        description[2].style.color = "green";
        test_trueName = true;
    }
};

// 证件
idNum.onblur = function () {
    var reg = /^\d{17}[0-9x]$/;
    if (this.value == "" || !reg.exec(idNum.value)) {
        description[3].innerHTML = "请输入18位身份证号码";
        description[3].style.color = "red";
        idNum.focus();
    } else {
        description[3].innerHTML = "号码输入正确";
        description[3].style.color = "green";
        test_idNum = true;
    }
};

// 邮箱
email.onblur = function () {
    var reg = /^\w+@\w+\.[a-zA-Z_]{2,4}$/;
    if (!reg.exec(email.value)) {
        description[4].innerHTML = "请输入正确的邮箱";
        description[4].style.color = "red";
        email.focus();
    } else {
        description[4].innerHTML = "邮箱格式正确";
        description[4].style.color = "green";
        test_email = true;
    }
};

// 手机号
tel.onblur = function () {
    var reg = /^1[3-9,0]\d{9}$/;
    if (this.value == "" || !reg.exec(tel.value)) {
        description[5].innerHTML = "您输入的手机号码不是有效的格式！";
        description[5].style.color = "red";
        tel.focus();
    } else {
        description[5].innerHTML = "手机格式正确";
        description[5].style.color = "green";
        test_tel = true;
    }
};

// 按钮
next.onclick = function () {
    if (cho.checked == false || test_idNum == false || test_password == false 
        || test_passwordAgain == false || test_tel == false
        || test_trueName == false || test_userName == false) {
        alert("信息不全！！！");
    } else {
        console.log("tiaozhuan");
        window.location.href = 'http://www.imooc.com';
    }
};