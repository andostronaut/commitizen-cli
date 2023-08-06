import _ from 'lodash'
import { cancel, intro, group, confirm, outro } from '@clack/prompts'
import { bgYellow, black } from 'kolorist'
import dedent from 'dedent'

import { CANCELED_OP_MSG } from './constants'
import { type, commit, ticket, emoji } from './prompts'
import { handleCliError, CliError } from './cli-errror'
import { log } from './log'
import { isTreeClean, gitAdd, gitStatus, gitCommit } from './git'
import { pattern, transform } from './pattern'

export const commiter = async () => {
  intro(bgYellow(black('Commitizen CLI')))

  await isTreeClean()

  const values = await group(
    {
      type: () => type(),
      commit: () => commit(),
      ticket: () => ticket(),
      emoji: () => emoji(),
    },
    {
      onCancel: () => {
        cancel(CANCELED_OP_MSG)
        process.exit(0)
      },
    }
  )

  try {
    const blueprint: any = await pattern({
      type: values.type,
      commit: values.commit,
      ticket: values.ticket,
      emoji: values.emoji,
    })

    if (_.isEmpty(blueprint)) return

    const commit: string = await transform({
      type: values.type,
      commit: values.commit,
      ticket: values.ticket,
      emoji: values.emoji,
      pattern: blueprint,
    })

    const { stdoutStatus, stderrStatus } = await gitStatus()

    if (stderrStatus) throw new CliError(`An error occured: ${stderrStatus}`)

    if (
      stdoutStatus.includes('no changes added to commit') ||
      stdoutStatus.includes(
        'nothing added to commit but untracked files present'
      )
    ) {
      const type = stdoutStatus.includes('no changes added to commit')
        ? 'modified'
        : 'untracked'
      const addStagedFiles = await confirm({
        message: `No changes added to commit, would you like to add ${type} files ?`,
        initialValue: true,
      })

      if (addStagedFiles) {
        const { stderrAdd } = await gitAdd()

        if (stderrAdd) throw new CliError(`An error occured: ${stderrAdd}`)

        const { stderrCommit } = await gitCommit({ commit: commit.trim() })

        if (stderrCommit)
          throw new CliError(`An error occured: ${stderrCommit}`)

        outro(dedent`
        You're all set 🎉

        use "git push" to publish your local commits
      `)
      }

      return
    }

    const { stderrCommit } = await gitCommit({ commit: commit.trim() })

    if (stderrCommit) throw new CliError(`An error occured: ${stderrCommit}`)

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
