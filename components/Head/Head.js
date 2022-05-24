import React from 'react'
import * as NextHead from 'next/head'
import { AppTitle } from '../../constants'

const Head = () => (
  <NextHead>
    <title>{AppTitle}</title>
    <meta name='description' content='Find courses from Frontend masters' />
    <link rel='icon' href='/favicon.ico' />
  </NextHead>
)

export default Head
