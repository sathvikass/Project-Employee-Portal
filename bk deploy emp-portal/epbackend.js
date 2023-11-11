const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '80mb'}));
app.use(bodyParser.urlencoded({limit: '80mb', extended: false }));
app.use(bodyParser.json());
const mysql = require('mysql-await');
process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
  
});

function random_string(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random()*charactersLength));
   }
   return result;
}


const db_credentials = {host: 'localhost',user:'root',password: '6228',database: 'eptables'};



app.post('/docs0/sign-in-empty', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"",
                    "idno":"",
                    "name":""
                    
                };
    let qrystring = "SELECT idno, name, qno, points FROM employees WHERE idno='"+request.body.userid+"' AND password='"+request.body.password+"'";
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    if(result2.length==1)
        {
          response.status='success';
          response.idno=result2[0].idno;
          response.name=result2[0].name;
          
        }
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/new-employee-submit', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"",
                    "idno":"",
                    "name":""
                    
                };
    let qrystring='INSERT INTO idcounter (yes_field) VALUES ("yes")';
    let result = await connection.awaitQuery(qrystring);
    
    result= JSON.parse(JSON.stringify(result));
    
    
    
    let id_prefix='20230';
    let id_final=id_prefix + result.insertId;
    
    let id_key = parseInt(id_final);
    let fname1='./epstorage/dp_'+id_final+'.txt';
       
    fs.writeFileSync(fname1,request.body.dp_file, function (err) {
    if (err) throw err;               
    }); 
    
    qrystring = "INSERT INTO employee_profile (employee_id, full_name, short_name, role, address, bank_details, dp_file, position, accepted, password) VALUES ('"+id_final+"', '"+request.body.full_name+"', '"+request.body.short_name+"', '"+request.body.role+"', '"+request.body.address+"','"+request.body.bank_details+"', '"+fname1+"', '"+request.body.position+"', 'no', '"+request.body.password+"')";
    
    //console.log(qrystring);
    
    result = await connection.awaitQuery(qrystring);
    
    response.status='success';
    response.idno=id_final;
    response.name=request.body.short_name;
    
    qrystring ="UPDATE admin_cntr SET new_employees=new_employees+1 WHERE auto_id=1";
    result = await connection.awaitQuery(qrystring);
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/admin-sign-in', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":""
                    
                };
    let qrystring = "SELECT * FROM admin_sign WHERE admin_id='"+request.body.admin_id+"' AND password='"+request.body.password+"'";
    
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    if(result2.length==1)
        {
          response.status='success';
                   
        }
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/admin-cntr', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success",
                    "inbox":0,
                    "new_employees":0,
                    "leaves":0
                    
                };
    let qrystring = "SELECT * FROM admin_sign WHERE admin_id='"+request.body.admin_id+"' AND password='"+request.body.password+"'";
    
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    if(result2.length==1)
        {
                qrystring = "SELECT * FROM admin_cntr where auto_id=1";
                let result2 = await connection.awaitQuery(qrystring);
                result2=JSON.parse(JSON.stringify(result2));
                response.inbox=result2[0].inbox;
                response.new_employees=result2[0].new_employees;
                response.leaves=result2[0].leaves;
                   
        }
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/new-profiles', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success",
                    "profiles":[],
                    "dp_pics" :[]         
                  };
    let qrystring = "SELECT * FROM employee_profile WHERE accepted='no'";
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    
    //console.log(result2);
    response.profiles=result2;
    
    for(let i=0;i<result2.length;i++)
        {
            let e_path=result2[i].dp_file;
            let gotnow=fs.readFileSync(e_path, 'utf8'); 
            response.dp_pics.push(gotnow);
        }
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/all-profiles', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success",
                    "profiles":[],
                    "dp_pics" :[]         
                  };
    let qrystring = "SELECT * FROM employee_profile WHERE accepted='yes'";
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    
    //console.log(result2);
    response.profiles=result2;
    
    for(let i=0;i<result2.length;i++)
        {
            let e_path=result2[i].dp_file;
            let gotnow=fs.readFileSync(e_path, 'utf8'); 
            response.dp_pics.push(gotnow);
        }
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/del-profiles', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success"
                       
                  };
    let qrystring = "DELETE  FROM employee_profile WHERE employee_id="+request.body.key;
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    
    
    
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/acc-profiles', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success"
                 
                  };
    let qrystring = "UPDATE employee_profile SET accepted ='yes', voted='no' WHERE employee_id="+request.body.key;
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    
    qrystring="UPDATE admin_cntr SET new_employees=new_employees-1";
     result2 = await connection.awaitQuery(qrystring);
    
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/rej-profiles', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success"
                       
                  };
    let qrystring = "DELETE  FROM employee_profile WHERE employee_id="+request.body.key;
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    
    
    qrystring="UPDATE admin_cntr SET new_employees=new_employees-1";
    result2 = await connection.awaitQuery(qrystring);
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/empl-sign-in', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"",
                    "name":""
                    
                };
    let qrystring = "SELECT * FROM employee_profile WHERE employee_id='"+request.body.empl_id+"' AND password='"+request.body.empl_password+"'";
    
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    if(result2.length==1)
        {
            
          response.status='success',
          response.name = result2[0].short_name;
                   
        }
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/ps-upload', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success"
                    
                 };
    
    
    
    
    let id_prefix='ps-'+request.body.emp_id;
    
    
    
    let fname1='./epstorage/'+id_prefix+'.txt';
       
    fs.writeFileSync(fname1,request.body.file_frag, function (err) {
    if (err) throw err;               
    }); 
    
    
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/ps-download', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success",
                    "filestub":""
                 };
    
    
    
    
    let id_prefix='ps-'+request.body.userid;
    
    let e_path='./epstorage/'+id_prefix+'.txt';
            let gotnow=fs.readFileSync(e_path, 'utf8'); 
            response.filestub=gotnow;
    
    
    
    
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/employer-mail-sender', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success"
                           
                  };
    let qrystring = "INSERT INTO employee_inbox (from1, to1, new, subject, body) VALUES ('Admin', '"+request.body.toaddress+"', 'yes', '"+request.body.subject+"', '"+request.body.mailbody+"')";
    
    let result2 = await connection.awaitQuery(qrystring);
    //result2=JSON.parse(JSON.stringify(result2));
    
   
    
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/employee-mail-fetch', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success",
                    "mails":[]
                           
                  };
    let qrystring = "SELECT * FROM employee_inbox WHERE to1='"+request.body.employeeid+"'"; 
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    //console.log(result2);
    response.mails=result2;
   
    
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/employee-mail-delete', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success",
                    
                           
                  };
    let qrystring = "DELETE FROM employee_inbox WHERE message_id="+request.body.message_id; 
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/to_employer_inbox', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success"
                           
                  };
    let qrystring = "INSERT INTO employer_inbox (from1, new, subject, body) VALUES ('"+request.body.from1+"', 'yes', '"+request.body.subject+"', '"+request.body.mailbody+"')";
    
    let result2 = await connection.awaitQuery(qrystring);
    //result2=JSON.parse(JSON.stringify(result2));
    
   
    
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/employer-mail-fetch', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success",
                    "mails":[]
                           
                  };
    let qrystring = "SELECT * FROM employer_inbox"; 
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    //console.log(result2);
    response.mails=result2;
   
    
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/employer-mail-delete', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success",
                    
                           
                  };
    let qrystring = "DELETE FROM employer_inbox WHERE message_id="+request.body.message_id; 
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/to_employer_leavebox', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success"
                           
                  };
    let qrystring = "INSERT INTO leave_table (from1, new, subject, body) VALUES ('"+request.body.from1+"', 'yes', '"+request.body.subject+"', '"+request.body.mailbody+"')";
    
    let result2 = await connection.awaitQuery(qrystring);
    //result2=JSON.parse(JSON.stringify(result2));
    
   
    
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/employer-leave-fetch', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success",
                    "mails":[]
                           
                  };
    let qrystring = "SELECT * FROM leave_table"; 
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    //console.log(result2);
    response.mails=result2;
   
    
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/employer-rejects-leave', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success",
                    
                           
                  };
    let qrystring = "DELETE FROM leave_table WHERE message_id="+request.body.message_id; 
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/employer-accepts-leave', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success",
                    
                           
                  };
    
    let qrystring = "SELECT * FROM leave_table WHERE message_id="+request.body.message_id;
    
    result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    
    
    
    let sysmail = "Your leave request From: "+result2[0].from1+" is accepted.";
    
    let toaddress = result2[0].subject.slice(-8).slice(0,-1);
    
    
     qrystring = "INSERT INTO employee_inbox (from1, to1, new, subject, body) VALUES ('Admin', '"+toaddress+"', 'yes', 'Leave request accepted.', '"+sysmail+"')";
    
     result2 = await connection.awaitQuery(qrystring);
    
     qrystring = "DELETE FROM leave_table WHERE message_id="+request.body.message_id; 
     result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/employee-nomination', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success",
                    "message":"Your nomination is received."
                           
                  };
    
    let qrystring = "SELECT * FROM employee_profile WHERE employee_id="+request.body.from1+" AND voted='no'"; 
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    
    if(result2.length!=1)
        {
            response.message="Your nomination is already received. You cannot nominate again.";
            res.json(response);
            connection.awaitEnd();
        }
            else
         {
            qrystring ="UPDATE employee_profile SET votes=votes+1 WHERE employee_id="+request.body.nominates;
            result2 = await connection.awaitQuery(qrystring);
    
            qrystring ="UPDATE employee_profile SET voted='yes' WHERE employee_id="+request.body.from1;
            result2 = await connection.awaitQuery(qrystring);
    
            res.json(response);
            connection.awaitEnd();
         }
    
})();
    
});


app.post('/docs0/employer-clears-nominations', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success",
                                            
                  };
    let qrystring = "UPDATE employee_profile SET voted='no',votes=0"; 
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/employer-declares-result', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success"
                                            
                  };
    let qrystring = "UPDATE emp_of_month SET message='"+request.body.message+"' WHERE id=1"; 
    let result2 = await connection.awaitQuery(qrystring);
    //result2=JSON.parse(JSON.stringify(result2));
    //console.log(request.body.message);
    
    let fname1='./epstorage/best_emp.txt';
       
    fs.writeFileSync(fname1,request.body.picture, function (err) {
    if (err) throw err;               
    }); 
    
    
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/best-employee-read', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success",
                     "message":"",
                     "picture":""
                     
                  };
    
    let qrystring = "SELECT * FROM emp_of_month  WHERE id=1"; 
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    
    response.message=result2[0].message;
    
    let fname1='./epstorage/best_emp.txt';
       
    let sendpic=fs.readFileSync(fname1, 'utf8'); 
    
    response.picture=sendpic;
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/to_employer_application', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success"
                           
                  };
    let qrystring = "INSERT INTO applications (from1, new, subject, body) VALUES ('"+request.body.from1+"', 'yes', '"+request.body.subject+"', '"+request.body.mailbody+"')";
    
    let result2 = await connection.awaitQuery(qrystring);
    //result2=JSON.parse(JSON.stringify(result2));
    
   
    
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/employer-application-fetch', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success",
                    "mails":[]
                           
                  };
    let qrystring = "SELECT * FROM applications"; 
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    //console.log(result2);
    response.mails=result2;
   
    
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/employer-rejects-application', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success",
                    
                           
                  };
    let qrystring = "DELETE FROM applications WHERE message_id="+request.body.message_id; 
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/employer-accepts-application', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success",
                    
                           
                  };
    
    let qrystring = "SELECT * FROM applications WHERE message_id="+request.body.message_id;
    
    result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    
    
    
    let sysmail = "Your application for internal opening ("+result2[0].subject+") is accepted.<br>Please reach out to admin for more details.";
    
    let toaddress = result2[0].from1.slice(-8).slice(0,-1);
    
    
    
    
     qrystring = "INSERT INTO employee_inbox (from1, to1, new, subject, body) VALUES ('Admin', '"+toaddress+"', 'yes', 'Application accepted.', '"+sysmail+"')";
    
     result2 = await connection.awaitQuery(qrystring);
    
     qrystring = "DELETE FROM applications WHERE message_id="+request.body.message_id; 
     result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/update-employee-submit', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success",
                 };
    let qrystring = ""; 
    let result2="";
    
    //let result2 = await connection.awaitQuery(qrystring);
    //result2=JSON.parse(JSON.stringify(result2));
    
    if(request.body.short_name!='')
        {
            qrystring="UPDATE employee_profile SET short_name='"+request.body.short_name+"' WHERE employee_id="+request.body.employee_id;
            result2 = await connection.awaitQuery(qrystring);
        }
    if(request.body.address!='')
        {
            qrystring="UPDATE employee_profile SET address='"+request.body.address+"' WHERE employee_id="+request.body.employee_id;
            result2 = await connection.awaitQuery(qrystring);            
        }
    if(request.body.bank_details!='')
        {
            qrystring="UPDATE employee_profile SET bank_details='"+request.body.bank_details+"' WHERE employee_id="+request.body.employee_id;
            result2 = await connection.awaitQuery(qrystring);
        }
    if(request.body.password!='')
        {
            qrystring="UPDATE employee_profile SET password='"+request.body.password+"' WHERE employee_id="+request.body.employee_id;
            result2 = await connection.awaitQuery(qrystring);
        }
    
    
    
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/notice-submit', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success",
                                             
                  };
    
    let qrystring = "INSERT INTO notices (text1, body1) VALUES ('"+request.body.text1+"', '"+request.body.body1+"')"; 
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/resource-submit', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success",
                                             
                  };
    
    let qrystring = "INSERT INTO resources (text1, body1, link1) VALUES ('"+request.body.text1+"', '"+request.body.body1+"', '"+request.body.link1+"')"; 
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    
    res.json(response);
    connection.awaitEnd();
    
})();
    
});


app.post('/docs0/left-right-update', function (request, res) {
    
(async () => { 
    var connection = mysql.createConnection(db_credentials);
    connection.on('error', (err) => {
    console.error(`Connection error ${err.code}`);
  });
    
    
    let response={
                    "status":"success",
                    "notices":[],
                    "resources":[]       
                  };
    
    let qrystring = "SELECT * FROM notices"; 
    let result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    
    response.notices=result2;
    
    qrystring="SELECT * FROM resources";
    result2 = await connection.awaitQuery(qrystring);
    result2=JSON.parse(JSON.stringify(result2));
    
    response.resources=result2;
    
       
    res.json(response);
    connection.awaitEnd();
    
})();
    
});



app.listen(4000);