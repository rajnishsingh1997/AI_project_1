import { tool } from "@openai/agents";
import { z } from "zod";
import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: false,
  chromiumSandbox: true,
  env: {},
  args: ["--disable-extensions", "--disable-file-system"],
});
const page = await browser.newPage({
  viewport: { width: 1920, height: 1080 },
});

const openBrowserTool = tool({
  name: "openBrowser",
  description:
    "Opens a URL in a controlled browser environment and prepares it for further interaction",
  parameters: z.object({
    url: z.url().description("The URL to open in the browser"),
  }),
  async execute({ url }) {
    try {
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
