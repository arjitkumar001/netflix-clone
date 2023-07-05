import React from 'react'
import Link from 'next/link'
import '@/app/style/header.css'

const Nav = () => {
  return (
    <div className='menu-link'>
     <ul>
        <li> <Link href="/" className='link'><span>Home</span></Link></li>
        <li> <Link href="/tvshow" className='link'><span>TV Shows</span></Link></li>
        <li> <Link href="/movies" className='link'><span>Movies</span></Link></li>
        <li> <Link href="/recentlyadd" className='link'><span>Recently Added</span></Link></li>
        <li> <Link href="/favorite" className='link'><span>Favorite</span></Link></li>
     </ul>
    </div>
  )
}

export default Nav;