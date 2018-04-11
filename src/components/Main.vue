<template>
  <div class="main">
    <div>
      <button class="button" @click="start">
        Начать строение
      </button>
    </div>
    <div class="svg">
      <molecule :edges="edges"
                :vertices="vertices"
                :weights="weights"
                :fragmentation="fragmentation"
      ></molecule>
    </div>
  </div>
</template>

<script>
  import Molecule from './Molecule.vue'
  import vertices from '../configs/vertices'
  import weights from '../configs/weights'
  import edges from '../configs/edges'
  import _ from 'lodash'

  export default {
    data () {
      return {
        msg: 12,
        vertices,
        weights,
        edges,
        fragmentation: []
      };
    },
    methods: {
      start () {
        let id = setInterval(() => {
          let fragmentation = this.pluck();
          while (!fragmentation) {
            fragmentation = this.pluck();
          }
          if (fragmentation) {
            this.fragmentation.push(fragmentation);
          }
          if (this.end) {
            clearInterval(id);
          }
        }, 150);
      },
      pluck () {
        for (let i = this.edges.length - 1; i >= 0; i--) {
          let edge = this.edges[i];
          if (!edge.isVisible) {
            edge.isVisible = true;
            break;
          } else {
            edge.isVisible = false;
          }
        }
        let visible = this.edges.filter(edge => edge.isVisible);
        let isAllowed = _.every(
          visible,
          edge =>
            edge.dependencies.length
              ? _.some(edge.dependencies, dependence => _.every(dependence, id => _.find(this.edges, {id}).isVisible))
              : true
        );
        if (isAllowed) {
          return this.edges;
        }
        return false;
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
    computed: {
      end () {
        return _.every(this.edges, edge => edge.isVisible);
      }
    },
    components: {
      Molecule
    }
  }
</script>