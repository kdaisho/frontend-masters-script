import fs from 'fs'
import { DS_STORE, SCRIPTS } from '../constants'

export const killJunkFile = filepath => {
  try {
    fs.unlinkSync('./scripts/' + filepath)
  } catch (err) {
    console.error('Failing to delete junk files:', err)
  }
}

export const cleanUp = (found = false) => {
  if (fs.readdirSync(`./${SCRIPTS}`).includes(DS_STORE)) {
    killJunkFile(DS_STORE)
    found = true
  }

  for (const folder of fs.readdirSync(`./${SCRIPTS}`)) {
    if (fs.readdirSync(`./${SCRIPTS}/${folder}`).includes(DS_STORE)) {
      killJunkFile(`${folder}/${DS_STORE}`)
      found = true
    }
  }

  return found
}

export const toArray = str => {
  return str.split(/\n/g).filter(s => s.length)
}

export const buildScript = () => {
  const courses = fs.readdirSync(`./${SCRIPTS}/`)
  const timeFrame = /\[(\d|:)+\]/
  const ctx = {}

  for (const course of courses) {
    ctx[course] = {}
    const sessions = fs.readdirSync(`./${SCRIPTS}/${course}`)

    for (const session of sessions) {
      const text = fs
        .readFileSync(`./${SCRIPTS}/${course}/${session}`)
        .toString()

      let key
      const script = toArray(text).reduce((acc, cur) => {
        if (cur.match(timeFrame)) {
          key = cur
        } else {
          acc[key] = cur
        }

        return acc
      }, {})
      ctx[course][session] = script
    }
  }

  try {
    fs.writeFileSync('./script.json', JSON.stringify(ctx, null, 2))
  } catch (err) {
    console.error(err)
  }
}
