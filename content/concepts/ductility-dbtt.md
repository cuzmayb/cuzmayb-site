---
title: 연성과 DBTT
date: 2026-11-28
group: 기계적 성질
summary: 연성은 끊어지기 전까지 얼마나 소성 변형하느냐를 재는 값이다. BCC 금속은 온도가 내려가면 연성 파괴에서 취성 파괴로 넘어가고, 그 경계 온도가 DBTT다.
tags:
  - 기계적 성질
  - 연성
  - DBTT
---

표시가 없는 내용은 재료과학(Callister 교재 수준)에서 배운다. 그보다 위 과목에서 다루는 부분에는 <span class="lv">과목</span>처럼 과목 이름을 표시했다. 과목 이름은 학교마다 조금씩 다르다.

## 출발점

[FCC, BCC](/concepts/fcc-bcc) 페이지 표에 "저온 거동: FCC는 ductility 유지, BCC는 DBTT"라고 적었다. 원자 수준의 이유는 거기서 정리했다. 그런데 ductility(연성)를 어떻게 재는지, DBTT를 어떤 시험으로 정하는지는 따로 정리하지 않았다. 이 페이지는 그 측정 쪽 개념을 모은 것이다.

## 응력-변형률 곡선

인장 시험은 시편을 양쪽에서 잡아당기며 하중 F와 늘어난 길이 Δl을 잰다. 처음 단면적 A₀와 처음 길이 l₀로 나누면 engineering stress(공칭 응력) σ = F/A₀, engineering strain(공칭 변형률) ε = Δl/l₀가 된다. 이 둘을 그린 것이 engineering stress-strain curve다.

<figure class="fig">
<svg viewBox="0 0 560 300" style="width:min(560px,100%)" role="img" aria-label="공칭 응력-변형률 곡선. 연성 금속 곡선은 탄성 구간, 0.2% offset으로 정한 항복 강도, 균일 소성 변형, UTS, necking, 파단 순서로 이어지고 곡선 아래 면적이 인성이다. 취성 재료 곡선은 직선으로 올라가다 바로 파단한다">
<path d="M60 250L88 118Q100 98 140 86Q230 62 300 60Q380 62 440 112L440 250Z" fill="currentColor" opacity="0.08"/>
<g stroke="currentColor" stroke-width="1.2" fill="none">
<path d="M60 20V250H530"/>
</g>
<path d="M60 250L88 118Q100 98 140 86Q230 62 300 60Q380 62 440 112" fill="none" stroke="currentColor" stroke-width="2"/>
<path d="M72 250L105 94" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" opacity="0.7"/>
<path d="M440 112L411 250" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" opacity="0.7"/>
<path d="M60 250L95 50" fill="none" stroke="var(--accent)" stroke-width="2"/>
<g stroke="var(--accent)" stroke-width="2"><path d="M90 45L100 55M100 45L90 55"/></g>
<g stroke="currentColor" stroke-width="2"><path d="M435 107L445 117M445 107L435 117"/></g>
<g fill="currentColor"><circle cx="103" cy="104" r="3.5"/><circle cx="300" cy="60" r="3.5"/></g>
<g stroke="currentColor" stroke-width="1" fill="none"><path d="M60 276H411M64 272L60 276L64 280M407 272L411 276L407 280"/></g>
<g font-size="11" fill="currentColor">
<text x="20" y="140" transform="rotate(-90 20 140)" text-anchor="middle">공칭 응력 σ</text>
<text x="530" y="266" text-anchor="end">공칭 변형률 ε</text>
<text x="72" y="266" text-anchor="middle" font-size="10">0.2%</text>
<text x="235" y="293" text-anchor="middle">%EL (파단 뒤 남은 영구 변형)</text>
<text x="100" y="200">탄성 (E = σ/ε)</text>
<text x="112" y="140">σ_y (0.2% offset)</text>
<text x="150" y="110">균일 소성 변형</text>
<text x="300" y="46" text-anchor="middle">UTS</text>
<text x="385" y="56">necking (국부 수축)</text>
<text x="456" y="116">파단</text>
<text x="330" y="102">연성 금속</text>
<text x="290" y="212" text-anchor="middle">곡선 아래 면적 = toughness(인성)</text>
<text x="112" y="46" fill="var(--accent)">취성 재료</text>
</g>
</svg>
<figcaption>남색은 연성 금속, 빨강은 취성 재료. 0.2% offset은 보기 쉽게 크게 그렸다. 파단 뒤 하중을 빼면 탄성 변형만큼 되돌아오므로(오른쪽 점선) %EL은 그 뒤에 남은 길이로 잰다. 축에는 일부러 숫자를 넣지 않았다.</figcaption>
</figure>

곡선은 왼쪽부터 이렇게 읽는다.

- **elastic region(탄성 구간).** σ와 ε이 비례하고, 하중을 빼면 원래 길이로 돌아온다. 기울기가 Young's modulus(영률) E = σ/ε다.
- **yield strength(항복 강도) σ_y.** 직선에서 벗어나 plastic deformation(소성 변형)이 시작되는 응력이다. 대부분의 금속은 꺾이는 점이 뚜렷하지 않아서, 탄성 직선을 변형률 0.002(0.2%)만큼 옆으로 옮긴 선이 곡선과 만나는 점을 σ_y로 정한다. 이것이 0.2% offset 방법이다.
- **uniform plastic deformation(균일 소성 변형).** 시편 전체가 고르게 가늘어지며 늘어난다. dislocation이 쌓여 strain hardening(가공 경화)이 일어나서 응력이 계속 오른다.
- **ultimate tensile strength(인장 강도, UTS).** 곡선의 최고점이다. 여기서부터 경화가 단면적 감소를 따라가지 못한다.
- **necking(국부 수축).** 변형이 한 곳에 몰려 그 부분만 잘록해진다. 실제 단면이 줄어드는데 σ는 처음 단면적 A₀로 나누기 때문에 공칭 응력은 내려간다. 잘록한 부분의 실제 응력(true stress)은 계속 오른다.
- **fracture(파단).** 잘록한 부분에서 끊어진다.

### ductility와 toughness를 재는 값

ductility는 끊어질 때까지 얼마나 소성 변형했는지로 잰다. 두 가지 값을 쓴다.

| 값 | 정의 | 메모 |
|---|---|---|
| %EL (elongation, 연신율) | (l_f − l₀) / l₀ × 100 | l_f는 파단 뒤 두 조각을 맞대고 잰 길이. 표점 거리 l₀를 함께 적어야 비교할 수 있다 |
| %RA (reduction in area, 단면 수축률) | (A₀ − A_f) / A₀ × 100 | A_f는 파단면의 단면적. necking이 얼마나 깊었는지를 보여 준다 |

%EL이 l₀에 따라 달라지는 이유는 necking 때문이다. 늘어난 길이 가운데 necking 구간에서 생긴 몫은 l₀와 상관없이 거의 일정하다. 그래서 l₀가 짧을수록 그 몫의 비중이 커져 %EL이 크게 나온다.

toughness(인성)는 끊어질 때까지 단위 부피가 흡수한 에너지로, 곡선 아래 면적이다. 강도와 연성이 둘 다 있어야 면적이 커진다. 취성 재료(빨간 선)는 σ가 높게 올라가도 소성 변형 없이 바로 끊어져 면적이 작다.

| 성질 | 곡선에서 보는 곳 | 묻는 것 |
|---|---|---|
| strength(강도) | σ_y, UTS의 높이 | 얼마나 큰 응력을 버티나 |
| ductility(연성) | 파단점까지의 가로 길이 | 끊어지기 전에 얼마나 늘어나나 |
| toughness(인성) | 곡선 아래 면적 | 끊어지기까지 에너지를 얼마나 흡수하나 |

## 연성 파괴와 취성 파괴

파단면을 보면 어느 쪽으로 끊어졌는지 알 수 있다.

| | ductile fracture(연성 파괴) | brittle fracture(취성 파괴) |
|---|---|---|
| 파단 전 변형 | necking 등 소성 변형이 크다 | 소성 변형이 거의 없다 |
| 균열 진행 | 느리고 안정적. 하중을 더 줘야 자란다 | 빠르고 불안정. 한번 시작되면 스스로 자란다 |
| 메커니즘 | 내부에 microvoid(미세 공동)가 생기고 자라 서로 합쳐진다(microvoid coalescence) | 특정 결정면을 따라 쪼개지는 cleavage(벽개, 입내 파괴), 또는 결정립계를 따라 가는 intergranular(입계) 파괴 |
| 거시 모양 | cup-and-cone. 가운데는 평평하고 가장자리는 45° 전단 입술 | 하중에 수직인 평평한 면 |
| 확대해 보면(SEM) | 오목한 dimple이 빽빽하다 | 반짝이는 평평한 facet, 강물 지류처럼 갈라지는 river pattern |

cup-and-cone은 순서대로 생긴다. necking 중심부에서 microvoid가 먼저 생겨 합쳐지며 하중에 수직한 균열이 된다. 균열이 바깥으로 자라 남은 가장자리 고리는 최대 전단 응력 방향인 약 45°로 끊어진다.

취성 파괴가 위험한 이유는 경고가 없다는 데 있다. 연성 파괴는 늘어나고 잘록해지는 게 눈에 보이지만, 취성 파괴는 σ_y보다 낮은 공칭 응력에서도 노치나 결함에서 시작된 균열이 순식간에 단면을 가로지른다.

## Charpy 충격 시험과 DBTT

인장 시험은 천천히 당긴다. 실제 구조물이 깨지는 상황은 노치가 있고, 하중이 빠르고, 온도가 낮은 경우가 많다. 이 세 조건을 한꺼번에 거는 시험이 Charpy impact test(샤르피 충격 시험)다.

- 사각 막대 시편 가운데에 V자 홈(V-notch)을 판다.
- 정해진 높이에서 pendulum(진자 해머)을 놓아 노치 반대편을 친다.
- 해머가 시편을 깨고 지나간 뒤 올라간 높이가 처음보다 낮다. 그 위치 에너지 차이가 시편이 흡수한 에너지이고, 단위는 J다.

같은 시험을 여러 온도에서 반복해 흡수 에너지를 온도에 대해 그리면 재료마다 모양이 다르게 나온다.

<figure class="fig">
<svg viewBox="0 0 560 270" style="width:min(560px,100%)" role="img" aria-label="Charpy 흡수 에너지와 온도. FCC는 전 온도에서 높고 평평하다. BCC는 고온의 upper shelf, 가운데 transition region, 저온의 lower shelf로 이어지는 S자 곡선이고 중간 지점이 DBTT다. 고강도 재료와 다수의 HCP 금속은 전 구간에서 낮다">
<g stroke="currentColor" stroke-width="1.2" fill="none"><path d="M60 20V240H530"/></g>
<path d="M70 60H520" fill="none" stroke="currentColor" stroke-width="2"/>
<path d="M70 195H220C280 195 280 100 340 100H520" fill="none" stroke="var(--accent)" stroke-width="2"/>
<path d="M70 222H520" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
<path d="M280 147.5V240" fill="none" stroke="var(--accent)" stroke-width="1" stroke-dasharray="4 3"/>
<circle cx="280" cy="147.5" r="3.5" fill="var(--accent)"/>
<g font-size="11" fill="currentColor">
<text x="20" y="130" transform="rotate(-90 20 130)" text-anchor="middle">흡수 에너지 (J)</text>
<text x="530" y="256" text-anchor="end">온도 T</text>
<text x="280" y="256" text-anchor="middle" fill="var(--accent)">DBTT</text>
<text x="520" y="46" text-anchor="end">FCC (Cu, Al, Ni 등)</text>
<text x="520" y="86" text-anchor="end" fill="var(--accent)">BCC (저탄소강 등)</text>
<text x="360" y="122">upper shelf (연성 파괴)</text>
<text x="80" y="181">lower shelf (취성 파괴)</text>
<text x="262" y="124" text-anchor="end">transition</text>
<text x="262" y="140" text-anchor="end">(전이 구간)</text>
<text x="520" y="209" text-anchor="end" opacity="0.7">고강도 재료, 다수의 HCP 금속</text>
</g>
</svg>
<figcaption>모양만 나타낸 모식도다. 남색 굵은 선은 FCC, 빨강은 BCC, 흐린 선은 고강도 재료와 다수의 HCP 금속. DBTT는 여기서 upper shelf와 lower shelf의 중간 에너지 지점으로 잡았다.</figcaption>
</figure>

- **FCC.** 온도를 내려도 흡수 에너지가 높게 유지된다. 파단면도 끝까지 연성 파괴다.
- **BCC.** 고온 쪽에는 높고 평평한 upper shelf가 있고, 파단면은 dimple로 덮인 연성 파괴다. 저온 쪽 lower shelf에서는 에너지가 낮고 파단면은 cleavage다. 그 사이 transition region(전이 구간)에서 에너지가 급하게 떨어지고, 파단면에 연성 부분과 취성 부분이 섞인다.
- **고강도 재료, 다수의 HCP 금속.** 전 온도 구간에서 흡수 에너지가 낮게 머무는 경우가 많다. 강도가 높으면 σ_y가 이미 높아 균열 끝에서 소성 변형으로 에너지를 흡수할 여유가 적다.

### DBTT는 하나로 정해져 있지 않다

DBTT(ductile-to-brittle transition temperature, 연성-취성 전이 온도)는 전이 구간 안의 한 온도를 골라 붙인 이름이다. 전이 구간 자체가 온도 폭을 가지기 때문에 어느 점을 고르느냐는 약속에 따라 다르다. 흔히 쓰는 기준은 세 가지다.

| 기준 | 정하는 방법 |
|---|---|
| 중간 에너지 | upper shelf와 lower shelf 에너지의 중간 값이 나오는 온도 |
| 고정 에너지 | 흡수 에너지가 정해진 값에 닿는 온도. 27 J 기준이 흔히 쓰이고 규격에 따라 40 J, 60 J도 쓴다([tec-science](https://www.tec-science.com/?p=3296), [TWI](https://www.twi-global.com/technical-knowledge/job-knowledge/mechanical-testing-notched-bar-or-impact-testing-071)) |
| 파면 모양 | 파단면의 50%가 연성(shear) 파면이 되는 온도. FATT(fracture appearance transition temperature)라고 부른다 |

같은 강재라도 기준이 다르면 DBTT 값이 달라진다. DBTT를 비교할 때는 어떤 기준으로 정한 값인지부터 확인해야 한다.

### DBTT를 올리고 내리는 요인

<span class="lv">재료강도학</span>

같은 BCC 강이라도 DBTT는 조직과 조건에 따라 움직인다.

| 요인 | DBTT 변화 |
|---|---|
| grain size(결정립 크기)가 크다 | 올라간다 |
| grain refinement(결정립 미세화) | 내려간다. 강도와 인성을 동시에 올리는 드문 방법이다 |
| C, P 함량이 높다 | 올라간다 |
| strain rate(변형 속도)가 빠르다 | 올라간다. 충격 하중이 정적 하중보다 위험한 이유다 |
| 노치가 날카롭다 | 올라간다. 노치 끝에 응력이 집중되고 삼축 응력 상태가 된다 |
| 중성자 irradiation(조사) | 올라간다. 원자로 압력 용기 강을 관리할 때 따지는 항목이다 |

### 전시 선박의 파괴

2차 세계대전 때 미국은 용접으로 Liberty ship 같은 화물선과 T2 tanker를 대량으로 지었다. 그중 일부가 추운 날씨와 찬 물에서 금이 가거나 두 동강 났다. 당시 강재에 황과 인이 많았던 점, 용접부와 그 주변이 약하고 취약했던 점, 노치와 각진 해치 모서리 같은 응력 집중부가 원인으로 꼽힌다([Mariners' Museum](https://www.marinersmuseum.org/2021/01/brittle-fracture-when-ships-split-in-two/)).

잘 알려진 예가 T2 tanker SS Schenectady다. 1943년 1월 16일 밤, 시운전 며칠 뒤 미국 Portland의 의장 부두에 묶여 있다가 선체 가운데가 두 동강 났다. 균열은 설계상 응력이 몰리는 갑판 부위의 결함 있는 용접부에서 시작됐다. 최종 보고서는 사용 온도에서 노치에 민감한 강재를 원인으로 들었다([TWI](https://www.twi-global.com/media-and-events/insights/schenectady-t2-tanker)). 바다 위에서 큰 파도를 맞은 것도 아니었다. 이 사고들 뒤로 강재 규격에 노치 인성 요구가 들어가고, 파괴역학 연구가 본격적으로 시작됐다.

## BCC에서만 전이가 생기는 이유

<span class="lv">재료강도학</span>

원자 수준의 이유는 [FCC, BCC](/concepts/fcc-bcc)에 정리했다. 짧게 다시 쓰면, BCC의 screw dislocation은 core가 세 면 쪽으로 퍼진 non-planar 구조라 kink-pair를 thermal activation으로 만들어야 움직인다. 그래서 온도가 내려가면 σ_y가 가파르게 오른다. FCC는 close-packed plane 위에 core가 납작하게 퍼져 있어 σ_y가 온도에 거의 영향받지 않는다.

반면 cleavage가 일어나는 응력 σ_f는 원자 결합을 끊는 쪽이라 온도에 크게 변하지 않는다. 두 곡선을 같이 그리면 전이가 어디서 생기는지 보인다.

<figure class="fig">
<svg viewBox="0 0 520 260" style="width:min(520px,100%)" role="img" aria-label="온도에 따른 항복 강도와 벽개 응력. 항복 강도 곡선은 저온으로 갈수록 가파르게 오르고 벽개 응력은 거의 평평하다. 두 선이 만나는 온도가 DBTT이고, 왼쪽은 취성, 오른쪽은 연성 영역이다">
<g stroke="currentColor" stroke-width="1.2" fill="none"><path d="M60 20V230H500"/></g>
<path d="M70 30C170 160 240 190 500 200" fill="none" stroke="currentColor" stroke-width="2"/>
<path d="M70 142L500 136" fill="none" stroke="var(--accent)" stroke-width="2"/>
<path d="M185 140V230" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" opacity="0.7"/>
<circle cx="185" cy="140" r="3.5" fill="currentColor"/>
<g font-size="11" fill="currentColor">
<text x="20" y="125" transform="rotate(-90 20 125)" text-anchor="middle">응력 σ</text>
<text x="500" y="248" text-anchor="end">온도 T</text>
<text x="185" y="248" text-anchor="middle">DBTT</text>
<text x="100" y="42">σ_y(T): 항복 강도</text>
<text x="500" y="122" text-anchor="end" fill="var(--accent)">σ_f: cleavage 응력</text>
<text x="122" y="195" text-anchor="middle">취성</text>
<text x="122" y="210" text-anchor="middle" font-size="10">σ_y &gt; σ_f</text>
<text x="380" y="160" text-anchor="middle">연성</text>
<text x="380" y="175" text-anchor="middle" font-size="10">σ_y &lt; σ_f</text>
</g>
</svg>
<figcaption>BCC 금속의 모식도. 남색은 σ_y(T), 빨강은 거의 평평한 σ_f. 두 선이 만나는 온도보다 낮으면 소성 변형보다 cleavage가 먼저 일어난다. 이런 식으로 전이를 설명하는 그림을 Yoffe 선도, 또는 Cottrell의 전이 모델이라고 부른다.</figcaption>
</figure>

오른쪽 고온 영역에서는 σ_y가 σ_f보다 낮다. 균열 끝에 응력이 몰려도 먼저 항복해서 소성 변형으로 응력을 풀고, 연성 파괴로 끝난다. 온도가 내려가 σ_y가 σ_f를 넘으면 항복하기 전에 cleavage 균열이 먼저 자란다. 앞의 요인 표도 이 그림으로 읽힌다. 결정립 미세화는 σ_f를 σ_y보다 더 많이 올려 교차점을 왼쪽으로 옮기고, 빠른 변형 속도는 σ_y 곡선을 위로 올려 교차점을 오른쪽으로 옮긴다. FCC는 σ_y 곡선이 낮고 평평해서 σ_f와 만나지 않는다.

## 패키징에서는

<span class="lv">전자패키징</span>

패키지에서 금속이 깨지는 상황은 주로 두 가지다. 하나는 thermal cycling(온도 사이클)이다. 칩, 기판, solder, Cu 배선의 CTE가 서로 달라 온도가 오르내릴 때마다 solder joint와 Cu interconnect에 반복 변형이 걸린다. 다른 하나는 drop/impact loading(낙하·충격 하중)이다. 휴대 기기를 떨어뜨리면 joint에 짧고 빠른 하중이 걸리는데, 빠른 변형 속도는 앞에서 본 대로 취성 쪽으로 미는 조건이다.

SAC(Sn-Ag-Cu) 계열 무연 solder는 대부분이 Sn이다. 상온에서 안정한 β-Sn은 body-centered tetragonal 구조로, FCC가 아니다. SAC305 solder joint는 극저온에서 dimple이 보이는 연성 파괴에서 취성 파괴로 바뀐다는 보고가 있고, 이를 β-Sn의 비대칭 tetragonal 구조와 연결해 설명한다([HIT 연구 요약](https://scholar.hit.edu.cn/en/publications/mechanical-properties-and-fracture-mechanisms-of-sn-30ag-05cu-sol/)). 전이가 일어나는 온도는 시편 크기, 시험법, 전이를 정하는 기준에 따라 연구마다 다르게 보고된다. 그래서 극저온이나 저온 충격 환경에 쓰는 패키지는 solder의 저온 충격 특성을 따로 확인한다.

Sn에는 tin pest라는 다른 저온 현상도 있다. 13.2 ℃ 아래에서 금속인 β-Sn(white tin, tetragonal)이 반도체인 α-Sn(grey tin, cubic)으로 바뀔 수 있고, 이때 부피가 약 27% 늘어 가루처럼 부서진다([CALCE](https://calce.umd.edu/tin-pests)). 변태는 시작이 느리고 −30~−40 ℃ 부근에서 가장 빠르다고 한다. Sn-Pb solder에서는 Pb와 불순물이 이를 막아 줬지만 무연 solder는 그 보호가 약하다는 걱정이 있었다. 같은 CALCE 자료는 bulk 시편에서는 변태가 관찰되지만 실제 solder joint는 주변 구속 때문에 잘 버티고, 현장에서 tin pest가 생긴 사례는 없다고 정리한다. tin pest는 상변태이고, DBTT는 같은 상 안에서 파괴 방식이 바뀌는 현상이라 둘은 구분해서 봐야 한다.

## 스스로 확인

자주 헷갈리는 질문들이다. 답을 먼저 떠올린 뒤 펼쳐 본다.

<details>
<summary>1. strength, ductility, toughness는 각각 곡선의 어디를 보는가?</summary>
<p>strength는 σ_y와 UTS의 높이, ductility는 파단점까지 얼마나 늘어났는지(가로 길이), toughness는 곡선 아래 면적이다. toughness는 높이와 길이가 둘 다 있어야 커진다.</p>
</details>

<details>
<summary>2. 항복 강도가 높은 재료는 언제나 인성도 높은가?</summary>
<p>아니다. σ_y가 높아도 소성 변형 없이 바로 끊어지면 곡선 아래 면적이 작다. 고강도강이 Charpy 시험에서 전 온도 구간에 걸쳐 흡수 에너지가 낮게 나오는 경우가 그 예다.</p>
</details>

<details>
<summary>3. FCC 금속은 왜 DBTT가 거의 없는가?</summary>
<p>FCC는 dislocation core가 close-packed plane 위에 납작하게 퍼져 있어 σ_y가 온도에 거의 영향받지 않는다. 온도를 내려도 σ_y가 cleavage 응력 σ_f를 넘지 않아서 균열 끝에서 계속 항복하며 응력을 풀어 준다.</p>
</details>

<details>
<summary>4. DBTT는 재료마다 하나로 정해진 값인가?</summary>
<p>아니다. 전이는 온도 폭을 가진 구간이고, DBTT는 그 안의 한 점을 기준에 따라 고른 값이다. 중간 에너지, 27 J 같은 고정 에너지, 50% 파면(FATT) 가운데 무엇을 썼는지에 따라 값이 달라진다. 같은 재료라도 결정립 크기, 변형 속도, 노치 모양에 따라 움직인다.</p>
</details>

<details>
<summary>5. 같은 재료로 %EL을 쟀는데 시편마다 값이 다르게 나왔다. 왜 그런가?</summary>
<p>표점 거리 l₀가 달랐을 수 있다. necking 구간에서 생기는 늘어남은 l₀와 상관없이 거의 일정해서, l₀가 짧을수록 그 몫의 비중이 커져 %EL이 크게 나온다. %EL을 비교할 때는 표점 거리를 같이 적는다. %RA는 파단면 단면적만 보므로 이 영향을 덜 받는다.</p>
</details>

<details>
<summary>6. necking이 시작되면 공칭 응력이 내려간다. 재료가 약해진 것인가?</summary>
<p>아니다. 공칭 응력은 처음 단면적 A₀로 나눈 값이라, 잘록해져 실제 단면이 줄어든 만큼을 반영하지 못한다. 잘록한 부분의 실제 응력(true stress)은 파단까지 계속 오른다.</p>
</details>
