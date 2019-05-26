import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center" style={{position: 'bottom', width: '100%'}}>
      Copyright &copy; {new Date().getFullYear()} BeRelentless
    </footer>
  )
}

// bg-dark text-white mt-5 p-4 text-center
// style={{position: 'bottom', width: '100%'}}
