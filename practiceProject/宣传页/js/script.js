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

var screenAnimateElements = {
    '.screen-1' : [
      '.screen-1__heading',
      '.screen-1__description'
    ],
    '.screen-2' : [
      '.screen-2__heading',
      '.screen-2__description',
      '.screen-2__man',
      '.screen-2__rocket',
      '.screen-2__horizontal'
    ],
    '.screen-3' : [
      '.screen-3__heading',
      '.screen-3__left',
      '.screen-3__description',
      '.screen-3__courses',
      '.screen-3__horizontal'
    ],
    '.screen-4' : [
      '.screen-4__heading',
      '.screen-4__description',
      '.screen-4__detail_1',
      '.screen-4__detail_2',
      '.screen-4__detail_3',
      '.screen-4__detail_4',
      '.screen-4__horizontal'
    ],
    '.screen-5' : [
       '.screen-5__image',
      '.screen-5__heading',
      '.screen-5__description',
      '.screen-5__horizontal'
    ]
};

function setScreenAnimateInit(screenCls) {
    //var screen = document.querySelector(screenCls); // 获取当前屏的元素
    var animateElements =  screenAnimateElements[screenCls]; // 需要设置动画的元素
    for(var i=0;i<animateElements.length;i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls +' '+animateElements[i].substr(1)+'_animate_init');
    }
}

// 第一步：初始化设置
window.onload = function () {
    //  为所有元素设置 init
    for(k in screenAnimateElements){
      if(k == '.screen-1'){
        continue;
      }
      setScreenAnimateInit(k);
    }
}
console.log('onload done');

// 第二步：滚动条设置
function playScreenAnimateDone(screenCls){
    //var screen = document.querySelector(screenCls); // 获取当前屏的元素
    var animateElements =  screenAnimateElements[screenCls]; // 需要设置动画的元素
    for(var i=0;i<animateElements.length;i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));    
    }
}

//  第二步附加：初始化第一屏的动画（1. skipScreenAnimateInit 2.跳过 init ）
setTimeout(function(){
    playScreenAnimateDone('.screen-1');
    var header = document.querySelector('.header');
    console.log(header);
    var baseCls = header.getAttribute('class');
    header.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
},100);

console.log('first screen animation done');

var navItems = getAllElem('.header__nav-item');
var outLineItems = getAllElem('.outline__item');
//var navTip = getElem('header__nav-tip');

var switchNavItemsActive = function(idx){
    for(var i=0;i < navItems.length;i++){
       // console.log(navItems[i]);
        delCls(navItems[i],'header__nav-item_status_active');
        navTip.style.left = 0+'px';
    }
    addCls(navItems[idx],'header__nav-item_status_active');
    navTip.style.left = ( idx * 140 )+'px';
    
    for(var i=0;i<outLineItems.length;i++){
        delCls(outLineItems[i],'outline__item_status_active');
    }
    addCls(outLineItems[idx],'outline__item_status_active');
}

window.onscroll = function () {

    //获得页面向左、向上卷动的距离
    function getScroll(){
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }
    var top  = getScroll();

    //   2.1 导航条样式变动
    if( top > 80 ){
        addCls( getElem('.header'),'header_status_white' );
    }else{
        delCls( getElem('.header'),'header_status_white' );
        switchNavItemsActive(0); // 后面添加的，不需要立刻
    }

    if(top > 640*1 ){
        addCls( getElem('.outline'),'outline_status_in' );
    }
    // }else{
    //     delCls( getElem('.outline'),'outline_status_in' );
    // }

    if( top > ( 640*1 - 100) ){
        playScreenAnimateDone('.screen-2');
        switchNavItemsActive(1); // 后面添加的，不需要立刻
    }
    if( top > ( 640*2 - 100) ){
        playScreenAnimateDone('.screen-3');
        addCls(getElem('.screen-3__courses'), 'screen-3__courses_bounce_animation')
        switchNavItemsActive(2); 
    }
    if( top > ( 640*3 - 100) ){
        playScreenAnimateDone('.screen-4');
        switchNavItemsActive(3); 
    }
    if( top > ( 640*4 - 100) ){
        playScreenAnimateDone('.screen-5');
        switchNavItemsActive(4); 
    }
}

//  第三步 导航条双向定位

// 3.1 导航条 - 点击页面跳转
var setNavJump = function(i,lib){
    var elem = lib[i];
    elem.onclick = function(){
        document.documentElement.scrollTop = i*640 + 1;
        document.body.scrollTop = i*640 + 1;
    }
}

for(var i=0;i<navItems.length-1;i++){
    setNavJump(i,navItems);
}

// 3.2  大纲-点击跳转
for(var i=0;i<outLineItems.length;i++){
    setNavJump(i,outLineItems);
}
// 3.3 双向绑定，回到 onscrollTop（移动 navIntes、outLineItems到顶固）、增加 clear 样式 函数

// 滑动门
var navTip = getElem('.header__nav-tip');
var setTip = function(idx,lib){
    lib[idx].onmouseover =function(){
        //console.log(this,idx);
        navTip.style.left = ( idx * 140 )+'px';
    }
    var currentIdx = 0;
    lib[idx].onmouseout = function(){
        //console.log(currentIdx);
        for(var i=0;i<lib.length;i++){
            if( getCls( lib[i] ).indexOf('header__nav-item_status_active') > -1  ){
            currentIdx = i;
            break;
            }
        }
        navTip.style.left = ( currentIdx * 140 )+'px';
    }

}

for(var i=0;i<navItems.length-1;i++){
    setTip(i,navItems);
}
