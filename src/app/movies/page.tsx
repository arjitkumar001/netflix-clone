'use client'
import React from 'react'
import DayByDayMovie from '../Components/DayByDayMovie'
import PopularmoviePage from '../Components/PopularMovies'
import TopRatedMovie from '../Components/TopRatedMovie'
import NowPlaingMovie from '../Components/NowPlayingMovie'
import NewAndRecentlyMovie from '../Components/NewAndRecently'

const page = () => {
  return (
    <>
      <NowPlaingMovie/>
      <DayByDayMovie />
      <PopularmoviePage />
      <NewAndRecentlyMovie />
      <TopRatedMovie />
    </>
  )
}

export default page
