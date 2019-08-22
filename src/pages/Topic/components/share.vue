<template>
	<div class="share">
		<div class="share-box">
			<p class="share-title">考朋友</p>
			<div>
				<img src="~@img/share1.png" alt="">
				<p>微信好友</p>
			</div>
			<div>
				<img src="~@img/share2.png" alt="">
				<p>朋友圈</p>
			</div>
			<div>
				<img src="~@img/share3.png" alt="">
				<p>QQ</p>
			</div>
			<div>
				<img src="~@img/share4.png" alt="">
				<p>QQ空间</p>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		name:'share',
		
	}
</script>

<style lang="stylus" scoped>
	.share
		padding 0 1.5rem
		.share-box
			padding 0 3.5rem
			height 8.5rem
			display flex
			flex-direction: row;
			justify-content center
			border 1px solid #e0e0e0
			border-radius .5rem
			position relative
			.share-title
				position absolute
				background #FFFFFF
				font-weight 600
				font-size 1.3rem
				top -.65rem
				width 5.3rem
				text-align center
			div
				flex 1
				text-align center
				align-self center
				p
					font-size 1.1rem
				img
					width 3.6rem
					height 3.6rem
					margin-bottom 1rem
</style>
