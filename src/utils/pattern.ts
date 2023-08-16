import _ from 'lodash'
import * as p from '@clack/prompts'

import { CANCELED_OP_MSG, commitKeys } from './constants'
import { getConfig, setConfigs } from './config'

type PatternValues = { [key: string]: string }

const emojiByType: Record<string, any> = {
  feature: '✨',
  bugfix: '🐛',
  hotfix: '🚑',
  chore: '🛠️',
  epic: '📌',
  design: '🎨',
  experiment: '🧪',
  documentation: '📝',
}

export const pattern = async ({
  type,
  commit,
  ticket,
  emoji,
}: {
  type: string
  commit: string
  ticket: string | any
  emoji: boolean
}) => {
  let defaultPattern: string

  const { PATTERN: configPattern } = await getConfig()

  if (_.isEmpty(configPattern)) {
    ticket
      ? (defaultPattern = `${commitKeys.emoji} ${commitKeys.type}(${commitKeys.ticket}): ${commitKeys.commit}`)
      : (defaultPattern = `${commitKeys.emoji} ${commitKeys.type}: ${commitKeys.commit}`)
  } else {
    defaultPattern = configPattern
  }

  const hasPattern = await p.confirm({
    message: 'Has specific pattern ?',
    initialValue: false,
  })

  if (p.isCancel(hasPattern)) {
    p.cancel(CANCELED_OP_MSG)
    process.exit(0)
  }

  if (!hasPattern) return defaultPattern

  const pattern = await p.text({
    message: 'Insert specific pattern',
    placeholder: `Example: ${commitKeys.type}(${commitKeys.ticket}): ${commitKeys.commit}`,
    defaultValue: defaultPattern,
    validate: value => {
      if (_.isEmpty(value)) return 'Specific pattern required'

      if (!hasPatternKeys({ type, commit, ticket, emoji, pattern: value }))
        return `Pattern key not invalid (ex: ${commitKeys.type}, ${commitKeys.ticket}, ${commitKeys.commit})`
    },
  })

  if (p.isCancel(pattern)) {
    p.cancel(CANCELED_OP_MSG)
    process.exit(0)
  }

  const savePatterConfig = await p.confirm({
    message: 'Save pattern to config ?',
    initialValue: true,
  })

  if (p.isCancel(savePatterConfig)) {
    p.cancel(CANCELED_OP_MSG)
    process.exit(0)
  }

  setConfigs([['PATTERN', pattern]])
}

export const hasPatternKeys = ({
  type,
  commit,
  ticket,
  emoji,
  pattern,
}: {
  type: string
  commit: string
  ticket: string | any
  emoji: boolean
  pattern: string
}): boolean => {
  const patternKeys: Array<string> = []

  if (!_.isEmpty(type)) patternKeys.push(commitKeys.type)
  if (!_.isEmpty(commit)) patternKeys.push(commitKeys.commit)
  if (!_.isEmpty(ticket)) patternKeys.push(commitKeys.ticket)
  if (emoji) patternKeys.push(commitKeys.emoji)

  const containKeys = patternKeys.every(key => pattern.includes(key))

  return containKeys
}

const replace = ({
  pattern,
  values,
}: {
  pattern: string
  values: PatternValues
}): string => {
  for (const value in values) {
    pattern = pattern?.replace(
      new RegExp(value, 'g'),
      values[value] as string
    ) as string
  }

  return pattern
}

export const transform = async ({
  type,
  commit,
  ticket,
  emoji,
  pattern,
}: {
  type: string
  commit: string
  ticket: string | any
  emoji: boolean
  pattern: string
}): Promise<string> => {
  const patternKeys = {
    [commitKeys.type]: type,
    [commitKeys.ticket]: ticket ?? '',
    [commitKeys.commit]: commit,
    [commitKeys.emoji]: emoji ? emojiByType[type] : '',
  }
  const message = replace({ pattern, values: patternKeys }) as string

  return message
}
