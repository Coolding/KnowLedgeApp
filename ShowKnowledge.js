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
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import Browse from './Browse';

var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  
var CurrentKnowLedgeIndex=0;
var StartStudyTime=''

export default class ShowKnowledge extends Component  {
constructor(props) {  
    super(props); 
     this.state = {
         knowLedgeArray:[],       //存储从云端数据库获取到的知识记录
         showAsk:'',
         answer:'',
         ID:'',
    }; 
  }  

componentWillMount() {
  //获取知识内容
   CurrentKnowLedgeIndex=0
    const { params } = this.props.navigation.state;
    let formData=new FormData();             
    formData.append("Category",params.Category);  
    formData.append("knowLedgeType",params.knowLedgeType)    
    let url="http://knowledgeapp.applinzi.com/xkeuwjskdertc/GetKnowledge/";
    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response.json())
    .then(data =>{
         if(data.length>0){
           this.setState({knowLedgeArray:data}) 
           this.setState ({showAsk:data[CurrentKnowLedgeIndex]['ask']}) 
           this.setState ({ID:data[CurrentKnowLedgeIndex]['ID']}) 
           let date = new Date();//记录开始学习的时间
            StartStudyTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
         }
         else
         {
           alert("没有相关的知识")
           this.props.navigation.navigate('Browse')
         }
     }
       )
    .catch(e => alert(e))

}

 

ShowAnswer=()=>{  
       this.setState ({answer:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['answer']})  
       
}


Mark=(Content)=>{  
    let url="http://knowledgeapp.applinzi.com/dafdfasdfazz/Markfamiliar/";
    let formData=new FormData();             
    formData.append("ID",this.state.ID);  
    formData.append("familiar",Content)
    formData.append("StartStudyTime",StartStudyTime)
    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response)
    .then(data => {console.log(data)})

    CurrentKnowLedgeIndex=CurrentKnowLedgeIndex+1
     if(CurrentKnowLedgeIndex<(this.state.knowLedgeArray.length)){
        this.setState ({showAsk:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['ask']}) 
        this.setState ({ID:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['ID']})
        this.setState ({answer:''})
        let date = new Date();//记录开始学习的时间
        StartStudyTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
        
     }
     else{
        alert('学习完成')
         this.props.navigation.navigate('Browse')
     }

}




  render() {
    const { params } = this.props.navigation.state;
    return (
       <View>
              <Text style={{fontSize: 18,marginBottom:5,lineHeight:45}}>当前类别:{params.Category}</Text>

             <View style={{backgroundColor:"white",justifyContent: 'center',alignItems: 'flex-start',width:w,height:70,marginBottom:1}}>
                     <Text style={{fontSize: 18,marginBottom:5,lineHeight:35}}>{this.state.showAsk}</Text>
             </View> 
             <View style={{backgroundColor:"white",justifyContent: 'flex-start',alignItems: 'flex-start',width:w,height:290,marginBottom:1}}>
               <ScrollView>
                     <Text style={{fontSize:18,marginBottom:5,fontFamily:'Verdana bold',textAlign:'auto'}}>{this.state.answer}</Text>
                </ScrollView>
             </View> 
              <View style={{backgroundColor:"white",flexDirection: 'row',justifyContent: 'center',alignItems: 'center',width:w,height:55,marginBottom:5}}>
                   <View style={{backgroundColor:"white",justifyContent: 'center',alignItems: 'center',width:0.5*w,height:55,marginBottom:5}}>
                     <Button           
                          onPress={this.ShowAnswer}
                          title="显示答案"                
                          color="#1DBAF1"                        
                          accessibilityLabel=""
                          />
                    </View>
                    <View style={{backgroundColor:"white",justifyContent: 'center',alignItems: 'center',width:0.5*w,height:55,marginBottom:5}}>
                      <Button           
                          onPress={()=>this.props.navigation.navigate('Browse')}
                          title="结束学习"                
                          color="#1DBAF1"                        
                          accessibilityLabel=""
                          />
                      </View>
             </View> 

             <View style={{backgroundColor:"white",flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',width:w,height:70,marginBottom:2}}>
                   <View style={{height:70,width:w/4}}>
                   <Button    
                          style={{marginLeft:5}}          
                          onPress={()=>this.Mark('记不清')}
                          title="记不清      (1天)"                
                          color="#D32F2E"                        
                          accessibilityLabel=""
                          />
                    </View>
                   <View style={{height:70,width:w/4}}>
                  <Button     
                          style={{marginLeft:5}}      
                          onPress={()=>this.Mark('有点印象')}
                          title="有点印象  (7天)"                
                          color="#435A62"                        
                          accessibilityLabel=""
                          />
                  </View>
                   <View style={{height:70,width:w/4}}>
                  <Button      
                          style={{marginLeft:5}}      
                          onPress={()=>this.Mark('记住了')}
                          title="记住了    (90天)"                
                          color="#4BAF4F"                        
                          accessibilityLabel=""
                          />
                  </View>
                   <View style={{height:70,width:w/4}}>
                  <Button      
                          style={{marginLeft:5}}       
                          onPress={()=>this.Mark('忘不了')}
                          title="忘不了    (180天)"                
                          color="#01A9F2"                        
                          accessibilityLabel=""
                          />
                  </View>

            </View>
 
           </View>
    );
  }
}
