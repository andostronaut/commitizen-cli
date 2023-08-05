import { promisify } from 'node:util'
import { exec } from 'node:child_process'

import { CliError } from './cli-errror'

const execa = promisify(exec)

export const verifyIfFileHasChanged = async () => {
  const { stdout: stdoutStatus, stderr: stderrStatus } = await execa(
    'git status'
  )

  if (stderrStatus) throw new CliError(`An error occured: ${stderrStatus}`)

  if (
    stdoutStatus.includes('no changes added to commit') ||
    stdoutStatus.includes('nothing added to commit but untracked files present')
  ) {
    return
  }
}
