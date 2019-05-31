import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center" style={{position: 'absolute', bottom: '0', width: '100%', height: '70px'}}>
      Copyright &copy; {new Date().getFullYear()} BeRelentless
    </footer>
  )
}
