<!-- 列表 -->
<template>
	<div class="newslist">
		<div v-for="atories in storiesarr" class="newslist-item">
			<h2 class="newlist-title">{{atories.date|time}}</h2>
			<ul class="atoriesmain">
				<li v-for="item in atories.stories" class="atories clearfix">
					<router-link :to="/articles/+item.id">
						<div class="storiesarr-title">
							{{item.title}}
						</div>
						<div class="storiesarr-img">
							<img v-lazy="item.images[0]" alt="">	
							
						</div>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>


<script>
export default{
	data(){
		return {

		}
	},
	methods:{
	
	},
	watch:{
	},
	created(){
	},
	props:{
		storiesarr:{
			default(){
				return {

				}
			}
		}
	},
	filters:{
		time(value){
			var day=new Date();
			var timestr=day.getFullYear()+"";
			timestr=timestr.concat(day.getMonth()+1);
			timestr=timestr.concat(day.getDate());
			if(value==timestr)
			{
				return '今日新闻'
			}
			else
			{
				var month=parseInt(value.slice(4,6))+1;
				value=value.slice(0,4)+"-"+month+"-"+value.slice(6,8);
				var day2=new Date(value);
				var xqstr=day2.getMonth()+1+"月"+day2.getDate()+"日 星期"+week(day2.getDay());
				return xqstr;	
			}
			//转化星期几
			function week(data){
				var str="";
				switch(data)
				{
						case 0:
							str="天"
							break;
						case 1:
							str="一"
							break;
						case 2:
							str="二"
							break;
						case 3:
							str="三"
							break;
						case 4:
							str="四"
							break;									
						case 5:
							str="五"
							break;
						case 6:
							str="六"
							break;								
				}
				return str;
			}
		}
	}
}
</script>


<style lang="less">
	@r:100rem;
	.newslist-item{
		user-select:none;
		.newlist-title{
			fontsize:38/@r;
			color:#6f6f6f;
			padding:55/@r 0px 60/@r 50/@r;
			color:"#000";
		}
		.atoriesmain{
			.atories{
				width:1030/@r;
				box-sizing: border-box;
				margin:0 24/@r;
				border:1px solid #e6e6e6;
				border-radius: 20/@r;
				padding:0 50/@r 50/@r 0;
				font-size:48/@r;
				line-height:63/@r;
				box-shadow: 2/@r 2/@r #c1c1c1;
				a{
					display:flex;
					.storiesarr-title{
						padding:50/@r 50/@r 0 50/@r;
						width:740/@r;
						box-sizing:border-box;
						float:left;
					}
					.storiesarr-img{
						flex:1;
						height:220/@r;
						float:left;
						margin-top: 36/@r;
						img{
							width:100%;
							height:100%;
						}
					}					
				}

			}
			.atories+.atories{
				margin-top: 20/@r;
			}			
		}

	}


</style>