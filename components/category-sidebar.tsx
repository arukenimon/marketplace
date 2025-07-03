"use client"

import { CATEGORIES } from "@/lib/types"
import { cn } from "@/lib/utils"

interface CategorySidebarProps {
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
}

export function CategorySidebar({ selectedCategory, onCategoryChange }: CategorySidebarProps) {
  return (
    <div className="w-64 bg-gray-50 p-4 rounded-lg">
      <h2 className="font-bold text-lg mb-4">Categories</h2>
      <div className="space-y-1">
        <button
          onClick={() => onCategoryChange(null)}
          className={cn(
            "w-full text-left px-3 py-2 rounded hover:bg-gray-200 transition-colors",
            selectedCategory === null && "bg-blue-100 text-blue-700 font-medium",
          )}
        >
          All Categories
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "w-full text-left px-3 py-2 rounded hover:bg-gray-200 transition-colors",
              selectedCategory === category && "bg-blue-100 text-blue-700 font-medium",
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
