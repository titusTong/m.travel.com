import React from 'react';
import { WhiteSpace } from 'antd-mobile';
import CardView from '../../components/CardView/CardView';

export default class Mine extends React.Component {
  render () {
    return (
      <div style={{ margin: '0 auto', width: '96%' }}>
        <WhiteSpace size="xs" />
        <CardView />

      </div>
    )
  }
}
