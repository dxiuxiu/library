import React from 'react'
import { Form, Input, Button, message, Modal } from 'antd'
import Ajax from '../../../utils/Ajax'
import './AddForm.scss'
const FormItem = Form.Item
const { TextArea } = Input
interface IProps {
  form?: any,

  onComplete?: () => void

  onBookAddComplete?: () => void
 }

 interface Ibook {
  name: string,
  content: string,
  author: string
  labels: string
 }

class MyForm extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)
  }
  /**
   * 成功的全局消息提示
   * time 消息提示框自动消失的时间
   */
  successMeaasge = (time) => {
    message.success('提交成功！', time)
  }
  successModal = (titlePara, contentPara) => {
    Modal.success({
      title: titlePara ,
      content: contentPara
    })
  }
  /**
   * 获取表单信息
   */
  getFormValue = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
        this.summitFormValue(values)
      }
    })
  }
  /**
   * 提交表单信息
   */
  summitFormValue = (book: Ibook) => {
    const self = this
    Ajax.get('/booksAPI/books/add', {
      name: book.name,
      content: book.content,
      author: book.author,
      labels: book.labels

    }).then((res: any) => {
      console.log(res)
      if (res.status === 'undefined' || res.$oid) {
        self.props.onComplete!()                 // 刷新列表
        this.successMeaasge(1)                   // 提示提交完成
        this.props.form.resetFields()            // 提交结束form清空
       
        self.props.onBookAddComplete!()                 // 提交完成关闭提交窗口
      } else if (res.status === false) {
        if (res.data === 'has this book') {
          this.successModal('提示' , '该书已存在！')
        }
      } 
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      // <div>
      //   form部分
      // </div>
      <Form onSubmit={this.getFormValue} className=''>
        <FormItem>
          名称：
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '不能为空' }],
          })(
            <Input className='input' placeholder='请输入...' />
          )}
        </FormItem>
        <FormItem>
          内容：
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '不能为空' }],
          })(
            <Input className='input'  placeholder='请输入...' />
          )}
        </FormItem>
        <FormItem>
          标签：
          {getFieldDecorator('lables', {
            rules: [{ required: true, message: '不能为空' }],
          })(
            <Input className='input' placeholder='请输入...' />
          )}
        </FormItem>
        <FormItem>
          作者：
          {getFieldDecorator('author', {
            rules: [{ required: true, message: '不能为空' }],
          })(
            <Input className='input' placeholder='请输入...' />
          )}
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType='submit' className='summit-button'>
            提交
          </Button>
        </FormItem>
      </Form>
    )
  }
}
const Add = Form.create({})(MyForm as any)
export default Add
