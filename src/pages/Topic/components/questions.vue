<template>
	<div>
		<div class="question">
			<swiper :options="swiperOption" ref="mySwiper">
			    <swiper-slide><img src="~@img/question1.png" alt=""></swiper-slide>
			    <swiper-slide><img src="~@img/question2.png" alt=""></swiper-slide>
				<swiper-slide><img src="~@img/question1.png" alt=""></swiper-slide>
				<swiper-slide><img src="~@img/question2.png" alt=""></swiper-slide>
				<swiper-slide><img src="~@img/question1.png" alt=""></swiper-slide>
			</swiper>
			<div class="question-box">
				<div class="title">1.上图油画是什么风格？</div>
				<div class="option-box">
					<p class="option">A.古典</p>
					<p class="option">B.印象派</p>
					<p class="option">C.抽象主义</p>
					<p class="option">D.写实派</p>
				</div>
			</div>  
			<div class="qusetion-tab">
				<div class="tab-box">
					<div class="p-l">
						<span>
							<i class="iconfont">&#xe608;</i>
							<i>分享</i>
						</span>
						<span>
							<i class="iconfont">&#xe693;</i>
							<i>收藏</i>
						</span>
					</div>
					<div class="p-r">
						<span>
							<i class="iconfont" style="color: #44d2d2;">&#xe614;</i>
							<i>30</i>
						</span>
						<span>
							<i class="iconfont" style="color: #ff5555;">&#xe613;</i>
							<i>5</i>
						</span>
					</div>
				</div>
			</div>
		</div>
		<!-- 测试结果 -->
		<result></result>
	</div>
	
</template>

<script>
	import result from './result'
	export default {
	    name: 'question',
		components:{
			result
		},
	    data() {
	      return {
	        swiperOption: {
				autoplay:2000,//自动滑动
				speed:500,//自动滑动开始到结束的时间（单位ms）
				// loop:true,//开启循环
				// loopedSlides:5,//在loop模式下使用slidesPerview:'auto',还需使用该参数设置所要用到的loop个数。
				slidesPerView:"auto",//设置slider容器能够同时显示的slides数量(carousel模式)。另外，支持'auto'值，会根据容器container的宽度调整slides数目。
				effect:'coverflow',//可以实现3D效果的轮播,
				centeredSlides:true,//设定为true时，active slide会居中，而不是默认状态下的居左。
				coverflowEffect:{
					rotate:0,//slide做3d旋转时Y轴的旋转角度。默认50。
					stretch:-70,//每个slide之间的拉伸值，越大slide靠得越紧。 默认0。
					depth:400,//slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
					modifier:1,//depth和rotate和stretch的倍率，相当于depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
					slideShadows:false,//开启slide阴影。默认 true。
				},
			  }
	        }
	    },
	    computed: {
	      swiper() {
	        return this.$refs.mySwiper.swiper
	      }
	    },
	    mounted() {
	      // current swiper instance
	      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
	      console.log('this is current swiper instance object', this.swiper)
	      // this.swiper.slideTo(3, 1000, false)
	    }
	  }
</script>

<style lang="stylus" scoped>
	.question
		padding-bottom 2rem
		border-bottom 1px dashed #e0e0e0
		.swiper-container
			height 26rem
			width 100%
			touch-action none
			.swiper-slide
				height 26rem
				width 26rem
				img
					width 26rem
					height 26rem
					border-radius .8rem
		.question-box
			margin-top 3.5rem
			padding 0 4.85rem
			.title
				font-size 2rem
				margin-bottom 1.5rem
			.option-box
				.option
					font-size 1.6rem
					height 4.9rem
					line-height 4.9rem
					padding 0 2.9rem
					border 1px solid #5e6bcb
					margin-bottom .5rem
					border-radius 1rem
		.qusetion-tab
			margin-top 1.5rem
			padding 0 2.4rem
			.tab-box
				height 4.9rem
				line-height 4.9rem
				padding 0 1.8rem
				border-radius .5rem
				box-shadow: 0 0 50px #e8e8e8;
				i
					vertical-align middle
				.iconfont
					font-size 2.2rem
					
</style>
