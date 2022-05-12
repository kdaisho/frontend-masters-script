import fs from 'fs'
import { DS_STORE, UTF8 } from '../../constants'

export const toArray = str => {
  return str.split(/\n/g).filter(s => s.length)
}

export const getAllScripts = () => {
  const courseNames = fs.readdirSync('./scripts')
  const courseList = courseNames.reduce((courseMap, courseName) => {
    const videoTitles = fs
      .readdirSync(`./scripts/${courseName}`)
      .filter(v => v !== DS_STORE)

    const videoList = videoTitles.reduce((videoMap, filename) => {
      const text = fs.readFileSync(`./scripts/${courseName}/${filename}`, UTF8)
      const scriptArray = toArray(text)

      videoMap.push({
        title: filename,
        body: scriptArray,
      })

      return videoMap
    }, [])

    courseMap.push({
      name: courseName,
      videos: videoList,
    })

    return courseMap
  }, [])

  return courseList
}
