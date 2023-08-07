import _ from 'lodash'
import { default as p, text, confirm, cancel } from '@clack/prompts'

import { CANCELED_OP_MSG } from './constants'
import { getConfig, setConfigs } from './config'

type PatternValues = { [key: string]: string }

const emojiByType: Record<string, any> = {
  feature: '✨',
  bug: '🐛',
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
      ? (defaultPattern = ':emoji :type(:ticket): :commit')
      : (defaultPattern = ':emoji :type: :commit')
  } else {
    defaultPattern = configPattern
  }

  const hasPattern = await confirm({
    message: 'Has specific pattern ?',
    initialValue: false,
  })

  if (p.isCancel(hasPattern)) {
    cancel(CANCELED_OP_MSG)
    process.exit(0)
  }

  if (!hasPattern) return defaultPattern

  const pattern = await text({
    message: 'Insert specific pattern',
    placeholder: 'Example: :type(:ticket): :commit',
    defaultValue: defaultPattern,
    validate: value => {
      if (_.isEmpty(value)) return 'Specific pattern required'

      if (!hasPatternKeys({ type, commit, ticket, emoji, pattern: value }))
        return 'Pattern key not invalid (ex: :type, :ticket, :commit)'
    },
  })

  if (p.isCancel(pattern)) {
    cancel(CANCELED_OP_MSG)
    process.exit(0)
  }

  const savePatterConfig = await confirm({
    message: 'Save pattern to config ?',
    initialValue: true,
  })

  if (p.isCancel(savePatterConfig)) {
    cancel(CANCELED_OP_MSG)
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

  !_.isEmpty(type)
    ? patternKeys.push(':type')
    : !_.isEmpty(commit)
    ? patternKeys.push(':commit')
    : !_.isEmpty(ticket)
    ? patternKeys.push(':ticket')
    : emoji
    ? patternKeys.push(':emoji')
    : ''

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
    ':type': type,
    ':ticket': ticket ?? '',
    ':commit': commit,
    ':emoji': emoji ? emojiByType[type] : '',
  }
  const message = replace({ pattern, values: patternKeys }) as string

  return message
}
