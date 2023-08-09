const upload = require('../helpers/upload.helper');
const util = require('util');
const path = require('path');
const comman = require("../models/comman.model");

exports.uploadSingle = (req, res) => {
    // req.file contains a file object
    res.json(req.file);
}

exports.uploadMultiple = (req, res) => {
    // req.files contains an array of file object
    res.json(req.files);
}

exports.uploadSingleV2 = async (req, res) => {
    
    const uploadFile = util.promisify(upload.array('file'));
    try {
      await uploadFile(req, res); 
           
        let newObject = await Promise.all(req.files.map(async element => {

            const data =({
                file_original_name:element.originalname,
                file_name:element.key,
                user_id:req.params.user_id,
                file_size:element.size,
                extension: path.extname(element.originalname.toLowerCase()),
                type:element.mimetype
    
            })
            const resdata = await comman.uploadImages(data)      
            return  resdata     
        
      })); 

      res.send({message:"upload successfully",newObject});     
      
    } catch (error) { 
        console.log(error,"error")
        res.status(500).json({ message: error.message });
    } 
}

exports.uploadAndUpdateUser = async (req, res) => {
    
    const uploadFile = util.promisify(upload.single('file'));
    try {
      await uploadFile(req, res); 
      const data =({
                file_original_name:req.file.originalname,
                file_name:req.file.key,
                user_id:req.params.user_id,
                file_size:req.file.size,
                extension: path.extname(req.file.originalname.toLowerCase()),
                type:req.file.mimetype
    
            })
            const resdata = await comman.uploadImages(data)
            if(resdata){
         
                const setUserdata =({
                    avatar_original:resdata.insertId
                })
                const userdata = await comman.updateuserImage(setUserdata,req.params.user_id)
                res.send(userdata);  
            } 
               
    } catch (error) { 
        console.log(error,"error")
        res.status(500).json({ message: error.message });
    } 
}