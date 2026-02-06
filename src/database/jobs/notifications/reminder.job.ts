import { and, eq, sql } from "drizzle-orm";
import { db } from "../../Client";
import { appointment } from "../../Schemas";
import { processNotification } from "../../../modules/NotificationLog/notifications.worker";

export async function reminderJob() {
  console.log("Running reminder job");

  const appointments = await db
    .select()
    .from(appointment)
    .where(
      and(
        eq(appointment.status, "scheduled"),
        sql`
          ${appointment.date}::timestamp BETWEEN
          NOW() + interval '23 hours'
          AND NOW() + interval '24 hours'
        `
      )
    );

  for (const appt of appointments) {
    await processNotification({
      appointment_id: appt.id,
      type: "reminder",
    });
  }
}
