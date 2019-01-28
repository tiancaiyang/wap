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
                        this.$router.push({ name: 'ShopdetailB', params:{ id:this.list[i].link } })
                    }else if(this.list[i].link_type == 3){
                        this.$router.push({ name: 'brandNameListB', query:{ cid:this.list[i].link,  title:this.list[i].link_name } })
                    }else if(this.list[i].link_type == 4){
                        this.$router.push({ name: 'assestCoodsListB', query:{cid:this.list[i].link,title:this.list[i].link_name,type:'cat'} })
                    }else if(this.list[i].link_type == 5){
                        this.$router.push({ name: 'brandGoodsListB', query:{cid:this.list[i].link,title:this.list[i].link_name,type:'brand'} })
                    }else if(this.list[i].link_type == 6){//秒杀
                        this.$router.push({ path: '/TitmeLimitB' })
                    }else if(this.list[i].link_type == 7){//特价
                        this.$router.push({ path: '/GoodSaleB' })
                    }else if(this.list[i].link_type == 8){//组合活动
                        this.$router.push({ path: '/CombinationListB' })
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
    background: #eee;
        .swiper-img{
            max-width: 100%!important;
            height: 100%;
        }
   }
    
</style>