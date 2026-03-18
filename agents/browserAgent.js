import { Agent, run } from "@openai/agents";
import { openBrowserTool } from "../tools/browserTool.js";
import { z } from "zod";

const browserAgentOutputSchema = z.object({
  success: z
    .boolean()
    .describe("Indicates whether the browser operation was successful"),
  message: z
    .string()
    .describe("A message describing the result of the browser operation"),
  currentUrl: z
    .string()
    .optional()
    .describe("The current URL of the browser after navigation, if successful"),
});

export const browserAgent = new Agent({
  name: "BrowserAgent",
  description:
    "An agent that can open URLs in a controlled browser environment.",
  tools: [openBrowserTool],
  outputType: browserAgentOutputSchema,
});

const result = await run(browserAgent, 'https://www.google.com');

console.log(result.finalOutput);