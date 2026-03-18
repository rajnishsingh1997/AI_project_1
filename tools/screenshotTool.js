import { tool } from "@openai/agents";
import { z } from "zod";
import { getPage } from "../state/browserState.js";

export const screenshotTool = tool({
  name: "takeScreenshot",
  description: "Capture the current browser screen to understand the UI state.",
  parameters: z.object({}),
  async execute() {
    try {
      console.log("Executing screenshot tool...");
      const page = getPage();
      console.log("page", page);
      const screenshot = await page.screenshot();
      console.log("Screenshot taken successfully.");
      return {
        success: true,
        message: "Screenshot taken successfully.",
        data: screenshot,
      };
    } catch (error) {
      console.error("Screenshot error:", error);
      return {
        success: false,
        message: "Failed to take screenshot.",
      };
    }
  },
});
