# Testing Preferences

## Context

These are Vue applications that serve as AI-powered TTRPG generator tools (statblock generator, item generator, dungeon generator, etc.) embedded in WordPress. They make calls to the ChatGPT API and store data in browser local storage. Internal business logic is minimal — most complexity lives in API call construction, response parsing, and local storage management.

## Core Testing Philosophy

- Tests exist to give confidence during overhauls and refactors, not for coverage metrics
- Mock all external API responses — never call ChatGPT in tests
- Focus on data integrity above all else — paying users have saved content in local storage that must never be corrupted or lost
- When doing an overhaul: write tests capturing current behavior FIRST, then refactor, then run tests to verify nothing broke

## What to Test (Priority Order)

### 1. Local Storage Data Layer (Critical)

- Data is written to the correct keys in the expected shape
- Data retrieval returns properly structured objects
- Edge cases: missing keys, corrupted data, empty storage handled gracefully
- Existing data structures are preserved after code changes

### 2. API Integration

- Correct prompts/payloads are sent to ChatGPT given user inputs
- API responses are parsed correctly into internal data structures
- Parsed data is stored correctly in local storage
- Error handling: malformed responses, timeouts, rate limits

### 3. Cross-Tool Linking (as this is built out)

- When tools reference each other (e.g. statblock linked to dungeon), links resolve correctly
- Linked data stays consistent when either side is updated or deleted
- Navigation between linked tools preserves state

### 4. UI Rendering

- Components render correctly given known data shapes
- User interactions trigger the right data operations
- Lower priority than data layer tests

### 5. Data Migrations (when needed)

- When data structures change, migration tests should be written BEFORE migration code
- Given old format, migration produces correct new format
- No data is lost or silently dropped
- Migration is idempotent — running it twice doesn't corrupt anything

## What NOT to Test

- ChatGPT output quality or content
- WordPress integration layer
- Styling or visual layout
- Third-party library internals

## Mocking Approach

- Create a fixtures directory with representative API responses for each tool type
- Include both well-formed responses and edge cases (partial responses, unexpected formats)
- Mock local storage with an in-memory implementation for test isolation
- Each test should start with a clean storage state

## Overhaul Workflow

1. Before any refactor: write tests that capture current behavior against current data structures
2. Run those tests to make sure they pass on the existing code
3. Do the refactor
4. Run tests again to verify nothing broke
5. Add new tests for any new behavior
6. If Claude is doing an overhaul, it should ask whether tests exist first and run them after

## General Preferences

- Prefer simple, readable test files over clever abstractions
- Test names should describe the scenario plainly: "stores generated item with all fields to local storage"
- Keep test files alongside the code they test or in a parallel **tests** directory — ask which pattern is already in use
- No snapshot tests for data transformations — use explicit assertions
