## 그래프 이론
> 그래프
> 노드와 노드 사이에 연결된 간선의 정보를 가지고 있는 자료구조

> TIP!
> 
> 서로 다른 개체(혹은 객체)가 연결되어 있다 => 그래프 알고리즘
> 
> Ex ) 여러 개의 도시가 연결되어 있다.

### 그래프와 트리
| |그래프|트리|
|--|--|--|
|방향성|방향 그래프 혹은 무방향 그래프|트리|
|순환성|순환 및 비순환|비순환|
|루트 노드 존재 여부|루트 노드가 없음|루트 노드가 존재|
|노드간 관계성|부모와 자식 관계 없음|부모와 자식 관계|
|모델의 종류|네트워크 모델|계층 모델|

### 그래프의 구현 방법
1. 인접 행렬 (adjacency matrix): 2차원 배열을 사용하는 방식
- 메모리 공간: O(V²)
- 시간: O(1)
- EX ) 플로이드 워셜 알고리즘
2. 인접 리스트 (adjacency list): 리스트를 사용하는 방식
- 메모리 공간: O(E)
- 시간: O(V)
- EX ) 다익스트라 알고리즘

> V: 노드의 개수 (vertex)
> 
> E: 간선의 개수 (edge)
> 
> 시간: A -> B 노드로 이어진 간선의 비용을 계산하는 시간

## 기타 그래프 알고리즘
### 1. 서로소 집합
> 서로소 집합
> 
> 공통 원소가 없는 두 집합


#### 서로소 집합 자료구조(union-find)
- 서로소 부분 집합들로 나누어진 원소들의 데이터를 처리하기 위한 자료구조
- 두 가지 연산으로 조작할 수 있음.
  - union: 2개의 원소가 포함된 집합을 하나의 집합으로 합치는 연산
  - find: 특정 원소가 속한 집합이 어떤 집합인지 알려주는 연산

- 서로소 집합 자료구조는 트리 자료구조를 이용하여 집합을 표현함.

1. union 연산을 확인하여, 서로 연결된 두 노드 A, B를 확인한다.
  1-1. A와 B의 루트 노드 A', B'를 각각 찾는다.
  1-2. A'를 B'의 부모 노드로 설정한다 (B'가 A'를 가리키도록 한다.)
2. 모든 union 연산을 처리할 때까지 1번 과정을 반복한다.

> A', B' 중 더 번호가 작은 원소가 부모 노드가 되도록 구현

#### 예시
전체 집합 {1, 2, 3, 4, 5, 6}이 존재한다.

4개의 union 연산이 주어짐
- union 1, 4
- union 2, 3
- union 2, 4
- union 5, 6

union 1, 4는 '1과 4는 같은 집합'라는 의미를 가지고 있음.

4개의 union 연산 후 전체 원소들이 결과적으로 어떠한 형태의 부분 집합으로 나누어질지 알아봄.

각 원소는 그래프에서의 노드로 표현되고 '같은 집합에 속한다'는 정보를 담은 union 연산들은 간선으로 표현됨. 즉, 6개의 노드 4개의 간선이 존재하는 그래프로 생각할 수 있음.

![합집합](/images/합집합_union.jpg)

전체 원소가 {1, 2, 3, 4}와 {5, 6} 두 집합으로 나누어지는 것을 알 수 있다.

#### 구현
1. 초기화
노드의 개수(N) 크기의 부모 테이블을 초기화 이때 모든 원소가 자기 자신을 부모로 가지도록 설정함.

|노드 번호|1|2|3|4|5|6|
|---|---|---|---|---|---|---|
|부모|1|2|3|4|5|6|

2. union 1, 4
노드 1과 노드 4의 루트 노드를 찾아 설정한다.

|노드 번호|1|2|3|4|5|6|
|---|---|---|---|---|---|---|
|부모|1|2|3|__1__|5|6|

3. union 2, 3

|노드 번호|1|2|3|4|5|6|
|---|---|---|---|---|---|---|
|부모|1|2|__2__|1|5|6|

4. union 2, 4
f(2) = 2
f(4) = 1
따라서, f(2) = 1로 설정

|노드 번호|1|2|3|4|5|6|
|---|---|---|---|---|---|---|
|부모|1|__1__|2|1|5|6|

5. union 5, 6

|노드 번호|1|2|3|4|5|6|
|---|---|---|---|---|---|---|
|부모|1|1|2|1|5|5|

```javascript
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
```

> 답은 구할 수는 있지만, find 함수가 비효율적으로 동작함.
> 
> 최악의 경우 find 함수가 모든 노드를 다 확인하는 터라 시간 복잡도가 O(V)

#### find 최적화
__경로 압축 (path compression)__ 기법을 적용하면 시간 복잡도를 개선시킬 수 있음.

```javascript
const findParent = (parent, x) => {
  if (parent[x] !== x) {
    parent[x] = findParent(parent, parent[x])
  }
  return parent[x]
}
```

#### 서로소 집합 알고리즘의 시간 복잡고
노드의 개수: V
최대 V - 1개의 union 연산
M개의 find 연산
=> O(V + M(1 + log2-M/v(V)))

#### 서로소 집합을 활용한 사이클 판별
> 서로소 집합은 무방향 그래프 내에서의 사이클 판별할 때 사용할 수 있다.

union 연산은 그래프에서의 간선으로 표현할 수 있었다. 따라서 간선을 하나씩 확인하면서 두 노드가 포함되어 있는지 집합을 합치는 과정을 반복하는 것만으로도 사이클을 판별할 수 있다.

1. 각 간선을 확인하며 두 노드의 루트 노드를 확인한다
  1-1. 루트 노드가 서로 다르다면 두 노드에 대하여 union 연산을 수행한다
  1-2. 루트 노드가 서로 같다면 사이클(Cycle)이 발생한 것이다.
2. 그래프에 포함되어 있는 모든 간선에 대하여 1번 과정을 반복한다.

![사이클](/images/사이클.jpg)

#### 구현
```javascript
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
```
