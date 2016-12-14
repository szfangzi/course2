$(function () {

  //路由事件
  $(window).on('hashchange', function () {
    $('.sidebar li').removeClass('active');
    hashFn();
  });
  hashFn();

  $('.main').on('click', '.btn-del', function (e) {
    console.log($(this).parents('tr'));
  });

  //路由切换页面函数
  function hashFn() {
    var hash = location.hash;
    if(hash == '#plist' || hash == ''){
      $('.nav-plist').addClass('active');
      render('#plist-tmpl', {});
    }else if(hash == "#addp"){
      $('.nav-addp').addClass('active');
      render('#addp-tmpl', {});
    }
  }

  //主体内容渲染
  function render(tmplId, data){
    var tmpl = $(tmplId).html();
    var html = ejs.render(tmpl, data);
    $('.main').html(html);
  }

});
