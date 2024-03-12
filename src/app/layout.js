"use client"

import './globals.css'
import { useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'




export default function RootLayout({ children }) {
  const [admin, setAdmin] = useState(false)

  return (
    <html lang="en">
      <body>
        <AuthContext.Provider value={{ admin, setAdmin }}>
          {children}
        </AuthContext.Provider>

      </body>
    </html>
  )
}
