<!-- 商标转移交换流程 -->
<script setup lang="ts">
</script>

<template>

  <!-- 所需资料 -->
  <div class="container">
    <div class="title">所需资料</div>
    <div class="content">
      <div class="left"><span>个人</span></div>
      <div class="right">
        <div class="right-text">
          <img src="/img/true.png" alt="">
          <span>身份证正反两面复印件</span>
        </div>
        <div class="right-text">
          <img src="/img/true.png" alt="">
          <span>个体户营业执照</span>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="left"><span>企业</span></div>
      <div class="right">
        <div class="right-text">
          <img src="/img/true.png" alt="">
          <span>企业营业执照</span>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="left"><span>过户后</span></div>
      <div class="right">
        <div class="right-text">
          <img src="/img/true.png" alt="">
          <span>核准转让证明</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 转让流程 -->
  <div class="container">
    <div class="title">转让流程</div>
    <div class="flex">
      <div class="flex-left"> <img src="/img/exchange/1.png" alt=""></div>
      <div class="flex-right">
        <h3>挑选中意商标</h3>
        <span>客户确认商标价格和法定状态</span>
      </div>
    </div>
    <div class="flex">
      <div class="flex-left"> <img src="/img/exchange/2.png" alt=""></div>
      <div class="flex-right">
        <h3>支付定金</h3>
        <span>支付定金并签订转让协议书</span>
      </div>
    </div>
    <div class="flex">
      <div class="flex-left"> <img src="/img/exchange/4.png" alt=""></div>
      <div class="flex-right">
        <h3>提交相关资料</h3>
        <span>向国家商标局递送买家资料</span>
      </div>
    </div>
    <div class="flex">
      <div class="flex-left"> <img src="/img/exchange/4.png" alt=""></div>
      <div class="flex-right">
        <h3>过户完成</h3>
        <span>等待国家商标局下发文件</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 10px;
  padding: 10px;
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  color: #2447af;
  font-weight: bold;
  /* overflow: hidden; */

  .title {
    color: #2447af;
    font-weight: bold;
  }

  /* 个人模块 */
  .content {
    margin: 5px 0;
    padding: 20px 0;
    border-radius: var(--border-radius);
    background-image: linear-gradient(135deg, #fbfcff, #f5f8ff);

    display: flex;
    align-items: center;

    .left {
      width: 8rem;
      text-align: center;

      span {
        display: inline-block;
        width: 4.6875rem;
        height: 1.875rem;
        text-align: center;
        line-height: 1.875rem;
        background-image: linear-gradient(90deg, #0051fa, #3e79f9);
        border-radius: .3125rem;
        color: var(--text-white);
        position: relative;

        &::after {
          content: "";
          position: absolute;
          top: 50%;
          right: -1.0667vw;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-color: transparent transparent transparent #3e79f9;
          border-style: solid;
          border-width: .3rem 0 .3rem .3rem;
        }
      }
    }

    .right {
      display: grid;
      gap: .3125rem;

      img {
        width: .75rem;
        margin-right: .3125rem;
      }

      span {
        font-size: var(--font-size-smallmax);
      }
    }
  }

  /* 转让模块 */
  .flex {
    margin: .9375rem 0 0 .9375rem;
    display: flex;
    align-items: center;

    .flex-left {
      img {
        width: 3rem;
      }
    }

    .flex-right {
      margin-left: .9375rem;

      h3 {
        font-size: var(--font-size-normal);
        font-weight: bold;
        color: var(--text-soft);
      }

      span {
        color: var(--text-mute);
        font-size: var(--font-size-small);
      }
    }
  }
}
</style>