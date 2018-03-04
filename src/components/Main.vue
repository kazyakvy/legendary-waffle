<template>
  <div>
    <button>
      Поменять строение
    </button>
    <molecule :edges="edges" :vertices="vertices" :weights="weights"></molecule>
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
    methods: {

    },
    components: {
      Molecule
    }
  }
</script>