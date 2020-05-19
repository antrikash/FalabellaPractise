import React, { Fragment } from "react";
import "./styles.css";

class App extends React.Component {
  state = {
    "search-input": "",
    "ratings-input": "",
    "duration-input": "",
    "name-input": "",
    movieList: []
  };
  handleInput = e => {
    let { value, id } = e.target;
    this.setState({
      [id]: value
    });
  };

  addMovie = e => {
    e.preventDefault();
    let DurLastLetter = this.state["duration-input"].slice(-1);
    if (DurLastLetter === "h") {
      var duration = `${this.state["duration-input"].slice(0, -1) * 60}m`;
    } else {
      duration = this.state["duration-input"];
    }
    let newList = [...this.state.movieList];
    newList = [
      ...newList,
      {
        name: this.state["name-input"],
        ratings: this.state["ratings-input"],
        duration
      }
    ];
    this.setState({
      movieList: [...newList]
    });
  };
  renderTable = () => {
    let filterDataList =
      this.state["search-input"].length > 0
        ? this.state.movieList.filter(mve =>
            mve.name.includes(this.state["search-input"])
          )
        : this.state.movieList;
    let sortedList = filterDataList.sort(
      (mve1, mve2) => mve2.duration.slice(0, -1) - mve1.duration.slice(0, -1)
    );

    return (
      <Fragment>
        <input
          id="search-input"
          value={this.state["search-input"]}
          type="search"
          placeholder="Search Movie Name"
          onChange={this.handleInput}
        />
        <table id="tableId">
          <thead>
            <tr>
              <th>Movie</th>
              <th>Ratings</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {sortedList.length > 0 ? (
              sortedList.map((mov, i) => (
                <tr key={i}>
                  <td>{mov.name}</td>
                  <td>{mov.ratings}</td>
                  <td>{mov.duration}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td id="noresult">No Results Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </Fragment>
    );
  };

  render() {
    return (
      <Fragment>
        <form>
          <label htmlFor="name-input">Movie Name : </label>
          <input
            id="name-input"
            value={this.state["name-input"]}
            type="text"
            placeholder="Enter Movie Name"
            onChange={this.handleInput}
          />
          <br />
          <label htmlFor="ratings-input"> Ratings : </label>
          <input
            id="ratings-input"
            value={this.state["ratings-input"]}
            type="number"
            max="10"
            placeholder="Enter Ratings"
            onChange={this.handleInput}
          />
          <br />
          <label htmlFor="duration-input"> Duration : </label>
          <input
            id="duration-input"
            value={this.state["duration-input"]}
            type="text"
            placeholder="Enter Duration"
            onChange={this.handleInput}
          />
          <br />
          <button
            style={{ marginBottom: "10px" }}
            type="submit"
            onClick={this.addMovie}
          >
            Submit{" "}
          </button>
          <hr />
        </form>
        {this.renderTable()}
      </Fragment>
    );
  }
}

export default App;
