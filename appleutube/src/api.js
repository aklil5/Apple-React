// Local dev with the Express/MySQL server:  VITE_API_URL=http://localhost:3001
// On Vercel (no server): falls back to the static /iphone.json in /public
const API_URL = import.meta.env.VITE_API_URL

export async function getProducts() {
  const url = API_URL ? `${API_URL}/iphones` : `${import.meta.env.BASE_URL}iphone.json`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  const data = await res.json()
  // MySQL column casing varies (Product_url vs product_url), so normalise to lowercase
  return (data.products || []).map((row) =>
    Object.fromEntries(Object.entries(row).map(([k, v]) => [k.toLowerCase(), v]))
  )
}
