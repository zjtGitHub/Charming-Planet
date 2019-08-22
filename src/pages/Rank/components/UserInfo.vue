<template>
	<div class="info-box">
		<img :style="userstyle" class="avatar" src="~@img/avatar.png" alt="">
		<img src="~@img/first.png" alt="" class="cup first" v-if="iffirst">
		<img src="~@img/second.png" alt="" class="cup second" v-if="ifsecond">
		<div class="box-right">
			<p class="username">大米DemiB,S.W</p>
			<div class="level-info clearfix">
			   <p class="level-name p-l">小试牛刀</p>
			   <p class="level p-l">Lv.0</p>
			</div>
			<div class="answer-info">
				答对<span>666</span>题，获得<span>333</span>个美丽印象
			</div>
			<div class="current-rank" v-if="rankshow">
				当前排名：10000+
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'UserInfo',
		data () {
			return {
				rank:this.ranknum
			}
		},
		props:{
			ranknum:Number,
			userstyle: Object,
			rankshow: Boolean,
		},
		computed:{
			iffirst () {
				return this.rank==1
			},
			ifsecond () {
				return this.rank==2
			}
		}
	}
</script>

<style lang="stylus" scoped="">
	.info-box 
		color #303030
		overflow: hidden
		display: flex
		position relative
		.cup
			position absolute
			height 2.5rem
			width 2.25rem
			top 3.2rem
		.avatar
			width: 4rem
			height: 4rem
			display: flex;
			border-radius: 50%;
			align-items: center;
			justify-content: center;
			overflow: hidden
			border 1px solid #FFFFFF
			margin-right 1rem
		.box-right 
			flex 1
			text-align left
			padding-top .5rem
			.username
				font-size 1.6rem
				font-weight 600
				margin-bottom .6rem
			.level-info
				margin-bottom 1rem
				.level-name
					font-size 1.2rem
					color #909090
					line-height 1.3
				.level
					width: 2.6rem
					height: 1.4rem
					border-radius 0.4rem
					background #fac35e
					font-size 1rem
					font-weight 500
					line-height 1.4rem
					text-align center
					color #FFFFFF
					font-weight 600
					margin-left 1rem
			.answer-info
				font-size 1.3rem
				margin-bottom 1rem
				span
					color #44d2d2
					font-weight 600
					margin 0 .4rem
			.current-rank
				font-size 1.3rem
				margin-bottom 1rem
			
</style>
