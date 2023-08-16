import { command } from 'cleye'
import fs from 'node:fs/promises'
import os from 'os'
import path from 'path'
import { dim } from 'kolorist'

import { CliError } from '../utils/cli-errror'
import { log } from '../utils/log'

export default command(
  {
    name: 'clean',
    description: 'Clean Commitizen CLI configuration',
  },
  async () => {
    const cmd = 'commitizen clean'

    console.log(dim(`Running: ${cmd}`))

    const configPath = path.join(os.homedir(), '.commitizen-cli')

    fs.writeFile(configPath, '')
      .then(() => {
        log({ type: 'success', msg: 'Configuration cleaned successfully' })
      })
      .catch(() => {
        throw new CliError('An error occured while cleaning configuration')
      })
  }
)
