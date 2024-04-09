import mongoose ,{Schema} from 'mongoose';
import aggregatePaginate  from 'mongoose-aggregate-paginate-v2';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profilePic:{
        type: String,
        default:" "
    },
    gender:{
        type: String,
        enum:["Male","Female"],
        required: true
    }
}, {timestamps: true});

userSchema.plugin(aggregatePaginate);

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};


export const User = mongoose.model('User', userSchema);