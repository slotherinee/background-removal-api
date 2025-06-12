import { PartialBackgroundRemovalConfig } from "./background.schema";

export const defaultConfig: PartialBackgroundRemovalConfig = {
  publicPath: `file://${__dirname}/../../node_modules/@imgly/background-removal-node/dist/`,
  debug: false,
  model: "medium",
  output: {
    format: "image/png",
    quality: 0.8,
    type: "foreground"
  }
};
