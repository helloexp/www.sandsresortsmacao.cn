/// <reference path="../jquery-1.9.1.min.js" />
/// <reference path="../Cmn.js" />
/// <reference path="../CmnAjax.js" />
/// <reference path="../CmnFuncExd.js" />
/// <reference path="AnimateFun.js" />

//图片的切换
//公共方法库
var Recommend = function (param, afterChangeFunc, beforeChangeFunc, touchSlideCallBack) {
    /// <summary>支持动态数据的简单DIV切换（需要CmnFuncExd的支持）</summary>
    /// <param name="afterChangeFunc" type="String">切换完毕的方法</param>
    /// <param name="beforeChangeFunc" type="function">切换前的方法</param>
    /// <param name="touchSlideCallBack" type="function">滑动切换的回掉</param>
    var _Self = this;
    _Self.Obj = $(param.selector);//存在的元素对象集合
    _Self.PatentObj = $(param.parentBox);//滑动的区域，不能和要滚动的元素相同
    _Self.LeftObj = $(param.leftBtn);//左按钮
    _Self.RightObj = $(param.rightBtn);//右按钮
    _Self.SelectPointBox = $(param.selectPointBox);//切换的小点点
    _Self.PointSelectClass = param.pointSelectClass;//小点点选择的class
    _Self.TimeOut = param.timeOut//自动切换的时间0就不切换
    _Self.ChangeSpeed = param.speed;//滚动的速度
    _Self.CurIndex = 0;//当前显示的对象的下标
    _Self.NextIndex = 0;//当前显示的对象的下标


    _Self.IsAnimate = false;//是否正在滚动
    //初始化
    _Self.Init = function () {
        if (_Self.Obj.length < 1) { console.log("没有元素存在"); return; }
        _Self.Obj.css({ "left": "1269px", "position": "absolute" });
        _Self.Obj.eq(0).css("left", "45px");
        _Self.Obj.eq(1).css("left", "453px");
        _Self.Obj.eq(2).css("left", "861px");
        _Self.Obj.eq(_Self.Obj.length - 1).css("left", "-408px");
        //_Self.Obj.eq(0).css("left", "0");
        //_Self.Obj.eq(1).css("left", "180%");
        //_Self.Obj.eq(2).css("left", "200%");
        _Self.BingTouchSlideChange();
        _Self.BingBtn();
        _Self.SelectPointBox && _Self.FillSelectPoint();
        _Self.AutoChange();
    };


    //切换到下一个的方法
    _Self.NextChange = function (index) {
        if (_Self.IsAnimate) { return; }
        beforeChangeFunc && beforeChangeFunc();
        _Self.IsAnimate = true;
        _Self.Obj.eq(_Self.CurIndex).css("left", "45px").animate({ "left": "-408px" }, _Self.ChangeSpeed, "linear", function () {
            _Self.IsAnimate = false;
            _Self.CurIndex = (index != undefined ? index : _Self.CurIndex);
            afterChangeFunc && afterChangeFunc(_Self.CurIndex);
            _Self.SelectPointBox && _Self.ChangePointSelect();
            clearTimeout(_Self.Timer); _Self.AutoChange();
        });
        var _cindex = _Self.CurIndex;
        _Self.CurIndex = (_Self.CurIndex == _Self.Obj.length - 1 ? 0 : _Self.CurIndex + 1);
        _Self.Obj.eq(_Self.CurIndex).css("left", "453px").animate({ "left": "45px" }, _Self.ChangeSpeed, "linear", function () {
        });
        _Self.NextIndex = (_Self.CurIndex == _Self.Obj.length - 1 ? 0 : _Self.CurIndex + 1);
        _Self.Obj.eq(_Self.NextIndex).css("left", "861px").animate({ "left": "453px" }, _Self.ChangeSpeed, "linear", function () {
        });
        _Self.NextIndex1 = (_Self.NextIndex == _Self.Obj.length - 1 ? 0 : _Self.NextIndex + 1);
        _Self.Obj.eq(_Self.NextIndex1).css("left", "1269px").animate({ "left": "861px" }, _Self.ChangeSpeed, "linear", function () {
        });
    };
    //切换到上一个的方法
    _Self.PreChange = function (index) {
        if (_Self.IsAnimate) { return; }
        beforeChangeFunc && beforeChangeFunc(index);
        _Self.IsAnimate = true;
        _Self.Obj.eq(_Self.CurIndex).css("left", "45px").animate({ "left": "453px" }, _Self.ChangeSpeed, "linear", function () {
            _Self.IsAnimate = false;
            _Self.CurIndex = (index != undefined ? index : _Self.CurIndex);
            afterChangeFunc && afterChangeFunc(_Self.CurIndex);
            _Self.SelectPointBox && _Self.ChangePointSelect();
            clearTimeout(_Self.Timer); _Self.AutoChange();
        });
        var _cindex = _Self.CurIndex;
        _Self.CurIndex = (_Self.CurIndex == 0 ? _Self.Obj.length - 1 : _Self.CurIndex - 1);
        _Self.Obj.eq(_Self.CurIndex).css("left", "-408px").animate({ "left": "45px" }, _Self.ChangeSpeed, "linear", function () {

        });
        _Self.NextIndex = (_cindex == _Self.Obj.length - 1 ? 0 : _cindex + 1);
        _Self.Obj.eq(_Self.NextIndex).css("left", "453px").animate({ "left": "861px" }, _Self.ChangeSpeed, "linear", function () {

        });
        _Self.NextIndex1 = (_Self.NextIndex == _Self.Obj.length - 1 ? 0 : _Self.NextIndex + 1);
        _Self.Obj.eq(_Self.NextIndex1).css("left", "861px").animate({ "left": "1269px" }, _Self.ChangeSpeed, "linear", function () {

        });
    };


    ////切换到下一个的方法
    //_Self.NextChange = function (index) {
    //    if (_Self.IsAnimate || index > (_Self.Obj.length - 1) || index == _Self.CurIndex) { return; }
    //    beforeChangeFunc && beforeChangeFunc((index != undefined ? index : _Self.CurIndex), 1);
    //    _Self.IsAnimate = true;
    //    _Self.Obj.eq(_Self.CurIndex).css("left", "0").animate({ "left": "-100%" }, _Self.ChangeSpeed, "linear", function () {
    //        _Self.IsAnimate = false;
    //        _Self.CurIndex = (index != undefined ? index : _Self.CurIndex);
    //        afterChangeFunc && afterChangeFunc(_Self.CurIndex);
    //        _Self.SelectPointBox && _Self.ChangePointSelect();
    //        clearTimeout(_Self.Timer); _Self.AutoChange();

    //    });
    //    _Self.CurIndex = (_Self.CurIndex == _Self.Obj.length - 1 ? 0 : _Self.CurIndex + 1);
    //    _Self.Obj.eq(index != undefined ? index : _Self.CurIndex).css("left", "100%").animate({ "left": "0%" }, _Self.ChangeSpeed, "linear", function () {
    //    });

    //};
    ////切换到上一个的方法
    //_Self.PreChange = function (index) {
    //    if (_Self.IsAnimate || index > (_Self.Obj.length - 1) || index == _Self.CurIndex) { return; }
    //    beforeChangeFunc && beforeChangeFunc((index != undefined ? index : _Self.CurIndex), 0);
    //    _Self.IsAnimate = true;
    //    _Self.Obj.eq(_Self.CurIndex).css("left", "0").animate({ "left": "100%" }, _Self.ChangeSpeed, "linear", function () {
    //        _Self.IsAnimate = false;
    //        _Self.CurIndex = (index != undefined ? index : _Self.CurIndex);
    //        afterChangeFunc && afterChangeFunc(_Self.CurIndex);
    //        _Self.SelectPointBox && _Self.ChangePointSelect();
    //        clearTimeout(_Self.Timer); _Self.AutoChange();
    //    });
    //    _Self.CurIndex = (_Self.CurIndex == 0 ? _Self.Obj.length - 1 : _Self.CurIndex - 1);
    //    _Self.Obj.eq(index != undefined ? index : _Self.CurIndex).css("left", "-100%").animate({ "left": "0%" }, _Self.ChangeSpeed, "linear", function () {

    //    });

    //};


    //绑定左右滑动
    _Self.BingTouchSlideChange = function () {

        try {
            Cmn.Func.TouchSlide(_Self.PatentObj, 5, function (dir) {
                if (_Self.IsAnimate) { return; }
                if (dir == "left") {
                    touchSlideCallBack && touchSlideCallBack();
                    _Self.NextChange();
                }
                else if (dir == "right") {
                    touchSlideCallBack && touchSlideCallBack();
                    _Self.PreChange();
                } else if (dir == "down") {
                } else if (dir == "up") {
                }
            }, "", "", "horizontal");
        }
        catch (e) {

        }
    }
    //填充小圆点
    _Self.FillSelectPoint = function () {
        var _obj = _Self.SelectPointBox.children().eq(0).clone();
        _Self.SelectPointBox.html("");
        for (var _i = 0; _i < _Self.Obj.length; _i++) {
            _Self.SelectPointBox.append(_obj.clone());
        }
        _Self.SelectPointBox.children().removeClass(_Self.PointSelectClass);
        _Self.SelectPointBox.children().eq(0).addClass(_Self.PointSelectClass);
        //_Self.BindSelectPointClick();
    }
    _Self.BindSelectPointClick = function () {
        _Self.SelectPointBox.children().on("click", function () {
            var _index = $(this).index();
            if (_index < _Self.CurIndex) {
                _Self.PreChange(_index);
            } else {
                _Self.NextChange(_index);
            }
        });
    }
    //切换小园点的选择状态
    _Self.ChangePointSelect = function () {
        _Self.SelectPointBox.children().removeClass(_Self.PointSelectClass);
        _Self.SelectPointBox.children().eq(_Self.CurIndex).addClass(_Self.PointSelectClass);
    }
    //切换自动切换
    _Self.AutoChange = function () {
        if (!_Self.TimeOut) { return; }
        _Self.Timer = setTimeout(function () {
            _Self.NextChange();
            _Self.AutoChange();
        }, _Self.TimeOut + _Self.ChangeSpeed);
    }
    //绑定左右按钮
    _Self.BingBtn = function () {
        _Self.LeftObj && _Self.LeftObj.off("click").on("click", function () {
            _Self.NextChange();
        })
        _Self.RightObj && _Self.RightObj.off("click").on("click", function () {
            _Self.PreChange();
        });
    }
    _Self.Init();
};