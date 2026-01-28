import { DefaultOptions, UseMutationOptions } from "@tanstack/react-query";

export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: false,
    staleTime: 0,
  },
} satisfies DefaultOptions;

export type ApiFnReturnType<
  FnType extends (...args: Array<never>) => Promise<unknown>,
> = Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...args: Array<never>) => Promise<unknown>> =
  Omit<ReturnType<T>, "queryKey" | "queryFn">;

export type MutationConfig<
  MutationFnType extends (...args: Array<never>) => Promise<unknown>,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  unknown,
  Parameters<MutationFnType>[0]
>;
