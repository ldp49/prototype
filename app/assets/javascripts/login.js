//Login javascript
//This file is intended for processing user logins
//Currently Housing:
//form validation



$(document).ready(function(){
  $('#user-form').validate({
    rules: {
        username: {
            required: true,
            minlength: 5
        },
        password: {
            required: true,
            minlength: 5
        }
    }
  });

  $('#org-form').validate({
    rules: {
        organization: {
            required: true,
            minlength: 2
        }
    }
  });

});
