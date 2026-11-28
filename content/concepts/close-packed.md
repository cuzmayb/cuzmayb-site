---
title: Close-packed plane과 direction
date: 2026-11-28
group: 결정 구조
summary: 밀러 지수로 방향과 면을 적고, linear density와 planar density를 계산해 구조마다 가장 빽빽한 면과 방향을 찾는다. 같은 계산으로 slip system과 Si 웨이퍼 면방위의 차이를 읽는다.
tags:
  - 결정 구조
  - 밀러 지수
---

표시가 없는 내용은 재료과학(Callister 교재 수준)에서 배운다. 그보다 위 과목에서 다루는 부분에는 <span class="lv">과목</span>처럼 과목 이름을 표시했다. 과목 이름은 학교마다 조금씩 다르다.

## 선과 면

결정에서 "어느 쪽"을 말할 때는 두 가지를 나눠 쓴다. direction(방향)은 결정 안에 그은 선이고, plane(면)은 결정을 자르는 평면이다. close-packed direction(최밀 방향)은 원자가 그 선을 따라 빈틈없이 맞닿아 늘어선 방향이다. close-packed plane(최밀면)은 원자가 그 면 위에 가장 빽빽하게 깔린 면이다.

둘은 재는 단위도 다르다. 방향은 길이당 원자 수로, 면은 넓이당 원자 수로 잰다. FCC, BCC, HCP의 unit cell(단위정)은 [FCC, BCC](/concepts/fcc-bcc) 페이지에 정리했고, 여기서는 그 위에 방향과 면을 그어 본다.

## 밀러 지수로 적기

Miller index(밀러 지수)는 lattice parameter(격자상수)를 1로 놓은 좌표로 방향과 면을 적는 방법이다.

**방향.** 끝점 좌표에서 시작점 좌표를 빼고 가장 작은 정수비로 맞춘다. 원점에서 (1,1,0)으로 가면 [110]이다. (1,0,0)에서 (0,1,0)으로 가면 (0,1,0) − (1,0,0) = (−1,1,0)이라 [−1 1 0]이 된다. 교재에서는 음수를 숫자 위 막대로 적는데, 이 페이지에서는 −1로 쓴다.

**면.** 세 단계를 거친다. 면이 x, y, z축을 자르는 절편을 읽고(축과 평행하면 ∞), 역수를 취하고, 분수가 남으면 정수로 맞춘다. 면이 원점을 지나면 절편이 0이라 읽을 수 없다. 그럴 때는 원점을 옆 꼭짓점으로 옮겨서 읽는다.

| 절편 | 역수 | 밀러 지수 |
|---|---|---|
| 1, 1, 1 | 1, 1, 1 | (111) |
| 1, ∞, ∞ | 1, 0, 0 | (100) |
| 1, 1, ∞ | 1, 1, 0 | (110) |
| ½, 1, ∞ | 2, 1, 0 | (210) |

괄호 모양에 따라 뜻이 달라진다.

| 표기 | 뜻 | 예 |
|---|---|---|
| [uvw] | 방향 하나 | [110] |
| ⟨uvw⟩ | 대칭으로 같은 방향 묶음(family) | ⟨110⟩: [110], [1 −1 0], [101], [0 1 −1] 등 |
| (hkl) | 면 하나 | (111) |
| {hkl} | 대칭으로 같은 면 묶음 | {111}: (111), (−1 1 1), (1 −1 1), (1 1 −1) |

{111}은 서로 평행하지 않은 면 네 개로 이루어진다. (−1 −1 −1)은 (111)과 평행해서 같은 면 묶음으로 친다.

뒤에서 계속 쓰는 규칙이 두 개 있다.

- 방향 [uvw]가 면 (hkl) 위에 놓이려면 hu + kv + lw = 0이어야 한다. 결정계와 상관없이 성립한다.
- cubic(입방정)에서는 [hkl] 방향이 (hkl) 면에 수직이다. 다른 결정계에서는 일반적으로 성립하지 않는다.

HCP는 축이 4개인 Miller-Bravais index(hkil)를 쓰고, i = −(h + k)다. 바닥면은 (0001), 바닥면 위의 원자가 맞닿는 방향은 ⟨1 1 −2 0⟩이다.

## Linear density와 planar density

두 값은 이렇게 정의한다.

- linear density(선밀도) LD = 방향 벡터 위에 중심이 놓인 원자 수 ÷ 벡터 길이
- planar density(면밀도) PD = 면 위에 중심이 놓인 원자 수 ÷ 면 넓이

중심이 선이나 면 위에 정확히 있는 원자만 센다. 원자가 단면만 살짝 걸치는 경우는 세지 않는다. 선분 양 끝 원자는 반씩 들어온다. 면 조각의 꼭짓점 원자는 꼭짓점 각도만큼 들어오므로, 정사각형 꼭짓점은 ¼(90°/360°), 정삼각형 꼭짓점은 1/6(60°/360°)이다.

격자상수와 원자 반지름 r의 관계는 FCC가 a = 2√<span class="rt">2</span> r, BCC가 a = 4r/√<span class="rt">3</span>이다.

| 구조 | 방향 | 벡터 길이 | 원자 수 | LD |
|---|---|---|---|---|
| FCC | [100] | a = 2√<span class="rt">2</span> r | 양 끝 ½ × 2 = 1 | 1/(2√<span class="rt">2</span> r) ≈ 0.354/r |
| FCC | [110] | √<span class="rt">2</span> a = 4r | 양 끝 ½ × 2 + 면 중심 1 = 2 | 1/(2r) = 0.500/r |
| BCC | [100] | a = 4r/√<span class="rt">3</span> | 1 | √<span class="rt">3</span>/(4r) ≈ 0.433/r |
| BCC | [110] | √<span class="rt">2</span> a | 1 (체심은 면 대각선 위에 없음) | √<span class="rt">3</span>/(4√<span class="rt">2</span> r) ≈ 0.306/r |
| BCC | [111] | √<span class="rt">3</span> a = 4r | 양 끝 ½ × 2 + 체심 1 = 2 | 1/(2r) = 0.500/r |

1/(2r)는 원자가 일렬로 맞닿은 줄의 값이라 이보다 커질 수 없다. LD가 1/(2r)인 방향이 close-packed direction이다.

| 구조 | 면 | 넓이 | 원자 수 | PD |
|---|---|---|---|---|
| FCC | (100) | a² = 8r² | 꼭짓점 ¼ × 4 + 면 중심 1 = 2 | 1/(4r²) = 0.250/r² |
| FCC | (111) | 정삼각형, 한 변 4r: 4√<span class="rt">3</span> r² | 꼭짓점 1/6 × 3 + 변 중점 ½ × 3 = 2 | 1/(2√<span class="rt">3</span> r²) ≈ 0.289/r² |
| BCC | (100) | a² = 16r²/3 | 꼭짓점 ¼ × 4 = 1 | 3/(16r²) ≈ 0.188/r² |
| BCC | (110) | a × √<span class="rt">2</span> a = 16√<span class="rt">2</span> r²/3 | 꼭짓점 ¼ × 4 + 체심 1 = 2 | 3/(8√<span class="rt">2</span> r²) ≈ 0.265/r² |

FCC (111)은 cube 안에서 꼭짓점 세 개를 잇는 정삼각형으로 센다. 세 변이 모두 면 대각선이라 길이가 √<span class="rt">2</span> a = 4r이고, 넓이는 (√<span class="rt">3</span>/4)(4r)² = 4√<span class="rt">3</span> r²다. 꼭짓점 원자 3개가 1/6씩, 변 가운데의 면 중심 원자 3개가 ½씩 들어와 모두 2개다.

1/(2√<span class="rt">3</span> r²)는 같은 크기 원을 평면에 가장 빽빽하게 깐 육각 배열의 값이다. 원 하나가 그 원에 외접하는 정육각형 넓이 2√<span class="rt">3</span> r²를 차지하기 때문이다. PD가 이 값인 면이 close-packed plane이다. 원자 크기가 다른 금속끼리는 r이 다르니, 구조의 기하만 비교할 때는 이 표처럼 1/r² 단위로 맞춘다.

## 구조별 close-packed plane과 direction

| 구조 | close-packed plane | close-packed direction | 면 하나에 든 그 방향 수 | 주 slip system(슬립계) |
|---|---|---|---|---|
| FCC | {111}, PD 1/(2√<span class="rt">3</span> r²) | ⟨110⟩, LD 1/(2r) | 3 | {111}⟨110⟩, 4 × 3 = 12 |
| HCP | (0001), PD 1/(2√<span class="rt">3</span> r²) | ⟨1 1 −2 0⟩, LD 1/(2r) | 3 | basal slip, 1 × 3 = 3 |
| BCC | 없음. 가장 빽빽한 {110}도 PD가 최댓값의 0.92배 | ⟨111⟩, LD 1/(2r) | {110} 하나에 2 | {110}⟨111⟩, 6 × 2 = 12 |

**FCC.** close-packed direction ⟨110⟩이 close-packed plane {111} 안에 놓인다. 아래 그림의 삼각형은 {111} 가운데 하나인 (1 −1 1)이다. 세 변이 모두 면 대각선이고, 각 변 방향 [110], [011], [−1 0 1]은 1·u − 1·v + 1·w = 0을 만족해 이 면 위에 있다. 원자는 이 세 변을 따라 맞닿아 있다. {111}이 서로 평행하지 않은 면 4개이고 면마다 ⟨110⟩이 3개씩이라 slip system이 12개가 된다.

<figure class="fig">
<svg viewBox="0 0 400 275" style="width:min(400px,100%)" role="img" aria-label="FCC 단위정 위에 (1 −1 1) 면을 삼각형으로 칠하고, 그 면의 윗변을 따라 [110] 방향 화살표를 그림. 삼각형 위의 꼭짓점 원자 세 개와 면 중심 원자 세 개를 빨강으로 표시">
<g transform="translate(20 35)">
<path d="M200 200L60 60L270 15Z" fill="var(--accent)" opacity="0.12"/>
<g fill="none" stroke="currentColor" stroke-width="1.5">
<path d="M130 155H270M130 155V15M60 200L130 155" stroke-dasharray="4 4" opacity="0.55"/>
<path d="M60 200H200V60H60ZM200 200L270 155V15L200 60M60 60L130 15H270"/>
</g>
<path d="M200 200L60 60L270 15Z" fill="none" stroke="var(--accent)" stroke-width="1.2" opacity="0.7"/>
<g fill="currentColor" opacity="0.3">
<circle cx="200" cy="85" r="9"/><circle cx="95" cy="107.5" r="9"/><circle cx="165" cy="177.5" r="9"/><circle cx="130" cy="155" r="9"/>
</g>
<g fill="currentColor">
<circle cx="60" cy="200" r="9"/><circle cx="200" cy="60" r="9"/><circle cx="270" cy="155" r="9"/><circle cx="130" cy="15" r="9"/>
</g>
<g fill="var(--accent)">
<circle cx="200" cy="200" r="9"/><circle cx="60" cy="60" r="9"/><circle cx="270" cy="15" r="9"/><circle cx="130" cy="130" r="9"/><circle cx="165" cy="37.5" r="9"/><circle cx="235" cy="107.5" r="9"/>
</g>
<path d="M70.8 57.7L251 19.2" stroke="var(--accent)" stroke-width="2.5"/>
<path d="M259.2 17.3L251.2 23.1L249.6 15.3Z" fill="var(--accent)"/>
<g font-size="11" fill="currentColor">
<text x="200" y="230" text-anchor="middle">(1,0,0)</text>
<text x="40" y="64" text-anchor="end">(0,0,1)</text>
<text x="270" y="-9" text-anchor="middle">(1,1,1)</text>
</g>
<text x="290" y="19" font-size="12" fill="currentColor">[110]</text>
<path d="M282 178L192 166" stroke="currentColor" stroke-width="0.8"/>
<text x="287" y="186" font-size="12" fill="currentColor">(1 −1 1) 면</text>
</g>
</svg>
<figcaption>FCC 단위정과 {111} 가운데 하나인 (1 −1 1) 면. 빨간 원자는 이 면 위에 중심이 있는 원자이고, 흐린 원자는 면 밖에 있다. 화살표는 면 안의 close-packed direction [110]으로, 꼭짓점 (0,0,1)에서 (1,1,1)까지 윗면 대각선을 따라간다. 이 투영에서는 (111) 삼각형이 거의 옆에서 보여서, 같은 {111} 묶음이면서 정면으로 보이는 면을 골랐다. 원자 크기는 줄여 그렸다.</figcaption>
</figure>

**HCP.** basal plane(바닥면) (0001)의 원자 배열은 FCC (111)과 똑같은 육각 배열이고 PD도 같다. 다만 HCP에서 close-packed plane은 바닥면 한 방향뿐이다. 그 면 위의 ⟨1 1 −2 0⟩ 세 방향이 쉬운 slip system 3개를 이룬다.

**BCC.** close-packed direction은 있다. 체대각선 ⟨111⟩을 따라 꼭짓점, 체심, 꼭짓점 원자가 맞닿아 LD가 1/(2r)다. close-packed plane은 없다. 가장 빽빽한 {110}의 PD는 3/(8√<span class="rt">2</span> r²)로, 육각 배열 값과의 비가 (3/4)√<span class="rt">3/2</span> ≈ 0.92다. (110) 면 위에서 체심 원자와 꼭짓점 원자 사이는 √<span class="rt">3</span> a/2 = 2r이라 맞닿지만, [001]로 이웃한 꼭짓점 원자끼리는 a ≈ 2.31r이라 0.31r만큼 떨어져 있다. 그래서 면 안에서 원자 하나가 닿는 이웃이 육각 배열의 6개보다 적은 4개다.

## 같은 배율로 본 세 면

원자 반지름을 똑같이 맞추고 세 면을 나란히 그리면 PD 차이가 눈에 보인다.

<figure class="fig">
<svg viewBox="0 0 600 220" style="width:min(600px,100%)" role="img" aria-label="같은 원자 반지름으로 그린 세 면의 원자 배열. 왼쪽 FCC (111) 육각 배열, 가운데 FCC (100) 정사각 배열, 오른쪽 BCC (110) 직사각형 중심 배열. 각 배열에 2차원 단위 넓이를 빨간 선으로 표시">
<g fill="currentColor" opacity="0.3">
<circle cx="37" cy="35" r="14"/><circle cx="65" cy="35" r="14"/><circle cx="93" cy="35" r="14"/><circle cx="121" cy="35" r="14"/><circle cx="149" cy="35" r="14"/><circle cx="51" cy="59.2" r="14"/><circle cx="79" cy="59.2" r="14"/><circle cx="107" cy="59.2" r="14"/><circle cx="135" cy="59.2" r="14"/><circle cx="163" cy="59.2" r="14"/><circle cx="37" cy="83.5" r="14"/><circle cx="65" cy="83.5" r="14"/><circle cx="93" cy="83.5" r="14"/><circle cx="121" cy="83.5" r="14"/><circle cx="149" cy="83.5" r="14"/><circle cx="51" cy="107.7" r="14"/><circle cx="79" cy="107.7" r="14"/><circle cx="107" cy="107.7" r="14"/><circle cx="135" cy="107.7" r="14"/><circle cx="163" cy="107.7" r="14"/>
<circle cx="240.6" cy="35" r="14"/><circle cx="280.2" cy="35" r="14"/><circle cx="319.8" cy="35" r="14"/><circle cx="359.4" cy="35" r="14"/><circle cx="240.6" cy="74.6" r="14"/><circle cx="280.2" cy="74.6" r="14"/><circle cx="319.8" cy="74.6" r="14"/><circle cx="359.4" cy="74.6" r="14"/><circle cx="240.6" cy="114.2" r="14"/><circle cx="280.2" cy="114.2" r="14"/><circle cx="319.8" cy="114.2" r="14"/><circle cx="359.4" cy="114.2" r="14"/><circle cx="260.4" cy="54.8" r="14"/><circle cx="300" cy="54.8" r="14"/><circle cx="339.6" cy="54.8" r="14"/><circle cx="260.4" cy="94.4" r="14"/><circle cx="300" cy="94.4" r="14"/><circle cx="339.6" cy="94.4" r="14"/>
<circle cx="431.4" cy="35" r="14"/><circle cx="477.1" cy="35" r="14"/><circle cx="522.9" cy="35" r="14"/><circle cx="568.6" cy="35" r="14"/><circle cx="431.4" cy="67.3" r="14"/><circle cx="477.1" cy="67.3" r="14"/><circle cx="522.9" cy="67.3" r="14"/><circle cx="568.6" cy="67.3" r="14"/><circle cx="431.4" cy="99.7" r="14"/><circle cx="477.1" cy="99.7" r="14"/><circle cx="522.9" cy="99.7" r="14"/><circle cx="568.6" cy="99.7" r="14"/><circle cx="431.4" cy="132" r="14"/><circle cx="477.1" cy="132" r="14"/><circle cx="522.9" cy="132" r="14"/><circle cx="568.6" cy="132" r="14"/><circle cx="454.3" cy="51.2" r="14"/><circle cx="500" cy="51.2" r="14"/><circle cx="545.7" cy="51.2" r="14"/><circle cx="454.3" cy="83.5" r="14"/><circle cx="500" cy="83.5" r="14"/><circle cx="545.7" cy="83.5" r="14"/><circle cx="454.3" cy="115.8" r="14"/><circle cx="500" cy="115.8" r="14"/><circle cx="545.7" cy="115.8" r="14"/>
</g>
<path d="M79 59.2L107 59.2L121 83.5L93 83.5ZM280.2 35L319.8 35L319.8 74.6L280.2 74.6ZM477.1 67.3L522.9 67.3L522.9 99.7L477.1 99.7Z" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
<g fill="currentColor" text-anchor="middle">
<text x="100" y="172" font-size="13" font-weight="600">FCC (111)</text>
<text x="100" y="190" font-size="12">PD ≈ 0.289/r²</text>
<text x="100" y="207" font-size="11">최댓값 대비 1.00</text>
<text x="300" y="172" font-size="13" font-weight="600">FCC (100)</text>
<text x="300" y="190" font-size="12">PD = 0.250/r²</text>
<text x="300" y="207" font-size="11">최댓값 대비 0.87</text>
<text x="500" y="172" font-size="13" font-weight="600">BCC (110)</text>
<text x="500" y="190" font-size="12">PD ≈ 0.265/r²</text>
<text x="500" y="207" font-size="11">최댓값 대비 0.92</text>
</g>
</svg>
<figcaption>세 면 모두 원자 반지름 r을 같게 그렸다. 빨간 선은 2차원 단위 넓이다. FCC (111)은 마름모 2√<span class="rt">3</span> r²에 원자 1개, FCC (100)은 정사각형 8r²에 2개, BCC (110)은 직사각형 16√<span class="rt">2</span> r²/3에 2개가 들어간다. FCC (111)만 원자 하나가 이웃 6개와 맞닿는다. BCC (110)은 가로로 이웃한 원자 사이에 틈이 보인다.</figcaption>
</figure>

## slip과 Si 웨이퍼에서

**slip.** 금속은 대개 가장 빽빽한 면 위에서, 가장 빽빽한 방향으로 미끄러진다. 빽빽한 면일수록 면 간격 d가 넓고, 빽빽한 방향일수록 한 번에 옮겨 가는 거리 b가 짧아서 dislocation(전위)이 움직이기 쉽다. FCC는 이 조건을 갖춘 {111}⟨110⟩이 12개라 잘 늘어난다. BCC는 close-packed plane이 없어 {110}, {112}, {123} 위에서 ⟨111⟩로 미끄러진다. 왜 이 차이가 저온 거동까지 갈라놓는지는 [FCC, BCC](/concepts/fcc-bcc)의 Peierls stress와 dislocation core 부분에 정리했다.

<span class="lv">반도체공정</span> **Si 웨이퍼.** Si는 diamond cubic 구조로, FCC lattice의 격자점마다 원자 두 개((0,0,0)과 (¼,¼,¼))를 놓은 모양이다. lattice parameter는 5.431 Å이다. 면밀도는 원자 한 장 기준으로 이렇게 센다.

- (100): FCC lattice의 (100) 면처럼 a² 안에 2개가 있다. (¼,¼,¼) 쪽 원자는 a/4 떨어진 다른 면에 있다.
- (110): a × √<span class="rt">2</span> a 직사각형 안에 lattice 원자 2개와 (¼,¼,¼) 쪽 원자 2개가 같은 면에 놓여 4개다.
- (111): lattice 원자만 한 장에 놓이고, 넓이 √<span class="rt">3</span> a²/4당 1개다. (¼,¼,¼) 쪽 원자는 다음 lattice 면 바로 아래에 붙어 두 장이 짝을 이룬다(bilayer). 표의 값은 그중 한 장 기준이다.

| 면 | 원자 수 / 넓이 | 면밀도 (cm⁻²) | 표면 원자 하나의 끊긴 결합 | 끊긴 결합 밀도 (cm⁻²) |
|---|---|---|---|---|
| (100) | 2/a² | 6.78 × 10¹⁴ | 2 | 1.36 × 10¹⁵ |
| (110) | 4/(√<span class="rt">2</span> a²) | 9.59 × 10¹⁴ | 1 | 9.59 × 10¹⁴ |
| (111) | 4/(√<span class="rt">3</span> a²) | 7.83 × 10¹⁴ | 1 | 7.83 × 10¹⁴ |

원자 한 장만 보면 (110)이 가장 빽빽하다. 그런데 공정에서 특별한 면은 {111}이다.

- **cleavage(벽개).** Si는 {111}을 따라 가장 잘 쪼개진다. bilayer 사이 넓은 틈을 가르면 원자 하나당 결합 하나만 끊기고, 면적당 끊기는 결합 수가 세 면 가운데 가장 적다. 표면 에너지가 그만큼 낮다.
- **KOH etch stop.** KOH 같은 알칼리 용액으로 습식 식각하면 {111}이 (100)보다 훨씬 느리게 깎인다. {111} 표면 원자는 결합 넷 가운데 셋이 아래층에 묶여 있고, (100)은 둘이다. 이 결합 수 차이로 흔히 설명하지만, 세부 메커니즘은 모델마다 다르다. (100) 웨이퍼에 마스크를 열고 깎으면 {111} 면이 옆벽으로 남는다. (100)과 (111)의 법선이 이루는 각은 cos θ = 1/√<span class="rt">3</span>에서 54.74°이고, 이 각도의 V-groove와 cavity가 생긴다.

MOSFET에 (100) 웨이퍼를 쓰는 이유, 면방위에 따른 열산화 속도 차이는 [FCC, BCC](/concepts/fcc-bcc)의 반도체 부분에 있다.

## 스스로 확인

자주 헷갈리는 질문들이다. 답을 먼저 떠올린 뒤 펼쳐 본다.

<details>
<summary>1. BCC에는 close-packed direction이 있는데 close-packed plane은 없다. 어떻게 가능한가?</summary>
<p>방향과 면은 따로 판단한다. ⟨111⟩을 따라서는 원자가 맞닿아 LD가 최댓값 1/(2r)다. 면은 가장 빽빽한 {110}도 원자 하나가 면 안에서 이웃 4개와만 닿고, PD가 육각 배열의 약 0.92배다. 원자가 맞닿은 줄이 있어도 그 줄을 육각 배열로 깔 수는 없는 구조다.</p>
</details>

<details>
<summary>2. cubic에서 (100)과 (001)은 같은 면인가?</summary>
<p>서로 다른 면이지만 대칭으로 같은 면이라 둘 다 {100}에 속하고 PD도 같다. a = b = c이고 세 축이 대칭이라서 그렇다. c가 다른 tetragonal 구조(예: BCT인 martensite)에서는 (100)과 (001)이 같지 않다.</p>
</details>

<details>
<summary>3. "⟨110⟩은 {111} 안에 놓인다"고 했다. 그럼 [110]은 (111) 위에 있는가?</summary>
<p>아니다. 1·1 + 1·1 + 1·0 = 2라 hu + kv + lw = 0을 만족하지 않는다. (111) 위에 있는 ⟨110⟩은 [1 −1 0], [1 0 −1], [0 1 −1] 세 개다. 묶음끼리의 관계를 말할 때는 각 면에 그 묶음 가운데 일부가 놓인다는 뜻이다.</p>
</details>

<details>
<summary>4. cubic에서 [111] 방향과 (111) 면은 어떤 관계인가?</summary>
<p>수직이다. cubic에서는 같은 지수의 방향이 면의 법선이 된다. HCP나 tetragonal처럼 축 길이나 각도가 다른 결정계에서는 일반적으로 성립하지 않는다.</p>
</details>

<details>
<summary>5. Si에서 {111}이 etch stop이고 cleavage plane이니 원자가 가장 빽빽한 면인가?</summary>
<p>아니다. 원자 한 장 기준 면밀도는 (110)이 9.59 × 10¹⁴ cm⁻²로 가장 높고 (111)은 7.83 × 10¹⁴ cm⁻²다. {111}이 특별한 건 표면 원자가 아래층과 결합 셋으로 묶여 있고, bilayer 사이를 가를 때 끊기는 결합 밀도가 가장 낮아서다. 금속의 close-packed plane 논리를 공유결합 결정에 그대로 옮기면 틀린다.</p>
</details>

<details>
<summary>6. 면밀도가 가장 높은 면이 열산화도 가장 빠른가?</summary>
<p>그렇게 단순하지 않다. 계면 반응 속도는 계면 원자 밀도에서 출발해 설명하지만, 두꺼운 영역의 산화 속도 순서는 (111) &gt; (110) &gt; (100)이라 면밀도 순서 (110) &gt; (111) &gt; (100)과 어긋난다. 산화막 응력 같은 요인을 더해야 순서가 맞는다. 자세한 내용은 <a href="/concepts/fcc-bcc">FCC, BCC</a>의 열산화 부분에 있다.</p>
</details>
