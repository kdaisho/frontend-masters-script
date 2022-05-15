import nc from 'next-connect'
import ctx from '../../scripts.json'
import { buildSearchResult } from '../utils'

const handler = nc().post((req, res) => {
  const search = req.body.searchTerm
  const searchRegex = new RegExp(search, 'i')

  const courses = buildSearchResult(ctx, {
    searchRegex,
    courses: [],
  })

  res.status(200).json({ search, courses: courses })
})

export default handler
