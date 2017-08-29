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

static navigationOptions = {
     header:null
  };

 browseKnowLedge=(knowLedgeType)=>{ 
      const { params } = this.props.navigation.state;
      this.props.navigation.navigate('ShowKnowledge', {Category: params.Category,knowLedgeType:knowLedgeType})

  }

  render() {
    const { params } = this.props.navigation.state;
    return (
       <View>
            <View style={styles.header}>  
               <Text style={styles.headtitle}>{params.Category}</Text> 
            </View>  
             

                <View style={{width:w,}}>                    
                    <TouchableOpacity style={styles.textViewStyle}  onPress={()=>this.browseKnowLedge(1)}  >
                        <Text style={styles.textStyle}>浏览还未学习过的知识{this.state.AssetInfo}</Text>
                         <Text style={{backgroundColor:"white",color:'#A7A7A7',fontSize:15,marginLeft:5,marginRight:5,marginBottom:5,lineHeight:30}}>  按添加时间从早到晚排序</Text>
                    </TouchableOpacity>

                    

                    <TouchableOpacity style={styles.textViewStyle}  onPress={()=>this.browseKnowLedge(2)}  >
                        <Text style={styles.textStyle}>复习未熟记的知识（已超过复习时间）{this.state.boxRelateCount}</Text>
                        <Text style={{backgroundColor:"white",color:'#A7A7A7',fontSize:15,marginLeft:5,marginRight:5,marginBottom:5,lineHeight:30}}>  按复习时间从近到远</Text>
                    
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textViewStyle}  onPress={()=>this.browseKnowLedge(3)}  >
                        <Text style={styles.textStyle}>提前复习未到期的知识</Text>
                        <Text style={{backgroundColor:"white",color:'#A7A7A7',fontSize:15,marginLeft:5,marginRight:5,marginBottom:5,lineHeight:30}}>  按复习时间从近到远</Text>
                    
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textViewStyle}  onPress={()=>this.browseKnowLedge(4)}  >
                        <Text style={styles.textStyle}>按顺序浏览所有知识{this.state.uploadResult}</Text>
                        <Text style={{backgroundColor:"white",color:'#A7A7A7',fontSize:15,marginLeft:5,marginRight:5,marginBottom:5,lineHeight:30}}>  按添加时间从早到晚排序</Text>
                    
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
    height:70,
    borderWidth:0,
    borderRadius:5,
  },header: { 
    flexDirection: 'row',
    height: 40, 
    backgroundColor: '#12B7F5', 
    justifyContent: 'center', 
    width:w
}, 
headtitle: { 
    textAlign:'center',
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#FFFFFF', 
}, 
  textStyle:{
    fontSize: 17,
    textAlign: 'left',
    marginLeft: 10,
    marginRight: 10,
    //padding:10,
    //borderWidth:1,
  	//borderRadius:5,
    //borderColor:"white"
}, 
})