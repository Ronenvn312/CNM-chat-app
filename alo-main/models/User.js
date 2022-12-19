// import Realm from "realm";

// export class User extends Realm.Object {
//     constructor( phone = new Realm.BSON.ObjectId(),password ){
//         this.phone = phone;
//         this.password = password;
//     }
    
//     // To use a class as a Realm object type, define the object schema on the static property "schema".
//     static TaskSchema = {
//         name: "user",
//         properties: {
//           phone: "string",
//           password: "string",
//         },
//         primaryKey: "phone",
//       };
//   }
//   export const {useRealm, useQuery, useObject} = createRealmContext({
//     schema: User.schema,
//     deleteRealmIfMigrationNeeded: true,
//   });