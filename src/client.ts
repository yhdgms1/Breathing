import type { GetRoutesValue, Breathing, AnyEventContext, StoreObject } from ".";
import type { ZodTypeAny } from "zod";

type BasicRoutes = GetRoutesValue<Breathing<AnyEventContext>>;
// prettier-ignore
type FetchData<Routes extends Record<string, StoreObject<ZodTypeAny, unknown>>> = <Route extends keyof Routes>(path: Route, options?: Routes[Route]["input"]) => Promise<Routes[Route]["output"]>;

export type { BasicRoutes, FetchData };
