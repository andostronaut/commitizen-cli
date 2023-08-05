import { promisify } from 'node:util'
import { exec } from 'node:child_process'

import { CliError } from './cli-errror'

const execa = promisify(exec)

const gitStatus = async () => {
  const { stdout: stdoutStatus, stderr: stderrStatus } = await execa(
    'git status'
  )

  return { stdoutStatus, stderrStatus }
}

export const isTreeClean = async () => {
  const { stdoutStatus, stderrStatus } = await gitStatus()

  if (stderrStatus) throw new CliError(`An error occured: ${stderrStatus}`)

  if (stdoutStatus.includes('nothing to commit, working tree clean')) {
    process.exit(1)
  }
}
