export default function ListingsLayout({ children } : { children: React.ReactNode}) {
  return <div>
    <h3 className="text-xl font-bold">Listings</h3>
    {children}
  </div>
}
