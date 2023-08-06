import _ from 'lodash'
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
      { label: 'Documentation', value: 'documentation' },
    ],
  }) as Promise<string>

export const commit = () =>
  text({
    message: 'Insert commit message',
    validate: value => {
      if (_.isEmpty(value)) return 'Commit message required'
    },
  }) as Promise<string>

export const ticket = async () => {
  const hasTicket = await confirm({
    message: 'Has ticket ?',
    initialValue: false,
  })

  if (!hasTicket) return

  await text({
    message: 'Insert ticket name',
    validate: value => {
      if (_.isEmpty(value)) return 'Ticket name required'
    },
  })
}

export const emoji = () =>
  confirm({
    message: 'Use emoji on commit type ?',
    initialValue: false,
  }) as Promise<boolean>
