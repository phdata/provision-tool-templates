# Admin Role Management  

This stack is a portion of a stack to manage Admin Roles in your environment.
- Define the users the Admin Roles are granted to  

Example output of this stack:
``` 
ROLE GRANT
    (+) GRANT ROLE ACCOUNTADMIN TO USER "USER1@PHDATA.IO"
    (+) GRANT ROLE ACCOUNTADMIN TO USER "USER2@PHDATA.IO"
------------------------------

ROLE GRANT
    (+) GRANT ROLE SECURITYADMIN TO USER "USER3@PHDATA.IO"
    (+) GRANT ROLE SECURITYADMIN TO USER "USER4@PHDATA.IO"
------------------------------

ROLE GRANT
    (+) GRANT ROLE SYSADMIN TO USER "USER5@PHDATA.IO"
    (+) GRANT ROLE SYSADMIN TO USER "USER6@PHDATA.IO"
------------------------------

ROLE GRANT
    (+) GRANT ROLE USERADMIN TO USER "USER7@PHDATA.IO"
    (+) GRANT ROLE USERADMIN TO USER "USER8@PHDATA.IO"

```