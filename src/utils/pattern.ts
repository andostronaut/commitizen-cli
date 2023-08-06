type PatternValues = { [key: string]: string }

const replacePattern = (pattern: string, values: PatternValues): string => {
  for (const value in values) {
    pattern = pattern.replace(new RegExp(value, 'g'), values[value])
  }

  return pattern
}

export const transformPattern = (pattern: string) => {
  const patternKeys = {
    ':type': '',
    ':ticket': '',
    ':commit': '',
  }
  const commit = replacePattern(pattern, patternKeys)

  return commit
}

export const hasPatternKeys = (pattern: string) => {
  const patternKey = [':type', ':ticket', ':commit']
  const containKeys = patternKey.every(sub => {
    return pattern.includes(sub)
  })

  return containKeys
}
