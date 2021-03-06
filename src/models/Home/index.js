/*
* @Author= chengbs
* @Date=   2018-04-08 13=57=21
* @Last Modified by=   chengbs
* @Last Modified time= 2018-05-16 14=40=01
*/
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { ListView, PullToRefresh } from 'antd-mobile'
import { Header, Content, NewIcon } from 'Components'
import history from 'Util/history'
import * as urls from 'Contants/urls'
import * as tooler from 'Contants/tooler'
import TouchFeedback from 'Util/touchFeedback.js'
import style from './style.css'

const data = [
  {
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
]
const NUM_ROWS = 20
let pageIndex = 0

function genData(pIndex = 0) {
  const dataArr = []
  for (let i = 0; i < NUM_ROWS; i++) {
    dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`)
  }
  return dataArr
}

class Home extends Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })

    this.state = {
      city: '杭州',
      dataSource,
      isLoading: true,
      refreshing: true,
      height: document.documentElement.clientHeight,
    }
    this.onEndReached = this.onEndReached.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  searchOnFocus() {
    history.push(urls.SEARCHLIST)
  }

  rightClick() {
    history.push(urls.SELECTION)
  }

  handleList() {
    history.push(urls.WORKDETAIL)
  }

  componentDidUpdate() {
    document.body.style.overflow = 'hidden'
  }

  componentDidMount() {
    new TouchFeedback('.pushadd-btn')
    console.log(decodeURI(tooler.parseURLParam()['name']))
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop
    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData()
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(genData()),
        height: hei,
        refreshing: false,
        isLoading: false,
      })
    }, 1500)

    // Toast.info(history.state.state.logId, 100)
  }

  onEndReached(event) {
    console.log('onEndReached')
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return
    }
    console.log('reach end', event)
    this.setState({ isLoading: true })
    setTimeout(() => {
      this.rData = [...this.rData, ...genData(++pageIndex)]
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false
      })
    }, 1000)
  }

  onRefresh() {
    console.log('onRefresh')
    this.setState({ refreshing: true, isLoading: true })
    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData()
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false,
      })
    }, 600)
  }

  render() {
    const { city } = this.state

    let index = data.length - 1
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1
      }
      const obj = data[index--]
      console.log(obj)
      return (
        <div key={rowID} onClick={this.handleList} className={`${style['job-list-box']} my-bottom-border`}>
          <div className={style['job-list-tit']}>
            <span className={`${style['title']} ellipsis`}>我需要我需要我需要我需啊要我需要装修工人（木工）</span>
            <div className={style['job-tag']}><em>木的工</em><em>土方</em><em>墙</em></div>
          </div>
          <div className={style['job-list-bd']} style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>
            上门给客户做家具安装，前期有培训，不拖欠工资，包住宿，有老师傅带，收入稳定。不拖欠工资，包住宿，有老师傅不拖欠工资，包住宿，有老师傅
          </div>
          <div className={style['job-list-price']}>
            招标：<em>200元/日</em>（预计收入:15,000元 - 20,000元）
          </div>
          <div className={style['job-list-address']}>
            <NewIcon type='icon-address' className={style['icon-address']} />
            <span>江西建工建设有限公司</span>
            <em>03/28 17:54</em>
          </div>
        </div>
      )
    }

    return (
      <div className='contentBox'>
        <div className={style['usr-home-content']}>
          <Header
            className={style['home-header']}
            searchTitle='搜索工种/公司名称'
            cancelText={' '}
            onSearchFocus={this.searchOnFocus}
            leftIcon='icon-location'
            leftTitle1={city}
            rightTitle='筛选'
            rightClick={this.rightClick}
          />
          <Content>
            <ListView
              ref={(el) => { this.lv = el }}
              dataSource={this.state.dataSource}
              renderFooter={() => (<div className={style['list-loading']}>
                {this.state.isLoading ? '加载中...' : '加载完成'}
              </div>)}
              renderRow={row}
              style={{
                height: this.state.height - 50
              }}
              pageSize={5}
              onScroll={() => { console.log('scroll') }}
              pullToRefresh={<PullToRefresh
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                // distanceToRefresh={window.devicePixelRatio * 25}
              />}
              // scrollRenderAheadDistance={500}
              onEndReached={this.onEndReached}
              // onEndReachedThreshold={10}
            />
            <Link to={urls.PUSHORDER} className='pushadd-btn' data-touchfeedback={true}>
              <span className={style['icon-add-20']}></span>
            </Link>
          </Content>
        </div>
      </div>
    )
  }
}

export default Home

