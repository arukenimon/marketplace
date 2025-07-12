"use client"

import { useState } from "react"
import { SignIn } from "./sign-in"
import { SignUp } from "./sign-up"

export function Auth() {
  const [isSignIn, setIsSignIn] = useState(true)

  const toggleMode = () => {
    setIsSignIn(!isSignIn)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {isSignIn ? <SignIn onToggleMode={toggleMode} /> : <SignUp onToggleMode={toggleMode} />}
    </div>
  )
}
