//选择图片
var elmCanvas = document.getElementById("canvas");
var ctx = elmCanvas.getContext("2d");

var onLoadImg = 0;    //加载图片数量
var setInt ;           //定时器
var articulation = 1;

function alert(){
    $(".hint-module").css('top','50px')
    setTimeout(function(){
        $(".hint-module").css('top','-200px')
    },2000)
}
/**
 * 绘制画布大小
 */
function transformCanvas() {
    elmCanvas.width = parseInt($(".to-show.activation .classics-pack").css('width'))* articulation ;
    elmCanvas.height = parseInt($(".to-show.activation .classics-pack").css('height'))* articulation ;
}
/**
 * 绘制图片（选择需要绘制的图片）
 * @returns {boolean}
 */
function createCanvas() {
    var img = $(".to-show.activation [data-pack=target] [data-sel] img");
    var imgLength = $(".to-show.activation [data-pack=target] [data-sel] img[style]").length;
    if (img.length == imgLength){
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, elmCanvas.width, elmCanvas.height);
        for (var i = 0; i< imgLength ; i++){
            onLoadImg++;
            graphImg(img[i]);
        }
        addFrame();
        return true;
    }else {
        alert('please choose a picture')
        return false;
    }
}
/**
 * 执行 canvas 绘制
 * @param elm
 * @param callBack
 */
function graphImg( elm ,callBack){
    var a = new Image();
    a.src = elm.src;
    var parent = $(elm).parent();
    var catwidth = parseInt(parent.css("width"));
    var catheight = parseInt(parent.css("height"));
    var ctxY = parseInt(parent.css("top"));
    var ctxX = parseInt(parent.css("left"));

    var caty,catx,catW,catH;
    if(elm.style.width){
        caty = ( a.height- catheight/catwidth*a.width )/2;
        catx = 0;
        catW = a.width;
        catH = a.height-caty*2;
    }else {
        catx = (a.width - catwidth/catheight*a.height )/2;
        caty = 0;
        catW =a.width-catx*2;
        catH = a.height;
    }

    a.onload = function() {
        ctx.globalAlpha = 1;
        ctx.drawImage(a,catx, caty, catW, catH , ctxX* articulation, ctxY* articulation , catwidth * articulation, catheight* articulation );
        ctx.restore();
        onLoadImg--;
    };
}
/**
 * 添加边框
 * @param elm
 * @param callBack
 */
function addFrame( elm ){
    var a = new Image();
    if (!elm){
        a.src = $('.to-show.activation>img')[0] && $('.to-show.activation>img')[0].src
    }else {
        a.src = elm.src;
    }
    a.onload = function() {
        ctx.globalAlpha = 1;
        ctx.drawImage(a,0, 0, elmCanvas.width, elmCanvas.height );
        ctx.restore();
    };
}
/**
 * 选择图片
 * @param e
 */
function changImg(e){
    for (var i = 0; i < e.target.files.length; i++) {
        var file = e.target.files.item(i);
        var freader = new FileReader();
        freader.readAsDataURL(file);
        freader.onload = function(e) {
            $("<img>").attr({"src":e.target.result , "data-time":new Date().getTime()}).appendTo("#imgPack");
        }
    }
}
/**
 * 转换需要下载图片的 base64
 * @param code
 * @returns {*}
 */
function base64Img2Blob(code){
    var parts = code.split(';base64,');
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
}
/**
 * 下载图片
 * @param fileName
 * @param content
 */
function downloadFile(fileName, content){
    if(onLoadImg === 0){
        onLoadImg = 0;
        var aLink = document.createElement('a');
        var blob = base64Img2Blob(content); //new Blob([content]);

        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);

        aLink.dispatchEvent(evt);
    }
}
/**************** 触发事件 ***************/
var modelNumber ;//图片数量
/**
 * 选择题目
 */
$(document).on('click','[data-select]',function () {
    var clickSle = $(this).attr("data-select");
    //得到题目跳转下一题
    var subject=$("[data-subject]").attr('data-subject');
    if(subject == "start"){
        if (clickSle == 'start-2'){
            modelNumber = 2;
        }else if(clickSle == 'start-3'){
            modelNumber = 3;
        }else if(clickSle == 'start-4'){
            modelNumber = 4;
        }
        $("[data-subject]").attr('data-subject','exposure').text('Please choose the collage style!');
        $(".header ul.select").html('<li data-select="exposure-1">Classic Mode</li><li data-select="exposure-2">Art Mode</li>')
    }else if( subject == "exposure" ){
        if (clickSle == "exposure-1"){
            //alert("展示"+modelNumber+"张-经典模式");
            $("[data-need=templet-1-"+modelNumber+"]").click();
            $("[data-moment=1]").addClass('display-none');
            $("[data-moment=2]").removeClass("display-none");
        }else if( clickSle == "exposure-2" ){
            $("[data-jump=2]").click();
            $("[data-subject]").attr('data-subject','graph').text('Please choose the detail style!');
            $(".header ul.select").html('<li data-select="graph-1">Circle Border</li><li data-select="graph-2">Star Border</li>')
        }
    }else if( subject == "graph" ){
        if(clickSle == "graph-1"){
            $("[data-need=templet-2-"+modelNumber+"]").click();
            $("[data-moment=1]").addClass('display-none');
            $("[data-moment=2]").removeClass("display-none");
        }else if( clickSle == "graph-2" ){
            $("[data-need=templet-3-"+modelNumber+"]").click();
            $("[data-moment=1]").addClass('display-none');
            $("[data-moment=2]").removeClass("display-none");
        }
    }

});
/**
 * 点击选图片
 */
$(document).on('click','[data-time]',function (e ) {
    var elm=$(".to-show.activation [data-pack=target] .activation img").attr("src",e.target.src).addClass("display-block");
    if(elm.parent().height()/elm.parent().width() > elm.height()/elm.width()){
        elm[0].style.height='100%';
        elm[0].style.width='';
    }else {
        elm[0].style.height='';
        elm[0].style.width='100%';
    }
    var elm_top = (elm.parent().height() - elm.height())/2 +"px" ;
    var elm_left = (elm.parent().width() - elm.width())/2 +"px" ;
    elm[0].style.top = elm_top;
    elm[0].style.left = elm_left;
    $("[data-mould=select]").addClass("display-none")
});
/**
 * 点击弹出弹框
 */
$(document).on('click','[data-pack=trigger] [data-sel]',function (e ) {
    $("[data-pack=target] .activation").removeClass('activation');
    var targ = $(this).attr("data-sel");
    $(".to-show.activation [data-pack=target] [data-sel="+targ+"]").addClass("activation");
    $("[data-mould=select]").removeClass("display-none")
});
/**
 * 生成图片
 */
$(document).on('click','[data-click=generate-image]',function (e ) {
    //生成图片
    if(createCanvas()){
        $("[data-id=canvas]").addClass('display-block');
    }
});
/**
 * 下载图片
 */
$(document).on('click','[data-click=download]',function (e ) {
    var image = document.getElementById("canvas").toDataURL("image/png");
    downloadFile(new Date().getTime()+'.png', image);
    $("[data-id=canvas]").removeClass('display-block');
});
$(document).on('click','[data-click=once-download]',function (e ) {
    var isTrue = createCanvas();
    if (isTrue){
        setTimeout(function(){
            var image = document.getElementById("canvas").toDataURL("image/png");
            downloadFile(new Date().getTime()+'.png', image);
        },50)
    }
});
/**
 * 关闭模态框
 */
$(document).on('click','[data-click=close-modal]',function (e ) {
    console.log("display-block");
   $("[data-id=canvas]").removeClass('display-block');
});
/**
 * 点击弹出弹框
 */
$(document).on('click','[data-templet=pack] [data-need]',function (e ) {
    var temNeed = $(this).attr('data-need');
    $('.to-show.activation').removeClass('activation');
    $("[data-tem="+temNeed+"]").addClass("activation");
    transformCanvas();
});
/**
 * 选择模式
 */
$(document).on('click','[data-templet=pack] [data-jump]',function (e ) {
    var obj = $(this).attr('data-jump');
   $(".activate[data-jump],.activate[data-enter]").removeClass('activate');
    $(this).addClass('activate');
    $("[data-enter="+obj+"]").addClass('activate');
});
/**
 * 刷新页面
 */
$(document).on('click','[data-click=reset-img]',function (e ) {
    location.reload();
});
/**
 * 关闭选择照片框
 */
$(document).on('click','[ data-remove=select]',function (e ) {
    $("[data-mould=select]").addClass("display-none")
});


//transformCanvas();
















