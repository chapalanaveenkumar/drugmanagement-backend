const express=require("express");
const {getAllUsers,signUpUser, loginUser, updateUser, deleteUser}=require("../controllers/userControllers");
const router=express.Router();

router.get("/",getAllUsers);
router.post("/",signUpUser);
router.post("/login",loginUser);
router.put("/:id",updateUser);
router.delete("/:id",deleteUser);


module.exports=router;