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

## Product Types

These are types allowed in the system

- id
- name //eg Dead Stock
- description // Description of the type
- status -> to control whether new products of this can be added or not

## Settings

- id
- name
- value
- resource
- lastUpdated

Sample Settings
  Descriptors - All,None

- productAdditionDates  1-10
- hqProductAdditionDates All

- shortExpMaxAge 8months // time to expiry
- deadStockMinAge 8months // time in pharmacore

- specialBonusPaymentValue 7%
- deadStockBonusPaymentValue 10%
- shortExpBonusPaymentValue 5%

  //when the target starts to calculate
- branchMonthlySalesTargetStartDate 16
- branchMonthlySalesTargetEndDate 15
- branchMonthlySaleDefaultTarget 40000

- userMonthlySalesDefaultTarget  16000
- userMonthlySalesTargetPercentageCutoff 20 // the cutoff percentile for the best and the worst
  
- monthlyPerformanceReportsSendingDate  3   // date on when to send performance reports
- productAdditionReportSendingDate   11  // date on when to send product addition reports

- dateDisplayFormat MM DD, YYYY H:m:s
- numbersDisplayFormat compact,standard

- displayFontSize small,medium,large

## Major Task Dexie Js. Hold for now

## To Set Mobile

1. Update  Access-Control-Allow-Origin in htaccess
2. Update apiBase Url
