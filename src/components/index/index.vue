<!-- 首页路由 -->
<template>
<div>
    <div class="header">
      <navtop :slibarmodel="slibarmodel">   
      </navtop>
    </div>
   <div class="container"> 
      <!-- 轮播器 -->
      <div class="shuffling">   
            <mt-swipe :auto="4000">
              <mt-swipe-item v-for="imgitem in topstories">
                  <router-link :to="/articles/+imgitem.id">
                    <img :src="imgitem.image"  alt="">
                    <h3>{{imgitem.title}}</h3>
                  </router-link>
              </mt-swipe-item>
            </mt-swipe>
      </div>
      <!-- 列表 -->
      <div class="newsday">                                   
          <newsday :storiesarr="storiesarr"></newsday>
      </div> 
    </div> 
  
</div>

</template>


<script>
import navtop from '../navtop/navtop'
import newsday from '../newsday/newsday'
  export default{
    name:'index',
    data(){
      return{
        datetime:0,
      //轮播图数据
      topstories:'',
      //主列表数据
      storiesarr:[],
      //slide组件数据
      slibarmodel:'',
      ytop:0     
      }
    },
    components:{
      navtop,
      newsday
    },
    methods:{
      addByTransDate(dateParameter, num) {
        var translateDate = "", dateString = "", monthString = "", dayString = "";
        translateDate = dateParameter.replace("-", "/").replace("-", "/"); ;


        var newDate = new Date(translateDate);
        newDate = newDate.valueOf();
        newDate = newDate - num * 24 * 60 * 60 * 1000; //备注 如果是往前计算日期则为减号 否则为加号
        newDate = new Date(newDate);


        //如果月份长度少于2，则前加 0 补位 
        if ((newDate.getMonth() + 1).toString().length == 1) {
        monthString = 0 + "" + (newDate.getMonth() + 1).toString();
        } else {
        monthString = (newDate.getMonth() + 1).toString();
        }


        //如果天数长度少于2，则前加 0 补位 
        if (newDate.getDate().toString().length == 1) {


        dayString = 0 + "" + newDate.getDate().toString();
        } else {


        dayString = newDate.getDate().toString();
        }


        dateString = newDate.getFullYear()+ monthString+ dayString;
        return dateString;
      },
      ajax(date){
        // http://news.at.zhihu.com/api/4/news/before/20171213
        var ajaxurl="4/news/before/"+date;
        var _this=this;
        this.$http.get(ajaxurl).then(function(date){
          _this.storiesarr.push(date.data);
        }).catch(function(){

        })
      },
      parbarshow(){
        this.$emit("barshow");
      }
    },
    created(){
   
    },
    mounted(){      
      var _this=this;
      this.$http.get('4/news/latest').then(function(data){
        _this.storiesarr.push(data.data);
        _this.topstories=data.data.top_stories;
        _this.datetime=0;
      }).catch(function(){
        console.log('error');
      })   
    },
    activated(){
      window.scrollTo(0,this.ytop);
      var _this=this;
      var lasttime="";
      document.onscroll=function(e){
        //屏幕距离顶部的
        var top=document.documentElement.scrollTop||document.body.scrollTop;
        //屏幕距离的高度
        var clientH=document.documentElement.clientHeight;
        //总得高度
        var scrollH=document.documentElement.scrollHeight;
        if(top+clientH>=scrollH-100)
        {
          var a=new Date();
          //防重复调用获取事件
          if(a.getTime()<lasttime+3000)
          {
              return 
          }
          lasttime=a.getTime();
          var daystr=a.getFullYear()+"-"+a.getMonth()+"-"+a.getDate();
          var beforeday=_this.addByTransDate(daystr,_this.datetime);
           _this.datetime+=1;
           _this.ajax(beforeday);
           
        }
      }         
    },
    deactivated(){
      // console.log('删除了事件');
      document.onscroll=function(e){

      }
      this.ytop=document.documentElement.scrollTop;
    },
    props:{
    }
  }

</script>

<style lang="less">
  @r:100rem;
  .container{
    max-width: 750px;
    margin:auto;
  }
  .shuffling{
    width: 100%;
    height:675/@r;
    position:relative;
    overflow:hidden;
    img{
      width:100%;
      height:675/@r;
    }
    h3{
      position: absolute;
      left:50%;
      transform:translateX(-50%);
      bottom:86/@r;
      color:#fff;
      font-size: 60/@r;
      line-height: 78/@r;
      width:948/@r;
      color:#fff;
    }
  }
  .newsday{
    background:"#f3f3f3";
  }
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