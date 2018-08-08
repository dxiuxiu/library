import * as React from 'react'
import './Books.scss'

import Ajax from '../../utils/Ajax'

import 'antd/dist/antd.css'

import AddForm from './AddForm/AddForm'

import { Row, Col, Button, Icon, Modal } from 'antd'


interface IBook {
  _id: {
    $oid: string
  },
  name: string,
  content: string,
  author: string
}

interface IState {
  test1?: string
  test2?: string
  books?: IBook[]

  visible?: boolean

  translateX?: number
  translateY?: number,
  Icon_name?: string,
  display_name?: string,
  minWidth_name?: string,
  minHeight_name?: string,
  custom_window_state?: string
  displayListOrDetail?: string
  confirmModalVisible?: boolean
}

export interface IProps {
  empty?: any
  form?: any
}

interface IObject {
  title: string
  dataIndex: string,
  key: string,
}
// interface Ibook {
//   author: string
//   content: string
//   labels: string
//   name: string
// }


class Books extends React.Component<IProps, IState> {
  moving = false
  lastX = 0
  lastY = 0
  book = {
    author: '',
    content: '',
    labels: '',
    name: ''
  }
  bookId = ''
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      test1: '',
      test2: '',
      translateX: 0,
      translateY: 0,
      Icon_name: 'minus',
      display_name: 'block',
      minWidth_name: '500px',
      minHeight_name: '300px',
      custom_window_state: 'none',
      displayListOrDetail: 'list',          // 取值list/detail, 默认展示列表 展示的组件，默认为列表，当查看详情时切换成详情页
      confirmModalVisible: false
    }
    window.onmouseup = e => this.onMouseUp()
    window.onmousemove = e => this.onMouseMove(e)
  }
  // getDetailByBookId(id: string) {
  //   console.log(id)
  // }

  columns: IObject[] = [{
    title: '检测结果',
    dataIndex: 'name',
    key: 'name',
  }]

  componentWillMount() {
    this.getBooks()

    console.log('dxx add conflict test')
    console.warn('test test')
   
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
  }
  addFormComplete = () => {
    this.getBooks()
  }
  /**
   * 获取book列表
   */
  public getBooks() {
    const that = this
    Ajax.get('/booksAPI/books', {}).then((res: any) => {
      console.log(res)
      that.setState({
        books: res.data
      }, () => {
        // console.log(this.state.books)
      })
    })
  }

  /**
   * 窗口拖动相关
   * 鼠标右键按下启用拖拽
   * @param e 
   */
  onMouseDown(e) {
    e.stopPropagation()     // 阻止事件冒泡
    this.moving = true
  }
  /**
   * 窗口拖动相关
   * 鼠标右键弹起关闭拖拽
   */
  onMouseUp() {
    this.moving = false
    this.lastX = 0
    this.lastY = 0
  }
  /**
   * 窗口拖动相关
   * 鼠标移动
   * @param e 
   */
  onMouseMove(e) {
    // this.moving && this.onMove(e)
    if (this.moving) {
      this.onMove(e)
    }
  }
  /**
   * 窗口拖动相关
   * 实现窗口位置移动
   * @param e 
   */
  onMove(e) {
    if (this.lastX && this.lastY) {
      const dx = e.clientX - this.lastX
      const dy = e.clientY - this.lastY
      this.setState(
        {
          translateX: this.state.translateX! + dx,
          translateY: this.state.translateY! + dy
        }
      )
    }
    this.lastX = e.clientX
    this.lastY = e.clientY
  }
  /**
   * 拖拽窗口顶部的功能按钮切换
   * 最大化最小化
   */
  changIcon = () => {
    if (this.state.Icon_name === 'minus' || this.state.display_name === 'block' || this.state.minHeight_name === '420px' || this.state.minWidth_name === '320px') {
      this.setState({
        Icon_name: 'arrows-alt',
        display_name: 'none',
        minHeight_name: '45px',
        minWidth_name: '200px',
      })
    } else if (this.state.Icon_name === 'arrows-alt' || this.state.display_name === 'none' || this.state.minWidth_name === '100px' || this.state.minHeight_name === '45px') {
      this.setState({
        Icon_name: 'minus',
        display_name: 'block',
        minWidth_name: '500px',
        minHeight_name: '330px',
      })
    }
  }
  /**
   * 切换自定义窗口显示或关闭
   * 原理为切换窗口的display值为none或inline-block
   */
  toggleCustomWindow = () => {
    if (this.state.custom_window_state === 'none') {
      this.setState({
        custom_window_state: 'inline-block'
      })
    } else {
      this.setState({
        custom_window_state: 'none'
      })
    }
  }

  getDetailByBookId = (id: string) => {
    // console.log(this)
    Ajax.get('/booksAPI/books/' + id, {}).then((res: any) => {

      this.book.author = res.data[0].author
      this.book.content = res.data[0].content
      this.book.labels = res.data[0].labels
      this.book.name = res.data[0].name
      this.setState({
        displayListOrDetail: 'detail'
      }, () => {
        // console.log(this.state.displayListOrDetail)
      })

    })
  }
  deleteBookByBookId = (id: string) => {
    this.hideConfirmModal()
    Ajax.get('/booksAPI/books/' + id + '/delete', {}).then((res: any) => {
      console.log(res)
      if (res.result === true) {
        // 成功删除重新获取当前book记录做展示
        this.getBooks()
      } else {
        this.errorModal('警告', '删除失败，请重试！')
      }
    })
  }

  bookDetailToList = () => {
    this.setState({
      displayListOrDetail: 'list'
    })
  }


  errorModal(titlePara, contentPara) {
    Modal.error({
      title: titlePara,
      content: contentPara,
    })
  }

  showConfirmModal = (id) => {
    this.bookId = id
    this.setState({
      confirmModalVisible: true,
    })

  }

  hideConfirmModal = () => {
    this.setState({
      confirmModalVisible: false,
    })
  }
  confirmOk = () => {
    this.deleteBookByBookId(this.bookId)
  }

  confirmCancel = () => {
    this.hideConfirmModal()
  }

  addBookComplete = () => {
    this.toggleCustomWindow()
  }
  render() {

    const listStyle = {
      display: (this.state.displayListOrDetail === 'list') ? 'block' : 'none'
    }
    const detailStyle = {
      display: (this.state.displayListOrDetail === 'detail') ? 'block' : 'none'
    }
    return (
        <div className='content'>
          <Row className='header'>
            <Col span={4} />
            <Col span={16}>
              <div className='header-body'>
                {/* type='primary' */}
                <Button size='small' style={detailStyle} className='book-detail-to-list' onClick={this.bookDetailToList}>返回</Button>

                <Button size='small' style={listStyle} className='add-book-button' onClick={this.toggleCustomWindow}>新增</Button>
              </div>
            </Col>
            <Col span={4} />
          </Row>
          <Row className='body'>
            <Col span={4} />
            <Col span={16}>
              {/* 列表 */}
              <div style={listStyle}>
                {
                  this.state.books && this.state.books.map(book => {
                    return (
                      <div className='list' key={book._id.$oid}>{book.name}
                        <div className='operate-buttons'>
                          <a data-id={book._id.$oid} onClick={this.getDetailByBookId.bind(this, book._id.$oid)}>详情</a>
                          &nbsp;&nbsp;&nbsp;
                        {/* <a onClick={this.deleteBookByBookId.bind(this, book._id.$oid)}>删除</a> */}
                          <a onClick={this.showConfirmModal.bind(this, book._id.$oid)}>删除</a>
                        </div>
                      </div>
                      // <div key={book._id.$oid}>{book.name} <div className='operate-buttons'><a data-id={book._id.$oid} onClick={() => { this.getDetailByBookId(book._id.$oid) }}>详情</a> <a>删除</a></div></div>
                    )
                  })
                }
              </div>
              {/* 详情 */}
              <div style={detailStyle}>
                <h2>名称</h2>
                {this.book.name}
                <hr />
                <h2>内容</h2>
                <span>{this.book.content}</span>
                <hr />
                <h2>标签</h2>
                <span>{this.book.labels}</span>
                <hr />
                <h2>作者</h2>
                <span>{this.book.author}</span>
                <hr />
              </div>
            </Col>
            <Col span={4} />
            {/* 确认删除的询问框 */}

            <Modal
              title='提示'
              mask={false}
              visible={this.state.confirmModalVisible}
              onOk={this.confirmOk}
              onCancel={this.confirmCancel}
              okText='确认'
              cancelText='取消'
            >
              <p>该操作不可逆，是否确认删除？</p>
            </Modal>
          </Row>
          <Row className='footer'>
            <Col span={2} />
            <Col span={20}>
              {/* <h4>footer</h4> */}
            </Col>
            <Col span={2} />
          </Row>
          <div className='' id='add-book-window'>
            <div className='layui-layer-land'
              onMouseDown={e => this.onMouseDown(e)}
              style={{ display: `${this.state.custom_window_state}`, minWidth: `${this.state.minWidth_name}`, minHeight: `${this.state.minHeight_name}`, transform: `translateX(${this.state.translateX}px)translateY(${this.state.translateY}px)` }}>
              {/* 控制页面是否展开按钮 */}
              <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#888', float: 'left' }}>添加记录</span>
              {/* 关闭 */}
              <span style={{ float: 'right', cursor: 'pointer' }}
                onClick={this.toggleCustomWindow}>
                <Icon type='close' style={{ fontSize: '25px', }} />
              </span>
              {/* 最小化 */}
              {/* <span style={{ float: 'right', cursor: 'pointer' }}
              onClick={this.changIcon}>
              <Icon type={this.state.Icon_name!} style={{ fontSize: '25px', }} />
            </span> */}
              {/* 最小化时显示的窗口 */}
              <div style={{ display: `${this.state.display_name}`, marginTop: '35px', clear: 'both', }}>
                <hr />
              </div>

              {/* 窗口主体部分 */}
              {/* <div className='window-body'>
                <AddForm onComplete={this.addFormComplete}  onBookAddComplete={this.addBookComplete}/>
              </div> */}
            </div>
          </div>
        </div>
    )
  }

}



export default Books

