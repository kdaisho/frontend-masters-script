import React from 'react'
import { highlight } from '../../pages/utils'

const SearchResult = ({ result, sessionsHidden, textHidden }) =>
  result && (
    <section className='flex flex-col gap-4'>
      <p className='text-2xl py-6'>
        Keyword: <span className='text-5xl px-4'>{result.search}</span>
      </p>
      <ul className='flex flex-col gap-4'>
        {Array.isArray(result.courses) &&
          result.courses.map(course => (
            <li key={course.name} className='flex flex-col gap-2'>
              <h3 className='capitalize text-2xl font-semibold'>
                {course.name.replace(/-/g, ' ')}
              </h3>
              <span className={sessionsHidden ? 'hidden' : ''}>
                <ul className='flex flex-col gap-4 ml-4'>
                  {course.sessions.map(session => {
                    return (
                      <li key={session.name} className='ml-4'>
                        <h3 className='capitalize text-xl font-semibold'>
                          {session.name.replace(/-/g, ' ')}
                        </h3>
                        <ul className='ml-4'>
                          {session.timeFrames.map((frame, i) => (
                            <li
                              key={`${frame.name}-${i}`}
                              className='flex flex-col py-2'
                            >
                              <span className='font-semibold'>
                                {frame.name}
                              </span>
                              <span
                                className={textHidden ? 'hidden' : ''}
                                dangerouslySetInnerHTML={{
                                  __html: highlight(result.search, frame.text),
                                }}
                              ></span>
                            </li>
                          ))}
                        </ul>
                      </li>
                    )
                  })}
                </ul>
              </span>
            </li>
          ))}
      </ul>
    </section>
  )

export default SearchResult
