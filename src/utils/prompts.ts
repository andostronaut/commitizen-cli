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

export const message = () =>
  text({
    message: 'Insert commit message',
    validate: value => {
      if (value.length === 0) return 'Commit message required'
    },
  }) as Promise<string>

export const ticket = async () => {
  const hasTicket = await confirm({
    message: 'Has ticket ?',
    initialValue: false,
  })

  if (!hasTicket) return

  text({
    message: 'Insert ticket name',
    validate: value => {
      if (value.length === 0) return 'Ticket name required'
    },
  }) as Promise<string>
}

export const pattern = async () => {
  const hasPattern = await confirm({
    message: 'Has specific pattern ?',
    initialValue: false,
  })

  if (!hasPattern) return

  text({
    message: 'Insert specific pattern',
    placeholder: 'Example: :type(:ticket): :commit',
    validate: value => {
      if (value.length === 0) return 'Specific pattern required'
    },
  }) as Promise<string>
}
