import Component from './components/Component'
import SLogin from "./components/SLogin";



function install (app) {
  app.component(Component.name, Component)
  app.component(SLogin.name, SLogin)

}

export {
  Component,
  SLogin,

  install
}
