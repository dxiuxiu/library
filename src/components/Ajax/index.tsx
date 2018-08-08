import * as React from 'react'
import Axios from 'axios'
import Ajax from '../../utils/Ajax'

interface IProps {
  test?: any
}

interface IState {
  userInfo?: any,
  ganks?: any
}

export default class AjaxTest extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      userInfo: {
        name: 'anonymous'
      }
    }
  }
  componentDidMount() {
    Axios.get('/api/0.4/?randomapi').then(res => {
      if (res && res.status === 200) {
        const length = res.data.results.length
        this.setState({
          userInfo: res.data.results[length - 1].user
        })
      }
    })
    Axios.get('/gank/api/xiandu/category/wow').then(res => {
      console.log(res)
      if (res && res.status === 200) {
        this.setState({
          ganks: res.data.results
        })
      }
    })
    
  }


  render() {
    let userName = ''
    const userInfoName = this.state.userInfo.name
    if (userInfoName.first || userInfoName.last) {
      userName = `${userInfoName.first} ${userInfoName.last}` 
    } else {
      userName = userInfoName
    }
    return (
      <div>
        {userName ? `hello: ${userName}` : false}
        <div>
        {
          this.state.ganks && this.state.ganks.map(item => {
            return <img key={item._id} src={item.icon} title={item.title} width={'100px'} height={'100px'} />
          })
        }
        </div>
      </div>
    )
  }
}