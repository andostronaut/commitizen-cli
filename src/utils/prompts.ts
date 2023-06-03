import { select, text, confirm } from '@clack/prompts'

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
    ],
  }) as Promise<string>

export const message = () =>
  text({
    message: 'Insert commit message',
    validate: value => {
      if (value.length === 0) return 'Commit message required'
    },
  }) as Promise<string>

export const emoji = () => {
  confirm({
    message: 'Use emoji on commit type ?',
    initialValue: true,
  }) as Promise<boolean>
}
