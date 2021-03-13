<template>
  <div id="result">
    <div id="leftNav">
      <div id="mainIcon"></div>
      <nav>
        <ul>
          <li id="inputItem" @click="toHome">
            <div id="inputIcon"></div>
            <a>输入参数</a>
          </li>
          <li id="resultItem" class="active_li">
            <div id="resultIcon"></div>
            <a>查看结果</a>
          </li>
        </ul>
      </nav>
    </div>

    <div id="resultContent">
      <Header></Header>
      <div id="row1">
        <div id="item1">
          <div class="itemTitle">
            <div id="generaIcon"></div>
            <div class="textTitle">
              <p>最优代数</p>
              <span>Optimal Generation</span>
            </div>
          </div>
          <div id="generation">{{ generation }}</div>
        </div>

        <div id="item2">
          <div class="itemTitle">
            <div id="fitIcon"></div>
            <div class="textTitle">
              <p>最佳适应度</p>
              <span>Optimal Fitness</span>
            </div>
          </div>
          <div id="fitness">{{ fitness }}</div>
        </div>

        <div id="item3">
          <div class="itemTitle">
            <div id="geneIcon"></div>
            <div class="textTitle">
              <p>最佳染色体</p>
              <span>Optimal chromosome</span>
            </div>
          </div>
          <div id="chromosome" v-if="geneIsShow">{{ gene }}</div>
          <div id="chromosome2" v-else>{{ gene }}</div>
        </div>
      </div>

      <div id="row2">
        <div class="chartTitle">
          <div id="barIcon"></div>
          <p>真实值预测值对比图</p>
        </div>
        <div id="truth_forecast"></div>
      </div>

      <div id="row3">
        <div class="chartTitle">
          <div id="lineIcon"></div>
          <p>预测误差值统计图</p>
        </div>
        <div id="precisions"></div>
      </div>
    </div>

  </div>
</template>

<script>

import Header from "../components/Header";
import axios from 'axios';
import {Loading} from 'element-ui'

export default {
  name: 'Result',
  components: {Header},
  data() {
    return {
      generation: '',
      fitness: '',
      gene: "",
      //geneArray:[],
      truths: [],
      forecasts: [],
      precisions: [],
      geneIsShow: true
    }
  },
  mounted() {
    this.showResults();
    /*this.drawBarChart();
    this.drawLineChart();*/
  },
  methods: {
    toHome: function () {
      this.$router.push('/');
    },
    drawBarChart: function () {
      let xIndex = [];//生成X轴数字们
      const e = document.body.offsetWidth;//屏幕宽度
      for (let i = 0; i < this.truths.length; i++) {
        xIndex[i] = '第' + (i + 1) + '组';
      }
      let barChart = this.$echarts.init(document.getElementById('truth_forecast'));
      window.addEventListener('resize', function () {
        barChart.resize()
      });
      let option1 = {
        title: {
          text: '',
        },
        tooltip: {
          trigger: 'axis',
          textStyle: {
            fontSize: e / 1082 * 9
          },
        },
        color: ["#e95f71", "#864DD9"],
        legend: {
          data: ['真实值', '预测值'],
          textStyle: {
            color: '#bbbbbb',
            fontSize: e / 1082 * 9
          }
        },
        xAxis: {
          type: 'category',
          name: 'x',
          nameTextStyle: {
            fontSize: e / 1082 * 9
          },
          splitLine: {show: false},
          data: ['一', '二', '三', '四', '五', '六', '七', '八', '九'],
          axisLabel: {
            color: "#dddddd", //刻度线标签颜色
            fontSize: e / 1082 * 9
          },
          axisLine: {
            lineStyle: {
              color: '#dddddd',
              width: 1, //这里是为了突出显示加上的
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
            color: "#dddddd", //刻度线标签颜色
            fontSize: e / 1082 * 9
          },
          axisLine: {
            lineStyle: {
              color: '#dddddd',
              width: 1, //这里是为了突出显示加上的
            }
          }
        },
        series: [
          {
            name: '真实值',
            type: 'line',
            symbolSize: e / 1089 * 7,
            data: [],
            lineStyle: {
              normal: {
                color: "#e95f71",
                width: e / 800
              }
            },
            symbol: 'triangle'
          },
          {
            name: '预测值',
            type: 'line',
            symbolSize: e / 1089 * 7,
            data: [],
            lineStyle: {
              normal: {
                color: "#864DD9",
                width: e / 800
              }
            }
          },
        ]
      };

      for (let i = 0; i < xIndex.length; i++) {
        option1.xAxis.data[i] = xIndex[i];
        //console.log(xIndex[i]);
      }
      for (let i = 0; i < this.truths.length; i++) {
        option1.series[0].data[i] = this.truths[i];
      }
      //console.log("echarts this.truths: "+this.truths);
      for (let i = 0; i < this.forecasts.length; i++) {
        option1.series[1].data[i] = this.forecasts[i];
      }
      barChart.setOption(option1);
    },

    drawLineChart: function () {
      let xIndex = [];//生成X轴数字们
      const e = document.body.offsetWidth;//屏幕宽度
      //console.log(e);
      for (let i = 0; i < this.precisions.length; i++) {
        xIndex[i] = '第' + (i + 1) + '组';
      }
      let lineChart = this.$echarts.init(document.getElementById('precisions'));
      window.addEventListener('resize', function () {
        lineChart.resize()
      });
      let option2 = {
        title: {
          text: '',
        },
        tooltip: {
          trigger: 'axis',
          textStyle: {
            fontSize: e / 1082 * 9
          },
          formatter: function (params) {
            //console.log(params);
            let relVal = params[0].name;
            for (let i = 0; i < params.length; i++) {
              relVal += '<div class="circle" ><span style="background:' + params[i].color + '"></span>' + params[i].seriesName + ' : ' + params[i].value + "%</div>";
            }
            return relVal;
          }
        },
        color: ["#4ECDC4"],
        legend: {
          data: ['误差值'],
          textStyle: {
            color: '#bbbbbb',
            fontSize: e / 1082 * 9
          }
        },
        xAxis: {
          type: 'category',
          name: 'x',
          nameTextStyle: {
            fontSize: e / 1082 * 9
          },
          splitLine: {show: false},
          data: ['一', '二', '三', '四', '五', '六', '七', '八', '九'],
          axisLabel: {
            color: "#eeeeee", //刻度线标签颜色
            fontSize: e / 1082 * 9
          },
          axisLine: {
            lineStyle: {
              color: '#eeeeee',
              width: 1, //这里是为了突出显示加上的
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
          name: '精度',
          axisLabel: {
            color: "#eeeeee",//刻度线标签颜色
            fontSize: e / 1082 * 9,
            formatter: '{value}%'
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
            name: '误差值',
            type: 'line',
            symbolSize: e / 1089 * 7,
            //data: [1,2,3,4,5,2,4,1,5,7,8],
            data: [],
            markPoint: {
              data: [
                {type: 'max', name: '最大值', color: '#4ECDC4'},
                {type: 'min', name: '最小值', color: '#4ECDC4'}
              ],
              symbolSize: 30
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值', color: '#4ECDC4'}
              ]
            },
            lineStyle: {
              normal: {
                color: "#4ECDC4",
                width: e / 800
              }
            }
          }
        ]
      };
      for (let i = 0; i < xIndex.length; i++) {
        option2.xAxis.data[i] = xIndex[i];
        //console.log(xIndex[i]);
      }
      //precisions是误差值！！！
      for (let i = 0; i < this.precisions.length; i++) {
        if (isFinite(this.precisions[i]) == false) {
          this.precisions[i] = 1;
        }
        this.precisions[i] = Math.abs(this.precisions[i]);
        if (this.precisions[i] > 1) {
          this.precisions[i] = 1;
        }
        this.precisions[i] = this.precisions[i] * 100;
        this.precisions[i] = this.precisions[i].toFixed(3);
        option2.series[0].data[i] = this.precisions[i];
      }
      lineChart.setOption(option2);

    },
    showResults: function () {
      let forecastFlag = localStorage.getItem('forecastFlag');
      if (forecastFlag == 1) {
        console.log(forecastFlag);
        this.geneIsShow = true;
        this.showResults1();
      } else {
        console.log(forecastFlag);
        this.geneIsShow = false;
        this.showResults0();
      }
      /*let param={
        "maxFitness": localStorage.getItem('target'),
        "populationsSize": localStorage.getItem('popSize'),
        "headLength": localStorage.getItem('length'),
        "numOfGenes": localStorage.getItem('numOfGenes'),
        "selectRang": localStorage.getItem('selRange'),
        "errorLimit": localStorage.getItem('errorLimit'),
        "cycle": localStorage.getItem('slideSize'),
        "DcMutationRate": localStorage.getItem('dmRate'),
        "onePointRecombinationRate": localStorage.getItem('sprRate'),
        "twoPointRecombinationRate": localStorage.getItem('dprRate'),
        "recombinationRate": localStorage.getItem('rRate'),
        "ISTranspositionRate": localStorage.getItem('itRate'),
        "RISTranspositionRate": localStorage.getItem('ritRate'),
        "GeneTranspositionRate": localStorage.getItem('gtRate'),
        "Data": localStorage.getItem('trainingData')
      }
      console.log(forecastFlag);
      console.log(param);*/
    },

    //直接预测
    showResults1: function () {
      if (localStorage.getItem('reloadFlag') == 0) {
        let loading;

        function startLoading() {    //使用Element loading-start 方法
          loading = Loading.service({
            lock: true,
            text: '正在预测中，请您耐心等待...',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }

        function endLoading() {    //使用Element loading-close 方法
          loading.close()
        }

        let postAxios = axios.create({
          //http://47.102.223.107:8080/GepOnline2
          baseURL: 'http://127.0.0.1:8081/api',
          //timeout: 120000,
          url: '/startNonCycle',
          methods: 'post'
        });
        postAxios.interceptors.request.use(config => {
          startLoading();
          return config;
        }, err => {
          return Promise.reject(err);
        });
        postAxios.interceptors.response.use(res => {
          endLoading();
          return res;
        }, err => {
          return Promise.reject((err))
        });
        //http://47.102.223.107:8080/GepOnline/gep/start
        //http://47.102.223.107:8080/GepOnline2/gep/startNonCycle
        postAxios.post('http://127.0.0.1:8081/api/startNonCycle', null, {
          params: {
            "maxFitness": localStorage.getItem('target'),
            "populationsSize": localStorage.getItem('popSize'),
            "headLength": localStorage.getItem('length'),
            "numOfGenes": localStorage.getItem('numOfGenes'),
            "selectRang": localStorage.getItem('selRange'),
            "errorLimit": localStorage.getItem('errorLimit'),
            "cycle": localStorage.getItem('slideSize'),
            "DcMutationRate": localStorage.getItem('dmRate'),
            "onePointRecombinationRate": localStorage.getItem('sprRate'),
            "twoPointRecombinationRate": localStorage.getItem('dprRate'),
            "recombinationRate": localStorage.getItem('rRate'),
            "ISTranspositionRate": localStorage.getItem('itRate'),
            "RISTranspositionRate": localStorage.getItem('ritRate'),
            "GeneTranspositionRate": localStorage.getItem('gtRate'),
            "Data": localStorage.getItem('trainingData')
          }
        }).then(res => {
          console.log(res.data);
          if (localStorage.getItem('target') > res.data.fitness) {
            alert("您输入的目标适应度太大，服务器顶不住啊！");
          }
          this.generation = res.data.generation;
          this.fitness = res.data.fitness;
          this.gene = res.data.gene;
          this.truths = this.truths.concat(res.data.truths);
          this.forecasts = this.forecasts.concat(res.data.forecasts);
          this.precisions = this.precisions.concat(res.data.precisions);
          this.drawBarChart();
          this.drawLineChart();
          /*555
          document.cookie="generation="+res.data.generation;
          document.cookie="fitness="+res.data.fitness;
          document.cookie="gene="+res.data.gene;
          document.cookie="truthString="+JSON.stringify(res.data.truths);
          document.cookie="foreString="+JSON.stringify(res.data.forecasts);
          document.cookie="preciString="+JSON.stringify(res.data.precisions);
          555*/

          let foreString = JSON.stringify(res.data.forecasts);
          let truthString = JSON.stringify(res.data.truths);
          let preciString = JSON.stringify(res.data.precisions);
          //console.log(foreString);
          localStorage.setItem('foreString', foreString);
          localStorage.setItem('truthString', truthString);
          localStorage.setItem('preciString', preciString);
          localStorage.setItem('generation', res.data.generation);
          localStorage.setItem('gene', res.data.gene);
          localStorage.setItem('fitness', res.data.fitness);
          localStorage.setItem('reloadFlag', 1);

        }).catch(err => {
          console.log(err);
        });

      } else {
        /*this.generation=this.getCookie("generation");
        this.fitness=this.getCookie("fitness");
        this.gene=this.getCookie("gene");
        this.truths=this.truths.concat(JSON.parse(this.getCookie("truthString")));
        this.forecasts=this.forecasts.concat(JSON.parse(this.getCookie("foreString")));
        this.precisions=this.precisions.concat(JSON.parse(this.getCookie("preciString")));*/
        this.generation = localStorage.getItem('generation');
        this.gene = localStorage.getItem('gene');
        this.fitness = localStorage.getItem('fitness');
        this.truths = JSON.parse(localStorage.getItem("truthString"));
        this.forecasts = JSON.parse(localStorage.getItem("foreString"));
        this.precisions = JSON.parse(localStorage.getItem("preciString"));
        this.drawBarChart();
        this.drawLineChart();
        localStorage.setItem('reloadFlag', 1);
      }

    },

    //周期预测
    showResults0: function () {
      if (localStorage.getItem('reloadFlag') == 0) {
        let loading;

        function startLoading() {    //使用Element loading-start 方法
          loading = Loading.service({
            lock: true,
            text: '正在预测中，请您耐心等待...',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }

        function endLoading() {    //使用Element loading-close 方法
          loading.close()
        }

        let postAxios = axios.create({
          //http://47.102.223.107:8080/GepOnline2
          baseURL: 'http://127.0.0.1:8081/api',
          //timeout: 120000,
          url: '/startCycle',
          methods: 'post'
        });
        postAxios.interceptors.request.use(config => {
          startLoading();
          return config;
        }, err => {
          return Promise.reject(err);
        });
        postAxios.interceptors.response.use(res => {
          endLoading();
          return res;
        }, err => {
          return Promise.reject((err))
        });
        //http://47.102.223.107:8080/GepOnline/gep/start
        //http://47.102.223.107:8080/GepOnline2/gep/startCycle
        postAxios.post('http://127.0.0.1:8081/api/startCycle', null, {
          params: {
            "maxFitness": localStorage.getItem('target'),
            "populationsSize": localStorage.getItem('popSize'),
            "headLength": localStorage.getItem('length'),
            "numOfGenes": localStorage.getItem('numOfGenes'),
            "selectRang": localStorage.getItem('selRange'),
            "errorLimit": localStorage.getItem('errorLimit'),
            "cycle": localStorage.getItem('slideSize'),
            "DcMutationRate": localStorage.getItem('dmRate'),
            "onePointRecombinationRate": localStorage.getItem('sprRate'),
            "twoPointRecombinationRate": localStorage.getItem('dprRate'),
            "recombinationRate": localStorage.getItem('rRate'),
            "ISTranspositionRate": localStorage.getItem('itRate'),
            "RISTranspositionRate": localStorage.getItem('ritRate'),
            "GeneTranspositionRate": localStorage.getItem('gtRate'),
            "Data": localStorage.getItem('trainingData')
          }
        }).then(res => {
          console.log(res.data);
          if (localStorage.getItem('target') > res.data.fitness) {
            alert("您输入的目标适应度太大，服务器顶不住啊！");
          }
          this.generation = res.data.generation;
          this.fitness = res.data.fitness;
          //this.gene=res.data.gene;
          for (let i = 0; i < res.data.gene.length; i++) {
            this.gene = this.gene + '\xa0\xa0\xa0\xa0' + res.data.gene[i];
          }
          this.truths = this.truths.concat(res.data.truths);
          this.forecasts = this.forecasts.concat(res.data.forecasts);
          this.precisions = this.precisions.concat(res.data.precisions);
          this.drawBarChart();
          this.drawLineChart();

          /*555
          document.cookie="generation="+res.data.generation;
          document.cookie="fitness="+res.data.fitness;
          document.cookie="gene="+res.data.gene;
          document.cookie="truthString="+JSON.stringify(res.data.truths);
          document.cookie="foreString="+JSON.stringify(res.data.forecasts);
          document.cookie="preciString="+JSON.stringify(res.data.precisions);

         555*/

          let foreString = JSON.stringify(res.data.forecasts);
          let truthString = JSON.stringify(res.data.truths);
          let preciString = JSON.stringify(res.data.precisions);
          let geneArray = JSON.stringify(res.data.gene);
          //console.log(foreString);
          localStorage.setItem('foreString', foreString);
          localStorage.setItem('truthString', truthString);
          localStorage.setItem('preciString', preciString);
          localStorage.setItem('generation', res.data.generation);
          localStorage.setItem('gene', geneArray);
          localStorage.setItem('fitness', res.data.fitness);
          localStorage.setItem('reloadFlag', 1);

        }).catch(err => {
          console.log(err);
        });

      } else {
        /*this.generation=this.getCookie("generation");
        this.fitness=this.getCookie("fitness");
        this.gene=this.getCookie("gene");
        this.truths=this.truths.concat(JSON.parse(this.getCookie("truthString")));
        this.forecasts=this.forecasts.concat(JSON.parse(this.getCookie("foreString")));
        this.precisions=this.precisions.concat(JSON.parse(this.getCookie("preciString")));*/
        let geneArray = JSON.parse(localStorage.getItem('gene'));
        this.generation = "";
        for (let i = 0; i < geneArray.length; i++) {
          this.gene = this.gene + '\xa0\xa0\xa0\xa0' + geneArray[i];
        }
        //this.gene=JSON.parse(localStorage.getItem('gene'));
        this.fitness = localStorage.getItem('fitness');
        this.truths = JSON.parse(localStorage.getItem("truthString"));
        this.forecasts = JSON.parse(localStorage.getItem("foreString"));
        this.precisions = JSON.parse(localStorage.getItem("preciString"));
        this.drawBarChart();
        this.drawLineChart();
        localStorage.setItem('reloadFlag', 1);
      }

    },

    getCookie: function (key) {
      let res = document.cookie.split(';');
      for (let i = 0; i < res.length; i++) {
        let temp = res[i].split('=');
        if (temp[0].trim() === key) {
          return temp[1];
        }
      }
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

#result {
  width: 100%;
  height: 100%;
  display: flex;
}

#leftNav {
  background: #333333;
  position: fixed;
  width: 12.5%;
  height: 100%;
}

#mainIcon {
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

nav ul {
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

#inputIcon {
  width: 2.3vw;
  height: 2.3vw;
  background-image: url("../../images/inputIcon.png");
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  left: 2.4vw;
  top: 0.15vw;
}

#resultIcon {
  width: 2.3vw;
  height: 2.3vw;
  background-image: url("../../images/resultIcon.png");
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  left: 2.4vw;
  top: 0.15vw;
}

nav li a {
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

.active_li {
  font-size: 1.3vw;
  display: flex;
  background: #2E9AFE;
}

nav li:hover {
  background: #2E9AFE;
  cursor: pointer;
}

#resultContent {
  width: 87.5%;
  height: 100%;
  margin-left: 12.5%;
  background: #191C22;
}

#row1 {
  width: 98%;
  margin: 1% auto;
  height: 8%;
  display: flex;
  justify-content: space-between;
}

#item1 {
  width: 20%;
  height: 100%;
  background: #22252A;
  display: flex;
  justify-content: space-around;
}

.itemTitle {
  color: #bbbbbb;
  align-self: center;
  display: flex;
}

.textTitle p {
  font-size: 0.9vw;
  font-weight: bold;
  display: block;
  height: 1vw;
  line-height: 1vw;
  margin-bottom: 0.3vw;
}

.textTitle span {
  font-size: 0.5vw;
  display: block;
  height: 0.7vw;
  line-height: 0.7vw;
}

#item2 {
  width: 30%;
  height: 100%;
  background: #22252A;
  display: flex;
  justify-content: space-around;
}

#item3 {
  width: 48%;
  height: 100%;
  background: #22252A;
  display: flex;
  justify-content: space-around;
}

#generaIcon {
  width: 2vw;
  height: 2vw;
  background-image: url("../../images/generationIcon.png");
  background-repeat: no-repeat;
  background-size: contain;
  align-self: center;
  margin-right: 1vw;
}

#fitIcon {
  width: 2vw;
  height: 2vw;
  background-image: url("../../images/fitIcon.png");
  background-repeat: no-repeat;
  background-size: contain;
  align-self: center;
  margin-right: 1vw;
}

#geneIcon {
  width: 2vw;
  height: 2vw;
  background-image: url("../../images/geneIcon.png");
  background-repeat: no-repeat;
  background-size: contain;
  align-self: center;
  margin-right: 1vw;
}

#generation {
  align-self: center;
  font-size: 1.5vw;
  color: #864DD9;
}

#fitness {
  align-self: center;
  color: #e95f71;
  font-size: 1.3vw;
}

#chromosome {
  align-self: center;
  color: #2E9AFE;
  font-size: 1.1vw;
}

#chromosome2 {
  align-self: center;
  color: #2E9AFE;
  font-size: 0.6vw;
}

#row2 {
  width: 98%;
  margin: 1% auto;
  height: 31%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: #22252A;
}

.chartTitle {
  width: 100%;
  height: 13%;
  /*border-top-left-radius: 0.4vw;
  border-top-right-radius: 0.4vw;*/
  display: flex;
}

#barIcon {
  width: 1vw;
  height: 1vw;
  background-image: url("../../images/barIcon.png");
  background-repeat: no-repeat;
  background-size: contain;
  align-self: center;
  margin: 0 0.8vw;
}

.chartTitle p {
  align-self: center;
  color: #bbbbbb;
  font-size: 1vw;
  font-weight: bold;
}

#row3 {
  width: 98%;
  margin: 1% auto;
  height: 38%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: #22252A;
}

#lineIcon {
  width: 1.3vw;
  height: 1.3vw;
  background-image: url("../../images/lineIcon.png");
  background-repeat: no-repeat;
  background-size: contain;
  align-self: center;
  margin: 0 0.8vw;
}

#truth_forecast {
  width: 98%;
  margin: 0 auto;
  height: 85%;
}

#precisions {
  width: 98%;
  margin: 0 auto;
  height: 85%;
}

@media (max-width: 767px) {
  #result {
    height: 150%;
    background: #191C22;
  }

  #resultContent {
    height: 100%;
    background: #191C22;
    width: 87.5%;
  }

  #inputIcon {
    position: relative;
    left: 1vw;
    top: 0.15vw;
  }

  #resultIcon {
    position: relative;
    left: 1vw;
    top: 0.15vw;
  }

  #row1 {
    flex-direction: column;
    height: 25%;
    display: flex;
    justify-content: space-between;
  }

  #item1 {
    width: 98%;
    margin: 0 auto;
    height: 32%;
    justify-content: space-between;
  }

  #item2 {
    width: 98%;
    margin: 0 auto;
    height: 32%;
    justify-content: space-between;
  }

  #item3 {
    width: 98%;
    margin: 0 auto;
    height: 32%;
    justify-content: space-between;
  }

  .itemTitle {
    margin-left: 2vw;
  }

  .textTitle p {
    font-size: 1.7vw;
    margin-bottom: 0.9vw;
  }

  .textTitle span {
    font-size: 1.15vw;
  }

  #generation {
    font-size: 3vw;
    margin-right: 4vw;
  }

  #fitness {
    font-size: 2.5vw;
    margin-right: 4vw;
  }

  #chromosome {
    font-size: 1.5vw;
    margin-right: 4vw;
  }

  #row2 {
    height: 30%;
  }

  #row3 {
    height: 30%;
  }
}

@media (max-width: 500px) {
  #result {
    height: 150%;
    background: #191C22;
  }

  #resultContent {
    height: 100%;
    background: #191C22;
    width: 87.5%;
  }

  #inputIcon {
    position: relative;
    left: 0.3vw;
    top: 0.15vw;
    display: none;
  }

  #resultIcon {
    position: relative;
    left: 0.3vw;
    top: 0.15vw;
    display: none;
  }

  #row1 {
    flex-direction: column;
    height: 25%;
    display: flex;
    justify-content: space-between;
  }

  #item1 {
    width: 98%;
    margin: 0 auto;
    height: 32%;
    justify-content: space-between;
  }

  #item2 {
    width: 98%;
    margin: 0 auto;
    height: 32%;
    justify-content: space-between;
  }

  #item3 {
    width: 98%;
    margin: 0 auto;
    height: 32%;
    justify-content: space-between;
  }

  #generaIcon {
    width: 4vw;
    height: 4vw;
  }

  #geneIcon {
    width: 4vw;
    height: 4vw;
  }

  #fitIcon {
    width: 4vw;
    height: 4vw;
  }

  .itemTitle {
    margin-left: 2%;
    width: 28%;
  }

  .textTitle {
    display: flex;
  }

  .textTitle p {
    font-size: 2.5vw;
    margin-bottom: 0.9vw;
    display: block;
    align-self: center;
  }

  .textTitle span {
    display: none;
  }

  #generation {
    font-size: 2vw;
    margin-right: 4vw;
    width: 70%;
    text-align: right;
  }

  #fitness {
    font-size: 1.5vw;
    margin-right: 4vw;
    width: 70%;
    text-align: right;
  }

  #chromosome {
    font-size: 0.7vw;
    margin-right: 0vw;
    width: 70%;
    text-align: right;
  }

  #row2 {
    height: 30%;
  }

  #row3 {
    height: 30%;
  }
}

@media (max-width: 400px) {
  #result {
    height: 150%;
    background: #191C22;
  }

  #resultContent {
    height: 100%;
    background: #191C22;
    width: 87.5%;
  }

  #inputIcon {
    position: relative;
    left: 0vw;
    top: 0.15vw;
    display: none;
  }

  #resultIcon {
    position: relative;
    left: 0vw;
    top: 0.15vw;
    display: none;
  }

  nav li a {
    font-size: 0.5vw;
  }

  #row1 {
    flex-direction: column;
    height: 25%;
    display: flex;
    justify-content: space-between;
  }

  #item1 {
    width: 98%;
    margin: 0 auto;
    height: 32%;
    justify-content: space-between;
  }

  #item2 {
    width: 98%;
    margin: 0 auto;
    height: 32%;
    justify-content: space-between;
  }

  #item3 {
    width: 98%;
    margin: 0 auto;
    height: 32%;
    justify-content: space-between;
  }

  #generaIcon {
    width: 4vw;
    height: 4vw;
  }

  #geneIcon {
    width: 4vw;
    height: 4vw;
  }

  #fitIcon {
    width: 4vw;
    height: 4vw;
  }

  .itemTitle {
    margin-left: 2%;
    width: 28%;
  }

  .textTitle {
    display: flex;
  }

  .textTitle p {
    font-size: 2.5vw;
    margin-bottom: 0.9vw;
    display: block;
    align-self: center;
  }

  .textTitle span {
    display: none;
  }

  #generation {
    font-size: 2vw;
    margin-right: 4vw;
    width: 70%;
    text-align: right;
  }

  #fitness {
    font-size: 1.5vw;
    margin-right: 4vw;
    width: 70%;
    text-align: right;
  }

  #chromosome {
    font-size: 0.7vw;
    margin-right: 0vw;
    width: 70%;
    text-align: right;
  }

  #row2 {
    height: 30%;
  }

  #row3 {
    height: 30%;
  }
}


</style>
