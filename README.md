# Breathing - **Brea**k **thing**s

## Использование

```ts
import { breathing, type GetRoutesValue } from "breathing/dist/index";
import { createHandler } from "breathing/dist/server";
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
export type Api = GetRoutesValue<typeof api>;
```

```ts
import { type FetchData } from "breathing/dist/client";
import { type Api } from "..";

/**
 * Опишите функцию для запросов
 */
const request: FetchData<Api> = async (path, options) => {
  const req = await fetch("<URL>", {
    method: "POST",
    body: JSON.stringify({ path, data: options }),
  });

  const response = await request.json();

  return response["data"];
};
```
