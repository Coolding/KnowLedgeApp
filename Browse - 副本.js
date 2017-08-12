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
  ScrollView
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import Category from './Category';
import Calc from './Calc';

//本文件用途：显示第一层级的目录

//所有分类信息要存储在本地，且每次同步后都要进行更新
//只有具体的知识内容才是实时获取

//同步时要先删除本地分类信息，再新建！


var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  


export default class Browse extends Component  {

  constructor(props) {  
    super(props); 
     this.state = {
        //Lv0:"",     //存储第一层级的分类名称  
        da:'' ,
    }; 
  }  


 
componentWillMount() {
    this.synchronize() //同步数据库

}

//同步数据库
synchronize=()=>{  
   let url="http://1.knowledgeapp.applinzi.com/euekdoxl/GetKnowledgeCount";
   fetch(url,{method:"POST",headers:{}}).then(response => response.json())
    .then(data =>{   
       for (var key in data) { 
                  glCategoryCountInfo[key]=data[key]                
                       } 
      
      
      
      //返回的data信息包括每一层的目录信息、上下层目录的对应关系，每一类目录不同熟悉程度的知识数量统计
       //LevelName用来存储第一层分类，第一层-第二层分类，第一层-第二层-第三层分类名称的信息
       //它的值类似："计算机//电力//计算机-Java//记忆//阅读//计算机-Java-注意事项//计算机-python" 这样子
       //因为在本地用AsyncStorage储存了每一层对应的下层目录名称，如电力:"基础知识-电路"，计算机-Java-注意事项:"测试"等数据
       //每次同步目录信息时，要先把这些数据删除，所以需要用到LevelName储存的信息
        AsyncStorage.getAllKeys().then(  
            (keys)=>{ 
                  //先遍历、删除本地存储的各类别各熟悉程度的知识数量信息
                     // alert(keys)
                      let keyslength = keys.length;  
                      for (let i=0; i<keyslength;i++) {                         
                            if(keys[i].indexOf('记不清count')>0 || keys[i].indexOf('有点印象count')>0 || keys[i].indexOf('记住了count')>0 || keys[i].indexOf('忘不了count')>0)
                                AsyncStorage.removeItem(keys[i])
                      }
                       
            }
        )


       AsyncStorage.getItem('LevelName').then((LevelNameValue) =>
          { 
                //先删除本地存储的上下级目录对应关系
                LevelNameValue.split("//").map((LevelCategory)=>{AsyncStorage.removeItem(LevelCategory) })
                //设置新的上下级目录层级对应关系  
                AsyncStorage.setItem('LevelName', data['LevelName']);                 
                data['LevelName'].split("//").map(
                            (LevelTag)=>{AsyncStorage.setItem(LevelTag, data[LevelTag]); })  //存储每个层级对应的下层分类名称
                
                //data['Lv0']的值类似"电力-计算机-记忆-阅读"
                //AsyncStorage.setItem('Lv0', data['Lv0']);      //存储第一层级的分类名称         
                //this.setState({Lv0:data['Lv0']})     //存储第一层级的分类名称
                glTopCategory=data['Lv0']
                
                //本地存储各分类各熟悉程度的知识数量
                for (var key in data) { 
                     if(key.indexOf('记不清count')>0 || key.indexOf('有点印象count')>0 || key.indexOf('记住了count')>0 || key.indexOf('忘不了count')>0)                            
                            AsyncStorage.setItem(key, String(data[key]));   
                 } 
                this.setState({da:data})
        
          }
       )        
      
    }
       )
    .catch(e => alert(e))

 }

//跳转到下一层级
 gotoLowerLevel=(LevelName)=>{
     let LowerLevelCategory=''   //存储下一级的分类名称
     AsyncStorage.getItem(LevelName).then((value) => 
     {
         LowerLevelCategory=value
        // AsyncStorage.setItem('CurrentLevelInfo', LevelName); 
         this.props.navigation.navigate('Category', {LevelCategory: LowerLevelCategory,upperCategory:LevelName})
     }
       )  
     

 }



  render() {
    return (
       <View style={styles.container}>  
            <View style={{width:w,height:30,marginBottom:2}}>
                <Button           
                    onPress={this.synchronize}
                    title="同步数据"                
                    color="#1DBAF1"                        
                    accessibilityLabel=""
                    />
            </View>
            <View>
             
              <ScrollView>
                  {    
                   glTopCategory.split("-").map(
                      (Level0,index)=>{ 
                          return(
                              <TouchableOpacity key={index}
                                    onPress={()=> this.gotoLowerLevel(Level0)}>         
                                    <View style={{backgroundColor:"white",flexDirection: 'column',justifyContent: 'center',alignItems: 'flex-start',width:w,height:90,marginBottom:2}}>
                                            <Text style={{fontSize: 22,fontWeight:'bold',marginBottom:5,lineHeight:35}}>{Level0} </Text>
                                            <View style={{backgroundColor:"white",flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',width:w,height:45,marginBottom:2}}>
                                                  <Text style={{fontSize: 18,marginBottom:5,lineHeight:45,color:'#D32F2E'}}>记不清{glCategoryCountInfo[Level0+'-记不清count']}</Text>
                                                  <Text style={{fontSize: 18,marginBottom:5,lineHeight:45,color:'#435A62'}}>    有点印象{glCategoryCountInfo[Level0+'-有点印象count']}</Text>
                                                  <Text style={{fontSize: 18,marginBottom:5,lineHeight:45,color:'#4BAF4F'}}>    记住了{glCategoryCountInfo[Level0+'-记住了count']}</Text>
                                                  <Text style={{fontSize: 18,marginBottom:5,lineHeight:45,color:'#01A9F2'}}>    忘不了{glCategoryCountInfo[Level0+'-忘不了count']}</Text>
                                            </View>   
                                    </View>   
                              </TouchableOpacity>
                          )
                        })
                   
                  }
                </ScrollView>
            </View>
      </View>

    );
  }
}


const styles = StyleSheet.create({  
 container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f4f6f6',
    //marginBottom: 100,
  },
  textStyle:{
    fontSize: 15,
    textAlign: 'left',
    margin: 2,
    //padding:10,
    borderWidth:1,
  	borderRadius:5,
  },
});  

