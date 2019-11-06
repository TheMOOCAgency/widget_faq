import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import "./developed-faq.css";
import topics from "../../../topics";

const CssTextField = withStyles({
  root: {
    backgroundColor: "white",
    borderRadius: "5px",
    marginTop: "15px",
    fontFamily: "Montserrat",
    "& .MuiInput-underline:after": {
      borderBottomColor: "transparent"
    },
    "& .MuiOutlinedInput-root": {
      width: "210px",
      height: "40px",
      "& fieldset": {
        borderColor: "transparent !important"
      },
      "& :hover fieldset": {
        borderColor: "transparent !important"
      },
      "& .Mui-focused fieldset": {
        borderColor: "transparent !important"
      }
    }
  }
})(TextField);

// SET TO "fr" FOR localhost:3000 RENDER, AS IT GET LANGUAGE PARAMETER FROM WINDOW
let language = window.lang || "fr";
const placeholder = {fr: "J'ai besoin d'aide avec...", en: "Hey there! I need help with..."}

class DevelopedFaq extends Component {
  state = {
    isLoading: true,
    textFieldValue: "",
    topicsList: {},
    filteredList: []
  };

  componentDidMount() {
    this.fetchList();
  }

  fetchList = () => {
    if (window.props) {
      this.setState({ topicsList: window.props, isLoading: false }
      );
    } else {
      this.setState({ topicsList: topics, isLoading: false }
      );
    }
  };

  renderTopicsList = () => {
    const { filteredList, textFieldValue, topicsList } = this.state;
    let list = null;
    let newList = [];

    // GET A CLEAN AND ORDERED LIST OF ALL TOPICS
    if (!textFieldValue) {
      topicsList[language].map(mainTopic => {
        return mainTopic.content.map(topic => {
          return topic.content.map(subTopic => {
            if (subTopic.question) {
              newList.push(subTopic);
            }
          });
        });
      });
    }

    // SELECT BETWEEN FULL OR FILTERED LIST
    if (!textFieldValue) {
      list = newList;
    } else {
      list = filteredList;
    }

    // RENDER AN ORDERED LIST
    return (
      <ul id="ul">
        {textFieldValue && filteredList.length === 0 ? (
          <div className="no-result">No result</div>
        ) : (
          list.map((topic, index) => {
            return (
              <li key={topic.questionId}>
                <div className="topic-index">{`${index + 1}. `}</div>
                <a
                  href={`/tma_apps/faq?questionId=${topic.questionId}#${topic.questionId}`}
                >
                  {topic.question}
                </a>
              </li>
            );
          })
        )}
      </ul>
    );
  };

  filterTopics = () => {
    const { textFieldValue, topicsList } = this.state;
    let newList = [];
    topicsList[language].map(mainTopic =>
      mainTopic.content.map(topic =>
        topic.content.map(subTopic => {
          if (
            newList.indexOf(subTopic) === -1 &&
            subTopic.response
              .toLowerCase()
              .includes(textFieldValue.toLowerCase())
          ) {
            newList.push(subTopic);
          }
        })
      )
    );
    this.setState({ filteredList: newList });
    newList = [];
  };

  renderSearchBar = () => {
    return (
      <CssTextField
        value={this.state.textFieldValue}
        onChange={this.handleTextFieldChange}
        className="search-bar"
        placeholder={placeholder[language]}
        variant="outlined"
        id="custom-css-outlined-input"
      />
    );
  };

  handleTextFieldChange = e => {
    this.setState(
      {
        textFieldValue: e.target.value
      },
      () => this.filterTopics()
    );
  };

  render() {
    if (!this.state.isLoading) {
      return (
        <div className="developed-faq shadow">
          <div className="faq-header">
            Help
            <i
              className="fa fa-minus fas"
              onClick={() => this.props.toggleFAQ()}
            />
            <>{this.renderSearchBar()}</>
          </div>
          <div className="questions-list">
            <div className="title">Topics</div>
            <>{this.renderTopicsList()}</>
          </div>
        </div>
      );
    }
    return <div></div>;
  }
}

export default DevelopedFaq;
