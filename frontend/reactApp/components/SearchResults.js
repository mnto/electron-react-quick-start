import React from 'react';
import styles from '../../assets/stylesheets/search.scss';
import axios from 'axios';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      results: [],
      ownDocs: [],
      collabs: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/userId')
    .then(resp => {
      console.log('response', resp);
      var userId = resp.data._id;
      axios.get('http://localhost:3000/user/'+ userId)
      .then((response) => {
        const ownDocs = response.data.ownDocs;
        const collabDocs = response.data.collaborating;
        this.setState({
          ownDocs,
          collabDocs
        });

      })
      .catch((err) => console.log("Error getting document"));
    })
    .catch((err)=>{
      console.log("ERROR in loading", err);
    });
  }

  render() {
    console.log('search term');
    return(
      <div className="search-page">
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo center">Nodebook</a>
          </div>
        </nav>
        <div className="container results">
          <h4>Search results</h4>
          {this.state.results.map(match => {
            return (
              <div key={match._id} className="col s4 m4">
                <div className="card deep-purple lighten-3">
                  <div className="card-content white-text">
                    <span className="card-title">{match.title}</span>
                  </div>
                  <div className="card-action">
                    <Link to={`/docs/${match._id}`}>Edit</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default SearchResults;
