/*
 Generated by typeshare 1.6.0
*/

export type _PartialCustomAlerterConfig = Partial<CustomAlerterConfig>;

export type _PartialSlackAlerterConfig = Partial<SlackAlerterConfig>;

export type _PartialBuilderConfig = Partial<BuilderConfig>;

export type _PartialAwsBuilderConfig = Partial<AwsBuilderConfig>;

export enum PermissionLevel {
	None = "none",
	Read = "read",
	Execute = "execute",
	Update = "update",
}

export type PermissionsMap = Record<string, PermissionLevel>;

export type I64 = number;

export type U64 = number;

export type MongoDocument = any;

export interface MongoIdObj {
	$oid: string;
}

export type MongoId = MongoIdObj;

export type _PartialBuildConfig = Partial<BuildConfig>;

export type _PartialDeploymentConfig = Partial<DeploymentConfig>;

export type _PartialRepoConfig = Partial<RepoConfig>;

export type _PartialServerConfig = Partial<ServerConfig>;

export type _PartialCustomTag = Partial<CustomTag>;

export type AlerterConfig = 
	| { type: "Custom", params: CustomAlerterConfig }
	| { type: "Slack", params: SlackAlerterConfig };

export interface Alerter {
	_id?: MongoId;
	name: string;
	description?: string;
	permissions?: PermissionsMap;
	updated_at?: I64;
	tags?: string[];
	is_default?: boolean;
	config: AlerterConfig;
}

export interface CustomAlerterConfig {
	url: string;
}

export interface SlackAlerterConfig {
	url: string;
}

export type BuildBuilderConfig = 
	| { type: "Server", params: {
	server_id: string;
}}
	| { type: "Builder", params: {
	builder_id: string;
}};

export interface Version {
	major: number;
	minor: number;
	patch: number;
}

export interface SystemCommand {
	path?: string;
	command?: string;
}

export interface EnvironmentVar {
	variable: string;
	value: string;
}

export interface BuildConfig {
	builder: BuildBuilderConfig;
	skip_secret_interp?: boolean;
	version?: Version;
	repo?: string;
	branch: string;
	github_account?: string;
	docker_account?: string;
	docker_organization?: string;
	pre_build?: SystemCommand;
	build_path: string;
	dockerfile_path: string;
	build_args?: EnvironmentVar[];
	extra_args?: string[];
	use_buildx?: boolean;
}

export interface Build {
	_id?: MongoId;
	name: string;
	description?: string;
	permissions?: PermissionsMap;
	updated_at?: I64;
	last_built_at?: I64;
	tags?: string[];
	config: BuildConfig;
}

export interface BuildActionState {
	building: boolean;
	updating: boolean;
}

export type BuilderConfig = 
	| { type: "Aws", params: AwsBuilderConfig };

export interface Builder {
	_id?: MongoId;
	name: string;
	description?: string;
	permissions?: PermissionsMap;
	updated_at?: I64;
	tags?: string[];
	config: BuilderConfig;
}

export interface AwsBuilderConfig {
	region: string;
	instance_type: string;
	volume_gb: number;
	ami_id: string;
	subnet_id: string;
	security_group_ids: string[];
	key_pair_name: string;
	assign_public_ip: boolean;
}

export type DeploymentImage = 
	| { type: "Image", params: {
	image: string;
}}
	| { type: "Build", params: {
	build_id: string;
	version: Version;
}};

export enum TerminationSignal {
	SigHup = "SIGHUP",
	SigInt = "SIGINT",
	SigQuit = "SIGQUIT",
	SigTerm = "SIGTERM",
}

export interface TerminationSignalLabel {
	signal: TerminationSignal;
	label: string;
}

export interface Conversion {
	local: string;
	container: string;
}

export enum RestartMode {
	NoRestart = "no",
	OnFailure = "on-failure",
	Always = "always",
	UnlessStopped = "unless-stopped",
}

export interface DeploymentConfig {
	server_id?: string;
	image?: DeploymentImage;
	skip_secret_interp?: boolean;
	redeploy_on_build?: boolean;
	term_signal_labels: TerminationSignalLabel[];
	termination_signal?: TerminationSignal;
	termination_timeout: number;
	ports?: Conversion[];
	volumes?: Conversion[];
	environment?: EnvironmentVar[];
	network: string;
	restart?: RestartMode;
	post_image?: string;
	container_user?: string;
	extra_args?: string[];
	docker_account?: string;
}

export interface Deployment {
	_id?: MongoId;
	name: string;
	description?: string;
	permissions?: PermissionsMap;
	updated_at?: I64;
	tags?: string[];
	config: DeploymentConfig;
}

export enum DockerContainerState {
	Unknown = "unknown",
	NotDeployed = "not_deployed",
	Created = "created",
	Restarting = "restarting",
	Running = "running",
	Removing = "removing",
	Paused = "paused",
	Exited = "exited",
	Dead = "dead",
}

export interface ContainerSummary {
	name: string;
	id: string;
	image: string;
	state: DockerContainerState;
	status?: string;
}

export interface DockerContainerStats {
	name: string;
	cpu_perc: string;
	mem_perc: string;
	mem_usage: string;
	net_io: string;
	block_io: string;
	pids: string;
}

export interface DeploymentActionState {
	deploying: boolean;
	stopping: boolean;
	starting: boolean;
	removing: boolean;
	updating: boolean;
	renaming: boolean;
	deleting: boolean;
}

export interface CloneArgs {
	name: string;
	repo?: string;
	branch?: string;
	on_clone?: SystemCommand;
	on_pull?: SystemCommand;
	github_account?: string;
}

export interface RepoConfig {
	server_id: string;
	repo: string;
	branch: string;
	github_account?: string;
	on_clone?: SystemCommand;
	on_pull?: SystemCommand;
}

export interface Repo {
	_id?: MongoId;
	name: string;
	description?: string;
	permissions?: PermissionsMap;
	updated_at?: I64;
	last_pulled_at?: I64;
	tags?: string[];
	config: RepoConfig;
}

export interface RepoActionState {
	cloning: boolean;
	pulling: boolean;
	updating: boolean;
	deleting: boolean;
}

export interface ImageSummary {
	/** ID is the content-addressable ID of an image.  This identifier is a content-addressable digest calculated from the image's configuration (which includes the digests of layers used by the image).  Note that this digest differs from the `RepoDigests` below, which holds digests of image manifests that reference the image. */
	Id: string;
	/** ID of the parent image.  Depending on how the image was created, this field may be empty and is only set for images that were built/created locally. This field is empty if the image was pulled from an image registry. */
	ParentId: string;
	/** List of image names/tags in the local image cache that reference this image.  Multiple image tags can refer to the same image, and this list may be empty if no tags reference the image, in which case the image is \"untagged\", in which case it can still be referenced by its ID. */
	RepoTags: string[];
	/** List of content-addressable digests of locally available image manifests that the image is referenced from. Multiple manifests can refer to the same image.  These digests are usually only available if the image was either pulled from a registry, or if the image was pushed to a registry, which is when the manifest is generated and its digest calculated. */
	RepoDigests: string[];
	/** Date and time at which the image was created as a Unix timestamp (number of seconds sinds EPOCH). */
	Created: I64;
	/** Total size of the image including all layers it is composed of. */
	Size: I64;
	/** Total size of image layers that are shared between this image and other images.  This size is not calculated by default. `-1` indicates that the value has not been set / calculated. */
	SharedSize: I64;
	/** Total size of the image including all layers it is composed of.  In versions of Docker before v1.10, this field was calculated from the image itself and all of its parent images. Docker v1.10 and up store images self-contained, and no longer use a parent-chain, making this field an equivalent of the Size field.  This field is kept for backward compatibility, but may be removed in a future version of the API. */
	VirtualSize: I64;
	/** User-defined key/value metadata. */
	Labels: Record<string, string>;
	/** Number of containers using this image. Includes both stopped and running containers.  This size is not calculated by default, and depends on which API endpoint is used. `-1` indicates that the value has not been set / calculated. */
	Containers: I64;
}

export interface IpamConfig {
	Subnet?: string;
	IPRange?: string;
	Gateway?: string;
	AuxiliaryAddresses?: Record<string, string>;
}

export interface Ipam {
	/** Name of the IPAM driver to use. */
	Driver?: string;
	/** List of IPAM configuration options, specified as a map:  ``` {\"Subnet\": <CIDR>, \"IPRange\": <CIDR>, \"Gateway\": <IP address>, \"AuxAddress\": <device_name:IP address>} ``` */
	Config?: IpamConfig[];
	/** Driver-specific options, specified as a map. */
	Options?: Record<string, string>;
}

export interface NetworkContainer {
	Name?: string;
	EndpointID?: string;
	MacAddress?: string;
	IPv4Address?: string;
	IPv6Address?: string;
}

export interface DockerNetwork {
	Name?: string;
	Id?: string;
	Created?: string;
	Scope?: string;
	Driver?: string;
	EnableIPv6?: boolean;
	IPAM?: Ipam;
	Internal?: boolean;
	Attachable?: boolean;
	Ingress?: boolean;
	Containers?: Record<string, NetworkContainer>;
	Options?: Record<string, string>;
	Labels?: Record<string, string>;
}

export interface ServerConfig {
	address: string;
	enabled: boolean;
	auto_prune: boolean;
	region?: string;
	cpu_warning: number;
	cpu_critical: number;
	mem_warning: number;
	mem_critical: number;
	disk_warning: number;
	disk_critical: number;
}

export interface Server {
	_id?: MongoId;
	name: string;
	description?: string;
	permissions?: PermissionsMap;
	updated_at?: I64;
	tags?: string[];
	config: ServerConfig;
}

export interface ServerActionState {
	pruning_networks: boolean;
	pruning_containers: boolean;
	pruning_images: boolean;
}

export interface BasicSystemStats {
	system_load: number;
	cpu_perc: number;
	cpu_freq_mhz: number;
	mem_used_gb: number;
	mem_total_gb: number;
	disk_used_gb: number;
	disk_total_gb: number;
}

export interface SingleCpuUsage {
	name: string;
	usage: number;
}

export interface CpuUsage {
	cpu_perc: number;
	cpu_freq_mhz: number;
	cpus?: SingleCpuUsage[];
}

export interface SingleDiskUsage {
	mount: string;
	used_gb: number;
	total_gb: number;
}

export interface DiskUsage {
	used_gb: number;
	total_gb: number;
	read_kb: number;
	write_kb: number;
	disks?: SingleDiskUsage[];
}

export interface SystemNetwork {
	name: string;
	recieved_kb: number;
	transmitted_kb: number;
}

export interface NetworkUsage {
	recieved_kb: number;
	transmitted_kb: number;
	networks?: SystemNetwork[];
}

export interface SystemProcess {
	pid: number;
	name: string;
	exe?: string;
	cmd: string[];
	start_time?: number;
	cpu_perc: number;
	mem_mb: number;
	disk_read_kb: number;
	disk_write_kb: number;
}

export interface SystemComponent {
	label: string;
	temp: number;
	max: number;
	critical?: number;
}

export interface SystemStatsRecord {
	ts: I64;
	server_id: string;
	basic: BasicSystemStats;
	cpu: CpuUsage;
	disk: DiskUsage;
	network: NetworkUsage;
	processes?: SystemProcess[];
	components?: SystemComponent[];
}

export interface SystemInformation {
	name?: string;
	os?: string;
	kernel?: string;
	core_count?: number;
	host_name?: string;
	cpu_brand: string;
}

export enum Timelength {
	OneSecond = "1-sec",
	FiveSeconds = "5-sec",
	TenSeconds = "10-sec",
	FifteenSeconds = "15-sec",
	ThirtySeconds = "30-sec",
	OneMinute = "1-min",
	TwoMinutes = "2-min",
	FiveMinutes = "5-min",
	TenMinutes = "10-min",
	FifteenMinutes = "15-min",
	ThirtyMinutes = "30-min",
	OneHour = "1-hr",
	TwoHours = "2-hr",
	SixHours = "6-hr",
	EightHours = "8-hr",
	TwelveHours = "12-hr",
	OneDay = "1-day",
	ThreeDay = "3-day",
	OneWeek = "1-wk",
	TwoWeeks = "2-wk",
	ThirtyDays = "30-day",
}

export interface AllSystemStats {
	basic: BasicSystemStats;
	cpu: CpuUsage;
	disk: DiskUsage;
	network: NetworkUsage;
	processes?: SystemProcess[];
	components?: SystemComponent[];
	polling_rate: Timelength;
	refresh_ts: I64;
	refresh_list_ts: I64;
}

export enum StatsState {
	Ok = "OK",
	Warning = "WARNING",
	Critical = "CRITICAL",
}

export interface ServerHealth {
	cpu: StatsState;
	mem: StatsState;
	disk: StatsState;
	disks: Record<string, StatsState>;
	temps: Record<string, StatsState>;
}

export enum TagColor {
	Red = "Red",
	Green = "Green",
	Blue = "Blue",
	Yellow = "Yellow",
	Purple = "Purple",
	Magenta = "Magenta",
	Cyan = "Cyan",
}

export interface CustomTag {
	_id?: MongoId;
	name: string;
	owner?: string;
	category?: string;
	color?: TagColor;
}

export enum Operation {
	None = "None",
	CreateServer = "CreateServer",
	UpdateServer = "UpdateServer",
	DeleteServer = "DeleteServer",
	RenameServer = "RenameServer",
	PruneImagesServer = "PruneImagesServer",
	PruneContainersServer = "PruneContainersServer",
	PruneNetworksServer = "PruneNetworksServer",
	CreateBuild = "CreateBuild",
	UpdateBuild = "UpdateBuild",
	DeleteBuild = "DeleteBuild",
	RunBuild = "RunBuild",
	CreateBuilder = "CreateBuilder",
	UpdateBuilder = "UpdateBuilder",
	DeleteBuilder = "DeleteBuilder",
	CreateDeployment = "CreateDeployment",
	UpdateDeployment = "UpdateDeployment",
	DeleteDeployment = "DeleteDeployment",
	DeployContainer = "DeployContainer",
	StopContainer = "StopContainer",
	StartContainer = "StartContainer",
	RemoveContainer = "RemoveContainer",
	RenameDeployment = "RenameDeployment",
	CreateRepo = "CreateRepo",
	UpdateRepo = "UpdateRepo",
	DeleteRepo = "DeleteRepo",
	CloneRepo = "CloneRepo",
	PullRepo = "PullRepo",
	CreateAlerter = "CreateAlerter",
	UpdateAlerter = "UpdateAlerter",
	DeleteAlerter = "DeleteAlerter",
	UpdateUserPermissions = "UpdateUserPermissions",
	UpdateUserPermissionsOnTarget = "UpdateUserPermissionsOnTarget",
	AutoBuild = "AutoBuild",
	AutoPull = "AutoPull",
}

export type ResourceTarget = 
	| { type: "System", id?: undefined }
	| { type: "Build", id: string }
	| { type: "Builder", id: string }
	| { type: "Deployment", id: string }
	| { type: "Server", id: string }
	| { type: "Repo", id: string }
	| { type: "Alerter", id: string };

export interface Log {
	stage: string;
	command: string;
	stdout: string;
	stderr: string;
	success: boolean;
	start_ts: I64;
	end_ts: I64;
}

export enum UpdateStatus {
	Queued = "Queued",
	InProgress = "InProgress",
	Complete = "Complete",
}

export interface Update {
	_id?: MongoId;
	operation: Operation;
	start_ts: I64;
	success: boolean;
	operator: string;
	target: ResourceTarget;
	logs: Log[];
	end_ts?: I64;
	status: UpdateStatus;
	version: Version;
}

export interface ApiSecret {
	name: string;
	hash?: string;
	created_at: I64;
	expires?: I64;
}

export interface User {
	_id?: MongoId;
	username: string;
	enabled?: boolean;
	admin?: boolean;
	create_server_permissions?: boolean;
	create_build_permissions?: boolean;
	avatar?: string;
	secrets?: ApiSecret[];
	password?: string;
	github_id?: string;
	google_id?: string;
	last_update_view?: I64;
	updated_at?: I64;
}

export interface GetLoginOptions {
}

export interface GetLoginOptionsResponse {
	local: boolean;
	github: boolean;
	google: boolean;
}

export interface CreateLocalUser {
	username: string;
	password: string;
}

export interface CreateLocalUserResponse {
	jwt: string;
}

export interface LoginLocalUser {
	username: string;
	password: string;
}

export interface LoginLocalUserResponse {
	jwt: string;
}

export interface ExchangeForJwt {
	token: string;
}

export interface ExchangeForJwtResponse {
	jwt: string;
}

export interface LoginWithSecret {
	username: string;
	secret: string;
}

export interface LoginWithSecretResponse {
	jwt: string;
}

export interface RunBuild {
	build_id: string;
}

export interface CancelBuild {
	build_id: string;
}

export interface CancelBuildResponse {
}

export interface Deploy {
	deployment_id: string;
	stop_signal?: TerminationSignal;
	stop_time?: number;
}

export interface StartContainer {
	deployment_id: string;
}

export interface StopContainer {
	deployment_id: string;
	signal?: TerminationSignal;
	time?: number;
}

export interface RemoveContainer {
	deployment_id: string;
	signal?: TerminationSignal;
	time?: number;
}

export interface CloneRepo {
	id: string;
}

export interface PullRepo {
	id: string;
}

export interface PruneDockerNetworks {
	server_id: string;
}

export interface PruneDockerImages {
	server_id: string;
}

export interface PruneDockerContainers {
	server_id: string;
}

export interface GetBuild {
	id: string;
}

export interface ListBuilds {
	query?: MongoDocument;
}

export interface BuildListItem {
	id: string;
	name: string;
	last_built_at: I64;
	version: Version;
	tags: string[];
}

export interface GetBuildActionState {
	id: string;
}

export interface GetBuildsSummary {
}

export interface GetBuildsSummaryResponse {
}

export interface GetBuilder {
	id: string;
}

export interface ListBuilders {
	query?: MongoDocument;
}

export interface GetBuildersSummary {
}

export interface GetBuildersSummaryResponse {
}

export interface GetDeployment {
	id: string;
}

export interface ListDeployments {
	query?: MongoDocument;
}

export interface DeploymentListItem {
	id: string;
	name: string;
	tags: string[];
	state: DockerContainerState;
	status?: string;
	image: string;
	version: string;
}

export interface GetDeploymentStatus {
	id: string;
}

export interface GetDeploymentStatusResponse {
	state: DockerContainerState;
	status?: string;
}

export interface GetLog {
	deployment_id: string;
	tail: U64;
}

export interface GetDeployedVersion {
	deployment_id: string;
}

export interface GetDeployedVersionResponse {
	version: string;
}

export interface GetDeploymentStats {
	id: string;
}

export interface GetDeploymentActionState {
	id: string;
}

export interface GetDeploymentsSummary {
}

export interface GetDeploymentsSummaryResponse {
}

export interface GetVersion {
}

export interface GetVersionResponse {
	version: string;
}

export interface GetUser {
}

export interface GetRepo {
	id: string;
}

export interface ListRepos {
	query?: MongoDocument;
}

export interface RepoListItem {
	id: string;
	name: string;
	last_pulled_at: I64;
	tags: string[];
}

export interface GetRepoActionState {
	id: string;
}

export interface GetReposSummary {
}

export interface GetReposSummaryResponse {
}

export type Tag = 
	| { type: "ResourceType", params: {
	resource: ResourceTarget["type"];
}}
	| { type: "Server", params: {
	server_id: string;
}}
	| { type: "Custom", params: {
	tag_id: string;
}};

export interface FindResources {
	tags: Tag[];
}

export enum ServerStatus {
	NotOk = "NotOk",
	Ok = "Ok",
	Disabled = "Disabled",
}

export interface ServerListItem {
	id: string;
	name: string;
	status: ServerStatus;
	tags: string[];
}

export interface FindResourcesResponse {
	servers: ServerListItem[];
	deployments: DeploymentListItem[];
	builds: BuildListItem[];
	repos: RepoListItem[];
}

export interface GetServer {
	id: string;
}

export interface ListServers {
	query?: MongoDocument;
}

export interface GetServerStatus {
	id: string;
}

export interface GetServerStatusResponse {
	status: ServerStatus;
}

export interface GetServerActionState {
	id: string;
}

export interface GetPeripheryVersion {
	server_id: string;
}

export interface GetPeripheryVersionResponse {
	version: string;
}

export interface GetSystemInformation {
	server_id: string;
}

export interface GetAllSystemStats {
	server_id: string;
}

export interface GetBasicSystemStats {
	server_id: string;
}

export interface GetCpuUsage {
	server_id: string;
}

export interface GetDiskUsage {
	server_id: string;
}

export interface GetNetworkUsage {
	server_id: string;
}

export interface GetSystemProcesses {
	server_id: string;
}

export interface GetSystemComponents {
	server_id: string;
}

export interface GetDockerNetworks {
	server_id: string;
}

export interface GetDockerImages {
	server_id: string;
}

export interface GetDockerContainers {
	server_id: string;
}

export interface GetServersSummary {
}

export interface GetServersSummaryResponse {
}

export interface GetTag {
	id: string;
}

export interface ListTags {
	query?: MongoDocument;
}

export interface ListUpdates {
	query?: MongoDocument;
}

export type PartialAlerterConfig = 
	| { type: "Custom", params: _PartialCustomAlerterConfig }
	| { type: "Slack", params: _PartialSlackAlerterConfig };

export interface CreateAlerter {
	name: string;
	config: PartialAlerterConfig;
}

export interface CopyAlerter {
	name: string;
	id: string;
}

export interface DeleteAlerter {
	id: string;
}

export interface UpdateAlerter {
	id: string;
	config: PartialAlerterConfig;
}

export interface CreateBuild {
	name: string;
	config: _PartialBuildConfig;
}

export interface CopyBuild {
	name: string;
	id: string;
}

export interface DeleteBuild {
	id: string;
}

export interface UpdateBuild {
	id: string;
	config: _PartialBuildConfig;
}

export type PartialBuilderConfig = 
	| { type: "Aws", params: _PartialAwsBuilderConfig };

export interface CreateBuilder {
	name: string;
	config: PartialBuilderConfig;
}

export interface CopyBuilder {
	name: string;
	id: string;
}

export interface DeleteBuilder {
	id: string;
}

export interface UpdateBuilder {
	id: string;
	config: PartialBuilderConfig;
}

export interface CreateDeployment {
	name: string;
	config: _PartialDeploymentConfig;
}

export interface CopyDeployment {
	name: string;
	id: string;
}

export interface DeleteDeployment {
	id: string;
}

export interface UpdateDeployment {
	id: string;
	config: _PartialDeploymentConfig;
}

export interface RenameDeployment {
	id: string;
	name: string;
}

export interface UpdateUserPermissionsOnTarget {
	user_id: string;
	permission: PermissionLevel;
	target: ResourceTarget;
}

export interface UpdateUserPermissions {
	user_id: string;
	enabled?: boolean;
	create_servers?: boolean;
	create_builds?: boolean;
}

export interface CreateRepo {
	name: string;
	config: _PartialRepoConfig;
}

export interface CopyRepo {
	name: string;
	id: string;
}

export interface DeleteRepo {
	id: string;
}

export interface UpdateRepo {
	id: string;
	config: _PartialRepoConfig;
}

export interface CreateLoginSecret {
	name: string;
	expires?: I64;
}

export interface CreateLoginSecretResponse {
	secret: string;
}

export interface DeleteLoginSecret {
	name: string;
}

export interface DeleteLoginSecretResponse {
}

export interface CreateServer {
	name: string;
	config: _PartialServerConfig;
}

export interface DeleteServer {
	id: string;
}

export interface UpdateServer {
	id: string;
	config: _PartialServerConfig;
}

export interface RenameServer {
	id: string;
	name: string;
}

export interface CreateTag {
	name: string;
	category?: string;
	color?: TagColor;
}

export interface DeleteTag {
	id: string;
}

export interface UpdateTag {
	id: string;
	config: _PartialCustomTag;
}

export interface AddTags {
	target: ResourceTarget;
	tags: string[];
}

export interface RemoveTags {
	target: ResourceTarget;
	tags: string[];
}

export type AuthRequest = 
	| { type: "GetLoginOptions", params: GetLoginOptions }
	| { type: "CreateLocalUser", params: CreateLocalUser }
	| { type: "LoginLocalUser", params: LoginLocalUser }
	| { type: "LoginWithSecret", params: LoginWithSecret }
	| { type: "ExchangeForJwt", params: ExchangeForJwt };

export type ExecuteRequest = 
	| { type: "PruneContainers", params: PruneDockerContainers }
	| { type: "PruneImages", params: PruneDockerImages }
	| { type: "PruneNetworks", params: PruneDockerNetworks }
	| { type: "Deploy", params: Deploy }
	| { type: "StartContainer", params: StartContainer }
	| { type: "StopContainer", params: StopContainer }
	| { type: "RemoveContainer", params: RemoveContainer }
	| { type: "RunBuild", params: RunBuild }
	| { type: "CloneRepo", params: CloneRepo }
	| { type: "PullRepo", params: PullRepo };

export type ReadRequest = 
	| { type: "GetVersion", params: GetVersion }
	| { type: "GetUser", params: GetUser }
	| { type: "FindResources", params: FindResources }
	| { type: "GetServersSummary", params: GetServersSummary }
	| { type: "GetServer", params: GetServer }
	| { type: "ListServers", params: ListServers }
	| { type: "GetServerStatus", params: GetServerStatus }
	| { type: "GetPeripheryVersion", params: GetPeripheryVersion }
	| { type: "GetSystemInformation", params: GetSystemInformation }
	| { type: "GetDockerContainers", params: GetDockerContainers }
	| { type: "GetDockerImages", params: GetDockerImages }
	| { type: "GetDockerNetworks", params: GetDockerNetworks }
	| { type: "GetServerActionState", params: GetServerActionState }
	| { type: "GetDeploymentsSummary", params: GetDeploymentsSummary }
	| { type: "GetDeployment", params: GetDeployment }
	| { type: "ListDeployments", params: ListDeployments }
	| { type: "GetDeploymentStatus", params: GetDeploymentStatus }
	| { type: "GetDeploymentActionState", params: GetDeploymentActionState }
	| { type: "GetDeployedVersion", params: GetDeployedVersion }
	| { type: "GetDeploymentStats", params: GetDeploymentStats }
	| { type: "GetLog", params: GetLog }
	| { type: "GetBuildsSummary", params: GetBuildsSummary }
	| { type: "GetBuild", params: GetBuild }
	| { type: "ListBuilds", params: ListBuilds }
	| { type: "GetBuildActionState", params: GetBuildActionState }
	| { type: "GetBuildersSummary", params: GetBuildersSummary }
	| { type: "GetBuilder", params: GetBuilder }
	| { type: "ListBuilders", params: ListBuilders }
	| { type: "GetReposSummary", params: GetReposSummary }
	| { type: "GetRepo", params: GetRepo }
	| { type: "ListRepos", params: ListRepos }
	| { type: "GetRepoActionState", params: GetRepoActionState }
	| { type: "GetTag", params: GetTag }
	| { type: "ListTags", params: ListTags }
	| { type: "ListUpdates", params: ListUpdates }
	| { type: "GetAllSystemStats", params: GetAllSystemStats }
	| { type: "GetBasicSystemStats", params: GetBasicSystemStats }
	| { type: "GetCpuUsage", params: GetCpuUsage }
	| { type: "GetDiskUsage", params: GetDiskUsage }
	| { type: "GetNetworkUsage", params: GetNetworkUsage }
	| { type: "GetSystemProcesses", params: GetSystemProcesses }
	| { type: "GetSystemComponents", params: GetSystemComponents };

export type WriteRequest = 
	| { type: "CreateLoginSecret", params: CreateLoginSecret }
	| { type: "DeleteLoginSecret", params: DeleteLoginSecret }
	| { type: "UpdateUserPerimissions", params: UpdateUserPermissions }
	| { type: "UpdateUserPermissionsOnTarget", params: UpdateUserPermissionsOnTarget }
	| { type: "CreateServer", params: CreateServer }
	| { type: "DeleteServer", params: DeleteServer }
	| { type: "UpdateServer", params: UpdateServer }
	| { type: "RenameServer", params: RenameServer }
	| { type: "CreateDeployment", params: CreateDeployment }
	| { type: "CopyDeployment", params: CopyDeployment }
	| { type: "DeleteDeployment", params: DeleteDeployment }
	| { type: "UpdateDeployment", params: UpdateDeployment }
	| { type: "RenameDeployment", params: RenameDeployment }
	| { type: "CreateBuild", params: CreateBuild }
	| { type: "CopyBuild", params: CopyBuild }
	| { type: "DeleteBuild", params: DeleteBuild }
	| { type: "UpdateBuild", params: UpdateBuild }
	| { type: "CreateBuilder", params: CreateBuilder }
	| { type: "CopyBuilder", params: CopyBuilder }
	| { type: "DeleteBuilder", params: DeleteBuilder }
	| { type: "UpdateBuilder", params: UpdateBuilder }
	| { type: "CreateRepo", params: CreateRepo }
	| { type: "CopyRepo", params: CopyRepo }
	| { type: "DeleteRepo", params: DeleteRepo }
	| { type: "UpdateRepo", params: UpdateRepo }
	| { type: "CreateAlerter", params: CreateAlerter }
	| { type: "CopyAlerter", params: CopyAlerter }
	| { type: "DeleteAlerter", params: DeleteAlerter }
	| { type: "UpdateAlerter", params: UpdateAlerter }
	| { type: "CreateTag", params: CreateTag }
	| { type: "DeleteTag", params: DeleteTag }
	| { type: "UpdateTag", params: UpdateTag };

export type Alert = 
	| { type: "ServerUnreachable", data: {
	id: string;
	name: string;
	region?: string;
}}
	| { type: "ServerCpu", data: {
	id: string;
	name: string;
	region?: string;
	state: StatsState;
	percentage: number;
	top_procs: SystemProcess[];
}}
	| { type: "ServerMem", data: {
	id: string;
	name: string;
	region?: string;
	state: StatsState;
	used_gb: number;
	total_gb: number;
	top_procs: SystemProcess[];
}}
	| { type: "ServerDisk", data: {
	id: string;
	name: string;
	region?: string;
	state: StatsState;
	path: string;
	used_gb: number;
	total_gb: number;
}}
	| { type: "ServerTemp", data: {
	id: string;
	name: string;
	region?: string;
	state: StatsState;
	temp: number;
	max: number;
}}
	| { type: "ContainerStateChange", data: {
	id: string;
	name: string;
	server: string;
	from: DockerContainerState;
	to: DockerContainerState;
}};

