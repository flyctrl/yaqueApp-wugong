/*
* @Author: chengbs
* @Date:   2018-04-09 13:27:30
* @Last Modified by:   chengbs
* @Last Modified time: 2018-05-24 14:29:53
*/
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { InputItem, Button, Toast, List } from 'antd-mobile'
import { createForm } from 'rc-form'
import { Content } from 'Components'
import Timer from './timer'
import style from './style.css'
import logo from 'Src/assets/logo.png'
import * as urls from 'Contants/urls'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      codeDisabled: false,
      codeText: '获取验证码'
    }
  }
  onSubmit = () => { // 表单提交
    let validateAry = ['phone', 'code', 'password', 'confirmPassword']
    const { getFieldError } = this.props.form
    this.props.form.validateFields((error) => {
      if (!error) {
        console.log(this.props.form.getFieldsValue())
      } else {
        for (let value of validateAry) {
          if (error[value]) {
            Toast.fail(getFieldError(value), 1)
            return
          }
        }
      }
    })
  }
  handleOver() {
    this.setState({
      codeDisabled: false,
      codeText: '重新发送'
    })
  }
  getCode() {
    const phoneErr = this.props.form.getFieldError('phone')
    const phone = this.props.form.getFieldValue('phone')
    if (phone === undefined || phone === '') {
      Toast.fail('请输入手机号码', 1)
    } else if (phoneErr !== undefined) {
      Toast.fail('请输入正确格式手机号码', 1)
    }
    if (phoneErr === undefined && phone !== undefined) {
      this.setState({
        codeDisabled: true
      })
      console.log(phone)
    }
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('您输入的两次密码不一致')
    } else {
      callback()
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmPassword'], { force: true })
    }
    callback()
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form
    return (
      <div className='pageBox'>
        <Content isHeader={false}>
          <div className={`${style['logobox']} ${style['regLogobox']}`}><img src={logo} /><span>新建筑 新生活</span></div>
          <div className={style['loginTitle']}>注 册</div>
          <form className={style['registerForm']}>
            <List>
              <InputItem
                {...getFieldProps('phone', {
                  rules: [
                    { required: true, message: '请输入您的手机号/用户名' },
                    { pattern: /^(1[358479]\d{9})$/, message: '请输入正确格式的手机号码' }
                  ],
                })}
                clear
                placeholder='手机号/用户名'
                prefixListCls='register'
                error={!!getFieldError('phone')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('phone'), 1)
                }}
              ></InputItem>
            </List>
            <div className={style['codeBox']}>
              <List>
                <InputItem
                  {...getFieldProps('code', {
                    rules: [
                      { required: true, message: '请输入验证码' },
                    ],
                  })}
                  clear
                  placeholder='验证码'
                  prefixListCls='register'
                  error={!!getFieldError('code')}
                  onErrorClick={() => {
                    Toast.fail(getFieldError('code'), 1)
                  }}
                >
                </InputItem>
              </List>
              <Button className={ style['codebtn'] } style={{ position: 'absolute' }} disabled={this.state.codeDisabled} type='ghost' size='small' onClick={this.getCode.bind(this)}>
                {
                  this.state.codeDisabled ? <Timer className={style['timer']} onOver={this.handleOver.bind(this)} /> : this.state.codeText
                }
              </Button>
            </div>
            <List>
              <InputItem
                {...getFieldProps('password', {
                  rules: [
                    { required: true, message: '请输入您的密码' },
                    { pattern: /^.{6,20}$/, message: '格式错误，密码长度6~20位字符' },
                    { validator: this.validateToNextPassword }
                  ],
                })}
                clear
                placeholder='密码'
                prefixListCls='register'
                type='password'
                error={!!getFieldError('password')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('password'), 1)
                }}
              ></InputItem>
            </List>
            <List>
              <InputItem
                {...getFieldProps('confirmPassword', {
                  rules: [
                    { required: true, message: '请输入您的确认密码' },
                    { pattern: /^.{6,20}$/, message: '格式错误，密码长度6~20位字符' },
                    { validator: this.compareToFirstPassword }
                  ],
                })}
                clear
                placeholder='确认密码'
                prefixListCls='register'
                type='password'
                error={!!getFieldError('confirmPassword')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('confirmPassword'), 1)
                }}
              ></InputItem>
            </List>
            <Button type='primary' className={ style['submitBtn'] } activeClassName={style['activeSubmitBtn']} onClick={this.onSubmit}>确 定</Button>
            <div className={style['register']}>
              <Link to={ urls.LOGIN } className={style['loginBtn']}>已有帐号？去登录</Link>
            </div>
          </form>
        </Content>
      </div>
    )
  }
}

const RegisterWrapper = createForm()(Register)
export default RegisterWrapper
