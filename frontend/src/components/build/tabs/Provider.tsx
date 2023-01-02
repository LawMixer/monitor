import { useParams } from "@solidjs/router";
import {
  createContext,
  createEffect,
  onCleanup,
  ParentComponent,
  useContext,
} from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { client } from "../../..";
import { useAppState } from "../../../state/StateProvider";
import { useUser } from "../../../state/UserProvider";
import { Build, Operation, PermissionLevel } from "../../../types";
import { getId } from "../../../util/helpers";

type ConfigBuild = Build & {
  loaded: boolean;
  updated: boolean;
  saving: boolean;
};

type State = {
  build: ConfigBuild;
  setBuild: SetStoreFunction<ConfigBuild>;
  reset: () => void;
  save: () => void;
  userCanUpdate: () => boolean;
};

const context = createContext<State>();

export const ConfigProvider: ParentComponent<{}> = (p) => {
  const { ws, builds } = useAppState();
  const params = useParams();
  const { user } = useUser();
  const [build, set] = createStore({
    ...builds.get(params.id)!,
    loaded: false,
    updated: false,
    saving: false,
  });
  const setBuild: SetStoreFunction<ConfigBuild> = (...args: any) => {
    // @ts-ignore
    set(...args);
    set("updated", true);
  };

  const load = () => {
    // console.log("load build");
    client.get_build(params.id).then((build) => {
      set({
        ...build,
        repo: build.repo,
        branch: build.branch,
        on_clone: build.on_clone,
        pre_build: build.pre_build,
        docker_build_args: build.docker_build_args,
        docker_account: build.docker_account,
        github_account: build.github_account,
        loaded: true,
        updated: false,
        saving: false,
      });
    });
  };
  createEffect(load);

  const save = () => {
    setBuild("saving", true);
    client.update_build(build)
  };

  onCleanup(
    ws.subscribe([Operation.UpdateBuild], (update) => {
      if (update.target.id === params.id) {
        load();
      }
    })
  );

  onCleanup(
    ws.subscribe(
      [Operation.ModifyUserPermissions],
      async (update) => {
        if (update.target.id === params.id) {
          const build = await client.get_build(params.id);
          set("permissions", build.permissions);
        }
      }
    )
  );

  const userCanUpdate = () => user().admin || build.permissions[getId(user())] === PermissionLevel.Update;

  const state = {
    build,
    setBuild,
    reset: load,
    save,
    userCanUpdate,
  };
  return <context.Provider value={state}>{p.children}</context.Provider>;
};

export function useConfig() {
  return useContext(context) as State;
}
