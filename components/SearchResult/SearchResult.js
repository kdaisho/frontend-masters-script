import React from 'react'

const SearchResult = ({ result }) => {
  {
    return (
      result && (
        <section>
          Search Result
          <h2>{result.search}</h2>
          <ul>
            {Array.isArray(result.courses) &&
              result.courses.map(course => (
                <ul key={course}>{Array.isArray(course)}</ul>
              ))}
          </ul>
        </section>
      )
    )
  }
}

export default SearchResult
