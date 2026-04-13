# Wisdom AgentDB SDK

Minimal JavaScript SDK for the Wisdom AgentDB API.

## Example

```js
import { createClient } from "@wisdom-agentdb/sdk";

const client = createClient({ baseUrl: "http://localhost:8000" });
const health = await client.health();
console.log(health);
```

