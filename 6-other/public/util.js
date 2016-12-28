var Util = (function () {

  return {
    uuid: function () {
      var i, random;
      var uuid = '';

      for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
          uuid += '-';
        }
        uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
      }

      return uuid;
    },
    deepCopy: function (p, c) {
      var c = c || {};
      for (var i in p) {
        if (typeof p[i] === 'object') {
          c[i] = (p[i].constructor === Array) ? [] : {};
          arguments.callee(p[i], c[i]);
        } else {
          c[i] = p[i];
        }
      }
      return c;
    },
    //分析递归函数，先分析函数本身，再分析递归后的情况
    nodeRecursion: function (nodes, pid) {
      //result负责存储节点父id等于pid的元素, 即当前pid的所有子元素
      var result = [], tmp = [];
      for (var i in nodes) {
        //判断节点的父id等于pid
        if (nodes[i].pid === pid) {
          //匹配的话就拷贝这个节点为obj，这样可以不破坏原来的nodes节点数组
          var obj = Util.deepCopy(nodes[i], {});
          //传入该节点的id作为pid调用节点递归函数,返回该节点的子元素数组
          tmp = arguments.callee(nodes, nodes[i].id);
          //该节点如果有子元素那么就把子元素数组添加到该节点的childs属性
          if (tmp.length > 0) {
            obj.childs = tmp;
          }else{
            obj.childs = "";
          }
          //result负责存储节点父id等于pid的元素, 即当前pid的子元素数组
          result.push(obj);
        }
      }
      //返回当前pid的所有子元素
      return result;
    },
    store: function (name, data) {
      var data = data || [];
      if (arguments.length > 1) {
        localStorage[name] = JSON.stringify(data);
      } else {
        var store = localStorage[name];
        return (store && JSON.parse(store)) || [];
      }

    },
    dateFormat: function (obj, fmt) {
      var o = {
        "M+": obj.getMonth() + 1, //月份
        "D+": obj.getDate(), //日
        "h+": obj.getHours(), //小时
        "m+": obj.getMinutes(), //分
        "s+": obj.getSeconds(), //秒
        "q+": Math.floor((obj.getMonth() + 3) / 3), //季度
        "S": obj.getMilliseconds() //毫秒
      };
      if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (obj.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    },
    isToday: function (date) {
      var now = new Date();
      if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate()) {
        return true;
      }
      return false;
    },
    isPassedDate: function (timestamp) {
      var now = new Date();
      if (now.getTime() > timestamp) {
        return true;
      }
      return false;
    }
  }
}());
