<p align="center">
  <img 
    src="./assets/banner.png"
    alt="Commitizen CLI"
    style="width:100%;"
  />
</p>

![build](https://github.com/iamando/commitizen-cli/workflows/build/badge.svg)
![license](https://img.shields.io/github/license/iamando/commitizen-cli?color=success)
![npm](https://img.shields.io/npm/v/commitizen-cli)
![release](https://img.shields.io/github/release-date/iamando/commitizen-cli)

Command-line interface tool that helps enforce standardized commit message formats in Git repositories.

## Features

- **Standardized Commit Messages**: Enforce consistent commit message structure by guiding users through prompts and validating against specified formats.
- **Conventional Commit Support**: Easily generate commit messages following popular commit conventions like Conventional Commits.
- **User-Friendly Interface**: Interactive prompt-based interface for creating compliant commit messages without worrying about format details.
- **Integration with Git**: Seamlessly commit changes directly from the CLI, ensuring compliance with the chosen commit message convention.
- **Emoji Support**: Add emojis to your commit messages to express the nature of the changes or provide additional context.
- **Ticket Support**: Set ticket reference to your commit messages to link directly the changes with your task.
- **Specific Pattern**: Commit pattern is flexible and customisable to provide a better commit message convention.

## Installation

To install commitizen-cli, use:

```shell
npm install -g commitizen-cli
```

or if you don't like to install it globaly, use:

```shell
npx commitizen-cli
```

## Usage

Navigate to your Git repository.

Run the following command:

```shell
commitizen-cli
```

or use the minified command:

```shell
cocli
```

### Update

To update to the latest version, use:

```shell
commitizen-cli update
```

or using the minified command:

```shell
cocli update
```

Follow the prompts to generate a standardized commit message.

The CLI will execute the Git command to commit your changes with the generated message.

## Support

Commitizen CLI is an MIT-licensed open source project. It can grow thanks to the sponsors and support.

## License

Commitizen CLI is [MIT licensed](LICENSE).
