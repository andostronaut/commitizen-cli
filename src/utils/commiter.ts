import { select, cancel, intro, group } from '@clack/prompts'
import { lightYellow } from 'kolorist'

import { CANCELED_OP_MSG } from './constants'

export const commiter = async () => {
  intro(lightYellow('Commitizen CLI'))

  const type = select({
    message: 'Choose commit type',
    options: [
      {
        label: 'Feature',
        value: 'feature',
      },
      {
        label: 'Bug',
        value: 'bug',
      },
      {
        label: 'Chore',
        value: 'chore',
      },
      {
        label: 'Design',
        value: 'design',
      },
      {
        label: 'Experimental',
        value: 'experimental',
      },
    ],
  })

  const values = await group(
    {
      type: () => type,
    },
    {
      onCancel: () => {
        cancel(CANCELED_OP_MSG)
        process.exit(0)
      },
    }
  )

  console.log(values.type)
}
