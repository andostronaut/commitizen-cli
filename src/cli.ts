import { cli } from 'cleye'

import { PACKAGE_NAME, VERSION } from './utils/constants'

cli(
  {
    name: PACKAGE_NAME,
    version: VERSION,
    commands: [],
  },
  argv => {
    const input = argv._.join(' ')
    console.log(input)
  }
)
