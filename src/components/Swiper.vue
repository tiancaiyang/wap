<template>
    <div class="wrapper">
        <swiper :options="swiperOptionBg" ref="mySwiper">
        <swiper-slide v-for="item of list" :key="item.id" >
            <img class="swiper-img" :src="item.media_file_path" />
        </swiper-slide>
        <div class="swiper-pagination swiper1"  slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
 export default {
    name: 'HomeSwiper',
    props: {
        list: Array
    },
    data () {
        return {
            swiperOptionBg: {
                pagination: '.swiper1',
                loop: true,
                autoplay: 3000,//页面显示时间
                speed: 1000,//切换速度
                autoplayDisableOnInteraction: false,//手动轮播后还能自动轮播
                onClick: (swiper, event)=>{
                    let swp = this.$refs.mySwiper.swiper;
                    let i = swp.realIndex;
                    if(this.list[i].link_type == 1){
                        window.location.href = this.list[i].link_type.link
                    }else if(this.list[i].link_type == 2){
                        this.$router.push({ name: 'Shopdetailc', params:{ id:this.list[i].link } })
                    }else if(this.list[i].link_type == 3){
                        this.$router.push({ name: 'BrandNameListC', query:{ cid:this.list[i].link,  title:this.list[i].link_name } })
                    }else if(this.list[i].link_type == 4){
                        this.$router.push({ name: 'Classificationlist', query:{cid:this.list[i].link,title:this.list[i].link_name,type:'cat'} })
                    }else if(this.list[i].link_type == 5){
                        this.$router.push({ name: 'Homelist', query:{cid:this.list[i].link,name:this.list[i].link_name,type:'brand'} })
                    }else if(this.list[i].link_type == 6){//秒杀
                        this.$router.push({ path: '/cloudentrance/titmeLimit' })
                    }else if(this.list[i].link_type == 7){//特价
                        this.$router.push({ path: '/cloudentrance/goodsale' })
                    }
                } 
            },
        }
    },
}
</script>

<style lang="less">
   .wrapper {
      margin-top: 50px;
      height: 3.5rem!important;
        .swiper-pagination{
            position: absolute;
        }
        .swiper-container{
            height: 100%;
        }
        .swiper-pagination-bullet{
            background: rgb(10, 0, 0);
        }
        .swiper-pagination-bullet.swiper-pagination-bullet-active{
            background-color: #fff;
        }
    position: relative;
    overflow: hidden;
    width: 100%;
    height:3rem;
    background: #eee;
        .swiper-img{
            max-width: 100%!important;
            height: 100%;
        }
   }
    
</style>