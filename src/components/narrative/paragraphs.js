import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { changeStateViaURLQuery } from "../../actions/loadData";

@connect()
export class LinkedParagraph extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      timeoutRef: null
    };
  }
  static defaultProps = {
    delay: 500
  }
  delayedAction = () => {
    const ref = setTimeout(
      () => {this.props.dispatch(changeStateViaURLQuery(this.props.query));},
      this.props.delay
    );
    this.setState({timeoutRef: ref});
  }
  cancelAction = () => {
    /* i'm guessing that it's cheaper to clear a timeout that no longer exists than it is to have another setState call */
    clearTimeout(this.state.timeoutRef);
  }
  render() {
    return (
      <div
        className={"linkedParagraph"}
        onMouseOver={this.delayedAction}
        onMouseLeave={this.cancelAction}
        dangerouslySetInnerHTML={this.props.content}
      />
    );
  }
}
