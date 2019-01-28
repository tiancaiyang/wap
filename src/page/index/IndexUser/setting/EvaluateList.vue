<template>
  <div class="my_evaluateList">
    <header id="header" class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">我的评价</h1>
    </header>

    <!-- 评价列表盒子-->
    <div class="evaluateList_box">
      <ul>
        <li class="list_box" v-for="item in items" :key="item.index">
          <!-- 评价 盒子的上半部分 -->
          <div class="list_box_top">
            <!-- 用户头像 -->
            <div class="head_img">
              <img :src="item.head_image">
            </div>
            <!-- id和商品信息 -->
            <div class="id_goodsmsg">
              <p class="title_id">{{item.username}}</p>
              <p class="goods_msg">{{item.create_date + ' ' + item.product_attr}}</p>
            </div>
          </div>

          <!-- 评价内容 -->
          <div class="evaluate_content">
            <p>{{item.content}}</p>
            <ul v-if="item.images.length!=0">
              <li v-for="img_list in item.images" :key="img_list.index">
                <img :src="'http://www.silutianyu.com'+ img_list.image">
              </li>
            </ul>
          </div>

          <!-- 评价的商品 -->
          <div class="evaluate_goods">
            <!-- 商品图片 -->
            <div class="goods_img">
              <img :src="'http://www.silutianyu.com'+item.thumb">
            </div>
            <!-- 商品描述和价格 -->
            <div class="goods_right">
              <!-- 商品描述 -->
              <p class="goods_text">{{item.title}}</p>
              <!-- 商品价格 -->
              <p class="goods_price">{{'￥' + item.price}}</p>
            </div>
          </div>
        </li>
      </ul>
      <!-- 加载更多 -->
      <div class="loadingMore" v-if="items.length == 0 || items.length < 10? false : true">
        <button class="mui-btn mui-btn-danger mui-btn-outlined" @click="morePage()">加载更多</button>
      </div>
      <span v-if="resoultNull" class="nullCount">暂无更多内容</span>
    </div>

  </div>
</template>

<script>
  import {
    userEvaluateList
  } from '../../../../api/index.js'
  export default {
    data() {
      return {
        items: [],
        limit: 10,
        resoultNull: false,
        page: 0
      }
    },
    created() {
      this.getEvaluateMsg()

    },
    methods: {
      getEvaluateMsg() {
        let params = {
          page: this.page,
          limit: this.limit
        }
        userEvaluateList(params).then(res => {
          this.items = this.items.concat(res.data)
          this.itemLength = res.data.length
          if (res.data.length == 0) {
            this.resoultNull = true
          }
          console.log(this.items)
        })
      },
      // 加载更多
      morePage() {
        if (this.itemLength < 10) {
          mui.toast('没有更多了')
        } else {
          this.page++
          this.getEvaluateMsg()
        }
      },
    }
  }

</script>

<style lang="less" scoped>
  .my_evaluateList {
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
    }

    // 评价列表
    .evaluateList_box {
      ul {
        list-style: none;
        margin-top: 50px;
        margin-bottom: 0.6rem;
        padding-left: 0;

        .list_box {
          padding-top: 0.2rem;
          padding-bottom: 0.6rem;
          margin-bottom: 0.2rem;
          background-color: #fff;

          .list_box_top {
            width: 100%;
            overflow: hidden;
            margin-bottom: 0.5rem;

            //头像
            .head_img {
              width: 0.8rem;
              height: .8rem;
              float: left;
              margin: 0 0.28rem;

              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                vertical-align: middle;
              }
            }

            // 用户id跟商品信息
            .id_goodsmsg {
              float: left;
              height: 0.8rem;
              width: 80%;

              p {
                padding: 0;
                margin: 0;
                text-align: left;
                height: 50%;
              }

              .title_id {
                font-size: 0.28rem;
                font-weight: 700;
                color: rgb(51, 51, 51);
              }

              .goods_msg {
                font-size: 0.14rem;
                color: rgb(102, 102, 102);
              }
            }
          }

          //评价内容
          .evaluate_content {
            width: 100%;
            display: block;
            padding: 0 0.28rem;

            p {
              margin-bottom: 0.42rem;
            }

            ul {
              margin-top: 0;
              overflow: hidden;

              li {
                float: left;
                margin-right: 0.48rem;

                img {
                  vertical-align: middle;
                  width: 1.56rem;
                  height: 1.56rem;
                }
              }
            }
          }

          //评价的商品
          .evaluate_goods {
            margin: 0.59rem 0.28rem 0;
            background-color: #f0f0f0;
            height: 1.84rem;
            position: relative;

            .goods_img {
              position: absolute;
              left: 0.23rem;
              top: 0.14rem;

              img {
                vertical-align: middle;
                width: 1.56rem;
                height: 1.56rem;
              }
            }

            .goods_right {
              position: absolute;
              left: 1.92rem;
              top: 0.14rem;

              p {
                text-align: left;
                margin-bottom: 0;
              }

              .goods_text {
                font-size: 0.28rem;
                color: #151515;
                font-weight: 700;
              }

              .goods_price {
                color: #ff0000;
                font-size: 0.35rem;
                margin-top: 0.6rem;
              }
            }
          }
        }
      }
      // 暂无更多
      .nullCount{
        display: block;
        margin-top: 2rem;
      }
      // 加载更多按钮
      .loadingMore {
        margin-bottom: 1rem;

        button {
          width: 80%;
        }
      }
    }
  }

</style>
