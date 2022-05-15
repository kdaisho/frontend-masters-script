export const buildSearchResult = (ctx, { searchRegex, courses }) => {
  for (const course in ctx) {
    const eachCourse = {
      sessions: [],
    }
    eachCourse.name = course

    for (const session in ctx[course]) {
      const time = []

      for (const [key, value] of Object.entries(ctx[course][session])) {
        if (value.search(searchRegex) >= 0) {
          time.push(key)

          eachCourse.sessions.push({
            title: session,
            time,
          })
        }
      }
    }

    if (eachCourse.sessions.length) {
      courses.push(eachCourse)
    }
  }

  return courses
}
