'use server';
import { db } from "@/db/drizzle";
import { EditListing } from "./EditListing";


export default async function SingleListingsEditPage({
  params,
}: {
  params: { id: number };
}) {
  const listing = await db.query.listings.findFirst({
    where: (listing, { eq }) => eq(listing.id, params.id),
  });
  if (!listing) {
    return <div>Listing not found</div>;
  }
  return (
    <div>
      <h2>Edit Listing</h2>
      <h3>✏️ Edit Listing {params.id}</h3>
      <EditListing id={params.id} listing={listing} />
    </div>
  );
}
