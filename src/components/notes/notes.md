# Notes

## Auth Token

Props

- authenticated user (bind)
- on:cancel
- on:success
- errorMessage //Because different auth actions have different errors
- payload (Array Of Users To Be Authenticated).

## System Resources

- products-list
- products
- users
- suppliers
- branches
- credit-notes
- transfers
- transfer-requests
- reports
- branch-orders
- settings
- trash
- transactions
- regions
- targets
- sales
- product-types
- permissions
- positions
- designations
- roles
- Bonuses
- Backups
- Archives

<!-- Db schemas -->
## Permissions

Permissions on ziadalite are assigned based on users position. and the action resource
Permission Db Structure

- id
- resource - resource
- action - action allowed
- allowed - an array of allowed positions
- updated -last updated
  
## Actions

These are allowed actions on systems resources

- id
- name
- resource // foreign key to resources
- confirmable //boolean indicating that the action needs to be confirmed
- allowedConfirmers  // an array of positions allowed to confirm
- confirmationType  
    1. host-> "can only be confirmed by a person from the same branch".
    2. global -> Can be confirmed by anyone allowed in the system
