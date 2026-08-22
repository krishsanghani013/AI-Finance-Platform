import React from 'react'

const MainLayout = ({ children }) => {
  return (
    <div className='container mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl'> 
        {children}
    </div>
  )
}

export default MainLayout