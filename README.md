# Provision Tool (Tram V2) CICD Templates and Example Stacks

This repository contains templates for bootstrapping the phData [Provision Tool](https://toolkit.phdata.io/resources/documentation/toolkit-cli/provision/provision)


## Stacks

Tram example stacks can be found in the [stacks](./stacks) directory.

### Source-Product

The [Source-Product](./stacks/source-product) stack organizes data into 'sources' that are consumed by 'products', taking advantage of the Snowflake role hierarchy to enforce one-way data flow and least-privilege access.

### Quickstart

This stack is a simple stack demonstrating basic Provision tool functionality. If you are looking for a Tram model stack to start from, consider the Source-Product stack.

## CI/CD Templates

CI/CD templates for different build servers are being created. While they are being created, you can use the old Tram CICD templates from the [Tram CICD template repository](https://github.com/phdata/tram-cicd-template/) as a starting point.

