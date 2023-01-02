import { Component, Show } from "solid-js";
import { useAppState } from "../../state/StateProvider";
import { useUser } from "../../state/UserProvider";
import ConfirmButton from "../shared/ConfirmButton";
import Icon from "../shared/Icon";
import Flex from "../shared/layout/Flex";
import Grid from "../shared/layout/Grid";
import { useActionStates } from "./ActionStateProvider";
import { combineClasses, getId } from "../../util/helpers";
import { useAppDimensions } from "../../state/DimensionProvider";
import Updates from "./Updates";
import { useLocalStorageToggle } from "../../util/hooks";
import { useParams } from "@solidjs/router";
import { PermissionLevel } from "../../types";
import { client } from "../..";

const Header: Component<{}> = (p) => {
  const { builds, ws } = useAppState();
  const params = useParams();
  const build = () => builds.get(params.id)!;
  const actions = useActionStates();
  const { user } = useUser();
  const { isMobile } = useAppDimensions();
  const [showUpdates, toggleShowUpdates] =
    useLocalStorageToggle("show-updates");
  const userCanUpdate = () =>
    user().admin ||
    build().permissions[getId(user())] === PermissionLevel.Update;
  return (
    <>
      <Flex
        class={combineClasses("card shadow")}
        justifyContent="space-between"
        alignItems="center"
        style={{
          position: "relative",
          cursor: isMobile() && userCanUpdate() ? "pointer" : undefined,
        }}
        onClick={() => {
          if (isMobile() && userCanUpdate()) toggleShowUpdates();
        }}
      >
        <Grid gap="0.1rem">
          <h1>{build().name}</h1>
          <div style={{ opacity: 0.8 }}>build</div>
        </Grid>
        <Show when={userCanUpdate()}>
          <ConfirmButton
            onConfirm={() => {
              client.delete_build(params.id);
            }}
            color="red"
          >
            <Icon type="trash" />
          </ConfirmButton>
        </Show>
        <Show when={isMobile() && userCanUpdate()}>
          <Flex gap="0.5rem" alignItems="center" class="show-updates-indicator">
            updates{" "}
            <Icon
              type={showUpdates() ? "chevron-up" : "chevron-down"}
              width="0.9rem"
            />
          </Flex>
        </Show>
      </Flex>
      <Show when={isMobile() && userCanUpdate() && showUpdates()}>
        <Updates />
      </Show>
    </>
  );
};

export default Header;
