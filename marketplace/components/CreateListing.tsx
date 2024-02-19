import { db } from "@/db/drizzle";
import { listings } from "@/db/schema";
import { revalidatePath } from "next/cache";

// Server Action
async function create(data: FormData) {
  'use server'
  console.log('creating listing');
  console.log(data);
  // Todo: validate data
  const result = await db.insert(listings).values({
    description: data.get('description'),
    title: data.get('title'),
    price: data.get('price'),
    userId: 1
  }).returning().execute();
  console.log(result);
  revalidatePath('/listings');
}

export function CreateListing() {
  return <div>
    <form action={create}>
      <label htmlFor="title">Title</label>
      <input type="text"  defaultValue={`Item ${new Date()}`} name="title" id="title" />
      <label htmlFor="description">Description</label>
      <textarea name="description" id="description" cols={30} rows={10}></textarea>
      <label htmlFor="price">Price</label>
      <input type="number" name="price" id="price" defaultValue={Math.round(Math.random() * 500)}/>
      <button type="submit">Create Listing</button>
    </form>
  </div>
}
