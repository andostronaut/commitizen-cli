import { cli } from 'cleye'

import { PACKAGE_NAME, VERSION } from './utils/constants'
import { commiter } from './utils/commiter'
import { handleCliError } from './utils/cli-errror'
import { log } from './utils/log'

cli(
  {
    name: PACKAGE_NAME,
    version: VERSION,
    commands: [],
  },
  () => {
    commiter().catch((err: any) => {
      log({ type: 'error', msg: err.message })
      handleCliError(err)
      process.exit(1)
    })
  }
)
