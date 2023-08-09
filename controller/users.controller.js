const { body } = require("express-validator");
const moment = require('moment');
const model = require("../models/users.model");
const comman = require("../models/comman.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cart = require('../models/cart.model');
const address = require('../models/address.model');




  exports.signup = async ( req, res) => {
    try {
     const {email_or_phone } = req.body; 
      const user = await model.getuser(email_or_phone)

      const token = jwt.sign({
        data: 'Token Data'}, 
        'ourSecretKey',{ expiresIn: '10m' }   
      ); 
      if(user){
        res.status(201).send({
            'result' : false,
            'message':'User already exists.'
        });
      }else {

        const randam= Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;  
        host=req.get('host');

        const message =`<!DOCTYPE html>
        <html lang="en">        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
        
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;        
                }
        
                .upperdiv {
                    height: 100px;
                }
        
        
                .btn-text {
                    cursor: pointer;
                    padding: 10px 23px;
                    background-color: rgb(17 17 238 / 68%);
                    border-radius: 5px;   
        
                }
        
                .btn-text a {
                    color: white;
                    font-size: 15px;
                }
        
                .mainline {
                    font-size: 60px;
                    font-weight: lighter;
                    margin-bottom: 0px;
                }
        
                .subline {
                    color: rgb(97 97 196);
                    font-weight: lighter;
                    font-size: 22px;
                    margin-top: 10px;
        
                }
        
                #myhr {
                    width: 1200px;
                    size: 10px;
                    color: black;
                }
        
                @media only screen and (max-width : 1000px) {
                    #myhr {
                        width: 500px;
                        size: 10px;
                        color: black;
                    }
        
                    .btn-text a {
                        color: white;
                        font-size: 15px;
                    }
        
                    .mainline {
                        font-size: 60px;
                        font-weight: lighter;
                        margin-bottom: 0px;
                    }
        
                    .subline {
                        color: rgb(97 97 196);
                        font-weight: lighter;
                        font-size: 22px;
                        margin-top: 10px;
        
                    }
                }       
        
                @media only screen and (max-width : 399px){
                    #myhr {
                        width: 300px;
                        size: 10px;
                    }        
                    .btn-text a {
                        color: white;
                        font-size: 13px;
                    }        
                    .mainline {
                        font-size: 40px;
                    }        
                    .subline {
                        font-weight: lighter;
                        font-size: 15px;
                    }
                }
            </style>
        </head>        
        <body>
        
            <div class="upperdiv">        
            </div>        
            <hr id="myhr">
            <br><br>
            <h1 class="mainline">Email Verification</h1>        
            <h3 class="subline">Please click the button below to verify your email address</h3>
            <br>
            <button class="btn-text">
                <a href="http://${host}/verify/${token}">
                    Click Here
                </a>
            </button>       
        </body>
        
        </html>`;
        mailConfigurations=({
          to:email_or_phone,
          subject:"VERIFY YOUR EMAIL ADDRESS",
          message:message
        })
         if(email_or_phone){
          await comman.sendmail(mailConfigurations)
         }
       
        const saveres = await model.save(req.body,randam)
  
        if(saveres.affectedRows>0){
          model.customerSave(saveres.insertId)        
        }
  
        res.send({
          'result' : true,
          'message':'Registration Successful. please verify eamil.'
          });

      }  
  
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });

  }

  };

  exports.verify =async (req,res) =>{
    const {token} = req.params;
  
  
    jwt.verify(token, 'ourSecretKey', function(err, decoded) {
        if (err) {
            console.log(err);
           // res.send("Email verification failed, possibly the link is invalid or expired");
           res.render('verify',{ status :"failed" });
        }
        else {
          //  res.send("Email verifified successfully");

            res.render('verify',{ status :"sussess" });
        }
    });

    

  }

  exports.resend =async (req,res) =>{
    const {email} = req.body;
  
     
    const token = jwt.sign({
      data: 'Token Data'}, 
      'ourSecretKey',{ expiresIn: '10m' }   
    ); 

    host=req.get('host');

    const message =`<!DOCTYPE html>
        <html lang="en">        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
        
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;        
                }
        
                .upperdiv {
                    height: 100px;
                }
        
        
                .btn-text {
                    cursor: pointer;
                    padding: 10px 23px;
                    background-color: rgb(17 17 238 / 68%);
                    border-radius: 5px;   
        
                }
        
                .btn-text a {
                    color: white;
                    font-size: 15px;
                }
        
                .mainline {
                    font-size: 60px;
                    font-weight: lighter;
                    margin-bottom: 0px;
                }
        
                .subline {
                    color: rgb(97 97 196);
                    font-weight: lighter;
                    font-size: 22px;
                    margin-top: 10px;
        
                }
        
                #myhr {
                    width: 1200px;
                    size: 10px;
                    color: black;
                }
        
                @media only screen and (max-width : 1000px) {
                    #myhr {
                        width: 500px;
                        size: 10px;
                        color: black;
                    }
        
                    .btn-text a {
                        color: white;
                        font-size: 15px;
                    }
        
                    .mainline {
                        font-size: 60px;
                        font-weight: lighter;
                        margin-bottom: 0px;
                    }
        
                    .subline {
                        color: rgb(97 97 196);
                        font-weight: lighter;
                        font-size: 22px;
                        margin-top: 10px;
        
                    }
                }       
        
                @media only screen and (max-width : 399px){
                    #myhr {
                        width: 300px;
                        size: 10px;
                    }        
                    .btn-text a {
                        color: white;
                        font-size: 13px;
                    }        
                    .mainline {
                        font-size: 40px;
                    }        
                    .subline {
                        font-weight: lighter;
                        font-size: 15px;
                    }
                }
            </style>
        </head>        
        <body>
        
            <div class="upperdiv">        
            </div>        
            <hr id="myhr">
            <br><br>
            <h1 class="mainline">Email Verification</h1>        
            <h3 class="subline">Please click the button below to verify your email address</h3>
            <br>
            <button class="btn-text">
                <a href="http://${host}/verify/${token}">
                    Click Here
                </a>
            </button>       
        </body>
        
        </html>`;
    mailConfigurations=({
      to:email,
      subject:"VERIFY YOUR EMAIL ADDRESS",
      message:message
    })
     if(email){
      await comman.sendmail(mailConfigurations)
      res.send({
        'result' : true,
        'message':'new link sent on email, please verify eamil.'
        });
     }else {
      res.send({
        'result' : true,
        'message':'email not found.'
        });
     }
    

  }


  exports.updatepassword = async ( req, res) => {
    try {
     const { password,id} = req.body; 
     const hashedPassword = bcrypt.hashSync(password, 10);
     const inputData =({
      password: hashedPassword,
     });
      const user = await model.updatepassword(inputData,id)
      res.send(user);   
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });

  }
  };


  exports.updatedevice_token = async ( req, res) => {
    try {
     const { device_token,id} = req.body;     
     const inputData =({
      device_token: device_token,
     });
      const user = await model.update_device_token(inputData,id)
         res.send(user);   
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });

  }
  };

  
  exports.login = async ( req, res) => {
    try {
     const { email_or_phone,password,user_type} = req.body;     
      const user = await model.doLogin(email_or_phone,user_type)
       if(user){

        bcrypt.compare(password, user.password, (err, res1) => {
          if (err) return (err);
          if (!res1){
            return res.status(401).send({
              message: "Invalid password"
            });
          }else {

             const token =  jwt.sign({
              data: 'foobar'
            }, 'secret', { expiresIn: '1h' });

               res.send({
                
                name:user.name,
                email:user.email,
                user_type:user.user_type,
                avatar:user.avatar,
                avatar_original:user.avatar_original,
                device_token:user.device_token,
                token});

          } 

         });

       }   
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });

  }
  };
  
  exports.forgotpassword= async(req,res)=>{
  try {
    const {email}= req.body;
    const user= await model.getuser(email);
    const token = jwt.sign({
      data: 'Token Data'}, 
      'ourSecretKey', { expiresIn: '10m' }  
    );  
    if(!user){
      return res.status(404).send({
              message: "User is not found"
       });
    }else {
      const randam= Math.floor(Math.random() * 9000000000) + 1000000000; 
      const inputData=({"verification_code":randam})
      const userres= await model.updateUser(inputData,user.id);
      if(userres){
        
        const message =`Hi! There, You have recently sent request
        forget password so use code for reset password.<b>${randam}</b>`;
        mailConfigurations=({
          to:user.email,
          subject:"forgot password",
          message:message
        })

        comman.sendmail(mailConfigurations)

        return res.send({
          message: "code sent on email."
          });      
      }
    }

  } catch (error) {
    console.log(error)
  }

  }

  exports.confirmReset = async ( req, res) => {
    try {
      if(!req.body.code){
        return res.status(404).send({
          message: 'code field require.'         
        });
      }
      if(!req.body.password){
        return res.status(404).send({
          message: 'password field require.'         
        });
      }
     const userData = await model.getuserBycode(req.body.code)
     if(!userData){     
      return res.status(404).send({
        message: 'code not matched.'         
      });
     }
     const {id} = userData; 
     const hashedPassword = bcrypt.hashSync(req.body.password, 10);
     const inputData =({
      password: hashedPassword,
      verification_code:'',
     });
      const user = await model.updatepassword(inputData,id)
      res.send(user);   
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });

  }
  };

  exports.wishlistAdd = async ( req, res) => {
    try {
      if(!req.body.product_id){
        return res.status(404).send({
          message: 'product_id field require.'         
        });
      }
      if(!req.body.user_id){
        return res.status(404).send({
          message: 'user_id field require.'         
        });
      }
     const userData = await model.getwishlistbyId(req.body.user_id,req.body.product_id)
     if(!userData){ 
      const inputData =({
        user_id: req.body.user_id,
        product_id:req.body.product_id,
       });       
           
      const user = await model.addwishlist(inputData)
      res.send(user);   
     
     }else {
      res.send({message:"already in list"}); 
     }  
     
 
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });

  }
  };

  exports.wishlistUserId = async ( req, res) => {
    try {
    
      if(!req.params.user_id){
        return res.status(404).send({
          message: 'user_id field require.'         
        });
      }
     const userData = await model.getwishlistUserId(req.params.user_id)     
      res.send(userData);      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });
    }
  };

  exports.wishlistdelete = async ( req, res) => {
    try {
    
      if(!req.params.user_id){
        return res.status(404).send({
          message: 'user_id field require.'         
        });
      }
      if(!req.params.product_id){
        return res.status(404).send({
          message: 'product_id field require.'         
        });
      }
     const userData = await model.deletewishlistUserId(req.params.user_id,req.params.product_id)     
      res.send(userData);      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });
    }
  };


  exports.comapreListAdd = async ( req, res) => {
    try {
      if(!req.body.product_id){
        return res.status(404).send({
          message: 'product_id field require.'         
        });
      }
      if(!req.body.user_id){
        return res.status(404).send({
          message: 'user_id field require.'         
        });
      }
     const userData = await model.getcamparebyId(req.body.user_id,req.body.product_id)
     if(!userData){ 
      const inputData =({
        user_id: req.body.user_id,
        product_id:req.body.product_id,
       });       
           
      const user = await model.addcamapre(inputData)
      res.send(user);   
     
     }else {
      res.send({message:"already in list"}); 
     }  
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });

  }
  };

  exports.comparelistUserId = async ( req, res) => {
    try {
    
      if(!req.params.user_id){
        return res.status(404).send({
          message: 'user_id field require.'         
        });
      }
     const userData = await model.getcamparelistUserId(req.params.user_id)     
      res.send(userData);      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });
    }
  };

  exports.deletecomaparelist = async ( req, res) => {
    try {
    
      if(!req.params.user_id){
        return res.status(404).send({
          message: 'user_id field require.'         
        });
      }
    
     const userData = await model.deletecampareUserId(req.params.user_id)     
      res.send(userData);      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });
    }
  };
  

  
  exports.supportadd = async ( req, res) => {
    try {
      if(!req.body.user_id){
        return res.status(404).send({
          message: 'user_id field require.'         
        });
      }
      if(!req.body.subject){
        return res.status(404).send({
          message: 'subject field require.'         
        });
      }

      const randam= Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000; 

      const inputData =({
        user_id: req.body.user_id,
        subject:req.body.subject,
        files:req.body.files?req.body.files:'',
        details:req.body.details?req.body.details:'',
        code:randam
       });       
           
      const user = await model.supportadd(inputData)
      res.send(user);   
     
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });

  }
  };

  exports.supportlist = async ( req, res) => {
    try {
      if(!req.params.user_id){
        return res.status(404).send({
          message: 'user_id field require.'         
        });
      }
           
      const user = await model.supportlist(req.params.user_id)
      res.send(user);   
     
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });
  }
  };

  exports.comparelistUserId = async ( req, res) => {
    try {
    
      if(!req.params.user_id){
        return res.status(404).send({
          message: 'user_id field require.'         
        });
      }
     const userData = await model.getcamparelistUserId(req.params.user_id)     
      res.send(userData);      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });
    }
  };


  exports.orderListUserId = async ( req, res) => {
    try {
    
      if(!req.params.user_id){
        return res.status(404).send({
          message: 'user_id field require.'         
        });
      }
     const userData = await model.orderListUserId(req.params.user_id,req.query)     
      res.send(userData);      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });
    }
  };

  exports.orderDetailsById = async ( req, res) => {
    try {
    
      if(!req.params.order_id){
        return res.status(404).send({
          message: 'order_id field require.'         
        });
      }
     const userData = await model.orderDetailsById(req.params.order_id)     
      res.send(userData);      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });
    }
  };
  

  
  exports.orderStore = async ( req, res) => {
    try {
      const {user_id,address_id,name,email,payment_option} =req.body

      const  carts = await cart.cartByUserID(user_id)

      if(carts.length<0){
        res.send("Your cart is empty")
      }      
      
     const addressData =  await address.userAddressGetByAddressId(address_id);
     const saveaddress = ({
        "name":name,
        "email":email,
        "address":addressData.address,
        "country":addressData.country_name,
        "state":addressData.state_name,
        "city":addressData.city_name,
        "postal_code":addressData.postal_code,
        "phone":addressData.phone
      })

      const combined_order= ({ 
        shipping_address: JSON.stringify(saveaddress),
        user_id: user_id
       }) 

      

      const  CombinedOrderdata = await  model.CombinedOrder(combined_order);
    
       $subtotal = 0;
       $tax = 0;
       $shipping = 0;
       $coupon_discount = 0;       

      const  orderdata = {
        combined_order_id:CombinedOrderdata.insertId,
        user_id:user_id,
        shipping_address:JSON.stringify(saveaddress),
        payment_type:payment_option,
        delivery_viewed:0,
        payment_status_viewed:0,
        code: moment().format("YYYYMMDD-HH:mm")+ Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
        date:moment().unix()
      }
            
        const orderres = await model.ordersave(orderdata);
        console.log(orderres,"orderres")
    
      
     subtotal = 0;
     tax = 0;
     shipping = 0;
     pickup_point_id=0;
     num_of_sale=0;
     grand_total=0
     
     Promise.all(carts.map(async cartItem => {
        //  $product = Product::find($cartItem['product_id']);
         let  product = await cart.getProdct(cartItem.product_id)
    
              subtotal += cartItem.price * cartItem.quantity;
              tax += cartItem.tax * cartItem.quantity;
              product_variation = cartItem.variation;
              product_stock= await cart.getvariantByvariantName(cartItem.product_id,product_variation)
    
              if (product.digital != 1 && cartItem.quantity > product_stock.qty) {
                 // await model.deleteOrderId(orderres.insertId);
               
                  } else if (product.digital != 1) {
                      let product_stock_qty=  product_stock.qty -= cartItem.quantity;
                      let  product_stock_qtyAdd = ({qty:product_stock_qty })
                      await model.productstockUpdate(product_stock.id,product_stock_qtyAdd);
                }
    
            if (cartItem.shipping_type == 'pickup_point') {
                    pickup_point_id = cartItem.pickup_point;
            }    
            const order_detail =({          
              order_id : orderres.insertId,
              seller_id : product.user_id,
              product_id : product.id,
              variation : product_variation,
              price : cartItem.price* cartItem.quantity,
              tax : cartItem.tax * cartItem.quantity,
              shipping_type : cartItem.shipping_type,
              product_referral_code : cartItem.product_referral_code,
              shipping_cost : cartItem.shipping_cost,
              pickup_point_id:pickup_point_id,
              quantity:cartItem.quantity
    
            })     
            
             shipping += cartItem.shipping_cost;
    
              num_of_sale += cartItem.quantity;
              const productsUpdate = ({
                        num_of_sale:num_of_sale
                      })
              await model.orderDetailsStore(order_detail)
              await model.productUpdate(product.id,productsUpdate)
    
              seller_id = product.user_id;
    
              sellerData= await model.getsellerbyId(seller_id)
    
              if (product.added_by == 'seller' && sellerData){
                seller_num_of_sale=0;
                seller_num_of_sale += cartItem.quantity;
              
                 const sellerupdateData=({
                        num_of_sale:seller_num_of_sale
                       })
                await model.sellerUpdate(sellerData.id,sellerupdateData)
    
              }
    
              grand_total = subtotal + tax + shipping;
               
               
               const orderdata=({
                seller_id:seller_id,
                grand_total:grand_total
               })
               const combineOrderdata=({
                grand_total:grand_total
               })
             // await model.orderUpdate(orderres.insertId,orderdata)
              //await model.combineOrderUpdate(CombinedOrderdata.insertId,combineOrderdata)
      
        })); 
      
       
      res.send("order saved");      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });
    }
  };
 
  // exports.updateSetting = async ( req, res) => {
  //   try {
  //    const {,user_id} = req.body;     
  //    const inputData =({
  //     device_token: Cash Payment,
  //     Bank Payment 
  //    });
  //     const user = await model.update_setting(inputData,user_id)
  //        res.send(user);   
  //    } catch(err) {
  //     console.log(err);     
  //     res.status(500).send({
  //             message:
  //               err.message || "Some error occurred while retrieving Course."
  //     });

  // }
  // };m  

