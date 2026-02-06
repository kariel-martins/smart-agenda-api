import cron from "node-cron";
import { reminderJob } from "./reminder.job";
import { confirmationJob } from "./confirm.job";

export function startJobs() {
 
  cron.schedule("*/5 * * * *", async () => {
    await reminderJob()
  });

  cron.schedule("*/10 * * * *", async () => {
    await confirmationJob();
  });

  console.log("Jobs scheduler started");
}
