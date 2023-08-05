export const formatCommitWithEmojiByType = ({
  type,
  message,
  hasTicket,
  ticket,
}: {
  type: string
  message: string
  hasTicket?: boolean
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

  if (hasTicket) {
    commit = `${emojiByType[type]} ${type}(${ticket}): ${message}`
  } else {
    commit = `${emojiByType[type]} ${type}: ${message}`
  }

  return commit
}
