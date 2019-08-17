<template>
    <div class="picture_detail" v-if="show">
        <div class="header">
            <img :src="data.book.cover_img" class="cover" :height="height" width="100%">
            <img :src="data.book.category_script_img" class="label">
        </div>
        <div class="title">
            {{data.book.name}}
        </div>
        <div class="content">
            {{data.book.description}}
        </div>
        <div class="title" style="font-size: 16px">
            课程列表
        </div>
        <div class="video-list">
            <div class="video-item" v-for="item in data.video" @click="play(item.type,item.id,item.video_url)">
                <div class="image p-l">
                    <div class="vip-label" v-if="item.type == 2">
                        <img src="@img/viplabel.png"/>
                    </div>
                    <div class="layer">
                        <i class="iconfont icon-bofang"></i>
                    </div>
                    <img :src="item.cover_img" alt="">
                </div>
                <div class="video-content p-l">
                    <div class="video-title line-2">
                        {{item.name}}
                    </div>
                    <div class="hot">
                        <i class="iconfont icon--redu"></i> {{item.number}}
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <van-popup v-model="pop">
            <div class="vip">
                <div class="btns">
                    <div class="cancel btn" @click="cancelPop">取消</div>
                    <div class="confirm btn" @click="confirmPop">确认</div>
                    <div class="clear"></div>
                </div>
            </div>
        </van-popup>
        <van-popup v-model="vedio" @click-overlay="cancelPop">
            <!--<video-player class="video-player vjs-custom-skin"-->
                          <!--ref="videoPlayer"-->
                          <!--:playsinline="true"-->
                          <!--:options="playerOptions"-->
            <!--&gt;-->
            <!--</video-player>-->
            <div style="background: #000;width: 100%">
                <video width="100%" controls ref="video">
                    <source :src="vedioSrc">
                </video>
            </div>
        </van-popup>
        <!--<video-player class="video-player vjs-custom-skin"-->
                      <!--ref="videoPlayer"-->
                      <!--:playsinline="true"-->
                      <!--:options="playerOptions"-->
        <!--&gt;-->
        <!--</video-player>-->


    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                vedio: false,
                pop: false,
                show: false,
                height: "",
                vedioSrc:"",
                playerOptions: {
//        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: "video/mp4",
                        src: "https://jucheng.oss-cn-beijing.aliyuncs.com/zjchongwu/uploads/20181022/20181022/5ce5055ed01ca2bedd6034172b4ab7d7.MOV" //你的视频地址（必填）
                    }],
                    poster: "poster.jpg", //你的封面地址
                    width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
//        controlBar: {
//          timeDivider: true,
//          durationDisplay: true,
//          remainingTimeDisplay: false,
//          fullscreenToggle: true  //全屏按钮
//        }
                }
            }
        },
        computed: {
            ...mapState([
                'user'
            ])
        },
        created() {
            this.height = window.screen.width + "px";
            this.id = this.$route.query.id;
            this.getUser();
            this.getData()
        },

        methods: {
            cancelPop() {
                this.$refs.video.pause()
                this.pop = false
            },
            confirmPop() {
                this.$router.push("/vip/buy")
            },
            play(type,id,url) {
                if (type == 2) {
                    if (this.userData.is_vip == 1) {
                        this.pop = true
                    } else if (this.userData.is_vip == 2) {
                        this.playVedio(id,url)
                    }
                } else {
                    this.playVedio(id,url)
                }

            },
            playVedio(id,url){
                this.getData()
                this.$post("Book/addLookRecord",{video_id:id,user_id:this.user.user_id}).then(res=>{
                    this.playerOptions.sources = [{
                    type: "video/mp4",
                    src: url
                }]
                    this.vedioSrc = url
                    this.vedio = true
                })

            },
            getUser() {
                this.$post("Vip/getUserInfo", {openid: this.user.openid}).then(res => {
                    this.userData = res.data
                })
            },
            getData() {
                this.$post("Book/getBookDetail", {id: this.id}).then(res => {
                    this.data = res.data
                    this.show = true
                })
            }
        }
    }
</script>

<style lang="stylus">
    .picture_detail {
        .video-list {
            background #fff
            padding 15px
            .video-item {
                margin-bottom 30px
                .video-content {
                    width 60%
                    .video-title {
                        height 40px
                        margin-top 5px
                        color #1A1A1A
                        font-size 15px
                        line-height 20px
                        font-weight bold
                    }
                    .hot {
                        color #DEDEDE
                        margin-top 15px
                    }
                }
                .image {
                    margin-right 5px
                    width 130px
                    position relative
                    .layer {
                        width 130px
                        height 80px
                        background rgba(0, 0, 0, .2)
                        position absolute
                        left 0
                        top 0
                        color #fff
                        text-align center
                        line-height 80px
                        z-index 2
                        border-radius 10px
                    }
                    .vip-label {
                        position absolute
                        right 0px
                        bottom 0
                        color #1A1A1A
                        border-radius: 12.5px;
                        img {
                            width 30px
                            height 15px
                            border-radius 0
                        }
                        z-index 3
                    }

                    img {
                        border-radius 10px
                        width 130px
                        height 80px
                    }
                }

            }
        }

        .header {
            width 100%
            position relative
            .label {
                position absolute
                width: 50px;
                height: 23px;
                border-bottom-right-radius: 15px;
                top 0
                left 0
            }
        }
        .title {
            background #fff
            font-size 20px
            color #1A1A1A
            font-weight bold
            padding 15px
            word-break: break-all;
        }
        .content {
            color #808080
            font-size: 12px
            background #fff
            padding 0 15px 15px 15px
            line-height 15px
            border-bottom 1px solid #E6E6E6
            word-break: break-all;
        }
        .van-popup {
            background transparent
            width 100%
        }
        .vip {
            margin 0 auto
            background url("~@img/vip.png") center center no-repeat;
            background-size 300px 200px
            height 200px
            position relative
            .btns {
                width 300px
                margin 0 auto
                text-align center
                padding 150px 10px 0
                height 35px;
                box-sizing border-box

                .btn {

                    width 120px;
                    height 35px;
                    line-height 35px
                    text-align center
                    color #1A1A1A
                    float left
                    font-size 18px
                    font-weight bold
                    border-radius 25px
                    margin 0 10px
                }
                .confirm {
                    background #FFD318
                }
                .cancel {
                    background: rgba(0, 0, 0, .2);
                }
            }
        }
    }
</style>
