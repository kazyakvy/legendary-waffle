export default [
  // {
  //   vertices: [1, 2],
  //   isVisible: true,
  //   id: 1
  // },
  // {
  //   vertices: [3, 2],
  //   isVisible: true,
  //   id: 2
  // },
  // {
  //   vertices: [4, 2],
  //   isVisible: true,
  //   id: 3
  // },
  // {
  //   vertices: [6, 9],
  //   isVisible: true,
  //   id: 4
  // },
  // {
  //   vertices: [8, 9],
  //   isVisible: true,
  //   id: 6
  // },
  // {
  //   vertices: [7, 9],
  //   isVisible: true,
  //   id: 7
  // },
  // {
  //   vertices: [12, 10],
  //   isVisible: true,
  //   id: 8
  // },
  // {
  //   vertices: [15, 16],
  //   isVisible: true,
  //   id: 9,
  //   dependencies: [[18, 21, 24], [19, 22, 23]]
  // },
  {
    vertices: [20, 18],
    isVisible: true,
    id: 10,
    dependencies: [[20, 22, 23], [20, 19, 18, 21, 24]],
    group: 1
  },
  {
    vertices: [18, 19],
    isVisible: true,
    id: 11,
    dependencies: [[20, 22, 23], [20, 19, 18, 21, 24]],
    group: 1
  },
  {
    vertices: [18, 21],
    isVisible: true,
    id: 12,
    dependencies: [[20, 22, 23], [20, 19, 18, 21, 24]],
    group: 1
  },
  {
    vertices: [5, 9],
    isVisible: true,
    id: 13,
    dependencies: [[16, 21, 24], [16, 18, 19, 22, 23]],
    group: 2
  },
  {
    vertices: [5, 2],
    isVisible: true,
    id: 14,
    dependencies: [[16, 21, 24], [16, 18, 19, 22, 23]],
    group: 2
  },
  {
    vertices: [5, 10],
    isVisible: true,
    id: 15,
    dependencies: [[16, 21, 24], [16, 18, 19, 22, 23]],
    group: 2
  },
  {
    vertices: [13, 10],
    isVisible: true,
    id: 16
  },
  {
    vertices: [5, 14],
    isVisible: true,
    id: 17,
    dependencies: [[21, 24], [18, 19, 22, 23]]
  },
  {
    vertices: [15, 14],
    isVisible: true,
    id: 18,
    dependencies: [[21, 24], [19, 22, 23]]
  },
  {
    vertices: [15, 17],
    isVisible: true,
    id: 19,
    dependencies: [[22, 23], [18, 21, 24]]
  },
  {
    vertices: [18, 17],
    isVisible: true,
    id: 20,
    dependencies: [[22, 23], [19, 18, 21, 24]]
  },
  {
    vertices: [23, 14],
    isVisible: true,
    id: 21,
    dependencies: [[24], [18, 19, 22, 23]]
  },
  {
    vertices: [22, 17],
    isVisible: true,
    id: 22,
    dependencies: [[23], [19, 18, 21, 24]]
  },
  {
    vertices: [22, 24],
    isVisible: true,
    id: 23,
    dependencies: []
  },
  {
    vertices: [23, 24],
    isVisible: true,
    id: 24,
    dependencies: []
  },
  // {
  //   vertices: [24, 25],
  //   isVisible: true,
  //   id: 25,
  //   dependencies: []
  // },
  // {
  //   vertices: [24, 26],
  //   isVisible: true,
  //   id: 26,
  //   dependencies: []
  // },
  // {
  //   vertices: [25, 27],
  //   isVisible: true,
  //   id: 27,
  //   dependencies: [[25], [29, 30, 28, 26]]
  // },
  // {
  //   vertices: [26, 28],
  //   isVisible: true,
  //   id: 28,
  //   dependencies: [[26], [30, 29, 27, 25]]
  // },
  // {
  //   vertices: [27, 29],
  //   isVisible: true,
  //   id: 29,
  //   dependencies: [[27, 25], [30, 28, 26]]
  // },
  // {
  //   vertices: [28, 29],
  //   isVisible: true,
  //   id: 30,
  //   dependencies: [[28, 26], [29, 27, 25]]
  // },
  // {
  //   vertices: [29, 30],
  //   isVisible: true,
  //   id: 31,
  //   dependencies: [[29, 27, 25], [30, 28, 26]]
  // },
]