# Provision Tool (Tram V2) CICD Templates and Example Stacks

This repository contains templates for bootstrapping the phData [Provision Tool](https://toolkit.phdata.io/resources/documentation/toolkit-cli/provision/provision)


## Complete Stacks

Example stacks can be found in the [stacks_complete](./stacks/complete) directory.

### Source-Product

The [Source-Product](stacks/complete/source-product) stack organizes data into 'sources' that are consumed by 'products', taking advantage of the Snowflake role hierarchy to enforce one-way data flow and least-privilege access.

### Quickstart

This stack is a simple stack demonstrating basic Provision tool functionality. If you are looking for a Tram model stack to start from, consider the Source-Product stack.

## Individual Stack components

### Functional-Role
This stack is a portion of a stack to manage Functional Roles in your environment.

### Warehouse  
This stack is for managing warehouse creation in your environment.  

## CI/CD Templates
[Github Actions Template](https://github.com/phdata/provision-actions-demo)

Please contact the Product Engineering team for other build server templates.

