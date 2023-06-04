import { select, text } from '@clack/prompts'

export const type = () =>
  select({
    message: 'Choose commit type',
    options: [
      { label: 'Feature', value: 'feature' },
      { label: 'Bugfix', value: 'bugfix' },
      { label: 'Hotfix', value: 'hotfix' },
      { label: 'Chore', value: 'chore' },
      { label: 'Epic', value: 'epic' },
      { label: 'Design', value: 'design' },
      { label: 'Experiment', value: 'experiment' },
      { label: 'Documentation', value: 'documentation' },
    ],
  }) as Promise<string>

export const message = () =>
  text({
    message: 'Insert commit message',
    validate: value => {
      if (value.length === 0) return 'Commit message required'
    },
  }) as Promise<string>
