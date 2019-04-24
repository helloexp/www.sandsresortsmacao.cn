/// <reference path="jquery-1.9.1.min.js" />
/// <reference path="Cmn.js" />
var _CurIndex = 0;
var _Video=""
$(function () {
    $("a").on("click", function () {
        $(".Js_InnerBox").scrollTop(0);
    })
    $(".Js_VideoImg").on("click", function () {
        if (_Video == $(this).attr("vl")) {
            return;
        }
        var _w = $(this).width();
        var _h = $(this).height();
        var _index = $(this).index(".Js_VideoImg");
        $(".Js_VideoImg").css("opacity", "1");
        $(this).css("opacity", "0");
        $(".Js_processVideo").remove();
        _Video = $(this).attr("vl");
        $(".Js_VideoBox").eq(_index).append('<video class="processVideo Js_processVideo" width="' + _w + '" height="' + _h + '" x-webkit-airplay="false" webkit-playsinline playsinline poster="" autoplay="autoplay" src="db-video-campaign/video/' + _Video + '.mp4" controls></video>');
        var video1 = $(".Js_processVideo")[0];
        video1.play();
        //makeVideoPlayableInline(video1);
    })
    //$(window).resize(function () {
    //    var _w = $(".Js_VideoImg").width();
    //    var _h = $(".Js_VideoImg").height();
    //    $(".Js_processVideo").attr("width", _w);
    //    $(".Js_processVideo").attr("height", _h);
    //})
    $(".Js_TableBtn").on("click", function () {
        if ($(this).hasClass("select")) {
            return;
        }
        $(".Js_ImgBox").hide();
        var _vl = $(this).attr("vl");
        $(".Js_TableBtn").removeClass("select");
        $(this).addClass("select");
        $(".Js_Box").hide();
        $(".Js_Box" + _vl).show();
    })

    $(".Js_TableMBtn").on("click", function () {
        if ($(this).hasClass("select")) {
            return;
        }
        var _vl = $(this).attr("vl");
        $(".Js_TableMBtn").removeClass("select");
        $(this).addClass("select");
        $(".Js_Box").hide();
        $(".Js_Box" + _vl).show();
    })

    $("pre").remove();

    var _kv = new Recommend({
        selector: ".Js_KVEm",
        parentBox: ".Js_KvBox",
        leftBtn: ".Js_LeftBtn",
        rightBtn: ".Js_RightBtn",
        timeOut: 0,
        speed: 400,
        selectPointBox: ".Js_PointOne",
        pointSelectClass: "select"
    });

    $(".Js_ImgEm").on("click", function () {
        var _index = $(this).attr("vl");
        $(".Js_ImgEms").hide();
        _CurIndex = $(".Js_ImgEms[vl=" + _index + "]").index();
        $(".Js_ImgEms[vl=" + _index + "]").show();
        $(".Js_ImgBox").show().on("click", function () {
            $(this).hide();
        });
    })

    $(".Js_ChageLeft").on("click", function (e) {
        e.stopPropagation();
        _CurIndex = _CurIndex - 1;
        _CurIndex = _CurIndex < 0 ? ($(".Js_ImgEms").length - 1) : _CurIndex;
        $(".Js_ImgEms").hide();
        $(".Js_ImgEms").eq(_CurIndex).show();
    })

    $(".Js_ChageRight").on("click", function (e) {
        e.stopPropagation();
        _CurIndex = _CurIndex + 1;
        _CurIndex = _CurIndex > ($(".Js_ImgEms").length - 1) ? 0 : _CurIndex;
        $(".Js_ImgEms").hide();
        $(".Js_ImgEms").eq(_CurIndex).show();
    })

    //显示底部浮层
    $(".Js_LeftShowBtn").on("click", function () {
        $(".Js_LeftShowBox").addClass("select");
        $(".Js_LeftShowBtn").hide();
    })
  //显示底部浮层
    $(".Js_LeftShowClose").on("click", function () {
        $(".Js_LeftShowBox").removeClass("select");
        $(".Js_LeftShowBtn").show();
    })

    //返回顶部
    $(".Js_GotoTopBtn").on("click", function () {
        $(".Js_InnerBox").animate({ scrollTop: 0 }, 1000, "linear");
    })

    //跳转外链
    $(".Js_GotoLinkBtn").on("click", function () {
        if (Cmn.Func.IsWeiXin()) {
            location.href = "http://moju.ikcamp.cn/sandcity/index";
        }
        else {
            $(".Js_NotWxBox").show();
        }
    })

    $(".Js_CloseTipBtn").on("click", function () {
        $(".Js_NotWxBox").hide();
    })


    //$(".wistia_popover_overlay").css("background-color","rgba(0,0,0,0.8)");
})
