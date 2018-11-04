<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th>Масса</th>
          <th>Количество</th>
          <th>Элемент</th>
        </tr>
      </thead>
      <tfoot>
        <tr class="table-row" v-for="record in checkedArray">
          <td>{{ record.weight }}</td>
          <td>{{ record.amount }}</td>
          <td v-html="record.elem"></td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
  import fragmentation from '../configs/fragmentation.json'
  import weights from '../configs/weights.js'
  import tableWeights from '../configs/tableWeights.js'
  import _ from 'lodash'

  export default {
    data () {
      return {
        fragmentation,
        array: [],
        regexp: /O2|O3|O4|C2|C3|C4|C5|C6|C7|C8|C9|C10|H2|H3|H4|H5|H6|H7|H8|H9|H10|H11|H12|H13|H14|H|C|O|R/g
      }
    },
    mounted () {
      this.generateTable();
    },
    methods: {
      generateTable () {
        _.flatten(this.fragmentation).forEach(component => {
          let elem = _.find(this.array, {elem: this.subString(component)});
          if (elem) {
            elem.amount++;
          } else {
            let weight = component.match(this.regexp).reduce((acc, str) => {
              if (str === 'R' || str.length === 1) {
                return acc + weights[str];
              }
              let number = +str.replace(/\D+/,"");
              acc += weights[str[0]] * number;
              return acc;
            }, 0);
            component = this.subString(component);
            elem = {
              elem: component,
              amount: 1,
              weight
            };
            this.array.push(elem);
          }
        });
      },
      subString (string) {
        return string.match(this.regexp).map(str => {
          if (str.length === 1 || str === 'R') {
            return str;
          }
          let number = +str.replace(/\D+/,"");
          return str.replace(number, `<sub>${number}</sub>`);
        }).join('');
      }
    },
    computed: {
      sortedArray () {
        return _.sortBy(this.array, ['weight']);
      },
      checkedArray () {
        return this.sortedArray.filter(record => tableWeights.includes(record.weight));
      }
    }
  }
</script>