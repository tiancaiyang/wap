<template>
  <div class="record">
    <header id="header" class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">浏览记录</h1>
      <span class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @click="removeAll">删除</span>
    </header>
    <div class="browse_box">
      <div class="browse_list" v-for="item in browseRecordData" :key="item.dt_create">
        <h3 class="browse_time">{{ item.dt_create }}</h3>
        <ul class="browse_goods">
          <li class="goods_box" v-for="items in item.goods" :key="items.index" @click="infoHref(items)">
            <a href="javascript:void(0);">
              <img :src="items.thumb">
              <div class="info">
                <h4 class="mui-ellipsis-2">{{ items.title }}</h4>
                <div class="price">
                  <!-- <p>规格：{{ items.guide }}</p> -->
                  <p class="nowPrice">￥<b>{{ items.price }}</b></p>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <!-- 加载更多 -->
      <div class="loadingMore" v-if="this.browseRecordData == '' ? false:true" >
        <button  class="mui-btn mui-btn-danger mui-btn-outlined" @click="morePage()">加载更多</button>
      </div>
    </div>
    <span v-if="resoultNull" class="nullCount">暂无更多内容</span>
  </div>
</template>

<script>
  import {
    userBrowseRecord,
    clearBrowseRecord
  } from '../../../../api/index.js'
  export default {
    data() {
      return {
        browseRecordData: [], //浏览记录的数据
        page: 0,
        limit:10,
        dataLength: 0,
        dataDeta:'',
        resoultNull: false,//判断没有数据时
      }
    },
    created() {
      this.getRecordData()
    },
    methods: {
      getRecordData() {
        this.dataLength = 0
        let params = {page:this.page, limit:this.limit}
        userBrowseRecord(params).then(res => {
          this.browseRecordData = this.browseRecordData.concat(res.data)
          // 拿到最后一条数据，判断下次的数据有没有和最后一条数据的日期一致的
          console.log(this.browseRecordData)
          this.dataDeta = this.browseRecordData[length-1]
          res.data.forEach(item => {
            this.dataLength += item.goods.length
            if( this.dataDeta == item.dt_create){

            }
          });
          if (res.data.length == 0) {
            this.resoultNull = true
          }
          // console.log(this.dataLength)
          // console.log(this.browseRecordData)
        })
      },
      // 加载更多
      morePage(){
        if(this.dataLength < 10){
            mui.toast('没有更多了')
        }else{
            this.page++
            this.getRecordData()
        }
      },
      // 删除全部
      removeAll(){
        var self = this;
        mui.confirm('确定删除全部吗？', function(e) {
            if (e.index == 1) {
                clearBrowseRecord().then(res=>{
                    self.browseRecordData = '',
                    console.log(res)
                })
            } else {

            }

        });
      },
      // 商品详情进入
      infoHref(item){
        if(item.type == 1){//B端 
          this.$router.push({ name: 'ShopdetailB' ,params:{ id:item.product_id } })
        }else if(item.type == 2){//C端
          this.$router.push({ name: 'Shopdetailc' ,params:{ id:item.product_id } })
        }
      }

    }
  }

</script>

<style lang="less" scoped>
  .record {
    #header {
      @headerBg: #fff;
      @headerHeight: 50px;
      background: @headerBg;
      height: @headerHeight;

      .mui-pull-left {
        height: @headerHeight;
        line-height: 32px;
        color: #333;
        font-size: 30px;
        font-weight: 400;
      }

      .mui-title {
        color: #333;
        font-weight: bold;
        height: @headerHeight;
        line-height: @headerHeight;
      }
      .mui-btn-link{
        line-height: 50px;
        color: #666;
      }
    }

    ul,
    li {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .browse_box {
      padding-top: 50px;
      // padding-bottom: 1rem;
      background-color: #fff;

      .browse_list {
        margin-top: 0.28rem;

        .browse_time {
          font-size: .32rem;
          color: #2e2e2e;
          text-align: left;
          padding-left: .28rem;
        }

        .browse_goods {
          .goods_box {
            padding: 0.28rem 0.28rem;
            text-align: left;

            a {
              display: flex;

              img {
                width: 2rem;
                height: 2rem;
                margin-right: 0.15rem;
              }

              .info {
                display: flex;
                justify-content: space-between;
                flex-direction: column;

                h4 {
                  color: #222;
                  font-size: 0.32rem;
                  font-weight: normal;
                  line-height: 0.4rem;
                }

                .price {
                  p {
                    margin-bottom: 0;
                    text-align: left;
                    color: #999;
                    font-size: 0.25rem;
                  }

                  .nowPrice {
                    color: #e51616;
                    b {
                      font-size: 0.34rem;
                    }
                  }
                }
              }
            }
          }
        }
      }
      // 加载更多按钮
      .loadingMore{
        padding-bottom: 1rem;
        button{
          width: 80%;
        }
      }
      
    }
    // 暂无更多
      .nullCount{
        display: block;
        margin-top: 1rem;
      }
  }

</style>
