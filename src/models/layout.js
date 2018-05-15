/*
* @Author: baosheng
* @Date:   2018-04-02 22:24:57
* @Last Modified by:   chengbs
* @Last Modified time: 2018-05-15 11:09:31
*/
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile'
import AppMenu from 'Components/Menus'
import history from 'Util/history'
import style from './style.css'
import { isIphoneX } from 'Util/ua'
console.log(style)
class MainLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      path: '',
      isMenuPage: true
    }
    this.goBack = this.goBack.bind(this)
    this.showMenu = this.showMenu.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    const propObj = this.getRouteByPath(nextProps.location.pathname)
    this.setState({
      title: propObj['title'],
      isMenuPage: propObj['showMenu'],
      path: nextProps.location.pathname
    })
  }
  componentWillMount() {
    const rtObj = this.getRouteByPath()
    this.setState({
      isMenuPage: rtObj['showMenu'],
      title: rtObj['title']
    })
  }
  showMenu() {
    const { routes } = this.props
    console.log(this.state.isMenuPage, routes)
    if (this.state.isMenuPage) {
      return (
        <AppMenu onTouch={this.touchMenu.bind(this)} path={this.state.path} routes={routes}>
          {
            routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  parent={route.parent}
                  render={(match) => {
                    return <route.component match={match}/>
                  }}
                />
              )
            })
          }
        </AppMenu>
      )
    } else {
      return (
        <div>
          {
            routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  render={(match) => {
                    return (
                      <div>
                        <route.component match={match} />
                      </div>
                    )
                  }}
                />
              )
            })
          }
        </div>
      )
    }
  }
  touchMenu(event) {
    this.setState({
      title: event
    })
  }
  goBack() {
    history.goBack()
  }
  getRouteByPath(pathname = history.location.pathname) {
    const { routes } = this.props
    let routeObj = null
    routes.map((route, index) => {
      if (route['path'] === pathname) {
        routeObj = route
      }
    })
    return routeObj
  }
  render() {
    const pathBool = this.getRouteByPath()['showBack']
    return (
      <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        { isIphoneX ? <div className='fix-iphoneX-top'/> : null }
        <NavBar
          mode='dark'
          icon={
            pathBool ? <Icon type='left' /> : null
          }
          onLeftClick={() => {
            pathBool ? this.goBack() : null
          }}
        >{ this.state.title }</NavBar>
        {this.showMenu()}
      </div>
    )
  }
}

export default MainLayout
