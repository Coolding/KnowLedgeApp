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
      
}

//跳转到下一级分类目录
 gotoLowerLevel=(LevelName)=>{
     let LowerLevelCategory=''   //存储下一级的分类名称
 
                AsyncStorage.getItem(this.state.upperCategory+'-'+LevelName).then((value) => 
                {
                    if(value==null) alert("已经到最后一层")
                    else{
                        LowerLevelCategory=value
                        //AsyncStorage.setItem('CurrentLevelInfo', LevelName); 
                        this.props.navigation.navigate('Category', {LevelCategory: LowerLevelCategory,upperCategory:this.state.upperCategory+'-'+LevelName})
                    }
              }
                  )  
 
 
 }

//浏览当前分类下面的知识内容
browseContent=(LevelName)=>{
    //alert(this.state.upperCategory+'-'+LevelName)
    this.props.navigation.navigate('ShowOption', {Category:this.state.upperCategory+'-'+LevelName})

}

  render() {
    
    return (
      <View>
                  {    
                   this.state.LevelCategory.split("-").map(
                      (LevelName,index)=>{ 
                          return(
                            <View style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',width:w,}}>
                                <TouchableOpacity key={index}
                                      onPress={()=> this.gotoLowerLevel(LevelName)}
                                      >      
                                      <View style={{backgroundColor:"white",flexDirection: 'column',justifyContent: 'center',alignItems: 'flex-start',width:0.8*w,height:80,marginBottom:2}}>
                                          <Text style={{fontSize: 22,fontWeight:'bold',marginBottom:5,lineHeight:35}}>{LevelName}</Text>
                                          <View style={{backgroundColor:"white",flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',width:w,height:45,marginBottom:2}}>
                                                  <Text style={{fontSize: 16,marginBottom:5,lineHeight:45,color:'#D32F2E'}}>记不清{knowLedgeCountDict[this.state.upperCategory+'-'+LevelName+'-记不清count']}</Text>
                                                  <Text style={{fontSize: 16,marginBottom:5,lineHeight:45,color:'#435A62'}}>    有点印象{knowLedgeCountDict[this.state.upperCategory+'-'+LevelName+'-有点印象count']}</Text>
                                                  <Text style={{fontSize: 16,marginBottom:5,lineHeight:45,color:'#4BAF4F'}}>    记住了{knowLedgeCountDict[this.state.upperCategory+'-'+LevelName+'-记住了count']}</Text>
                                                  <Text style={{fontSize: 16,marginBottom:5,lineHeight:45,color:'#01A9F2'}}>    忘不了{knowLedgeCountDict[this.state.upperCategory+'-'+LevelName+'-忘不了count']}</Text>
                                            </View>                       

                                      </View>     
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginLeft:1}}
                                    onPress={()=> this.browseContent(LevelName)}>
                                     <View style={{backgroundColor:"white",justifyContent: 'center',alignItems: 'center',width:0.2*w,height:80,marginBottom:2}}>
                                          <Text style={{fontSize: 22,marginBottom:5,lineHeight:35}}>浏览</Text>
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
