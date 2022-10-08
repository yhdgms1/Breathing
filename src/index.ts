/// <reference types="@cloudflare/workers-types" />

import type { ZodTypeAny, infer as Infer } from "zod";

type AnyEventContext = EventContext<unknown, string, unknown>;

interface ResolveOptions<T extends AnyEventContext, K> {
  ctx: T;
  input: K;
}

interface StoreObject<T extends ZodTypeAny, K extends unknown> {
  input: Infer<T>;
  output: K;
}

type DefaultStoreValue = Record<string, StoreObject<ZodTypeAny, unknown>>;

type Breathing<Context extends AnyEventContext, Store extends DefaultStoreValue = {}> = {
  request<Url extends string, Input extends ZodTypeAny, Output>(
    url: Url,
    input: Input,
    resolve: (options: ResolveOptions<Context, Infer<Input>>) => Promise<Output>
  ): Breathing<Context, Store & Record<Url, StoreObject<Input, Output>>>;
  store: Record<string, { input: ZodTypeAny; resolve: Parameters<Breathing<Context>["request"]>[2] }>;
};

type GetRoutesValue<T> = T extends Breathing<AnyEventContext, infer Store> ? Store : never;

const breathing = <Context extends AnyEventContext, Store extends DefaultStoreValue = {}>(): Breathing<Context, Store> => {
  type InternalStore = Record<string, { input: ZodTypeAny; resolve: Parameters<Breathing<Context>["request"]>[2] }>;

  const store = {} as InternalStore;

  function request<Url extends string, Input extends ZodTypeAny, Output>(
    url: Url,
    input: Input,
    resolve: (options: ResolveOptions<Context, Infer<Input>>) => Promise<Output>
  ): Breathing<Context, Store & Record<Url, StoreObject<Input, Output>>> {
    store[url] = { input: input, resolve: resolve as any };

    return { request, store };
  }

  return { request, store };
};

export { breathing };
export type { GetRoutesValue, Breathing, AnyEventContext, StoreObject, DefaultStoreValue };
