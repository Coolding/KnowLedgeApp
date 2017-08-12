/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  AsyncStorage
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import Browse from './Browse';
import Search from './Search';
import Calc from './Calc';
import Category from './Category';
import ShowOption from './ShowOption';
import ShowKnowledge from './ShowKnowledge';



var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高
global.glTopCategory='';  //存储第一层级(根目录)的分类名称  
global.glCategoryCountInfo=new Array();  //存储云端数据库返回来的上下层目录对应信息，以及各分类下不同熟悉程度的知识数量统计


export default class HomeScreen extends Component {

  constructor(props) {  
    super(props); 
     this.state = {
      selectedTab:'Browse',
    };   
  }  

static navigationOptions = {
    title: '浏览',//在导航中显示的标题内容
    tabBarVisible:true,
  };

  render() {
    return (
       <View style={{flex: 1}}>
        <TabNavigator   Style={styles.tab} >

            <TabNavigator.Item
            selected={this.state.selectedTab === 'Browse'}
            title="浏览"
            renderIcon={() => <Image source={require('./assets/1.png')} style={styles.iconStyle}/>}
            renderSelectedIcon={() => <Image source={require('./assets/12.png')} style={styles.iconStyle}/>}
            badgeText=""
            onPress={() => this.setState({ selectedTab: 'Browse' })}>    
            <Browse {...this.props}  ref={e=>this.Browse=e}/>
            </TabNavigator.Item>


            
            <TabNavigator.Item                    
            selected={this.state.selectedTab === 'Search'}
            title="搜索"
            renderIcon={() => <Image source={require('./assets/2.png')} style={styles.iconStyle}/>}
            renderSelectedIcon={() => <Image source={require('./assets/22.png')}  style={styles.iconStyle}/>}
            
            onPress={() => this.setState({ selectedTab: 'Search' })}>     
            <Search {...this.props}  ref={e=>this.Search=e}/>            
            </TabNavigator.Item>


           
            <TabNavigator.Item                        
            selected={this.state.selectedTab === 'Calc'}
            title="统计"
            renderIcon={() => <Image source={require('./assets/3.png')} style={styles.iconStyle}/>}
            renderSelectedIcon={() => <Image source={require('./assets/32.png')}  style={styles.iconStyle}/>}
            onPress={() => this.setState({ selectedTab: 'Calc' })}>            
            <Calc {...this.props}  ref={e=>this.Calc=e}/>
            </TabNavigator.Item>

 
          </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    position:'absolute',
    width:w,
    bottom:0,
    
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  tab: {
        height: 100,
        backgroundColor: '#eee',
        alignItems: 'center'
    },
    iconStyle:{                  //底部tab导航栏样式
       width:26,
       height:26,
   },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const KnowLedgeApp = StackNavigator({
  Home: { screen: HomeScreen },
  Calc:{ screen: Calc },
  Category:{ screen: Category },
  ShowOption:{ screen: ShowOption },
  ShowKnowledge:{ screen: ShowKnowledge },
  Browse:{ screen: Browse },
});


AppRegistry.registerComponent('KnowLedgeApp', () => KnowLedgeApp);
