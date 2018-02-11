import React from 'react';
import { WhiteSpace, WingBlank, Picker, List, DatePicker, InputItem, Button, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import request from '../../utils/request';
import './ShoppingStore.css';

const outlets = [
  {
    label:'BICESTER VILLAGE (near London)',
    value:'BICESTER VILLAGE (near London)'
  },{
    label:'KILDARE VILLAGE (near Dublin)',
    value:'KILDARE VILLAGE (near Dublin)'
  },{
    label:'LA VALLEE VILLAGE(near Paris)',
    value:'LA VALLEE VILLAGE(near Paris)'
  },{
    label:'WERTHEIM VILLAGE (near Frankfurt)',
    value:'WERTHEIM VILLAGE (near Frankfurt)'
  },{
    label:'INGOLSTADT VILLAGE (near Munich)',
    value:'INGOLSTADT VILLAGE (near Munich)'
  },{
    label:'MAASMECHELEN VILLAGE (near Brussels/Antwerp/Cologne)',
    value:'MAASMECHELEN VILLAGE (near Brussels/Antwerp/Cologne)'
  },{
    label:'FIDENZA VILLAGE (near Milan/Bologna)',
    value:'FIDENZA VILLAGE (near Milan/Bologna)'
  },{
    label:'LA ROCA VILLAGE(near Barcelona)',
    value:'LA ROCA VILLAGE(near Barcelona)'
  },{
    label:'LAS ROZAS VILLAGE (near Madrid)',
    value:'LAS ROZAS VILLAGE (near Madrid)'
  }
];
const sexArr = [
  {label:'男', value:'男'},
  {label:'女', value:'女'}
];
const payTypeArr = [
  {label:'微信', value:'微信'},
  {label:'支付宝', value:'支付宝'}
];

function formatDate(date) {
  /* eslint no-confusing-arrow: 0 */
  const pad = n => n < 10 ? `0${n}` : n;
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return `${dateStr} ${timeStr}`;
}


class ShoppingStoreComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value:null,
      visible:false,
      content:'',
      buttonLoading:false,

    }
  }
  componentWillMount () {

  }
  componentDidMount () {

  }
  onSubmit = () => {
    this.setState({
      buttonLoading:true
    })
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        let data = this.props.form.getFieldsValue();
        data.date = data.date.format('YYYY-MM-DD HH:mm');
        let option = {
          outlet_name:data.outlet[0],
          date:data.date.split(' ')[0],
          time:data.date.split(' ')[1],
          tourist_num:data.touristNum,
          guide_num:data.driverAndGuideNum,
          guide_name:data.guideNameForChina,
          guide_name_py:data.guideNameForEng,
          guide_gender:data.guideSex[0],
          guide_mobile:data.guideTel,
          guide_weixin:data.guideWeChat,
          guide_email:data.guideEmail,
          pay_method:'微信',
        }
        request('tour/collection/add',option, 'GET')
          .then((data)=> {
            if(data.data.code >= 0) {
              location.href = '#/ShoppingStoreResult?id=1';
            } else {
              location.href = '#/ShoppingStoreResult?id=0';
            }
          })
      } else {
        if(error.outlet) {
          this.setState({
            visible:true,
            content:'outlet'
          })
        } else if(error.date) {
          this.setState({
            visible:true,
            content:'日期'
          })
        } else if(error.guideSex) {
          this.setState({
            visible:true,
            content:'导游性别'
          })
        }
        this.setState({
          buttonLoading:false
        })
      }
    });
  }
  onClose = () => {
    this.setState({
      visible:false
    })
  }


  render () {
    const { getFieldProps, getFieldError } = this.props.form;
    const {emailErr} = this.state;
    return (
      <div className='shoppingStore'>
        <WingBlank size="md">
          <WhiteSpace size="lg" />
          <Picker data={outlets} cols={1} {...getFieldProps('outlet',{
            rules: [
              { required: true, message: '必须选择一个购物店' }
            ],
          })} className="forss"
            error={!!getFieldError('outlet')}
          >
            <List.Item arrow="horizontal">选择Outlet</List.Item>
          </Picker>
          <WhiteSpace size="xs" />
          <DatePicker
            {...getFieldProps('date', {
              rules: [
                { required: true, message: '必须选择一个日期！' }
              ],
            })}
            error={!!getFieldError('date')}
          >
            <List.Item arrow="horizontal">日期</List.Item>
          </DatePicker>
          <WhiteSpace size="xs" />
          <InputItem
            {...getFieldProps('touristNum', {
              rules: [
                { required: true, message: '必须填写游客人数！' }
              ],
            })}
            type='money'
            extra='人'
            moneyKeyboardAlign='right'
            clear
            error={!!getFieldError('touristNum')}
          >客人人数</InputItem>
          <WhiteSpace size="xs" />
          <InputItem
            {...getFieldProps('driverAndGuideNum', {
              rules: [
                { required: true, message: '必须填写司机和导游人数！' }
              ],
            })}
            type='money'
            extra='人'
            moneyKeyboardAlign='right'
            clear
            labelNumber={8}
            error={!!getFieldError('driverAndGuideNum')}
          >司机+导游人数</InputItem>
          <WhiteSpace size="xs" />
          <InputItem
            {...getFieldProps('guideNameForChina', {
              rules: [
                { required: true, message: '必须填写导游中文姓名' }
              ],
            })}
            clear
            labelNumber={9}
            error={!!getFieldError('guideNameForChina')}
          >导游姓名(中文)</InputItem>
          <WhiteSpace size="xs" />
          <InputItem
            {...getFieldProps('guideNameForEng', {
              rules: [
                { required: true, message: '必须填写导游姓名的拼音' }
              ],
            })}
            clear
            labelNumber={9}
            error={!!getFieldError('guideNameForEng')}
          >导游姓名(拼音)</InputItem>
          <WhiteSpace size="xs" />
          <Picker data={sexArr} cols={1} {...getFieldProps('guideSex',{
            rules: [
              { required: true, message: '必须选择导游性别' }
            ],
          })} className="forss"
            error={!!getFieldError('guideSex')}
          >
            <List.Item arrow="horizontal">导游性别</List.Item>
          </Picker>
          <WhiteSpace size="xs" />
          <InputItem
            {...getFieldProps('guideTel', {
              rules: [
                { required: true, message: '必须填写导游电话' }
              ],
            })}
            type='number'
            clear
            labelNumber={12}
            error={!!getFieldError('guideTel')}
          >导游电话(含国际区号)</InputItem>
          <WhiteSpace size="xs" />
          <InputItem
            {...getFieldProps('guideWeChat', {
              rules: [
                { required: true, message: '必须填写导游微信' }
              ],
            })}
            clear
            labelNumber={16}
            error={!!getFieldError('guideWeChat')}
          >导游微信(涉及付款，正确填写)</InputItem>
          <WhiteSpace size="xs" />
          <InputItem
            {...getFieldProps('guideEmail', {
              rules: [
                { required: true, message: '必须填写导游邮箱' },
                { type:'email'}
              ],
            })}
            clear
            error={!!getFieldError('guideEmail')}
          >导游Email</InputItem>
          <WhiteSpace size="xs" />
          <Button className="shoppingSubmit" type="primary" onClick={this.onSubmit} >提交</Button>


          </WingBlank>
          <Modal
            visible={this.state.visible}
            transparent
            maskClosable={false}
            onClose={this.onClose}
            title="Warning"
            footer={[{ text: 'Ok', onPress: () => { this.onClose(); } }]}
            wrapProps={{ onTouchStart: this.onWrapTouchStart }}>
            <p>请选择{this.state.content}</p>
          </Modal>
      </div>
    )
  }

}





const ShoppingStore = createForm()(ShoppingStoreComponent);

export default ShoppingStore;
