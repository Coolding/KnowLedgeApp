import React, { Component } from 'react';
import {   
  AppRegistry, 
  StyleSheet,  
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Dimensions,
  AsyncStorage
 } from 'react-native';
 import {
  StackNavigator,
} from 'react-navigation';

import ShowOption from './ShowOption';
import Browse from './Browse';
import ShowKnowledge from './ShowKnowledge';


//本文件用途：显示第二、三、或四层级的目录

//选择记忆情况后，重新回到该分类，会发现记忆统计数据有误

var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  
var knowLedgeCountDict=new Array();

export default class Category extends Component  {
  constructor(props) {  
    super(props); 
     this.state = {
        LevelCategory:"",   //本级的分类名称
        upperCategory:"",    //上（一、二、三）级的分类名称  
        addCategoryName:"", //要添加的分类目录名称
    }; 
  }  
  
static navigationOptions = {
     header:null
  };


  componentWillMount() {
      
    
     const { params } = this.props.navigation.state;
      this.setState({LevelCategory:params.LevelCategory})
      this.setState({upperCategory:params.upperCategory})
    //   AsyncStorage.getAllKeys().then(  
    //         (keys)=>{ 
    //               //先遍历、删除本地存储的各类别各熟悉程度的知识数量信息
    //                   //alert(keys)
    //                   let keyslength = keys.length;  
    //                   for (let i=0; i<keyslength;i++) {                         
    //                         if(keys[i].indexOf(params.upperCategory)>=0 )                           
    //                              AsyncStorage.getItem(keys[i]).then(
    //                                         (result)=>{
    //                                                 knowLedgeCountDict[keys[i]]=result;
    //                                                 this.forceUpdate();
    //                                                 })
    //                                         .catch((error)=>{
    //                                         console.log("error message:"+error.message);
    //                                                        }
    //                                                );
                                
    //                   }
                       
                    
                    
    //         }
    //     )
    
}

//跳转到下一级分类目录
 gotoLowerLevel=(CurrentCategoryName)=>{

     let LowerLevelCategory=glCategoryCountInfo[this.state.upperCategory+'-'+CurrentCategoryName]   //存储下一级的分类名称

    if(LowerLevelCategory==null) this.browseContent(CurrentCategoryName)  //已经到最后一层,直接跳转到浏览知识页面
    else  this.props.navigation.navigate('Category', {LevelCategory: LowerLevelCategory,upperCategory:this.state.upperCategory+'-'+CurrentCategoryName})
 
 }

//浏览当前分类下面的知识内容
browseContent=(LevelName)=>{
    this.props.navigation.navigate('ShowOption', {Category:this.state.upperCategory+'-'+LevelName})

}

//用于点击代表熟悉度的数字时，直接跳转到知识浏览页面，浏览该熟悉程度下的所有知识
browseKnowLedge=(Category,knowLedgeType)=>{ 
      const { params } = this.props.navigation.state;
      this.props.navigation.navigate('ShowKnowledge', {Category: this.state.upperCategory+'-'+Category,knowLedgeType:knowLedgeType})

  }




//增加一个目录分类(通过在数据库里面增加一条这个分类的空知识来间接实现)
addCategory=()=>{
    if(this.state.addCategoryName=='')
        alert('未输入要增加的分类名称')
    else{
                        let url="http://knowledgeapp.applinzi.com/wrionjclvqetyzvfqer/AddKnowLedge/";
                        let formData=new FormData();        
                        let LevelInfo=this.state.upperCategory.split('-')
                        for (var i=0;i<LevelInfo.length;i++){
                            formData.append("Lv"+String(i+1),LevelInfo[i]);  
                        }
                        formData.append("Lv"+String(i+1),this.state.addCategoryName);  
                        i=i+2
                        for (;i<=4;i++){
                            formData.append("Lv"+String(i),"");  
                        }
                        formData.append("ask",'增加分类占位，可删除');  
                        formData.append("answer",'增加分类占位，可删除'); 
                        //往数据库里面增加一条空知识，简介达到增加分类的目的，然后从数据库重新获取分类统计信息 
                        fetch(url,{method:"POST",headers:{},body:formData}).then(response =>{
                                glCategoryCountInfo=[]  
                                let url="http://1.knowledgeapp.applinzi.com/euekdoxl/GetKnowledgeCount";
                                fetch(url,{method:"POST",headers:{}}).then(response => response.json())
                                .then(data =>{   
                                            for (var key in data) { 
                                                glCategoryCountInfo[key]=data[key]                
                                            } 
                                            glTopCategory=data['Lv0']  
                                            this.setState({LevelCategory:glCategoryCountInfo[this.state.upperCategory]})
                                            this.forceUpdate();

                                })
                        
                        })


}
}


  render() {
    
    return (
      <View>
          <View style={styles.header}>  
               <Text style={styles.headtitle}>{this.state.upperCategory}</Text> 
            </View>  
                  {    
                   this.state.LevelCategory.split("-").map(
                      (LevelName,index)=>{ 
                          return(
                            <View key={index}
                                style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',width:w,}}>
                                <TouchableOpacity 
                                      onPress={()=> this.gotoLowerLevel(LevelName)}
                                      >      
                                      <View style={{backgroundColor:"white",flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',width:0.95*w,height:60,marginBottom:2}}>
                                            <Text style={{fontSize: 18,marginBottom:5,lineHeight:30,width:0.25*w}}>{LevelName} </Text>
                                                                                       
                                            <View    style={{backgroundColor:"#FB7D81",justifyContent: 'center',alignItems: 'center',marginLeft:w*0.02,height:40,width:40, borderColor: '#FB7D81', borderWidth:1,borderRadius:20}}>
                                                <TouchableOpacity   
                                                       onPress={()=> this.browseKnowLedge(LevelName,5)}>  
                                                        <Text style={{color:"white",}}>{typeof(glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-记不清count'])=='undefined'?0:glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-记不清count']}</Text>
                                                </TouchableOpacity>
                                            </View>   
                                            <View    style={{backgroundColor:"#91D96C",justifyContent: 'center',alignItems: 'center',marginLeft:w*0.02,height:40,width:40, borderColor: '#91D96C', borderWidth:1,borderRadius:20}}>
                                               <TouchableOpacity   
                                                       onPress={()=> this.browseKnowLedge(LevelName,6)}>  
                                                        <Text style={{color:"white",}}>{typeof(glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-有点印象count'])=='undefined'?0:glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-有点印象count']}</Text>
                                               </TouchableOpacity>
                                            </View>   
                                            <View    style={{backgroundColor:"#85B0E7",justifyContent: 'center',alignItems: 'center',marginLeft:w*0.02,height:40,width:40, borderColor: '#85B0E7', borderWidth:1,borderRadius:20}}>
                                                <TouchableOpacity   
                                                       onPress={()=> this.browseKnowLedge(LevelName,7)}>  
                                                        <Text style={{color:"white",}}>{typeof(glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-记住了count'])=='undefined'?0:glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-记住了count']}</Text>
                                                </TouchableOpacity>
                                            </View>   
                                            <View    style={{backgroundColor:"#C185E5",justifyContent: 'center',alignItems: 'center',marginLeft:w*0.02,height:40,width:40, borderColor: '#C185E5', borderWidth:1,borderRadius:20}}>
                                               <TouchableOpacity   
                                                       onPress={()=> this.browseKnowLedge(LevelName,8)}>  
                                                        <Text style={{color:"white",}}>{typeof(glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-忘不了count'])=='undefined'?0:glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-忘不了count']}</Text>
                                               </TouchableOpacity>
                                            </View>   
                                            <View    style={{backgroundColor:"#F7B42E",justifyContent: 'center',alignItems: 'center',marginLeft:w*0.02,height:40,width:40, borderColor: '#F7B42E', borderWidth:1,borderRadius:20}}>
                                                        <Text style={{color:"white",}}>{
                                                          (typeof(glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-记不清count'])=='undefined'?0:glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-记不清count'])
                                                          +(typeof(glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-有点印象count'])=='undefined'?0:glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-有点印象count'])
                                                          +(typeof(glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-记住了count'])=='undefined'?0:glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-记住了count'])
                                                          +(typeof(glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-忘不了count'])=='undefined'?0:glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-忘不了count'])}
                                                        </Text>
                                            </View> 
                                      
                                    </View>   
                                </TouchableOpacity>
                                <TouchableOpacity  
                                     onPress={()=> this.browseContent(LevelName)}>
                                     <View style={{backgroundColor:"white",flexDirection: 'column',justifyContent: 'center',alignItems: 'flex-start',width:0.1*w,height:60,marginBottom:2}}>
                                    </View> 
                                </TouchableOpacity> 
                             </View>
                          )
                        })
                   
                  }
                  
        <View  style={{width:w*0.98,marginTop:10,height:40,flexDirection: 'row',alignItems:'flex-start',justifyContent: 'center',marginBottom:60}} >
                <TextInput
                style={{marginLeft:w*0.02,marginBottom:10,height:40,width:w*0.71, borderColor: 'gray', borderWidth:1,borderRadius:5}}
                underlineColorAndroid="transparent"
                placeholder="输入要增加的类别名称"
                selectTextOnFocus={true}
                clearTextOnFocus={true}
                onChangeText={(text) => this.setState({addCategoryName:text})  }
                  />
                <View style={{marginLeft:w*0.02,marginBottom:10,height:40,width:w*0.21}}>
                    <TouchableOpacity          
                              style={{borderColor: '#12B7F5', borderWidth:1,height:40,justifyContent: 'center',}}
                              onPress={()=>this.addCategory()}
                              >
                              <Text style={{color: '#12B7F5'}}>   添加分类  </Text>
                    </TouchableOpacity>
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

