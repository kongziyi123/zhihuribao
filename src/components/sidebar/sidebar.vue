<template>
	<div class="slidebar" @click="barhide" ref="slidebarwarp"  >
		<div class="container" ref="slidebar">
			<div class="slidebar-container">
						<div class="container-head">
									<div class="login clearfix">
										<div class="login-tx">
											<img src="./tx.png" alt="">
										</div>
										<span class="login-text">请登录</span>
									</div>
									<div class="head-btns">
										<div class="collect">
											<svg class="icon" aria-hidden="true">
											  <use xlink:href="#icon-xingzhuang60kaobei2"></use>
											</svg>
											<span>我的收藏</span>
										</div>
										<div class="download">
											<svg class="icon" aria-hidden="true">
											  <use xlink:href="#icon-xiazai"></use>
											</svg>
											<span>离线下载</span>
										</div>
									</div>
						</div>
						<div class="container-items">
									<ul>
										<li @click="barhide">
										<router-link to="/index">
											<svg class="icon" aria-hidden="true">
											  <use xlink:href="#icon-jia"></use>
											</svg>
											<span>首页</span>
											</router-link>
										</li>
										<li @click="barhide" v-for="item in slibarmodel">
										<router-link  :to="/items/+item.id">
										{{item.name}}
										</router-link>
										</li>
									</ul>
						</div>								
			</div>
		</div>
	</div>
</template>


<script>
import Scroll from 'better-scroll'
import '../../assets/iconfont.js'
export default{
	data(){
		return {
		}
	},
	props:{
		slibarmodel:{
			default(){
				return{

				}
			}
		}
	},
	methods:{
		scrollint(){
			if(!this.scroll)
			{
				this.$nextTick(()=>{
					this.scroll=new Scroll(this.$refs.slidebar,{
						probeType:3,
						click:true,
						bounce:false
					})
				})
			}
			else
			{
				this.$nextTick(()=>{
					this.scroll.refresh();
				})

			}
		},
		barshow(){
			this.$refs.slidebarwarp.style.transform="translateX(0px)";
		},
		barhide(){
			this.$refs.slidebarwarp.style.transform="translateX(-200%)";
		}
	},
	watch:{

	},
	mounted(){
		this.scrollint();
		var starX=0;
		var _this=this;
		this.$refs.slidebar.addEventListener("touchstart",function(e){
			starX=e.targetTouches[0].clientX;
		})
		this.$refs.slidebar.addEventListener("touchmove",function(e){
			var moveX=e.targetTouches[0].clientX-starX;
			if(moveX<0)
			_this.$refs.slidebar.parentNode.style.transform="translateX("+moveX*1.6+"px)";
		})
		this.$refs.slidebar.addEventListener("touchend",function(e){
			var endX=e.changedTouches[0].clientX;
			if(endX-starX<0&&Math.abs(endX-starX)<150)
			{
				_this.$refs.slidebar.parentNode.style.transform="translateX("+0+"px)";
			}
			else
			if(endX-starX<0)
			{
				_this.$refs.slidebar.parentNode.style.transform="translateX(-100%)";
			}

		})		
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
	.router-link-active{
		background:#f0f0f0;
		color:#00a2ed;
	}
	.slidebar{
		width:200%;
		position:fixed;
		top:0px;
		background:rgba(0,0,0,0.3);
		height:100%;
		transition:all .5s;
		z-index:500000;
		transform:translateX(-200%);
		.container{
			width:42.2222222%;
			position:absolute;
			height:100%;
			top:0px;
			z-index:500000;
			transition:all .3s;
			.slidebar-container
			{	
				.container-head{
						background:#00a2ed;
						padding:32/@r 48/@r;
						width:100%;
						box-sizing: border-box;
						.login{
							width:100%;
							.login-tx{
								width:100/@r;
								height:100/@r;
								float:left;
								img{
									width:100%;
									height:100%;
									border-radius:50%;
								}
							}
							.login-text{
								color:#fff;
								font-size:43/@r;
								color:#fff;
								float:left;
								margin-left: 40/@r;
								line-height:100/@r;
							}	

						}
						.head-btns{
							color:#fff;
							font-size:37/@r;
							margin-top:105/@r;
							display:flex;
							.collect{
								flex:1;
								.icon{
									margin-left:26/@r;
									float:left;
								}
								span{
									float:left;
									margin-left:75/@r;
								}
							}
							.download{
								flex:1;
								.icon{
									margin-left:26/@r;
									float:left;
								}
								span{
									float:left;
									margin-left:75/@r;
								}						
							}
						}
				}
				.container-items{
						width:100%;
						background:#fff;
						font-size:44/@r;
						li{
							height:150/@r;
							line-height:150/@r;
							color:#000000;
							width:100%;
							font-weight: 500;
							a{
								box-sizing:border-box;
								padding-left: 50/@r;
								width:100%;
								height:100%;
								display:block;
							}
						}
						li:first{
							.icon{
								font-size:50/@r;
							}
							span{
								margin-left:50/@r;
							}
						}
						.active{
							color:#00a2ed;
							background:#f0f0f0;
						}
				}
			}

		}
	}

</style>