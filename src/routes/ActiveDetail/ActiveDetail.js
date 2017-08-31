
import React from 'react';
import {WhiteSpace, Button, Card} from 'antd-mobile';
import CarouselView from '../../components/Carousel/CarouselView';
import DetailList from '../../components/DetailList/DetailList';


export default class ActiveDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loadingNow:false,
      disabledClick:false,
      btnValue:'我要报名',
      btnbak:'#108ee9',
    }
  }
  componentWillMount () {

  }
  componentDidMount () {

  }

  handleSubmit = () => {
    this.setState({
      loadingNow:true,
      disabledClick:true,
      btnValue:'报名中...',
      btnbak:'#ddd'
    })

    setTimeout(()=>{
      this.setState({
        loadingNow:false,
        disabledClick:false,
        btnValue:'我要报名',
        btnbak:'#108ee9',
      })
    },2000)
  }
  render () {
    return (
      <div style={{ width:'100%' }} >
        <WhiteSpace size="xs" />
        <CarouselView />
        <Card style={{ borderRadius:0, marginTop:10 }} >
          <Card.Header
            title="领队姓名"
            thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
            thumbStyle={{ width:'0.82rem', height:'0.82rem', borderRadius:'50%' }}
            extra={<span>领队</span>}
          />
          <Card.Body>
            <div>领队电话</div>
            <div>领队微信</div>
            <div>出发时间</div>
            <div>出发地点</div>
            <div>活动时间</div>
            <div>活动标题</div>
          </Card.Body>
        </Card>
        <DetailList />
        <div style={styleSheet.btnBar} >
          <Button style={{
                          background:this.state.btnbak,
                          color:'#fff',
                          width:'50%',
                          margin:'auto'
                        }}
                  onClick={this.handleSubmit}
                  disabled={this.state.disabledClick}
                  loading={this.state.loadingNow}
                  activeStyle={{ background:'#fff', color:'#ddd' }}
          >{this.state.btnValue}</Button>
        </div>
      </div>
    )
  }
}



const styleSheet = {
  btnBar:{
    backgroundColor:'#fff',
    height:'1rem',
    position:'fixed',
    bottom:0,
    left:0,
    zIndex:'100',
    width:'100%',
    display:'flex',

  }
}
