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

  export default {
    data () {
      return {
        msg: 12,
        vertices,
        weights,
        edges
      };
    },
    mounted () {
      setTimeout(() => {
        this.edges[0].isVisible = false;
      }, 2000);
    },
    methods: {

    },
    components: {
      Molecule
    }
  }
</script>