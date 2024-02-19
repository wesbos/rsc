import { db } from "@/db/drizzle";
import { Button } from "./ui/button";
import Link from "next/link";
export default async function Listings() {
  const listings = await db.query.listings.findMany();
  return (
    <div>
      <h3>Listings</h3>
      <ul>
        {listings.map((l) => (
          <li key={l.id}>
            <h4>{l.title}</h4>
            <p>{l.description}</p>
            <p>${l.price}</p>
            <hr />
            <Button asChild variant="outline">
              <Link href={`/listings/${l.id}`}>View →</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/listings/${l.id}/edit`}>Edit →</Link>
            </Button>
            <Button variant="destructive">Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
