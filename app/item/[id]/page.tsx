import { redirect } from "next/navigation"

interface ItemPageProps {
  params: Promise<{ id: string }>
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { id } = await params
  // Redirect to the listing page with the same ID
  redirect(`/listing/${id}`)
}
