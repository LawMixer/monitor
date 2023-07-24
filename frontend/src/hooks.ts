import { Types } from "@monitor/client";
import { client } from "./main";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useNavigate } from "react-router-dom";
import { WriteResponses } from "@monitor/client/dist/responses";

export const useRead = <T extends Types.ReadRequest>(req: T) =>
  useQuery([req], () => client.read(req));

export const useWrite = <
  T extends Types.WriteRequest["type"],
  P = Extract<Types.WriteRequest, { type: T }>["params"]
>(
  type: T
) =>
  useMutation(
    [type],
    async (params: P) =>
      (await client.write({ type, params } as any)) as WriteResponses[T]
  );

export const useExecute = <T extends Types.ExecuteRequest>() =>
  useMutation((req: T) => client.execute(req));

export const useUser = () => useRead({ type: "GetUser", params: {} });

export const useLogin = () => {
  const { refetch } = useUser();
  const nav = useNavigate();

  return useMutation(client.login, {
    onSuccess: async (jwt) => {
      await refetch();
      localStorage.setItem("monitor-auth-token", jwt ?? "");
      nav("/");
    },
  });
};

// const recents_atom = atomWithStorage<
//   { type: "Deployment" | "Build" | "Server"; id: string }[]
// >("recents", []);

const recents_atom = atomWithStorage<
  { type: "Deployment" | "Build" | "Server"; id: string }[]
>("recently-viewed", []);

export const useGetRecentlyViewed = () => useAtomValue(recents_atom);

export const useSetRecentlyViewed = () => {
  const set = useSetAtom(recents_atom);
  const push = (type: "Deployment" | "Build" | "Server", id: string) =>
    set((res) => [{ type, id }, ...res.filter((r) => r.id !== id)].slice(0, 5));
  return push;
};
