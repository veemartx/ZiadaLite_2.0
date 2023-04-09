import Dexie from "dexie";

let ZiadaDb = {
    productsList: `++,pid,name,code,costPrice,packSize`,
    products: `++,pid,type,name,code,expiry,expiryDate,qtyw,qtyp,branch,price,packSize,added,initAdded,addedBy,region,booked,bookedOn,bookedReqId,pushed,pushedFrom,imageUrl`,
    settings: '++,name,value,resource,lastUpdated',
    users: '++,uid,name,uname,branch,region,email,phone,position,designation,token',
    permissions: '++,action,resource,allowed,confirmable,allowedConfirmers,confirmationType'

}


export const db = new Dexie('ZiadaLiteDB');
db.version(1).stores(ZiadaDb);