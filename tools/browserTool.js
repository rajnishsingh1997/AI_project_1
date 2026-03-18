import { tool } from "@openai/agents";
import { z } from "zod";
import { chromium } from "playwright";
import { setPage } from "../state/browserState.js";

const openBrowserTool = tool({
  name: "openBrowser",
  description:
    "Opens a URL in a controlled browser environment and prepares it for further interaction",
  parameters: z.object({
    url: z.string().describe("The URL to open in the browser"),
  }),
  async execute({ url }) {
    try {
      console.log(`Opening browser and navigating to ${url}...`);

      const browser = await chromium.launch({
        headless: false,
        chromiumSandbox: true,
        env: {},
        args: ["--disable-extensions", "--disable-file-system"],
      });
      const context = await browser.newContext();

      const page = await context.newPage({
        viewport: { width: 1280, height: 720 },
      });
      setPage(page);
      console.log("Navigating to:", url);
      await page.goto(url);
      return {
        success: true,
        message: `Browser opened and navigated to ${url}`,
        currentUrl: page.url(),
      };
    } catch (error) {
      console.error("Error occurred while navigating to the URL:", error);
      return {
        success: false,
        message: `Failed to navigate to ${url}`,
      };
    }
  },
});

export { openBrowserTool };
