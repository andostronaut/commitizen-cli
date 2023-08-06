import _ from 'lodash'

export const formatCommitWithEmojiByType = ({
  type,
  message,
  ticket,
}: {
  type: string
  message: string
  ticket?: string
}): string => {
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

  let commit: string

  if (!_.isEmpty(ticket)) {
    commit = `${emojiByType[type]} ${type}(${ticket}): ${message}`
  } else {
    commit = `${emojiByType[type]} ${type}: ${message}`
  }

  return commit
}
