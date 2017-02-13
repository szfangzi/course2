var store = new Vue({

});

Vue.component('modal', {
  template: '<div class="maskWrapper" id="popup-wrapper" v-show="data.show" >' +
  '<div class="popupWrapper">' +
  '<div id="login" class="popup-box" v-bind:style="{width:data.width+ \'px\',height:data.height+ \'px\',left:-data.width/2+ \'px\',top:-data.height/2+ \'px\'}">' +
  '<h2><span class="popup-title">{{data.popupTitle}}</span> <a href="javascript:;" class="close" v-on:click="close">x</a></h2>' +
  '<div class="popup-content">' +
  '<form id="customer_login">' +
  '<ul>' +
  '<li class="field">' +
  '<input type="text" name="username" id="username" class="text-input" value="" placeholder="请输入你的账号" >' +
  '</li>' +
  '<li class="field js-pass">' +
  '<input type="password" name="password" id="password" class="text-input" value="" placeholder="请输入你的密码">' +
  '</li>' +
  '</ul>' +
  '<div class="ctrl">' +
  '<a class="btn btn-login" href="javascript:;">登录</a>' +
  '</div>' +
  '</form>' +
  '</div>' +
  '</div>' +
  '</div>' +
  '<div class="mask"></div>' +
  '</div>',
  props: ['data'],
  created:function() {
    store.$on('open', this.open)
  },
  methods: {
    close: function () {
      this.data.show = false;
    },
    open: function () {
      this.data.show = true;
    }
  }

});
var modalData = {
  popupTitle: '登录',
  show: false,
  width:400,
  height:200
};
var vm = new Vue({
  el: '#some-page',
  data: {
    modalData: modalData
  },
  methods:{
    openLoginPopup: function () {
      store.$emit('open');
    }
  }
});
