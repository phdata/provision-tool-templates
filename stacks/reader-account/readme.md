# Reader Account Provisioning

This stack is a minimal example for creating reader accounts in the main account stack and then provisioning reader account stacks. It includes the following resources in the main account:

* A database
* A reader account
* A share to the reader account
* A `USAGE` grant on the database to the share

The reader account stack includes these resources:

* A database created from the share
* A role
* A privilege grant to the role
* A role grant to the user
* A user

You will need to update the config setting `provision.variables.main_account` to match the main account that you are provisioning the reader accounts in. For example, if your organization name is `COMPANY` and your account name is `MARKETING`, then you will use the value `COMPANY.MARKETING`.
