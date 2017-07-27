import { Button } from 'react-materialize';
import React from 'react';

class HistoryFab extends React.Component{

  constructor(props){
    super(props);
    this.state ={
      hist: this.props.history
    }
  }

  render(){
    return(
      <Button floating fab='horizontal' faicon='fa fa-plus' className='red' large style={{bottom: '45px', right: '24px'}}>
        {this.state.hist.map((history) =>
          <Button className='red'>{history.dateCreated}</Button>
        )}
      </Button>
    );
  }
}

export default HistoryFab;
