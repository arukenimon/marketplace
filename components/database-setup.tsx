"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { supabase } from "@/lib/supabase"

export function DatabaseSetup() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setupDatabase = async () => {
    setLoading(true)
    setError(null)

    try {
      // Create listings table
      const { error: listingsError } = await supabase.rpc("exec_sql", {
        sql: `
          CREATE TABLE IF NOT EXISTS listings (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            price DECIMAL(10,2) NOT NULL,
            category TEXT NOT NULL,
            location TEXT DEFAULT 'Palo Alto, CA',
            seller_email TEXT NOT NULL,
            seller_name TEXT,
            image_url TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `,
      })

      // Create messages table
      const { error: messagesError } = await supabase.rpc("exec_sql", {
        sql: `
          CREATE TABLE IF NOT EXISTS messages (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
            buyer_email TEXT NOT NULL,
            buyer_name TEXT,
            message TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `,
      })

      // Insert sample data
      const { error: insertError } = await supabase.from("listings").insert([
        {
          title: "iPhone 14 Pro",
          description: "Excellent condition iPhone 14 Pro with original box",
          price: 899.0,
          category: "Electronics",
          seller_email: "seller1@example.com",
          seller_name: "John Doe",
          image_url: "/placeholder.svg?height=300&width=300",
        },
        {
          title: "Mountain Bike",
          description: "24 inch mountain bike, great for trails",
          price: 299.0,
          category: "Sporting Goods",
          seller_email: "seller2@example.com",
          seller_name: "Jane Smith",
          image_url: "/placeholder.svg?height=300&width=300",
        },
        {
          title: "Gaming Laptop",
          description: "High-performance gaming laptop with RTX 4070",
          price: 1299.0,
          category: "Electronics",
          seller_email: "seller3@example.com",
          seller_name: "Mike Johnson",
          image_url: "/placeholder.svg?height=300&width=300",
        },
      ])

      if (listingsError || messagesError || insertError) {
        throw new Error("Failed to set up database")
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Alert className="mb-6">
        <AlertDescription>
          Database setup completed successfully! Please refresh the page to see your listings.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Database Setup Required</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-gray-600">
          It looks like your database tables haven't been created yet. Click the button below to set up the required
          tables and sample data.
        </p>

        {error && (
          <Alert className="mb-4">
            <AlertDescription className="text-red-600">Error: {error}</AlertDescription>
          </Alert>
        )}

        <Button onClick={setupDatabase} disabled={loading}>
          {loading ? "Setting up..." : "Set Up Database"}
        </Button>
      </CardContent>
    </Card>
  )
}
