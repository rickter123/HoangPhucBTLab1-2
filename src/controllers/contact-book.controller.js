const ApiError = require("../core/exception/api-error");
const ContactServices = require("../services/contact.services");
const MongoDB = require("../utils/mongodb.util");

// Create contact
exports.create =async (req,res,next)=>{
    // check name contactbook
    if(!req.body?.name){
        return next(new ApiError(400,"Name contact is required"));
    }
    try{
        const contactServices = new ContactServices(MongoDB.client);
        const document =await contactServices.create(req.body);
        return res.send(document);
    }catch(error){
        return next(new ApiError(500,"Cannot create contact"));
    }
}

// Get all contact in database
exports.findAll =async (req,res,next)=>{
    let documents=[];
    try{
        const contactServices =new ContactServices(MongoDB.client);
        const {name} =req.query;
        if(name){
            documents=await contactServices.findByName(name);
        }else
        {
            documents=await contactServices.find(name);
        }
    }catch(error){
        return next(new ApiError(500,"Can not get data contact."));
    }
    return res.send(documents);
}

// Get information contact by ID contact
exports.findOne =async (req,res,next)=>{
    try{
        const contactServices =new ContactServices(MongoDB.client);
        const document=await contactServices.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"Contact not found"));
        }
        return res.send(document);
    }catch(error){
        return next(new ApiError(500,"Something went wrong, please try again!"));
    }
}

// Update contact
exports.update = async (req,res,next)=>{
    if(Object.keys(req.body).length===0){
        return next(new ApiError(400,"Contact is empty."));
    }
    try{
        const contactServices =new ContactServices(MongoDB.client);
        const document=await contactServices.update(req.params.id,req.body);
        if(!document){
            return next(new ApiError(404,"Contact not found"));
        }
        return res.send({message: "Contact update successfully."});
    }catch(error){
        return next(new ApiError(500,`Can not update contact id = ${req.params.id};`));
    }
}

// Delete contact by ID
exports.delete =async (req,res,next)=>{
    try{
        const contactServices =new ContactServices(MongoDB.client);
        const document=await contactServices.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"Contact not found"));
        }
        return res.send({message: "Contact delete sucessfully"});
    }catch(error){
        return next(new ApiError(500,`Can not delete contact id = ${req.params.id};`));
    }
}

// Clear all data contact in database
exports.deleteAll = async (req,res,next)=>{
    try{
        const contactServices =new ContactServices(MongoDB.client);
        const deleteCount=await contactServices.deleteAll();
        return res.send({message: `${deleteCount} contacts deleted successfully`});
    }catch(error){
        return next(new ApiError(500,`Can not delete contact.`));
    }
}

// Find all contact favorite
exports.findAllFavorite =async (req,res,next)=>{
    try{
        const contactServices =new ContactServices(MongoDB.client);
        const documents=await contactServices.findFavorite();
        return res.send(documents);
    }catch(error){
        return next(new ApiError(500,`Khong the favorite du lieu;`));
    }
}