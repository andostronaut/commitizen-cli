import { command } from 'cleye'

import { CliError, handleCliError } from '../utils/cli-errror'
import { log } from '../utils/log'
import { getConfig, hasOwn, setConfigs } from '../utils/config'

export default command(
  {
    name: 'config',
    parameters: ['[mode]', '[key=value...]'],
    description: 'Set or Get Commitizen CLI configs',
  },
  argv => {
    ;(async () => {
      const { mode, keyValue: keyValues } = argv._

      if (!keyValues.length) {
        console.error('Error: Missing required parameter "key=value"\n')
        argv.showHelp()

        return process.exit(1)
      }

      if (mode === 'get') {
        const config = await getConfig()
        for (const key of keyValues) {
          if (hasOwn(config, key)) {
            console.log(`${key}=${config[key as keyof typeof config]}`)
          }
        }

        return
      }

      if (mode === 'set') {
        await setConfigs(
          keyValues.map(
            (keyValue: any) => keyValue.split('=') as [string, string]
          )
        )

        return
      }

      throw new CliError(`Invalid mode: ${mode}`)
    })().catch((err: any) => {
      log({ type: 'error', msg: err.message })

      handleCliError(err)

      process.exit(1)
    })
  }
)
