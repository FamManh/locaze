# Contributing

The base branch is **`main`**.

## Project Info

First of all, I want to thank everyone who made pull requests for Locaze. I never thought the GitHub Community would be so nice! Because of this, I also never thought that other people would actually read and edit my code. It is not very well structured or commented, sorry about that.

## Workflow

> **Note**
> Please feature/fix/update... into individual PRs (not one changing everything)

- Create a [github fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo).
- On your fork, create a branch make the changes, commit and push.
- Create a pull-request.

## Install

```bash
pnpm install
```

## Local scripts

| Name                         | Description                                                                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm changeset`           | Add a changeset to declare a new version                                                                                                                |
| `pnpm typecheck`           | Run typechecks in all workspaces                                                                                                                        |
| `pnpm lint`                | Display linter issues in all workspaces                                                                                                                 |
| `pnpm lint --fix`          | Attempt to run linter auto-fix in all workspaces                                                                                                        |
| `yarn g:test-unit`           | Run unit tests in all workspaces                                                                                                                        |
| `pnpm build`               | Run build in all workspaces                                                                                                                             |
| `pnpm clean`               | Clean builds in all workspaces                                                                                                                          |
| `pnpm check-dist`          | Ensure build dist files passes es2017 (run `g:build` first).                                                                                            |
| `pnpm check-size`          | Ensure build files are within size limit (run `g:build` first).                                                                                         |
| `pnpm build-doc`           | Build documentation (generally api doc)                                                                                                                 |
| `pnpm global-cache`    | Clean tooling caches (eslint, jest...)
## Git message format

This repo adheres to the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) convention.

Commit messages are enforced through [commitlint](https://github.com/conventional-changelog/commitlint) and [a husky](https://github.com/typicode/husky) [commit-msg](https://github.com/belgattitude/nextjs-monorepo-example/blob/main/.husky/commit-msg) hook.

### Activated prefixes

- **chore**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **lint**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests
- **translation**: Adding missing translations or correcting existing ones
- **revert**: When reverting a commit
- **style**: A change that affects the scss, less, css styles
- **release**: All related to changeset (pre exit...)

> **Note**
> Up-to-date configuration can be found in [commitlint.config.js](https://github.com/fammanh/locaze/blob/main/commitlint.config.js).

## Structure

```
.
├── apps
│   ├── ...
│   └── server
│   └── web
├── packages
│   ├── ...
│   └── tsconfigs
│   └── eslint-configs
└ package.json
```

## Coding Styles

- 4 spaces indentation
- Follow `.editorconfig`
- Follow ESLint
- Methods and functions should be documented with JSDoc

## Name Conventions

- Javascript/Typescript: camelCaseType
- SQLite: snake_case (Underscore)
- CSS/SCSS: kebab-case (Dash)
