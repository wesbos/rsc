import { relations, sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  fullName: text('full_name'),
  email: text('email'),
})

export const listings = sqliteTable('listings', {
  id: integer('id').primaryKey(),
  // slug: text('slug'),
  title: text('title').notNull(),
  description: text('description').notNull(),
  price: integer('price').notNull(),
  userId: integer('user_id').default(sql`1`),
})

// Schema for inserting a user - can be used to validate API requests
export const insertListingSchema = createInsertSchema(listings, {
  // TODO why does description come after?
  price: ({ price }) => z.coerce.number().min(2).pipe(price).describe("The price of your product in cents"),
  id: ({ id }) => z.coerce.number().pipe(id)
});

const userEditableFields = ['price', 'title', 'description'] as const;
type UserEditableFields = typeof userEditableFields[number];

const picks = Object.fromEntries(userEditableFields.map((field) => [field, true] as const));
export const updateListingSchema = insertListingSchema.pick(picks)

export type SelectListing = Pick<typeof listings.$inferSelect, UserEditableFields>;

// Schema for selecting a Listing - can be used to validate API responses
export const selectListingSchema = createSelectSchema(listings);


// This emulates a foreign key constraint
export const usersRelations = relations(users, ({ many }) => ({
  listings: many(listings)
}))

export const listingsRelations = relations(listings, ({ one }) => ({
  owner: one(users, {
    fields: [listings.userId], // Which fields on the listing has the user's id?
    references: [users.id] //  Which fields on the user is the id?
  })
}))



export type User = typeof users.$inferSelect // return type when queried
export type InsertUser = typeof users.$inferInsert // insert type
