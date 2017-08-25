import React from 'react';

import { SearchBar, WhiteSpace } from 'antd-mobile';
import './Search.css'

export default class Search extends React.Component {
  state = {
    value: '',
    focused: false,
  };
  onSubmit= (value) => {
    console.log(value);
    this.setState({ value });
  };
  clear = () => {
    this.setState({ value: '' });
  };
  onChange = (value) => {
    this.setState({ value })
  }
  render() {
    return (<div>
      <SearchBar
        value={this.state.value}
        placeholder="搜索活动"
        onSubmit={this.onSubmit}
        onCancel={this.clear}
        showCancelButton
        onChange={this.onChange}
      />
    </div>);
  }
}
