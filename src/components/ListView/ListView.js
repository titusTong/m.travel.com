import React from 'react';

import { List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;


export default class ListView extends React.Component {
  state = {
    disabled: false,
  }
  handleLongPress = (e) => {
    console.log('longpress toggled', e);
  }
  render() {
    return (<div>

      <List className="my-list">
        <Item
          arrow="horizontal"
          multipleLine
          onClick={() => {}}
          platform="android"
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
        >
          Title <Brief>subtitle</Brief>
        </Item>
      </List>

    </div>);
  }
}

