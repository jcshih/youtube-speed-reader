import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './UrlInput.css';

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
    this.state = {
      url: '',
      hideError: false
    };
  }

  handleChange(e) {
    this.setState({ url: e.target.value });
  }

  handleKeyPress(e) {
    const { url } = this.state;
    const { handleSubmit, resetError } = this.props;
    if (e.key === 'Enter' && url.length > 0) {
      this.setState({
        url: '',
        hideError: false
      });
      resetError();
      handleSubmit(url);
    }
  }

  render() {
    const { error, autoFocus } = this.props;
    const hideErrorClass = this.state.hideError ? 'hidden' : '';

    return (
      <div>
        <input
            className={styles.input}
            autoFocus={autoFocus}
            placeholder="Enter a YouTube url."
            type="text"
            value={this.state.url}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)} />
        {error
          ? (
            <div
                className={classNames(styles.error, hideErrorClass)}
                onClick={() => this.setState({ hideError: true })}>
              {error}
            </div>
          ) : null}
      </div>
    );
  }
}

export default UrlInput;
