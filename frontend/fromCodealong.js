      <div>
        {this.state.top && (
          <div style={{
            position: 'absolute',
            backgroundColor: 'red',
            width: '2px',
            height: this.state.height,
            top: this.state.top,
            left: this.state.left
          }}>
          </div>
        )}
        <button
          onClick={(e) => this.onSave(e)}
          className="btn waves-effect waves-light col s4 offset-s4">
          Save Changes
          <i className="material-icons left">save</i>
        </button>
        <div>
          <button className="waves-effect waves-light btn col s5" onClick={(e) => this.onBack(e)}>
            <i className="material-icons left">chevron_left</i>
            Back to Document Portal
