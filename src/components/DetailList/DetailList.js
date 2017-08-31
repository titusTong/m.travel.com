
import React from 'react';

import { Accordion, List, Icon } from 'antd-mobile';
import './DetailList.css';

export default class DetailList extends React.Component {
  onChange = (key) => {
    console.log(key);
  }
  render() {
    return (
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <Accordion className="my-accordion" onChange={this.onChange}>
          <Accordion.Panel header={<div><Icon style={{ marginTop:'0.22rem',float:'left',marginRight:'0.3rem' }} type={require('../../assets/1.svg')} /><span style={{ float:'left' }}>活动概述</span></div>}>
            <List className="my-list">
              <List.Item>Content 1</List.Item>
              <List.Item>Content 2</List.Item>
              <List.Item>Content 3</List.Item>
            </List>

          </Accordion.Panel>
          <Accordion.Panel header={<div><Icon style={{ marginTop:'0.22rem',float:'left',marginRight:'0.3rem' }} type={require('../../assets/2.svg')} /><span style={{ float:'left' }}>基本信息</span></div>} className="pad">this is panel content2 or other</Accordion.Panel>
          <Accordion.Panel header={<div><Icon style={{ marginTop:'0.22rem',float:'left',marginRight:'0.3rem' }} type={require('../../assets/3.svg')} /><span style={{ float:'left' }}>行程安排</span></div>} className="pad">
            Text text text text text text text text text text text text text text text
          </Accordion.Panel>
          <Accordion.Panel header={<div><Icon style={{ marginTop:'0.22rem',float:'left',marginRight:'0.3rem' }} type={require('../../assets/4.svg')} /><span style={{ float:'left' }}>费用说明</span></div>} className="pad">Text text text text text text text text text text text text text text text</Accordion.Panel>
          <Accordion.Panel header={<div><Icon style={{ marginTop:'0.22rem',float:'left',marginRight:'0.3rem' }} type={require('../../assets/5.svg')} /><span style={{ float:'left' }}>报名须知</span></div>} className="pad">Text text text text text text text text text text text text text text text</Accordion.Panel>
          <Accordion.Panel header={<div><Icon style={{ marginTop:'0.22rem',float:'left',marginRight:'0.3rem' }} type={require('../../assets/6.svg')} /><span style={{ float:'left' }}>报名列表</span></div>} className="pad">Text text text text text text text text text text text text text text text</Accordion.Panel>
        </Accordion>
      </div>
    );
  }
}
