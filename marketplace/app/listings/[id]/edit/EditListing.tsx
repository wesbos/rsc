'use client';
import { SelectListing, updateListingSchema } from "@/db/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { updateListingAction } from "@/actions/updateListing.action";
import { useRouter } from "next/router";

function typeToInputType(value: unknown) {
  const type = typeof value;
  if (type === 'number') {
    return 'number';
  }
  return 'text';
}

export function EditListing({
  id,
  listing,
}: {
  id?: number;
  listing: SelectListing
}) {
  type UpdateKeys = keyof typeof updateListingSchema.shape;
  // TODO - this type is broken and showing all keys - it does render correctly.
  const updateEntries = Object.entries(updateListingSchema.shape) as [
    UpdateKeys,
    z.ZodType<any>
  ][];
  const [state, formAction] = useFormState(updateListingAction, listing);
  return (
    <div>
      <pre className="font-mono">{JSON.stringify(state)}</pre>
      <h4 className="text-xl border-black border-2 border-solid">
        {listing.title}
      </h4>
      <form action={formAction}>
        <input type="text" name="id" defaultValue={id} />
        {updateEntries.map(([name, schema]) => {
          const key = `update-${name}`;
          return (
            <div key={key}>
              <label htmlFor={key}>{name}</label>
              {schema.description && <p>{schema.description}</p>}
              {state.errors?.fieldErrors[name] && (
                <p className="text-red-500">{state.errors.fieldErrors[name]}</p>
              )}
              <input
                type={typeToInputType(listing[name])}
                name={name}
                id={key}
                required
                defaultValue={listing[name]}
              />
            </div>
          );
        })}
        <Button type="submit">💾 Save</Button>
      </form>
    </div>
  );
}
