# Vitruvi Playwright Sample

Playwright E2E tests POC for vitruvi.

## Installation 

Follow instructions from [Playwright Getting Started](https://playwright.dev/docs/intro) page.

You can also install [VS Code Playwright](https://playwright.dev/docs/getting-started-vscode) plugin to help you debug tests.

## Setup

To set the environment where tests will be executed, create an environment variable with the name `TEST_ENVIRONMENT`. Its value should be the name of the environment (e.g. dev-test, staging, etc).

Then create a `TEST_ENVIRONMENT`.env file (e.g. `dev-test.env`) in the root folder of this project with the following information: 

```
EMAIL=user to log into the environment
PASSWORD=user password 
USER_NAME=name initials and full name shown when user is logged in.
```

## Tests Execution

All tests can be executed by running
```
npx playwright test
```
They can also be executed using the VS Code plugin, in the Tests tab.