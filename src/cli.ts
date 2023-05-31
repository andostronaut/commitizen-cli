import { cli } from 'cleye'

cli(
  {
    version: '1.0.0',
    commands: [],
  },
  argv => {
    const input = argv._.join(' ')
    console.log(input)
  }
)
