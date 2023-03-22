# Functional Role Management  

This stack is a portion of a stack to manage Functional Roles in your environment.
- Create Functional Role  
- Ensure the Functional Role is Granted to SYSADMIN  
- Define the various roles that are granted to the Functional Role  
- Define the users the Functional Role is granted to  

Example output of this stack:  
```
ROLE
    (+) CREATE ROLE IF NOT EXISTS FR_SVC_ACCOUNT

ROLE GRANT
    (+) GRANT ROLE FR_SVC_ACCOUNT TO ROLE SYSADMIN
    (+) GRANT ROLE FR_SVC_ACCOUNT TO USER SVC_ACCOUNT
    (+) GRANT ROLE _AR_SHARED_TRANSFORM_WH TO ROLE FR_SVC_ACCOUNT
    (+) GRANT ROLE _AR_SHARED_INGEST_WH TO ROLE FR_SVC_ACCOUNT
    (+) GRANT ROLE _DR_DB1_RW TO ROLE FR_SVC_ACCOUNT
    (+) GRANT ROLE _DR_DB2_RW TO ROLE FR_SVC_ACCOUNT
    (+) GRANT ROLE _DR_DB3_RW TO ROLE FR_SVC_ACCOUNT
```