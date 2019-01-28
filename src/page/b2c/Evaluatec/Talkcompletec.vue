<template>
    <div>
         <header id="header" class="mui-bar mui-bar-nav header">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                <h1 class="mui-title">感谢评价</h1>
            <a class="mui-right mui-pull-right" @click="OrderHref">完成</a>
        </header>
        
        <!-- 发货 -->
          <div  class="set">
            <ul>
                <li class="small"><img src="../../../assets/images/b2c/talkcompletec/talk.png" class="talk"><span>评论可以帮到其他买家，比心</span></li>   
            </ul>
        </div>

        <!-- 评论 -->
        <!-- <div class="content-row">
            <img src="../../../assets/images/b2c/talkcompletec/img1.png"  class="img" alt="">
            <div class="text"><div class="text-content">牛栏山超好喝珍品十八年陈酿</div></div>
            <div  class="talk-position"><div class="talk-person">评价</div></div>
        </div> -->


    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        created(){
            // console.log(this.$route.query.order_no)
        },
        methods:{
            OrderHref(){
                this.$router.push({  path: '/orderc' })
            }
        }
    }
</script>

<style scoped   lang="less">
// 头部
    #header{
        @headerBg: #fff;
        @headerHeight: 50px;
        background: @headerBg;
        height: @headerHeight; 
      .mui-pull-left{
        height: @headerHeight;
        line-height: 32px;
        color: #333;
      }
      .mui-title{
        color: #333;
        font-weight: bold;
        height: @headerHeight;
        line-height: @headerHeight;
      }
      .mui-pull-right{
        height: @headerHeight;
        line-height: 50px;
        color: #333;
      }
    }

 //  发货
 .set{
     background: #ff5500;
     width: 100%;
     height: 1.2rem;
     margin-top: 50px;
     display: flex;
     flex-direction: row;
     justify-content: center;
     align-items: center;
     ul{
    -webkit-margin-before: 0px;
    -webkit-margin-after: 0px;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
     }
     ul li{
        list-style: none;
        text-align: left;
     }
 }
 .big{
     font-size: .36rem;
     color: #ffffff;
     font-weight: bold;
 }
 .small{
     width: 100%;
     font-size: .24rem;
     color: #ffffff;
     display: flex;
     flex-direction: row;
     justify-content: center;
     align-items: center;
     text-align: center;
 }
 .talk{
     width: .41rem;
     height: .44rem;
 }
//内容
.content-row{
     width: 100%;
     height: 2.2rem;
     display: flex;
     flex-direction: row;
     background: #ffffff;
     border-bottom:1px solid #f0f0f0;
}
.img{
     width: 1.8rem;
     height: 2.3rem;
}
.text{
    height: 2.2rem;
    display: flex;
    flex: 1;
    text-align: left;
    font-size: .28rem;
    color: #151515;
    font-weight: bold;
    flex-wrap: wrap;

}
.talk-person{
    width:1.7rem;
    height:.6rem;
    border: 2px solid #ff5555;
    border-radius:.3rem; 
    line-height: .6rem;
    color:#ff5555;
    font-weight: bold;
    margin: .8rem .3rem 0 .5rem;
    text-align: center;
}
.talk-position{
    display: flex;
    justify-content:center; 
    height: 2.2rem;
}
.text-content{
    width: 100%;
    height: 1rem;
    line-height: .4rem;
    margin-top: .6rem;
}

</style>