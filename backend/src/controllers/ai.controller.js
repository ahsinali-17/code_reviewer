import {useGemini} from '../services/ai.services.js';

export const getReview = async (req, res) => {
   const code = req.body.code;

   if(!code){
    return res.status(401).json({message:"Code is required"})
   }

   try{
    const review = await useGemini(code);
    console.log(review)
    return res.send(review)
   }catch(error){
    return res.status(500).json({message:error.message})
   }
}