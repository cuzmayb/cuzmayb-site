---
title: FCC, BCC
date: 2026-11-28
group: 결정 구조
summary: FCC와 BCC의 성질 차이는 close-packed plane과 APF(atomic packing factor)에서 나온다.
tags:
  - 결정 구조
  - FCC
  - BCC
---

## 진짜 의미를 찾아서

FCC와 BCC를 처음 공부할 때 원자 수, coordination number(배위수), APF를 외웠다. FCC 0.74, BCC 0.68. 그리고 "더 빽빽하니까 성질이 다르겠지" 하고 넘어갔다.

그러다 slip system(슬립계) 개수를 보고 막혔다. FCC는 12개인데 BCC는 세는 방식에 따라 48개까지 된다. 미끄러질 길이 더 많은 BCC가 왜 덜 늘어나고, 저온에서는 깨지기까지 할까.

원자 수, close-packed plane(최밀면), APF를 외워서는 FCC와 BCC의 성질이 어떻게 결정되는지 이해할 수 없었다. 그래서 원리를 다시 파고들었다. 이 페이지는 그렇게 다시 이해한 내용을 정리한 것이다.

## 두 구조의 모양

FCC(face-centered cubic, 면심입방)는 정육면체 unit cell(단위정)의 꼭짓점 8곳과 면 6곳의 중심에 원자가 있다.

<figure class="fig">
<svg viewBox="0 0 330 240" role="img" aria-label="FCC 단위정. 꼭짓점 원자 여덟 개와 면 중심 원자 여섯 개">
<g fill="none" stroke="currentColor" stroke-width="1.5">
<path d="M130 155H270M130 155V15M60 200L130 155" stroke-dasharray="4 4" opacity="0.55"/>
<path d="M60 200H200V60H60ZM200 200L270 155V15L200 60M60 60L130 15H270"/>
</g>
<g fill="var(--accent)">
<circle cx="130" cy="130" r="10"/><circle cx="200" cy="85" r="10"/><circle cx="95" cy="107.5" r="10"/><circle cx="235" cy="107.5" r="10"/><circle cx="165" cy="37.5" r="10"/><circle cx="165" cy="177.5" r="10"/>
</g>
<g fill="currentColor">
<circle cx="60" cy="200" r="10"/><circle cx="200" cy="200" r="10"/><circle cx="200" cy="60" r="10"/><circle cx="60" cy="60" r="10"/><circle cx="130" cy="155" r="10"/><circle cx="270" cy="155" r="10"/><circle cx="270" cy="15" r="10"/><circle cx="130" cy="15" r="10"/>
</g>
<text x="130" y="228" font-size="13" text-anchor="middle" fill="currentColor">a</text>
</svg>
<figcaption>FCC unit cell. 남색은 꼭짓점 원자, 빨강은 면 중심 원자. 원자는 면 대각선 방향으로 맞닿는다. 원자 크기는 보기 쉽게 줄여 그렸다.</figcaption>
</figure>

BCC(body-centered cubic, 체심입방)는 꼭짓점 8곳과 정육면체 한가운데 1곳에 원자가 있다.

<figure class="fig">
<svg viewBox="0 0 330 240" role="img" aria-label="BCC 단위정. 꼭짓점 원자 여덟 개와 체심 원자 한 개, 체대각선 표시">
<g fill="none" stroke="currentColor" stroke-width="1.5">
<path d="M130 155H270M130 155V15M60 200L130 155" stroke-dasharray="4 4" opacity="0.55"/>
<path d="M60 200H200V60H60ZM200 200L270 155V15L200 60M60 60L130 15H270"/>
<path d="M60 200L270 15" stroke="var(--accent)" stroke-dasharray="2 4" opacity="0.8"/>
</g>
<circle cx="165" cy="107.5" r="10" fill="var(--accent)"/>
<g fill="currentColor">
<circle cx="60" cy="200" r="10"/><circle cx="200" cy="200" r="10"/><circle cx="200" cy="60" r="10"/><circle cx="60" cy="60" r="10"/><circle cx="130" cy="155" r="10"/><circle cx="270" cy="155" r="10"/><circle cx="270" cy="15" r="10"/><circle cx="130" cy="15" r="10"/>
</g>
<text x="130" y="228" font-size="13" text-anchor="middle" fill="currentColor">a</text>
</svg>
<figcaption>BCC unit cell. 남색은 꼭짓점 원자, 빨강은 체심 원자. 원자는 점선으로 그린 체대각선(⟨111⟩) 방향으로 맞닿는다.</figcaption>
</figure>

## 숫자로 보기

| 항목 | FCC | BCC |
|---|---|---|
| unit cell 안의 원자 수 | 8 × 1/8 + 6 × 1/2 = 4 | 8 × 1/8 + 1 = 2 |
| coordination number | 12 | 8 |
| 원자가 맞닿는 방향 | 면 대각선: √2 a = 4r | 체대각선: √3 a = 4r |
| lattice parameter(격자상수)와 원자 반지름 | a = 2√2 r | a = 4r/√3 |
| APF | π/(3√2) ≈ 0.74 | π√3/8 ≈ 0.68 |
| close-packed plane | {111} | 없음 ({110}이 가장 조밀하지만 최밀면은 아님) |
| close-packed direction | ⟨110⟩ | ⟨111⟩ |
| 주 slip system | {111}⟨110⟩ 12개 | {110}⟨111⟩ 12개, {112}·{123}까지 치면 48개 |
| 저온 거동 | ductility(연성) 유지 | DBTT(ductile-to-brittle transition, 연성-취성 전이) |
| 대표 금속 | Cu, Al, Ni, Ag, Au, γ-Fe | α-Fe, Cr, Mo, W, Ta, V, Nb |

APF는 unit cell 부피 가운데 원자가 차지하는 비율이다.

- FCC: 4 × (4/3)πr³ ÷ (2√2 r)³ = π/(3√2) ≈ **0.74**. 같은 크기의 공을 쌓아서 얻을 수 있는 가장 높은 값이다.
- BCC: 2 × (4/3)πr³ ÷ (4r/√3)³ = π√3/8 ≈ **0.68**

### 반도체 배선·패키징에 쓰이는 금속

| 구조 | 금속 | 쓰이는 곳 |
|---|---|---|
| FCC | Cu | 배선(BEOL interconnect), TSV, RDL, Cu pillar bump |
| FCC | Al | bond pad, 예전 배선 |
| FCC | Au | wire bonding, 표면 마감(ENIG) |
| FCC | Ni | UBM(under bump metallization), 도금 seed·barrier |
| FCC | Ag | die attach용 sintering paste, solder 합금 성분 |
| BCC | W | contact·via plug |
| BCC | Ta | Cu diffusion barrier (Ta/TaN). 공정에 따라 BCC인 α-Ta 대신 tetragonal β-Ta가 생기기도 한다 |
| BCC | Cr | UBM adhesion layer |

배선 금속이 대부분 FCC인 건 전도도가 높고, 얇게 뽑고 눌러 붙여도 버티는 ductility가 있어서다. BCC 쪽(W, Ta)은 melting point(녹는점)가 높고 diffusion이 느려서 plug와 barrier로 쓴다.

## 판단하는 순서

결정구조에서 성질을 읽을 때는 두 갈래로 나눠 본다.

| 갈래 | 순서 | 설명하는 성질 |
|---|---|---|
| 기계적 거동 | close-packed plane이 있나 → dislocation(전위)이 쉽게 움직이나 | ductility, strength, DBTT |
| 부피·이동 | APF·coordination number → interstitial site(틈새 자리) 크기 | density, solid solubility(고용도), diffusion |

## 기계적 거동: close-packed plane이 갈라놓는다

금속이 늘어나는 건 원자면이 한 칸씩 미끄러지기 때문이다. 실제로는 면 전체가 한 번에 미끄러지지 않고, dislocation이라는 선 결함이 면 위를 지나가면서 한 줄씩 옮겨 간다. 그래서 "얼마나 잘 늘어나나"는 "dislocation이 얼마나 쉽게 움직이나"와 같은 질문이다.

### 격자의 저항: Peierls stress

dislocation이 한 칸 움직일 때마다 원자들은 에너지 언덕을 하나씩 넘는다. 이 언덕을 넘는 데 필요한 응력이 Peierls stress(τ_P)이고, Peierls-Nabarro model은 이렇게 근사한다.

**τ_P ≈ [2G / (1 − ν)] · exp(−2π w / b)**

- G: shear modulus(전단 탄성계수), ν: Poisson's ratio
- b: Burgers vector 크기, 한 번 미끄러질 때 옮겨 가는 거리
- w: dislocation width(전위 폭). slip plane 사이 간격 d에 비례하고, edge dislocation은 w ≈ d/(1 − ν), screw dislocation은 w ≈ d다.

w, 곧 d가 크고 b가 작을수록 exponential 항이 빠르게 작아진다. 면 사이가 넓고 한 걸음이 짧을수록 잘 미끄러진다는 뜻이다. close-packed plane은 원자가 빽빽해서 면 간격 d가 가장 넓고, close-packed direction은 원자 사이가 가장 가까워 b가 가장 짧다. slip이 close-packed plane과 direction에서 일어나는 이유다.

이 식은 dislocation core가 한 면 위에 납작하게 놓여 있다고 가정해서 유도한 근사이고, 앞의 계수와 지수 표기는 교재마다 조금씩 다르다. 절대값보다 d/b에 지수적으로 민감하다는 경향을 읽는 데 쓴다.

<figure class="fig">
<svg viewBox="0 0 650 240" style="width:min(650px,100%)" role="img" aria-label="왼쪽: slip plane 위아래 원자층과 면 간격 d, Burgers vector b, 주기적인 에너지 언덕. 오른쪽: FCC는 한 면 위로 퍼진 dislocation core, BCC screw dislocation core는 세 면 쪽으로 퍼짐">
<g fill="currentColor" opacity="0.85">
<circle cx="30" cy="70" r="14"/><circle cx="70" cy="70" r="14"/><circle cx="110" cy="70" r="14"/><circle cx="150" cy="70" r="14"/><circle cx="190" cy="70" r="14"/><circle cx="230" cy="70" r="14"/>
</g>
<g fill="currentColor" opacity="0.45">
<circle cx="50" cy="103" r="14"/><circle cx="90" cy="103" r="14"/><circle cx="130" cy="103" r="14"/><circle cx="170" cy="103" r="14"/><circle cx="210" cy="103" r="14"/>
</g>
<path d="M14 86.5H250" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="5 4"/>
<g stroke="currentColor" stroke-width="1.2" fill="none">
<path d="M70 44V40H110V44"/>
<path d="M258 70V103M254 70H262M254 103H262"/>
</g>
<text x="90" y="34" font-size="12" text-anchor="middle" fill="currentColor">b</text>
<text x="268" y="91" font-size="12" fill="currentColor">d</text>
<text x="14" y="140" font-size="11" fill="currentColor">에너지</text>
<path d="M20 185Q30 160 40 185T60 185T80 185T100 185T120 185T140 185T160 185T180 185T200 185T220 185T240 185" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
<text x="130" y="220" font-size="11" text-anchor="middle" fill="currentColor">한 칸(b)마다 넘는 언덕 = Peierls barrier</text>
<path d="M300 80H420" stroke="currentColor" stroke-width="1.5"/>
<rect x="335" y="76" width="50" height="8" fill="var(--accent)" opacity="0.3"/>
<g stroke="var(--accent)" stroke-width="2"><path d="M335 80V64M327 80H343"/><path d="M385 80V64M377 80H393"/></g>
<text x="425" y="84" font-size="11" fill="currentColor">{111}</text>
<text x="360" y="108" font-size="11" text-anchor="middle" fill="currentColor">stacking fault</text>
<text x="360" y="150" font-size="11" text-anchor="middle" fill="currentColor">FCC: Shockley partial 2개로</text>
<text x="360" y="165" font-size="11" text-anchor="middle" fill="currentColor">한 면 위에 퍼진 planar core</text>
<g stroke="currentColor" stroke-width="1" opacity="0.6"><path d="M515 75H615"/><path d="M540 118L590 32"/><path d="M590 118L540 32"/></g>
<g fill="var(--accent)" opacity="0.45">
<ellipse cx="565" cy="75" rx="24" ry="6"/><ellipse cx="565" cy="75" rx="24" ry="6" transform="rotate(60 565 75)"/><ellipse cx="565" cy="75" rx="24" ry="6" transform="rotate(120 565 75)"/>
</g>
<text x="565" y="150" font-size="11" text-anchor="middle" fill="currentColor">BCC screw dislocation:</text>
<text x="565" y="165" font-size="11" text-anchor="middle" fill="currentColor">{110} 세 면 쪽으로 퍼진</text>
<text x="565" y="180" font-size="11" text-anchor="middle" fill="currentColor">non-planar core</text>
<text x="565" y="195" font-size="11" text-anchor="middle" fill="currentColor">(⟨111⟩ 축을 따라 본 모습)</text>
</svg>
<figcaption>왼쪽: slip plane(빨간 점선) 위아래 원자층. 한 칸 b씩 미끄러질 때마다 Peierls barrier를 하나씩 넘는다. 오른쪽: dislocation core 모양. FCC는 옆에서, BCC는 ⟨111⟩ 축을 따라 내려다본 모식도이고 축척은 맞지 않다.</figcaption>
</figure>

### 식만으로는 FCC와 BCC가 갈리지 않는다

주 slip system의 d/b를 직접 계산해 보면 의외의 결과가 나온다.

| | slip system | d | b | d/b |
|---|---|---|---|---|
| FCC | {111}⟨110⟩ | a/√3 | a/√2 | √(2/3) ≈ 0.816 |
| BCC | {110}⟨111⟩ | a/√2 | √3a/2 | √(2/3) ≈ 0.816 |

두 값이 정확히 같다. 위 식대로라면 Peierls stress도 비슷해야 한다. 그런데 실제 BCC 금속의 저온 flow stress(유동 응력)는 FCC보다 훨씬 크고 온도에 민감하다. 차이는 dislocation core(전위 중심부)의 모양에서 나온다. Peierls-Nabarro 식의 가정이 FCC에는 맞고 BCC에는 맞지 않는 것이다.

- **FCC.** close-packed plane {111} 위에서 dislocation이 두 개의 Shockley partial dislocation으로 갈라지고, 그 사이에 stacking fault(적층결함) 띠가 생긴다. partial의 Burgers vector는 a/√6으로 더 짧아서 d/b가 √2 ≈ 1.41로 커진다. core가 한 면 위에 납작하게 퍼져 있어(planar core) 그 면을 따라 쉽게 미끄러지고, 격자 저항이 작아 온도에 거의 영향받지 않는다.
- **BCC.** 납작하게 퍼질 close-packed plane이 없다. ½⟨111⟩ screw dislocation의 core는 ⟨111⟩ 축을 공유하는 {110} 세 면 쪽으로 입체적으로 퍼진다(non-planar core). 움직이려면 선 전체가 한 번에 넘어가지 못하고, 짧은 구간이 한 칸 튀어 나가는 kink-pair를 만든 뒤 그 kink가 옆으로 번지며 전진한다. 이 과정은 thermal activation(열활성화)에 기대기 때문에 온도가 낮아질수록 급격히 어려워진다.

온도가 충분히 낮아지면 dislocation을 움직이는 데 필요한 응력이 균열이 자라는 응력(cleavage stress)보다 커진다. 그러면 늘어나기 전에 먼저 깨진다. 이게 DBTT다. FCC는 저온에서도 flow stress가 크게 오르지 않아, 균열 끝에서 dislocation이 계속 나와 응력을 풀어 준다. 그래서 이 전이가 거의 나타나지 않는다. 구조용 강(BCC)을 설계할 때 DBTT를 따로 관리하는 이유다.

정리하면 close-packed plane이 하는 일은 두 가지다. d/b가 큰 slip system을 만들고, dislocation이 그 한 면 위에 납작하게 퍼질 자리를 준다. slip system 개수만 세면 "BCC가 더 잘 휜다"는 틀린 결론이 나온다.

## 부피·이동: 여기서 APF가 쓰인다

APF 차이(0.74 대 0.68)는 ductility 차이를 설명하기엔 작다. 대신 원자 사이 빈 공간, 즉 interstitial site에 들어가는 원소를 다룰 때 쓰인다.

여기서 한 번 더 헷갈린다. BCC가 빈 공간이 더 많은데, 탄소는 FCC인 γ-Fe에 훨씬 많이 녹는다. γ-Fe의 최대 solid solubility는 약 2.1 wt%, BCC인 α-Fe는 약 0.02 wt%다.

이유는 빈 공간이 어떻게 나뉘어 있느냐다. FCC의 octahedral site(팔면체 틈새)는 둘러싼 원자 6개가 모두 같은 거리에 있어서 큰 자리 하나로 모여 있다(r/R ≈ 0.414). BCC는 빈 공간 총량은 많아도 작은 자리 여러 개로 쪼개져 있다. octahedral site는 한 축 방향으로 원자 두 개가 바짝 붙어 있어 r/R ≈ 0.155밖에 안 되고, 가장 큰 tetrahedral site(사면체 틈새)도 r/R ≈ 0.291이다.

<figure class="fig">
<svg viewBox="0 0 520 240" style="width:min(520px,100%)" role="img" aria-label="FCC octahedral site와 BCC octahedral site를 같은 배율로 비교. 탄소 원자 크기를 점선 원으로 겹쳐 그림">
<g fill="currentColor" opacity="0.45">
<circle cx="87.6" cy="110" r="30"/><circle cx="172.4" cy="110" r="30"/><circle cx="130" cy="67.6" r="30"/><circle cx="130" cy="152.4" r="30"/>
</g>
<circle cx="130" cy="110" r="12.4" fill="var(--accent)"/>
<circle cx="130" cy="110" r="18" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-dasharray="4 3"/>
<text x="130" y="208" font-size="12" text-anchor="middle" fill="currentColor">FCC octahedral site</text>
<text x="130" y="225" font-size="12" text-anchor="middle" fill="currentColor">r/R = 0.414</text>
<g fill="currentColor" opacity="0.45">
<circle cx="341" cy="110" r="30"/><circle cx="439" cy="110" r="30"/><circle cx="390" cy="75.4" r="30"/><circle cx="390" cy="144.6" r="30"/>
</g>
<circle cx="390" cy="110" r="4.7" fill="var(--accent)"/>
<circle cx="390" cy="110" r="18" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-dasharray="4 3"/>
<text x="390" y="208" font-size="12" text-anchor="middle" fill="currentColor">BCC octahedral site</text>
<text x="390" y="225" font-size="12" text-anchor="middle" fill="currentColor">r/R = 0.155 (tetrahedral은 0.291)</text>
</svg>
<figcaption>Fe 원자 반지름 R을 같은 크기로 맞춘 단면. 빨간 원이 틈새에 들어갈 수 있는 가장 큰 원자, 점선 원이 탄소(r/R 약 0.6)다. 탄소는 어느 쪽에도 그냥은 안 들어가서 주변 Fe를 밀어내며 자리를 잡는다. FCC 쪽이 훨씬 덜 밀어내도 된다. BCC 단면은 위아래 원자가 a/2, 좌우 원자가 a/√2 떨어진 (1 −1 0)면이다.</figcaption>
</figure>

반대로 탄소의 diffusion은 α-Fe에서 더 빠르다. 덜 빽빽한 구조라 interstitial site 사이를 건너가는 길이 열려 있기 때문이다. solid solubility는 FCC가, diffusion은 BCC가 유리한 셈이다.

## 철 하나로 두 구조를 다 본다

순철은 온도에 따라 구조가 바뀐다. 912 ℃ 아래는 BCC인 α-Fe(ferrite), 912~1394 ℃는 FCC인 γ-Fe(austenite), 1394 ℃부터 melting point 1538 ℃까지는 다시 BCC인 δ-Fe(δ-ferrite)다. 탄소가 들어가면 이 경계 온도가 바뀌고, 그 지도가 Fe-Fe₃C phase diagram(상태도)이다.

<figure class="fig">
<svg viewBox="0 0 580 420" style="width:min(580px,100%)" role="img" aria-label="Fe-Fe3C 상태도 단순화. 가로축 탄소 0에서 4.5 wt%, 세로축 600에서 1600도">
<g stroke="currentColor" stroke-width="1.2" fill="none">
<path d="M60 20V380H540"/>
<path d="M166.7 380v5M273.3 380v5M380 380v5M486.7 380v5M55 334.3h5M55 267.7h5M55 183.1h5M55 94.2h5M55 42.3h5"/>
</g>
<g font-size="11" fill="currentColor">
<text x="60" y="398" text-anchor="middle">0</text><text x="166.7" y="398" text-anchor="middle">1</text><text x="273.3" y="398" text-anchor="middle">2</text><text x="380" y="398" text-anchor="middle">3</text><text x="486.7" y="398" text-anchor="middle">4</text>
<text x="300" y="415" text-anchor="middle">C (wt%)</text>
<text x="52" y="338" text-anchor="end">727</text><text x="52" y="271" text-anchor="end">912</text><text x="52" y="187" text-anchor="end">1147</text><text x="52" y="98" text-anchor="end">1394</text><text x="52" y="46" text-anchor="end">1538</text>
<text x="12" y="200" transform="rotate(-90 12 200)" text-anchor="middle">온도 (℃)</text>
</g>
<g stroke="currentColor" stroke-width="1.5" fill="none">
<path d="M60 42.3L116.5 57.8L518.7 183.1L540 176"/>
<path d="M60 42.3L69.6 57.8L60 94.2M78.1 57.8L60 94.2M69.6 57.8H116.5"/>
<path d="M78.1 57.8L288.3 183.1H540"/>
<path d="M141.1 334.3L288.3 183.1"/>
<path d="M60 267.7L141.1 334.3"/>
<path d="M60 267.7L62.3 334.3L60 380"/>
<path d="M62.3 334.3H540"/>
</g>
<path d="M141.1 200V380" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="4 4"/>
<g fill="var(--accent)"><circle cx="141.1" cy="334.3" r="3.5"/><circle cx="288.3" cy="183.1" r="3.5"/><circle cx="518.7" cy="183.1" r="3.5"/></g>
<g font-size="12" fill="currentColor">
<text x="330" y="90">L (liquid)</text>
<text x="262" y="142" text-anchor="middle">γ + L</text>
<text x="200" y="225" text-anchor="middle">γ (austenite)</text>
<text x="200" y="241" text-anchor="middle" font-size="11">FCC</text>
<text x="420" y="265" text-anchor="middle">γ + Fe₃C</text>
<text x="88" y="320" text-anchor="middle" font-size="10">α+γ</text>
<text x="340" y="362" text-anchor="middle">α + Fe₃C</text>
<text x="160" y="30">δ-ferrite (BCC)</text>
<text x="150" y="372">α (ferrite, BCC)</text>
</g>
<g stroke="currentColor" stroke-width="0.8" fill="none"><path d="M158 26L64 64"/><path d="M148 368L63 352"/></g>
<g font-size="10" fill="var(--accent)">
<text x="160" y="326">0.76%, 727 ℃ (eutectoid)</text>
<text x="292" y="200">2.14%</text>
<text x="514" y="200" text-anchor="end">4.3%</text>
</g>
<text x="538" y="230" font-size="10" text-anchor="end" fill="currentColor">Fe₃C(6.7%)까지 이어짐 →</text>
</svg>
<figcaption>Fe-Fe₃C phase diagram을 0~4.5 wt% C 구간만 단순화해 그렸다. 빨간 점은 eutectoid point(0.76%, 727 ℃), γ의 최대 solubility(2.14%, 1147 ℃), eutectic point(4.3%, 1147 ℃). 빨간 점선은 아래 그림에서 식히는 0.76% 탄소강이다.</figcaption>
</figure>

quenching(담금질)은 이 변태와 solid solubility 차이를 이용한다. austenite 상태에서 탄소를 녹여 놓은 뒤 어떻게 식히느냐에 따라 결과가 갈린다.

<figure class="fig">
<svg viewBox="0 0 560 230" style="width:min(560px,100%)" role="img" aria-label="austenite에서 서냉하면 pearlite, 급랭하면 martensite가 되는 모식도">
<g fill="none" stroke="currentColor" stroke-width="1.5">
<rect x="10" y="75" width="160" height="80" rx="6"/>
<rect x="370" y="10" width="180" height="90" rx="6"/>
<rect x="370" y="130" width="180" height="90" rx="6"/>
<path d="M170 105L362 55M170 125L362 175"/>
<path d="M352 50L362 55L354 63M352 168L362 175L351 181"/>
</g>
<g fill="none" stroke="currentColor" stroke-width="1.2"><rect x="128" y="95" width="30" height="30"/><rect x="505" y="150" width="26" height="40"/></g>
<circle cx="143" cy="110" r="4" fill="var(--accent)"/>
<circle cx="518" cy="170" r="4" fill="var(--accent)"/>
<g stroke="currentColor" stroke-width="3"><path d="M505 45V90M513 45V90M521 45V90M529 45V90"/></g>
<g stroke="var(--accent)" stroke-width="1.5"><path d="M509 45V90M517 45V90M525 45V90"/></g>
<g font-size="12" fill="currentColor">
<text x="20" y="100">austenite γ</text>
<text x="20" y="118" font-size="11">FCC</text>
<text x="20" y="136" font-size="11">C가 고용된 상태</text>
<text x="380" y="35">pearlite</text>
<text x="380" y="55" font-size="11">ferrite α (BCC)</text>
<text x="380" y="71" font-size="11">+ cementite Fe₃C</text>
<text x="380" y="87" font-size="11">층상 구조</text>
<text x="380" y="155">martensite α′</text>
<text x="380" y="175" font-size="11">BCT, c/a &gt; 1</text>
<text x="380" y="191" font-size="11">C가 갇혀 격자가</text>
<text x="380" y="207" font-size="11">한 축으로 늘어남</text>
</g>
<g font-size="11" fill="currentColor">
<text x="250" y="38" text-anchor="middle">slow cooling (서냉)</text>
<text x="250" y="53" text-anchor="middle">C가 diffusion으로 빠져나감</text>
<text x="250" y="192" text-anchor="middle">quenching (급랭)</text>
<text x="250" y="207" text-anchor="middle">diffusionless, C가 못 빠져나감</text>
</g>
</svg>
<figcaption>0.76% 탄소강을 austenite 구간에서 식히는 두 경로. 빨간 점은 탄소. pearlite의 세로줄은 ferrite(남색)와 cementite(빨강)가 번갈아 쌓인 층을 뜻한다.</figcaption>
</figure>

- **slow cooling.** 727 ℃ 아래에서 austenite가 ferrite로 바뀌는데, ferrite는 탄소를 0.02 wt%밖에 못 녹인다. 남는 탄소는 diffusion으로 모여 cementite(Fe₃C)가 되고, ferrite와 cementite가 층층이 쌓인 pearlite가 된다.
- **quenching.** 탄소가 diffusion할 시간이 없다. FCC에서 BCC로 바뀌려던 격자가 탄소를 품은 채 한 축으로 늘어난 BCT(body-centered tetragonal)로 굳는다. 이게 martensite다. 뒤틀린 격자가 dislocation 이동을 막아서 아주 단단하고 잘 깨진다. 그래서 보통 tempering(뜨임)으로 인성을 일부 되살린다.

## HCP를 같이 보면 확인된다

HCP(hexagonal close-packed)는 APF가 FCC와 같은 0.74이고 coordination number도 12다. close-packed plane을 ABAB로 쌓느냐, ABCABC로 쌓느냐(FCC)만 다르다.

그런데 Mg 같은 HCP 금속은 상온에서 잘 늘어나지 않는다. close-packed plane이 basal plane (0001) 한 방향뿐이라, 쉽게 움직이는 slip system이 그 면 위의 방향 3개밖에 없다. APF가 같아도 ductility는 다르다. 앞에서 세운 판단 순서가 맞다는 확인이 된다.

## 흔한 오해 세 가지

**"APF가 높으면 잘 늘어난다."** FCC와 HCP는 APF가 같은데 ductility가 다르다. ductility는 close-packed plane과 쉽게 움직이는 slip system으로 판단한다.

**"BCC는 slip system이 많으니 더 잘 휜다."** 개수가 많아도 screw dislocation core가 non-planar라 각각이 움직이기 어렵고, 그 어려움이 온도에 민감하다. 그래서 DBTT가 생긴다.

**"Si 열산화 속도는 면밀도로 정해진다."** 절반만 맞다. Deal-Grove model에서 산화 속도는 두 항으로 나뉜다.

| 항 | 무엇이 정하나 | 면방위 의존성 |
|---|---|---|
| linear rate constant B/A | Si/SiO₂ 계면에서 일어나는 반응 | 있음. B/A(111) ≈ 1.68 × B/A(100) |
| parabolic rate constant B | 이미 생긴 산화막(비정질) 속 산화제 diffusion | 고온·두꺼운 산화막에서는 거의 없음 |

계면 반응 속도는 계면의 Si 원자 밀도, 즉 반응 자리 수가 많을수록 빠르다는 설명이 주류다([Deal-Grove model 정리](https://www.iue.tuwien.ac.at/phd/hollauer/node16.html)). 그런데 Si의 면당 원자 수를 계산하면 (110) 9.6 × 10¹⁴ cm⁻² > (111) 7.8 × 10¹⁴ > (100) 6.8 × 10¹⁴ 순서다. 두꺼운 영역의 실제 산화 속도는 (111) > (110) > (100)이라 밀도 순서와 어긋난다. 그래서 면밀도에 산화막 응력을 더한 수정 모델로 설명한다([Irene·Massoud 계열](https://www.cambridge.org/core/journals/mrs-online-proceedings-library-archive/article/abs/thermal-xidation-of-silicon-in-dry-oxygen-the-role-of-crystallographic-orientation/46DF0DAC960195974CC53DE7F06FD85C)).

얇은 초기 영역에서는 (110)이 (111)보다 빠르다가 두꺼워지면 순서가 뒤집히는 crossover도 보고돼 있다. 이 교차는 온도와 산화제에 따라 나타나기도 하고 안 나타나기도 한다. 면밀도는 출발점이고, 응력과 공정 조건까지 봐야 순서가 설명된다.

## 반도체에서는

Si 같은 반도체 결정은 금속과 다른 질문을 던진다. 배선·패키징 금속은 위의 판단 순서를 그대로 쓴다.

| 관점 | 반도체 결정 (Si 등) | 배선·패키징 금속 (Cu, W 등) |
|---|---|---|
| 먼저 묻는 것 | 어느 면·방향이 공정에 유리한가 | 얼마나 변형되고 diffusion하는가 |
| 쓰는 개념 | crystal orientation, 결합 방향성, lattice parameter | slip system, diffusion, solid solubility |
| slip | 없애야 할 defect | 응력을 받아 주는 plastic deformation |

**Si의 구조.** Si는 diamond cubic 구조다. FCC lattice의 격자점마다 원자 두 개((0,0,0)과 (¼,¼,¼))를 놓은 모양이다.

| 항목 | 값 |
|---|---|
| lattice parameter | 5.431 Å |
| coordination number | 4 (sp³ 정사면체 결합) |
| APF | ≈ 0.34 |

결합이 정사면체 방향으로만 뻗어서 이웃이 4개뿐이고, 그만큼 빈 공간이 크다. 같은 FCC lattice라도 원자를 어떻게 놓느냐에 따라 빈 공간이 크게 달라진다.

**방향에 따라 다른 성질.**

| 성질 | 방향·면 의존성 | 공정에서 쓰는 곳 |
|---|---|---|
| Young's modulus(영률) | ⟨100⟩ 약 130 GPa, ⟨111⟩ 약 187 GPa | 웨이퍼·패키지 응력 해석에 방향을 넣어야 함 |
| interface trap density(D_it) | (100)이 (111)보다 낮다는 보고 | MOSFET에 (100) 웨이퍼를 쓰는 이유 중 하나 |
| 열산화 속도 | (111)이 (100)보다 빠름 | 위의 오해 3 참고 |

**slip은 defect.** Si도 고온에서는 {111}⟨110⟩ slip이 일어난다.

- 금속에서는 이게 ductility지만, 웨이퍼에서는 thermal stress로 생긴 slip dislocation이 휨(warpage)과 leakage의 원인이 되어 수율을 떨어뜨린다.
- 웨이퍼가 커질수록 thermal stress와 자중 응력이 커져 slip이 더 잘 생긴다.

**lattice mismatch(격자 불일치).** 서로 다른 결정을 쌓으면 lattice parameter 차이만큼 strain이 생긴다.

- Ge는 Si보다 lattice parameter가 약 4% 크다. SiGe를 Si 위에 올리면 critical thickness(임계 두께)를 넘는 순간 계면에 misfit dislocation이 생긴다.
- 같은 strain을 일부러 걸어 carrier mobility를 높이기도 한다(strain engineering).

**금속과 Si가 만나는 계면.** Cu와 Si는 CTE(coefficient of thermal expansion, 열팽창계수)가 크게 다르다.

<figure class="fig">
<svg viewBox="0 0 520 250" style="width:min(520px,100%)" role="img" aria-label="TSV 단면. 실온과 가열 후를 비교해 Cu가 Si보다 더 팽창해 위로 튀어나오고 계면에 응력이 생김">
<rect x="30" y="60" width="200" height="140" fill="currentColor" opacity="0.12"/>
<rect x="110" y="60" width="40" height="140" fill="var(--accent)" opacity="0.75"/>
<rect x="290" y="60" width="200" height="140" fill="currentColor" opacity="0.12"/>
<path d="M370 50Q390 44 410 50V200H370Z" fill="var(--accent)" opacity="0.75"/>
<g stroke="currentColor" stroke-width="1.5" fill="none">
<path d="M366 100H350M354 96L350 100L354 104M366 150H350M354 146L350 150L354 154"/>
<path d="M414 100H430M426 96L430 100L426 104M414 150H430M426 146L430 150L426 154"/>
<path d="M390 42V30M386 34L390 30L394 34"/>
</g>
<g font-size="12" fill="currentColor">
<text x="130" y="35" text-anchor="middle">실온</text>
<text x="390" y="14" text-anchor="middle">가열 후 (ΔT)</text>
<text x="60" y="135">Si</text><text x="130" y="135" text-anchor="middle" fill="#fff">Cu</text>
<text x="320" y="135">Si</text><text x="390" y="135" text-anchor="middle" fill="#fff">Cu</text>
<text x="420" y="38" font-size="11">Cu protrusion</text>
<text x="300" y="222" font-size="11">계면: Cu는 압축, 주변 Si는 인장</text>
</g>
<g font-size="11" fill="currentColor">
<text x="30" y="222">α_Cu ≈ 17 ppm/K</text>
<text x="30" y="238">α_Si ≈ 2.6 ppm/K</text>
</g>
</svg>
<figcaption>TSV 단면 모식도. 가열하면 Cu가 Si보다 훨씬 많이 늘어나려 하지만 주변 Si에 막혀 계면에 응력이 생기고, 위쪽으로 밀려 나온다(Cu protrusion). 변형량은 보기 쉽게 과장했다.</figcaption>
</figure>

| 항목 | 값 |
|---|---|
| Cu CTE | 약 17 ppm/K |
| Si CTE | 약 2.6 ppm/K |
| ΔT = 200 K일 때 두 재료의 변형 차 | (17 − 2.6) × 10⁻⁶ × 200 ≈ 0.29% |

- 온도가 오르내릴 때마다 계면에 thermal stress가 쌓이고, delamination(박리)이나 Si crack으로 이어질 수 있다.
- 패키지 thermal 해석에서 이 차이가 주된 입력이다.
- 이때 FCC인 Cu가 plastic deformation으로 응력을 얼마나 받아 주느냐는 앞의 금속 쪽 판단 순서로 돌아온다.

## 내 프로젝트에서

[TGV 구리 충전](/projects/tgv-copper-filling)에서 유리 위에 Ni seed 층을 깔고 그 위에 Cu를 도금했다. Ni와 Cu는 둘 다 FCC이고 lattice parameter는 3.523 Å과 3.615 Å이다. lattice mismatch는 (3.615 − 3.523) ÷ 3.523 ≈ 2.6%로, Si 위에 Ge를 올릴 때(약 4%)보다 작다. 이 수치를 두 층의 계면이 안정할 것이라는 근거로 썼다.

## 스스로 확인

자주 헷갈리는 질문들이다. 답을 먼저 떠올린 뒤 펼쳐 본다.

<details>
<summary>1. FCC와 HCP는 APF가 0.74로 같다. 그럼 ductility도 같은가?</summary>
<p>아니다. 둘 다 close-packed plane이 있지만 FCC는 {111}이 네 방향으로 있어 slip system이 12개고, HCP는 basal plane 하나뿐이라 상온에서 쉬운 slip system이 3개다. ductility는 쉽게 움직이는 slip system으로 판단한다.</p>
</details>

<details>
<summary>2. BCC는 slip system이 48개로 FCC(12개)보다 많다. 그럼 더 잘 늘어나는가?</summary>
<p>아니다. 개수는 많아도 screw dislocation core가 {110} 세 면 쪽으로 퍼진 non-planar 구조라 움직이기 어렵고, thermal activation에 기대기 때문에 저온에서 급격히 어려워진다. 그래서 DBTT가 생긴다.</p>
</details>

<details>
<summary>3. 주 slip system의 d/b가 FCC와 BCC에서 같다. 그런데 왜 Peierls stress가 다른가?</summary>
<p>Peierls-Nabarro 식은 dislocation core를 한 면 위의 납작한 모양으로 가정한다. FCC는 이 가정에 맞고, partial로 갈라지면 b가 짧아져 d/b가 더 커진다. BCC screw dislocation은 core가 입체적으로 퍼져 있어 식이 그 차이를 담지 못한다.</p>
</details>

<details>
<summary>4. BCC가 APF가 낮아 빈 공간이 더 많다. 그럼 탄소도 더 많이 녹는가?</summary>
<p>반대다. 빈 공간이 작은 자리 여러 개로 쪼개져 있어 가장 큰 tetrahedral site도 r/R ≈ 0.291이다. FCC는 octahedral site 하나가 r/R ≈ 0.414로 크다. 그래서 γ-Fe(약 2.1 wt%)가 α-Fe(약 0.02 wt%)보다 훨씬 많이 녹인다.</p>
</details>

<details>
<summary>5. 탄소가 더 많이 녹는 γ-Fe에서 탄소 diffusion도 더 빠른가?</summary>
<p>아니다. 탄소 diffusion은 덜 빽빽한 α-Fe에서 더 빠르다. solid solubility와 diffusion은 다른 질문이다.</p>
</details>

<details>
<summary>6. martensite는 BCC인가?</summary>
<p>정확히는 BCT다. 탄소가 빠져나가지 못한 채 FCC에서 BCC로 바뀌려다 한 축으로 늘어나서 c/a가 1보다 크다. 탄소가 적을수록 c/a가 1에 가까워져 BCC와 비슷해진다.</p>
</details>

<details>
<summary>7. 순철을 가열해 912 ℃에서 BCC가 FCC로 바뀌면 부피는 늘어나는가?</summary>
<p>줄어든다. FCC가 APF가 더 높아 같은 원자 수가 더 작은 부피를 차지한다. 가열하는데 부피가 순간적으로 줄어드는 드문 경우다.</p>
</details>

<details>
<summary>8. Si는 FCC lattice인데 Cu처럼 늘어나는가?</summary>
<p>아니다. lattice가 FCC여도 원자 배치는 diamond cubic이고 결합이 방향성 있는 공유결합이다. 상온에서는 dislocation이 거의 움직이지 못해 깨진다. 같은 FCC lattice라도 결합과 basis가 다르면 성질이 다르다.</p>
</details>

<details>
<summary>9. Si에서 (111)이 열산화가 가장 빠른 건 면밀도가 가장 높아서인가?</summary>
<p>아니다. Si의 면당 원자 수는 (110)이 가장 많고 (111)이 그다음이다. 계면 반응은 원자 밀도가 높을수록 빠르다는 게 출발점이지만, 두꺼운 영역의 순서 (111) &gt; (110) &gt; (100)은 산화막 응력까지 넣어야 설명된다. 고온에서 산화막이 두꺼워지면 diffusion이 속도를 정해서 면방위 차이가 거의 사라진다.</p>
</details>
