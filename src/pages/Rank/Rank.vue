<template>
	<div>
		<div class="rank" ref="wrapper">
			<div>
				<div class="rank-top">
					<div class="rank-title">
						美力能量排行榜
					</div>
					<div class="rank-rule">
						榜单规则
					</div>
				</div>
				<div class="user-card">
					<user-info :userstyle="userstyle" :rankshow="true"></user-info>
					<div class="button-box clearfix">
						<div style="background: #5e6bcb;">提升美力</div>
						<div style="background: #c1e054;">收获印象</div>
					</div>
				</div>
				<div class="rank-list">
					<div style="color: #303030;font-size: 16px;font-weight: 600;">Top200</div>
					<user-info :userstyle="topstyle" :rankshow="false" :ranknum="rank"></user-info>
					<user-info :userstyle="topstyle" :rankshow="false" :ranknum="second"></user-info>
					<user-info :userstyle="topstyle" :rankshow="false" :ranknum="second"></user-info>
					<user-info :userstyle="topstyle" :rankshow="false"></user-info>
					<user-info :userstyle="topstyle" :rankshow="false"></user-info>
					<user-info :userstyle="topstyle" :rankshow="false"></user-info>
					<user-info :userstyle="topstyle" :rankshow="false"></user-info>
					<user-info :userstyle="topstyle" :rankshow="false"></user-info>
					<user-info :userstyle="topstyle" :rankshow="false"></user-info>
					<user-info :userstyle="topstyle" :rankshow="false"></user-info>
					<user-info :userstyle="topstyle" :rankshow="false"></user-info>
					<user-info :userstyle="topstyle" :rankshow="false"></user-info>
				</div>
			</div>
		</div>
		<myfooter></myfooter>
	</div>
	
</template>

<script>
	import UserInfo from './components/UserInfo'
	import myfooter from '@/pages/footer'
	import Bscroll from 'better-scroll'
	export default {
		name:'Rank',
		data () {
			return {
				userstyle:{
					height: "6.5rem",
					width: "6.5rem",
				},
				topstyle:{
					height: "5rem",
					width: "5rem",
				},
				rank:1,
				second:2,
			}
		},
		components: {
			UserInfo,
			myfooter
		},
		mounted () {
		  this.scroll = new Bscroll(this.$refs.wrapper)
		},
	}
	
</script>

<style lang="stylus" scoped="">
	@import '~@styles/varibles.styl'
	.rank
		background $background
		background-size 100% 100%
		padding 0 1.6rem
		position absolute
		left 0
		top 0
		right 0
		bottom 5rem
		overflow hidden
		.rank-top
			margin 0 auto
			padding-top 4.4rem
			position relative
			.rank-title
				background url("~@img/ranktop.png") no-repeat
				background-size 100% 100%
				width 22rem
				height 4.2rem
				margin 0 auto
				font-size 1.8rem
				font-weight 600
				color #303030
				line-height 1.5
				text-align center
			.rank-rule 
				position absolute
				top 1.5rem
				right 0
				font-size 1.4rem
		.user-card
			width 100%
			height 15.5rem
			border-radius 1rem
			background #FFFFFF
			margin-top 1.8rem
			margin-bottom 1.2rem
			padding 1.2rem 1.2rem 0 1.2rem
			.button-box
				padding-left 7.5rem
				div
					float left
					width 7rem
					height 3.2rem
					border-radius .6rem
					margin-right .8rem
					color #FFFFFF
					line-height 3.2rem
					font-size 1.2rem
					text-align center
					
		.rank-list 
			width 100%
			border-radius 1rem
			background #FFFFFF
			padding 2rem 1.2rem 0 1.2rem
			.info-box
				margin 1.5rem 0
				border-bottom 1px solid #e2e2e2
</style>
