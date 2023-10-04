import _ from 'lodash'
import * as p from '@clack/prompts'

export const type = () =>
  p.select({
    message: 'Choose commit type',
    initialValue: 'feat',
    options: [
      {
        label: 'Feat',
        value: 'feat',
        hint: 'For new features (e.g., feat: implement --cache-to feature to export cache)',
      },
      {
        label: 'Fix',
        value: 'fix',
        hint: 'For improvements and bugfixes that do not introduce a feature (e.g., fix: improve error message)',
      },
      {
        label: 'Hotfix',
        value: 'hotfix',
        hint: 'For improvements and bugfixes that do not introduce a feature, directly in prodution mode (e.g., fix: improve success message)',
      },
      {
        label: 'Chore',
        value: 'chore',
        hint: 'General things that should be excluded (e.g., chore: clean up X)',
      },
      {
        label: 'Design',
        value: 'design',
        hint: 'For design changes only (e.g., design: use rounded button)',
      },
      {
        label: 'Experiment',
        value: 'experiment',
        hint: 'General things that should be in experiment (e.g., experiment: implement new query system in X)',
      },
      {
        label: 'Docs',
        value: 'docs',
        hint: 'For documentation changes only (e.g., docs: fix typo in X)',
      },
      {
        label: 'Refact',
        value: 'refact',
        hint: 'General things that should be restructured but not changing the orginal functionality (e.g., refact: move X to new file utils)',
      },
      {
        label: 'CI',
        value: 'ci',
        hint: 'For internal CI specific changes (e.g., ci: enable X for tests)',
      },
      {
        label: 'Infra',
        value: 'infra',
        hint: 'For infrastructure changes (e.g., infra: Enable cloudfront for X)',
      },
      {
        label: 'Test',
        value: 'test',
        hint: 'For changes to tests only (e.g., test: check if X does Y)',
      },
    ],
  }) as Promise<string>

export const commit = () =>
  p.text({
    message: 'Insert commit message',
    validate: value => {
      if (_.isEmpty(value)) return 'Commit message required'
    },
  }) as Promise<string>

export const ticket = async ({ flags }: { flags: TArgv }) => {
  if (flags.minified) return

  const hasTicket = await p.confirm({
    message: 'Has ticket ?',
    initialValue: false,
  })

  if (!hasTicket) return

  await p.text({
    message: 'Insert ticket name',
    validate: value => {
      if (_.isEmpty(value)) return 'Ticket name required'
    },
  })
}

export const emoji = ({ flags }: { flags: TArgv }) => {
  if (flags.minified) return false

  p.confirm({
    message: 'Use emoji on commit type ?',
    initialValue: false,
  }) as Promise<boolean>
}
