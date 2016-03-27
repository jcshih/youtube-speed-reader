import React, { Component, PropTypes } from 'react';

class UrlInput extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    resetError: PropTypes.func.isRequired,
    error: PropTypes.string,
    autoFocus: PropTypes.bool
  };

  static defaultProps = {
    autoFocus: false
  };

  constructor(props) {
    super(props);
    this.state = { url: '' };
  }

  handleChange(e) {
    this.setState({ url: e.target.value });
  }

  handleKeyPress(e) {
    const { url } = this.state;
    const { handleSubmit, resetError } = this.props;
    if (e.key === 'Enter' && url.length > 0) {
      this.setState({ url: '' });
      resetError();
      handleSubmit(url);
    }
  }

  render() {
    const { error, autoFocus } = this.props;

    return (
      <div>
        <input
            autoFocus={autoFocus}
            type="text"
            value={this.state.url}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)} />
        {error ? error : null}
      </div>
    );
  }
}

export default UrlInput;
