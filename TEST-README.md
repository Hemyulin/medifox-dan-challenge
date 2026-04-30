# Test Automation README

This document describes the test automation MVP for the Angular traffic light application.

## Scope

The goal of this MVP is to provide a small but maintainable test setup for the traffic light app. It includes:

- a Gherkin feature specification
- automated component-level tests
- one UI smoke test
- selective test execution
- JUnit XML reporting
- a small refactor to improve maintainability and testability

## Requirement Mapping

| Requirement | Implementation |
| --- | --- |
| Gherkin feature file with at least 5 scenarios | `features/traffic-light-control.feature` |
| At least 3 automated scenarios | `ampel-page.component.unit.test.ts` covers initial, red, yellow, and green scenarios |
| At least 2 tests without real UI interaction | Unit tests call component methods and assert component state |
| At least 1 UI smoke test | `ampel-page.component.smoke.test.ts` renders the Angular component and checks visible controls |
| Structured, maintainable test code | Unit and smoke tests are separated by naming and purpose |
| Selective execution | `npm run test:unit` and `npm run test:smoke` |
| Reporting | `npm run test:report` generates `reports/junit.xml` |
| Small refactor for testability | Manual light selection is centralized in `setLight(light)` |

## Test Specification

The Gherkin scenarios are defined in:

```text
features/traffic-light-control.feature
```

The feature file describes the expected behavior of the traffic light:

- initial state has all lights off
- red light can be switched on manually
- yellow light can be switched on manually
- green light can be switched on manually
- automatic mode changes the active light over time

The Gherkin file is used as a readable behavior specification. It is not executed directly by Cucumber in this MVP. Instead, selected scenarios are mapped to Angular/Vitest tests.

## Automated Tests

Unit tests:

```text
src/app/components/ampel-page/ampel-page.component.unit.test.ts
```

These tests do not interact with the rendered UI. They instantiate the Angular component through `TestBed`, call component methods directly, and assert the signal state.

Covered behavior:

- component starts with `AmpelLicht.None`
- `onRed()` sets the active light to red
- `onYellow()` sets the active light to yellow
- `onGreen()` sets the active light to green

Smoke test:

```text
src/app/components/ampel-page/ampel-page.component.smoke.test.ts
```

The smoke test renders `AmpelPageComponent` with Angular `TestBed` and verifies that the main traffic light controls are visible. It intentionally stays shallow: its purpose is to verify that the component can render successfully, not to replace detailed behavior tests.

## Running Tests

Install dependencies:

```bash
npm install
```

Run all tests:

```bash
npm test
```

Run only unit tests:

```bash
npm run test:unit
```

Run only smoke tests:

```bash
npm run test:smoke
```

Generate a JUnit XML report:

```bash
npm run test:report
```

The report is written to:

```text
reports/junit.xml
```

## Tool Choices

- **Angular TestBed** is used because the component relies on Angular dependency injection through `inject(MatSnackBar)`.
- **Vitest** is used as the test runner because the Angular project is configured for Vitest-based unit testing.
- **JUnit XML reporting** was added because it is a common format for CI and test management tools such as Xray.
- **Filename-based test grouping** is used for selective execution: `.unit.test.ts` and `.smoke.test.ts`.

## Refactoring

A small refactor was introduced in `AmpelPageComponent`:

```ts
setLight(light: AmpelLicht): void
```

The red, yellow, and green handlers now delegate to this method. This centralizes manual light selection, reduces duplication, and ensures that manual selection consistently stops automatic mode.

## Assumptions

- Manual light selection is deterministic.
- Automatic mode currently selects lights randomly. Therefore the Gherkin scenario for automatic mode does not assert a fixed traffic light sequence.
- The smoke test checks renderability and visible controls only. Deeper UI interaction testing could be added with a browser-based tool if needed.

## Open Points And Extensions

- Add executable Cucumber step definitions for the Gherkin scenarios.
- Add Playwright or Cypress for true browser-based UI tests.
- Add screenshot and console-log collection for failing browser UI tests.
- Add CI configuration, for example GitHub Actions or TeamCity.
- Refactor automatic mode into a deterministic traffic light state machine if a fixed sequence is required.
- Add coverage reporting if coverage thresholds become relevant.
