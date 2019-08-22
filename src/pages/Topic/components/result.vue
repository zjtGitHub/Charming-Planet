<template>
	<div class="result">
		<div class="result-title">
			测试结果
		</div>
		<div class="result-box">
			<div class="right-answer">
				<div class="right-option">
					C.抽象主义
				</div>
			</div>
			<div class="result-analysis">
				油画（an oil painting；a painting in oils）是以用快干性的植物油（亚麻仁油、罂粟油、核桃油等）调和颜料，在画布亚麻布，纸板或木板上进行制作的一个画种。作画时使用的稀释剂为挥发性的松节油和干性的亚麻仁油等。画面所附着的颜料有较强的硬度，当画面干燥后，能长期保持光泽。凭借颜料的遮盖力和透明性能较充分地表现描绘对象
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style lang="stylus" scoped>
	.result
		.result-title
			height 5.75rem
			line-height 5.75rem
			padding 0 1.5rem
			font-size 1.6rem
			font-weight 600
		.result-box
			.right-answer
				min-height 10rem
				padding 0 4.3rem
				display: flex;
				background url('~@img/question1.png') no-repeat
				background-size 100%
				background-position 0 -12rem
				flex-direction: column;
				justify-content: center;
				.right-option
					font-size 1.6rem
					min-height 4.9rem
					line-height 4.9rem
					padding 0 2.9rem
					background #5464b9
					color #FFFFFF
					text-align center
					border-radius 1rem
					margin 2rem 0
			.result-analysis
				padding 1.8rem
				font-size 1.3rem
				line-height 1.7
</style>
