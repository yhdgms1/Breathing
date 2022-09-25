# Breathing - **Brea**k **thing**s

## Использование

```ts
import { breathing } from "breathing";
import { createHandler } from "breathing/server";
import { z } from "zod";

/**
 * Опишем запросы и ответы: первый аргумент функции request - путь, второй - схема валидации, а третий - функция-обработчик.
 */
const api = breathing().request("hello", z.string().min(2), async ({ ctx, input }) => {
  if (input === "world") {
    return { message: "You're too boring." };
  }

  return { message: `Hello, ${input}!` };
});

const handler = createHandler(api.store);

export const onRequestPost = handler;
```

todo: дописать
