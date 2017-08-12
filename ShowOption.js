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


 browseKnowLedge=(knowLedgeType)=>{ 
      const { params } = this.props.navigation.state;
      this.props.navigation.navigate('ShowKnowledge', {Category: params.Category,knowLedgeType:knowLedgeType})

  }

  render() {
    const { params } = this.props.navigation.state;
    return (
       <View>
              <Text style={{fontSize:18,marginBottom:5,lineHeight:45}}>当前类别:{params.Category}</Text>

                <View style={{width:w,}}>                    
                    <TouchableOpacity style={styles.textViewStyle}  onPress={()=>this.browseKnowLedge(1)}  >
                        <Text style={styles.textStyle}>学习新知识：添加后还没有学习过的知识{this.state.AssetInfo}{'\n'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textViewStyle}  onPress={()=>this.browseKnowLedge(2)}  >
                        <Text style={styles.textStyle}>复习未熟记的知识：已超过复习时间的知识{this.state.boxRelateCount}{'\n'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textViewStyle}  onPress={()=>this.browseKnowLedge(3)}  >
                        <Text style={styles.textStyle}>提前复习未到期的知识：未达到复习时间的知识{'\n'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textViewStyle}  onPress={()=>this.browseKnowLedge(4)}  >
                        <Text style={styles.textStyle}>按顺序浏览所有知识{this.state.uploadResult}{'\n'}</Text>
                    </TouchableOpacity>
                    

       </View>
     </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // backgroundColor: '#f4f6f6',
    // marginBottom: 0,
  },
  
  textViewStyle:{
    flexDirection: 'column',
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor:"white",
    marginLeft:w*0.01,
    marginRight:w*0.01,
    marginBottom:1,
    marginTop:0,
    height:60,
    borderWidth:0,
    borderRadius:5,
  },
  textStyle:{
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 10,
    marginRight: 10,
    //padding:10,
    //borderWidth:1,
  	//borderRadius:5,
    //borderColor:"white"
}, 
})