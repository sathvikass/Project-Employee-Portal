
var dpbase64 = '';
let api_prefix = "http://localhost/docs0/";

let all_profiles ={
                         
                    "status":"success",
                    "profiles":[],
                    "dp_pics" :[]         
                  };
                    


$(document).ready(function() {
    
    
    
    
    
    $(document).on({
		ajaxStart: function() { $("body").addClass("loading");    },
		ajaxStop: function() { $("body").removeClass("loading"); }    
    });    
    
    
    $('.default-hide').hide();
    var bodyheight = $(window).height();
    $(".relength-1").height(bodyheight);
    
    
    if(getCookie('admin-id')!=null && getCookie('admin-pwd')!=null)
    {
        
        $('.sign-in-admin').html('<a href="javascript:signout()" style="color:white">Sign out</a>')
        
        //------------ajax fetching notification number starts------------------
        let payload = {
                            "admin_id": getCookie('admin-id'),
                            "password": getCookie('admin-pwd')
                      };
        
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'admin-cntr',
			dataType: "json",
			contentType: "application/json",
			data: sendnow,
			success: function (res) {
                     if (res != undefined && res.status=='success') {
                                             
                          //if(res.inbox>0)
                          //$('.employer-inbox-cntr').html('<strong>(New)</strong> ');      
                          //if(res.new_employees>0) 
                          //$('.employer-accept-cntr').html('<strong>(New)</strong> ');    
                          //if(res.leaves>0)
                          //$('.employer-leave-cntr').html('<strong>(New)</strong> ');
                         
                                    //--------------------fetching all profiles start---------------
                         
                                        let payload = {
                                                    "dummy":"dummy"
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
                                              // console.log(all_profiles.profiles);
                                               //console.log(all_profiles.dp_pics);
                                                 
                                                 
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
                         
                                    
                                    //--------------------fetching all profiles end-----------------
                         
                    } 
                    
                  } 
             }); 
        
        //------------ajax fetching notification nmber ends---------------------
        
    }
    
    //------------------------inbox starts------------------------------------
            $(".employer-inbox1").on('click', function(event){
            event.stopPropagation();
            event.stopImmediatePropagation();
            if(getCookie('admin-id')!=null && getCookie('admin-pwd')!=null)
            {
                
            }
            else
            alert1('Please sign in to continue.');
    
            }); 
    
            $(".employer-inbox").on('click', function(event){
            event.stopPropagation();
            event.stopImmediatePropagation();
            if(getCookie('admin-id')!=null && getCookie('admin-pwd')!=null)
            {
                $('.center-home-admin').hide();
                $('.current-location').append('<span>&nbsp;>&nbsp;Inbox</span>');
                let mailfill='<div class="inbox-placeholder"><div class="panel panel-default subject-fill"><div style ="font-size:20px;background-color:beige" class="subject-fill1">&nbsp;Subject</div><div class="panel-body mailbody-fill" style="background-color: floralwhite">Body goes here</div></div></div>';
                $('.temp-place-holder').show(); 
                
                
                //inbox content population starts here...
                
                    let payload = {
                                    "employerid":"admin"
                                    
                                  };
            
                    let sendnow = JSON.stringify(payload);

                    $.ajax({
                    type: "POST",
                    url: api_prefix+'employer-mail-fetch',
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
                                         tmpbody+='<p style="text-align:right"><strong><a href="javascript:delete_employer_mail('+res.mails[i].message_id+')" style="color:darkblue">Hide</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:accept_profile(2023010)" style="color:floralwhite"></a></strong></p>';
                                         $('.mailbody-fill:last').html(tmpbody);
                                     }
                                 
                                 
                                //populating mail placeholder ends...

                            } 

                          } 
                     }); 
                
                
                
                //inbox content population ends here...
                
               
            }
            else
            alert1('Please sign in to continue.');
    
            }); 
    

    
    
    //-----------------------inbox ends-----------------------------------------
    
    //--------------------new profiles starts---------------------------------------
                $(".employer-accept").on('click', function(event){
                event.stopPropagation();
                event.stopImmediatePropagation();
                if(getCookie('admin-id')!=null && getCookie('admin-pwd')!=null)
                {
                    $('.center-home-admin').hide();
                    $('.current-location').append('<span>&nbsp;>&nbsp;New profiles</span>');
                    $('.temp-place-holder').show();
                    
                     //-----------------------getting new profiles start---------------------
                
                                    let payload = {
                                                    "dummy":"dummy"
                                                };

                                    let sendnow = JSON.stringify(payload);

                                    $.ajax({
                                    type: "POST",
                                    url: api_prefix+'new-profiles',
                                    dataType: "json",
                                    contentType: "application/json",
                                    data: sendnow,
                                    success: function (res) {
                                             if (res != undefined && res.status=='success') {
                                                 
                                                 //----------------------------------framing the contenet starts----------
                                                 
                                                 let template = '<div class="panel panel-default new-profiles-template"><div style ="font-size:20px;background-color:beige"><img class ="update-image" style="width:75px;height:75px;border: 1px solid #555" src="./images/dp-place-holder.jpg"><span class="update-shortname">&nbsp;short_name</span></div><div class="panel-body" style="background-color: floralwhite"><strong>Name:</strong><p class="update-name">name</p><strong>Regular/Contract:</strong><p class="update-status">status</p><strong>Position:</strong><p class="update-position">status</p><strong>Bank details:</strong><p class="update-bank">status</p> <strong>Residential address:</strong><p class="update-address">address</p></div></div>';
                                                 $('.temp-place-holder').empty();
                                                 $('.temp-place-holder').show();
                                                 
                                                 let operat1 = '<p style="text-align:right"><strong><a href="javascript:reject_profile(';
                                                 let operat2=')" style="color:red">Reject</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="javascript:accept_profile(';
                                                 let operat3=')" style="color:green">Accept</a></strong></p>';
                                                 
                                                 for(let i=0;i<res.profiles.length;i++)
                                                {     
                                                 $('.temp-place-holder').append(template);
                                                 let ctrl_id=res.profiles[i].employee_id;
                                                 let ctrl_class = 'cl-'+ctrl_id;
                                                 let operat = operat1+ctrl_id+operat2+ctrl_id+operat3;
                                                 $('.temp-place-holder>.new-profiles-template:last-child').addClass(ctrl_class);
                                                 $('.'+ctrl_class+'>div>.update-image').attr('src', res.dp_pics[i]);
                                                $('.'+ctrl_class+'>div>.update-shortname').html('&nbsp;'+res.profiles[i].short_name);
                                                 $('.'+ctrl_class+'>.panel-body>.update-name').text(res.profiles[i].full_name);
                                                 $('.'+ctrl_class+'>.panel-body>.update-status').text(res.profiles[i].role);
                                                 $('.'+ctrl_class+'>.panel-body>.update-position').text(res.profiles[i].position);  
                                                 $('.'+ctrl_class+'>.panel-body>.update-bank').html(res.profiles[i].bank_details);
                                                 $('.'+ctrl_class+'>.panel-body>.update-address').html(res.profiles[i].address);
                                                 $('.'+ctrl_class+'>.panel-body>.update-address').append(operat);
                                                }
                                                 
                                                //-----------------------------------framing the content ends-------------
                                                  
                                            } 

                                          } 
                                     }); 
                
                
                //------------------------getting new profiles end-----------------------  
                
                    
                    
                    
                    
                    
                    
                }
                else
                alert1('Please sign in to continue.');

                }); 
    
    
    //--------------------new profiles ends----------------------------------------
    
    
    
    //-----------------manage profile starts-----------------------------------------------------
                    
             $(".employer-manage").on('click', function(event){
                event.stopPropagation();
                event.stopImmediatePropagation();
                if(getCookie('admin-id')!=null && getCookie('admin-pwd')!=null)
                {
                    $('.center-home-admin').hide();
                    $('.current-location').append('<span>&nbsp;>&nbsp;Manage profiles</span>');
                    $('.temp-place-holder').show();
                    
                     //-----------------------getting new profiles start---------------------
                
                                    
                                                 
                                                 //----------------------------------framing the contenet starts----------
                                                 
                                                 let template = '<div class="panel panel-default manage-profiles-template"><div style ="font-size:20px;background-color:beige"><img class ="update-image" style="width:75px;height:75px;border: 1px solid #555" src="./images/dp-place-holder.jpg"><span class="update-shortname">&nbsp;short_name</span></div><div class="panel-body" style="background-color: floralwhite"><strong>Name:</strong><p class="update-name">name</p><strong>Regular/Contract:</strong><p class="update-status">status</p><strong>Position:</strong><p class="update-position">status</p><strong>Bank details:</strong><p class="update-bank">status</p> <strong>Residential address:</strong><p class="update-address">address</p></div></div>';
                                                 $('.temp-place-holder').empty();
                                                 $('.temp-place-holder').show();
                                                 
                                                 let operat1 = '<p style="text-align:right"><strong><a href="javascript:delete_profile(';
                                                 let operat2=')" style="color:red">Delete</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:accept_profile(';
                                                 let operat3=')" style="color:floralwhite"></a></strong></p>';
                                                 
                                                 for(let i=0;i<all_profiles.profiles.length;i++)
                                                {     
                                                 $('.temp-place-holder').append(template);
                                                 let ctrl_id=all_profiles.profiles[i].employee_id;
                                                 let ctrl_class = 'cd-'+ctrl_id;
                                                 let operat = operat1+ctrl_id+operat2+ctrl_id+operat3;
                                                 $('.temp-place-holder>.manage-profiles-template:last-child').addClass(ctrl_class);
                                                 $('.'+ctrl_class+'>div>.update-image').attr('src', all_profiles.dp_pics[i]);
                                                $('.'+ctrl_class+'>div>.update-shortname').html('&nbsp;'+all_profiles.profiles[i].short_name);
                                                 $('.'+ctrl_class+'>.panel-body>.update-name').text(all_profiles.profiles[i].full_name);
                                                 $('.'+ctrl_class+'>.panel-body>.update-status').text(all_profiles.profiles[i].role);
                                                 $('.'+ctrl_class+'>.panel-body>.update-position').text(all_profiles.profiles[i].position);  
                                                 $('.'+ctrl_class+'>.panel-body>.update-bank').html(all_profiles.profiles[i].bank_details);
                                                 $('.'+ctrl_class+'>.panel-body>.update-address').html(all_profiles.profiles[i].address);
                                                 $('.'+ctrl_class+'>.panel-body>.update-address').append(operat);
                                                }
                                                 
                                                //-----------------------------------framing the content ends-------------
                                                  
                                            

                                          
                                     }
                
                                        else
                alert1('Please sign in to continue.');
                //------------------------getting new profiles end-----------------------  
                
                    
                    
                    
                    
                    
                    
                });
                

                
    
    
    
    
    
        //-----------------------------------------manage profile ends----------------------------------------
    
    // sign in starts----------------------------------------------------------------
     $(".sign-in-proceed").on('click', function(event){
    event.stopPropagation();
    event.stopImmediatePropagation();
        
       
    let admin_id = $("#admin-id").val();   
    let admin_password=$("#admin-password").val();
         
    $("#admin-id").val('');  
    $("#admin-password").val('');
    
     
        
            let payload = {
                            "admin_id": admin_id,
                            "password":admin_password
                          };
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'admin-sign-in',
			dataType: "json",
			contentType: "application/json",
			data: sendnow,
			success: function (res) {
                     if (res != undefined && res.status=='success') {
                                             
                        setCookie('admin-id',admin_id);
                        setCookie('admin-pwd',admin_password);
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
        
    //sign in ends--------------------------------------------------------------------
    
    
    //-------------------------payslip upload starts---------------------------------------
    
        $(".employer-payslip").on('click', function(event){
                event.stopPropagation();
                event.stopImmediatePropagation();
                if(getCookie('admin-id')!=null && getCookie('admin-pwd')!=null)
                {
                    $('.center-home-admin').hide();
                    $('.current-location').append('<span>&nbsp;>&nbsp;Upload payslips</span>');
                    $('.temp-place-holder').show();
                    
                     
                
                                    
                                                 
                                                 //----------------------------------framing the content starts----------
                                                 
                                                 var template = '<div class="panel panel-default upload-payslips-template"><div style ="font-size:20px;background-color:beige"><img style="width:75px;border: 1px solid #555" src="./images/Payslip.png"> &nbsp;Upload payslips here</div><div class="panel-body payslip-upload-form" style="background-color: floralwhite;text-align:center"><div class="ps-form" ><form class="form-inline"><div class="form-group"><label for="emp-id-psup">Employee ID:&nbsp; </label><input  class="form-control id-popu" id="emp-id-psup"></div></form><div class="form-group row dp-pic-input12"><div class="col-sm-3"></div><div class="col-sm-6"><label for="file-psup"><br>Payslip file:</label><input class="form-control" type="file" id ="file-psup" accept=".pdf" onchange="fileidup()"></div></div><div></div></div>';         
                    
                                                 $('.temp-place-holder').empty();
                                                 $('.temp-place-holder').show();
                                                 $('.temp-place-holder').append(template);
                                                 
                                                 var p1='<div class="container" style="width:100%"><div class="row"><div class="col-md-2"></div><div class="col-md-5" style="text-align:left"><strong>Employee ID</strong></div><div class="col-md-4" style="text-align: left"><strong>Employee name</strong></div></div></div>';
                                                
                                                    $(".ps-form").append(p1);
                    
                                                    for(i=0;i<all_profiles.profiles.length;i++)
                                                        
                                                    {
                                                        var appnd = '<div class="container" style="width:100%"><div class="col-md-2"></div><div class="row"><div class="col-md-5" style="text-align:left"><a href="javascript:idpopul('+all_profiles.profiles[i].employee_id+')">'+all_profiles.profiles[i].employee_id+'</a></div><div class="col-md-4" style="text-align: left">'+all_profiles.profiles[i].full_name+'</div></div></div>';
                                                        $(".ps-form").append(appnd);
                                                    }
                                                  
                                                 //---------------------------------framing the content ends---------------

                                          
                                     }
                
                                        else
                                            alert1('Please sign in to continue.');
                
                    
                });
    
    
    
    //------------------------payslip upload ends-------------------------------------------
    
    
    // ---------------------employer write to employees start---------------------------------
        $(".employer-write").on('click', function(event){
                event.stopPropagation();
                event.stopImmediatePropagation();
                if(getCookie('admin-id')!=null && getCookie('admin-pwd')!=null)
                {
                    $('.center-home-admin').hide();
                    $('.current-location').append('<span>&nbsp;>&nbsp;Write to your employee</span>');
                    $('.temp-place-holder').show();
                    
                     
                
                                    
                                                 
                                                 //----------------------------------framing the content starts----------
                                                 
                                                 var template = '<div class="panel panel-default employer-writes"><div style ="font-size:20px;background-color:beige"><img  style="width:75px;height=75px;border: 1px solid #555" src="./images/request.png"><span class="update-shortname"> Write to your employee</span></div><div class="panel-body" style="background-color: floralwhite"><form class="form-inline"><div class="form-group"><label for="emp-id-psup">Employee ID:&nbsp;</label><input class="form-control id-popu" id="emp-id-psup">&nbsp;&nbsp;&nbsp;<button type="button" onclick="empremailsender()" style="background-color:green;color:white" class="btn empr-email-sender">Send now</button></div></form><br><form><div class="form-group"><label for="empr-writes-sub">Subject:</label><input class="form-control" id="empr-writes-sub"></div><div class="form-group"><label for="empr-writes-body">Body:</label><textarea class="form-control" rows="5" id="empr-writes-body"></textarea></div></form></div></div>';         
                    
                                                 $('.temp-place-holder').empty();
                                                 $('.temp-place-holder').show();
                                                 $('.temp-place-holder').append(template);
                                                 
                                                 var p1='<div class="container" style="width:100%"><div class="row"><div class="col-md-2"></div><div class="col-md-5" style="text-align:left"><strong>Employee ID</strong></div><div class="col-md-4" style="text-align: left"><strong>Employee name</strong></div></div></div>';
                                                
                                                    $(".employer-writes>.panel-body").append(p1);
                    
                                                    for(i=0;i<all_profiles.profiles.length;i++)
                                                        
                                                    {
                                                        var appnd = '<div class="container" style="width:100%"><div class="col-md-2"></div><div class="row"><div class="col-md-5" style="text-align:left"><a href="javascript:idpopul('+all_profiles.profiles[i].employee_id+')">'+all_profiles.profiles[i].employee_id+'</a></div><div class="col-md-4" style="text-align: left">'+all_profiles.profiles[i].full_name+'</div></div></div>';
                                                        $(".employer-writes>.panel-body").append(appnd);
                                                    }
                                                  
                                                 //---------------------------------framing the content ends---------------

                                          
                                     }
                
                                        else
                                            alert1('Please sign in to continue.');
                
                    
                });
    
    
    
    //------------------------employer write to employees end-----------------------------------
    
    
    
    
    
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


function signout() {
    
    eraseCookie('admin-pwd');
    eraseCookie ('admin-id');
    location.reload();
}


function accept_profile(params)
{
    if(getCookie('admin-id')!=null && getCookie('admin-pwd')!=null)
        {
            
            //-----------------------
            
                                    let payload = {
                                                    "key": params
                                                  }

                                    let sendnow = JSON.stringify(payload);

                                    $.ajax({
                                    type: "POST",
                                    url: api_prefix+'acc-profiles',
                                    dataType: "json",
                                    contentType: "application/json",
                                    data: sendnow,
                                    success: function (res) {
                                             if (res != undefined && res.status=='success') {
                                                 alert1("Accepting "+params);
                                                 $('.cl-'+params).remove();
                                             }}
                                             });
            //-----------------------
            
            
        }
   else
       alert1("Please sign in to continue");
}



function reject_profile(params)
{
    if(getCookie('admin-id')!=null && getCookie('admin-pwd')!=null)
        {
            
            //-----------------------
            
                                    let payload = {
                                                    "key": params
                                                  }

                                    let sendnow = JSON.stringify(payload);

                                    $.ajax({
                                    type: "POST",
                                    url: api_prefix+'rej-profiles',
                                    dataType: "json",
                                    contentType: "application/json",
                                    data: sendnow,
                                    success: function (res) {
                                             if (res != undefined && res.status=='success') {
                                                 alert1("Rejecting "+params);
                                                 $('.cl-'+params).remove();
                                             }}
                                             });
            //-----------------------
            
            
        }
   else
       alert1("Please sign in to continue");
}




function delete_profile(params)
{
    if(getCookie('admin-id')!=null && getCookie('admin-pwd')!=null)
        {
            
            //-----------------------
            
                                    let payload = {
                                                    "key": params
                                                  }

                                    let sendnow = JSON.stringify(payload);

                                    $.ajax({
                                    type: "POST",
                                    url: api_prefix+'rej-profiles',
                                    dataType: "json",
                                    contentType: "application/json",
                                    data: sendnow,
                                    success: function (res) {
                                             if (res != undefined && res.status=='success') {
                                                 alert1("Deleting "+params);
                                                 $('.cd-'+params).remove();
                                             }}
                                             });
            //-----------------------
            
            
        }
   else
       alert1("Please sign in to continue");
}


function alert1(alrt)


{
    $('.modal-body-99').html('<br><br>'+alrt+'<br><br><br>');
    $('#myModal99').modal('show');
}


function fileidup()
{
if(getCookie('admin-id')!=null && getCookie('admin-pwd')!=null)

{
    var ps_flile_frag = document.querySelector('#file-psup').files[0];
    var reader = new FileReader();
    reader.readAsDataURL(ps_flile_frag);
    reader.onload = function () {
    //dpbase64 = reader.result;
                                //-------------------------------------
                                   
                                                        let emp_id = $("#emp-id-psup").val();
                                                        
                                                        


                                                                let payload = {
                                                                                "emp_id": emp_id,
                                                                                "file_frag":reader.result
                                                                                
                                                                              };
                                                                let sendnow = JSON.stringify(payload);

                                                                $.ajax({
                                                                type: "POST",
                                                                url: api_prefix+'ps-upload',
                                                                dataType: "json",
                                                                contentType: "application/json",
                                                                data: sendnow,
                                                                success: function (res) {
                                                                         if (res != undefined && res.status=='success') {

                                                                                alert1("Payslip file uploaded");
                                                                             
                                                                        } 

                                                                      } 
                                                                 }); 
        
                
                
                
        
                                //---------------------------------------
                    
                 };
    
//alert('Something uploaded');    
}
    else
    alert1("Please sign in to continue");
}


function idpopul(thi)
{
    $('.id-popu').val(thi);
    //console.log(thi);
}



function empremailsender()
{
    
        
        
    let toaddress = $('#emp-id-psup').val();
    let subject = $('#empr-writes-sub').val();
    let mailbody=$('#empr-writes-body').val();
    
     
        
            let payload ={ 
                            "toaddress":toaddress,
                            "subject":'('+new Date().toLocaleString()+') '+subject.replace(/["']/g, ""),
                            "mailbody":mailbody.replace(/["']/g, "").replace(/(?:\r\n|\r|\n)/g, '<br>')
                
                         };
        
            console.log(payload);
        
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'employer-mail-sender',
			dataType: "json",
			contentType: "application/json",
			data: sendnow,
			success: function (res) {
                                            alert1("Your message is sent.");
                                    } 
                
                
                    
                  } );
            
        
  //alert1("Will be sent now");
    

}

function delete_employer_mail(id)
{
    let payload = {
                            "message_id":id                            
                          };
    
    
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'employer-mail-delete',
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

function leaverequestpull()
{
    if(getCookie('admin-id')!=null)
        {
        
            $('.center-home-admin').hide();
                $('.current-location').append('<span>&nbsp;>&nbsp;Leave Request(s)</span>');
                let mailfill='<div class="inbox-placeholder"><div class="panel panel-default subject-fill"><div style ="font-size:20px;background-color:beige" class="subject-fill1">&nbsp;Subject</div><div class="panel-body mailbody-fill" style="background-color: floralwhite">Body goes here</div></div></div>';
                $('.temp-place-holder').show(); 
                
                
                //request content population starts here...
                
                    let payload = {
                                    "employerid":"admin"
                                    
                                  };
            
                    let sendnow = JSON.stringify(payload);

                    $.ajax({
                    type: "POST",
                    url: api_prefix+'employer-leave-fetch',
                    dataType: "json",
                    contentType: "application/json",
                    data: sendnow,
                    success: function (res) {
                             if (res != undefined && res.status=='success') {
                                 
                                 //populating request placeholder starts....
                                 
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
                                         tmpbody+='<p style="text-align:right"><strong><a href="javascript:leave_accept('+res.mails[i].message_id+')" style="color:darkgreen">Accept</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="javascript:leave_reject('+res.mails[i].message_id+')" style="color:red">Reject</a></strong></p>';
                                         $('.mailbody-fill:last').html(tmpbody);
                                     }
                                 
                                 
                                //populating request placeholder ends...

                            } 

                          } 
                     }); 
                
                
                
                //request content population ends here...
                
               
                        
        }
    else
        alert1("Please sign in to continue");
}


function leave_accept(id)
{
    let payload = {
                            "message_id":id                            
                          };
    
    
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'employer-accepts-leave',
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
    alert1("Accepted");
}



function leave_reject(id)
{   
    
    let payload = {
                            "message_id":id                            
                          };
    
    
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'employer-rejects-leave',
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
    alert1("Rejected");
}


function employer_results()
{
    if(getCookie('admin-id')!=null)
        {
            var template = '<div class="panel panel-default employee-nominates"><div style ="font-size:20px;background-color:beige"><img  style="width:75px;height=75px;border: 1px solid #555" src="./images/emp-mnth.jpg"><span class="upkdsgdk"> Choose an Employee</span></div><div class="panel-body" style="background-color: floralwhite"></div></div>';
                            
                            $('.center-home-admin').hide();
                            $('.current-location').append('<span>&nbsp;>&nbsp;Choose an Employee</span>');
                            $('.temp-place-holder').show();
                            $('.temp-place-holder').append(template);
            
                            var p1='<div class="container" style="width:100%"><div class="row"><div class="col-md-2"></div><div class="col-md-5" style="text-align:left"><strong>Employee name</strong></div><div class="col-md-4" style="text-align: left"><strong>Total votes</strong></div></div></div>';
                                                
                                                    $(".employee-nominates>.panel-body").append(p1);
                    
                                                    for(i=0;i<all_profiles.profiles.length;i++)
                                                        
                                                    {
                                                        var appnd = '<div class="container" style="width:100%"><div class="col-md-2"></div><div class="row"><div class="col-md-5" style="text-align:left"><a style ="color:black" href="javascript:employfred()">'+all_profiles.profiles[i].full_name+'</a></div><div class="col-md-4" style="text-align: left">'+all_profiles.profiles[i].votes+'</div></div></div>';
                                                        $(".employee-nominates>.panel-body").append(appnd);
                                                    }
            
                                                        let tmpbody ='<p style="text-align:right"><strong><a href="javascript:declare_result()" style="color:darkgreen">Declare</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="javascript:clear_results()" style="color:red">Clear</a></strong></p>';
            
                                                    $(".employee-nominates>.panel-body").append(tmpbody);
        }
    else
        alert1('Please sign in to continue.');   
}


function clear_results()
{
            let payload = {
                            "message":""                            
                          };
    
    
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'employer-clears-nominations',
			dataType: "json",
			contentType: "application/json",
			data: sendnow,
			success: function (res) {
                     if (res != undefined && res.status=='success') {
                              
                         alert1("All received nominations are cleared. New nominations will be accepted now.")
                          
                    } 
                    
                  } 
             }); 
}


function declare_result()
{
                    $('.center-home-admin').hide();
                    $('.employee-nominates').hide();
                    $('.result-declare-form').show();
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


function declare_result_submit()
{
            let payload = {
                            "picture":dpbase64,
                            "message":$('#declare-message').val().replaceAll("'","''")                           
                          };
    
    
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'employer-declares-result',
			dataType: "json",
			contentType: "application/json",
			data: sendnow,
			success: function (res) {
                     if (res != undefined && res.status=='success') {
                                             
                          alert1("Best employee of the month is declared.");
                    } 
                    
                  } 
             }); 
}

function view_applications()
{
    if(getCookie('admin-id')!=null)
        {
        
            $('.center-home-admin').hide();
                $('.current-location').append('<span>&nbsp;>&nbsp;Application(s)</span>');
                let mailfill='<div class="inbox-placeholder"><div class="panel panel-default subject-fill"><div style ="font-size:20px;background-color:beige" class="subject-fill1">&nbsp;Subject</div><div class="panel-body mailbody-fill" style="background-color: floralwhite">Body goes here</div></div></div>';
                $('.temp-place-holder').show(); 
                
                
                //request content population starts here...
                
                    let payload = {
                                    "employerid":"admin"
                                    
                                  };
            
                    let sendnow = JSON.stringify(payload);

                    $.ajax({
                    type: "POST",
                    url: api_prefix+'employer-application-fetch',
                    dataType: "json",
                    contentType: "application/json",
                    data: sendnow,
                    success: function (res) {
                             if (res != undefined && res.status=='success') {
                                 
                                 //populating request placeholder starts....
                                 
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
                                         tmpbody+='<p style="text-align:right"><strong><a href="javascript:application_accept('+res.mails[i].message_id+')" style="color:darkgreen">Accept</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="javascript:application_reject('+res.mails[i].message_id+')" style="color:red">Reject</a></strong></p>';
                                         $('.mailbody-fill:last').html(tmpbody);
                                     }
                                 
                                 
                                //populating request placeholder ends...

                            } 

                          } 
                     });
    
}
}


function application_accept(id)
{
    let payload = {
                            "message_id":id                            
                          };
    
    
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'employer-accepts-application',
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
    alert1("Accepted");
}



function application_reject(id)
{   
    
    let payload = {
                            "message_id":id                            
                          };
    
    
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'employer-rejects-application',
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
    alert1("Rejected");
}

function notices()
{
    if(getCookie('admin-id')!=null)
        {
            $('#notices-modal').modal('show');
        }
    else
        alert1("Please sign in to continue");
}

function resources()
{
    if(getCookie('admin-id')!=null)
        {
            $('#resources-modal').modal('show');
            
        }
    else
        alert1("Please sign in to continue");
}

function notice_submit()
{
    let text1 = $('#notice-title').val().replace(/["']/g, "");
    let body1 = $('#notice-body').val().replace(/["']/g, "");
   
    
     
        
            let payload ={ 
                            "text1":text1,
                            "body1":body1
                         };
        
            console.log(payload);
        
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'notice-submit',
			dataType: "json",
			contentType: "application/json",
			data: sendnow,
			success: function (res) {
                                            location.reload();
                                    } 
                
                
                    
                  } );
}

function resource_submit()
{
    let text1 = $('#resource-title').val().replace(/["']/g, "");
    let body1 = $('#resource-body').val().replace(/["']/g, "");
    let link1 = $('#resource-link').val().replace(/["']/g, "");
    
     
        
            let payload ={ 
                            "text1":text1,
                            "body1":body1,
                            "link1":link1
                         };
        
            console.log(payload);
        
            let sendnow = JSON.stringify(payload);
            
            $.ajax({
			type: "POST",
			url: api_prefix+'resource-submit',
			dataType: "json",
			contentType: "application/json",
			data: sendnow,
			success: function (res) {
                                            location.reload();
                                    } 
                
                
                    
                  } );
    
}



