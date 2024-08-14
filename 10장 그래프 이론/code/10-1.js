// 특정 원소가 속한 집합을 찾기
const findParent = (parent, x) => {
  if (parent[x] !== x) {
    return findParent(parent, parent[x])
  }
  return x
}

const unionParent = (parent, a, b) => {
  const [A, B] = [findParent(parent, a), findParent(parent, b)]
  if (A < B) {
    parent[B] = A
  } else {
    parent[A] = B
  }
}

// input 받기
const input = require('fs').readFileSync('../others/10-1.txt').toString().split('\n')

// 노드의 개수와 간선(union 연산)의 개수
const [v, e] = input[0].split(' ').map(ele => +ele)

// 부모 테이블 초기화
const parent = Array.from({ length: v + 1 }, (_, idx) => idx)

// union 연산을 각각 수행
for (let i = 1; i <= e; ++i) {
  const [a, b] = input[i].split(' ').map((e) => +e)
  unionParent(parent, a, b)
}

let result = []
for (let i = 1; i < v + 1; ++i) {
  result.push(findParent(parent, i))
}
console.log('각 원소가 속한 집합:', result.join(' '))

result = []
for (let i = 1; i < v + 1; ++i) {
  result.push(parent[i])
}
console.log('부모 테이블:', result.join(' '))