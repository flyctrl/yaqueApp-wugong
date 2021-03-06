/**
 * @Author: baosheng
 * @Date: 2018-05-28 16:43:20
 * @Title: 我的设置
 */
import React, { Component } from 'react'
import { List, Button } from 'antd-mobile'
import * as urls from 'Contants/urls'
import { Header, Content } from 'Components'
import api from 'Util/api'
import style from './style.css'

const Item = List.Item

class SetUp extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  componentDidMount() {
  }

  async handleSignOut() {
    const data = await api.auth.loginout({}) || false
    if (data) {
      this.props.match.history.push(urls.LOGIN)
    }
  }

  render() {
    return <div className='pageBox'>
      <Header
        title='设置'
        leftIcon='icon-back'
        leftTitle1='我的'
        leftClick1={() => {
          this.props.match.history.push(urls.MINE)
        }}
      />
      <Content>
        <div className={style['set-up']}>
          <List>
            <Item onClick={() => this.props.match.history.push(urls.SETUPSECURITY)} arrow='horizontal'>账号与安全</Item>
            <Item onClick={() => {}} arrow='horizontal'>新消息通知</Item>
            <Item onClick={() => {}} arrow='horizontal'>隐私</Item>
            <Item onClick={() => {}} arrow='horizontal'>关于我们</Item>
          </List>
          <Button className={style.btn} onClick={this.handleSignOut}>退出登录</Button>
        </div>
      </Content>
    </div>
  }
}

export default SetUp
