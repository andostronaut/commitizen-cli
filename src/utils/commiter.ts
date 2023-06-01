import { promisify } from 'node:util'
import { exec } from 'node:child_process'
import { cancel, intro, group } from '@clack/prompts'
import { lightYellow } from 'kolorist'

import { CANCELED_OP_MSG } from './constants'
import { type, message } from './prompts'
import { handleCliError, CliError } from './cli-errror'
import { log } from './log'

const execa = promisify(exec)

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

  try {
    const commit = `${values.type}: ${values.message}`
    const cmd = `git commit -m ${commit}`
    const { stdout, stderr } = await execa(cmd)

    if (stderr) throw new CliError(`An error occured: ${stderr}`)

    console.log(stdout)
    console.log(commit)
  } catch (err: any) {
    log({ type: 'error', msg: err.message })
    handleCliError(err)
    process.exit(1)
  }
}
