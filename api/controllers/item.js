var connection=require('./../../connection');
let jwt = require('jsonwebtoken');
var secret=require('./../../config/secret');
var app=require('express')();
module.exports.findItem =(req,res) =>
{
  
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if(token)
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, String(secret), (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
       let id = req.swagger.params.ItemId.value;
  var query = 'SELECT * FROM Item WHERE id='+id+'';
 //   console.log(query)
    connection.query(query, function(err,results) {
            if(results.length==0)
                return res.json({success:false}).status(400).end();
            else
            {
             return res.json(results).status(200);
            }
            
        });
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
   
}
module.exports.getItems = (req, res) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if(token)
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, String(secret), (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
       var query = 'SELECT * FROM Item';
          connection.query(query, function(err,results) {
          return res.json(results).status(200);
        });
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
   
   
  
}
module.exports.deleteItem = (req, res) =>{
   let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if(token)
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, String(secret), (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
       let id = req.swagger.params.ItemId.value;
    var query = 'DELETE FROM Item WHERE id='+id+'';
    connection.query(query, function(err,results) {
            console.log(results);
            if(results.affectedRows==0)
                return res.json({success:false}).status(404).end();
            else
            return res.json({success:true}).status(200).end();
        });
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }

    
}

module.exports.postItems = (req, res) => {
     let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if(token)
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, String(secret), (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
      let newItem = req.body;
    var query = 'SELECT MAX(id) as mx FROM Item';
    var id;
    connection.query(query, function(err,results) {
           console.log(results[0].mx);
           id=results[0].mx+1; 
           var query2 = 'INSERT INTO Item VALUES('+id+',"'+newItem.name+'","'+newItem.stock+'","'+newItem.price+'")';
           console.log(query2);
           connection.query(query2, function(err,results) {
               return res.json({success:true}).status(204).end();  
           });
        });
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
    
    
    
}

module.exports.putItems = (req, res) => {
     let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if(token)
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, String(secret), (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
       let id = req.swagger.params.ItemId.value;
     var query = 'UPDATE Item SET id='+id+',name="'+req.body.name+'",stock="'+req.body.stock+'",price="'+req.body.stock+'"WHERE id='+id+'';
    console.log(query);
    connection.query(query, function(err,results) {
   //         console.log(results);
            if(results.affectedRows==0)
                return res.json({success:false}).status(404).end();
            else
            return res.json({success:true}).status(204).end();
        });
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }

}

