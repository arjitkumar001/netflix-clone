'use client'
import React from 'react'
import NewAndRecentlyMovie from '../Components/NewAndRecently'
import PopularmoviePage from '../Components/PopularMovies'
import TopRatedMovie from '../Components/TopRatedMovie'
import NowPlaingMovie from '../Components/NowPlayingMovie'
import DayByDayMovie from '../Components/DayByDayMovie'
const page = () => {
  return (
    <>
      <NowPlaingMovie />
      <PopularmoviePage />
      <TopRatedMovie />
      <DayByDayMovie />
      <NewAndRecentlyMovie />
    </>
  )
}

export default page