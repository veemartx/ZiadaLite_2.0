import Dexie from "dexie";

let ZiadaDb = {
    productsList: `++,pid,name,code,costPrice,packSize`,
    products: `++,pid,type,name,code,expiry,expiryDate,qtyw,qtyp,branch,price,packSize,added,initAdded,addedBy,region,booked,bookedOn,bookedReqId,pushed,pushedFrom,imageUrl`,
    settings: '++,name,value,resource,lastUpdated',
    users: '++,uid,name,uname,branch,region,email,phone,position,designation,token',
    permissions: '++,action,resource,allowed,confirmable,allowedConfirmers,confirmationType',
    messages: '++,id,sender,senderName,hostBranch,recipient,subject,message,note,channel,priority,options,target,resource,resourceRefId,authenticate,sentAt,deliveredAt,openedAt,transactionRef,status'

}

export const db = new Dexie('ZiadaLiteDB');
db.version(1).stores(ZiadaDb);