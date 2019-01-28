<template>
    <div class="smallSwiper">
        <div class="swiper-containersm" ref="mySwiperSmallB">
            <div  class="swiper-wrapper" >
                <div class="swiper-slide" v-for="item in list" :key="item.id" >
                    <img class="swiper-img" :src="item.media_file_path" />
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'SlideSwiper',
        props: {
           list: Array
         },
        data() {
            return {

            }
        },
        updated(){
            this.smallSwiper()
        },
        methods:{
            smallSwiper(){
                new Swiper('.swiper-containersm', {
                    paginationClickable: true,
                    observer:true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents:true,//修改swiper的父元素时，自动初始化swiper
                    direction: 'horizontal',
                    loop: true,
                    autoplay: 3000,
                    slidesPerView: "auto",
                    centeredSlides:true,
                    spaceBetween: 16,
                    autoplayDisableOnInteraction: false,//手动轮播后还能自动轮播
                    onClick: (swiper, event)=>{
                        let swpsmB = this.$refs.mySwiperSmallB.swiper;
                        let i = swpsmB.realIndex;
                        if(this.list[i].link_type == 1){
                            window.location.href = this.list[i].link_type.link
                        }else if(this.list[i].link_type == 2){
                            this.$router.push({ name: 'ShopdetailB', params:{ id:this.list[i].link } })
                        }else if(this.list[i].link_type == 3){
                            this.$router.push({ name: 'brandNameListB', query:{ cid:this.list[i].position_id,  title:this.list[i].link_name } })
                        }else if(this.list[i].link_type == 4){
                            this.$router.push({ name: 'assestCoodsListB', query:{cid:this.list[i].position_id,title:this.list[i].link_name,type:'cat'} })
                        }else if(this.list[i].link_type == 5){
                            this.$router.push({ name: 'brandGoodsListB', query:{cid:this.list[i].position_id,title:this.list[i].link_name,type:'brand'} })
                        }else if(this.list[i].link_type == 6){//秒杀
                            this.$router.push({ path: '/TitmeLimitB' })
                        }else if(this.list[i].link_type == 7){//特价
                            this.$router.push({ path: '/GoodSaleB' })
                        }else if(this.list[i].link_type == 8){//组合活动
                            this.$router.push({ path: '/CombinationListB' })
                        }  
                    } 
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .smallSwiper{
        box-sizing: border-box;
        position: relative;
        padding: 0.28rem 0;
        background-color: #f9f9f9;
        overflow: hidden;
    }
    .swiper-containersm {
      margin-top: 20px;
      width: 100%;
      height: 2rem;
      background-color: #fff;
      overflow: visible!important;
      .swiper-wrapper{
        .swiper-slide{
            width: 83%; 
            border-radius: 0.4rem;
            img{
                width: 100%; 
                height: 2rem; 
                border-radius: 0.4rem;
            }
        }
        .swiper-slide-prev{ 
            height: 2rem!important;
            img{ 
                height: 2rem!important;
            }
        }
        .swiper-slide-next{ 
            height: 2rem!important;
            img{ 
                height: 2rem!important;
            }
        }
        .swiper-slide-active{ 
            width: 83%;
        }
      } 
    }
// .swiper-pagination .swiper-pagination-bullet{width: 12px; height: 12px; background: #ff1e1e;}
// .swiper-pagination .swiper-pagination-bullet-active{width: 21px; height: 12px; background: #e75230; border-radius: 6px;}
    // .swiper-slide {
    //   text-align: center;
    //   font-size: 18px;
    //   background: #fff;
    //   display: -webkit-box;
    //   display: -ms-flexbox;
    //   display: -webkit-flex;
    //   display: flex;
    //   -webkit-box-pack: center;
    //   -ms-flex-pack: center;
    //   -webkit-justify-content: center;
    //   justify-content: center;
    //   -webkit-box-align: center;
    //   -ms-flex-align: center;
    //   -webkit-align-items: center;
    //   align-items: center;
    //   width:80%;
    // }
    // .swiper-containersm  .swiper-slide:last-child{
    //     margin-left: 0;
    //     margin-right: 0;
    // }
    // .swiper-slide img{
    //   position: absolute;
    //   left: 0;
    //   width:100%;
    //   height: 100%;
    // }
</style>