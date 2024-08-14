const [Meta, ...inputEdges] = require('fs').readFileSync('../others/10-4.txt').toString().split('\n')
const [v, e] = Meta.split(' ').map(e => +e)
const edges = inputEdges.map((ele) => ele.split(' ').map(e => +e))

const parent = Array.from({length: v}, (_, idx) => ++idx)

const findParent = (idx) => {
  if (parent[idx - 1] !== idx) {
    parent[idx - 1] = findParent(parent[idx - 1])
  }

  return parent[idx - 1]
}

const unionParent = (A, B) => {
  const [a, b] = [findParent(A), findParent(B)]
  if (a < b) {
    parent[b - 1] = a
  } else {
    parent[a - 1] = b
  }
}

let isCycle = false
for (let i = 0; i < e; ++i) {
  const [a, b] = edges[i]
  if (parent[a - 1] === parent[b - 1]) {
    isCycle = true
    break
  }
  unionParent(a, b)
}

if (isCycle) {
  console.log('cycle')
} else {
  console.log('no cycle')
}