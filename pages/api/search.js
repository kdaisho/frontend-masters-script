import fs from 'fs'
import path from 'path'
import nc from 'next-connect'
import { UTF8 } from '../constants'
import { getAllScripts, toArray } from '../utils'

const handler = nc().post((req, res) => {
  const p = path.join('./scripts/react-intermediate/0-introduction.txt')
  const time = /\[(\d|:)+\]/
  const { searchTerm } = req.body

  const term = new RegExp(searchTerm, 'i')
  const result = {
    searchTerm: '',
    list: [],
  }

  fs.readFile(p, UTF8, (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    let key = null

    const textObj = toArray(data).reduce((acc, cur) => {
      if (!key && cur.match(time)) {
        key = cur
      } else {
        acc[key] = cur
        key = null
      }

      return acc
    }, {})

    for (const [k, v] of Object.entries(textObj)) {
      if (v.search(term) >= 0) {
        result.searchTerm = searchTerm
        result.list.push(k)
      }
    }

    const courses = getAllScripts(searchTerm)

    res.status(200).json({ value: courses })
  })
})

export default handler
