'use client'
import React, { useState } from 'react'
import { MovieType } from '../../data/DummyMovies'

const Movie = ({movie}:{movie:MovieType}) => {

    const [actorsOpen, setActorsOpen] = useState(false)

    const title = movie.title
    const actors = movie.actorList
    const year = movie.releaseYear.getFullYear().toString()

    function toggleActors(){
        if (actorsOpen){
            setActorsOpen(false)
        }
        else {
            setActorsOpen(true)
        }
    }

  return (
    <div className='flex flex-col border rounded-lg border-mist-700 p-2 md:p-4 w-md md:w-2xl place-self-center m-2'>
        <div className='flex flex-row justify-between mx-2'>
            <p className='text-mist-50 text-lg md:text-xl font-bold'>{title}</p>
            <p className='text-mist-400 font-medium md:text-lg'>Released: {year}</p>
        </div>
        <button className='m-2 border rounded-lg border-mist-700 ' onClick={toggleActors}>
            <p className='md:text-lg text-mist-100 text-center'>Actors</p>
            {actorsOpen && (<div className='grid grid-cols-2 md:grid-cols-4 justify-between border-t border-mist-800 mx-4 py-2'>
                {actors.map((actor) => (
                    <p className='text-mist-300 pl-2 text-sm'>{actor}</p>  
                ))}
            </div>)
            }
        </button>
    </div>
  )
}

export default Movie