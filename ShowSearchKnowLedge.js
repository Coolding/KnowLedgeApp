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
var StartStudyTime='';
var tmpAnswer='';

export default class ShowSearchKnowLedge extends Component  {
constructor(props) {  
    super(props); 
     this.state = {
         showAsk:'',
         answer:'',
         ID:'',
         familiar:'',
         category:"",
 
    }; 
  }  

  static navigationOptions = {
     header:null
  };


componentWillMount() {
  //获取知识内容
 
    const { params } = this.props.navigation.state;
    this.setState ({category:params.category});
    
    let formData=new FormData();             
    formData.append("ID",params.KnowLedgeID);  
    let url="http://knowledgeapp.applinzi.com/dldlleuxxxee/GetKnowLedgeByID/";
    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response.json())
    .then(data =>{
           this.setState ({showAsk:data[0]['ask']}) 
           this.setState ({ID:data[0]['ID']}) 
           this.setState ({familiar:data[0]['familiar']})  
           tmpAnswer= data[0]['answer']    
           let date = new Date();//记录开始学习的时间
            StartStudyTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
      
 
     }
       )
    .catch(e => alert(e))

}

 

ShowAnswer=()=>{  
       this.setState ({answer:tmpAnswer})         
}

//跳转到知识编辑页面
gotoEditKnowLedge=()=>{
     this.props.navigation.navigate('editKnowLedge', {ID:this.state.ID,ask:this.state.showAsk,answer:this.state.answer})
}

Mark=(Content)=>{  
    let url="http://knowledgeapp.applinzi.com/dafdfasdfazz/Markfamiliar/";
    let formData=new FormData();        
    formData.append("ID",this.state.ID);  
    formData.append("familiar",Content)
    formData.append("StartStudyTime",StartStudyTime)
    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response)
    .then(data => {console.log(data)})
   
    this.props.navigation.goBack();
}




  render() {
    const { params } = this.props.navigation.state;
    return (
       <View>
     
             <View style={styles.header}>  
                 <Text style={styles.headtitle}>{this.state.category}</Text> 
            </View>  
              

             <View style={{backgroundColor:"white",justifyContent: 'center',alignItems: 'flex-start',width:w,height:75,marginBottom:1}}>
                     <Text style={{backgroundColor:"white",fontSize:18,marginLeft:5,marginRight:5,marginBottom:5,}}>{this.state.showAsk}</Text>
                     <Text style={{backgroundColor:"white",color:'#A7A7A7',fontSize:15,marginLeft:5,marginRight:5,marginBottom:5}}>ID:{this.state.ID}   熟悉度:{this.state.familiar}  </Text>
             </View> 

           


             <View style={{backgroundColor:"white",justifyContent: 'flex-start',alignItems: 'flex-start',width:w,height:360,marginBottom:0}}>
               <ScrollView>
                     <Text style={{backgroundColor:"white",fontSize:18,marginLeft:5,marginRight:5,marginBottom:5,fontFamily:'Verdana',textAlign:'auto'}}>{this.state.answer}</Text>
                </ScrollView>
             </View> 
              <View style={{backgroundColor:"white",flexDirection: 'row',justifyContent: 'center',alignItems: 'center',width:w,height:55,marginBottom:2}}>
                   <View style={{backgroundColor:"white",justifyContent: 'center',alignItems: 'center',width:0.33*w,height:55,marginBottom:5,}}>
                        <TouchableOpacity          
                              style={{borderColor: '#12B7F5', borderWidth:1,height:35,justifyContent: 'center',}}
                              onPress={this.ShowAnswer}
                              >
                              <Text style={{color: '#12B7F5'}}>  显示答案  </Text>
                          </TouchableOpacity>
                    </View>
                    <View style={{backgroundColor:"white",justifyContent: 'center',alignItems: 'center',width:0.33*w,height:55,marginBottom:5}}>
                          <TouchableOpacity          
                              style={{borderColor: '#12B7F5', borderWidth:1,height:35,justifyContent: 'center',}}
                              onPress={()=>this.props.navigation.goBack()}
                              >
                              <Text style={{color: '#12B7F5'}}>  返回  </Text>
                          </TouchableOpacity>
                      </View>
                      <View style={{backgroundColor:"white",justifyContent: 'center',alignItems: 'center',width:0.33*w,height:55,marginBottom:5}}>
                            <TouchableOpacity          
                                  style={{borderColor: '#12B7F5', borderWidth:1,height:35,justifyContent: 'center',}}
                                  onPress={()=>this.gotoEditKnowLedge()}
                                  >
                                  <Text style={{color: '#12B7F5'}}>  编辑知识  </Text>
                              </TouchableOpacity>

                      </View>
             </View> 

             <View style={{backgroundColor:"white",flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',width:w,height:70,marginBottom:0}}>
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

const styles = StyleSheet.create({  
  
    header: { 
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
});  

