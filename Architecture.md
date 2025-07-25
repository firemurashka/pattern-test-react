# Документация по тесту на паттерны поведения

## Оглавление
1. [Структура проекта](#структура-проекта)
2. [App.js](#App-js)
3. [IntroScreen.jsx](#IntroScreen-jsx)
4. [TestPage.jsx](#TestPage-jsx)
5. [ResultPage.jsx](#ResultPage-jsx)
5. [FileManager.jsx](#FileManager-jsx)


---


## Структура проекта

```
src/
├── components/
│   ├── Charts/
│   │   └── PatternBarChart.jsx
│   ├── Screens/
│   │   ├── FormScreen.jsx
│   │   ├── IntroScreen.jsx
│   │   ├── QuestionsScreen.jsx
│   │   └── ResultsScreen.jsx
│   ├── Sections/
│   │   ├── IntroSections/
│   │   │   ├──ContactsIntroSection.jsx
│   │   │   ├──InstructionIntroSection.jsx
│   │   │   ├──OfferIntroSection.jsx
│   │   │   ├──PatternsIntroSection.jsx
│   │   │   └──StartTestIntroSection.jsx
│   │   ├── ResultsSections/
│   │   │   ├──CategoryResultsSection.jsx
│   │   │   ├──HistogramSection.jsx
│   │   │   ├──InterpretationSection.jsx
│   │   │   ├──LiteratureSection.jsx
│   │   │   └──ResultsHeader.jsx
│   │   └──FileManager.jsx
├── pages/
│   ├── ResultPage.jsx
│   └── TestPage.jsx
├── styles/
│   ├── base/
│   │   ├──_buttons.scss
│   │   ├──_fonts.scss
│   │   ├──_global.scss
│   │   ├──_mixins.scss
│   │   ├──_reset.scss
│   │   ├──_variables.scss
│   ├── components/
│   │   ├──screens/
│   │   │  ├──_form-start.scss
│   │   │  ├──_question-block.scss
│   │   │  └──_result-block.scss
│   │   ├──sections/
│   │   │  ├──intro-sections/
│   │   │  │  ├──_instruction-test.scss
│   │   │  │  ├──_offer-test.scss
│   │   │  │  ├──_patterns-description.scss
│   │   │  │  ├──_share.scss
│   │   │  │  ├──_trek.scss
│   │   │  ├──result-sections/
│   │   │  │  ├──_result-category.scss
│   │   │  │  ├──_result-header.scss
│   │   │  │  ├──_result-histogram.scss
│   │   │  │  ├──_result-interpretation.scss
│   │   │  │  ├──_result-literature.scss
│   └── main.scss
├── utils/
│   ├── createResultsData.js
│   ├── logo.js
│   ├── makeCategoryPatternsBlock.js
│   ├── makeContactsBlock.js
│   ├── makeDominantPatternsBlock.js
│   ├── makeIntroBlock.js
│   ├── pdfmakeGenerator.js
│   └── pdfmakeStyles.js.js
└── App.css
└── App.js
└── App.test.js
└── index.js
└── reportWebVitals.js
└── setupTests.js
public/
├── data/
│   ├── patterns.json
│   └── questions.json
├── img/
│   └──test-patterns/
│       └── check.svg
npm_build.log
npm_install.log
package-lock.json
package.json
PATTERN_TEST_DOC_Version8.md
PATTERN_TEST_PDF.md
README.md
```

## App-js
``App.js`` - Главный компонент приложения, определяет маршрутизацию (роутинг) страниц через React Router.

Зачем нужен:

Позволяет разделить сайт на логические страницы: главное интро, тест, просмотр результатов, файловый менеджер.
Делает навигацию между этими экранами предсказуемой и управляемой через URL.
Обеспечивает fallback на главную страницу при ошибочном адресе.
Структура маршрутов:

/ — стартовое интро
/test — страница теста (анкета + вопросы + результаты)
/results/:id — просмотр результатов по ID (например, для Telegram-бота)
/files — менеджер файлов (служебная страница для редактирования файлов системы)
* — любой неизвестный путь ведёт на / (защита от "битых" ссылок)


## IntroScreen-jsx
``IntroScreen.jsx`` - Рендерит набор секций, которые представляют вводную информацию перед началом теста.

Зачем нужен:

Показывает пользователю цели теста, структуру, оферту, инструкции, контакты и кнопку "Начать тест".
Модульное разбиение на секции помогает переиспользовать и поддерживать отдельные части экрана.


## TestPage-jsx
``TestPage.jsx`` - Контейнер для прохождения теста "от и до":

Сначала форма (ФИО, контакты, согласия)
Затем вопросы теста (шагает по вопросам)
Потом показывает результаты
Сохраняет состояние шага, данных пользователя и ответов.
Зачем нужен:

Инкапсулирует всю логику прохождения теста на одной странице.
Осуществляет переходы: форма → вопросы → результаты.
После завершения сохраняет результат (в localStorage и/или на сервер), после чего перенаправляет на страницу результатов.


## ResultPage-jsx
 ``ResultPage.jsx`` - Позволяет просматривать результаты теста по уникальному ID (например, по ссылке из Telegram-бота).

Ищет результаты сперва в localStorage, затем на сервере.
Если не найдено — подставляет тестовые данные для отладки.
Зачем нужен:

Для асинхронного получения результатов (например, если тест проходился в Telegram и результат сохранён на сервере).
Универсальный просмотр результатов с визуализацией, интерпретацией и возможностью скачать отчет.


## FileManager-jsx
``FileManager.jsx`` - Даёт интерфейс для просмотра, создания, редактирования и удаления файлов на сервере (через API).

Зачем нужен:

Служебный инструмент для администраторов/разработчиков.
Позволяет управлять контентом (например, вопросами, паттернами) без прямого доступа к файловой системе сервера.
Повышает гибкость и удобство поддержки.


## Как устроено взаимодействие компонентов
App.js управляет, какую "страницу" показать.
IntroScreen — стартовая страница, знакомит пользователя с тестом.
TestPage — основной процесс теста (аккумулирует ответы, считает результат, отправляет на сервер).
ResultPage — отдельный просмотр результатов (может быть как после теста, так и по прямой ссылке).
FileManager — независимый служебный интерфейс для работы с файлами (например, вопросами или паттернами теста).


## PatternTestEntry.jsx
Контролирует этапы: интро → форма → вопросы → отправка → финальный экран (ссылка на результат).
Всё работает на одном адресе: /pattern-test.html.

## PatternTestResultPage.jsx
Показывает детальный результат теста по id.
Используется и для сайта, и для Telegram-бота (универсальная ссылка).

## FileManager.jsx
Опционально, для администрирования/редактирования файлов (например, вопросов теста).

## Intro Sections
Модули для отображения оферты, описания паттернов, инструкции, контактов, кнопки старта.
FormScreen, QuestionsScreen
Экран формы и экран вопросов соответственно.