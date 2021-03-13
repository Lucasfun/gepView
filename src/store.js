import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    generation: 0,
    fitness: 0,
    gene: "",
    truths:[],
    forecasts:[],
    precisions:[]
  },
  mutations: {
    setGeneration(a){
      this.state.generation=a;
    },
    setFitness(a){
      this.state.fitness=a;
    },
    setGene(a){
      this.state.gene=a;
    },
    getFitness(){
      return this.state.fitness;
    }
  },
  actions: {

  }
})
