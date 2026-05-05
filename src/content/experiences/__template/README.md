# 경험 템플릿 작성 메모

`meta.json`은 언어를 타지 않는 값만 작성합니다. 화면에 보이는 제목, 요약, 설명은 `ko.mdx`와 `en.mdx`에 나누어 작성합니다.

## 기간 작성

기간은 `periods` 배열로 작성합니다. 하나의 경험이 여러 번 반복되었거나, 시작-끝 시간이 필요한 경우에도 같은 구조를 사용합니다.
경험 데이터는 일자와 시간까지 자세히 남길 수 있지만, 목록 필터는 `연/월` 단위까지만 선택하도록 운영합니다.

```json
{
  "periods": [
    {
      "start": "2024-03",
      "end": "2024-08"
    }
  ]
}
```

사용 가능한 형태:

- `"start": "2024"`: 연도만 아는 경험
- `"start": "2024-03"`: 월 단위 경험
- `"start": "2024-05-12"`: 하루짜리 경험
- `"start": "2024-05-12T14:00", "end": "2024-05-12T16:00"`: 시작-끝 시간이 있는 경험
- `"start": "2026-04", "current": true`: 현재 진행 중인 경험

여러 기간이 있으면 배열에 순서대로 추가합니다.

```json
{
  "periods": [
    {
      "start": "2023-03",
      "end": "2023-06"
    },
    {
      "start": "2024-01"
    }
  ]
}
```

`current`와 `end`는 동시에 쓰지 않습니다.

## 분류 작성

`category`는 경험이 어떤 성격인지 나타내는 대표 분류입니다. 하나의 경험은 하나의 `category`만 가집니다.

- `project`: 프로젝트 자체가 중심인 경험
- `affiliation`: 학교, 회사, 교육기관, 커뮤니티처럼 소속 자체가 중요한 전환점인 경험
- `work-experience`: 회사, 인턴, 프리랜서, 근로, 외주처럼 실제 업무 흐름 안에서 수행한 경험
- `learning-growth`: 내가 배우고 성장한 과정이 중심인 경험
- `teaching-mentoring`: 내가 강의하거나 멘토링한 경험
- `community`: 활동, 운영, 커뮤니티 참여가 중심인 경험
- `award-scholarship`: 수상이나 장학처럼 인정받은 결과가 중심인 경험
- `media-interview`: 외부 소개, 미디어, 인터뷰 경험

`organization`은 "어디에서 발생했는가"를 나타내는 값이고, `category: "affiliation"`은 "소속 자체가 기록의 주제인가"를 나타내는 값입니다.

## 소속/기관 양식 작성

`category`가 `affiliation`인 경험은 공용 `sections` 대신 `affiliation` 객체를 사용합니다.
소속/기관은 "무엇을 했는가"보다 "왜 속하게 되었고, 이후 경험의 기준점이 되었는가"가 중요하기 때문입니다.

```yaml
affiliation:
  reason: |
    왜 이 기관, 조직, 학교, 공동체에 속하게 되었는지 적습니다.
  startingContext: |
    시작 당시의 상태, 기대, 역할, 소속 변화가 있었다면 그 맥락을 적습니다.
  connectedExperiences: |
    이 소속이 이후 프로젝트, 활동, 학습, 커리어에 어떻게 이어졌는지 적습니다.
  meaning: |
    지금 돌아봤을 때 이 소속이 나에게 어떤 의미로 남았는지 적습니다.
```

`oneLine`은 카드와 상세 상단에서 쓰는 가장 짧은 핵심 문장입니다.
`summary`는 그 문장을 조금 더 풀어 맥락을 설명하는 1-2문장입니다.
두 값이 같은 말을 반복하지 않도록, `oneLine`은 결론에 가깝게 쓰고 `summary`는 배경과 연결점을 담습니다.

## 대표 사진 작성

대표 사진은 경험 자체에 연결되는 값이므로 `meta.json`에 작성합니다. 사진이 없으면 `null` 그대로 둡니다.
사진이 있는 경험만 객체로 바꿔 작성합니다.

```json
{
  "representativeImage": {
    "src": "/experience/images/001/representative.webp",
    "alt": {
      "ko": "O to I 프로젝트 실행 화면",
      "en": "O to I project screen"
    },
    "caption": {
      "ko": "개인 체질 맞춤 건강관리 웹 사이트 대표 화면",
      "en": "Representative screen of the personal health care web project"
    }
  }
}
```

- `src`: 이미지 경로입니다. 값이 비어 있으면 안 됩니다.
- `alt`: 접근성을 위한 대체 텍스트입니다. 화면에 직접 보이는 설명은 아니지만 가능하면 작성합니다.
- `caption`: 상세 페이지에서 이미지 아래 설명이 필요할 때 사용합니다.
- 카드나 상세 화면은 `representativeImage`가 없거나 `null`이면 이미지 영역을 생략하는 것을 기준으로 합니다.
