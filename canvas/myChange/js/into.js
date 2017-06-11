var drawing=document.getElementById("drawing");
//确定浏览器支持<canvas>元素
if(drawing.getContext){
//取得绘图上下文对象的引用，“2d”是取得2D上下文对象
    var context=drawing.getContext("2d");
//绘制矩形
    context.strokeRect(20,20,150,100);
}


function getURL(canvasID , imgID) {
    //取得图像的数据URI
    var imgURI=canvasID.toDataURL("image/png");
    //当有需要展示时展示图片
    if( imgID ){
        document.getElementById(imgID).src=imgURI;
    }
    return imgURI ;
}


/**
 * 从 file 域获取 本地图片 url
 */
function getFileUrl(sourceId) {
    var url;
    if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
        url = document.getElementById(sourceId).value;
    } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
        url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
        url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    }
    return url;
}
/**
 * 将本地图片 显示到浏览器上
 */
function preImg(sourceId, targetId) {
    var url = getFileUrl(sourceId);
    var imgPre = document.getElementById(targetId);
    imgPre.src = url;
}

//选择图片
function changImg(e){
    for (var i = 0; i < e.target.files.length; i++) {
        var file = e.target.files.item(i);
        if (!(/^image\/.*$/i.test(file.type))) {
            continue; //不是图片 就跳出这一次循环
        }
        //实例化FileReader API
        var freader = new FileReader();
        freader.readAsDataURL(file);
        freader.onload = function(e) {
            $("#myImg").attr("src",e.target.result);
        }
    }
}

getURL( drawing , "showPictures" ) ;











