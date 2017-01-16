import Login from './components/Login'
import Main from './components/Main'
import Users from './components/sys/user/Users'
import UserDetail from './components/sys/user/UserDetail'
import Menus from 'components/sys/menu/Menus'

const routes = [

  {
    path: '/',
    component: Login,
    meta: {noAuth: true}
  },
  {
    path: '/main',
    component: Main,
    children: [
      {
        path: '/user',
        component: Users
      },
      {
        path: '/user/:id',
        name: 'm-u-d',
        component: UserDetail
      }
    ]
  },
  {
    path: '/main',
    component: Main,
    children: [
      {
        path: '/menu',
        component: Menus
      }
    ]
  }
]

export default routes
