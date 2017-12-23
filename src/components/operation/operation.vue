<template>
	<mt-popup v-model="popupVisible"  position="center" class="operation">
		<div  @click="hidemask" class="mask">
			<div class="operation-content">
				<ul id="ul">
					<li @click.stop="zantong">{{likeof}}</li>
					<li>举报</li>
					<li  @click.stop="copy">复制</li>
					<li>回复</li>			
				</ul>
				<input style="opacity:0" ref="ipn" type="text">
				</div>
			</div>		
		</div>
	</mt-popup>	
</template>


<script>
export default{
	data(){
		return{
			likeof:'赞'
		}
	},
	methods:{
		hidemask(){
			this.$emit("popuphide");
		},
		zantong(){
			if(!this.praise)
			{
				this.$emit("option",1);	
			}
		},
		copy(){
			var ipu=this.$refs.ipn;
			ipu.value=this.model;
			ipu.select(); // 选择对象
	        document.execCommand("Copy"); // 执行浏览器复制命令
	        this.$emit("option");
		}
	},
	computed:{
	},
	props:{
		popupVisible:{
			default(){
				return false
			}
		},
		praise:{
			default(){
				return {

				}
			}
		},
		model:{
			default(){
				return{

				}
			}
		}
	},
	mounted(){
		var ul=document.querySelector("#ul");
		ul.addEventListener("touchstart",function(e){
			e.target.style.background="#ddd";
		})
		ul.addEventListener("touchend",function(e){
			e.target.style.background="";
		})
	}
}
</script>


<style lang="less">
@r:100rem;
	.operation{
		width:100%;
		height:100%;
		box-sizing:border-box;
		background:rgba(0,0,0,0.3);
		// position:relative;
		.mask{
			width:100%;
			height:100%;
			background:rgba(0,0,0,0.4);
			overflow:hidden;
			.operation-content{
				width:95%;
				margin:50% auto;
				background:#fff;
				border-radius:10/@r;
				padding:25/@r 0;
				ul{
					padding-left:0px;
					li{
						width:100%;
						line-height:144/@r;
						height:144/@r;
						text-indent:77/@r;
						color:#000;
						font-size:45/@r;
						transition:all .5s;
					}			
				}
			}
		}
	}	
</style>