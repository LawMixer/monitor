use monitor_client::entities::{
  stack::{ComposeContents, Stack}, update::Log, SearchCombinator,
};
use resolver_api::derive::Request;
use serde::{Deserialize, Serialize};

/// List the compose project names that are on the host.
/// List running `docker compose ls`
///
/// Incoming from docker like:
/// [{"Name":"project_name","Status":"running(1)","ConfigFiles":"/root/compose/compose.yaml,/root/compose/compose2.yaml"}]
#[derive(Debug, Clone, Serialize, Deserialize, Request)]
#[response(Vec<ListComposeProjectsResponseItem>)]
pub struct ListComposeProjects {}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ListComposeProjectsResponseItem {
  pub name: String,
  /// Don't need to parse, can infer state from containers.
  pub status: Option<String>,
  /// Comma seperated list of paths
  pub config_files: Vec<String>,
}

//

/// The stack folder must already exist for this to work
#[derive(Debug, Clone, Serialize, Deserialize, Request)]
#[response(Log)]
pub struct GetComposeServiceLog {
  /// The name of the project
  pub project: String,
  /// The service name
  pub service: String,
  /// pass `--tail` for only recent log contents
  #[serde(default = "default_tail")]
  pub tail: u64,
}

fn default_tail() -> u64 {
  50
}

//

/// The stack folder must already exist for this to work
#[derive(Debug, Clone, Serialize, Deserialize, Request)]
#[response(Log)]
pub struct GetComposeServiceLogSearch {
  /// The name of the project
  pub project: String,
  /// The service name
  pub service: String,
  /// The search terms.
  pub terms: Vec<String>,
  /// And: Only lines matching all terms
  /// Or: Lines matching any one of the terms
  #[serde(default)]
  pub combinator: SearchCombinator,
  /// Invert the search (search for everything not matching terms)
  #[serde(default)]
  pub invert: bool,
}

//

/// Rewrites the compose directory, pulls any images, takes down existing containers,
/// and runs docker compose up.
#[derive(Debug, Clone, Serialize, Deserialize, Request)]
#[response(ComposeUpResponse)]
pub struct ComposeUp {
  /// The stack to deploy
  pub stack: Stack,
  /// Only deploy one service
  pub service: Option<String>,
  /// If provided, use it to login in. Otherwise check periphery local registries.
  pub git_token: Option<String>,
  /// If provided, use it to login in. Otherwise check periphery local registries.
  pub registry_token: Option<String>,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct ComposeUpResponse {
  /// If any of the required files are missing, they will be here.
  pub missing_files: Vec<String>,
  /// The logs produced by the deploy
  pub logs: Vec<Log>,
  /// whether stack was successfully deployed
  pub deployed: bool,
  /// The deploy compose file contents if they could be acquired, or empty vec.
  pub file_contents: Vec<ComposeContents>,
  /// The error in getting remote file contents at the path, or null
  pub remote_errors: Vec<ComposeContents>,
  /// If its a repo based stack, will include the latest commit hash
  pub commit_hash: Option<String>,
  /// If its a repo based stack, will include the latest commit message
  pub commit_message: Option<String>,
}

//

/// General compose command runner
#[derive(Debug, Clone, Serialize, Deserialize, Request)]
#[response(Log)]
pub struct ComposeExecution {
  /// The compose project name to run the execution on.
  /// Usually its he name of the stack / folder under the `stack_dir`.
  pub project: String,
  /// The command in `docker compose -p {project} {command}`
  pub command: String,
}
