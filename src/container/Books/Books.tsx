import React from 'react'

import Books from '.'

interface IProps {
  test?: any
}
interface IState {
  test?: any
}

class BookAdmin extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props, state)
  }

  render() {
    return(
        <Books />
    )
  }
}

export default BookAdmin