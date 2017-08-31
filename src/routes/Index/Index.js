import React from 'react';

import { ListView,WhiteSpace,Badge,ActivityIndicator } from 'antd-mobile';
import CarouselView from '../../components/Carousel/CarouselView';
import Search from '../../components/Search/Search';
import sendFetch from '../../utils/fetch';
import './Index.css'

function MyBody(props) {
  return (
    <div className="am-list-body my-body" >
      {props.children}
    </div>
  );
}

let index = 1;


class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      isBlank:false,
      isLoading: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2)=>row1 !== row2,
      }),
      totalHeight:0
    }
  }

  componentWillMount() {
    this.getData(0);
  }

  componentDidMount () {
    let search = document.querySelector('.am-search').clientHeight;
    let footBar = document.querySelector('.am-tab-bar-bar').clientHeight;
    let totalHeight = search + footBar;
    this.setState({totalHeight})
  }


  getData = (page=1) => {
    this.setState ({
      isLoading:true
    })
    sendFetch('tour/article/list',{page,page_size:20}, 'get')
      .then(data=>{
        if(data.code >= 0) {
          if(data.lists.length === 0) {
            this.setState({ isBlank : true })
          }
          this.setState({
            isLoading:false,
            data:this.state.data.concat(data.lists),
            dataSource:this.getDataSource(this.state.data)
          })
        }
      })
  }

  getDataSource(items) {
    return this.state.dataSource.cloneWithRows(items);
  }

  onEndReached = (event) => {
    if(this.state.isLoading) {
      return
    }
    if(this.state.isBlank) {
      return
    }
    this.getData(++index);
  }


  render() {
    const row = (projectModel, sectionID, rowID) => {
      return (
        <div key={rowID}>
          <div className="row" >
            <div className="row-title" >
              <span style={{ marginLeft:'0.3rem', color:'#FF6E27',marginRight:'0.3rem', fontSize:34 }} >¥ {projectModel.price}</span>
              {`${projectModel.start_time}至${projectModel.end_time}`}
              <Badge className="tagPosition" text={'名额紧缺'} hot={true} />
            </div>
            <div>
              <a style={{ display: '-webkit-box', display: 'flex',height:'3rem' }} href={`#/ActiveDetail?id=${projectModel.id}`} ><img style={{ width:'100%' }} src={projectModel.pic_url} alt="icon" /></a>
            </div>
          </div>
          <div
            style={{
              backgroundColor: '#ccc',
              height: 10,
              borderTop: '1px solid #ECECED',
              borderBottom: '1px solid #ECECED',
            }}
          />
        </div>
      );
    };

    return (
      <div style={{ margin: '0 auto', width: '100%' }}>
        <WhiteSpace size="xs" />
        <Search />
        <div className="thisListView">
          <ListView ref="lv"
                    dataSource={this.state.dataSource}
                    renderBodyComponent={() => <MyBody />}
                    renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                      {this.state.isLoading ? <div className="loading-example">
                        <ActivityIndicator
                          text="Loading..."
                        />
                      </div> : '没有更多路线'}
                    </div>)}
                    renderRow={row}
                    //renderSeparator={separator}
                    className="fortest"
                    style={{
                      height: document.documentElement.clientHeight-this.state.totalHeight,
                      overflow: 'auto'
                    }}
                    pageSize={10}
                    scrollRenderAheadDistance={500}
                    scrollEventThrottle={200}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={15}
          />
        </div>
      </div>
    );
  }
}

export default Demo;
