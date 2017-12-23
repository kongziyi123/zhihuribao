<template>
  <div id="app">
      <sidebar ref="sidebar" :slibarmodel="slibarmodel"></sidebar>
      <transition name="slide">
                          <!-- 这里不是路由的name而是想被缓存的组件选项里的name -->
        <keep-alive include="index,column">
           <router-view @barshow="barshow"></router-view>
        </keep-alive>
      </transition> 
  </div>
</template>

<script>
import sidebar from './components/sidebar/sidebar'
export default {
  name: 'app',
  data(){
    return {
      slibarmodel:'',
      barswitch:false,
      
    }
  },
  components:{
    sidebar
  },
  methods:{
    barshow(){
      this.$refs.sidebar.barshow();
    },
    barhide(){
      this.$refs.sidebar.barhide();    
    }
  },
  mounted(){     
      var _this=this;
      this.$http.get("/4/themes").then(function(data){
        _this.slibarmodel=data.data.others;
      }).catch(function(){

      })
  },
  created(){
    var _this=this;
    // document.onscroll=function(e){
    //   //屏幕距离顶部的
    //   var top=document.documentElement.scrollTop;
    //   //屏幕距离的高度
    //   var clientH=document.documentElement.clientHeight;
    //   //总得高度
    //   var scrollH=document.documentElement.scrollHeight;
    //   if(top+clientH==scrollH)
    //   {
    //     var a=new Date();
    //     var daystr=a.getFullYear()+"-"+a.getMonth()+"-"+a.getDate();
    //     var beforeday=_this.addByTransDate(daystr,_this.datetime);
    //      _this.datetime+=1;
    //      _this.ajax(beforeday);
    //   }
    // }
  }
}
</script>
<style lang="less">
  @r:100rem;
  // .slide-enter-active, .slide-leave-active {
  //   transition: all .3s;
  // }
  // .slide-enter, .slide-leave-to  .fade-leave-active in below version 2.1.8  {
  //   opacity: 0.3;
  //   // transform:translateX(-200%);
  // }
  .header{
    height:168/@r;
    width:100%;
    position:fixed;
    z-index: 999;
    .header-mb{
      height:100%;
    }
  }
</style>
