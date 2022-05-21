import React from 'react'

const SearchResult = ({ result }) =>
  result && (
    <section className='flex flex-col gap-4'>
      <h2 className='text-2xl'>Search Result</h2>
      <p>Keyword: {result.search}</p>
      <ul className='flex flex-col gap-10'>
        {Array.isArray(result.courses) &&
          result.courses.map(course => (
            <li key={course.name} className='flex flex-col gap-2'>
              <h3 className='capitalize'>
                Course: {course.name.replace(/-/g, ' ')}
              </h3>
              <p className='ml-4'>Sessions</p>
              <ul className='flex flex-col gap-4 ml-6'>
                {course.sessions.map(session => {
                  return (
                    <li key={session.name} className='ml-4'>
                      <h3 className='capitalize'>
                        {session.name.replace(/-/g, ' ')}
                      </h3>
                      <ul className='ml-4'>
                        {session.timeFrames.map(time => (
                          <li key={time}>{time}</li>
                        ))}
                      </ul>
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
      </ul>
    </section>
  )

export default SearchResult
