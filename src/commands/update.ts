import { command } from 'cleye'
import { spawn } from 'node:child_process'
import { dim } from 'kolorist'

import { CliError } from '../utils/cli-errror'

export default command(
  {
    name: 'update',
    description: 'Update Commitizen CLI to the latest version',
  },
  async () => {
    const cmd = 'npm update -g commitizen-cli'

    console.log(dim(`Running: ${cmd}`))

    const update = spawn(cmd, {
      stdio: 'inherit',
      shell: process.env.SHELL || true,
    })

    update.stderr?.on('error', () => {
      throw new CliError('An error occured on updating package')
    })

    update.on('close', code => {
      if (code !== 0) {
        console.log(`update process exited with code ${code}`)
      }
    })
  }
)
