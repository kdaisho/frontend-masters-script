import nc from 'next-connect'
import ctx from '../../scripts.json'

const handler = nc().post((req, res) => {
  const search = req.body.searchTerm
  const searchRegex = new RegExp(search, 'i')

  const result = {
    search: '',
    list: [],
  }

  const ctxArray = Object.keys(ctx)

  for (let i = 0; i < ctxArray.length; i++) {
    const sessionArray = Object.keys(ctx[ctxArray[i]])
    for (let j = 0; j < sessionArray.length; j++) {
      const timeFrameArray = Object.keys(ctx[ctxArray[i]][sessionArray[j]])
      for (let k = 0; k < timeFrameArray.length; k++) {
        const text = ctx[ctxArray[i]][sessionArray[j]][timeFrameArray[k]]
        if (text.search(searchRegex) >= 0) {
          result.search = search
          result.list.push(timeFrameArray[k])
        }
      }
    }
  }

  res.status(200).json(result)
})

export default handler
