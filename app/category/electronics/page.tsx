"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { ListingCard } from "@/components/listing-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Smartphone, Laptop, Headphones, Camera } from "lucide-react"
import type { Listing } from "@/lib/types"
import { supabase } from "@/lib/supabase"
import { SAMPLE_LISTINGS } from "@/lib/sample-data"

export default function ElectronicsPage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [filteredListings, setFilteredListings] = useState<Listing[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [subCategory, setSubCategory] = useState("")
  const [loading, setLoading] = useState(true)

  const subCategories = [
    { id: "smartphones", label: "Smartphones", icon: Smartphone },
    { id: "laptops", label: "Laptops & Computers", icon: Laptop },
    { id: "audio", label: "Audio & Headphones", icon: Headphones },
    { id: "cameras", label: "Cameras & Photography", icon: Camera },
  ]

  useEffect(() => {
    fetchElectronicsListings()
  }, [])

  useEffect(() => {
    filterAndSortListings()
  }, [listings, searchQuery, sortBy, subCategory])

  const fetchElectronicsListings = async () => {
    try {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("category", "Electronics")
        .order("created_at", { ascending: false })

      if (error) {
        const electronicsListings = SAMPLE_LISTINGS.filter((listing) => listing.category === "Electronics")
        setListings(electronicsListings)
        return
      }

      setListings(data || [])
    } catch (error) {
      console.error("Error fetching electronics listings:", error)
      const electronicsListings = SAMPLE_LISTINGS.filter((listing) => listing.category === "Electronics")
      setListings(electronicsListings)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortListings = () => {
    let filtered = [...listings]

    // Text search
    if (searchQuery) {
      filtered = filtered.filter(
        (listing) =>
          listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          listing.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Sub-category filter
    if (subCategory) {
      filtered = filtered.filter((listing) => {
        const title = listing.title.toLowerCase()
        const description = listing.description?.toLowerCase() || ""

        switch (subCategory) {
          case "smartphones":
            return title.includes("phone") || title.includes("iphone") || title.includes("android")
          case "laptops":
            return title.includes("laptop") || title.includes("computer") || title.includes("pc")
          case "audio":
            return title.includes("headphone") || title.includes("speaker") || title.includes("audio")
          case "cameras":
            return title.includes("camera") || title.includes("lens") || title.includes("photo")
          default:
            return true
        }
      })
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        break
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
    }

    setFilteredListings(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <h1 className="text-3xl font-bold">Electronics</h1>
            <Badge variant="secondary">{filteredListings.length} items</Badge>
          </div>

          {/* Sub-categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {subCategories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={subCategory === category.id ? "default" : "outline"}
                  onClick={() => setSubCategory(subCategory === category.id ? "" : category.id)}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm">{category.label}</span>
                </Button>
              )
            })}
          </div>

          {/* Search and Sort */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search electronics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active filters */}
            {(searchQuery || subCategory) && (
              <div className="flex gap-2 mt-4">
                {searchQuery && (
                  <Badge variant="secondary">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery("")} className="ml-2 text-gray-500 hover:text-gray-700">
                      ×
                    </button>
                  </Badge>
                )}
                {subCategory && (
                  <Badge variant="secondary">
                    {subCategories.find((cat) => cat.id === subCategory)?.label}
                    <button onClick={() => setSubCategory("")} className="ml-2 text-gray-500 hover:text-gray-700">
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Results */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              {filteredListings.length} {filteredListings.length === 1 ? "item" : "items"} found
            </p>
          </div>

          {filteredListings.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No electronics found</h3>
              <p className="text-gray-600">
                {searchQuery || subCategory ? "Try adjusting your search criteria." : "No electronics available yet."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
