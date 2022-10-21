import { breathing, type GetRoutesValue } from "../src/index";
import { z } from 'zod'

const api = breathing().request("hello", z.string().min(2), async ({ ctx, input }) => {
  if (input === "world") {
    return { message: "You're too boring." } as const;
  }

  return { message: `Hello, ${input}!` } as const;
});

import type { FetchData } from '../src/client';

const request: FetchData<GetRoutesValue<typeof api>> = (path, options) => {
  return null as unknown as ReturnType<typeof request>;
}

request('hello', 'No open ports');
// ^?