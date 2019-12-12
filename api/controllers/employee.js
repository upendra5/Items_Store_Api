var connection=require('./../../connection');
let jwt = require('jsonwebtoken');
var secret=require('./../../config/secret');
module.exports.loginemployees =(req,res) => {
    var user=req.query.username;
    var pass=req.query.password;
    var query = 'SELECT * FROM employee WHERE name="'+user+'" AND password="'+pass+'"';
    console.log(query)
    connection.query(query, function(err,results) {
            if(results.length==0)
                return res.status(400).end();
            else
            {
             let token = jwt.sign({username: user},
              String(secret)
              );
        
             return res.json({
             success: true,
             message: 'Authentication successful!',
             token: token
             });
            }
            
        });
}
module.exports.findemployee =(req,res) =>
{
  let id = req.swagger.params.EmployeeId.value;
  var query = 'SELECT * FROM employee WHERE id='+id+'';
 //   console.log(query)
    connection.query(query, function(err,results) {
            if(results.length==0)
                return res.status(400).end();
            else
            {
             return res.json(results).status(200);
            }
            
        });
}
module.exports.getemployees = (req, res) => {
    
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err,results) {
            return res.json(results).status(200);
        });
    
}
module.exports.deleteemployee = (req, res) =>{
    let id = req.swagger.params.EmployeeId.value;
    var query = 'DELETE FROM employee WHERE id='+id+'';
    connection.query(query, function(err,results) {
            console.log(results);
            if(results.affectedRows==0)
                return res.json({success:false}).status(404).end();
            else
            return res.json({success:true}).status(200).end();
        });
    
}

module.exports.postemployees = (req, res) => {
    let newemployee = req.body;
    var query = 'SELECT MAX(id) as mx FROM employee';
    var id;
    connection.query(query, function(err,results) {
           console.log(results[0].mx);
           id=results[0].mx+1; 
           var query2 = 'INSERT INTO employee VALUES('+id+',"'+newemployee.name+'","'+newemployee.password+'")';
           console.log(query2);
           connection.query(query2, function(err,results) {
               return res.json({success:true}).status(204).end();  
           });
        });
    
    
}

module.exports.putemployees = (req, res) => {
    let id = req.swagger.params.EmployeeId.value;
     var query = 'UPDATE employee SET id='+id+',name="'+req.body.name+'",password="'+req.body.password+'"WHERE id='+id+'';
    console.log(query);
    connection.query(query, function(err,results) {
   //         console.log(results);
            if(results.affectedRows==0)
                return res.json({success:false}).status(404).end();
            else
            return res.json({success:true}).status(204).end();
        });
}

