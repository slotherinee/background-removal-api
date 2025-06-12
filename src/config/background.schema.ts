import { z } from "zod";

export const outputSchema = z.object({
  format: z.enum(["image/png", "image/jpeg", "image/webp", "image/x-rgba8"]).optional(),
  quality: z.number().min(0).max(1).optional(),
  type: z.enum(["foreground", "background", "mask"]).optional()
});

export const backgroundConfigSchema = z.object({
  publicPath: z.string().optional(),
  debug: z.boolean().optional(),
  model: z.enum(["small", "medium"]).optional(),
  output: outputSchema.optional()
});

export type PartialBackgroundRemovalConfig = z.infer<typeof backgroundConfigSchema>;
