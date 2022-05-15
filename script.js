const fs = require('fs')
const { DS_STORE, SCRIPTS } = require('./constants')

const killJunkFile = filepath => {
  try {
    fs.unlinkSync(`./${SCRIPTS}/` + filepath)
    console.log('✅ clean up')
  } catch (err) {
    console.error(`🆘 Failed to delete ${DS_STORE}:`, err)
  }
}

const cleanUp = () => {
  if (fs.readdirSync(`./${SCRIPTS}`).includes(DS_STORE)) {
    killJunkFile(DS_STORE)
  }

  for (const folder of fs.readdirSync(`./${SCRIPTS}`)) {
    if (fs.readdirSync(`./${SCRIPTS}/${folder}`).includes(DS_STORE)) {
      killJunkFile(`${folder}/${DS_STORE}`)
    }
  }
}

const toArray = str => {
  return str.split(/\n/g).filter(s => s.length)
}

const buildScript = () => {
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
    fs.writeFileSync(`./${SCRIPTS}.json`, JSON.stringify(ctx, null, 2))
    console.log('✅ build script')
  } catch (err) {
    console.error(`🆘 Failed to build ${SCRIPTS}:`, err)
  }
}

cleanUp()
buildScript()
