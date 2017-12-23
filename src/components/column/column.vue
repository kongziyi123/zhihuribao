<template>
	<div class="column">
		<div class="column-header clearfix">
			<div class="daohui" @click="barshow">
				<svg class="icon" aria-hidden="true">
				  <use xlink:href="#icon-daohang"></use>
				</svg>			
			</div>
			<div class="tit">
				{{model.name}}
			</div>
			<div class="add">
				<svg class="icon" aria-hidden="true">
				  <use xlink:href="#icon-jianhaojiacu"></use>
				</svg>					
			</div>
		</div>
		<div class="banner">
			<div class="banner-img">
				<img :src="model.image" alt="">
			</div>
			<div class="title">{{model.description}}</div>
		</div>
		<div class="container">
			<div class="editor">
				<span>主编</span>
				<ul>
					<li v-for="item in model.editors">
						<a href="">
							<img :src="item.avatar" alt="">
						</a>
					</li>
				</ul>
			</div>
			<div class="data-lists">
				<div class="data-item" v-for="item in model.stories">
					<router-link :to="/articles/+item.id">
						<h2>{{item.title}}</h2>
						<div class="image" v-if="item.images">
							<img v-lazy="item.images[0]" alt="">
							
						</div>
					</router-link>	
				</div>
			</div>			
		</div>

	</div>
</template>

<script>
import '../../assets/iconfont.js'
export default{
	name:'column',
	data(){
		return {
			msg:'',
			model:''
		}
	},
	watch:{
		'$route':function(){
			this.init();
			window.scrollTo(0,0);
		}
	},
	created(){
		this.init();
	},
	methods:{
		barshow(){
			this.$emit("barshow");
		},
		init(){
			this.number=this.$route.params.number;
			var _this=this;
			this.$http.get("4/theme/"+this.number).then(function(data){
				_this.model=data.data;
			}).catch(function(){

			})
		}
	},
	components:{
		
	},
	activated(){
	}
	


}
</script>


<style lang="less">
	@r:100rem;
	@keyframes imgsport{
		0%{
			transform:translate(0px,0px)  scale(1, 1);
		}
		100%{
			transform:translate(-100px,0px) scale(1.2, 1.2);
		}
	}
	.icon {
	   width: 1em; height: 1em;
	   vertical-align: -0.15em;
	   fill: currentColor;
	   overflow: hidden;
	}
	.column{
		position:relative;
		overflow:hidden;
		.column-header{
			width:100%;
			height:168/@r;
			background:#00a2ed;
			position:fixed;
			z-index:9999;
			.daohui{
				// height:100%;
				font-size:40/@r;
				padding:56/@r;
				color:#fff;
				float:left;
			}
			.tit{
				height:100%;
				line-height:168/@r;
				font-size:50/@r;
				color:#fff;
				float:left;
				margin-left:56/@r;
			}
			.add{
				// height:100%;
				font-size:40/@r;
				padding:56/@r;
				color:#fff;
				float:right;
				position:relative;
				margin-right:44/@r;
			}
			.add::after{
				content:'';
				width:56/@r;
				display: block;
				height:56/@r;
				position:absolute;
				top:42/@r;
				left:40/@r;
				border-radius:50%;
				border:2px solid #ffffff;
			}
		}	
		.banner{
			width:100%;
			overflow:hidden;
			height:640/@r;
			margin-top:0px;
			position:relative;
			margin-top:168/@r;
			.banner-img{
				width:100%;
				height:640/@r;
				img{
					height:100%;
					animation:imgsport 30s infinite;
				}	
			}
			.title{
				position:absolute;
				width:80%;
				color:#fff;
				font-size:50/@r;
				line-height:67/@r;
				bottom:64/@r;
				left:50/@r;
			}

		}
		.container{
			.editor{
				height:156/@r;
				line-height:156/@r;
				span{
					float:left;
					margin-left: 26/@r;
					color:#6f6f6f;
				}
				ul{
					float:left;
					margin-left:52/@r;
					li{
						width:90/@r;
						height:90/@r;
						float:left;
						border-radius:50%;
						overflow:hidden;
						margin-top:32/@r;
						margin-right:16/@r;
						a{
							display:block;
							width:100%;
							height:100%;
							img{
								width:100%;
								height:100%;
							}
						}
					}
				}
			}
			.data-lists{
				width:100%;
				padding:20/@r;
				box-sizing:border-box;
				font-size:0;
				.data-item{
					width:100%;
					padding:50/@r;
					box-sizing:border-box;
					border:1px solid #dadada;
					border-radius:8/@r;
					font-size:48/@r;
					a{
						color:#000;
						display: flex;
						h2{
							flex:1;
						}
						.image{
							width:20%;
							display:inline-block;
							padding-left:20/@r;
							img{
								width:100%;
							}
						}
					}
				}
				.data-item+.data-item{
					margin-top:20/@r;
				}
			}
		}	
	}

</style>