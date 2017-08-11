import React, { Component } from 'react';
import { 
  AppRegistry, 
  StyleSheet,  
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  AsyncStorage
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import ShowKnowledge from './ShowKnowledge';

var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  


export default class ShowOption extends Component  {
constructor(props) {  
    super(props); 
     this.state = {
    }; 
  }  


 browseKnowLedge=()=>{ 
      const { params } = this.props.navigation.state;
      this.props.navigation.navigate('ShowKnowledge', {Category: params.Category})

  }

  render() {
    const { params } = this.props.navigation.state;
    return (
       <View>
              <Text style={{fontSize: 25,marginBottom:5,lineHeight:45}}>当前类别:{params.Category}</Text>
              <View style={{width:0.5*w,height:50,marginLeft:0.2*w,marginBottom:2}}>
                        <Button           
                            onPress={this.browseKnowLedge}
                            title="按顺序浏览知识"                
                            color="#1DBAF1"                        
                            accessibilityLabel=""
                            />
              </View>
              <View style={{width:0.5*w,height:50,marginLeft:0.2*w,marginBottom:2}}>
                        <Button           
                            onPress={this.browseKnowLedge}
                            title="按顺序浏览知识"                
                            color="#1DBAF1"                        
                            accessibilityLabel=""
                            />
              </View>
              <View style={{width:0.5*w,height:50,marginLeft:0.2*w,marginBottom:2}}>
                        <Button           
                            onPress={this.browseKnowLedge}
                            title="按顺序浏览知识"                
                            color="#1DBAF1"                        
                            accessibilityLabel=""
                            />
              </View>
              <View style={{width:0.5*w,height:50,marginLeft:0.2*w,marginBottom:2}}>
                        <Button           
                            onPress={this.browseKnowLedge}
                            title="按顺序浏览知识"                
                            color="#1DBAF1"                        
                            accessibilityLabel=""
                            />
              </View>
     </View>
    );
  }
}
