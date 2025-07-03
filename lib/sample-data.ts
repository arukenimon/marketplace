import type { Listing } from "./types"

export const SAMPLE_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "iPhone 14 Pro",
    description: "Excellent condition iPhone 14 Pro with original box and all accessories. No scratches or damage.",
    price: 899,
    category: "Electronics",
    location: "Palo Alto, CA",
    seller_email: "seller1@example.com",
    seller_name: "John Doe",
    image_url: "/placeholder.svg?height=300&width=300",
    created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    updated_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "2",
    title: "Mountain Bike 24 inch",
    description: "Great condition mountain bike perfect for trails and city riding. Recently serviced.",
    price: 299,
    category: "Sporting Goods",
    location: "Palo Alto, CA",
    seller_email: "seller2@example.com",
    seller_name: "Jane Smith",
    image_url: "/placeholder.svg?height=300&width=300",
    created_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    updated_at: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "3",
    title: "Gaming Laptop RTX 4070",
    description: "High-performance gaming laptop with RTX 4070 graphics card. Perfect for gaming and work.",
    price: 1299,
    category: "Electronics",
    location: "Palo Alto, CA",
    seller_email: "seller3@example.com",
    seller_name: "Mike Johnson",
    image_url: "/placeholder.svg?height=300&width=300",
    created_at: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
    updated_at: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: "4",
    title: "Dining Table Set",
    description: "Beautiful solid wood dining table with 6 chairs. Perfect for family dinners.",
    price: 450,
    category: "Home Goods",
    location: "Palo Alto, CA",
    seller_email: "seller4@example.com",
    seller_name: "Sarah Wilson",
    image_url: "/placeholder.svg?height=300&width=300",
    created_at: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
    updated_at: new Date(Date.now() - 14400000).toISOString(),
  },
  {
    id: "5",
    title: "Toyota Camry 2020",
    description: "Well maintained sedan with low mileage. Clean title, no accidents.",
    price: 18500,
    category: "Vehicles",
    location: "Palo Alto, CA",
    seller_email: "seller5@example.com",
    seller_name: "David Brown",
    image_url: "/placeholder.svg?height=300&width=300",
    created_at: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
    updated_at: new Date(Date.now() - 18000000).toISOString(),
  },
]
