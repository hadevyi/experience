# 경험 템플릿 작성 메모

`meta.json`은 언어를 타지 않는 값만 작성합니다. 화면에 보이는 제목, 요약, 설명은 `ko.mdx`와 `en.mdx`에 나누어 작성합니다.
프로젝트 참여 인원처럼 숫자로 정리 가능한 값도 `meta.json`에 둡니다.

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

## 분류별 양식 강제 규칙

각 경험은 `meta.json`의 `category`에 맞는 전용 객체를 사용합니다. 공용 `sections`는 임시 자유 양식으로 두지 않고 항상 빈 배열로 둡니다.
분류와 양식이 맞지 않으면 빌드/체크 단계에서 오류가 나도록 관리합니다.

- `affiliation`: `affiliation` 객체
- `project`: `project` 객체
- `work-experience`: `workExperience` 객체
- `learning-growth`: `learningGrowth` 객체
- `teaching-mentoring`: `teachingMentoring` 객체
- `community`: `community` 객체
- `award-scholarship`: `awardScholarship` 객체
- `media-interview`: `mediaInterview` 객체

예를 들어 `category`가 `community`인데 `sections`에 자유롭게 본문을 작성하면 안 됩니다. 반드시 `community.background`, `community.role`처럼 정해진 필드에 작성합니다.

## 프로젝트 도메인과 기술 태그 작성

`projectDomains`와 `techTags`는 프로젝트 경험을 찾기 위한 보조 필터입니다.
자유롭게 문자열을 입력하지 않고, `src/data/experienceTaxonomy.ts`에 등록된 키만 사용합니다.

```json
{
  "category": "project",
  "teamSize": 4,
  "projectDomains": ["web"],
  "techTags": ["csharp", "aspnet"]
}
```

현재 등록된 프로젝트 도메인:

- `web`: 웹

현재 등록된 기술 태그:

- `csharp`: C#
- `aspnet`: ASP.NET
- `sqlserver`: SQL Server

새 도메인이나 기술이 필요하면 경험 파일에 임의로 적기보다 `experienceTaxonomy.ts`에 먼저 추가한 뒤, 그 키를 `meta.json`에서 연결합니다.

## 프로젝트 양식 작성

`category`가 `project`인 경험은 공용 `sections` 대신 `project` 객체를 사용합니다.
프로젝트는 기본정보와 개발 기록을 분리합니다.
기본정보에는 소속/주최, 총 참여 인원, 직책/역할 요약, 배포/실행처럼 빠르게 확인해야 하는 값을 둡니다.
팀 구성 상세와 내가 실제로 구현한 범위는 본문에 두어, 상단 기본정보가 과하게 길어지지 않게 합니다.
기술 스택은 별도 카드 섹션으로 보여주고, 본문에는 기획 배경부터 설계와 구현, 어려웠던 점, 결과까지 개발 흐름이 보이도록 기록합니다.

```yaml
project:
  host: |
    소속, 주최, 수업명, 팀명처럼 프로젝트가 발생한 맥락을 적습니다.
  position: |
    상단 기본정보에 보일 직책과 역할 요약을 짧게 적습니다. 예) 팀장 / 개발·DB·발표
  teamComposition:
    - role: |
        포지션 또는 참여 형태를 적습니다.
      count: 1
      note: |
        필요하면 짧은 설명을 적습니다.
  techStack:
    - category: language
      name: C#
      version: 버전이 있으면 적습니다.
      note: 버전 외에 남길 설명이 있으면 적습니다.
  deployment: |
    배포 여부, 배포 URL, 로컬 시연, 사내/수업 환경처럼 실행 방식을 적습니다.
  overview: |
    무엇을, 누구를 위해 만든 프로젝트인지 적습니다.
  background: |
    왜 이 주제를 선택했는지, 어떤 문제나 필요를 다루려 했는지 적습니다.
  scope: |
    처음 목표, 실제 구현한 범위, 구현하지 못한 범위를 적습니다.
  contribution: |
    내가 맡은 역할, 직접 만든 기능, 협업/리딩/발표 기여를 적습니다.
  roleDetails:
    - 실제로 구현하거나 책임진 일을 구체적으로 적습니다.
    - 역할명이 아니라 결과물과 구현 범위 중심으로 적습니다.
  implementation: |
    주요 기능, DB/화면/데이터 흐름 설계, 기술 선택 이유, 버전 정보를 적습니다.
  challenges: |
    어려웠던 문제, 원인, 시도한 방식, 해결하거나 배운 내용을 적습니다.
  outcome: |
    결과, 평가, 아쉬움, 배운 점, 다음 경험으로 이어진 점을 적습니다.
sections: []
```

`techTags`는 필터용 키이고, `project.techStack`은 상세 화면에 보여줄 실제 기술 스택 정보입니다.
프로젝트에서 기술 버전이 중요하면 `version`까지 적고, 버전을 확인할 수 없으면 비워두되 `implementation`에 기록이 남아 있지 않다고 적어둡니다.
`techStack.category`는 상세 화면에서 기술 스택을 읽기 쉽게 묶기 위한 값입니다.
사용 가능한 값은 `language`, `framework`, `database`, `tool`, `environment`, `platform`, `other`입니다.

## 소속/기관 양식 작성

`category`가 `affiliation`인 경험은 공용 `sections` 대신 `affiliation` 객체를 사용합니다.
소속/기관은 "무엇을 했는가"보다 "왜 속하게 되었고, 이후 경험의 기준점이 되었는가"가 중요하기 때문입니다.

```yaml
affiliation:
  overview: |
    이 소속/기관이 어떤 곳이고, 나에게 어떤 범위의 소속이었는지 적습니다.
  reason: |
    왜 이 기관, 조직, 학교, 공동체에 속하게 되었는지 적습니다.
  startingContext: |
    합류 당시의 상태, 기대, 역할, 소속 변화가 있었다면 그 맥락을 적습니다.
  challenges: |
    소속 초기에 어렵거나 적응이 필요했던 점을 적습니다.
  gains: |
    이 소속을 통해 얻은 태도, 자신감, 사람, 관점, 다음 경험의 기반을 적습니다.
```

화면 라벨은 `소속/기관 소개`, `속하게 된 이유`, `합류 당시`, `어려웠던 점`, `얻은 것` 순서로 표시합니다.
이후 이어진 프로젝트나 활동은 본문에 반복해서 적기보다 `related`의 연결된 맥락으로 관리합니다.

`oneLine`은 카드와 상세 상단에서 쓰는 가장 짧은 핵심 문장입니다.
`summary`는 그 문장을 조금 더 풀어 맥락을 설명하는 1-2문장입니다.
두 값이 같은 말을 반복하지 않도록, `oneLine`은 결론에 가깝게 쓰고 `summary`는 배경과 연결점을 담습니다.

## 활동/커뮤니티 양식 작성

`category`가 `community`인 경험은 공용 `sections` 대신 `community` 객체를 사용합니다.
학생회, 동아리, 커뮤니티, 단체활동은 "어떤 공동체였는가", "내가 맡은 역할은 무엇인가", "사람들과 어떤 흐름을 만들었는가"가 중요하기 때문입니다.

```yaml
community:
  overview: |
    어떤 활동/공동체였는지, 활동 규모나 맥락을 적습니다.
  motivation: |
    왜 참여했는지, 자원했는지, 추천받았는지, 기대했던 점을 적습니다.
  role: |
    맡은 역할과 책임 범위를 적습니다.
  contribution: |
    실제로 기여한 방식, 운영한 흐름, 만든 결과를 적습니다.
  challenges: |
    어려웠던 점, 조율이 필요했던 점, 반복적으로 신경 쓴 부분을 적습니다.
  impact: |
    기억에 남는 피드백, 결과, 이후 나에게 남은 태도나 기준을 적습니다.
sections: []
```

## 업무경험 양식 작성

`category`가 `work-experience`인 경험은 `workExperience` 객체를 사용합니다.

```yaml
workExperience:
  context: |
    어떤 조직에서 어떤 책임과 범위를 맡았는지 적습니다.
  responsibilities: |
    반복적으로 수행한 일, 책임졌던 범위, 참여한 흐름을 적습니다.
  collaboration: |
    함께 일한 사람들, 소통 방식, 조율한 내용을 적습니다.
  outcome: |
    업무 결과, 팀이나 나에게 생긴 변화, 이후 연결된 일을 적습니다.
sections: []
```

## 학습/성장 양식 작성

`category`가 `learning-growth`인 경험은 `learningGrowth` 객체를 사용합니다.

```yaml
learningGrowth:
  background: |
    왜 이 배움이 필요하다고 느꼈는지 적습니다.
  learning: |
    핵심적으로 배운 개념, 기술, 태도, 관점을 적습니다.
  change: |
    이 배움이 이후 프로젝트, 커리어, 강의, 활동에 어떻게 이어졌는지 적습니다.
sections: []
```

## 강의/멘토링 양식 작성

`category`가 `teaching-mentoring`인 경험은 `teachingMentoring` 객체를 사용합니다.

```yaml
teachingMentoring:
  audience: |
    누구를 대상으로 한 강의/멘토링이었는지 적습니다.
  reason: |
    이 강의/멘토링에 참여하게 된 이유나 맡게 된 배경을 적습니다.
  content: |
    전달한 주제, 개념, 실습, 상담 내용을 적습니다.
  approach: |
    자료, 예시, 실습, 상담 흐름을 어떻게 준비하고 진행했는지 적습니다.
  response: |
    참여자 반응, 피드백, 변화, 남은 결과물을 적습니다.
  learning: |
    이 경험을 통해 얻은 전달 방식, 커뮤니케이션, 교육 관점의 배움을 적습니다.
sections: []
```

## 수상/장학 양식 작성

`category`가 `award-scholarship`인 경험은 `awardScholarship` 객체를 사용합니다.

```yaml
awardScholarship:
  criteria: |
    무엇을 기준으로 선정되거나 수상했는지 적습니다.
  relatedActivity: |
    이 결과와 연결된 프로젝트, 활동, 학습, 업무경험을 적습니다.
  meaning: |
    이 경험이 이후 선택, 자신감, 방향성에 어떤 영향을 주었는지 적습니다.
sections: []
```

## 미디어/인터뷰 양식 작성

`category`가 `media-interview`인 경험은 `mediaInterview` 객체를 사용합니다.

```yaml
mediaInterview:
  background: |
    어떤 계기로 외부에 소개되었는지 적습니다.
  topics: |
    인터뷰나 기사에서 다룬 핵심 주제를 적습니다.
  message: |
    내가 어떤 관점이나 가치관을 보여주고 싶었는지 적습니다.
sections: []
```

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

## 공개 링크 작성

`links`는 방문자에게 보여줘도 되는 공개 링크만 작성합니다. 개인 보관용 링크, 내부 문서, 비공개 Notion/Drive 링크는 넣지 않습니다.
소속/기관 경험에서는 공식 홈페이지, 공식 SNS, 학과/기관 소개 페이지처럼 나중에 다시 찾기 좋은 공개 출처를 연결합니다.

```yaml
links:
  - type: official
    label: 인제대학교 공식 홈페이지
    url: https://www.inje.ac.kr
  - type: social
    label: 인제대학교 공식 인스타그램
    url: https://www.instagram.com/example
```

사용 가능한 `type`:

- `official`: 공식 홈페이지, 공식 기관 페이지
- `repository`: GitHub 등 코드 저장소
- `demo`: 배포 페이지, 시연 페이지
- `article`: 기사, 인터뷰, 외부 소개 글
- `social`: 공식 SNS, 커뮤니티 채널
- `reference`: 공개 참고 자료, 기타 공개 출처

`label`은 화면에 보이는 이름입니다. 한국어 파일에는 한국어 라벨, 영어 파일에는 영어 라벨을 적습니다.
같은 순서의 링크는 `ko.mdx`와 `en.mdx`에서 같은 `type`과 `url`을 유지합니다.

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
