import { agent } from "./src/agent";
import { createUserMessage, USER_QUERIES } from "./src/knowledge/prompts";

// Invoke the agent with a weather query
const result = await agent.invoke({
  messages: [createUserMessage(USER_QUERIES.weatherInTokyo)],
});

console.log(result);
