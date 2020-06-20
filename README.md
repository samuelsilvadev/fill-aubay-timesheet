# Fill my Timesheet for me 🕐

Lightweight CLI for fill up a specific timesheet from my current company.

<hr>

![npm bundle size](https://img.shields.io/bundlephobia/min/fill-aubay-timesheet)
![NPM](https://img.shields.io/npm/l/fill-aubay-timesheet)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## How it works

```shell

npx fill-aubay-timesheet --user=your-user --pass=your-pass

```

or you can install globally on your machine

```shell

npm i -g fill-aubay-timesheet

```

and then run

```shell

fill-aubay-timesheet --user=your-user --pass=your-pass

```

with custom hour period

```shell

fill-aubay-timesheet --user=your-user --pass=your-pass --hours-per-day=9

```

for testing purposes

```shell

fill-aubay-timesheet --user=your-user --pass=your-pass --testing=true

```

### Flags

-   `--user`: your personal username to sign in on Aubay's application.
-   `--pass`: your personal password to sign in on Aubay's application.
-   `--hours-per-day`: if you want to change the default value, which is _8_.
-   `--testing`: use this flag when you want to open the browser and see the
    steps happening, also, it will skip some steps, specifically the following:
    [`saveTimesheet`, `reOpenTimesheet`, `submitTimesheet`]. This flag was added
    to help us test the application without create holes in it 🙈

## License

Usage is provided under the
[MIT License](https://github.com/samuelsilvadev/fill-aubay-timesheet/blob/master/LICENSE.md).
See LICENSE for the full details.
