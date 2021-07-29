"use strict"
const userForm = new UserForm();

//функция, которая будет выполняться при попытке авторизации
userForm.loginFormCallback = data = ApiConnector.login(data, response => {
  if(response.success === true) {
    location.reload();
  } else {
    userForm.setLoginErrorMessage(response.error);
  }
});

//функция, которая будет выполняться при попытке регистрации

userForm.registerFormCallback = data= ApiConnector.register(data, response => {
  if(response.success === true) {
    location.reload();
  } else {
    userForm.setRegisterErrorMesage(response.error);
  }
});