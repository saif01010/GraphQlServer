import { Transection } from "../models/transection.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
const transectionResolver ={
    Mutation:{
        addTransection: asyncHandler(async(_,{input},context)=>{
            const {amount,paymentType,description,category,date,location} = input;
            console.log(amount,paymentType,category,date,location);
            if(!amount || !paymentType  || !category || !date){
                throw new Error("All fields are required");
            };
            const isUser = await context.getUser();
            console.log(isUser);
            if(!isUser){
                throw new Error("User not found");
            };
            const userid = isUser._id;
            console.log(userid);
            const user = isUser.name;
            const transection = await Transection.create({
                amount,
                paymentType,
                description,
                category,
                userId: userid,
                user,
                date,
                location
            });

            return transection;

        }),
        updateTransection: asyncHandler(async(_,{_id,input},context)=>{
            const {amount,paymentType,description,category,date,location} = input;
            console.log(amount,paymentType,category,date);
            const isUser = await context.getUser();
            if(!isUser){
                throw new Error("User not found");
            };
            const transection = await Transection.findOneAndUpdate({_id},{
                amount,
                paymentType,
                description,
                category,
                date,
                location
            },{new:true});
            return transection;
        }),
        deleteTransection: asyncHandler(async(_,{_id},context)=>{
            const isUser = await context.getUser();
            console.log("Delete Transection",isUser);
            if(!isUser){
                throw new Error("User not found");
            };
           const transection =  await Transection.findOneAndDelete({_id});
            return transection;
        }),

    },
    Transection:{
        user:asyncHandler(async(parent)=>{
            const user = await User.findById(parent.userId);
            if(!user){
                throw new Error("User not found");
            }
            return user;
        })
    },
    Query:{
        getAllTransections:asyncHandler(async(_,args,context)=>{
            const isUser = await context.getUser();
            if(!isUser){
                throw new Error("User not found");
            };
            const transections = await Transection.find({userId:isUser._id});
            return transections;
        }),
        transectionById:asyncHandler(async(_,{_id},context)=>{
            const isUser = await context.getUser();
            if(!isUser){
                throw new Error("User not found");
            };
            const transection = await Transection.findOne({_id,userId:isUser._id});
            if(!transection){
                throw new Error("Transection not found");
            };
            return transection;
        }),
        catagagroryStats:asyncHandler(async(_,args,context)=>{
            const isUser = await context.getUser();
            if(!isUser){
                throw new Error("User not found");
            };
            const stats = await Transection.aggregate([
                {
                    $match:{
                        userId:isUser._id
                    }
                },
                {
                    $group:{
                        _id:"$category",
                        category:{$first:"$category"},
                        total:{$sum:"$amount"}
                    }
                },
                {
                    $project:{
                        category:1,
                        total:1,
                        
                    }
                }
            ]);
            // console.log(stats);
            return stats;
        })
    }
}
export { transectionResolver };