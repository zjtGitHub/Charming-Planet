<template>
    <div class="ad" v-if="show">
        <div class="bg">
            <img :src="data[0].image" alt="" @click.stop="jump(data[0].link_url)">
        </div>
        <div class="jump" @click="go">
            {{time}}S 跳过
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                time: 5,
                show: false,
                setInt: null,
            };
        },
        computed: {
            ...mapState([
                'user'
            ])
        },
        created() {
            this.getData()
            this.countdown()
            this.$store.commit('user/setAd')
        },
        methods: {
            jump(url) {
                console.log(url);
                window.location.href = url
            },
            getData() {
                this.$post("Book/getAdvert").then(res => {
                    this.show = true
                    this.data = res.data
                })
            },
            countdown() {
                this.setInt = setInterval(() => {
                    if (this.time > 0) {
                        this.time--
                    } else {
                        clearInterval(this.setInt)
                        this.go()
                    }
                }, 1000)
            },
            go() {
                clearInterval(this.setInt)
                this.$router.replace({
                    path: "/home"
                })
            },
        }
    }
</script>

<style lang="stylus">
    .ad {
        .bg {
            position fixed
            left 0
            top 0
            bottom 0
            right 0
            z-index: 2;
            img {
                width 100%
                height: 100%
            }
        }
        .jump {
            position fixed
            z-index 3
            right 20px
            top 20px
            width: 60px;
            height: 20px
            line-height 20px
            text-align center
            border-radius: 24px;
            background: rgba(0, 0, 0, 1);
            opacity: 0.5;
            color #fff;
            font-size 13px;
        }
    }

</style>
