import mongoose,{Schema} from "mongoose";

const transectionSchema = new Schema({
    amount:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        enum: ["Saving", "Expense", "Investment"],
        required: true
    },
    paymentType:{
        type: String,
        enum:["cash", "card"],
        required: true
    },
    description:{
        type: String,
        default:""
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user:{
        type: Schema.Types.String,
        ref: 'User',
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    location:{
        type: String,
        default:""
    }
}, {timestamps: true});


export const Transection = mongoose.model('Transection', transectionSchema);