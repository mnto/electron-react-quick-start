import React from 'react';



<div className="historyContainer">

  {self.state.history &&
    <ul>
      {self.state.history.map(function(hist, index){
        return (<li
          onClick={self.onHistClick.bind(self, hist)}
          key={index}>
          <a>{hist.timestamp}</a>
        </li>);
      })}
    </ul>
  }
</div>
