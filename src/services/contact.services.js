const {ObjectId} = require("mongodb")

class ContactServices {
    constructor(client){
        this.Contact =client.db().collection("contacts");
    }

     extractContactData(payload){
        const contact ={
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            company: payload.company,
            favorite: payload.favorite,
        };
        Object.keys(contact).forEach(
            (key)=>{(key)=>contact[key]=== undefined && delete contact[key];
        })
        return contact;
    }
    //Create contract
    async create(payload){
        const contact =this.extractContactData(payload);
        // save record
        const result=await this.Contact.findOneAndUpdate(
            contact,
            {$set: {favorite: contact.favorite===true}},
            {returnDocument: "after",upsert:true}
        );
        return result.value;
    }

    //Find all data contract
    async find(filter){
        const curcor=await this.Contact.find(filter);
        return await curcor.toArray();
    }
    //Find contract by name
    async findByName(name){
        return await this.find({
            name: {$regex: new RegExp(name),$options:"i"},
        });
    }
    //Find contract by ID
    async findById(id){
        return await this.Contact.findOne({
           _id: ObjectId.isValid(id)? new ObjectId(id):null,
        });
    }

      //Find favorite
      async findFavorite(){
        return await this.find({favorite: true});
    }

    //Update contract
    async update(id,payload){
        const filter={_id: ObjectId.isValid(id)? new ObjectId(id):null};
        const update =this.extractContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            {$set: update},
            {returnDocument: "after"}
        );
        return result.value;
    }
    //Delete contract by ID
    async delete(id){
        const result=await this.Contact.findOneAndDelete({
            _id: ObjectId.isValid(id)? new ObjectId(id):null,
        });
        return result.value;
    }
   
    //Delete all contract data
    async deleteAll(){
        const result=await this.Contact.deleteMany({});
        return result.deleteCount;
    }
}

module.exports=ContactServices;