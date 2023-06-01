import { promisify } from 'node:util'
import { exec } from 'node:child_process'
import { cancel, intro, group, confirm, outro } from '@clack/prompts'
import { lightYellow } from 'kolorist'
import dedent from 'dedent'

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
    const cmd = `git commit -m "${commit}"`

    const { stdout: stdoutStatus, stderr: stderrStatus } = await execa(
      'git status'
    )

    if (stderrStatus) throw new CliError(`An error occured: ${stderrStatus}`)

    if (stdoutStatus.includes('no changes added to commit')) {
      const addStagedFiles = await confirm({
        message:
          'No changes added to commit, would you like to add staged files ?',
        initialValue: true,
      })

      if (addStagedFiles) {
        const { stderr: stderrAdd } = await execa('git add .')

        if (stderrAdd) throw new CliError(`An error occured: ${stderrAdd}`)

        const { stderr: stderrCmd } = await execa(cmd)

        if (stderrCmd) throw new CliError(`An error occured: ${stderrCmd}`)

        outro(dedent`
        You're all set 🎉

        use "git push" to publish your local commits
      `)
      }

      return
    }

    const { stderr: stderrCmd } = await execa(cmd)

    if (stderrCmd) throw new CliError(`An error occured: ${stderrCmd}`)

    outro(dedent`
    You're all set 🎉

    use "git push" to publish your local commits
  `)
  } catch (err: any) {
    log({ type: 'error', msg: err.message })
    handleCliError(err)
    process.exit(1)
  }
}
