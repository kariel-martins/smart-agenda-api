import { NotificationsService } from "../notifications.service";
import { NotificationsRepository } from "../notifications.repository";
import { ExecuteHandler } from "../../../core/handlers/executeHandler";
import { AppError } from "../../../core/errors/AppError";

describe("NotificationsService (unit)", () => {
  let service: NotificationsService;
  let repo: jest.Mocked<NotificationsRepository>;

  beforeEach(() => {
    const execute = new ExecuteHandler(false, "Test");

    repo = {
      create: jest.fn(),
      findByAppointmentAndType: jest.fn(),
      getLogs: jest.fn(),
    } as any;

    service = new NotificationsService(execute, repo);
  });

  describe("enqueue", () => {
    it("should enqueue notification when not sent before", async () => {
      repo.findByAppointmentAndType.mockResolvedValue(null);

      const result = await service.enqueue({
        appointment_id: 1,
        type: "reminder",
      });

      expect(result).toEqual({
        queued: true,
        appointment_id: 1,
        type: "reminder",
      });

      expect(repo.findByAppointmentAndType).toHaveBeenCalledWith(1, "reminder");
    });

    it("should throw error if notification already sent", async () => {
      repo.findByAppointmentAndType.mockResolvedValue({
        id: 1,
      } as any);

      await expect(
        service.enqueue({
          appointment_id: 1,
          type: "reminder",
        })
      ).rejects.toBeInstanceOf(AppError);
    });
  });

  describe("log", () => {
    it("should create a notification log", async () => {
      repo.create.mockResolvedValue({
        id: 1,
        appointment_id: 1,
        type: "reminder",
        status: "sent",
      } as any);

      const result = await service.log({
        appointment_id: 1,
        type: "reminder",
        status: "sent",
      });

      expect(repo.create).toHaveBeenCalled();
      expect(result.status).toBe("sent");
    });
  });

  describe("getLogs", () => {
    it("should return logs without filter", async () => {
      repo.getLogs.mockResolvedValue([]);

      const result = await service.getLogs();

      expect(repo.getLogs).toHaveBeenCalledWith(undefined);
      expect(result).toEqual([]);
    });

    it("should return logs filtered by status", async () => {
      repo.getLogs.mockResolvedValue([
        { status: "failed" },
      ] as any);

      const result = await service.getLogs("failed");

      expect(repo.getLogs).toHaveBeenCalledWith("failed");
      expect(result.length).toBe(1);
    });
  });
});
