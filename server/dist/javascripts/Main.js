!function(){"use strict";function o(){$("#nav_logo_image").click(function(){location.href="/"})}function r(){$(".start-portfolio").click(function(){location.href="/template/start"})}function i(){$("#login_modal_login_btn").click(function(){var o,r=$("#login_modal_input_id").val(),i=$("#login_modal_input_pw").val();return r?i?(o={id:r,pw:i},void $.ajax({url:"/ajax/user/login",type:"POST",data:o,error:function(){alert("Login fail! (Server error)")},success:function(o){1===o.code&&"login success"===o.msg?($("#login_modal").modal("hide"),location.reload(!0)):alert("Check your ID and Password!")}})):void alert("Input your Password!"):void alert("Input your ID!")})}function e(){var o=/^[A-Za-z0-9+]*$/,r=/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;$("#join_modal_input_id").blur(function(){var o=this,i=$("#join_modal_input_id").val();if(i){if(!r.test(i))return $(o).focus(),$("#join-error-msg").text("Invalid Email."),void $("#join-error-msg").removeClass("hide");$("#join-error-msg").addClass("hide"),$.ajax({url:"/ajax/user/check/id/"+i,type:"POST",error:function(){alert("CheckId fail! (Server error)")},success:function(r){return 0===r.code?($(o).focus(),$("#join-error-msg").text(r.msg),void $("#join-error-msg").removeClass("hide")):void $("#join-error-msg").addClass("hide")}})}}),$("#join_modal_input_name").blur(function(){var o=this,r=$("#join_modal_input_name").val();r&&($("#join-error-msg").addClass("hide"),$.ajax({url:"/ajax/user/check/name/"+r,type:"POST",error:function(){alert("CheckName fail! (Server error)")},success:function(r){return 0===r.code?($(o).focus(),$("#join-error-msg").text(r.msg),void $("#join-error-msg").removeClass("hide")):void $("#join-error-msg").addClass("hide")}}))}),$("#join_modal_join_btn").click(function(){var i,e=$("#join_modal_input_id").val(),a=$("#join_modal_input_pw").val(),n=$("#join_modal_input_pw_confirm").val(),t=$("#join_modal_input_name").val();return e&&r.test(e)?a&&o.test(a)?t?a!==n?void alert("Input your password."):(i={id:e,pw:a,name:t},void $.ajax({url:"/ajax/user/join",type:"POST",data:i,error:function(){alert("Signup fail! (Server error)")},success:function(o){return 0===o.code?void alert(o.msg):(alert("Signup success!"),$("#join_modal").modal("hide"),void location.reload(!0))}})):void alert("Input your name."):void alert("Check your password."):void alert("Check your id.(id must be email)")})}function a(){$("#nav_logout_btn").click(function(){$.ajax({url:"/ajax/user/logout",type:"POST",error:function(){alert("Logout fail! (Server error)")},success:function(){alert("Logout success!"),location.reload(!0)}})})}function n(){$(".select-template-container > div").click(function(){var o=$(this).data("id");return IS_LOGIN?void(confirm("Do you want to use this template?")&&$.ajax({url:"/ajax/portfolio/template/"+o,type:"POST",error:function(){alert("Portfolio make fail! (Server error)")},success:function(o){return 0===o.code?void alert(o.msg):void(location.href="/"+o.userName)}})):void $("#login_modal").modal("show")})}function t(){o(),r(),i(),e(),a(),n()}t()}();