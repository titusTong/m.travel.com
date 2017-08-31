
import React from 'react';
import {WhiteSpace, Button} from 'antd-mobile';
import CarouselView from '../../components/Carousel/CarouselView';



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
