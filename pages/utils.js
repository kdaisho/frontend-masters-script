export const buildSearchResult = (ctx, { searchRegex, courses }) => {
  for (let i = 0; i < ctx.length; i++) {
    const each = {}
    each.sessions = []

    for (let j = 0; j < ctx[i].sessions.length; j++) {
      const time = []
      let title = ''

      for (let k = 0; k < ctx[i].sessions[j].timeFrames.length; k++) {
        if (ctx[i].sessions[j].timeFrames[k].text.search(searchRegex) >= 0) {
          time.push(ctx[i].sessions[j].timeFrames[k].time)
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
