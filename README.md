# SauceDemo Quality Automation

A Playwright TypeScript automation project for SauceDemo.

## Test Scope

- Successful user login
- Login result validation
- Product page validation
- Product count validation

## Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions

## Project Structure

```text
.
├── tests/
│   └── login.spec.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
└── .gitignore
```

## Installation

```bash
npm ci
npx playwright install
```

## Run Tests

Run Chromium tests:

```bash
npx playwright test --project=chromium
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.ts
```

Run tests with browser visible:

```bash
npx playwright test --headed
```

Open HTML report:

```bash
npx playwright show-report
```
