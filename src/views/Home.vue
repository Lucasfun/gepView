<template>
  <div id="home">
    <div id="leftNav">
      <div id="mainIcon"></div>
      <nav>
        <ul>
          <li id="inputItem" class="active_li">
            <div id="inputIcon"></div><a>输入参数</a>
          </li>
          <li id="resultItem" @click="toResult">
            <div id="resultIcon"></div><a>查看结果</a>
          </li>
        </ul>
      </nav>
    </div>

    <div id="inputContent">
      <Header></Header>
      <div id="inputs">
        <div class="column">
          <div id="item1" class="inputItem">
            <div id="popIcon"></div>
            <div class="itemName">
              <p>种群数量：</p>
              <span>Population Size</span>
            </div>
            <input class="inputBox" id="popSize">
          </div>

          <div id="item2" class="inputItem">
            <div id="headIcon"></div>
            <div class="itemName">
              <p>基因头部长度：</p>
              <span>Length of Head</span>
            </div>
            <input class="inputBox" id="length">
          </div>

          <div id="item3" class="inputItem">
            <div id="numIcon"></div>
            <div class="itemName">
              <p>染色体基因个数：</p>
              <span>Number of Genes</span>
            </div>
            <input class="inputBox" id="numOfGenes">
          </div>

          <div id="item4" class="inputItem">
            <div id="targetIcon"></div>
            <div class="itemName">
              <p>目标适应度：</p>
              <span>Fitness Goal</span>
            </div>
            <input class="inputBox" id="target">
          </div>

          <div id="item5" class="inputItem">
            <div id="selIcon"></div>
            <div class="itemName">
              <p>选择范围：</p>
              <span>Selection Range</span>
            </div>
            <input class="inputBox" id="selRange">
          </div>

          <div id="item6" class="inputItem">
            <div id="varIcon"></div>
            <div class="itemName">
              <p>直接变异率：</p>
              <span>Direct Mutation Rate</span>
            </div>
            <input class="inputBox" id="dmRate">
          </div>
        </div>

        <div class="column">
          <div id="item7" class="inputItem">
            <div id="sprIcon"></div>
            <div class="itemName">
              <p>单点重组率：</p>
              <span>Single-Point Recombination Rate</span>
            </div>
            <input class="inputBox" id="sprRate">
          </div>

          <div id="item8" class="inputItem">
            <div id="dprIcon"></div>
            <div class="itemName">
              <p>两点重组率：</p>
              <span>Double-Point Recombination Rate</span>
            </div>
            <input class="inputBox" id="dprRate">
          </div>

          <div id="item9" class="inputItem">
            <div id="rIcon"></div>
            <div class="itemName">
              <p>重组率：</p>
              <span>Recombination Rate</span>
            </div>
            <input class="inputBox" id="rRate">
          </div>

          <div id="item10" class="inputItem">
            <div id="itIcon"></div>
            <div class="itemName">
              <p>插入转座率：</p>
              <span>Insertion Transposition Rate</span>
            </div>
            <input class="inputBox" id="itRate">
          </div>

          <div id="item11" class="inputItem">
            <div id="ritIcon"></div>
            <div class="itemName">
              <p>根转座率：</p>
              <span>Root Insertion Transpositon Rate</span>
            </div>
            <input class="inputBox" id="ritRate">
          </div>

          <div id="item12" class="inputItem">
            <div id="gtIcon"></div>
            <div class="itemName">
              <p>转座概率：</p>
              <span>Gene Transposition Rate</span>
            </div>
            <input class="inputBox" id="gtRate">
          </div>
        </div>

        <div class="column">
          <div id="item13" class="inputItem">
            <div id="erIcon"></div>
            <div class="itemName">
              <p>选择精度：</p>
              <span>the Error Limit</span>
            </div>
            <input class="inputBox" id="errorLimit">
          </div>

          <div id="item14" class="inputItem">
            <div id="slideIcon"></div>
            <div class="itemName">
              <p>滑动窗口大小：</p>
              <span>Size of the Sliding Window</span>
            </div>
            <input class="inputBox" id="slideSize">
          </div>

          <div id="item15" class="inputItem">
            <div id="modeIcon"></div>
            <div class="itemName">
              <p>选择预测模式：</p>
              <span>Selecting the Prediction Mode</span>
            </div>
            <div id="options">
              <label><input type="radio" name="option" value="0" @change="radioChange($event)">&nbsp;周期函数</label>
              <label><input type="radio" name="option" value="1" checked @change="radioChange($event)">&nbsp;直接预测</label>
            </div>
          </div>

          <div id="item16">
            <div class="itemName2">
              <div id="dataIcon"></div>
              <div class="textName">
                <p>训练数据：</p>
                <span>Training Dataset</span>
              </div>
              <button id="showChart" @click="showWindow">显示折线图</button>
            </div>
            <textarea id="trainingData" rows="7" cols="40"></textarea>
          </div>

        </div>
      </div>

      <button id="startBtn" @click="forecast">开始预测</button>

    </div>

    <div id="chartWindow">
      <div id="window_top">
        <div id="dataChartIcon"></div>
        <p>训练数据变化趋势折线图</p>
        <div id="cancel" @click="closeWindow"></div>
      </div>
      <div id="dataCounter">
        <p>训练数据个数：</p>
        <span>{{dataCounter}}</span>
      </div>
      <div id="dataChart"></div>
    </div>

    <div id="black_layer"></div>

  </div>
</template>

<script>

  import Header from "../components/Header";
  import $ from 'jquery';
  import axios from 'axios';
  import {Loading} from 'element-ui'

  export default {
    name: 'home',
    components: {Header},
    data(){
      return{
        dataCounter: 50,
        forecastFlag: 1
      }
    },
    mounted(){
      this.presetValue();

    },
    methods:{
      presetValue:function(){
        document.getElementById("popSize").value=100;
        document.getElementById("length").value=7;
        document.getElementById("numOfGenes").value=3;
        document.getElementById("target").value=78300;
        document.getElementById("selRange").value=1000;
        document.getElementById("dmRate").value=0.044;
        document.getElementById("sprRate").value=0.3;
        document.getElementById("dprRate").value=0.3;
        document.getElementById("rRate").value=0.1;
        document.getElementById("itRate").value=0.1;
        document.getElementById("ritRate").value=0.1;
        document.getElementById("gtRate").value=0.1;
        document.getElementById("errorLimit").value=0.7;
        document.getElementById("slideSize").value=10;
        document.getElementById("trainingData").value="101.0, 82.0, 66.0, 35.0, 31.0, 7.0, 20.0, 92.0, 154.0, 125.0, 85.0, 68.0, 38.0, 23.0, 10.0, 24.0, 83.0, 132.0, 131.0, 118.0, 90.0, 67.0, 60.0, 47.0, 41.0, 21.0, 16.0, 6.0, 4.0, 7.0, 14.0, 34.0, 45.0, 43.0, 48.0, 42.0, 28.0, 10.0, 8.0, 2.0, 0.0, 1.0, 5.0, 12.0, 14.0, 35.0, 46.0, 41.0, 30.0, 24.0, 16.0, 7.0, 4.0, 2.0, 8.0, 17.0, 36.0, 50.0, 62.0, 67.0, 71.0, 48.0, 28.0, 8.0, 13.0, 57.0, 122.0, 138.0, 103.0, 86.0, 63.0, 37.0, 24.0, 11.0, 15.0, 40.0, 62.0, 98.0, 124.0, 96.0, 66.0, 64.0, 54.0, 39.0, 21.0, 7.0, 4.0, 23.0, 55.0, 94.0, 96.0, 77.0, 59.0, 44.0, 47.0, 30.0, 16.0, 7.0, 37.0, 74.0";
      },
      radioChange:function(e){
        let val = e.target.value;
        if(val==0){
          document.getElementById("errorLimit").value=0.5;
          document.getElementById("selRange").value=200;
          document.getElementById("target").value=1550;
          this.forecastFlag=0;
          //console.log(this.forecastFlag);
        }
        else{
          document.getElementById("errorLimit").value=0.7;
          document.getElementById("selRange").value=1000;
          document.getElementById("target").value=78300;
          this.forecastFlag=1;
          //console.log(this.forecastFlag);
        }
      },
      /*openFullScreen2() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 120000);
      },*/
      forecast:function(){
        let popSize=document.getElementById("popSize").value;
        let length=document.getElementById("length").value;
        let numOfGenes=document.getElementById("numOfGenes").value;
        let target=document.getElementById("target").value;
        let selRange=document.getElementById("selRange").value;
        let dmRate=document.getElementById("dmRate").value;
        let sprRate=document.getElementById("sprRate").value;
        let dprRate=document.getElementById("dprRate").value;
        let rRate=document.getElementById("rRate").value;
        let itRate=document.getElementById("itRate").value;
        let ritRate=document.getElementById("ritRate").value;
        let gtRate=document.getElementById("gtRate").value;
        let errorLimit=document.getElementById("errorLimit").value;
        let slideSize=document.getElementById("slideSize").value;
        let trainingData=document.getElementById("trainingData").value;

        if(popSize==""||length==""||numOfGenes==""||target==""||selRange==""||trainingData==""
        ||dmRate==""||sprRate==""||dprRate==""||rRate==""||itRate==""||ritRate==""||gtRate==""
        ||errorLimit==""||slideSize==""){
          alert("请填写完整再预测！");
        }
        else{
          localStorage.setItem('popSize',popSize);
          localStorage.setItem('length',length);
          localStorage.setItem('numOfGenes',numOfGenes);
          localStorage.setItem('target',target);
          localStorage.setItem('selRange',selRange);
          localStorage.setItem('dmRate',dmRate);
          localStorage.setItem('sprRate',sprRate);
          localStorage.setItem('dprRate',dprRate);
          localStorage.setItem('rRate',rRate);
          localStorage.setItem('itRate',itRate);
          localStorage.setItem('ritRate',ritRate);
          localStorage.setItem('gtRate',gtRate);
          localStorage.setItem('errorLimit',errorLimit);
          localStorage.setItem('slideSize',slideSize);
          localStorage.setItem('trainingData',trainingData);
          localStorage.setItem('reloadFlag',0);
          localStorage.setItem('forecastFlag',this.forecastFlag);
          this.$router.push('/result');
        }
      },
      showWindow: function () {
        document.getElementById("chartWindow").style.display = 'block';
        document.getElementById("black_layer").style.display = 'block';
        this.drawDataChart();
      },
      closeWindow: function () {
        document.getElementById("chartWindow").style.display = 'none';
        document.getElementById("black_layer").style.display = 'none';
      },
      drawDataChart:function(){
        let xIndex=[];//生成X轴数字们
        const e = document.body.offsetWidth;//屏幕宽度
        //console.log(e);
        let dataArray=document.getElementById('trainingData').value.split(',');
        this.dataCounter=dataArray.length;
        for (let i = 0; i < dataArray.length; i++) {
          xIndex[i]='第'+(i+1)+'组';
        }
        let lineChart=this.$echarts.init(document.getElementById('dataChart'));
        window.addEventListener('resize', function () {
          lineChart.resize()
        });
        let option={
          title: {
            text: '',
          },
          tooltip: {
            trigger: 'axis',
            textStyle:{
              fontSize:e/1082*9
            }
          },
          color: ["#4ECDC4"],
          legend: {
            data: ['训练数据'],
            textStyle:{
              color: '#bbbbbb',
              fontSize: e/1082*9
            }
          },
          xAxis: {
            type: 'category',
            name: 'x',
            nameTextStyle:{
              fontSize: e / 1082 *9
            },
            splitLine: {show: false},
            data: ['一', '二', '三', '四', '五', '六', '七', '八', '九'],
            axisLabel: {
              color: "#eeeeee", //刻度线标签颜色
              fontSize: e / 1082 *9
            },
            axisLine: {
              lineStyle: {
                color: '#eeeeee',
                width: 1  //这里是为了突出显示加上的
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          yAxis: {
            type: 'value',
            name: '数值',
            axisLabel: {
              color: "#eeeeee",//刻度线标签颜色
              fontSize: e/1082*9

            },
            axisLine: {
              lineStyle: {
                color: '#eeeeee',
                width: 1, //这里是为了突出显示加上的
              }
            }
          },
          series: [
            {
              name: '训练数据',
              type: 'line',
              symbolSize: e/1089*7,
              //data: [1,2,3,4,5,2,4,1,5,7,8],
              data:[],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值',color: '#4ECDC4'},
                  {type: 'min', name: '最小值',color: '#4ECDC4'}
                ],
                symbolSize: 30
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值',color: '#4ECDC4'}
                ]
              },
              lineStyle: {
                normal:{
                  color: "#4ECDC4",
                  width: e/800
                }
              }
            }
          ]
        };
        for(let i=0;i<xIndex.length;i++){
          option.xAxis.data[i]=xIndex[i];
          //console.log(xIndex[i]);
        }
        for(let i=0;i<dataArray.length;i++){
          option.series[0].data[i]=dataArray[i];
        }
        lineChart.setOption(option);
      },
      toResult:function () {
        this.$router.push('/result');
      }
    }
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  #home{
    width: 100%;
    height: 100%;
    display: flex;
  }

  #leftNav{
    background: #333333;
    position: fixed;
    width: 12.5%;
    height: 100%;
  }

  #mainIcon{
    width: 5vw;
    height: 5vw;
    margin: 0 auto;
    position: relative;
    top: 3vw;
    border-radius: 100%;
    background-image: url("../../images/mainIcon.png");
    background-repeat: no-repeat;
    background-size: contain;
  }

  nav ul{
    width: 100%;
    margin: 39% auto 0% auto;
    height: 100%;
    background: transparent;
    display: flex;
    flex-direction: column;
    justify-items: center;
    /*justify-content: space-around;*/
  }
  nav li {
    list-style: none;
    margin: 5% 0%;
    display: flex;
    align-items: center;
    transition: all 0.3s ease-out 0s;
  }

  #inputIcon{
    width: 2.3vw;
    height: 2.3vw;
    background-image: url("../../images/inputIcon.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    left: 2.4vw;
    top: 0.15vw;
  }
  #resultIcon{
    width: 2.3vw;
    height: 2.3vw;
    background-image: url("../../images/resultIcon.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    left: 2.4vw;
    top: 0.15vw;
  }
  nav li a{
    display: block;
    width: 100%;
    text-align: center;
    font-size: 1.2vw;
    list-style: none;
    text-decoration: none;
    color: #ffffff;
    padding: 15% 0%;
    transition: all 0.3s ease-out 0s;
  }
  .active_li{
    font-size: 1.3vw;
    display: flex;
    background: #2E9AFE;
  }
  nav li:hover{
    background: #2E9AFE;
    cursor: pointer;
  }

  #inputContent{
    width: 87.5%;
    height: 100%;
    margin-left: 12.5%;
  }

  #inputs{
    width: 100%;
    height: 68%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 2%;
  }

  .column{
    width: 32%;
    height: 100%;
    margin: 1% 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .inputItem{
    width: 100%;
    height: 15%;
    box-shadow: 0 0 0.4vw 0 #777777;
    display: flex;
    justify-content: left;
  }

  .itemName{
    width: 28%;
    height: 80%;
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .itemName p,.itemName2 p,.itemName3 p{
    color: #ffffff;
    font-size: 0.9vw;
  }
  .itemName span,.itemName2 span,.itemName3 span{
    color: #ffffff;
    font-size: 0.7vw;
  }
  .inputBox{
    width: 40%;
    height: 70%;
    align-self: center;
    font-size: 1.5vw;
    background: transparent;
    border: 0.07vw solid transparent;
    border-bottom: 0.07vw solid #ffffff;
    color: #ffffff;
  }

  .itemName2{
    width: 80%;
    height: 30%;
    display: flex;
    justify-content: space-around;
    align-self: center;
  }
  .itemName3{
    width: 50%;
    height: 50%;
    display: flex;
    justify-content: space-around;
    align-self: center;
    margin-left: 5%;
  }
  .textName{
    align-self: center;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40%;
  }
  .textName2{
    align-self: center;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  #options{
    color: #ffffff;
    display: flex;
    justify-content: space-around;
    width: 45%;
  }
  #options label{
    align-self: center;
    font-size: 0.95vw;
  }
  #options input{
    width: 1vw;
    height: 1vw;
  }

  #showChart{
    width: 40%;
    height: 40%;
    align-self: center;
    background: #2E9AFE;
    border: none;
    color: #ffffff;
    font-size: 0.8vw;
    box-shadow: 0 0 0.2vw 0 #777777;
    transition: all 0.3s ease-out 0s;
  }
  #showChart:hover{
    /*border: 0.2vw solid #2E9AFE;
    background: transparent;
    color: #2E9AFE;
    background: #297FCF;*/
    cursor: pointer;
    transform: scale(0.8);
  }

  #item1{
    background: rgba(250,88,88,1);
  }
  #item2{
    background: rgba(250,88,88,0.9);
  }
  #item3{
    background: rgba(250,88,88,0.8);
  }
  #item4{
    background: rgba(50,145,248,1);
  }
  #item5{
    background: rgba(50,145,248,0.9);
  }
  #item6{
    background: rgba(50,145,248,0.8);
  }

  #item7{
    background: rgba(172,88,250,1);
  }
  #item8{
    background: rgba(172,88,250,0.9);
  }
  #item9{
    background: rgba(172,88,250,0.8);
  }
  #item10{
    background: rgba(254,154,46,1);
  }
  #item11{
    background: rgba(254,154,46,0.9);
  }
  #item12{
    background: rgba(254,154,46,0.8);
  }

  #item13{
    background: rgba(78,205,196,1);
  }

  #item14{
    /*width: 100%;
    height: 31.5%;
    box-shadow: 0 0 0.4vw 0 #777777;*/
    background: rgba(78,205,196,0.9);
  }
  #item15{
    /*width: 100%;
    height: 14.5%;
    box-shadow: 0 0 0.4vw 0 #777777;*/
    background: rgba(78,205,196,0.8);
  }
  #item16{
    width: 100%;
    height: 48.5%;
    box-shadow: 0 0 0.4vw 0 #777777;
    background: linear-gradient(rgba(30,192,238,0.8),rgba(30,192,238,0.6));
    /*78,205,196*/
    /*linear-gradient(rgba(78,205,196,1), rgba(30,192,238,0.6))*/
  }

  /*#item1{
    /*background: rgba(250,88,88,1);
  }
  #item2{
    background: rgba(50,145,248,1);
  }
  #item3{
    background:rgba(52, 191, 73, 0.74)
  }
  #item4{
    background: #FE9A2E;
  }
  #item5{
    background: #C465E2;
  }
  #item6{
    background: #4ECDC4;
  }*/

  #popIcon{
    width: 2.7vw;
    height: 2.7vw;
    background-image: url("../../images/popIcon.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    align-self: center;
    margin: 0 3% 0 8%;
  }
  #headIcon{
    width: 3vw;
    height: 3vw;
    background-image: url("../../images/headIcon.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    align-self: center;
    margin: 0 3% 0 8%;
  }
  #numIcon{
    width: 3vw;
    height: 3vw;
    background-image: url("../../images/numIcon.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    align-self: center;
    margin: 0 3% 0 8%;
  }
  #targetIcon{
    width: 3vw;
    height: 3vw;
    background-image: url("../../images/targetIcon.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    align-self: center;
    margin: 0 3% 0 8%;
  }
  #selIcon{
    width: 3vw;
    height: 3vw;
    background-image: url("../../images/selIcon.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    align-self: center;
    margin: 0 3% 0 8%;
  }
  #varIcon{
    width: 3vw;
    height: 3vw;
    background-image: url("../../images/varIcon.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    align-self: center;
    margin: 0 3% 0 8%;
  }
  #sprIcon{
    width: 3vw;
    height: 3vw;
    background-image: url("../../images/sprIcon.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    align-self: center;
    margin: 0 3% 0 8%;
  }
  #dprIcon{
    width: 2.7vw;
    height: 2.7vw;
    background-image: url("../../images/dprIcon.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    align-self: center;
    margin: 0 3% 0 8%;
  }
  #rIcon{
    width: 2.7vw;
    height: 2.7vw;
    background-image: url("../../images/rIcon.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    align-self: center;
    margin: 0 3% 0 8%;
  }
  #itIcon{
    width: 2.7vw;
    height: 2.7vw;
    background-image: url("../../images/itIcon.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    align-self: center;
    margin: 0 3% 0 8%;
  }
  #ritIcon{
    width: 2.7vw;
    height: 2.7vw;
    background-image: url("../../images/ritIcon.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    align-self: center;
    margin: 0 3% 0 8%;
  }
  #gtIcon{
    width: 2.7vw;
    height: 2.7vw;
    background-image: url("../../images/gtIcon.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    align-self: center;
    margin: 0 3% 0 8%;
  }

  #erIcon{
    width: 3vw;
    height: 3vw;
    background-image: url("../../images/erIcon.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    align-self: center;
    margin: 0 3% 0 7%;
  }
  #dataIcon{
    width: 3vw;
    height: 3vw;
    background-image: url("../../images/dataIcon.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    align-self: center;
    margin: 0 5% 0 10%;
  }
  #slideIcon{
    width: 3vw;
    height: 3vw;
    background-image: url("../../images/slideIcon.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    align-self: center;
    margin: 0 3% 0 7%;
  }
  #modeIcon{
    width: 2.5vw;
    height: 2.5vw;
    background-image: url("../../images/modeIcon.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    align-self: center;
    margin: 0 3% 0 8%;
  }

  #trainingData{
    border-radius: 0.5vw;
    background: rgba(0,0,0,0.4);
    color: #ffffff;
    font-size: 1vw;
    margin-left: 9%;
    border-width: 0.07vw;
    padding: 2%;
  }
  #slideWindow{
    border-radius: 0.5vw;
    background: rgba(0,0,0,0.4);
    color: #ffffff;
    font-size: 1vw;
    margin-left: 9%;
    border-width: 0.07vw;
    padding: 2%;
  }

  #chartWindow{
    position: fixed;
    bottom: 20%;
    left: 5%;
    display: none;
    width: 90%;
    height: 60%;
    margin: 0 auto;
    background: #22252A;
    z-index: 1002;
    box-shadow: 0 0 0.5vw 0 #555555;
  }
  #window_top{
    width: 100%;
    height: 8%;
    display: flex;
    justify-content: start;
  }
  #dataChartIcon{
    background-image: url("../../images/dataChartIcon.png");
    background-repeat: no-repeat;
    width: 16px;
    height: 16px;
    align-self: center;
    margin-left: 2%;
  }
  #window_top p{
    display: block;
    color: #bbbbbb;
    font-size: 1vw;
    align-self: center;
    margin-left: 1%;
  }
  #cancel{
    background-image: url("../../images/cancel.png");
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    align-self: center;
    margin-left: 80%;
    transition: all 0.3s ease-out 0s;
  }
  #cancel:hover{
    background-image: url("../../images/cancel2.png");
    cursor: pointer;
  }
  #dataCounter{
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: start;
  }
  #dataCounter p{
    color: #bbbbbb;
    font-size: 1.3vw;
    display: block;
    margin-left: 20%;
    align-self: center;
  }
  #dataCounter span{
    color: #e95f71;
    font-size: 1.3vw;
    display: block;
    margin-left: 2%;
    align-self: center;
  }
  #dataChart{
    width: 100%;
    height: 77%;
    margin-bottom: 5%;
  }
  #black_layer{
    display: none;
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0%;
    background-color: black;
    z-index:1001;
    -moz-opacity: 0.6;
    opacity:.50;
    filter: alpha(opacity=88);
  }

  #startBtn{
    width: 25%;
    height: 3.5vw;
    margin: 1% 37.5%;
    border-radius: 0.65vw;
    border: 0.2vw solid transparent;
    color: #ffffff;
    background: #2E9AFE;
    font-size: 1.1vw;
    transition: all 0.3s ease-out 0s;
  }
  #startBtn:hover{
    border: 0.2vw solid #2E9AFE;
    background: transparent;
    color: #2E9AFE;
    cursor: pointer;
  }

  @media (max-width: 1040px){
    #trainingData{
      margin-left: 7%;
    }
    .itemName2{
      width: 60%;
      height: 35%;
    }
    .textName{
      height: 60%;
    }
  }
  @media (max-width: 859px){
    #trainingData{
      margin-left: 3%;
    }
    #slideWindow{
      margin-left: 1%;
    }
  }
  @media (max-width: 800px){
    #trainingData{
      margin-left: 1%;
    }
  }
  @media (max-width: 767px){
    #inputs{
      width: 100%;
      height: 180%;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      margin-bottom: 2%;
    }

    #inputIcon{
      position: relative;
      left: 1vw;
      top: 0.15vw;
    }
    #resultIcon{
      position: relative;
      left: 1vw;
      top: 0.15vw;
    }

    .column{
      width: 100%;
      height: 33%;
      margin: 1%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .inputItem{
      width: 100%;
      height: 15%;
      box-shadow: 0 0 0.4vw 0 #777777;
      display: flex;
      justify-content: left;
    }

    .itemName{
      width: 40%;
      height: 80%;
      align-self: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .itemName p,.itemName2 p,.itemName3 p{
      color: #ffffff;
      font-size: 1.7vw;
    }
    .itemName span,.itemName2 span,.itemName3 span{
      color: #ffffff;
      font-size: 1.3vw;
    }
    .inputBox{
      width: 40%;
      height: 70%;
      align-self: center;
      font-size: 1.5vw;
      background: transparent;
      border: 0.07vw solid transparent;
      border-bottom: 0.07vw solid #ffffff;
      color: #ffffff;
    }

    .itemName2{
      width: 60%;
      height: 30%;
      display: flex;
      justify-content: center;
      align-self: center;
    }
    .textName{
      align-self: center;
      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    #trainingData{
      margin: 2% 0 0 30%;
    }
    #slideWindow{
      margin: 0 0 0 30%;
    }

    #popIcon{
      width: 2.7vw;
      height: 2.7vw;
      margin: 0 3% 0 8%;
    }
    #headIcon{
      width: 3vw;
      height: 3vw;
      margin: 0 3% 0 8%;
    }
    #numIcon{
      width: 3vw;
      height: 3vw;
      margin: 0 3% 0 8%;
    }
    #targetIcon{
      width: 3vw;
      height: 3vw;
      margin: 0 3% 0 8%;
    }
    #selIcon{
      width: 3vw;
      height: 3vw;
      margin: 0 3% 0 8%;
    }
    #varIcon{
      width: 3vw;
      height: 3vw;
      margin: 0 3% 0 8%;
    }
    #sprIcon{
      width: 3vw;
      height: 3vw;
      margin: 0 3% 0 8%;
    }
    #dprIcon{
      width: 2.7vw;
      height: 2.7vw;
      margin: 0 3% 0 8%;
    }
    #rIcon{
      width: 2.7vw;
      height: 2.7vw;
      margin: 0 3% 0 8%;
    }
    #itIcon{
      width: 2.7vw;
      height: 2.7vw;
      margin: 0 3% 0 8%;
    }
    #ritIcon{
      width: 2.7vw;
      height: 2.7vw;
      margin: 0 3% 0 8%;
    }
    #gtIcon{
      width: 2.7vw;
      height: 2.7vw;
      margin: 0 3% 0 8%;
    }

    #dataIcon{
      width: 3vw;
      height: 3vw;
      margin: 0 5% 0 10%;
    }
    #slideIcon{
      width: 4vw;
      height: 4vw;
      margin: 0 5% 0 5%;
    }
    #startBtn{
      width: 35%;
      height: 4.5vw;
      margin: 1% 32.5%;
      font-size: 2vw;
    }

  }
  @media (max-width: 500px){
    #inputIcon{
      position: relative;
      left: 0.3vw;
      top: 0.15vw;
      display: none;
    }
    #resultIcon{
      position: relative;
      left: 0.3vw;
      top: 0.15vw;
      display: none;
    }
    #trainingData{
      margin: 2% 0 0 20%;
    }
    #slideWindow{
      margin: 0 0 0 20%;
    }

    .itemName p,.itemName2 p,.itemName3 p{
      color: #ffffff;
      font-size: 2.7vw;
    }
    .itemName span,.itemName2 span,.itemName3 span{
      color: #ffffff;
      font-size: 2.7vw;
    }
    #popIcon{
      width: 5vw;
      height: 5vw;
      margin: 0 3% 0 8%;
    }
    #headIcon{
      width: 5vw;
      height: 5vw;
      margin: 0 3% 0 8%;
    }
    #numIcon{
      width: 3vw;
      height: 3vw;
      margin: 0 3% 0 8%;
    }
    #targetIcon{
      width: 5vw;
      height: 5vw;
      margin: 0 3% 0 8%;
    }
    #selIcon{
      width: 3vw;
      height: 3vw;
      margin: 0 3% 0 8%;
    }
    #varIcon{
      width: 5vw;
      height: 5vw;
      margin: 0 3% 0 8%;
    }
    #sprIcon{
      width: 5vw;
      height: 5vw;
      margin: 0 3% 0 8%;
    }
    #dprIcon{
      width: 4.7vw;
      height: 4.7vw;
      margin: 0 3% 0 8%;
    }
    #rIcon{
      width: 4.7vw;
      height: 4.7vw;
      margin: 0 3% 0 8%;
    }
    #itIcon{
      width: 4.7vw;
      height: 4.7vw;
      margin: 0 3% 0 8%;
    }
    #ritIcon{
      width: 4.7vw;
      height: 4.7vw;
      margin: 0 3% 0 8%;
    }
    #gtIcon{
      width: 4.7vw;
      height: 4.7vw;
      margin: 0 3% 0 8%;
    }

    #dataIcon{
      width: 5vw;
      height: 5vw;
      margin: 0 5% 0 10%;
    }
    #slideIcon{
      width: 6vw;
      height: 6vw;
      margin: 0 5% 0 5%;
    }
    #startBtn{
      width: 35%;
      height: 5.5vw;
      margin: 1% 32.5%;
      font-size: 2.5vw;
    }
  }
  @media (max-width: 400px){
    #inputIcon{
      position: relative;
      left: 0vw;
      top: 0.15vw;
      display: none;
    }
    #resultIcon{
      position: relative;
      left: 0vw;
      top: 0.15vw;
      display: none;
    }
    nav li a{
      font-size: 0.5vw;
    }
    .itemName2{
      width: 90%;
    }
    #startBtn{
      width: 35%;
      height: 5vw;
      margin: 1% 32.5%;
      font-size: 2.7vw;
    }
  }
  @media (max-width: 350px){
    #trainingData{
      margin: 2% 0 0 10%;
    }
    #slideWindow{
      margin: 0 0 0 10%;
    }
  }



</style>
