const {User}=require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const getAllUsers=async (req,res)=>{
    const users=await User.find();
    try{
        if(users.length>0){
            res.status(200).send(users);
        }
        else{
            res.status(404).send(`no users found`);
        }
    }catch(error){
        res.status(500).send(error);
    }
}

const signUpUser=async (req,res)=>{
    const body=req.body;
    const hashPassword=await bcrypt.hash(body.password,3);
    const user=new User({
        username:body.username,
        email:body.email,
        password:hashPassword
    })
    try{
        await user.save();
        if(user){
            res.status(200).send(`user Signup successfull ${user}`);
        }
    }catch(error){
        res.status(500).send(error);
    }
}

const loginUser=async (req,res)=>{
    const {email,password}=req.body;
    
    
    try{
        const user= await User.findOne({email});
        if(!user){
            res.status(404).send(`No user found`);
        }
        const check=await bcrypt.compare(password,user.password);
        if(!check){
            res.status(404).send(`Password is not matching`);
        }
        else{
            const token=await jwt.sign({user:check._id},"alkshdfluhpunvpajhfgiobanlfghaiurhdgpnvfan;,./hjkmlnjmk67890''/.;[]]/..",{expiresIn:'2h',algorithm:'HS512'});
            res.status(200).send({token:token,email:email,message:"Successfully login"});
        }
    }catch(error){
        res.status(500).send({message:error.message});
    }

}

const updateUser=async (req,res)=>{
    const body=req.body;
    const id=req.params.id;

    try{
        const user=await User.findByIdAndUpdate(id,body,{new:true,runValidators:true,context:'query'});
        res.status(202).json({user});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

const deleteUser=async (req,res)=>{
    const id=req.params.id;
    try{
        const user=await User.findByIdAndDelete(id);
        if(user){
            res.status(200).send("User deleted successfully");
        }
        else{
            res.status(404).send("No user found");
        }
    }catch(error){
        res.status(500).send({message:error.message});
    }
    
}

module.exports={getAllUsers,signUpUser,loginUser,updateUser,deleteUser};