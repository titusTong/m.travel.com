import React from 'react';

import { ListView,WhiteSpace } from 'antd-mobile';
import CarouselView from '../../components/Carousel/CarouselView';
import Search from '../../components/Search/Search';
import './Index.css'

function MyBody(props) {
  return (
    <div className="am-list-body my-body" >
      {props.children}
    </div>
  );
}

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',// 这个反时间：例如：2017-09-01至2017-09-03
    des: '不是所有的兼职汪都需要风吹日晒',// 这个是标题
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
];
let index = data.length - 1;

const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.dataBlob = {};
    this.sectionIDs = [];
    this.rowIDs = [];
    this.genData = (pIndex = 0) => {
      for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;
        this.sectionIDs.push(sectionName);
        this.dataBlob[sectionName] = sectionName;
        this.rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
          const rowName = `S${ii}, R${jj}`;
          this.rowIDs[ii].push(rowName);
          this.dataBlob[rowName] = rowName;
        }
      }
      // new object ref
      this.sectionIDs = [].concat(this.sectionIDs);
      this.rowIDs = [].concat(this.rowIDs);
    };

    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
      isLoading: true,
    };
  }

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.refs.lv.refs.listview.scrollTo(0, 120), 800); // also work
    // setTimeout(() => this.refs.lv.scrollTo(0, 120), 800); // recommend usage

    // simulate initial Ajax
    setTimeout(() => {
      this.genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
        isLoading: false,
      });
    }, 600);
  }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.genData(++pageIndex);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    // const separator = (sectionID, rowID) => (
    //   <div key={`${sectionID}-${rowID}`}
    //        style={{
    //          backgroundColor: '#F5F5F9',
    //          height: 8,
    //          borderTop: '1px solid #ECECED',
    //          borderBottom: '1px solid #ECECED',
    //        }}
    //   />
    // );
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID}>
          <div className="row" >
            <div className="row-title" >{obj.title}</div>
            <div style={{ display: '-webkit-box', display: 'flex', padding: '0.3rem 0' }}>
              <img style={{ height: '1.28rem', marginRight: '0.3rem' }} src={obj.img} alt="icon" />
              <div className="row-text" >
                <div style={{ marginBottom: '0.16rem', fontWeight: 'bold' }}>{obj.des}</div>
                <div><span style={{ fontSize: '0.6rem', color: '#FF6E27' }}>35</span>¥</div>
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
