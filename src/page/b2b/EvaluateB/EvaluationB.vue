<template>
  <div class="info">
    <header id="header" class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">评价</h1>
      <a @click="sureEvaluationc()" class="mui-pull-right">发布</a>
    </header>

    <div class="content">
      <img :src="dataList.thumb" class="tuxiang" alt="">
      <span>{{ dataList.product_name }}</span>
    </div>
    <!-- 上传图像 -->
    <div class="upload">
      <div class="upload-title">
        <textarea name="" id="" v-model="content" placeholder="感觉怎么样？来张棒棒的图片吧"></textarea>
      </div>
      <div class="position-picture">
        <div class="btn_box" v-if="imgs.length>=6 ? false : true">
          <img src="../../../assets/images/b2c/evaluatec/hehe_03.png" class="uploadimg">
          <!-- 上传图片的 input -->
          <input type="file" id="upload_btn" ref="input_btn" @change="add_img">
        </div>

        <!-- 预览图片区域 -->
        <ul>
          <li v-if="imgs.length > 0" v-for="(item,index) in imgs" :key="index">
            <img :src="item">
            <span id="img_delBtn" @click="delImg(index)"></span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 评分 -->
    <div class="fraction">
      <div class="f-header">
        <img src="../../../assets/images/b2c/evaluatec/hehe2_06.png" alt="" class="f-img">
        <span>整体评分</span>
      </div>

      <div class="star">
        <div class="text-star">描述相符</div>
        <div class="img-star" id="pingfen">
          <ul>
            <li><img src="../../../assets/images/b2c/evaluatec/star-1.png" alt=""></li>
            <li><img src="../../../assets/images/b2c/evaluatec/star-1.png" alt=""></li>
            <li><img src="../../../assets/images/b2c/evaluatec/star-1.png" alt=""></li>
            <li><img src="../../../assets/images/b2c/evaluatec/star-1.png" alt=""></li>
            <li><img src="../../../assets/images/b2c/evaluatec/star-1.png" alt=""></li>
          </ul>
        </div>
        <div class="color-star" id="color-star"></div>
      </div>

      <div class="star">
        <div class="text-star">描述相符</div>
        <div class="img-star" id="pingfen2">
          <ul>
            <li><img src="../../../assets/images/b2c/evaluatec/star-1.png" alt=""></li>
            <li><img src="../../../assets/images/b2c/evaluatec/star-1.png" alt=""></li>
            <li><img src="../../../assets/images/b2c/evaluatec/star-1.png" alt=""></li>
            <li><img src="../../../assets/images/b2c/evaluatec/star-1.png" alt=""></li>
            <li><img src="../../../assets/images/b2c/evaluatec/star-1.png" alt=""></li>
          </ul>
        </div>
        <div class="color-star" id="color-star2"></div>
      </div>

    </div>



  </div>
</template>

<script>
  import mui from '../../../../static/mui/js/mui.min.js'
  import {
    userApplicationImg1
  } from '../../../api/index.js'
  export default {
    data() {
      return {
        dataList: [],
        imgs: [],
        content: '', //评价内容
        size: 0
      }
    },
    created() {
      this.dataList = this.$route.query
      console.log(this.dataList)
    },
    mounted() {
      var oPf = document.getElementById('pingfen');
      var m = oPf.getElementsByTagName('img');
      var i = 0;
      for (i = 0; i < m.length; i++) {
        m[i].index = i;
        m[i].onclick = function () {
          for (i = 0; i < m.length; i++) {
            if (i <= this.index) {
              m[i].src =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAA7CAIAAACPNf91AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3xpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyOGQ3MzEzNC0zMjljLWU5NDMtOThmMC0zNGM2ZDZjZTljN2QiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjBGNjNGMEI5OTRBMTFFOEI1MDA5QkRFRURBOEQ3QzYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjBGNjNGMEE5OTRBMTFFOEI1MDA5QkRFRURBOEQ3QzYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRTkxNEU2RTk4OTdFODExODY5NTlDNTYxN0Q0NkZGNCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmUxMTg3MjYyLTk1NTQtMTFlOC05YmY1LWEzNTEyNzg4MDg2OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po9b6VIAAAM2SURBVHjaYvz//z/DQAMmhkEARh0x6ohRR1DZEeefPW84eHiAHbHqxs3GQ0eOPno8YI64/ep197ETQEbxnn0D5ojaI0f/ggv7k0+fnX76dAAcAQyGlVevw7nJW7YPgCNydu9F5l5+9Xru+Yt0dcTue/d33buPJtgJTh/0c0TFvgNYIujdu74Tp+jkiJ137517/gKrVPne/cC0QnNHvPr4KWztBlyyf/79W3L9Bs0dMfvylU8/f+JR0Hv8JNmBwYi/eXf31atXP39dfPW6ZPfer79/4zdLX1ysysZKXVBAX1KSIkdcfP7iyps3V1+/efr5y4svXy6+fPXy61dSfaYpIqwqJCTNyyvDx2ssKSHLw60lLo7PEWefPn317celV6/OPH9+4cUrYFKneiXJxsxsIC4OdI2hhLiiAL+LkiK6I+adv5i0eSvdam1RLq5XxfnoCTPRQK/G1ppujlgbEog9dzQ72JVbWdDaeg4WliPxMbbycjizaIezY5qRAU0dsT402FpOlkA5MdPbM0Ffj0Yu2B4Z7qGiRFRhNd/P20NZieou6HF1wuMC7IWV8Zz5uOoIMsA0L/dMYyOSi+2V/j4mJBZ5uECBuSlBF+Astl99+KA2a95HvJUFQVBsYQ6MCPIrMDEBgSNx0SJcnGS7wF5ejkgX4KtFdSTE/1EwcgEsGalQlZ968vTd9+9kO+Lehw9UcMSzL18pSRCfSElPOB1x98N7Shzx/vuPx2/eUuqIBx8+UuSIHz8+//1LcUi8/0CJI/79//+c6NYQTkc8/EhRSADB0y9fKHIEsMn66OMnXHokeXiAhfHppPgMY0N8GYTosGTBKvrz378vv35hiltIS3upKkeoq6qKiQG5JtJSsbo6Sy5fXXP9xutv38iOUOyO+P73D5oIsDYptTIP09JEE7eSlQGiQhOjRdeuTzh5Gtnp9z9Q5ogPPxFmhWpphGlqhmhp4DFFVUy0WUw0SlNj3+PH8y9cOguuhE8/e/7g9RsFURFyHfHjBy8bm5m0VL2tNdYGGfaWvrgYEGWbGE8/ew7YO33x5eu3f/+o0PkZ1ANno44YdcSoI0YdMeqIUUeMOoIBIMAA08dOXi+WGp8AAAAASUVORK5CYII="
            } else {
              m[i].src =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAA7CAIAAACPNf91AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3xpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyOGQ3MzEzNC0zMjljLWU5NDMtOThmMC0zNGM2ZDZjZTljN2QiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0REMERBMkQ5OTRBMTFFOEI3MTdBQjJGRTJGRDA3NDEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0REMERBMkM5OTRBMTFFOEI3MTdBQjJGRTJGRDA3NDEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRTkxNEU2RTk4OTdFODExODY5NTlDNTYxN0Q0NkZGNCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmUxMTg3MjYyLTk1NTQtMTFlOC05YmY1LWEzNTEyNzg4MDg2OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjxwDIcAAAIySURBVHja7JjpboJAFEaL4m5d464/ff+3Mibu+1a1J5gYWmAcGJA2mS9xIpgwZ+6Oxv1+/4hbiY8/IA2hITREyBCHw2EymcQMsd1uZ7PZfr+PDWK320HAl7CMEQRitVo9nYJigMAM6/X6eTkej2OAmM/n9svT6bRYLN4KsbP06+a7IVwj8Xw+P+L0HRCk5fF4dP1pOp06LRQ+BMcdjUZevzIZqaSJLAQZcbvdxAEb2BiGeLzbbDbJZJIUIBrEECiTydTr9XQ6nc1mlSCw6tnSlyW2Z/V7srQl0xJAhmEUCgURBPX/er2yGUHHyvahN0kgMBI0rMA5gQyyPJSqJymcOxwOfwdmpVLBkW+D6Ha7zpsmn0ajwapYcGScMhgM8vm8Z4rCgUkihej1eq4EP+pEu90ul8sREfT7/WKxKFWsOp2OOJeCCTMLCFwqJm7zW2rEarVaLwPfpWw3m82wOGq1WrVaDdI7CB9cmEgk1Ak4T/AGRrnFLxSWwAScRJJA1EVzuZxiZQyhldPJ6CmBIS6XSwgQAZqnXS/7vhSEYjvFivKzVlSW8OXKqCzhiyMqS/h6guk1WgrCmypCJaaq8lK6XC7VE8T02sY1vCkedLhUKvXot1yWSiUGcaCdxleFcIpzU4bZ0lkZEU2SXGBStKOrQtif9WnJub1dRUsYiVEZHz1e1Fh5E5GZDUyvwKaBYW1OLz9hPKxC21xYIjAlu6Ch/9vWEBpCQ2gIDaEh/jPEtwADADXTJfydYpb9AAAAAElFTkSuQmCC"
            }
          }
        };
        m[i].onmousedown = function () {
          var opp = document.getElementById('color-star');
          opp.innerText = (this.index + 1).toFixed(2);
        };
      }
      //循环
      var oPf2 = document.getElementById('pingfen2');
      var m2 = oPf2.getElementsByTagName('img');
      var i = 0;
      for (i = 0; i < m2.length; i++) {
        m2[i].index = i;
        m2[i].onclick = function () {
          for (i = 0; i < m2.length; i++) {
            if (i <= this.index) {
              m2[i].src =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAA7CAIAAACPNf91AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3xpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyOGQ3MzEzNC0zMjljLWU5NDMtOThmMC0zNGM2ZDZjZTljN2QiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjBGNjNGMEI5OTRBMTFFOEI1MDA5QkRFRURBOEQ3QzYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjBGNjNGMEE5OTRBMTFFOEI1MDA5QkRFRURBOEQ3QzYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRTkxNEU2RTk4OTdFODExODY5NTlDNTYxN0Q0NkZGNCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmUxMTg3MjYyLTk1NTQtMTFlOC05YmY1LWEzNTEyNzg4MDg2OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po9b6VIAAAM2SURBVHjaYvz//z/DQAMmhkEARh0x6ohRR1DZEeefPW84eHiAHbHqxs3GQ0eOPno8YI64/ep197ETQEbxnn0D5ojaI0f/ggv7k0+fnX76dAAcAQyGlVevw7nJW7YPgCNydu9F5l5+9Xru+Yt0dcTue/d33buPJtgJTh/0c0TFvgNYIujdu74Tp+jkiJ137517/gKrVPne/cC0QnNHvPr4KWztBlyyf/79W3L9Bs0dMfvylU8/f+JR0Hv8JNmBwYi/eXf31atXP39dfPW6ZPfer79/4zdLX1ysysZKXVBAX1KSIkdcfP7iyps3V1+/efr5y4svXy6+fPXy61dSfaYpIqwqJCTNyyvDx2ssKSHLw60lLo7PEWefPn317celV6/OPH9+4cUrYFKneiXJxsxsIC4OdI2hhLiiAL+LkiK6I+adv5i0eSvdam1RLq5XxfnoCTPRQK/G1ppujlgbEog9dzQ72JVbWdDaeg4WliPxMbbycjizaIezY5qRAU0dsT402FpOlkA5MdPbM0Ffj0Yu2B4Z7qGiRFRhNd/P20NZieou6HF1wuMC7IWV8Zz5uOoIMsA0L/dMYyOSi+2V/j4mJBZ5uECBuSlBF+Astl99+KA2a95HvJUFQVBsYQ6MCPIrMDEBgSNx0SJcnGS7wF5ejkgX4KtFdSTE/1EwcgEsGalQlZ968vTd9+9kO+Lehw9UcMSzL18pSRCfSElPOB1x98N7Shzx/vuPx2/eUuqIBx8+UuSIHz8+//1LcUi8/0CJI/79//+c6NYQTkc8/EhRSADB0y9fKHIEsMn66OMnXHokeXiAhfHppPgMY0N8GYTosGTBKvrz378vv35hiltIS3upKkeoq6qKiQG5JtJSsbo6Sy5fXXP9xutv38iOUOyO+P73D5oIsDYptTIP09JEE7eSlQGiQhOjRdeuTzh5Gtnp9z9Q5ogPPxFmhWpphGlqhmhp4DFFVUy0WUw0SlNj3+PH8y9cOguuhE8/e/7g9RsFURFyHfHjBy8bm5m0VL2tNdYGGfaWvrgYEGWbGE8/ew7YO33x5eu3f/+o0PkZ1ANno44YdcSoI0YdMeqIUUeMOoIBIMAA08dOXi+WGp8AAAAASUVORK5CYII="
            } else {
              m2[i].src =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAA7CAIAAACPNf91AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3xpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyOGQ3MzEzNC0zMjljLWU5NDMtOThmMC0zNGM2ZDZjZTljN2QiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0REMERBMkQ5OTRBMTFFOEI3MTdBQjJGRTJGRDA3NDEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0REMERBMkM5OTRBMTFFOEI3MTdBQjJGRTJGRDA3NDEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRTkxNEU2RTk4OTdFODExODY5NTlDNTYxN0Q0NkZGNCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmUxMTg3MjYyLTk1NTQtMTFlOC05YmY1LWEzNTEyNzg4MDg2OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjxwDIcAAAIySURBVHja7JjpboJAFEaL4m5d464/ff+3Mibu+1a1J5gYWmAcGJA2mS9xIpgwZ+6Oxv1+/4hbiY8/IA2hITREyBCHw2EymcQMsd1uZ7PZfr+PDWK320HAl7CMEQRitVo9nYJigMAM6/X6eTkej2OAmM/n9svT6bRYLN4KsbP06+a7IVwj8Xw+P+L0HRCk5fF4dP1pOp06LRQ+BMcdjUZevzIZqaSJLAQZcbvdxAEb2BiGeLzbbDbJZJIUIBrEECiTydTr9XQ6nc1mlSCw6tnSlyW2Z/V7srQl0xJAhmEUCgURBPX/er2yGUHHyvahN0kgMBI0rMA5gQyyPJSqJymcOxwOfwdmpVLBkW+D6Ha7zpsmn0ajwapYcGScMhgM8vm8Z4rCgUkihej1eq4EP+pEu90ul8sREfT7/WKxKFWsOp2OOJeCCTMLCFwqJm7zW2rEarVaLwPfpWw3m82wOGq1WrVaDdI7CB9cmEgk1Ak4T/AGRrnFLxSWwAScRJJA1EVzuZxiZQyhldPJ6CmBIS6XSwgQAZqnXS/7vhSEYjvFivKzVlSW8OXKqCzhiyMqS/h6guk1WgrCmypCJaaq8lK6XC7VE8T02sY1vCkedLhUKvXot1yWSiUGcaCdxleFcIpzU4bZ0lkZEU2SXGBStKOrQtif9WnJub1dRUsYiVEZHz1e1Fh5E5GZDUyvwKaBYW1OLz9hPKxC21xYIjAlu6Ch/9vWEBpCQ2gIDaEh/jPEtwADADXTJfydYpb9AAAAAElFTkSuQmCC"
            }
          }
        };
        m2[i].onmousedown = function () {
          var opp2 = document.getElementById('color-star2');
          opp2.innerHTML = (this.index + 1).toFixed(2);
        };
      }
    },
    methods: {
      // 图片上传
      add_img() {
        let img1 = event.target.files[0]; // 拿到选取的图片
        let reader = new FileReader(); //新建FileReader对象
        reader.readAsDataURL(img1); //将文件读取为base64的格式，也就是可以当成图片的src
        var uri = '';
        var that = this;
        reader.onloadend = function (e) { //文件上传完成时（不管成功、失败）触发
          uri = e.target.result; //读取的数据保存在result里
          that.imgs.push(uri);
        }
        // 上传部分
        let form = new FormData();
        form.append('image', img1);
        userApplicationImg1(form).then(res => {
          console.log(res.data)
        })
      },
      // 删除图片
      delImg(index) {
        this.imgs.splice(index, 1);
      },
      // 发布
      sureEvaluationc() {
        let params = {
          product_id: this.dataList.product_id,
          order_no: this.dataList.order_no,
          order_detail_id: this.dataList.order_detail_id,
          content: this.content,
        }

        // 调接口的地方
      },
    }
  }

</script>

<style scoped lang="less">
  body {
    overflow-x: hidden
  }

  #header {
    @headerBg: #fff;
    @headerHeight: 50px;
    background: @headerBg;
    height: @headerHeight;

    .mui-pull-left {
      height: @headerHeight;
      line-height: 32px;
      color: #333;
    }

    .mui-title {
      color: #333;
      font-weight: bold;
      height: @headerHeight;
      line-height: @headerHeight;
    }

    .mui-pull-right {
      height: @headerHeight;
      line-height: 50px;
      color: #333;
    }
  }

  .info {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #fff;
  }

  .content {
    width: 100%;
    height: 1.4rem;
    display: flex;
    flex-direction: row;
    margin-top: 50px;
    align-items: center;
    padding-left: .3rem;
    box-sizing: border-box;
    background: #ffffff;
    border-top: 1px solid #d7d7d7;

  }

  .tuxiang {
    width: 1.1rem;
    height: .76rem;
  }

  .content span {
    font-size: .28rem;
    color: #151515;
    font-weight: bold;
    margin-left: .35rem;
  }

  //上传组件
  .upload {
    width: 100%;
    background-color: #fff;

    .upload-title {
      textarea {
        height: 2rem;
        font-size: .28rem;
        color: #999;
        text-align: left;
        padding-top: .25rem;
        border: 0;
      }
    }

    .position-picture {
      width: 100%;
      position: relative;
      text-align: left;
      padding-left: .2rem;

      .btn_box {

        //   添加图片按钮的图片
        .uploadimg {
          margin-right: 0.25rem;
          width: 1.8rem;
          height: 1.8rem;
        }

        //   添加图片按钮的图片
        .uploadimg {
          margin-right: 0.25rem;
          width: 1.8rem;
          height: 1.8rem;
        }
      }

      //   添加图片按钮的图片
      .uploadimg {
        margin-right: 0.25rem;
        width: 1.8rem;
        height: 1.8rem;
      }

      // 上传图片的 input 部分
      #upload_btn {
        width: 1.8rem;
        height: 1.8rem;
        display: block;
        position: absolute;
        top: 0;
        opacity: 0;
      }

      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        width: 100%;
        display: block;

        li {
          float: left;
          margin: .1rem .3rem;
          position: relative;

          #img_delBtn {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
            background: url("../../../assets/images/CouldEnter/user/del1.png");
            background-size: 100% 100%;
            font-size: .32rem;
          }

          img {
            width: 1.8rem;
            height: 1.8rem;
            vertical-align: middle;
          }
        }
      }
    }
  }

  // 分数
  .fraction {
    margin: 1rem 0;
    width: 100%;
    height: 2rem;
    display: flex;
    flex-direction: column;
    background: #ffffff;

    .f-header {
      display: flex;
      flex-direction: row;
      padding-left: .2rem;
      box-sizing: border-box;
      height: .5rem;
      margin-bottom: .3rem;

      span {
        font-size: .28rem;
        color: #333333;
        font-weight: bold;
        margin-left: .25rem;
      }
    }

    .f-img {
      width: .55rem;
      height: .47rem;
    }

  }

  .text-star {
    font-size: .28rem;
    color: #333333;
    padding-left: .3rem;
    box-sizing: border-box;
  }

  .star {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    width: 100%;
    height: .6rem;
    line-height: .6rem;

    ul li {
      float: left;
      width: .44rem;
      height: .6rem;
      list-style: none;
      margin-left: .2rem;
      display: inline-block;
      margin-top: -.3rem;

      img {
        width: .44rem;
        height: .6rem;
      }
    }
  }

  .img-star {
    display: inline-block;
    width: 5rem;
  }

  .color-star {
    font-size: .28rem;
    color: #ff2400;
    font-weight: bold;
    margin-left: .2rem;
  }

</style>
