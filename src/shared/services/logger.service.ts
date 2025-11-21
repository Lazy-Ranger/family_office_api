import Logs from "../../models/logs";

class LoggerService {
  async log({
    userId,
    action,
    method,
    endpoint,
    reqBody,
    resBody,
    statusCode,
    ip
  }: {
    userId?: number;
    action: string;
    method: string;
    endpoint: string;
    reqBody?: any;
    resBody?: any;
    statusCode: number;
    ip?: string;
  }) {

    try {
      const created = await Logs.create({
        user_id: userId ?? null,
        action,
        method,
        endpoint,
        request_body: reqBody || null,
        response_body: resBody || null,
        status_code: statusCode,
        ip_address: ip || null
      });
      console.log("Logging data received:", created);
      return created.toJSON();
    } catch (err) {
      console.error("⚠ DB Logging failed:", err);
      return null;
    }
  }
}

export default new LoggerService();
