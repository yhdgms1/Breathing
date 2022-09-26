/// <reference types="@cloudflare/workers-types" />

import type { AnyEventContext, Breathing } from ".";

const respond = (status: number, data: any) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
    },
  });
};

const createHandler = (router: Breathing<AnyEventContext>["store"]) => {
  const handler: PagesFunction = async (ctx) => {
    const { request } = ctx;

    if (request.method !== "POST") {
      return respond(400, { error: "Unsupported method" });
    }

    const body = await request.text();
    const payload = body === "" ? undefined : JSON.parse(body);

    if (payload === undefined) {
      return respond(400, { error: "Empty payload" });
    }

    const path = payload["path"] as string;
    const caller = router[path];

    const parsed = caller["input"].safeParse(payload["data"]);

    if ("error" in parsed) {
      return respond(400, { error: parsed.error });
    }

    const result = await caller["resolve"]({ ctx: ctx, input: parsed.data });

    return respond(200, {
      data: result,
    });
  };

  return handler;
};

export { createHandler };
