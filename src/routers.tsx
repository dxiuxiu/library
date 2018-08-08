import * as React from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom'
// import 'antd/dist/antd.css'
import DynamicImport from './components/DynamicImport'
import Loading from './components/Loading'
import NoMatch from './components/NoMatch'

// import LoadableDashboard from './container/test'

const Index = () => (
  <Router basename='/'>
    <div style={{ height: '100%' }}>
      {/* 预留菜单栏 */}
      <div>
        <NavLink
          to='/'
          activeStyle={{ color: 'green', fontWeight: 'bold' }}
        >home</NavLink>
        &nbsp;
        <NavLink
          to='/app'
          activeStyle={{ color: 'red', fontWeight: 'bold' }}
        >app</NavLink>
        &nbsp;
        <NavLink
          to='/books'
          activeStyle={{ color: 'blue', fontWeight: 'bold' }}
        >books</NavLink>
        &nbsp;
         <NavLink
          to='/maptalksTest'
          activeStyle={{ color: 'blue', fontWeight: 'bold' }}
        >maptalksTest</NavLink>
        &nbsp;
        <NavLink
          to='/test'
          activeStyle={{ color: 'blue', fontWeight: 'bold' }}
        >no match</NavLink>
      </div>
      <Switch>
        <Route exact path='/' component={AppComponent} />
        {/* <Route render={()=>{}}>ttt</Route> */}
        <Route path='/app' component={IllegalElectromechanicalWellComp} />
        <Route path='/books' component={Books} />
        <Route path='/maptalksTest' component={MaptalksDemoDxx} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
)
// 路由： App
const AppComponent = (props) => (
  <DynamicImport load={() => import('./container/App')}>
    {(Component: any) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)
// 路由： 非法机电井
const IllegalElectromechanicalWellComp = (props) => (
  <DynamicImport load={() => import('./container/IllegalElectromechanicalWell')}>
    {(Component: any) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)
// 路由：测试 Books
const Books = (props) => (
  <DynamicImport load={() => import('./container/Books')}>
    {(Component: any) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)
// maptalks练习
const MaptalksDemoDxx = (props) => (
  <DynamicImport load={() => import('./container/Maptalks_dxx')}>
    {(Component: any) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)

export default Index