<template>
  <div class="main">
    <div>
      <button class="button">
        Поменять строение
      </button>
    </div>
    <div class="svg">
      <molecule :edges="edges" :vertices="vertices" :weights="weights"></molecule>
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
    mounted () {
//      let id = setInterval(() => {
//        this.pluck();
//        if (_.every(this.edges, edge => edge.isVisible)) {
//          clearInterval(id);
//        }
//      }, 300);
    },
    methods: {
      pluck () {
        this.fragmentation.push(this.edges);
        for (let i = this.edges.length - 1; i >= 0; i--) {
          let isVisible = this.edges[i].isVisible;
          if (!isVisible) {
            this.edges[i].isVisible = true;
            break;
          } else {
            this.edges[i].isVisible = false;
          }
        }
      }
    },
    components: {
      Molecule
    }
  }
</script>