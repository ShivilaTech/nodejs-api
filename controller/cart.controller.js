const { response } = require("express");
const cart = require("../models/cart.model");
const moment = require('moment');

    
    exports.delete = async ( req, res) => {
        try {
        const data = await cart.delete(req.params.id);
        res.send(data);
        
        } catch(err) {
        console.log(err);     
        res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Course."
        });
    }};


  exports.add = async ( req, res) => {

    try {
        let price;
        let tax = 0;
        const  variant =  await cart.getvariantByvariantName(req.body.id,req.body.variant)         
        const product =  await cart.getProdct(req.body.id)
        const ProdctTax =  await cart.getProdctTax(req.body.id)
        const quantity= req.body.quantity;
        const variantrequest= req.body.variant;
        const user_id= req.body.user_id;
        const userID = req.body.temp_user_id ? req.body.temp_user_id : user_id;                 
         const checkProduct=  await cart.getcartByUserID(userID) 
         if(checkProduct!=''){
            
            if(checkProduct[0].product_id==req.body.id){
                return res.send({msg:'Product already in cart'});
             }
        } 
                
         
         if(!req.body.variant){
            price = product.unit_price;
         }else {
            price = variant.price;
         }

         let discount_applicable = false;
         var CurrentDate = moment().format("YYYY-MM-DD HH:mm");

         const discount_start_date = moment.unix(product.discount_start_date).format("YYYY-MM-DD HH:mm");
         const discount_end_date = moment.unix(product.discount_end_date).format("YYYY-MM-DD HH:mm");

         if (product.discount_start_date == null) {
             discount_applicable = true;
         }          
          else if( discount_start_date <= CurrentDate &&  CurrentDate <= discount_end_date  ){
             discount_applicable = true;
         }              

         if (discount_applicable) {
            if(product.discount_type == 'percent'){
                price -= (price*product.discount)/100;
            }
            else if(product.discount_type == 'amount'){
                price -= product.discount;
            }
         }     

        ProdctTax.forEach(product_tax => {
          if(product_tax.tax_type =='percent'){
            tax += (price * product_tax.tax) / 100;
          }else if(product_tax.tax_type =='amount'){
            tax += product_tax.tax;
          }  
        });

        if (product.min_qty > quantity) {
            return  res.send({
                message: `Minimum ${product.min_qty} item(s) should be ordered`                  
            });
        }
        
       const stock =variant.qty

       if(stock < quantity){

        if (stock == 0) {
            return res.send({
                message: `Stock out`                  
            });

        } else {
            return res.send({
                message: `Only ${stock} item(s) are available this ${variantrequest} `                  
            });
        }
         
       }   
       
       const addtocart=({
        owner_id:product.user_id,
        user_id:user_id,
        variation:variantrequest,        
        product_id:req.body.id,
        price:price,
        tax:tax,
        quantity:quantity, 
        shipping_cost:0,
        temp_user_id:req.body.temp_user_id
       })
           await cart.addCart(addtocart);
      
           return res.send({msg:'Product added to cart successfully'});    
            
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });

  }

  };

 exports.cartChangeQuantity = async (req, res) => {
    try {           
          const cartData =  await cart.getcartById(req.body.id) 
          const  variant =  await cart.getvariantByvariantName(cartData.product_id ,cartData.variation) 
                  
          if(req.body.quantity<=variant.qty){
            const resdata=  await cart.changeQuantity(req.body.id,req.body.quantity)            
            res.send({resdata, message:'Cart updated'})          
            }else {
                res.send({
                    "message":"Maximum available quantity reached",
                })
            }
      
        } catch (error) {        
            console.log(error);       
        }
 }

 exports.cartUpdateTempId = async (req, res) => {
    try {      
                
            const resdata=  await cart.cartUpdateTempId(req.body.temp_id,req.body.user_id)            
            res.send({resdata, message:'temp id updated'})        
           
        } catch (error) {        
            console.log(error);       
        }
 }


 exports.List= async (req, res) => {
    try {
          const cartData=  await cart.getcartByUserID(req.params.user_id)    

          res.send(cartData)         
                    
    } catch (error) {        
        console.log(error);       
    }
 }

exports.summary = async (req,res) => {
    try {
        
        let sum = 0.00;
        let subtotal = 0.00;
        let tax = 0.00;
        let shipping_cost =0.00;
        let discount =0.00;

        const cartData =  await cart.cartByUserID(req.params.user_id)
        
        cartData.forEach(cartItem => {

            let item_sum = 0.00;
            item_sum += (cartItem.price + cartItem.tax) * cartItem.quantity;
            item_sum += (cartItem.shipping_cost - cartItem.discount)
            sum +=  item_sum  ;   //// 'grand_total' => $request->g

            subtotal += cartItem.price * cartItem.quantity;
            tax += cartItem.tax * cartItem.quantity;
            discount += cartItem.discount;
            shipping_cost += cartItem.shipping_cost

        })
       

      const  response= ({
            'sub_total':subtotal,
            'tax': tax,
            'shipping_cost':shipping_cost,
            'discount' :discount,
            'grand_total':sum, 
            
         });
      
        res.send(response)

    } catch (error) {
        console.log(error);  
    }

}



