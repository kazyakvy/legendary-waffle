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
        <div class="F atom"></div> - фтор F (19)
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
        <div class="R atom"></div> - празеодим Pr (141)
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
        <!--<span v-if="end" class="button is-primary" @click="show(structure)">Показать</span>-->
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
  import fragmentation from '../configs/fragmentation.json'

  export default {
    data () {
      return {
        vertices,
        edges: edges,
        fragmentation,
        outputNumber: 0,
        end: true,
        intervalId: null,
        iterationTime: 0
      };
    },
    methods: {
      show (components) {
        this.edges.forEach(edge => edge.isVisible = false);
        components.forEach((component) => {
          component.forEach((id, index, array) => {
            this.edges.forEach(edge => {
              let vertices = edge.vertices;
              if (
                (vertices[0] === id && array.indexOf(vertices[1]) !== -1)
                || (vertices[1] === id && array.indexOf(vertices[0]) !== -1)
              ) {
                edge.isVisible = true;
              }
            });
          });
        });
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
          this.fragmentation.push(this.getStructure(this.getComponents()));
        }
        while (!this.edges.every((edge, index) => edge.isBlocked ? edge.isVisible : !edge.isVisible)) {
          let fragmentation = this.pluck();
          while (!fragmentation) {
            fragmentation = this.pluck();
          }
          this.fragmentation.push(fragmentation);
        }
        localStorage.setItem('fragmentation', JSON.stringify(this.fragmentation));
        this.end = true;
      },
      start () {
        if (!this.fragmentation.length) {
          this.fragmentation.push(this.getStructure(this.getComponents()));
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
            localStorage.setItem('fragmentation', JSON.stringify(this.fragmentation));
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
        let structure = this.getStructure(this.getComponents());
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
      getComponents () {
        let vertices = this.vertices;
        let components = [];
        do {
          let component = this.getComponent(vertices[0]);
          components.push(component);
          vertices = _.difference(vertices, component);
        } while (vertices.length);
        return components;
      },
      getStructure (components) {
        return components.map(component => {
          let string = component.map(id => elements[id]).join('');
          let rAmount = string.match(/R/g) ? string.match(/R/g).length : false;
          let cAmount = string.match(/C/g) ? string.match(/C/g).length : false;
          let fAmount = string.match(/F/g) ? string.match(/F/g).length : false;
          let hAmount = string.match(/H/g) ? string.match(/H/g).length : false;
          let oAmount = string.match(/O/g) ? string.match(/O/g).length : false;
          return `${cAmount ? `C${cAmount === 1 ? '' : cAmount}` : ''}` +
            `${fAmount ? `F${fAmount === 1 ? '' : fAmount}` : ''}` +
            `${hAmount ? `H${hAmount === 1 ? '' : hAmount}` : ''}` +
            `${oAmount ? `O${oAmount === 1 ? '' : oAmount}` : ''}` +
            `${rAmount ? `R${rAmount === 1 ? '' : rAmount}` : ''}`;
        }).sort();
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
      }
    },
    components: {
      Molecule
    }
  }
</script>