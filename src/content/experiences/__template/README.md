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

## 프로젝트 도메인과 기술 태그 작성

`projectDomains`와 `techTags`는 프로젝트 경험을 찾기 위한 보조 필터입니다.
자유롭게 문자열을 입력하지 않고, `src/data/experienceTaxonomy.ts`에 등록된 키만 사용합니다.

```json
{
  "category": "project",
  "projectDomains": ["web"],
  "techTags": ["csharp", "aspnet"]
}
```

현재 등록된 프로젝트 도메인:

- `web`: 웹

현재 등록된 기술 태그:

- `csharp`: C#
- `aspnet`: ASP.NET

새 도메인이나 기술이 필요하면 경험 파일에 임의로 적기보다 `experienceTaxonomy.ts`에 먼저 추가한 뒤, 그 키를 `meta.json`에서 연결합니다.

## 프로젝트 양식 작성

`category`가 `project`인 경험은 공용 `sections` 대신 `project` 객체를 사용합니다.
프로젝트는 소속/주최, 직책/역할, 기술 스택, 배포 상세처럼 면접이나 포트폴리오에서 바로 확인해야 하는 정보가 많기 때문입니다.

```yaml
project:
  host: |
    소속, 주최, 수업명, 팀명처럼 프로젝트가 발생한 맥락을 적습니다.
  position: |
    직책과 역할을 함께 적습니다. 예) 팀장 / Backend, Frontend, Database, Presentation
  participationReason: |
    왜 참여했는지, 왜 이 주제를 선택했는지 적습니다.
  description: |
    프로젝트가 무엇을 만들었고, 누구의 어떤 문제를 다루었는지 적습니다.
  responsibilities:
    - 내가 맡은 구현/기획/운영 범위를 항목별로 적습니다.
  techStack:
    - name: C#
      version: 버전이 있으면 적습니다.
      note: 버전 외에 남길 설명이 있으면 적습니다.
  deployment: |
    배포 여부, 배포 URL, 로컬 시연, 사내/수업 환경처럼 실행 방식을 적습니다.
  technicalDetails: |
    주요 기능, 설계 방식, 기술 선택 이유, 버전 정보, 구현하면서 중요했던 의사결정을 적습니다.
  result: |
    결과, 평가, 아쉬움, 배운 점, 다음 경험으로 이어진 점을 적습니다.
sections: []
```

`techTags`는 필터용 키이고, `project.techStack`은 상세 화면에 보여줄 실제 기술 스택 정보입니다.
프로젝트에서 기술 버전이 중요하면 `version`까지 적고, 버전을 확인할 수 없으면 비워두되 `technicalDetails`에 기록이 남아 있지 않다고 적어둡니다.

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

## 연결된 경험 작성

`related`는 다른 경험과의 맥락을 연결할 때 사용합니다. 화면에는 `number` 자체가 아니라, 연결된 경험의 제목과 관계 라벨이 표시됩니다.

```json
{
  "related": [
    {
      "number": "001",
      "relation": "affiliation"
    }
  ]
}
```

사용 가능한 관계:

- `affiliation`: 소속
- `award`: 수상
- `previous`: 이전
- `next`: 다음
- `related`: 연관
- `source`: 출처
- `result`: 결과
- `reference`: 참고

관계 설명이 꼭 필요할 때만 `note`를 추가합니다. 단순히 "어떤 경험과 연결되는지"만 보여주면 충분한 경우에는 `number`와 `relation`만 작성합니다.
