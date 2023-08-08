import { promisify } from 'node:util'
import { exec } from 'node:child_process'
import * as p from '@clack/prompts'
import { lightGreen, lightYellow } from 'kolorist'

import { CliError } from './cli-errror'

const execa = promisify(exec)

export const gitStatus = async () => {
  const { stdout: stdoutStatus, stderr: stderrStatus } = await execa(
    'git status'
  )

  return { stdoutStatus, stderrStatus }
}

export const gitAdd = async () => {
  const { stdout: stdoutAdd, stderr: stderrAdd } = await execa('git add .')

  return { stdoutAdd, stderrAdd }
}

export const gitCommit = async ({ commit }: { commit: string }) => {
  const { stdout: stdoutCommit, stderr: stderrCommit } = await execa(
    `git commit -m "${commit}"`
  )

  return { stdoutCommit, stderrCommit }
}

export const isTreeClean = async () => {
  const { stdoutStatus, stderrStatus } = await gitStatus()

  if (stderrStatus) throw new CliError(`An error occured: ${stderrStatus}`)

  if (stdoutStatus.includes('nothing to commit, working tree clean')) {
    p.outro(lightGreen('Nothing to commit, working tree clean 🧹'))

    process.exit(1)
  }
}

export const isGitRepository = async () => {
  const { stdoutStatus, stderrStatus } = await gitStatus()

  if (
    stderrStatus.includes('not a git repository') ||
    stdoutStatus.includes('not a git repository')
  ) {
    p.outro(lightYellow('Not a git repository 😢'))

    process.exit(1)
  }
}
