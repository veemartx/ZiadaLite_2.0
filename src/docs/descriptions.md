<!-- Author _Vee -->
# Action Descriptions

<!-- Mon 01, May 2023 -->

## Create Product

This component creates a product and inserts it in the product list.

## Add Product

Add Product Into The Db.  This product is either from product list or from
approved additions for dead stock

## Universal Message

Universal message Col

Message
Title,
Message
Note // extra details with the message
Actions [Array Of Actions]
Type: Success, Error, Info,Warning

Sender. Resource Id initiating the message
Recipient. Resource Id Receiving the message
Subject. Message Title
Message. Message Text
Chanels-> Messanger. To be shown in chat
        -> universal. To be shown in universal message bar
        -> Notification. Only Appear On Notification Panel
        -> System. Silent Only Sent to the system

Priority. A number between 0-5. Describing the urgency
Target - The Target Branch,/ user, region etc

Resource //the resource name with which the message relates to eg. users,
resourceRefId-> The id of the target resource

Message Statuses= sent,delivered,read,done

<!-- some few changes on transfer -->
<!-- only merge products if and only if their expiry dates are the same -->
<!-- on transfer just insert the new product. -->
<!-- during product actions, remember to merge the products to one -->
