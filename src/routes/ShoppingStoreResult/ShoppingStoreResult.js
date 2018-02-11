import React from 'react';
import {Result, Icon} from 'antd-mobile';
import getParams from '../../utils/getParams';
import './ShoppingStoreResult.css';

export default class ShoppingStoreResult extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      type:'check-circle',
      fill:'#1F90E6',
      title:'提交成功',
      message:'已成功提交该内容,可关闭页面！'
    }
  }
  componentWillMount () {
    if(getParams('id')==='0') {
      this.setState({
        type:'cross-circle-o',
        fill:'#F13642',
        title:'提交失败',
        message:'提交失败，请返回重试！'
      })
    }
  }

  render () {
    return (
      <div >
        <Result
          style={{ margin:'60% 0' }}
          img={<Icon type={this.state.type} className="spe" style={{ fill: this.state.fill }} />}
          title={this.state.title}
          message={this.state.message}
        />
      </div>
    )
  }
}
