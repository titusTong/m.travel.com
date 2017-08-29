import React from 'react';

import { ListView,WhiteSpace } from 'antd-mobile';
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
      })
    }
  }

  componentWillMount() {
    this.getData();
  }


  getData = (page=1) => {
    this.setState ({
      isLoading:true
    })
    sendFetch('tour/article/list',{page,page_size:10}, 'get')
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
    console.log(this.state.isLoading)
    // if (this.state.isBlank) {
    //   console.log(1111111);
    //   return;
    // }
    //console.log('reach end', event);

    // setTimeout(() => {
    //   //this.getData(++index);
    //
    // }, 1000);
    //this.getData(++index);
  }


  render() {
    const row = (projectModel, sectionID, rowID) => {
      return (
        <div key={rowID}>
          <div className="row" >
            <div className="row-title" >{`${projectModel.start_time}至${projectModel.end_time}`}</div>
            <div style={{ display: '-webkit-box', display: 'flex', padding: '0.3rem 0' }}>
              <img style={{ height: '1.28rem', marginRight: '0.3rem' }} src={projectModel.pic_url} alt="icon" />
              <div className="row-text" >
                <div style={{ marginBottom: '0.16rem', fontWeight: 'bold' }}>{projectModel.title}</div>
                <div><span style={{ fontSize: '0.6rem', color: '#FF6E27' }}>{projectModel.price}</span>¥</div>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: '#F5F5F9',
              height: 8,
              borderTop: '1px solid #ECECED',
              borderBottom: '1px solid #ECECED',
            }}
          />
        </div>
      );
    };

    return (
      <div style={{ margin: '0 auto', width: '96%' }}>
        <WhiteSpace size="xs" />
        <CarouselView />
        <Search />
        <div className="thisListView">
          <ListView ref="lv"
                    dataSource={this.state.dataSource}
                    renderBodyComponent={() => <MyBody />}
                    renderRow={row}
                    //renderSeparator={separator}
                    className="fortest"
                    style={{
                      height: '8rem',
                      overflow: 'auto'
                    }}
                    pageSize={4}
                    onScroll={() => { console.log('scroll'); }}
                    scrollRenderAheadDistance={500}
                    scrollEventThrottle={200}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
          />
        </div>
      </div>
    );
  }
}

export default Demo;
