use bson::serde_helpers::hex_string_as_object_id;
use derive_builder::Builder;
use diff::Diff;
use serde::{Deserialize, Serialize};
use typeshare::typeshare;

use crate::{diff::*, PermissionsMap};

#[typeshare]
#[derive(Serialize, Deserialize, Debug, Clone, Default, Diff, Builder)]
#[diff(attr(#[derive(Debug, Serialize)]))]
pub struct Group {
    #[serde(
        default,
        rename = "_id",
        skip_serializing_if = "String::is_empty",
        with = "hex_string_as_object_id"
    )]
    #[diff(attr(#[serde(skip_serializing_if = "Option::is_none")]))]
    #[builder(setter(skip))]
    pub id: String,

    #[diff(attr(#[serde(skip_serializing_if = "Option::is_none")]))]
    pub name: String,

    #[diff(attr(#[serde(skip_serializing_if = "hashmap_diff_no_change")]))]
    #[builder(setter(skip))]
    pub permissions: PermissionsMap,

    #[diff(attr(#[serde(skip_serializing_if = "vec_diff_no_change")]))]
    pub builds: Vec<String>,

    #[diff(attr(#[serde(skip_serializing_if = "vec_diff_no_change")]))]
    pub deployments: Vec<String>,

    #[diff(attr(#[serde(skip_serializing_if = "vec_diff_no_change")]))]
    pub servers: Vec<String>,

    #[diff(attr(#[serde(skip_serializing_if = "vec_diff_no_change")]))]
    pub procedures: Vec<String>,

    #[diff(attr(#[serde(skip_serializing_if = "vec_diff_no_change")]))]
    pub groups: Vec<String>,

    #[serde(default)]
    #[diff(attr(#[serde(skip)]))]
    #[builder(setter(skip))]
    pub created_at: String,
    #[serde(default)]
    #[diff(attr(#[serde(skip)]))]
    #[builder(setter(skip))]
    pub updated_at: String,
}
