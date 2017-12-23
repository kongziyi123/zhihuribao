 <template>
	<div class="articles" ref="articles">
		<link rel="stylesheet" :href="source.css">
		<div class="header">
			<div class="fallback" @click="goback">
				<svg class="icon" aria-hidden="true">
				  	<use xlink:href="#icon-icon"></use>
				</svg>
			</div>
			<div class="header-btn">
				<div class="iconn-warp">
					<svg class="icon" aria-hidden="true">
					  <use xlink:href="#icon-fenxiang"></use>
					</svg>
				</div>
				<div class="iconn-warp">
					<svg class="icon" aria-hidden="true">
					  <use xlink:href="#icon-xingzhuang60kaobei2"></use>
					</svg>
				</div>
				<div class="iconn-warp">
					<div  @click="plshow">
						<svg class="icon" aria-hidden="true">
						  <use xlink:href="#icon-pinglun"></use>
						</svg>	
						<span>{{long_comments+shortpl}}</span>						
					</div>
				</div>
				<div class="iconn-warp clearfix" :class="{zan:ispopularity}" >
					<div  @click="zan">
						<svg class="icon" aria-hidden="true" >
						  <use xlink:href="#icon-zan"></use>
						</svg>	
						<span>{{popularity}}</span>		
						<div class="fixezan" :class="{fixezanactive:ispopularity&&!first}">
							<svg class="icon" aria-hidden="true">
							  <use xlink:href="#icon-zan"></use>
							</svg>		
							<span>{{popularity-1}}   + 1 </span>			
						</div>							
					</div>
				</div>
			</div>
		</div>
		<div class="blank" v-if="!source.image"></div>
		<div class="banner" v-if="source.image">
			<img :src="source.image" alt="">
			<span>{{source.title}}</span>
			<div class="yinyong">{{source.image_source}}</div>
		</div>
		<commentaries :id="id"  :short="shortpl" ref="comm"></commentaries>
	</div>
</template>


<script>
import '../../assets/iconfont.js'
import commentaries from "../commentaries/commentaries"
export default{
	data(){
		return{
			id:'',
			source:'',
			long_comments:'',	//评论
			popularity:'',		//赞
			ispopularity:'',
			first:true,
			image_source:'',
			shortpl:'',
			istrue:true
		}
	},
	methods:{
		axio(url,fn,error){
			this.$http.get(url).then(fn).catch(error);
		},
		zan(){
			this.ispopularity=!this.ispopularity;
			this.first=false;
			if(this.ispopularity)
			{
				this.popularity++;
			}
			else{
				this.popularity--;	
			}
			this.Storage(this.id+"ispopularity",this.ispopularity);
		},
		Storage(key,value){
			var prefixes="kong_";
			if(arguments.length<2)
			{
				var result=localStorage.getItem(prefixes+key);
				return result;
			}
			else
			{
				localStorage.setItem(prefixes+key,value);
			}
		},
		plshow(){
			this.$refs.comm.toggle();
		},
		goback(){
			if (this.$route.query.goindex === 'true') {
			  this.$router.push('/')
			} else {
			  this.$router.back(-1)
			}
		}

	},
	props:{
	  storiesarr:{
        default(){
          return{
          	
          }
        }
      },
      topstories:{
        default(){
          return{

          }
        }
      }
	},
	created(){
		this.id=this.$route.params.id;	
		console.log(this.id);	
		this.ispopularity=this.Storage(this.id+"ispopularity");
		//获取文章内容
		var _this=this;
		this.axio("/4/news/"+this.id,function(data){
			var d=data.data;
			_this.source=d;
			var box=document.createElement("div");
			box.innerHTML=d.body;
			_this.$refs.articles.appendChild(box);	
		},function(){
			console.log('error');
		})

		//获取顶部评论等数量
		this.axio('/4/story-extra/'+this.id,function(data){
			var d=data.data;
			_this.long_comments=d.long_comments;
			_this.shortpl=d.short_comments;
			_this.popularity=d.popularity;
		},function(){

		})
		this.$setgoindex();	
	},
	mounted(){

	},
	components:{
		commentaries
	},
	activated(){
		this.$nextTick(function(){
			window.scrollTo(0,0);			
		})
		var scroll;
		document.onscroll=function(e){
			var head=document.querySelector(".header");
			var hscroll=document.documentElement.scrollTop;
			if(hscroll<scroll)
			{
				head.style.opacity=1;
			}
			else
			{
				var opc=1-(hscroll/300);
				head.style.opacity=opc;	
			}
			scroll=hscroll;		
		}			

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
	.articles{
		width:100%;
		height:100%;
		background:#fff;
		position:absolute;
		z-index:99999;
		// overflow:hidden;
		.header{
			width:100%;
			height:168/@r;
			background:#00a2ed;
			position:fixed;
			.fallback{
				height:100%;
				line-height:168/@r;
				font-size: 48/@r;
				color:#fff;
				display: inline-block;
				padding:0 60/@r;
			}
			.header-btn{
				height:100%;
				float:right;
				.iconn-warp{
					float:left;
					margin-right:90/@r;
					height:100%;
					display: block;	
					.icon{
						font-size:60/@r;
						color:#fff;
						margin-top:52/@r;
						transition: all .4s;
					}	
					span{
						color:#fff;
						font-size:50/@r;
						font-weight: bold;
						margin-left:18/@r;
					}			
				}
				.zan{
					.icon{
						color:#ff7031;
						transform: scale(1.1,1.1);
					}
					
				}	
				.fixezan{
					position:fixed;
					left:50%;
					transform: translateX(-50%);
					background:rgba(0,0,0,0.5);
					padding:15px 20px;
					border-radius: 10/@r;
					opacity:0;
					transition:all 1.8s;
					.icon{
						margin-top:0;
					}
				}
				.fixezanactive{
					animation:Totop .8s;
					animation-fill-mode:forwards;
				}
			}
		}
		.blank{
			height: 150/@r;
		}
		.banner{
			width:100%;
			height:775/@r;
			position:relative;
			img{
				width:100%;
				height:100%;
			}
			span{
				position:absolute;
				font-size:60/@r;
				width:100%;
				padding:0 46/@r;
				box-sizing:border-box;
				color:#fff;
				line-height:70/@r;
				bottom:90/@r;
			}
			.yinyong{
				position:absolute;
				bottom:20/@r;
				right:30/@r;
				color:#fff;
			}
		}
		// .banner:before{
		// 	content: '';
		// 	width:100%;
		// 	height:100%;
		// 	background:rgba(0,0,0,0.3);
		// 	display: block;
		// 	position:absolute;
		// 	top:0px;
		// 	left:0px;

		// }
		.img-place-holder{
			display: none;
		}
	}
	@keyframes Totop{
		0%{
			bottom:0;
			opacity:0;
		}
		90%{
			bottom:300/@r;
			opacity:1;
		}
		100%{
			display: none;
		}
	}
</style>

