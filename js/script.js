/**
 * Created by Administrator on 2019/3/5.
 */
function byId(id){
    return typeof(id)==="string"?document.getElementById(id):id;
}
window.onload=function() {
    var index = 0,
        timer = null,
        pics=byId("banner").getElementsByTagName("div"),//图片的个数
        dots=byId("dots").getElementsByTagName("span"),//小圆点的个数
        prev=byId("prev"), //上一页
        next=byId("next"), //下一页
        len=pics.length,

        //获取菜单绑定事件
        menu=byId("menu-content"), //主菜单
        menuItems=menu.getElementsByClassName("menu-item"),
        subMenu=byId("sub-menu"),  //子菜单
        innerBox=subMenu.getElementsByClassName("inner-box");

    function slideImg() {
        var main=byId("main");
        main.onmouseover= function () {
            //鼠标移入清除定时器
            if(timer)clearInterval(timer);
        }
        main.onmouseout= function () {
            //鼠标离开启动
            timer=setInterval(function () {
                   index++;
                if(index>=len){
                    index=0;
                }
             //调用切换图片
            changeImg();
            },3000);
        }
        //调用方法,自动播放
        main.onmouseout();


        //点击圆点切换图片
        for(var d=0;d<len;d++){
            dots[d].id=d;
            dots[d].onclick= function () {
                index=this.id;
                changeImg();
            }
        }

        //下一张：
        next.onclick= function () {
            index++;
            if (index >= len){
                index = 0;
            }
                changeImg();
        }
        //上一张：
        prev.onclick= function () {
            index--;
            if (index < 0){
                index=len-1;
            }
                changeImg();
        }
    }


//切换图片
    function changeImg(){
        for(var i=0;i<len;i++){
            pics[i].style.display='none';
            dots[i].className=""; //点其他的小圆点的颜色消失，原来的颜色消失
        }
            pics[index].style.display='block';
            dots[index].className="active";//轮播时自动添加小圆点的背景颜色和点哪个圆点显示背景颜色，
    }
    slideImg();


    //遍历子菜单,显示子菜单
    for(var m=0;m<menuItems.length;m++){
        menuItems[m].setAttribute("data-index",m);
        menuItems[m].onmouseover=function(){
            subMenu.className="sub-menu";
            var idx=this.getAttribute("data-index");
            //遍历所有子菜单，将每个都隐藏
            for(var j=0;j<innerBox.length;j++){
                innerBox[j].style.display='none';
                menuItems[j].style.background='none';//滑过主菜单之后，隐藏颜色
            }
            menuItems[idx].style.background='rgba(0,0,0,0.2)';
            innerBox[idx].style.display='block'; //鼠标经过是显示
        }
    }

    //离开主菜单，子菜单隐藏
    menu.onmouseout=function(){
        subMenu.className="sub-menu hide";
    }
    //离开主菜单，来到子菜单，子菜单显示
    subMenu.onmouseover=function(){
        this.className="sub-menu";
    }
    //离开子菜单，子菜单隐藏
    subMenu.onmouseout=function(){
        this.className="sub-menu hide";
    }
}

