import { User } from "@monitor/types";
import { FastifyInstance } from "fastify";
import { remove } from "fs-extra";
import { join } from "path";
import { DELETE_BUILD, prettyStringify } from "@monitor/util";
import { PERMISSIONS_DENY_LOG, BUILD_REPO_PATH } from "../../config";
import { addSystemUpdate } from "../../util/updates";

async function deleteBuild(
  app: FastifyInstance,
  user: User,
  { buildID, note }: { buildID: string; note?: string }
) {
  const build = await app.builds.findById(buildID);
  if (!build) return;
  if (user.permissions! < 2 && !build.owners.includes(user.username)) {
    addSystemUpdate(
      app,
      DELETE_BUILD,
      "Delete Build (DENIED)",
      PERMISSIONS_DENY_LOG,
      user.username,
      note,
      true
    );
    return;
  }
  app.buildActionStates.set(buildID, "deleting", true);
  app.broadcast(DELETE_BUILD, { buildID, complete: false });
  try {
    await app.builds.findByIdAndDelete(buildID);
    await app.deployments.updateMany(
      { buildID: build._id },
      { buildID: undefined }
    );
    if (build!.repo) await remove(join(BUILD_REPO_PATH, build.pullName!));
    app.buildActionStates.delete(buildID);
    addSystemUpdate(app, DELETE_BUILD, "Delete Build", {}, user.username, note);
    app.broadcast(DELETE_BUILD, { buildID, complete: true })
    return true;
  } catch (error) {
    app.buildActionStates.set(buildID, "deleting", false);
    addSystemUpdate(
      app,
      DELETE_BUILD,
      "Delete Build",
      {
        stderr: prettyStringify(error),
      },
      user.username,
      note,
      true
    );
  }
}

export default deleteBuild;
