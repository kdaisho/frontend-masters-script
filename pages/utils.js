export const highlight = (keyword, str) => {
  const regex = RegExp(keyword, 'gi')
  let first = 0
  let last = 0
  let highlighted = ''
  let matchArray = ''

  while ((matchArray = regex.exec(str)) !== null) {
    last = matchArray.index
    highlighted += str.substring(first, last)
    highlighted += `<span class='bg-yellow-200'>${matchArray[0]}</span>`
    first = regex.lastIndex
  }

  highlighted += str.substring(first, str.length)

  return highlighted
}

export const buildSearchResult = (ctx, { searchRegex, courses }) => {
  for (let i = 0; i < ctx.length; i++) {
    const each = {}
    each.sessions = []

    for (let j = 0; j < ctx[i].sessions.length; j++) {
      const time = []
      let title = ''

      for (let k = 0; k < ctx[i].sessions[j].timeFrames.length; k++) {
        if (ctx[i].sessions[j].timeFrames[k].text.search(searchRegex) >= 0) {
          const frame = {
            name: ctx[i].sessions[j].timeFrames[k].time,
            text: ctx[i].sessions[j].timeFrames[k].text,
          }
          time.push(frame)
          title = ctx[i].sessions[j].name
        }
      }

      if (title.length) {
        each.sessions.push({
          name: title,
          timeFrames: time,
        })
      }
    }

    if (each.sessions.length) {
      each.name = ctx[i].name
      courses.push(each)
    }
  }

  return courses
}
