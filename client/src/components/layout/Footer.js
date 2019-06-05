import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center" style={{width: '100%', height: '70px'}}>
        Copyright &copy; {new Date().getFullYear()} BeRelentless
    </footer>
  )
}
