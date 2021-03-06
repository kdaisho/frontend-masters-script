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

const timeRegex = /\[(\d|:)+\]/

const toArray = str => {
  const obj = {}
  return str
    .split(/\n/g)
    .map(s => {
      if (s.match(timeRegex)) {
        obj.time = s
      } else {
        obj.text = s
        return { ...obj }
      }
    })
    .filter(o => o?.text.length)
}

const getNum = str => str.match(/^(\d)+/)[0]

const buildScript = () => {
  const courses = fs.readdirSync(`./${SCRIPTS}/`)
  const ctx = []

  for (const course of courses) {
    const _course = {}
    _course.name = course
    _course.sessions = []
    const listSessions = fs.readdirSync(`./${SCRIPTS}/${course}`)

    for (const session of listSessions) {
      const _eachSession = {}
      _eachSession.name = session.replace(/\.txt$/, '')
      _eachSession.timeFrames = []

      const text = fs
        .readFileSync(`./${SCRIPTS}/${course}/${session}`)
        .toString()

      for (const each of toArray(text)) {
        _eachSession.timeFrames.push(each)
      }

      _course.sessions.push(_eachSession)
    }

    _course.sessions.sort((a, b) => {
      return +getNum(a.name) - +getNum(b.name)
    })

    ctx.push(_course)
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
