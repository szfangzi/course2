//jquery弹窗插件封装
$.fn.modal = function (options) {
  //this指向调用这个插件的元素
    var self = this;

  //插件默认参数
    var defaults = {
        width:600,
        height:300,
        title:'标题'
        //tmpl:$('#tmpl')
    };

  //先拿到常用的选择器
    self.$popupBox = self.find('.popup-box');
    self.$popupTitle = self.find('.popup-title');

  //初始化插件
    self.init = function () {

//自定义参数覆盖默认参数
        self.options = $.extend({}, defaults, options);
        self.initStyle();
        self.bindEvent();
        return self;
    };

  //初始化样式
    self.initStyle = function () {
        self.$popupBox.css({width:self.options.width, height:self.options.height, left:-self.options.width/2, top:-self.options.height/2});
        self.$popupTitle.html(self.options.title);
    };

  //绑定事件
    self.bindEvent = function () {
        self.find('h2 .close').click(function () {
            self.close();
        });
    };

  //弹出窗口
    self.open = function () {
        self.show();
        self.options.openCallBack && self.options.openCallBack();
    };

//关闭窗口
    self.close = function () {
        self.hide();
        self.options.closeCallBack && self.options.closeCallBack();
    };

  //执行初始化插件的函数 并返回该函数的返回值
    return self.init();
};
