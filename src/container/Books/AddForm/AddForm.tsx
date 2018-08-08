import React from 'react'

import Add from '.'

interface IProps {
  test?: any,
  onComplete?: () => void
  onBookAddComplete? : () => void
}
interface IState {
  test?: any
}

class AddForm extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props, state)
  }

  fatherComplete = () => {
    this.props.onComplete!()
  }
  fatherBookAddComplete = () => {
    this.props.onBookAddComplete!()
  }
  render() {
    return(
      <div>
        <Add onComplete={this.fatherComplete} onBookAddComplete={this.fatherBookAddComplete}/>
        {/* <Add/> */}
      </div> 
      
    )
  }
}

export default AddForm