import fs from 'fs'
import { DS_STORE, UTF8 } from './constants'

export const killJunkFile = filepath => {
  try {
    fs.unlinkSync('./scripts/' + filepath)
  } catch (err) {
    console.error('Failing to delete junk files:', err)
  }
}

export const toArray = str => {
  return str.split(/\n/g).filter(s => s.length)
}

export const getAllScripts = () => {
  const courseNames = fs.readdirSync('./scripts')
  const courseList = courseNames.reduce((courseMap, courseName) => {
    if (courseName === DS_STORE) {
      return courseMap
    }

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
