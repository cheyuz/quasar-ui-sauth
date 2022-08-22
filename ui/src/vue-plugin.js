import SLogin from "./components/SLogin";
import SAuthLayout from "./components/SAuthLayout";
import SForgot from "./components/SForgot";
import SRegister from "./components/SRegister";
import SResetPassword from "./components/SResetPassword";



function install (app) {
  app.component(SLogin.name, SLogin)
  app.component(SAuthLayout.name, SAuthLayout)
  app.component(SForgot.name, SForgot)
  app.component(SRegister.name, SRegister)
  app.component(SResetPassword.name, SResetPassword)
}

export {
  SLogin,
  SAuthLayout,
  SForgot,
  SRegister,
  SResetPassword,
  install
}
