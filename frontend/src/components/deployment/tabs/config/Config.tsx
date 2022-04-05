import { Component, Show } from "solid-js";
import Grid from "../../../util/layout/Grid";
import Image from "./Image";
import Network from "./Network";
import Mounts from "./Volumes";
import Env from "./Env";
import Ports from "./Ports";
import { useConfig } from "./Provider";
import Flex from "../../../util/layout/Flex";
import Icon from "../../../util/icons/Icon";
import ConfirmButton from "../../../util/ConfirmButton";
import Restart from "./Restart";
import DockerAccount from "./DockerAccount";
import Git from "./Git";
import Tabs from "../../../util/tabs/Tabs";
import RepoMount from "./RepoMount";
import { OnClone, OnPull } from "./OnGit";
import Loading from "../../../util/loading/Loading";

const Config: Component<{}> = (p) => {
  const { deployment, reset, save } = useConfig();
  return (
    <Show when={deployment.loaded}>
      <Grid class="config">
        <Tabs
          tabsGap="0rem"
          tabs={[
            {
              title: "container",
              element: (
                <Grid class="config-items scroller">
                  <Image />
                  <Show when={deployment.image}>
                    <DockerAccount />
                  </Show>
                  <Network />
                  <Restart />
                  <Ports />
                  <Mounts />
                  <Env />
                </Grid>
              ),
            },
            {
              title: "repo mount",
              element: (
                <Grid class="config-items scroller">
                  <Git />
                  <RepoMount />
                  <OnClone />
                  <OnPull />
                </Grid>
              ),
            },
          ]}
        />
        <Show when={deployment.updated}>
          <Show
            when={!deployment.updating}
            fallback={
              <button class="green">
                updating <Loading type="spinner" />
              </button>
            }
          >
            <Flex style={{ "place-self": "center", padding: "1rem" }}>
              <button onClick={reset}>
                reset
                <Icon type="reset" />
              </button>
              <ConfirmButton onConfirm={save} color="green">
                save
                <Icon type="floppy-disk" />
              </ConfirmButton>
            </Flex>
          </Show>
        </Show>
      </Grid>
    </Show>
  );
};

export default Config;
