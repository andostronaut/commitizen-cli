import { select, text } from '@clack/prompts'

export const type = () =>
  select({
    message: 'Choose commit type',
    options: [
      { label: 'Feature', value: 'feature' },
      { label: 'Bug', value: 'bug' },
      { label: 'Chore', value: 'chore' },
      { label: 'Design', value: 'design' },
      { label: 'Experimental', value: 'experimental' },
    ],
  })

export const message = () =>
  text({
    message: 'Insert commit message',
    validate: value => {
      if (value.length === 0) return 'Commit message required'
    },
  })
