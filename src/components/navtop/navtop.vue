<!-- 顶部导航条 -->
<template>
	<div class="header-mb">
      <div class="nav-left">
          <svg class="icon" aria-hidden="true" @click="barshow">
            <use xlink:href="#icon-daohang"></use>
          </svg>
          <span class="header-tit">首页</span>
      </div>
      <div slot="right" class="nav-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-lingdang"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weibiaoti1"></use>
        </svg>            
      </div> 
	</div>

</template>

<script>
import '../../assets/iconfont.js'
export default{
  data(){
    return{

    }
  },
  methods:{
    barshow(){
      this.$parent.$parent.barshow();
    }

  },
  components:{
  },
  props:{
  }


}

</script>

<style lang="less">
  @r:100rem;
	.icon {
   width: 1em; height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
  }
  .header-mb{
    height:100%;
    font-size:0;
    background:#00a2ed;
    .nav-left{     
     float: left;
      .header-tit{
        display: inline-block;
        font-size:50/@r;
      }
      .icon{
        font-size:50/@r;
        color:#fff;
        padding: 54/@r 64/@r;
        display:inline-block; 
        float: left;
      }
      .header-tit{
        display:inline-block;
        float:left;
        line-height:150/@r;
        font-size:50/@r;
        color:#fff;
      }
    }
    .nav-right{
      float:right;
      .icon{
        color:#ffffff;
        font-size:60/@r;
        padding:60/@r;
      }
    }
  }

</style>