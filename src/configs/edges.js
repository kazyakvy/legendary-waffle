export default [
  // {
  //   vertices: [1, 2],
  //   isVisible: false,
  //   id: 1
  // },
  // {
  //   vertices: [3, 2],
  //   isVisible: false,
  //   id: 2
  // },
  // {
  //   vertices: [4, 2],
  //   isVisible: false,
  //   id: 3
  // },
  {
    vertices: [5, 2],
    isVisible: false,
    id: 4,
    dependencies: [[13, 14, 17, 22, 23], [13, 15, 24]]
  },
  {
    vertices: [5, 9],
    isVisible: false,
    id: 5,
    dependencies: [[13, 14, 17, 22, 23], [13, 15, 24]]
  },
  // {
  //   vertices: [8, 9],
  //   isVisible: false,
  //   id: 6
  // },
  // {
  //   vertices: [7, 9],
  //   isVisible: false,
  //   id: 7
  // },
  // {
  //   vertices: [6, 9],
  //   isVisible: false,
  //   id: 8
  // },
  {
    vertices: [5, 10],
    isVisible: false,
    id: 9,
    dependencies: [[13, 14, 17, 22, 23], [13, 15, 24]]
  },
  // {
  //   vertices: [11, 10],
  //   isVisible: false,
  //   id: 10
  // },
  // {
  //   vertices: [12, 10],
  //   isVisible: false,
  //   id: 11
  // },
  // {
  //   vertices: [13, 10],
  //   isVisible: false,
  //   id:12
  // },
  {
    vertices: [5, 14],
    isVisible: false,
    id: 13,
    dependencies: [[14, 17, 22, 23], [15, 24]]
  },
  {
    vertices: [15, 14],
    isVisible: false,
    id: 14,
    dependencies: [[15, 24], [17, 22, 23]]
  },
  {
    vertices: [23, 14],
    isVisible: false,
    id: 15,
    dependencies: [[24], [14, 17, 22, 23]]
  },
  // {
  //   vertices: [15, 16],
  //   isVisible: false,
  //   id: 16
  // },
  {
    vertices: [15, 17],
    isVisible: false,
    id: 17,
    dependencies: [[14, 15, 24], [22, 23]]
  },
  {
    vertices: [18, 17],
    isVisible: false,
    id: 18,
    dependencies: [[22, 23], [17, 14, 15, 24]]
  },
  // {
  //   vertices: [18, 19],
  //   isVisible: false,
  //   id: 19
  // },
  // {
  //   vertices: [18, 20],
  //   isVisible: false,
  //   id: 20
  // },
  {
    vertices: [18, 21],
    isVisible: false,
    id: 21,
    dependencies: [[18, 17, 14, 15, 24], [18, 22, 23]]
  },
  {
    vertices: [22, 17],    isVisible: false,
    id: 22,
    dependencies: [[23], [17, 14, 15, 24]]
  },
  {
    vertices: [22, 24],
    isVisible: false,
    id: 23,
    dependencies: []
  },
  {
    vertices: [23, 24],
    isVisible: false,
    id: 24,
    dependencies: []
  },
  {
    vertices: [24, 25],
    isVisible: false,
    id: 25,
    dependencies: []
  },
  {
    vertices: [24, 26],
    isVisible: false,
    id: 26,
    dependencies: []
  },
  {
    vertices: [25, 27],
    isVisible: false,
    id: 27,
    dependencies: [[25], [29, 30, 28, 26]]
  },
  {
    vertices: [26, 28],
    isVisible: false,
    id: 28,
    dependencies: [[26], [30, 29, 27, 25]]
  },
  {
    vertices: [27, 29],
    isVisible: false,
    id: 29,
    dependencies: [[27, 25], [30, 28, 26]]
  },
  {
    vertices: [28, 29],
    isVisible: false,
    id: 30,
    dependencies: [[28, 26], [29, 27, 25]]
  },
  {
    vertices: [29, 30],
    isVisible: false,
    id: 31,
    dependencies: [[29, 27, 25], [30, 28, 26]]
  },
]