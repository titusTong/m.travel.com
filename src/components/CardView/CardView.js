import React from 'react';

import { Card, WhiteSpace } from 'antd-mobile';
import ListView from '../ListView/ListView';


export default class CardView extends React.Component {
  render () {
    return (
      <div>
        <Card full>
          <Card.Header
            title="This is title"
            thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
            thumbStyle={{ width:'1rem', height:'1rem', borderRadius:'50%' }}
            extra={<span>this is extra</span>}
          />
          <Card.Body>
            <div>
              <ListView />
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  }
}
