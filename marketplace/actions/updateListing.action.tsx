'use server';
import { db } from "@/db/drizzle";
import {
  insertListingSchema,
  listings,
  updateListingSchema,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function updateListingAction(prevState: any, formData: FormData) {
  "use server";
  // Wait for 1 second
  // await wait(1000);
  // Validate data
  const data = Object.fromEntries(formData);
  console.log(data);
  console.log(data);
  const listing = insertListingSchema.safeParse(data);
  if (!listing.success) {
    return {
      errors: listing.error.flatten()
    }
  }
  // Update the DB

  const result = await db.update(listings).set(listing.data).where(eq(listings.id, formData.get('id'))).execute();
  revalidatePath("/listings");
  return listing;
  // console.log("updating listing", listing.error);
}
