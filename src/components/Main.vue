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
        <div class="column is-narrow">
          <button class="button is-outlined" @click="stop" :disabled="end">
            Пауза
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
    <div class="molecule-info">
      <div class="info-item">
        <div class="F atom"></div> - фтор F (18)
      </div>
      <div class="info-item">
        <div class="O atom"></div> - кислород O (16)
      </div>
      <div class="info-item">
        <div class="H atom"></div> - водород H (1)
      </div>
      <div class="info-item">
        <div class="C atom"></div> - углерод C (12)
      </div>
      <div class="info-item">
        <div class="R atom"></div> - Редко-земельный элемент (175)
      </div>
    </div>
    <div class="svg">
      <molecule :edges="edges"
                :fragmentation="fragmentation"
                :end="end"
      ></molecule>
    </div>
    <ol class="list" type="1">
      <li v-for="structure, index in fragmentation"
          v-if="index < outputNumber"
          class="list-item"
      >
        {{ index + 1 }}. {{ structure }}
        <span v-if="end" class="button is-primary" @click="show(structure)">Показать</span>
      </li>
    </ol>
  </div>
</template>

<script>
  import Molecule from './Molecule.vue'
  import vertices from '../configs/vertices'
  import edges from '../configs/edges'
  import elements from '../configs/elements'
  import weights from '../configs/weights'
  import _ from 'lodash'

  export default {
    data () {
      return {
        vertices,
        edges: edges,
        allEdges: edges,
        fragmentation: [],
        outputNumber: 0,
        end: false,
        intervalId: null,
        iterationTime: 0
      };
    },
    methods: {
      show (structure) {
      },
      stop () {
        clearInterval(this.intervalId);
      },
      reset () {
        clearInterval(this.intervalId);
        this.fragmentation = [];
        this.end = false;
        this.edges.forEach(edge => edge.isVisible = true);
      },
      finish () {
        clearInterval(this.intervalId);
        if (!this.fragmentation.length) {
          this.fragmentation.push(this.getStructure());
        }
        while (!this.edges.every((edge, index) => edge.isBlocked ? edge.isVisible : !edge.isVisible)) {
          let fragmentation = this.pluck();
          while (!fragmentation) {
            fragmentation = this.pluck();
          }
          this.fragmentation.push(fragmentation);
        }
        this.end = true;
      },
      start () {
        if (!this.fragmentation.length) {
          this.fragmentation.push(this.getStructure());
        }
        this.intervalId = setInterval(() => {
          let fragmentation = this.pluck();
          while (!fragmentation) {
            fragmentation = this.pluck();
          }
          this.fragmentation.push(fragmentation);
          if (this.edges.every((edge, index) => edge.isBlocked ? edge.isVisible : !edge.isVisible)) {
            this.end = true;
            clearInterval(this.intervalId);
          }
        }, this.iterationTime*1000);
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
        let structure = this.getStructure();
//        if (structure.some(component => component === 'C' || component === 'CH')) {
//          return false;
//        }
        return this.checkOriginality(structure) ? structure : false;
      },
      checkOriginality (currentStructure) {
        return !this.fragmentation.length || this.fragmentation.every(structure => {
          if (currentStructure.length !== structure.length) {
            return true;
          }
          return !_.isEqual(currentStructure, structure);
        });
      },
      getStructure () {
        let vertices = this.vertices;
        let structure = [];
        do {
          let component = this.getComponent(vertices[0]);
          structure.push(component);
          vertices = _.difference(vertices, component);
        } while (vertices.length);
        return structure.map(component => component.map(id => elements[id]).sort().join('')).sort();
      },
      getComponent (id) {
        let usedEdges = [];
        let vertices = [id];
        let adj;
        let i = 0;
        do {
          adj = this.searchVertices(vertices[i], usedEdges, vertices);
          if (adj) {
            vertices.concat(adj);
          }
          i++;
        } while (i < this.visibleEdges.length);
        return _.uniq(vertices);
      },
      searchVertices (vertexId, usedEdges, vertices) {
        let adjVertices = this.visibleEdges;
        adjVertices = adjVertices.reduce((acc, edge) => {
            if (usedEdges.length && usedEdges.some(id => id === edge.id)) {
              return acc;
            }
            let vertices = edge.vertices;
            if (vertices[0] === vertexId) {
              acc.push(vertices[1]);
              usedEdges.push(edge.id);
            } else if (vertices[1] === vertexId) {
              acc.push(vertices[0]);
              usedEdges.push(edge.id);
            }
            return acc;
          }, []);
        vertices.push(...adjVertices);
        return adjVertices.length ? adjVertices : false;
      }
    },
    computed: {
      visibleEdges () {
        return this.edges.filter(edge => edge.isVisible);
      },
      vector () {
        return this.edges.reduce((acc, edge) => acc + `${edge.isVisible ? 1 : 0}`, '');
      }
    },
    components: {
      Molecule
    }
  }
</script>