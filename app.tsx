"use client"

import { AuthProvider, useAuth } from "@/contexts/auth-context"
import { Auth } from "@/components/auth"
import { UserDashboard } from "@/components/user-dashboard"

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return user ? <UserDashboard /> : <Auth />
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
