import { db } from "@/db/drizzle";

export default async function SingleListingsPage({
  params,
}: {
  params: { id: number };
}) {
  const listing = await db.query.listings.findFirst({
    where: (listing, { eq }) => eq(listing.id, params.id)
  });
  if (!listing) {
    return <div>Listing not found</div>;
  }
  return (
    <div>
      <h3>Listing {params.id}</h3>
      <h4>{listing.title}</h4>
    </div>
  );
}
