var dpbase64 = '';
let api_prefix = "http://localhost/docs0/";

let all_profiles ={
                         
                    "status":"success",
                    "profiles":[],
                    "dp_pics" :[]         
                  };

$(document).ready(function() {
    
    
                                    let payload ={
                                                    "pl":""
                                                 };

                                    let sendnow = JSON.stringify(payload);

                                    $.ajax({
                                    type: "POST",
                                    url: api_prefix+'all-profiles',
                                    dataType: "json",
                                    contentType: "application/json",
                                    data: sendnow,
                                    success: function (res) {
                                             if (res != undefined && res.status=='success') {
                                                 
                                                 all_profiles.profiles=res.profiles;
                                                 all_profiles.dp_pics=res.dp_pics;
                                                 
                                              // another ajax starts on success of earlier ajax
                                                let payload = {
                                                        "message":""                            
                                                      };


                                        let sendnow = JSON.stringify(payload);

                                        $.ajax({
                                        type: "POST",
                                        url: api_prefix+'best-employee-read',
                                        dataType: "json",
                                        contentType: "application/json",
                                        data: sendnow,
                                        success: function (res) {
                                                 if (res != undefined && res.status=='success') {

                                                                                                  if(res.message!=null) 
                                                                                                      {
                                                                                                        $('.mnth-emp-text').html(res.message+'<p></p>'); 
                                                                                                        $(".emp-mnth-pic").attr("src",res.picture);    
                                                                                                      }
                                                     
                                                                                                // another 2 on success of previous ajax starts here
                                                                                                    let payload={
                                                                                                                    "message":""
                                                                                                                };
                                                                                                
                                                                                                    let sendnow = JSON.stringify(payload);
                                                                                                    $.ajax({
                                                                                                                    type: "POST",
                                                                                                                    url: api_prefix+'left-right-update',
                                                                                                                    dataType: "json",
                                                                                                                    contentType: "application/json",
                                                                                                                    data: sendnow,
                                                                                                                    success: function (res) {
                                                                                                                                                    //update notices and resources here
                                                                                                                                                    //console.log(res);
                                                                                                                                                    let tmp_notice = '<div class="panel panel-default notice"><div class="panel-heading notice-head">notice head</div><div class="panel-body notice-body">notice body goes here</div></div>';
                                                                                                                                                    let tmp_resource='<div class="panel panel-default"><div class="panel-heading resource-head">new link title</div><a href="https://w3schools.com" class="resource-link"><div class="panel-body resource-body">new link text</div></a></div>';
                                                                                                                                                    
                                                                                                                                                    for(i=0;i<res.notices.length;i++)
                                                                                                                                                    {
                                                                                                                                                      $('.notice-board-1').prepend(tmp_notice);
                                                                                                                                                      $('.notice-head:first').text(res.notices[i].text1);
                                                                                                                                                      $('.notice-body:first').text(res.notices[i].body1);
                                                                                                                                                    }
                                                                                                                                                    for(i=0;i<res.resources.length;i++)
                                                                                                                                                    {
                                                                                                                                                      $('.resource-links1').prepend(tmp_resource);
                                                                                                                                                      $('.resource-head:first').text(res.resources[i].text1);
                                                                                                                                                      $('.resource-body:first').text(res.resources[i].body1);
                                                                                                                                                      $('.resource-link:first').attr('href', res.resources[i].link1); 
                                                                                                                                                    }
                                                                                                                                                
                                                                                                                        
                                                                                                                        
                                                                                                                                            } 



                                                                                                                          } );
                                                                                                    
                                                     
                                                     
                                                                                                //another 2 on success of previous ajax ends here

                                                                                                } 

                                              } 
                                         });  





                                               //another ajax ends on success of earlier ajax
                                            } 

                                          } 
                                     }); 
    
    
    
     $(document).on({
		ajaxStart: function() { $("body").addClass("loading");    },
		ajaxStop: function() { $("body").removeClass("loading"); }    
    });    
    
    
    $('.default-hide').hide();
    var bodyheight = $(window).height();
    $(".relength-1").height(bodyheight);
    
    //---------------------- on signed in preload check -----------------------------
    
    if(getCookie('employee-pwd')!=null&&getCookie('employee-id')!=null)
        
        {
            $('.sign-in1').html('<a href="javascript:signout()" style="color:white">Sign out</a>');
            $('.user-name1').text("Welcome "+ getCookie('employee-name')+'!');
            
        }
    
    
    //----------------------on signed in preload check ends---------------------------
    
    
    
    
    //-------------------------empty ajax starts---------------------------
    
    $(".empty-ajax-prototype").on('click', function(event){
    event.stopPropagation();
    event.stopImmediatePropagation();
        
    let chall=$("#the-challenge").val().replace(/(?:\r\n|\r|\n)/g, '<br>');    
    let newuserid = $("#new-user-id").val();   
    let newusername = $("#new-user-name").val();
    let newuserpassword=$("#new-user-password").val();
    $("#new-user-id").val('');  
    $("#new-user-name").val('');
    $("#new-user-password").val('');
     
        
            let payload = {
                            "newuserid": newuserid,
                            "newusername":newusername,
                            "newuserpassword": newuserpassword
                          };
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'new-user',
			dataType: "json",
			contentType: "application/json",
			data: sendnow,
			success: function (res) {
                     if (res != undefined && res.status=='success') {
                                             
                          
                    } 
                    
                  } 
             }); 
        
  
    
}); 

//-------------------------empty ajax ends-----------------------------
    
    
//-----------------------------new profile submission starts-----------------------------
    $(".new-employee-submit").on('click', function(event){
    event.stopPropagation();
    event.stopImmediatePropagation();
        
        
    let fullname  = $('#full-name').val();
    let shortname  = $('#short-name').val();
    let role  = $('#employee-role').val();
    let address  = $('#employee-address').val().replace(/(?:\r\n|\r|\n)/g, '<br>').replaceAll("'","''");
    let bankdetails  = $('#bank-details').val().replace(/(?:\r\n|\r|\n)/g, '<br>').replaceAll("'","''");
    let position  = $('#employee-position').val().replaceAll("'","''");
    let password  = $('#employee-pwd').val().replaceAll("'","''");
    let dppicfile =dpbase64;
    
    
     
        
            let payload = {
                            "full_name":fullname,
                             "short_name":shortname,
                             "role":role,
                             "address"  : address,
                             "bank_details": bankdetails,
                             "position":position,
                             "password":password,
                             "dp_file":dppicfile
            
                          };
        
            console.log(payload);
        
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'new-employee-submit',
			dataType: "json",
			contentType: "application/json",
			data: sendnow,
			success: function (res) {
                     if (res != undefined && res.status=='success') {
                      
                         let alrt ='Hi '+res.name+'!'+' Your Employee ID is '+res.idno+'. Your profile is under review.';
                         //console.log(alrt);
                         alert1(alrt); 
                    } 
                    
                  } 
             }); 
        
  
    
}); 
    
//----------------------------new profile submission ends-----------------------
    
    
//------------------------------employee sign in starts--------------------------
   $(".sign-in-proceed").on('click', function(event){
    event.stopPropagation();
    event.stopImmediatePropagation();
        
       
    let empl_id = $("#empl-id").val();   
    let empl_password=$("#empl-password").val();
         
    $("#empl-id").val('');  
    $("#empl-password").val('');
    
     
        
            let payload = {
                            "empl_id": empl_id,
                            "empl_password":empl_password
                          };
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'empl-sign-in',
			dataType: "json",
			contentType: "application/json",
			data: sendnow,
			success: function (res) {
                     if (res != undefined && res.status=='success') {
                                             
                        setCookie('employee-id',empl_id);
                        setCookie('employee-pwd',empl_password);
                        setCookie('employee-name', res.name);
                        location.reload();
                                                                 
                    } 
                    else
                        {
                            $('#myModal2').modal('hide');
                            alert1('Unable to sign in. Please try again.');
                        }
                  } 
             }); 
        
  
    
});  
    
    
    
//------------------------------employee sign in ends----------------------------    
    
    
    //---------------------------payslip download starts------------------------------
    $(".employee-payslip").on('click', function(event){
        
    if(getCookie('employee-id')!=null)  
        {
    event.stopPropagation();
    event.stopImmediatePropagation();
        
    
     
        
            let payload = {
                            "userid":getCookie('employee-id')
                            
                          };
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'ps-download',
			dataType: "json",
			contentType: "application/json",
			data: sendnow,
			success: function (res) {
                     if (res != undefined && res.status=='success') {
                                             
                          var dwnl = '<a href="'+res.filestub+'" download ="file.pdf">(Click here) </a>';
                          $('.employee-payslip-cntr').html(dwnl);
                          //console.log(dwnl);
                          } 
                    
                  } 
             }); 
        }
  else
      alert1("Please sign in to continue");
    
}); 
    
    
    
    //-------------------------payslip download ends---------------------------------
    
    
        
});

function setCookie(key, value, expiry) {
        var expires = new Date();
        expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
        document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
    }

    function getCookie(key) {
        var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        return keyValue ? keyValue[2] : null;
    }

    function eraseCookie(key) {
        var keyValue = getCookie(key);
        setCookie(key, keyValue, '-1');
    }


function signupform()
{
    $('.center-home-employee').hide();
    $('.sign-up-remove-now').remove();
    $('.current-location').append('<span class ="sign-up-remove-now">&nbsp;>&nbsp;Sign up</span>');
    $('.sign-up-form').show();
}


function getdp()
{
    var picfile = document.querySelector('#dp-pic').files[0];
    var reader = new FileReader();
    reader.readAsDataURL(picfile);
    reader.onload = function () {
    dpbase64 = reader.result;
    $(".dp-place-here").attr("src",dpbase64);    
   };
}



function signout() {
    
    eraseCookie('employee-pwd');
    eraseCookie('employee-name');
    eraseCookie('employee-id');
    location.reload();
}




function alert1(alrt)
{
    $('.modal-body-99').html('<br><br>'+alrt+'<br><br><br>');
    $('#myModal99').modal('show');
}


function employeeinbox()
{
    //alert1("I am here");
    if(getCookie('employee-id')!=null)
        {
            $('.center-home-employee').hide();
            $('.current-location').append('<span>&nbsp;>&nbsp;Inbox</span>');
            let mailfill='<div class="inbox-placeholder"><div class="panel panel-default subject-fill"><div style ="font-size:20px;background-color:beige" class="subject-fill1">&nbsp;Subject</div><div class="panel-body mailbody-fill" style="background-color: floralwhite">Body goes here</div></div></div>';
            $('.temp-place-holder').show();
            //$('.temp-place-holder').html(mailfill);
            
                    // fetching the mail contents start here
            
                    
        
                    let payload = {
                                    "employeeid": getCookie('employee-id')
                                    
                                  };
            
                    let sendnow = JSON.stringify(payload);

                    $.ajax({
                    type: "POST",
                    url: api_prefix+'employee-mail-fetch',
                    dataType: "json",
                    contentType: "application/json",
                    data: sendnow,
                    success: function (res) {
                             if (res != undefined && res.status=='success') {
                                 
                                 //populating mail placeholder starts....
                                 
                                 for(i=0;i<res.mails.length;i++)
                                     {
                                         $('.temp-place-holder').append(mailfill);
                                         let lnkclass ='messageid'+ res.mails[i].message_id;
                                         $('.inbox-placeholder:last').addClass(lnkclass);
                                         $('.subject-fill1:last').html('<div style="font-size:14px">&nbsp;'+res.mails[i].subject+'</div>');
                                         let tmpbody = 'From: ';
                                         tmpbody+=res.mails[i].from1;
                                         tmpbody+='<br><br>';
                                         tmpbody+=res.mails[i].body;
                                         tmpbody+='<p style="text-align:right"><strong><a href="javascript:delete_employee_mail('+res.mails[i].message_id+')" style="color:darkblue">Hide</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:accept_profile(2023010)" style="color:floralwhite"></a></strong></p>';
                                         $('.mailbody-fill:last').html(tmpbody);
                                     }
                                 
                                 
                                //populating mail placeholder ends...

                            } 

                          } 
                     }); 

            
            
                    // fetching the mail contents end here
            
        }
    else
        alert1("Please sign in to continue.");
}

function delete_employee_mail(id)
{
    let payload = {
                            "message_id":id                            
                          };
    
    
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'employee-mail-delete',
			dataType: "json",
			contentType: "application/json",
			data: sendnow,
			success: function (res) {
                     if (res != undefined && res.status=='success') {
                                             
                          
                    } 
                    
                  } 
             }); 
    
    
    let hdclas = 'messageid'+id;
    $('.'+hdclas).hide();
    //alert1('I am working on '+ id);
}


function employeerequestsend()
{
                    
                    if(getCookie('employee-id')!=null)
                        {
                            
                            $('.center-home-employee').hide();
                            $('.current-location').append('<span>&nbsp;>&nbsp;Send a Request</span>');
                            $('.temp-place-holder').show();
                            
                            var template = '<div class="panel panel-default employer-writes"><div style ="font-size:20px;background-color:beige"><img  style="width:75px;height=75px;border: 1px solid #555" src="./images/request.png"><span class="update-shortname"> Send a Request to your Employer</span></div><div class="panel-body" style="background-color: floralwhite"><form class="form-inline"><div class="form-group"><label for="emp-id-psup">From:&nbsp;</label><input class="form-control id-popu" id="emp-id-psup" value="'+getCookie('employee-name')+' ('+getCookie('employee-id')+')'+'" disabled>&nbsp;&nbsp;&nbsp;<button type="button" onclick="emplrequestsender()" style="background-color:green;color:white" class="btn empr-email-sender">Send now</button></div></form><br><form><div class="form-group"><label for="empr-writes-sub">Subject:</label><input class="form-control" id="empr-writes-sub"></div><div class="form-group"><label for="empr-writes-body">Body:</label><textarea class="form-control" rows="5" id="empr-writes-body"></textarea></div></form></div></div>';         
                    
                                                 $('.temp-place-holder').empty();
                                                 $('.temp-place-holder').show();
                                                 $('.temp-place-holder').append(template);
                                                 
                                                 
                            
                        }
    else 
        alert1("Please sign in to continue.");
}

function emplrequestsender()
{
    let fromaddress = $('#emp-id-psup').val();
    let subject = $('#empr-writes-sub').val();
    let mailbody=$('#empr-writes-body').val();
    
     
        
            let payload ={ 
                            "from1":fromaddress,
                            "subject":'('+new Date().toLocaleString()+') '+subject.replace(/["']/g, ""),
                            "mailbody":mailbody.replace(/["']/g, "").replace(/(?:\r\n|\r|\n)/g, '<br>')
                
                         };
        
            console.log(payload);
        
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'to_employer_inbox',
			dataType: "json",
			contentType: "application/json",
			data: sendnow,
			success: function (res) {
                                            alert1("Your message is sent.");
                                    } 
                
                
                    
                  } );
    //alert1("working on it");
}


function leavemodalshow()
{
    
    if(getCookie('employee-id')!=null)
        {
            $('#leave_modal').modal('show');
        }
    else
        alert1("Please sign in to continue.")
}


function leaverequestsubmit()
{
    let fromdate=$('#from_date').val();
    let todate=$('#to_date').val();
    let reason=$('#leave_reason').val().replace(/["']/g, "");
    
    let fromaddress =fromdate + ' '+'To: '+todate ;
    let subject = getCookie('employee-name')+' ('+ getCookie('employee-id')+')';
    let mailbody=reason;
    
     
        
            let payload ={ 
                            "from1":fromaddress,
                            "subject":subject,
                            "mailbody":mailbody.replace(/["']/g, "").replace(/(?:\r\n|\r|\n)/g, '<br>')
                
                         };
        
            console.log(payload);
        
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'to_employer_leavebox',
			dataType: "json",
			contentType: "application/json",
			data: sendnow,
			success: function (res) {
                                            alert1("Your leave is requested.");
                                    } 
                
                
                    
                  } );
    
    
    
    $('#leave_modal').modal('hide');
}

function nominator()
{
    if(getCookie('employee-id')!=null)
        {
                            var template = '<div class="panel panel-default employee-nominates"><div style ="font-size:20px;background-color:beige"><img  style="width:75px;height=75px;border: 1px solid #555" src="./images/emp-mnth.jpg"><span class="upkdsgdk"> Nominate an Employee</span></div><div class="panel-body" style="background-color: floralwhite"></div></div>';
                            
                            $('.center-home-employee').hide();
                            $('.current-location').append('<span>&nbsp;>&nbsp;Nominate an Employee</span>');
                            $('.temp-place-holder').show();
                            $('.temp-place-holder').append(template);
            
                            var p1='<div class="container" style="width:100%"><div class="row"><div class="col-md-2"></div><div class="col-md-5" style="text-align:left"><strong>Employee ID</strong></div><div class="col-md-4" style="text-align: left"><strong>Employee name</strong></div></div></div>';
                                                
                                                    $(".employee-nominates>.panel-body").append(p1);
                    
                                                    for(i=0;i<all_profiles.profiles.length;i++)
                                                        
                                                    {
                                                        var appnd = '<div class="container" style="width:100%"><div class="col-md-2"></div><div class="row"><div class="col-md-5" style="text-align:left"><a href="javascript:employeenominates('+all_profiles.profiles[i].employee_id+')">'+all_profiles.profiles[i].employee_id+'</a></div><div class="col-md-4" style="text-align: left">'+all_profiles.profiles[i].full_name+'</div></div></div>';
                                                        $(".employee-nominates>.panel-body").append(appnd);
                                                    }
            
            
        }
    else 
        alert1("Please sign in to continue.");
}


function employeenominates(id)
{
   let payload =            { 
                            "from1": getCookie('employee-id'),
                            "nominates":id
                                            
                            };
        
            
        
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'employee-nomination',
			dataType: "json",
			contentType: "application/json",
			data: sendnow,
			success: function (res) {
                                            alert1(res.message);
                                    } 
                
                
                    
                  } );  
}


function employee_referral()
{
    if(getCookie('employee-id')!=null)
                        {
                            
                            $('.center-home-employee').hide();
                            $('.current-location').append('<span>&nbsp;>&nbsp;Make a Referral</span>');
                            $('.temp-place-holder').show();
                            
                            var template = '<div class="panel panel-default employer-writes"><div style ="font-size:20px;background-color:beige"><img  style="width:75px;height=75px;border: 1px solid #555" src="./images/request.png"><span class="update-shortname"> Make a referral</span></div><div class="panel-body" style="background-color: floralwhite"><form class="form-inline"><div class="form-group"><label for="emp-id-psup">From:&nbsp;</label><input class="form-control id-popu" id="emp-id-psup" value="'+getCookie('employee-name')+' ('+getCookie('employee-id')+')'+'" disabled>&nbsp;&nbsp;&nbsp;<button type="button" onclick="emplrequestsender()" style="background-color:green;color:white" class="btn empr-email-sender">Send now</button></div></form><br><form><div class="form-group"><label for="empr-writes-sub">Subject:</label><input class="form-control" id="empr-writes-sub" value="[REFERRAL]" disabled></div><div class="form-group"><label for="empr-writes-body">Body:</label><textarea class="form-control" rows="5" id="empr-writes-body"></textarea></div></form></div></div>';         
                    
                                                 $('.temp-place-holder').empty();
                                                 $('.temp-place-holder').show();
                                                 $('.temp-place-holder').append(template);
                                                 
                                                 
                            
                        }
    else 
        alert1("Please sign in to continue.");
    
}


function employee_apply()
{
    if(getCookie('employee-id')!=null)
                        {
                            
                            $('.center-home-employee').hide();
                            $('.current-location').append('<span>&nbsp;>&nbsp;Apply for Internal Opening</span>');
                            $('.temp-place-holder').show();
                            
                            var template = '<div class="panel panel-default employer-writes"><div style ="font-size:20px;background-color:beige"><img  style="width:75px;height=75px;border: 1px solid #555" src="./images/request.png"><span class="update-shortname"> Apply for internal opening</span></div><div class="panel-body" style="background-color: floralwhite"><form class="form-inline"><div class="form-group"><label for="emp-id-psup">From:&nbsp;</label><input class="form-control id-popu" id="emp-id-psup" value="'+getCookie('employee-name')+' ('+getCookie('employee-id')+')'+'" disabled>&nbsp;&nbsp;&nbsp;<button type="button" onclick="opening_application()" style="background-color:green;color:white" class="btn empr-email-sender">Send now</button></div></form><br><form><div class="form-group"><label for="empr-writes-sub">Position:</label><input class="form-control" id="empr-writes-sub"></div><div class="form-group"><label for="empr-writes-body">Expression of interest:</label><textarea class="form-control" rows="5" id="empr-writes-body"></textarea></div></form></div></div>';         
                    
                                                 $('.temp-place-holder').empty();
                                                 $('.temp-place-holder').show();
                                                 $('.temp-place-holder').append(template);
                                                 
                                                 
                            
                        }
    else 
        alert1("Please sign in to continue.");
}

function opening_application()
{
    let fromaddress = $('#emp-id-psup').val();
    let subject = $('#empr-writes-sub').val();
    let mailbody=$('#empr-writes-body').val();
    
     
        
            let payload ={ 
                            "from1":fromaddress,
                            "subject":subject.replace(/["']/g, ""),
                            "mailbody":mailbody.replace(/["']/g, "").replace(/(?:\r\n|\r|\n)/g, '<br>')
                
                         };
        
           // console.log(payload);
        
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'to_employer_application',
			dataType: "json",
			contentType: "application/json",
			data: sendnow,
			success: function (res) {
                                            alert1("Your application is sent.");
                                    } 
                
                
                    
                  } );
    
}

function search_employee()
{
    if(getCookie('employee-id')!=null)
        {
                            var template = '<div class="panel panel-default employee-nominates"><div style ="font-size:20px;background-color:beige"><img  style="width:75px;height=75px;border: 1px solid #555" src="./images/search-emp.jpg"><span class="upkdsgdk"> Search for an employee</span></div><div class="panel-body" style="background-color: floralwhite"></div></div>';
                            
                            $('.center-home-employee').hide();
                            $('.current-location').append('<span>&nbsp;>&nbsp;Search for an Employee</span>');
                            $('.temp-place-holder').show();
                            $('.temp-place-holder').append(template);
            
                            var p1='<div class="container" style="width:100%"><div class="row"><div class="col-md-2"></div><div class="col-md-5" style="text-align:left"><strong>Employee ID</strong></div><div class="col-md-4" style="text-align: left"><strong>Employee name</strong></div></div></div>';
                                                
                                                    $(".employee-nominates>.panel-body").append(p1);
                    
                                                    for(i=0;i<all_profiles.profiles.length;i++)
                                                        
                                                    {
                                                        var appnd = '<div class="container" style="width:100%"><div class="col-md-2"></div><div class="row"><div class="col-md-5" style="text-align:left"><a href="javascript:show_employee('+i+')">'+all_profiles.profiles[i].employee_id+'</a></div><div class="col-md-4" style="text-align: left">'+all_profiles.profiles[i].full_name+'</div></div></div>';
                                                        $(".employee-nominates>.panel-body").append(appnd);
                                                    }
            
            
        }
    else 
        alert1("Please sign in to continue.");
}

function show_employee(index1)
{
    $('.emp_profile_fullname').text(all_profiles.profiles[index1].full_name);
    $('.emp_profile_shortname').text(all_profiles.profiles[index1].short_name);
    $('.emp_profile_type').text(all_profiles.profiles[index1].role);
    $('.emp_profile_position').text(all_profiles.profiles[index1].position);
    $('.emp_profile_dp').attr("src",all_profiles.dp_pics[index1]);
    
    $('#profile_show_modal').modal('show');
}

function update_profile()
{
    if(getCookie('employee-id')!=null)
        {
            $('#update_profile_modal').modal('show');
        }
    else
        alert1('Please sign in to continue.');
}


function upca()
{
    if($('#aaaa').is(':checked'))
        {
        $( "#update_shortname" ).prop( "disabled", false );
        $('#update_shortname').val('');
        }
    else
        {
            $('#update_shortname').val('');
         $( "#update_shortname" ).prop( "disabled",true );
        }
        
}

function upcb()
{
    if($('#bbbb').is(':checked'))
        {
        $( "#update_password" ).prop( "disabled", false );
        $('#update_password').val('');
        }
    else
        {
            $('#update_password').val('');
         $( "#update_password" ).prop( "disabled",true );
        }
}

function upcc()
{
    if($('#cccc').is(':checked'))
        {
        $( "#update_bankdetails" ).prop( "disabled", false );
        $('#update_bankdetails').val('');
        }
    else
        {
            $('#update_bankdetails').val('');
         $( "#update_bankdetails" ).prop( "disabled",true );
        }
}

function upcd()
{
    if($('#dddd').is(':checked'))
        {
        $( "#update_address" ).prop( "disabled", false );
        $('#update_address').val('');
        }
    else
        {
            $('#update_address').val('');
         $( "#update_address" ).prop( "disabled",true );
        }
}

function update_profile_submit()
{
    
    let shortname  = $('#update_shortname').val();
    let address  = $('#update_address').val().replace(/(?:\r\n|\r|\n)/g, '<br>').replaceAll("'","''");
    let bankdetails  = $('#update_bankdetails').val().replace(/(?:\r\n|\r|\n)/g, '<br>').replaceAll("'","''");
    let password  = $('#update_password').val().replaceAll("'","''");
    
    
    $('#update_profile_modal').modal('hide');
     
        
            let payload = {
                            
                             "employee_id":getCookie('employee-id'),
                             "short_name":shortname,
                             "address"  : address,
                             "bank_details": bankdetails,
                             "password":password
                             
            
                          };
        
            //console.log(payload);
        
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'update-employee-submit',
			dataType: "json",
			contentType: "application/json",
			data: sendnow,
			success: function (res) {
                     if (res != undefined && res.status=='success') {
                      
                         alert1("Your profile is updated.");
                    } 
                    
                  } 
             }); 
}
