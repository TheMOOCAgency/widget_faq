import React, { Component } from "react";
import "./faq.css";
import HiddenFaq from "./hidden-faq/HiddenFaq";
import DevelopedFaq from "./developed-faq/DevelopedFaq";

class Faq extends Component {
  state = { displayFAQ: false };

  toggleFAQ = () => {
    this.setState({ displayFAQ: !this.state.displayFAQ });
    console.log(window.lang)
  };

  renderFAQ = () => {
    const { displayFAQ } = this.state;
    if (displayFAQ) {
      return (
        <div className="faq-display">
          <DevelopedFaq toggleFAQ={this.toggleFAQ} />
        </div>
      );
    } else {
      return (
        <div className="faq-hidden" onClick={() => this.toggleFAQ()}>
          <HiddenFaq />
        </div>
      );
    }
  };

  render() {
    return <div className="Faq">{this.renderFAQ()}</div>;
  }
}

export default Faq;
