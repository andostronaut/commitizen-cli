import { cancel, intro, group } from '@clack/prompts'
import { lightYellow } from 'kolorist'

import { CANCELED_OP_MSG } from './constants'
import { type, message } from './prompts'

export const commiter = async () => {
  intro(lightYellow('Commitizen CLI'))

  const values = await group(
    {
      type: () => type(),
      message: () => message(),
    },
    {
      onCancel: () => {
        cancel(CANCELED_OP_MSG)
        process.exit(0)
      },
    }
  )

  console.log(values.type)
  console.log(values.message)
}
