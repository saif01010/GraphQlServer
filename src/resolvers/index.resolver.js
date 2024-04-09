import { mergeResolvers } from "@graphql-tools/merge";
import { userResolver } from "./user.resolver.js";
import { transectionResolver } from "./transection.resolver.js";

const mergeResolver = mergeResolvers([userResolver, transectionResolver]);

export { mergeResolver };
