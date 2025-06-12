import { Request, Response } from "express";
import { BackgroundService } from "../services/background.service";

export const removeBackgroundController = async (req: Request, res: Response) => {
  const result = await BackgroundService.handleRequest(req);
  res.status(result.status).set(result.headers || {}).send(result.body);
};
