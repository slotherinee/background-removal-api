import { Request } from "express";
import fs from "fs/promises";
import { removeBackground } from "@imgly/background-removal-node";
import { backgroundConfigSchema, PartialBackgroundRemovalConfig } from "../config/background.schema";
import { defaultConfig } from "../config/default.config";
import deepmerge from "deepmerge";

export class BackgroundService {
  static async handleRequest(req: Request): Promise<{
    status: number;
    body: Buffer | object;
    headers?: Record<string, string>;
  }> {
    const file = req.file;
    const rawConfig = req.body?.config ? this.safeParseJSON(req.body.config) : undefined;

    if (!file) {
      return { status: 400, body: { error: "No image file provided." } };
    }

    try {
      const fileData = await fs.readFile(file.path);

      const parsedConfig = backgroundConfigSchema.safeParse(rawConfig || {});
      const finalConfig = parsedConfig.success
        ? deepmerge(defaultConfig, parsedConfig.data)
        : defaultConfig;

      const imageBlob = new Blob([fileData], { type: file.mimetype });
      const blob = await removeBackground(imageBlob, finalConfig);
      const arrayBuffer = await blob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return {
        status: 200,
        headers: { "Content-Type": "image/png" },
        body: buffer
      };
    } catch (error) {
      return { 
        status: 500, 
        body: { 
          error: "Failed to remove background",
          details: error instanceof Error ? error.message : String(error)
        } 
      };
    } finally {
      if (file?.path) await fs.unlink(file.path).catch(() => {});
    }
  }

  private static safeParseJSON(json: string): PartialBackgroundRemovalConfig | undefined {
    try {
      return JSON.parse(json);
    } catch {
      return undefined;
    }
  }
}
