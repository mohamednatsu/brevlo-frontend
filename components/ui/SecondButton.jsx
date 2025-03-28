import React from 'react'

export default function SecondButton({ children }) {
       return (
              <button className='bg-dark text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-primary-dark transition duration-300 ease-in-out transform hover:scale-105'>
                     {children}
              </button>
       )
}
