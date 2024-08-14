const [cmds, ...inputUnions] = require('fs').readFileSync('../others/10-1.txt').toString().split('\n')
const [v, e] = cmds.split(' ').map((e) => +e)
const unions = inputUnions.map((ele) => ele.split(' ').map((e) => +e))

// 초기화
const arr = Array.from({ length: v }).map((_, idx) => ++idx)

// utils
const getRoot = (id) => {
  const parent = getParent(id)
  if (id !== parent) {
    return getRoot(parent)
  }
  return parent
}

const getParent = (id) => {
  return arr[id - 1]
}

const setRoot = (tar, val) => {
  arr[tar - 1] = val
}

const union = (a, b) => {
  const [A, B] = [getParent(a), getParent(b)]
  if (A >= B) {
    setRoot(a, B)
  } else {
    setRoot(b, A)
  }
}

// 로직
unions.forEach((ele) => {
  union(...ele)
})

const set = arr.map((e) => getRoot(e))
console.log('각 원소가 속한 집합:', set.join(' '))
console.log('부모 테이블:', arr.join(' '))