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
          title = ctx[i].sessions[j].sessionTitle
        }
      }

      if (title.length) {
        each.sessions.push({
          sessionTitle: title,
          timeFrames: time,
        })
      }
    }

    if (each.sessions.length) {
      each.courseName = ctx[i].courseName
      courses.push(each)
    }
  }

  return courses
}
