import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import {buildContext} from 'graphql-passport';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import connectMongo from "connect-mongodb-session";
import {mergeTypeDef} from "./typeDefs/index.typeDef.js"
import {mergeResolver} from "./resolvers/index.resolver.js"
import { authPassport } from './authPassport/auth.passport.js';

authPassport();

const app = express();


app.use(express.json());
app.use(cors({
    origin: "http://localhost:4000",
	credentials: true,
}));
const MongoStore = connectMongo(session);
const store = new MongoStore({
    uri:process.env.MONGO_URI,
    collection:'sessions'
});
// console.log(store);
store.on('connected',()=>{
    console.log("Connected to mongo store");
});
store.on('error',err=>{
    console.log(err);
});

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60*24*7,
        httpOnly:true,
    },
    store:store
}))

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
    typeDefs:mergeTypeDef,
    resolvers:mergeResolver,

});

await server.start();

app.use('/graphql',
    expressMiddleware(server,
    {context:async({req,res})=>buildContext({req,res})
}));



export default app;