import React from 'react'
import "./css/searchpage.css"
import Searchbar from '../components/searchbar'
import SearchList from './searchlist'

export default function Searchpage () {
  return (
    <div>
      <Searchbar/>
      <SearchList/>
    </div>
  )
}

