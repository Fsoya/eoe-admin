import Login from './components/Login'
import Main from './components/Main'
import Users from './components/user/Users'
import UserDetail from './components/user/UserDetail'
import User1 from './components/user/User1'

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
        path: '/user1',
        component: User1
      }
    ]
  }
]

export default routes
