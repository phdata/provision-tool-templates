# User Management  

This stack is a portion of a stack to manage Users in your environment.
- Create Users or Alter users that are provisioned by SCIM

Example output of this stack:  
```
USER
    (+) CREATE USER IF NOT EXISTS "SIMPLE@PHDATA.IO" DISPLAY_NAME = null, FIRST_NAME = null, MIDDLE_NAME = null, LAST_NAME = null, EMAIL = null, MUST_CHANGE_PASSWORD = null, DISABLED = null, PASSWORD = null, DEFAULT_ROLE = null, DEFAULT_WAREHOUSE = null, DEFAULT_NAMESPACE = null, DEFAULT_SECONDARY_ROLES = null, RSA_PUBLIC_KEY = null, RSA_PUBLIC_KEY_2 = null, COMMENT = null, DAYS_TO_EXPIRY = 0

USER
    (+) CREATE USER IF NOT EXISTS SVC_PHDATA DISPLAY_NAME = null, FIRST_NAME = null, MIDDLE_NAME = null, LAST_NAME = null, EMAIL = null, MUST_CHANGE_PASSWORD = null, DISABLED = null, PASSWORD = null, DEFAULT_ROLE = FR_PHDATA, DEFAULT_WAREHOUSE = PHDATA_WH, DEFAULT_NAMESPACE = null, DEFAULT_SECONDARY_ROLES = null, RSA_PUBLIC_KEY = null, RSA_PUBLIC_KEY_2 = null, COMMENT = null, DAYS_TO_EXPIRY = 0

```