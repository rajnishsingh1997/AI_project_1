import { Agent, run } from "@openai/agents";
import { screenshotAgent } from "./screenShotAgent.js";
import { browserAgent } from "./browserAgent.js";

const orchestratorAgent = Agent.create({
  name: "OrchestratorAgent",
  instructions:
    "You are an orchestrator agent that manages the flow of tasks between different agents. Your role is to determine which agent should handle a given task based on the user's input and the capabilities of each agent.",
  tools: [
    browserAgent.asTool({ toolName: "browser" }),
    screenshotAgent.asTool({ toolName: "screenshot" }),
  ],
});
const result = await run(
  orchestratorAgent,
  "open https://www.google.com and take a screenshot of the homepage",
);
console.log("Orchestrator result:", result);
