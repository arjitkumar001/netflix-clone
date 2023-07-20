'use client'
import React from 'react'
import TrendingTv from '../Components/TrendingTv'
import TopRatedMovie from '../Components/TopRatedMovie'
import NewAndRecentlyMovie from '../Components/NewAndRecently'
const page = () => {
  return (
    <>
    <TrendingTv/>
    <TopRatedMovie />
    <NewAndRecentlyMovie />
    </>
  )
}

export default page
