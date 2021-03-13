<template>
  <div id="header">
    <div id="green_layer">
      <div id="brand_name">
        <div id="brand_text">
          <p>基于分段优化GEP的双模式预测平台</p>
          <span>Platform of Dual-mode Prediction Based on Piecewise Optimized GEP</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    methods:{

    }
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  #header{
    width: 100%;
    height: 15%;
    font-size: 62.5%;
  }
  #green_layer{
    /*background-color: rgba(34,34,34,0.8);*/
    background: #212529;
    width: 100%;
    height: 100%;
    display: flex;
  }

  #brand_name{
    width: 50%;
    height: 100%;
    display: flex;
    position: relative;
    left: 8%;
  }
  #brand_text{
    display: flex;
    flex-direction: column;
    align-self: center;
  }
  #brand_name p{
    color: #ffffff;
    font-size: 1.7vw;
    margin: 0 auto;
    font-family: "微软雅黑 Light";
    font-weight: 500;
  }
  #brand_name span{
    color: #ffffff;
    font-size: 0.8vw;
    margin: 0 auto;
  }

  @media (max-width: 767px){
    #header{
      height: 12.5%;
    }
    #brand_name{
      width: 70%;
      height: 100%;
      display: flex;
      position: relative;
      left: 8%;
    }
    #brand_text p{
      color: #ffffff;
      font-size: 2.3vw;
      margin: 0 auto;
      font-family: "微软雅黑 Light";
      font-weight: 500;
    }
    #brand_name span{
      color: #ffffff;
      font-size: 1vw;
      margin: 0 auto;
    }

  }

  @media (max-width: 500px){
    #header{
      height: 12.5%;
    }
    #brand_name{
      width: 90%;
      height: 100%;
      display: flex;
      position: relative;
      left: 8%;
    }
    #brand_text p{
      color: #ffffff;
      font-size: 3vw;
      margin: 0 auto;
      font-family: "微软雅黑 Light";
      font-weight: 500;
    }
    #brand_name span{
      color: #ffffff;
      font-size: 1.2vw;
      margin: 0 auto;
    }

  }

</style>
