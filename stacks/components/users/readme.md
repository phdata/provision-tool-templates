# User Management  

This stack is a portion of a stack to manage Users in your environment.
- Create Users or Alter users that are provisioned by SCIM

Example output of this stack:  
```
USER
    (+) CREATE USER IF NOT EXISTS "SIMPLE@PHDATA.IO"

USER
    (+) CREATE USER IF NOT EXISTS SVC_PHDATA DEFAULT_ROLE = FR_PHDATA, DEFAULT_WAREHOUSE = PHDATA_WH
    
```