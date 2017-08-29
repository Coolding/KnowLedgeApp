import React, { Component } from 'react';
import { 
  AppRegistry, 
  StyleSheet,  
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import ShowKnowledge from './ShowKnowledge';

var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  
var CurrentKnowLedgeIndex=0;
var StartStudyTime=''

export default class editKnowLedge extends Component  {
constructor(props) {  
    super(props); 
     this.state = {
         Ask:'',
         answer:'',
         ID:'',
    }; 
  }  

componentWillMount() {
   const { params } = this.props.navigation.state;
   this.setState({ID:params.ID,Ask:params.ask,answer:params.answer})   
}

 
saveEdit=()=>{
    let formData=new FormData();             
    formData.append("ID",this.state.ID);  
    formData.append("ask",this.state.Ask)   
    formData.append("answer",this.state.answer)    
    let url="http://knowledgeapp.applinzi.com/xeijvjalxkeutk/editKnowLedge/";
    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response)
    .then(data =>{
          
     }
       )
    .catch(e => alert(e))

    this.props.navigation.goBack() //返回上一页
}

abortEdit=()=>{
  this.props.navigation.goBack() //返回上一页
}

 


  render() {
    const { params } = this.props.navigation.state;
    return (
       <View>
           

             <View style={{backgroundColor:"white",justifyContent: 'center',alignItems: 'flex-start',width:w,height:70,marginBottom:1}}>
                      <TextInput
                                style={{marginLeft:w*0.02,marginBottom:10,marginTop:5,marginRight:w*0.02,height:60,width:w*0.96, borderColor: 'gray', borderWidth:1,borderRadius:5}}
                                underlineColorAndroid="transparent"
                                selectTextOnFocus={true} 
                                defaultValue ={this.state.Ask}
                                onChangeText={(text) =>   this.setState({Ask:text})  }
                                multiline={true}    
                                
                     />      
             </View> 
             <View style={{backgroundColor:"white",justifyContent: 'flex-start',alignItems: 'flex-start',width:w,height:360,marginBottom:1}}>
               <ScrollView>
                       <TextInput
                                style={{marginLeft:w*0.02,marginBottom:10,marginTop:5,marginRight:w*0.02,height:280,width:w*0.96, borderColor: 'gray', borderWidth:1,borderRadius:5}}
                                underlineColorAndroid="transparent"
                                selectTextOnFocus={true} 
                                defaultValue ={this.state.answer}
                                onChangeText={(text) =>   this.setState({answer:text})  }
                                multiline={true}    
                                
                                  />                                 
                </ScrollView>
             </View> 
               

              <View style={{backgroundColor:"white",flexDirection: 'row',justifyContent: 'center',alignItems: 'center',width:w,height:55,marginBottom:5}}>
             
                    <View style={{backgroundColor:"white",justifyContent: 'center',alignItems: 'center',width:0.5*w,height:55,marginBottom:5}}>
                      <Button           
                          onPress={()=>this.saveEdit()}
                          title="保存知识"                
                          color="#1DBAF1"                        
                          accessibilityLabel=""
                          />
                      </View>
                      <View style={{backgroundColor:"white",justifyContent: 'center',alignItems: 'center',width:0.5*w,height:55,marginBottom:5}}>
                      <Button           
                          onPress={()=>this.abortEdit()}
                          title="放弃编辑"                
                          color="#1DBAF1"                        
                          accessibilityLabel=""
                          />
                      </View>
             </View> 
 
           </View>
    );
  }
}
