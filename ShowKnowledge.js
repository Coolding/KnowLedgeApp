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
import editKnowLedge from './editKnowLedge';


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
         familiar:'',
         KnowLedgeCount:0,
         LearnTimes:0,  //该条知识已经学习过的次数
    }; 
  }  

  static navigationOptions = {
     header:null
  };


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
           this.setState({KnowLedgeCount:data.length}) 
           this.setState ({showAsk:data[CurrentKnowLedgeIndex]['ask']}) 
           this.setState ({ID:data[CurrentKnowLedgeIndex]['ID']}) 
           this.setState ({familiar:data[CurrentKnowLedgeIndex]['familiar']}) 
           this.setState ({LearnTimes:data[CurrentKnowLedgeIndex]['学习次数']}) 
           

           
           let date = new Date();//记录开始学习的时间
            StartStudyTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
         }
         else
         {
           alert("没有相关的知识")
           this.props.navigation.navigate('index')
         }
     }
       )
    .catch(e => alert(e))

}

 

ShowAnswer=()=>{  
       this.setState ({answer:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['answer']})         
}

//跳转到知识编辑页面
gotoEditKnowLedge=()=>{
     this.props.navigation.navigate('editKnowLedge', {ID:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['ID'],ask:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['ask'],answer:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['answer']})
}

//跳转到上一条知识
gotoPrevious=()=>{
     CurrentKnowLedgeIndex=CurrentKnowLedgeIndex-1
     if(CurrentKnowLedgeIndex>=0){
        this.setState ({showAsk:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['ask']}) 
        this.setState ({ID:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['ID']})
        this.setState ({familiar:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['familiar']}) 
        this.setState ({LearnTimes:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['学习次数']}) 

        this.setState ({answer:''})
        let date = new Date();//记录开始学习的时间
        StartStudyTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
        
     }
     else{
         alert('已经是第一条')
          
     }

}

//跳转到下一条知识
gotoNext=()=>{

     CurrentKnowLedgeIndex=CurrentKnowLedgeIndex+1
     if(CurrentKnowLedgeIndex<(this.state.knowLedgeArray.length)){
        this.setState ({showAsk:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['ask']}) 
        this.setState ({ID:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['ID']})
        this.setState ({familiar:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['familiar']}) 
        this.setState ({LearnTimes:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['学习次数']}) 
        this.setState ({answer:''})
        let date = new Date();//记录开始学习的时间
        StartStudyTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
        
     }
     else{
         alert('已经是最后一条')
         
     }

}


//删除某一条知识
deleteKnowLedge=(KnowLedgeID)=>{
    let url="http://knowledgeapp.applinzi.com/euejlxnedke/DeleteKnowLedge/";
    let formData=new FormData();        
    formData.append("knowLedgeID",KnowLedgeID);  
    fetch(url,{method:"POST",headers:{},body:formData})
    this.gotoNext()


}
//标记知识的熟悉程度
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
        this.setState ({familiar:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['familiar']}) 
        this.setState ({LearnTimes:this.state.knowLedgeArray[CurrentKnowLedgeIndex]['学习次数']}) 
        this.setState ({answer:''})
        let date = new Date();//记录开始学习的时间
        StartStudyTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
        
     }
     else{
        alert('学习完成')
         this.props.navigation.navigate('index')
     }

}




  render() {
    const { params } = this.props.navigation.state;
    return (
       <View>
     
             <View style={styles.header}>  
               <TouchableOpacity   
                    style={{alignSelf:'center',}}            
                    onPress={this.gotoPrevious}>
                    <Text style={styles.leftitle}>  上一条</Text> 
               </TouchableOpacity>
               <Text style={styles.headtitle}>{params.Category}</Text> 
               <TouchableOpacity   
                    style={{alignSelf:'center',}}            
                    onPress={this.gotoNext}>
                    <Text style={styles.leftitle}>下一条  </Text> 
              </TouchableOpacity>
            </View>  
              

             <View style={{backgroundColor:"white",justifyContent: 'flex-start',alignItems: 'flex-start',width:w,height:75,marginTop:1,marginBottom:1}}>
                     <Text style={{backgroundColor:"white",justifyContent: 'flex-start',fontSize:18,marginLeft:5,marginRight:5,marginBottom:2,}}>{this.state.showAsk}</Text>
                     <Text style={{backgroundColor:"white",justifyContent: 'flex-start',color:'#A7A7A7',fontSize:15,marginLeft:5,marginRight:5,marginBottom:5}}>ID:{this.state.ID}   熟悉度:{this.state.familiar}         第{CurrentKnowLedgeIndex+1}/{this.state.KnowLedgeCount}条  {this.state.LearnTimes}次   </Text>
             </View> 
             <View style={{backgroundColor:"white",justifyContent: 'flex-start',alignItems: 'flex-start',width:w,height:360,marginBottom:0}}>
               <ScrollView>
                     <Text style={{backgroundColor:"white",fontSize:18,marginLeft:5,marginRight:5,marginBottom:5,fontFamily:'Verdana',textAlign:'auto'}}>{this.state.answer}</Text>
                </ScrollView>
             </View> 
              <View style={{backgroundColor:"white",flexDirection: 'row',justifyContent: 'center',alignItems: 'center',width:w,height:55,marginBottom:2}}>
                   <View style={{backgroundColor:"white",justifyContent: 'center',alignItems: 'center',width:0.25*w,height:55,marginBottom:5,}}>
                        <TouchableOpacity          
                              style={{borderColor: '#12B7F5', borderWidth:1,height:35,justifyContent: 'center',}}
                              onPress={this.ShowAnswer}
                              >
                              <Text style={{color: '#12B7F5'}}>  显示答案  </Text>
                          </TouchableOpacity>
                    </View>
                    <View style={{backgroundColor:"white",justifyContent: 'center',alignItems: 'center',width:0.25*w,height:55,marginBottom:5}}>
                          <TouchableOpacity          
                              style={{borderColor: '#12B7F5', borderWidth:1,height:35,justifyContent: 'center',}}
                              onPress={()=>this.props.navigation.navigate('index')}
                              >
                              <Text style={{color: '#12B7F5'}}>  结束学习  </Text>
                          </TouchableOpacity>
                      </View>
                      <View style={{backgroundColor:"white",justifyContent: 'center',alignItems: 'center',width:0.25*w,height:55,marginBottom:5}}>
                            <TouchableOpacity          
                                  style={{borderColor: '#12B7F5', borderWidth:1,height:35,justifyContent: 'center',}}
                                  onPress={()=>this.gotoEditKnowLedge()}
                                  >
                                  <Text style={{color: '#12B7F5'}}>  编辑知识  </Text>
                              </TouchableOpacity>

                      </View>
                      <View style={{backgroundColor:"white",justifyContent: 'center',alignItems: 'center',width:0.25*w,height:55,marginBottom:5}}>
                            <TouchableOpacity          
                                  style={{borderColor: '#12B7F5', borderWidth:1,height:35,justifyContent: 'center',}}
                                  onPress={()=>this.deleteKnowLedge(this.state.ID)}
                                  >
                                  <Text style={{color: '#12B7F5'}}>    删除    </Text>
                              </TouchableOpacity>

                      </View>
             </View> 

             <View style={{backgroundColor:"white",flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',width:w,height:70,marginBottom:0}}>
                   <View style={{height:70,width:w/4}}>
                   <Button    
                          style={{marginLeft:5}}          
                          onPress={()=>this.Mark('记不清')}
                          title="记不清      (1天)"                
                          color="#FB7D81"                        
                          accessibilityLabel=""
                          />
                    </View>
                   <View style={{height:70,width:w/4}}>
                  <Button     
                          style={{marginLeft:5}}      
                          onPress={()=>this.Mark('有点印象')}
                          title="有点印象  (7天)"                
                          color="#91D96C"                        
                          accessibilityLabel=""
                          />
                  </View>
                   <View style={{height:70,width:w/4}}>
                  <Button      
                          style={{marginLeft:5}}      
                          onPress={()=>this.Mark('记住了')}
                          title="记住了    (45/90天)"                
                          color="#85B0E7"                        
                          accessibilityLabel=""
                          />
                  </View>
                   <View style={{height:70,width:w/4}}>
                  <Button      
                          style={{marginLeft:5}}       
                          onPress={()=>this.Mark('忘不了')}
                          title="忘不了    (90/180天)"                
                          color="#C185E5"                        
                          accessibilityLabel=""
                          />
                  </View>

            </View>
 
           </View>
    );
  }
}

const styles = StyleSheet.create({  
  
    header: { 
    flexDirection: 'row',
    height: 40, 
    backgroundColor: '#12B7F5', 
    justifyContent: 'space-between', 
    width:w
}, 
headtitle: { 
    textAlign:'center',
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#FFFFFF', 
}, 
leftitle: { 
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#ffffff', 
}, 
});  

