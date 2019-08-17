<template>
    <div class="home">
       <div class="title clearfix">
		   <div class="title-img"><img src="~@img/logo.png" alt=""></div>
		   <div class="title-font">我的美力能量</div>
	   </div>
	   <div class="userinfo clearfix">
		   <div class="avatar p-l"><img src="~@img/brand2.png" alt=""></div>
		   <div class="info-right p-l">
			   <p class="username">{{userInfo.username}}</p>
			   <div class="clearfix">
				   <p class="level-name p-l">{{userInfo.levelname}}</p>
				   <p class="level p-l">Lv.{{userInfo.level}}</p>
			   </div>
		   </div>
	   </div>
	   <!-- 拼图 -->
	   <div class="puzzle clearfix waterfall">
		   <div class="puzzle-item clearfix p-l" :style="puzzleHeight(item.num)" v-for="item in puzzleInfo" :key="item.id">
			   <p class="puzzle-name">{{item.name}}</p>
			   <p class="puzzle-num">{{item.num}}</p>
		   </div>
	   </div>
	   <div class="beat">
		   <p style="margin-bottom: 1rem;" @click="handleClick">你已经打败了美力星球上{{userInfo.rank}}%的人</p>
		   <p class="beat-info">{{beatText}}</p>
	   </div>
	   <div class="test-btn" v-go="{name:'record'}">
		   提升我的美力
	   </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                value: "",
                
				userInfo:{
					username: '大米DemiB,S.W',
					level: 0,
					levelname: '美力达人',
					rank: 90
				},
				beatInfo:{
					level1:'坚持下去，你是最棒的！',
					level2:'没办法，就是这么优秀',
					level3:'狭路相逢，美者胜',
					level4:'无敌是多么寂寞'
				},
                puzzleInfo:[
					{	
						id:1,
						name:'美术家',
						num:35,
					},
					{
						id:2,
						name:'艺术家',
						num:50,
					},
					{
						id:3,
						name:'时尚家',
						num:50,
					},
					{
						id:4,
						name:'生活家',
						num:50,
					},
					
				],
                show: false,
                
            };
        },
		computed: {
		    beatText: function(){
				const rank = this.userInfo.rank
				if(rank<40){
					return this.beatInfo.level1
				}else if(rank>=40 && rank<70){
					return this.beatInfo.level2
				}else if(rank>=70 && rank<90){
					return this.beatInfo.level3
				}else{
					return this.beatInfo.level4
				}
			},
			puzzleHeight:function(num){
				return function(num){
					switch(this.userInfo.level) {
					    case 0:
					        if(num<=25){
								break
							}else if(num>25 && num<=50){
								return  { height:(7.5+(num-25)*0.2) + 'rem' }
							}else {
								return  { height:12.5 + 'rem' }
							};
					    case 1:
					        if(num<=100){
					        	break
					        }else{
					        	return  { height:(7+(num-100)*0.2) + 'rem' }
					        };
						case 2:
						   if(num<=200){
						   	break
						   }else{
						   	return  { height:(7+(num-200)*0.2) + 'rem' }
						   };	
						case 3:
						   if(num<=300){
						   	break
						   }else{
						   	return  { height:(7+(num-300)*0.2) + 'rem' }
						   }	
					     
					} 
				}
			}
			
		},
        created() {

        },
        mounted() {
            
        },
        
        methods: {
			handleClick:function(e){
				console.log(e)
			}
		}
    }
</script>

<style lang="stylus" scoped>
    
	.home 
		background url("~@img/background.png") no-repeat
		background-size 100% 100%
		height 100%
		padding 2.2rem 4.3rem 0
		.title 
			margin-bottom 3rem
			margin-left -1.3rem
			.title-img 
				float left
				margin-right 1.8rem
				img 
					height 3.5rem
			.title-font 
				float left
				font-size 2.4rem
				color #FFFFFF
				font-weight 600
				line-height 3.5rem
		.userinfo 
			margin-left 6.7rem
			margin-bottom 2.5rem
			.avatar 
				margin-right 1rem
				img 
					// width 46px
					// height 46px
					width: 4rem
					height: 4rem
					display: flex;
					border-radius: 50%;
					align-items: center;
					justify-content: center;
					overflow: hidden
					border 1px solid #FFFFFF
			.info-right 
				.username 
					font-size 1.2rem
					margin-bottom 0.8rem
				div 
					position relative
					.level-name 
						font-size 1.8rem
						font-weight 600
						margin-right 1rem
					.level 
						width: 2.6rem
						height: 1.4rem
						border-radius 0.4rem
						background #e6ad50
						font-size 1rem
						font-weight 500
						line-height 1.4rem
						text-align center
						position absolute
						bottom 0
						right -2rem
		.puzzle 
			max-height 26rem
			margin-bottom 2.5rem
			-moz-column-count:2; /* Firefox */
			-webkit-column-count:2; /* Safari 和 Chrome */
			column-count:2
			-moz-column-gap: 0.4rem
			-webkit-column-gap: 0.4rem
			column-gap: 0.4rem
			width: 100%
			.puzzle-item 
				// min-height 7rem 
				// border-radius 0.8rem
				// padding 1.5rem
				// margin-right 0.4rem
				// margin-bottom 0.4rem
				// width calc(50% - 0.2rem)
				// background #9c59b4
				min-height 7.5rem
				border-radius 0.8rem
				padding 1.5rem
				margin-bottom: 0.4rem;
				width 100%
				-moz-page-break-inside: avoid;
				-webkit-column-break-inside: avoid;
				break-inside: avoid;
				background: #9c59b4;
				.puzzle-name 
					font-size 1.8rem
					float: left;
					margin-right 0.5rem
				.puzzle-num 
					font-size 1.4rem
					float: left;
					position relative
					top 0.3rem
		.beat 
			font-size 1.8rem
			text-align center
			position absolute
			bottom 13.5rem
			left 0
			right 0
		.test-btn 
			width 21rem
			height 4rem
			border-radius 2rem
			text-align center
			line-height 4rem
			position absolute
			left 50%
			margin-left -10.5rem
			bottom 7rem
			background: -webkit-linear-gradient(left, #b4d55b , #5bcace); /* Safari 5.1 - 6.0 */
			background: -o-linear-gradient(right, #b4d55b , #5bcace); /* Opera 11.1 - 12.0 */
			background: -moz-linear-gradient(right, #b4d55b , #5bcace); /* Firefox 3.6 - 15 */
			background: linear-gradient(to right, #b4d55b , #5bcace); /* 标准的语法 */
</style>
