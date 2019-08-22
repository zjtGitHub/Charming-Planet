<template>
	<van-tabbar v-model="tabactive" active-color="#20A546">
		<van-tabbar-item to="/home">
			<span>元素</span>
			<img slot="icon" slot-scope="props" :src="$route.path === '/home' ? icon.homeActive : icon.homeNormal">
		</van-tabbar-item>
		<van-tabbar-item to="/topic">
			<span>话题</span>
			<img slot="icon" slot-scope="props" :src="$route.path === '/topic' ? icon.pointActive : icon.pointNormal">
		</van-tabbar-item>
		<van-tabbar-item to="rank">
			<span>排行</span>
			<img slot="icon" slot-scope="props" :src="$route.path === '/rank' ? icon.onlineActive : icon.onlineNormal">
		</van-tabbar-item>
		<van-tabbar-item to="/mine">
			<span>我的</span>
			<img slot="icon" slot-scope="props" :src="$route.path === '/mine' ? icon.mineActive : icon.mineNormal">
		</van-tabbar-item>
	</van-tabbar>
</template>

<script>
	export default {
		name: 'myfooter',
		data() {
			return {
				tabactive:0,
				icon: {
					homeNormal: require('@img/icon/home.png'),
					homeActive: require('@img/icon/home-active.png'),
					pointNormal: require('@img/icon/topic.png'),
					pointActive: require('@img/icon/topic-active.png'),
					onlineNormal: require('@img/icon/level.png'),
					onlineActive: require('@img/icon/level-active.png'),
					mineNormal: require('@img/icon/mine.png'),
					mineActive: require('@img/icon/mine-active.png'),
				}

			}
		},
		created() {
			// this.$wx.setConfig();
			// console.log(this.$route.path)
		},
		watch:{
			'$route.path':function(to,from){
				// switch (to) {
				// 	case '/home':
				// 	console.log(0)
				// 		this.tabactive = 0
				// 		break;
				// 	case '/topic':
				// 	console.log(1)
				// 		this.tabactive = 1
				// 		break;
				// 	case '/rank':
				// 	console.log(2)
				// 		this.tabactive = 2
				// 		break;
				// 	case '/mine':
				// 		this.tabactive = 3
				// 		break;
				// }
				console.log(to,from)
				return this.tabactive
			}
		},
		computed: {
			
		},
	}
</script>

<style>
</style>
