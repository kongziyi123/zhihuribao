<template>
	<!-- <div class="commentaries"> -->
		<mt-popup v-model="maskVisible" position="right" class="mask">
			<div class="box">
				<div class="header">
					<div class="fallback" @click="toggle" >
						<svg class="icon" aria-hidden="true">
						 <use xlink:href="#icon-icon"></use>
						</svg>				
					</div>
					<div class="tit">
						{{Lcomments.length+short}}条评论
					</div>
					<div class="write">
						<svg class="icon" aria-hidden="true">
						  <use xlink:href="#icon-write"></use>
						</svg>					
					</div>
				</div>
				<div class="container" ref="litems">
					<div class="long-items" >
						<div class="length">
							{{Lcomments.length}}条长评
						</div>
						<div class="log-item" @click="popupshow(item)" v-for="item in Lcomments">
									<div class="item-l">
										<img v-lazy="item.avatar" alt="">
									</div>
									<div class="item-r">
										<div class="item-r-head clearfix">
											<div class="item-r-name">{{item.author}}</div>
											<div class="item-r-zan">
												<svg 
									  				<use xlink:href="#icon-zan"></use>
												</svg>	
												<span>{{item.likes}}</span>
											</div>
										</div>
										<div class="item-r-font">
											{{item.content}}
										</div>
										<div class="item-r-time">
											{{item.time|times}}
										</div>
									</div>
						</div>						
						<div  @click="getshort" class="item-bom clearfix" >
								<span>{{short}} 条短评</span>
								<svg class="icon" aria-hidden="true">
							 		 <use xlink:href="#icon-xiangxia">
							 		 </use>
								</svg>			
						</div>	
						<div class="log-item"  @click="popupshow(item)" v-for="item in 
							 Scomments">
								<div class="item-l">
									<img v-lazy="item.avatar" alt="">
								</div>
								<div class="item-r">
									<div class="item-r-head clearfix">
										<div class="item-r-name">{{item.author}}</div>
										<div class="item-r-zan">
											<svg class="icon" aria-hidden="true">
								  				<use xlink:href="#icon-zan"></use>
											</svg>	
											<span>{{item.likes}}</span>
										</div>
									</div>
									<div class="item-r-font">
										{{item.content}}
									</div>
									<div class="item-r-time">
										{{item.time|times}}
									</div>
								</div>
						</div>						
					</div>
				</div>	
			</div>
			<operation @popuphide="popuphide"
			:praise="praise" 
			 :popupVisible="popupVisible" 
			 @option="option"
				:model="model.content"
			  ></operation>
		</mt-popup>		
	<!-- </div> -->
</template>


<script>
import '../../assets/iconfont.js'
import operation from '../operation/operation'
import Scroll from 'better-scroll'
export default{
data(){
	return{
		Lcomments:'',
		Scomments:'',
		popupVisible:false,
		maskVisible:false,
		model:'',
		praise:false
	}
},
methods:{
	Storage(key,value){
		var prefixes="kong_zan";
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
	//获取短评论
	getshort(){
		var _this=this;
		this.$http.get("4/story/"+this.id+"/short-comments").then(function(data){
			_this.Scomments=data.data.comments;
			setTimeout(function(){
				_this.$nextTick(()=>{
					var y=_this.scroll.absStartY-_this.scroll.wrapperHeight;
					_this.scroll.scrollTo(0,y,1000);		
				})		
			},0)


		}).catch(function(){
		})	
	},
	scrollint(){
		if(!this.scroll)
		{
			this.$nextTick(()=>{
				this.scroll=new Scroll(this.$refs.litems,{
					probeType:3,
					click:true
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
	toggle(){
		this.maskVisible=!this.maskVisible;
	},
	popupshow(item){
		this.model=item;
		this.popupVisible=true;
	},
	popuphide(){
		this.popupVisible=false;
	},
	zanadd(){
		this.model.likes++;
	},
	option(value){
		if(value==1)
		{
			this.zanadd();
		}
		this.popuphide();
	}
},
computed:{

},
created(){

},
mounted(){
	this.scrollint();	
	var _this=this;
	this.$http.get("4/story/"+this.id+"/long-comments").then(function(data){
		var data=data.data;
		_this.Lcomments=data.comments;
	}).catch(function(){
	})		
},
filters:{
	times(val){
		function addzero(val){
			if(val.toString().length<2)
			{	
				val="0"+val;
			}
			return val;
		}
		var data=new Date(val*1000);
		data=addzero(data.getMonth())+"-"+addzero(data.getDay())+" "+addzero(data.getHours())+":"+addzero(data.getMinutes());
		return data;
	}
},
watch:{
	Lcomments(){
		if(this.Lcomments.length==0)
		{
			this.getshort();
		}
	}
},
props:{
	id:{
		default(){
			return{

			}
		}
	},
	short:{
		default(){
			return {

			}
		}
	}
},
components:{
	operation
},

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

.mask{
	width:100%;
	height:100%;
	background:#fff;
	.box{
		height:100%;
		overflow:hidden;
		.header{
				width:100%;
				height:168/@r;
				background: #00a2ed;
				border-bottom:3/@r solid #b1b1b1;
				.fallback{
					display:inline-block;
					float:left;
					height:100%;
					padding:0 60/@r;
					font-size:50/@r;
					box-sizing:border-box;
				}
				.tit{
					margin-left:50/@r;
					font-size:48/@r;
					color:#fff;
					line-height:168/@r;
					display: inline-block;
				}
				.write{
					float:right;
					margin-right:42/@r;
					line-height:168/@r;
					color:#fff;
					font-size:66/@r;
				}
		}
		.container{
			margin-top:168/@r;
			height:91%;
				.length{
					font-size:38/@r;
					line-height:138/@r;
					color:#333333;
					text-indent: 50/@r;
				}
				.long-items{
					width:100%;
					overflow:hidden;
					.log-item{
								border-top:1px solid #e0e0e0;
								display: flex;
								padding:45/@r 48/@r;
								box-sizing:border-box;
								overflow:hidden;
								.item-l{
									windth:105/@r;
									img{
										width:105/@r;
										height:105/@r;
										border-radius:50%;
									}
								}
								.item-r{
									flex:1;
									margin-left:20/@r;
									.item-r-head{
										width:100%;
										line-height:66/@r;
										.item-r-name{
											color:#333333;
											font-weight:bold;
											font-size:44/@r;
											display: inline-block;
											float:left;
										}
										.item-r-zan{
											float:right;
											color:#b8b8b8;
											vertical-align:bottom;
											overflow:hidden;
											.icon{
												float:left;
												margin-right: 16/@r;
											}
											span{
												display:inline-block;
												margin-top:-12/@r;
												float:left;
												// margin-left:10/@r;
											}

										}
									}
									.item-r-font{
										margin-top: 18/@r;
										line-height:66/@r;
									}
									.item-r-time{
										line-height:46/@r;
										margin-top:35/@r;
										color:#bababa;
										font-size:26/@r;
									}
								}
					}
					.item-bom{
							width:100%;
							border-top:1px solid #e0e0e0;
							border-bottom:1px solid #e0e0e0;
							line-height:140/@r;
							font-size:37/@r;
							span{
								margin-left:40/@r;
							}
							.icon{
								display: inline-block;
								float:right;
								margin-top:55/@r;
								margin-right:50/@r;
								box-sizing:border-box;
								color:#a5a5a5;
								font-size:50/@r;
								
							}
					}				
				}		
		}			
	}
	.v-modal{
		display: none;
	}

}


</style>