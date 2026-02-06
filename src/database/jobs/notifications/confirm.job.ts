import { eq } from "drizzle-orm";
import { appointment } from "../../Schemas";
import { db } from "../../Client";
import { processNotification } from "../../../modules/NotificationLog/notifications.worker";

export async function confirmationJob() {
  console.log("✅ Running confirmation job");

  const appointments = await db
    .select()
    .from(appointment)
    .where(eq(appointment.status, "scheduled"));

  for (const appt of appointments) {
    await processNotification({
      appointment_id: appt.id,
      type: "confirmation",
    });
  }
}
