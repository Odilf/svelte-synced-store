# svelte-synced-store

Tiny library to create synced stores in svelte

## Usage

```js
import { synced } from "svelte-synced-store";

const [initial, transformed] = synced(1, v => v + 1, t => t - 1)
// Typescript version
// const [initial, transformed] = synced<number, number>(1, v => v + 1, t => t - 1)

initial.set(2) // Transformed is updated to 3
transformed.set(100) // Initial is updated to 99
```
