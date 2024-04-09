import {mergeTypeDefs} from '@graphql-tools/merge';
import {userTypeDef} from './user.typeDef.js';
import {transectionTypeDef} from './transection.typeDef.js';

const mergeTypeDef = mergeTypeDefs([userTypeDef, transectionTypeDef]);


export {mergeTypeDef}
