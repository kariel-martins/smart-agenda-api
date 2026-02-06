import { makeNotificationsService } from "./notifications.factory";

const Notifications = makeNotificationsService();

export async function processNotification(job: {
  appointment_id: number;
  type: string;
}) {
  try {
    console.log(
      `📨 Enviando ${job.type} para appointment ${job.appointment_id}`
    );

    await Notifications.log({
      appointment_id: job.appointment_id,
      type: job.type,
      status: "sent",
    });
  } catch (error) {
    await Notifications.log({
      appointment_id: job.appointment_id,
      type: job.type,
      status: "failed",
    });

    throw error;
  }
}
