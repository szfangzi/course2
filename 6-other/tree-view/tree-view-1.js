var treeData = [];
$.ajax({
    url:'public/navlist.json',
    method:'GET',
    async:false,
    success: function (data) {
      //console.log(data);
        treeData = Util.nodeRecursion(data, "0");
      //console.log(treeData);
    }
});

Vue.component('treeview', {
    name:'treeview',
    template:'<div v-for="item in data" class="node">' +
    '<span>{{item.id}}</span>' +
    '<treeview v-if="item.childs" v-bind:data="item.childs" ></treeview>' +
    '</div>',
    props:['data']

});

var vm = new Vue({
    el:'#tree-view',
    data:{
        treeData:treeData
    }
});
