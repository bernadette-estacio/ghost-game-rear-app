import React, { Component } from "react";
import Nav from "./components/nav";
import MainContent from "./components/mainContent";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heightLoc: 0,
      widthLoc: 0,
      startButton: true,
      ghost: false,
      ghostFinal: false
    };
  }

  startGame = () => {
    this.setState({
      startButton: false
    });
    this.showGost();

    // Show Final Ghost
    setTimeout(
      function() {
        this.setState({
          ghost: false,
          ghostFinal: true
        });
      }.bind(this),
      16000
    );
  };

  clickGhost = () => {
    this.setState({
      ghost: false
    });
    this.showGost();
  };

  showGost = () => {
    setTimeout(
      function() {
        this.newLoc();
        this.setState({
          ghost: true
        });
      }.bind(this),
      800
    );
  };

  newLoc = () => {
    let y = Math.floor(Math.random() * this.props.height + 1);
    let x = Math.floor(Math.random() * this.props.width + 1);

    this.setState({
      heightLoc:
        y <= 150 ? y + 151 : y >= this.props.height - 150 ? y - 151 : y,
      widthLoc: x <= 150 ? x + 151 : x >= this.props.width - 150 ? x - 151 : x
    });
  };

  reset = () => {
    window.location.reload();
  };

  render() {
    return (
      <div>
        <Nav reset={this.reset} />

        <MainContent
          startButton={this.state.startButton}
          startGame={this.startGame}
          ghost={this.state.ghost}
          clickGhost={this.clickGhost}
          heightLoc={this.state.heightLoc}
          widthLoc={this.state.widthLoc}
          ghostFinal={this.state.ghostFinal}
        />

        <footer>
          <p>
            <small>
              Copyright © 2015-{new Date().getFullYear()} Bernadette Estacio.
              All rights reserved
            </small>
          </p>
        </footer>
      </div>
    );
  }
}

App.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight
};

export default App;
