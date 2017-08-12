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

import ShowOption from './ShowOption';

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
    }; 
  }  
  
 


  componentWillMount() {
      
    
     const { params } = this.props.navigation.state;
      this.setState({LevelCategory:params.LevelCategory})
      this.setState({upperCategory:params.upperCategory})
      AsyncStorage.getAllKeys().then(  
            (keys)=>{ 
                  //先遍历、删除本地存储的各类别各熟悉程度的知识数量信息
                      //alert(keys)
                      let keyslength = keys.length;  
                      for (let i=0; i<keyslength;i++) {                         
                            if(keys[i].indexOf(params.upperCategory)>=0 )                           
                                 AsyncStorage.getItem(keys[i]).then(
                                            (result)=>{
                                                    knowLedgeCountDict[keys[i]]=result;
                                                    this.forceUpdate();
                                                    })
                                            .catch((error)=>{
                                            console.log("error message:"+error.message);
                                                           }
                                                   );
                                
                      }
                       
                    
                    
            }
        )
        this.forceUpdate();
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


  render() {
    
    return (
      <View>
      
                  {    
                   this.state.LevelCategory.split("-").map(
                      (LevelName,index)=>{ 
                          return(
                            <View key={index}
                                style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',width:w,}}>
                                <TouchableOpacity 
                                      onPress={()=> this.gotoLowerLevel(LevelName)}
                                      >      
                                      <View style={{backgroundColor:"white",flexDirection: 'column',justifyContent: 'center',alignItems: 'flex-start',width:0.5*w,height:80,marginBottom:2}}>
                                          <Text style={{fontSize: 22,fontWeight:'bold',marginBottom:5,lineHeight:35}}>{LevelName}</Text>
                                          <View style={{backgroundColor:"white",flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',width:w,height:45,marginBottom:2}}>
                                                  <Text style={{fontSize: 16,marginBottom:5,lineHeight:45,color:'#D32F2E'}}>记不清{typeof(glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-记不清count'])=='undefined'?0:glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-记不清count']}</Text>
                                                  <Text style={{fontSize: 16,marginBottom:5,lineHeight:45,color:'#435A62'}}>    有点印象{typeof(glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-有点印象count'])=='undefined'?0:glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-有点印象count']}</Text>
                                            </View>                       

                                      </View>     
                                </TouchableOpacity>
                                <TouchableOpacity  
                                     onPress={()=> this.browseContent(LevelName)}>
                                     <View style={{backgroundColor:"white",flexDirection: 'column',justifyContent: 'center',alignItems: 'flex-start',width:0.5*w,height:80,marginBottom:2}}>
                                          <Text style={{fontSize: 22,fontWeight:'bold',marginBottom:5,lineHeight:35}}>{
                                            (typeof(glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-记不清count'])=='undefined'?0:glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-记不清count'])
                                            +(typeof(glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-有点印象count'])=='undefined'?0:glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-有点印象count'])
                                            +(typeof(glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-记住了count'])=='undefined'?0:glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-记住了count'])
                                            +(typeof(glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-忘不了count'])=='undefined'?0:glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-忘不了count'])}</Text>
                                          <View style={{backgroundColor:"white",flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',width:w,height:45,marginBottom:2}}>
                                                  <Text style={{fontSize: 16,marginBottom:5,lineHeight:45,color:'#4BAF4F'}}>    记住了{typeof(glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-记住了count'])=='undefined'?0:glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-记住了count']}</Text>
                                                  <Text style={{fontSize: 16,marginBottom:5,lineHeight:45,color:'#01A9F2'}}>    忘不了{typeof(glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-忘不了count'])=='undefined'?0:glCategoryCountInfo[this.state.upperCategory+'-'+LevelName+'-忘不了count']}</Text>
                                            </View>                       

                                      </View> 
                                </TouchableOpacity> 
                             </View>
                          )
                        })
                   
                  }
                  
 
                          
         </View>


    );
  }
}
