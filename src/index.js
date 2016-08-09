import React, {Component, PropTypes} from 'react';
import createTruncate from 'truncate-dom';
import stripTags from 'striptags';

export default class Truncate extends Component {

  static propTypes = {
    html: PropTypes.string,
    line: PropTypes.number,
    truncateText: PropTypes.string,
    isStripTags: PropTypes.bool,
    allowedTags: PropTypes.string,
  };

  static defaultProps = {
    html: '',
    line: 1,
    truncateText: '...',
    isStripTags: true,
    allowedTags: '<em>',
  };

  componentDidMount() {
    this.truncate = createTruncate(this.refs.scope);
    this.forceUpdate();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.forceUpdate();
  };

  getRenderHtml() {
    const {html, line, truncateText, isStripTags, allowedTags} = this.props;
    let stripedHtml = html;

    if (isStripTags) {
      stripedHtml = stripTags(html, allowedTags);
    }

    return this.truncate(stripedHtml, line, truncateText);
  }

  render() {
    let html = '';
    if (this.refs.scope) {
      html = this.getRenderHtml();
    }

    return (
      <div
        {...this.props}
        ref="scope"
        dangerouslySetInnerHTML={{__html: html}}
      />
    );
  }

}
