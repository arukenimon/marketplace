-- Create listings table
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

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  buyer_email TEXT NOT NULL,
  buyer_name TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_listings_category ON listings(category);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON listings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_listing_id ON messages(listing_id);

-- Insert sample data
INSERT INTO listings (title, description, price, category, seller_email, seller_name, image_url) VALUES
('iPhone 14 Pro', 'Excellent condition iPhone 14 Pro with original box', 899.00, 'Electronics', 'seller1@example.com', 'John Doe', '/placeholder.svg?height=300&width=300'),
('Mountain Bike', '24 inch mountain bike, great for trails', 299.00, 'Sporting Goods', 'seller2@example.com', 'Jane Smith', '/placeholder.svg?height=300&width=300'),
('Gaming Laptop', 'High-performance gaming laptop with RTX 4070', 1299.00, 'Electronics', 'seller3@example.com', 'Mike Johnson', '/placeholder.svg?height=300&width=300'),
('Dining Table', 'Solid wood dining table seats 6 people', 450.00, 'Home Goods', 'seller4@example.com', 'Sarah Wilson', '/placeholder.svg?height=300&width=300'),
('Toyota Camry 2020', 'Well maintained sedan with low mileage', 18500.00, 'Vehicles', 'seller5@example.com', 'David Brown', '/placeholder.svg?height=300&width=300');
