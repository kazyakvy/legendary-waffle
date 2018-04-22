<template>
  <div class="main">
    <div class="header">
      <div class="control-bar columns">
        <div class="column is-narrow">
          <button class="button is-info" @click="start" :disabled="end">
            Начать строение
          </button>
        </div>
        <span class="column is-narrow">
          Разбиений: {{ fragmentation.length }}
        </span>
        <div class="column is-narrow">
          <button class="button is-warning" @click="finish" :disabled="end">
            Закончить
          </button>
        </div>
        <div class="column">
          Количество вывода:
          <input class="input"
                 type="number"
                 v-model.number="outputNumber"
                 min="0"
                 name="number"
          >
        </div>
        <div class="column">
          Время итерации (сек):
          <input class="input"
                 type="number"
                 v-model.number="iterationTime"
                 min="0"
                 name="number"
          >
        </div>
        <div class="column is-narrow">
          <button class="button is-danger" @click="reset">
            Перезапустить
          </button>
        </div>
      </div>
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
        intervalId: null,
        isSpec: false,
        iterationTime: 0
      };
    },
    methods: {
      reset () {
        clearInterval(this.intervalId);
        this.fragmentation = [];
        this.end = false;
        this.edges.forEach(edge => edge.isVisible = true);
      },
      finish () {
        clearInterval(this.intervalId);
        if (!this.fragmentation.length) {
          this.fragmentation.push(this.edges.map(edge => edge.isVisible ? 1 : 0));
          this.specLoop();
        }
        while (!this.edges.filter((edge, index) => index < 6).every(edge => !edge.isVisible)) {
          this.fragmentation.push(this.specPluck());
        }
        while (!this.edges.every(edge => !edge.isVisible)) {
          this.fragmentation.push(this.pluck());
          this.specLoop();
        }
        this.end = true;
      },
      show (vector) {
        for (let i = 0; i < vector.length; i++) {
          this.edges[i].isVisible = !!vector[i];
        }
      },
      start () {
        this.fragmentation.push(this.edges.map(edge => edge.isVisible ? 1 : 0));
        this.isSpec = true;
        this.intervalId = setInterval(() => {
          if (this.edges.every(edge => !edge.isVisible)) {
            this.end = true;
            clearInterval(this.intervalId);
            return;
          }
          if (!this.isSpec) {
            this.edges.forEach((edge, index) => index < 6 && (edge.isVisible = true));
            this.fragmentation.push(this.pluck());
            this.isSpec = true;
          } else {
            if (this.edges.filter((edge, index) => index < 6).every(edge => !edge.isVisible)) {
              this.isSpec = false;
              return;
            }
            this.fragmentation.push(this.specPluck());
          }
        }, this.iterationTime*1000);
      },
      specLoop () {
        this.edges.forEach((edge, index) => index < 6 && (edge.isVisible = true));
        while (!this.edges.filter((edge, index) => index < 6).every(edge => !edge.isVisible)) {
          this.fragmentation.push(this.specPluck());
        }
      },
      specPluck () {
        for (let i = 0; i < 6; i++) {
          let edge = this.edges[i];
          if (edge.isVisible) {
            if (edge.group === 2) {
              for (let j = 0; j < 3; j++) {
                this.edges[j].isVisible = true;
              }
            }
            edge.isVisible = false;
            break;
          }
        }
        return this.edges.map(edge => edge.isVisible ? 1 : 0);
      },
      pluck () {
        for (let i = this.edges.length - 1; i >= 6; i--) {
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