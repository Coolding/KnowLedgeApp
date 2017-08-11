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

var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  
var CurrentKnowLedgeIndex=0;

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
    const { params } = this.props.navigation.state;
    let url="http://knowledgeapp.applinzi.com/xkeuwjskdertc/GetKnowledge/" + params.Category;
    fetch(url,{method:"POST",headers:{}}).then(response => response.json())
    .then(data =>{
           this.setState({knowLedgeArray:data}) 
           this.setState ({showAsk:this.state.knowLedgeArray[0]['ask']}) 
           this.setState ({ID:this.state.knowLedgeArray[0]['ID']}) 
     }
       )
    .catch(e => alert(e))

}

ShowNext=()=>{  
     
     CurrentKnowLedgeIndex=CurrentKnowLedgeIndex+1
     if(CurrentKnowLedgeIndex<(this.state.knowLedgeArray.length)){
        this.setState ({showAsk:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['ask']}) 
        this.setState ({ID:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['ID']})
        this.setState ({answer:''})
     }
     else
        alert('已经是最后一条')    

}

ShowAnswer=()=>{  
       this.setState ({answer:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['answer']})  
}


Mark=(Content)=>{  
    let url="http://knowledgeapp.applinzi.com/dafdfasdfazz/Markfamiliar/";
    let formData=new FormData();             
    formData.append("ID",this.state.ID);  
    formData.append("familiar",Content)
    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response)
    .then(data => {console.log(data)})

    CurrentKnowLedgeIndex=CurrentKnowLedgeIndex+1
     if(CurrentKnowLedgeIndex<(this.state.knowLedgeArray.length)){
        this.setState ({showAsk:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['ask']}) 
        this.setState ({ID:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['ID']})
        this.setState ({answer:''})
     }
     else
        alert('已经是最后一条') 

}




  render() {
    const { params } = this.props.navigation.state;
    return (
       <View>
              <Text style={{fontSize: 18,marginBottom:5,lineHeight:45}}>当前类别:{params.Category}</Text>

             <View style={{backgroundColor:"white",justifyContent: 'center',alignItems: 'flex-start',width:w,height:70,marginBottom:1}}>
                     <Text style={{fontSize: 18,marginBottom:5,lineHeight:35}}>{this.state.showAsk}</Text>
             </View> 
             <View style={{backgroundColor:"white",justifyContent: 'flex-start',alignItems: 'flex-start',width:w,height:270,marginBottom:1}}>
               <ScrollView>
                     <Text style={{fontSize:18,marginBottom:5,fontFamily:'Verdana bold',textAlign:'auto'}}>{this.state.answer}</Text>
                </ScrollView>
             </View> 
              <View style={{justifyContent: 'center',alignItems: 'center',width:w,height:70,marginBottom:5}}>
                     <Button           
                          onPress={this.ShowAnswer}
                          title="显示答案"                
                          color="#1DBAF1"                        
                          accessibilityLabel=""
                          />
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
             <Button           
                    onPress={this.ShowNext}
                    title="显示下一条"                
                    color="#1DBAF1"                        
                    accessibilityLabel=""
                    />
           </View>
    );
  }
}
