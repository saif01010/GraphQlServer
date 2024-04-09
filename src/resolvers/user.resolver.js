// import {userTypeDef} from '../typeDefs/user.typeDef.js';
import { User } from '../models/user.model.js';
import { Transection} from '../models/transection.model.js';
import asyncHandler from '../utils/asyncHandler.js';
const userResolver = {
    Mutation:{
        signUp: asyncHandler(async(_,{input},context)=>{
            // console.log(context);
            const {name,email,password,gender} = input;
            if(!name || !email || !password || !gender){
                throw new Error("All fields are required");
            };

            const exitsUser = await User.findOne({email});
            if(exitsUser){
                throw new Error("User already exists");
            };

            const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${name}`;
			const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${name}`;

            const user = await User.create({
                name,
                email,
                password,
                gender,
                profilePic: gender === "Male" ? boyProfilePic : girlProfilePic
            });
            await context.login(user);
            // console.log("SignUp",user);
            // const authuser = await context.authenticate("graphql-local", {email,password});
            // console.log("AuthUser",authuser);
            // console.log(context.req.cookie)
            return user;

    }),
    signIn: asyncHandler(async(_,{input},context)=>{
        // console.log(context);
        const {email,password} = input;
        if(!email || !password){
            throw new Error("All fields are required");
        };
        const existUser = await User.findOne({email});
        if(!existUser){
            throw new Error("User not found");
        };
        const isPasswordMatch = await existUser.comparePassword(password);
        if(!isPasswordMatch){
            throw new Error("Invalid password");
        };
       const {user} = await context.authenticate("graphql-local", {email,password});
       console.log(user);
        await context.login(user);
        
        return user;
    }),
    logOut: asyncHandler(async(_,args,context)=>{
        await context.logout();
        context.req.session.destroy((err)=>{
            if(err) throw new Error("Something went wrong while logging out");
        });
        context.res.clearCookie("connect.sid");
        context.res.status(200);
        return {message:"Logged out successfully"};
    })
},
    Query:{
        getUsers:asyncHandler(async()=>{
            return await User.find();
        }),
        currentUser:asyncHandler(async(_,args,context)=>{
           const user=  await context.getUser();
        //    console.log("Current User",user);
              return user;
        }),
        userById:asyncHandler(async(_,{_id})=>{
            const user = await User.findById(_id);
            if(!user){
                throw new Error("User not found");
            };
            return user;
        })
    },
    User:{
        transections:asyncHandler(async(parent)=>{
            const transection = await Transection.find({userId:parent._id});
            return transection;
        })
    }
};

export { userResolver };