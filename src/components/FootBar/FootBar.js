
import React from 'react';
import { TabBar, Icon } from 'antd-mobile';
import Demo from '../../routes/Index/Index';
import Mine from '../../routes/Mine/Mine';

class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
    };
  }

  render() {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={this.state.hidden}
      >
        <TabBar.Item
          title="活动"
          key="活动"
          icon={
            <Icon type={require('../../assets/earth-c.svg')} />
          }
          selectedIcon={
            <Icon type={require('../../assets/earth.svg')} />
          }
          selected={this.state.selectedTab === 'blueTab'}
          // badge={1}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}
          data-seed="logId"
        >
          <Demo />
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon type={require('../../assets/account.svg')} />}
          selectedIcon={<Icon type={require('../../assets/account-c.svg')} />}
          title="我的"
          key="我的"
          selected={this.state.selectedTab === 'yellowTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'yellowTab',
            });
          }}
        >
          <Mine />
        </TabBar.Item>
      </TabBar>
    );
  }
}

export default TabBarExample;
