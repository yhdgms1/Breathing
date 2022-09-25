import type { GetRoutesValue, Breathing, AnyEventContext } from ".";

type BasicRoutes = GetRoutesValue<Breathing<AnyEventContext>>;
type FetchData = <Routes extends BasicRoutes, Route extends keyof Routes>(path: Route, options?: Routes[Route]["input"]) => Promise<Routes[Route]["output"]>;

export type { BasicRoutes, FetchData };
