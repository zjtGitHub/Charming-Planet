<template>
	<div class="topic">
		
		<div class="topic-head">
			<div class="p-l" v-go="{name:'home'}">
				<span class="iconfont">&#xe676;</span>
				<span>我的美力能量</span>
			</div>
			<div class="p-r">话题</div>
		</div>
		<div class="scroll-box">
			<div class="topic-main" >
				<question class="question-main"></question>
				<share></share>
			</div>
		</div>
	</div>
</template>

<script>
	import question from './components/questions'
	import share from './components/share'
	import Bscroll from 'better-scroll'
	export default {
		name:"Topic",
		data () {
			return {
				
			}
		},
		components:{
			question,
			share
		},
		created () {
			
		},
		mounted () {
			// this.scroll = new Bscroll(this.$refs.wrapper)
		},
		
	}
</script>

<style lang="stylus" scoped>
	@import '~@styles/varibles.styl'
	.topic
		background $background
		background-size 100% 100%
		position absolute
		top 0
		left 0
		right 0
		bottom 0
		.topic-head 
			position fixed
			top 0
			width 100%
			font-size 1.4rem
			font-weight 600
			padding 1.7rem 1.2rem
			z-index 5
			background $background
			background-size 100%
		.scroll-box
			position absolute
			top 5rem
			left 0
			right 0
			bottom 0
			padding-top 4.6rem
			.topic-main
				background #FFFFFF
				color #303030
				.question-main
					position relative
					top -4.6rem
				
</style>
