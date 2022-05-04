// import { map, filter, reduce } from '../lib/fx.js'; // 서버에 올릴 경우 풀어준다.

let log = console.log;

// 이터러블/이터레이터 프로토콜
// 이터레이터 프로토콜을 따르는 이터러블은 [Symbol.iterator]()를 포함하고 있다.
// [Symbol.iterator]()은 이터레이터를 반환하여 그것을 next()로 실행할 때마다 하나씩 순회한다.
// next()는 value와 완료 여부를 알려주는 done을 반환한다.

// TODO : 제너레이터 활용
// 무한 수열 함수
// 제너레이터는 화살표 함수를 사용할 수 없다.
function* infinity(a) {
  while (true) yield a++;
}
// iter를 계속 yield하다가 limitValue만나면 return
function* limit(limitValue, iter) {
  for (const a of iter) {
    yield a;
    if (a == limitValue) return;
  }
}
// infinity함수와 limit함수를 이용하여 구현한 홀수 추출 함수
function* odd(limitValue) { // 예시
  for (const a of limit(limitValue, infinity(1))) {
    if (a % 2) yield a;
    if (a == limitValue) return;
  }
}
// TODO : 제너레이터 활용 Code Test
for (const a of odd(8)) log(a);
log(...odd(10));
const [wow, ...hi] = odd(10);
log(wow);
log(hi)
console.clear();


// TODO : map, 객체의 값을 새롭게 매핑한 후 리턴하고 싶을 때 사용.
// Data Source
const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];

// map
// p => p.name함수와 products를 파라미터로 넣어 호출
const userMapTest = map(p => p.name, products); // 상품명 출력
log(userMapTest);

// 이터러블 프로토콜을 따른 map의 다형성
log(map(el => el.nodeName, document.querySelectorAll('*')));
// ["HTML","HEAD","META","META","META","TITLE","BODY","DIV","SCRIPT"]
let m = new Map();
m.set('a', 10);
m.set('b', 20);
log(map(([k, a]) => [k, a * 2], m)); // ['a', 20], ['a', 40]
log(new Map(map(([k, a]) => [k, a * 2], m))); // 새로운 Map객체 {'a' => 20, 'b' => 40}

// TODO : filter, 객체의 특정 값을 걸러내고 싶을 때 사용.
// 명령형으로 코딩하는 경우
let under20000 = [];
for (const p of products) {
  if (p.price < 20000) under20000.push(p);
}
log(...under20000);

let over20000 = [];
for (const p of products) {
  if (p.price >= 20000) over20000.push(p);
}
log(...over20000);

// filter를 통한 리팩토링. 위와 같은 결과
log(...filter(p => p.price >= 20000, products));
log(...filter(p => p.price < 20000, products));

// 활용 예시
log(filter(n => n % 2, [1, 2, 3, 4]));

const generateSequence = function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}
log(filter(n => n % 2, generateSequence())); // [1, 3, 5]


// TODO : reduce, 특정 값을 순회하면서 하나의 값으로 누적할 때 사용.
const nums = [1, 2, 3, 4, 5];

const add = (a, b) => a + b;

log(reduce(add, 0, nums)); // 파라미터 : reduce(함수, 초기값, iter)
// 15
log(add(add(add(add(add(0, 1), 2), 3), 4), 5));
// 15 reduce의 내부에선 이 처럼 재귀적으로 동작하게 된다.
log(reduce(add, nums)); // 파라미터 : reduce(함수, 초기값, iter)
// 15
// 인자가 2개만 입력되었을 경우 iter에는 이터러블을 이터레이터로 만들고
// 첫번째 값을 next()하여 꺼낸 후 넣어 주게 된다.
// 가령 (f, [1, 2, 3])을 입력했을 경우 (f, 1, [2, 3])이 된다.

// 명령형으로 코딩하는 경우
let total = 0;
for (const n of nums) {
  total = total + n;
}
log(total); // 15

// reduce를 활용하여 products가격의 합계 구하기
const total_products_price = (total_price, product) => total_price + product.price
log(reduce(total_products_price, products));
// 이 경우 초기 값이 object인 { name: '반팔티', price: 15000 }로 들어가서 정상적으로 더해지지 않는다.
// 따라서 초기값을 0으로 설정해 줘야 정상적으로 동작한다.
log(reduce(total_products_price, 0, products));
// 10500



// map, filter, reduce중첩
log(reduce(add, map(p => p.price, filter(p => p.price < 20000, products))));

// 보기 편하게 재배열
log(
  reduce(
    add,
    map(p => p.price,
      filter(p => p.price < 20000, products))));
// 1. products의 price를 20000미만으로 필터한다.
// 2. 1을 통해 걸러진 값을 map을 통해 price만 뽑아낸다.
// 3. 뽑아낸 price를 add로 출력을 한다.

log(
  reduce(
    add,
    filter(n => n < 20000,
      map(p => p.price, products))));
// 이처럼 순서를 바꾸어 실행해도 된다.


// 함수형프로그래밍을 위한 사고흐름
// 상황 : products의 가격들의 합계를 내고 싶다.

// 1. 우선 reduce의 두번째 인자로 숫자로 된 배열이 들어오길 기대하며
// log와 reduce와 add까지는 별 생각 없이 작성할 수 있다.
log(
  reduce(
    add, [1, 2, 3, 4]));

// 2. map을 통해 reduce의 두번째 인자를 product를 숫자로 된 배열로 평가되도록 해준다.
log(
  reduce(
    add, map(p => p.price, products)));

// 3. filter를 통해 map의 두번째 인자를 특정 조건에 의해 걸러진 배열로 평가되도록 해준다.
log(
  reduce(
    add,
    map(p => p.price,
      filter(p => p.price < 20000, products)))
);

// XXX : console.clear()위치
console.clear();

const go = (list) => {
  log(list);
};

go([
  0,
  a => a + 1,
  a => a + 10,
  a => a + 100,
  log]);