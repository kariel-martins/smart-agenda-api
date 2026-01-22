import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  name: text().notNull(),
  email: text().unique().notNull(),
  password_hash: text().notNull(),
  role: text().notNull().default("staff"),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
  updated_at: timestamp("updated_at", { withTimezone: true }),
});

export const businesses = pgTable("businesses", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  name: text().notNull(),
  slug: text(),
  phone: integer().notNull(),
  email: text().unique().notNull(),
  timezone: timestamp("timezome", { withTimezone: true }),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
});

export const refresh_tokens = pgTable("refresh_tokens", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id, {
    onDelete: "cascade",
  }).notNull(),
  token_hash: text().notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
  expires_at: timestamp("expires_at", { withTimezone: true }),
  revoked: boolean().notNull().default(false)
})

export const professionals = pgTable("professionals", {
  id: serial("id").primaryKey(),
  businesses_id: uuid("businesses_id").references(() => businesses.id, {
    onDelete: "cascade",
  }),
  name: text().notNull(),
  specialty: text().notNull(),
  is_active: boolean().notNull().default(false),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  businesses_id: uuid("businesses_id").references(() => businesses.id, {
    onDelete: "cascade",
  }),
  name: text().notNull(),
  duration_minutes: integer().notNull(),
  price: integer().notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
});

export const clients = pgTable("clients", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  businesses_id: uuid("businesses_id").references(() => businesses.id, {
    onDelete: "cascade",
  }),
  name: text().notNull(),
  phone: integer().notNull(),
  email: text().unique().notNull(),
  no_show_count: integer(),
  total_appointments: integer(),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
});

export const availabilities = pgTable("availabilities", {
  id: serial("id").primaryKey(),
  professional_id: serial("professional_id").references(() => professionals.id, {
    onDelete: "cascade",
  }),
  day_of_week: text().notNull(),
  start_time: timestamp("start_time", { withTimezone: true }),
  end_time: timestamp("end_time", { withTimezone: true }),
});

export const statusOfAppointment = pgEnum("status", [
  "scheduled",
  "confirmed",
  "completed",
  "conceled",
  "no_show",
]);
export const appointment = pgTable("appointment", {
  id: serial("id").primaryKey(),
  businesses_id: uuid("businesses_id").references(() => businesses.id, {
    onDelete: "cascade",
  }),
  professional_id: serial("professional_id").references(() => professionals.id, {
    onDelete: "cascade",
  }),
  client_id: uuid("client_id").references(() => clients.id, {
    onDelete: "cascade",
  }),
  service_id: serial("service_id").references(() => services.id, {
    onDelete: "cascade",
  }),
  date: timestamp("date", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
  start_time: timestamp("start_time", { withTimezone: true }),
  end_time: timestamp("end_time", { withTimezone: true }),
  status: statusOfAppointment("status"),
  cancel_reason: boolean().notNull().default(false),
  confirm_at: timestamp("confirm_at", { withTimezone: true }),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
});

export const notification_logs = pgTable("notification_logs", {
  id: serial("id").primaryKey(),
  appointment_id: serial("appointment_id").references(() => appointment.id, {
    onDelete: "cascade",
  }),
  type: text().notNull(),
  send_at: timestamp("send_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
  status: text().notNull().default("sent"),
});

export const noShowActionEnum = pgEnum("action", [
  "block_booking",
  "require_deposit",
  "manual_approval",
]);
export const no_show_rules = pgTable("no_show_rules", {
  id: serial("id").primaryKey(),
  businesses_id: uuid("businesses_id").references(() => businesses.id, {
    onDelete: "cascade",
  }),
  max_rate_percent: integer(),
  action: noShowActionEnum("action"),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
});
