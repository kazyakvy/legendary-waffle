<template>
  <div class="main">
    <div class="header">
      <div class="control-bar">
        <button class="button is-info" @click="start" :disabled="end">
          Начать строение
        </button>
        <input class="input" type="number" v-model="outputNumber" min="0" name="number" title="Количество вывода">
        <span>
          Всего: {{ fragmentation.length }}
        </span>
        <button class="button is-warning" @click="finish" :disabled="end">
          Закончить
        </button>
      </div>
      <button class="button is-danger" @click="reset">
        Перезапустить
      </button>
    </div>
    <div class="svg">
      <molecule :edges="edges"
                :vertices="vertices"
                :fragmentation="fragmentation"
                :end="end"
      ></molecule>
    </div>
    <ol class="list" type="1">
      <li v-for="vector, index in fragmentation"
          v-if="index < outputNumber"
          class="list-item"
      >
        {{ index + 1 }}. ( {{ vector.join(', ') }} )
        <span v-if="end" class="button is-primary" @click="show(vector)">Показать</span>
      </li>
    </ol>
  </div>
</template>

<script>
  import Molecule from './Molecule.vue'
  import vertices from '../configs/vertices'
  import edges from '../configs/edges'
  import _ from 'lodash'

  export default {
    data () {
      return {
        vertices,
        edges,
        fragmentation: [],
        outputNumber: 0,
        end: false,
        intervalId: null
      };
    },
    methods: {
      reset () {
        this.fragmentation = [];
        this.end = false;
        this.edges.forEach(edge => edge.isVisible = true);
      },
      finish () {
        if (!this.fragmentation.length) {
          this.fragmentation.push(this.edges.map(edge => edge.isVisible ? 1 : 0));
        }
        let fragmentation;
        while (!fragmentation || !fragmentation.every(edge => !edge)) {
          fragmentation = this.pluck();
          this.fragmentation.push(fragmentation);
        }
        clearInterval(this.intervalId);
        this.end = true;
      },
      show (vector) {
        for (let i = 0; i < vector.length; i++) {
          this.edges[i].isVisible = !!vector[i];
        }
      },
      start () {
        this.fragmentation.push(this.edges.map(edge => edge.isVisible ? 1 : 0));
        this.intervalId = setInterval(() => {
          let fragmentation = this.pluck();
          while (!fragmentation) {
            fragmentation = this.pluck();
          }
          if (fragmentation) {
            this.fragmentation.push(fragmentation);
          }
          if (fragmentation.every(edge => !edge)) {
            this.end = true;
            clearInterval(this.intervalId);
          }
        }, 0);
      },
      pluck () {
        for (let i = this.edges.length - 1; i >= 0; i--) {
          let edge = this.edges[i];
          if (edge.isVisible) {
            edge.isVisible = false;
            break;
          } else {
            edge.isVisible = true;
          }
        }
//        let visible = this.edges.filter(edge => !edge.isVisible);
//        let isAllowed = _.every(
//          visible,
//          edge =>
//            edge.dependencies.length
//              ? _.some(edge.dependencies, dependence => _.every(dependence, id => _.find(this.edges, {id}).isVisible))
//              : true
//        );
//        if (isAllowed) {
//          return this.edges;
//        }
        return this.edges.map(edge => edge.isVisible ? 1 : 0);
      },
//      availability (edge, preDependencies) {
//        if (edge.dependencies.length === 0) {
//          if (preDependencies) {
//            return edge.isVisible;
//          }
//          return true;
//        }
//        let dependencies = edge.dependencies.map(id => this.edges.find(edge => edge.id === id));
//        if (dependencies.every(edge => !edge.isVisible)) {
//          return false;
//        } else if (dependencies.every(edge => edge.isVisible)) {
//          let filtered = dependencies;
//          if (preDependencies) {
//            filtered = dependencies.filter(edge => !preDependencies.find(id => edge.id === id));
//          }
//          return filtered.some(edge => this.availability(edge, dependencies.map(edge => edge.id)));
//        } else {
//          let dependence = dependencies.find(edge => edge.isVisible);
//          if (preDependencies && preDependencies.find(id => dependence.id === id)) {
//            return false;
//          }
//          return this.availability(dependence, dependencies.map(edge => edge.id));
//        }
//      }
    },
    components: {
      Molecule
    }
  }
</script>