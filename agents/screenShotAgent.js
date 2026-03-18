import { Agent, run } from "@openai/agents";
import { z } from "zod";
import { screenshotTool } from "../tools/screenshotTool.js";

const screenshotAgentOutputSchema = z.object({
  success: z
    .boolean()
    .describe("Indicates whether the browser operation was successful"),
  message: z
    .string()
    .describe("A message describing the result of the browser operation"),
});

export const screenshotAgent = new Agent({
    name: "ScreenshotAgent",
    description:
      "An agent that can capture the current browser screen to understand the UI state.",
    tools: [screenshotTool],
    outputType: screenshotAgentOutputSchema,
});

