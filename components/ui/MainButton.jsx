import React from 'react'

export default function MainButton({ children }) {
       return (
              <button className='bg-gradient-to-bl from-secondary via-primary to-primary text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-primary-dark transition duration-300 ease-in-out transform hover:scale-105'>
                     {children}
              </button>
       )
}
