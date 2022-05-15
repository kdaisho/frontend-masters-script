import nc from 'next-connect'
import ctx from '../../scripts.json'

const handler = nc().post((req, res) => {
  const search = req.body.searchTerm
  const searchRegex = new RegExp(search, 'i')

  const result = {
    search: '',
    list: [],
  }

  for (const course in ctx) {
    for (const session in ctx[course]) {
      for (const [key, value] of Object.entries(ctx[course][session])) {
        if (value.search(searchRegex) >= 0) {
          result.search = search
          result.list.push(key)
        }
      }
    }
  }

  res.status(200).json(result)
})

export default handler
