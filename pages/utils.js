export const buildSearchResult = (ctx, { searchRegex, courses }) => {
  for (const course in ctx) {
    const details = {}
    details[course] = {}

    for (const session in ctx[course]) {
      details[course][session] = []

      for (const [key, value] of Object.entries(ctx[course][session])) {
        if (value.search(searchRegex) >= 0) {
          details[course][session].push(key)
        }
      }

      if (details[course][session].length >= 1) {
        courses.add(details)
      } else {
        delete details[course][session]
      }
    }
  }

  return courses
}
