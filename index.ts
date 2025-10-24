import * as z from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { createAgent, tool } from "langchain";

const getWeather = tool(({ city }) => `It's always sunny in ${city}!`, {
  name: "get_weather",
  description: "Get the weather for a given city",
  schema: z.object({
    city: z.string(),
  }),
});

// Configure ChatOpenAI to use OpenRouter
const model = new ChatOpenAI({
  model: "anthropic/claude-sonnet-4.5",
  apiKey: process.env.OPENROUTER_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
});

const agent = createAgent({
  model: model,
  tools: [getWeather],
});

console.log(
  await agent.invoke({
    messages: [{ role: "user", content: "What's the weather in Tokyo?" }],
  }),
);
