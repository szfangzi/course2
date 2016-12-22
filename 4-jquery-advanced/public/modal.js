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
        self.opt = $.extend({}, defaults, options);
      //初始化样式
        self.initStyle();
      //绑定事件
        self.bindEvent();
        return self;
    };

  //初始化样式
    self.initStyle = function () {
        self.$popupBox.css({width:self.opt.width, height:self.opt.height, left:-self.opt.width/2, top:-self.opt.height/2});
        self.$popupTitle.html(self.opt.title);
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
        self.opt.openCallBack && self.opt.openCallBack();
    };

//关闭窗口
    self.close = function () {
        self.hide();
        self.opt.closeCallBack && self.opt.closeCallBack();
    };

  //执行初始化插件的函数 并返回该函数的返回值
    return self.init();
};
