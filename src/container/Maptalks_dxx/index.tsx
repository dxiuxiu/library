import React from 'react'
import './index.scss'
// import Demo1 from './Demo/test1'
import Demo2 from './Demo/test2'

interface IProps {
  test?: any
}
interface IState {
  test?: any
}

export default class MaptalksDemo extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props, state)
  }

  render() {
    return(
        // <Demo1/>
        <Demo2/>

    )
  }
}

