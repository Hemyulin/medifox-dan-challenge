# AmpelApp Test Automation MVP

This repository contains an Angular traffic light application plus a small test automation MVP for the Probeaufgabe "Test Automation Engineer".

GitHub repository:

```text
https://github.com/Hemyulin/medifox-dan-challenge
```

## Scope

The goal is a clean, reproducible minimum test suite that shows the intended test architecture without turning the sample app into a full framework. The MVP includes:

- a Gherkin behavior specification with five traffic light scenarios
- Angular/Vitest component tests for deterministic logic
- one Angular-rendered UI smoke test
- selective test commands for unit and smoke tests
- optional JUnit XML reporting
- a GitHub Actions workflow for automated test execution
- a protected `main` branch workflow that requires pull requests and passing tests

## Requirement Mapping

| Requirement | Implementation |
| --- | --- |
| Gherkin feature file with at least 5 scenarios | `features/traffic-light-control.feature` |
| At least 3 automated scenarios | `src/app/components/ampel-page/ampel-page.component.unit.test.ts` covers initial, red, yellow, and green behavior |
| At least 2 tests without real UI interaction | Unit tests call component methods directly and assert component state |
| At least 1 UI smoke test | `src/app/components/ampel-page/ampel-page.component.smoke.test.ts` renders the Angular component and checks visible controls |
| Maintainable test code | Unit and smoke tests are separated by filename and purpose |
| Optional test tagging | Gherkin scenarios use Xray-style placeholder keys and tags such as `@TAE-001`, `@component`, `@automated`, and `@manual` |
| Optional selective execution | `npm run test:unit` and `npm run test:smoke` |
| Optional reporting | `npm run test:report` writes `reports/junit.xml` |
| Optional CI configuration | `.github/workflows/tests.yml` runs unit and smoke tests in GitHub Actions |

## Test Specification

The Gherkin scenarios are defined in:

```text
features/traffic-light-control.feature
```

Covered behavior:

- initial state has all lights off
- red light can be switched on manually
- yellow light can be switched on manually
- green light can be switched on manually
- automatic mode changes the active light over time

The feature file is used as readable living specification in this MVP. It is not executed directly by Cucumber. Selected scenarios are mapped to Angular/Vitest tests.

The scenario tags use placeholder keys such as `@TAE-001` to show how the tests could later be mapped to Jira/Xray test issues. In a real Xray project, these placeholders would be replaced by generated Jira issue keys.

## Traceability

| Xray candidate key | Scenario | Automation status | Automated by |
| --- | --- | --- | --- |
| `TAE-001` | Initial state has all lights off | Automated | `ampel-page.component.unit.test.ts` |
| `TAE-002` | Red light can be switched on manually | Automated | `ampel-page.component.unit.test.ts` |
| `TAE-003` | Yellow light can be switched on manually | Automated | `ampel-page.component.unit.test.ts` |
| `TAE-004` | Green light can be switched on manually | Automated | `ampel-page.component.unit.test.ts` |
| `TAE-005` | Automatic mode changes the active light over time | Manual / future automation | Not automated in this MVP |

## Automated Tests

Unit tests:

```text
src/app/components/ampel-page/ampel-page.component.unit.test.ts
```

These tests instantiate the Angular component through `TestBed`, call component methods directly, and assert the signal state. They do not interact with the rendered UI.

Smoke test:

```text
src/app/components/ampel-page/ampel-page.component.smoke.test.ts
```

The smoke test renders `AmpelPageComponent` and verifies that the main traffic light controls are visible. It intentionally stays shallow: its purpose is to verify that the component can render successfully.

## Running Locally

Install dependencies:

```bash
npm install
```

Run all automated tests:

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

Start the application:

```bash
npm start
```

Then open `http://localhost:4200/`.

## Architecture And Tool Decisions

- Angular `TestBed` is used because the component relies on Angular dependency injection through `inject(MatSnackBar)`.
- Vitest is used as the test runner because this Angular project is configured for Vitest-based unit testing.
- JUnit XML reporting was added because it is a common CI and test management format.
- Filename-based grouping keeps selective execution simple: `.unit.test.ts` for logic-oriented tests and `.smoke.test.ts` for render smoke coverage.
- Gherkin is kept separate from the automation code so the expected behavior remains readable for non-technical review.

## Working Notes / Approach

These are the main steps I went through while building the MVP:

- Downloaded and reviewed the supplied Angular project.
- Created a Git repository to keep changes traceable.
- Reviewed the existing README and noticed that it was mostly the generic Angular CLI README, so I first had to understand the app by running and exploring it.
- Tried to start the app with `ng serve` / `npm start`; dependency installation required a newer Node.js version.
- Performed exploratory testing of the traffic light behavior.
- Observed that automatic mode switches colors randomly. My initial expectation for a traffic light would have been a deterministic sequence such as red -> red/yellow -> green -> yellow -> red.
- Converted the manually observed behavior into Gherkin scenarios.
- Inspected the code structure and main domain terms:
  - `models/ampel-licht`
  - `AmpelLicht`
  - `aktuellesAmpelLicht`
- Noted that some domain naming is in German. This is not critical for the MVP, but consistent language would improve maintainability in a larger project.
- Compared possible test tooling and chose Vitest because the Angular project already had Vitest-oriented setup and it keeps the MVP lightweight.
- Added unit/component tests for the deterministic traffic light color behavior.
- Added a UI smoke test to verify that the Angular component renders the main controls.
- Refactored the component slightly to centralize manual light selection and improve testability.
- Added GitHub Actions for automated unit and smoke test execution.
- Added a protected `main` branch rule on GitHub:
  - changes must come from a feature branch
  - merging requires a pull request
  - merging is blocked while required tests are failing

## CI And Merge Policy

The repository includes a GitHub Actions workflow in:

```text
.github/workflows/tests.yml
```

The workflow runs on every `push` and every `pull_request`. It contains two separate jobs:

- `Unit Tests`: checks out the repository, sets up Node.js `22.12.0`, installs dependencies with `npm ci`, and runs `npm run test:unit`.
- `Smoke Tests`: checks out the repository, sets up Node.js `22.12.0`, installs dependencies with `npm ci`, and runs `npm run test:smoke`.

On GitHub, the `main` branch is protected by a merge rule:

- changes must be developed on a feature branch
- changes must be merged through a pull request
- merging into `main` is blocked while required tests are failing

This keeps the MVP reproducible locally and gives the same core quality gate in CI before changes reach `main`.

## Xray Integration Path

The MVP is prepared for a later Xray connection without adding project-specific API credentials or custom upload scripts:

- the Gherkin file can be imported into Xray as Cucumber-style test documentation
- scenario tags such as `@TAE-001` demonstrate where Jira/Xray issue keys would be used
- the traceability table documents which scenarios are already automated
- `npm run test:report` creates `reports/junit.xml`, which can be used as CI evidence or adapted for Xray test execution import
- the GitHub Actions workflow already provides a natural place to add an Xray import step later

## Refactoring

A small refactor was introduced in `AmpelPageComponent`:

```ts
setLight(light: AmpelLicht): void
```

The red, yellow, and green handlers delegate to this method. This centralizes manual light selection, reduces duplication, and ensures that manual selection consistently stops automatic mode.

## Assumptions

- Manual light selection is deterministic and can be tested directly on component logic.
- Automatic mode currently selects lights randomly, so the Gherkin scenario does not assert a fixed red-yellow-green sequence.
- The UI smoke test checks renderability and visible controls only. It is not meant to replace full browser-based interaction testing.

## Open Points And Possible Extensions

- Add executable Cucumber step definitions for the Gherkin scenarios.
- Add Playwright or Cypress for true browser-based UI interaction tests.
- Add screenshot and console-log collection for failing browser UI tests.
- Refactor automatic mode into a deterministic traffic light state machine if a fixed sequence is required.
- Add coverage reporting and thresholds if they become relevant.

## Submission Notes

The ZIP package should include the source code, README, Gherkin feature files, tests, and optional CI configuration. The `node_modules` directory should not be included.

The same work is also available in GitHub at:

```text
https://github.com/Hemyulin/medifox-dan-challenge
```
