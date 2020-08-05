import React, {Component} from "react";
import "./Hangman.css";
import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";
import {randomWord} from './words.js'

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.restart = this.restart.bind(this);
  }

  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key={ltr}
      >
        {ltr}
      </button>
    ));
  }

  restart() {
    this.setState({
      nWrong: 0,
      guessed: new Set(), 
      answer: randomWord() 
    })
  }

  render() {
    let altText = `${this.state.nWrong} wrong out of ${this.props.maxWrong}`
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={altText}/>
        <p>Number of wrong guesses: {this.state.nWrong}/6</p>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        <p className='Hangman-btns'>
          {this.state.nWrong < this.props.maxWrong
          ? this.generateButtons()
          : 'You lose!'}
        </p>
        <button id="Restart" onClick={this.restart}>Restart!</button>
      </div>
    );
  }
}

export default Hangman;
