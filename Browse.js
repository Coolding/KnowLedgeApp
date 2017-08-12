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
import ShowOption from './ShowOption';


//本文件用途：显示第一层级的目录


//只有具体的知识内容才是实时获取



var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  


export default class Browse extends Component  {

  constructor(props) {  
    super(props); 
     this.state = {
    }; 
  }  


 
componentWillMount() {
    this.synchronize() //同步数据库

}

//同步数据库
synchronize=()=>{  
  glCategoryCountInfo=[] //先清空原有存储的信息
   let url="http://1.knowledgeapp.applinzi.com/euekdoxl/GetKnowledgeCount";
   fetch(url,{method:"POST",headers:{}}).then(response => response.json())
    .then(data =>{   

       for (var key in data) { 
                  glCategoryCountInfo[key]=data[key]                
                       } 
      glTopCategory=data['Lv0']    
      this.forceUpdate();
      //alert('同步完成')
 
 })
}

//跳转到下一层级
 gotoLowerLevel=(CurrentCategoryName)=>{
     this.props.navigation.navigate('Category', {LevelCategory: glCategoryCountInfo[CurrentCategoryName],upperCategory:CurrentCategoryName})
 }

//浏览当前分类下面的知识内容
browseContent=(LevelName)=>{
    this.props.navigation.navigate('ShowOption', {Category:LevelName})

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
                      (CategoryName,index)=>{ 
                          return(
                            <View key={index}
                                  style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',width:w,}}>
                              <TouchableOpacity 
                                    onPress={()=> this.gotoLowerLevel(CategoryName)}>         
                                    <View style={{backgroundColor:"white",flexDirection: 'column',justifyContent: 'center',alignItems: 'flex-start',width:0.5*w,height:90,marginBottom:2}}>
                                            <Text style={{fontSize: 22,fontWeight:'bold',marginBottom:5,lineHeight:35}}>{CategoryName} </Text>
                                            <View style={{backgroundColor:"white",flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',width:w,height:45,marginBottom:2}}>
                                                  <Text style={{fontSize: 18,marginBottom:5,lineHeight:45,color:'#D32F2E'}}>记不清{typeof(glCategoryCountInfo[CategoryName+'-记不清count'])=='undefined'?0:glCategoryCountInfo[CategoryName+'-记不清count']}</Text>
                                                  <Text style={{fontSize: 18,marginBottom:5,lineHeight:45,color:'#435A62'}}>    有点印象{typeof(glCategoryCountInfo[CategoryName+'-有点印象count'])=='undefined'?0:glCategoryCountInfo[CategoryName+'-有点印象count']}</Text>
                                            </View>   
                                    </View>   
                              </TouchableOpacity>
                              <TouchableOpacity 
                                    onPress={()=> this.browseContent(CategoryName)}>         
                                    <View style={{backgroundColor:"white",flexDirection: 'column',justifyContent: 'center',alignItems: 'flex-start',width:0.5*w,height:90,marginBottom:2}}>
                                            <Text style={{fontSize: 22,fontWeight:'bold',marginBottom:5,lineHeight:35}}>{
                                                (typeof(glCategoryCountInfo[CategoryName+'-记不清count'])=='undefined'?0:glCategoryCountInfo[CategoryName+'-记不清count'])
                                                +(typeof(glCategoryCountInfo[CategoryName+'-有点印象count'])=='undefined'?0:glCategoryCountInfo[CategoryName+'-有点印象count'])
                                                +(typeof(glCategoryCountInfo[CategoryName+'-记住了count'])=='undefined'?0:glCategoryCountInfo[CategoryName+'-记住了count'])
                                                +(typeof(glCategoryCountInfo[CategoryName+'-忘不了count'])=='undefined'?0:glCategoryCountInfo[CategoryName+'-忘不了count'])}
                                              </Text>
                                            <View style={{backgroundColor:"white",flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',width:w,height:45,marginBottom:2}}>
                                                  <Text style={{fontSize: 18,marginBottom:5,lineHeight:45,color:'#4BAF4F'}}>    记住了{typeof(glCategoryCountInfo[CategoryName+'-记住了count'])=='undefined'?0:glCategoryCountInfo[CategoryName+'-记住了count']}</Text>
                                                  <Text style={{fontSize: 18,marginBottom:5,lineHeight:45,color:'#01A9F2'}}>    忘不了{typeof(glCategoryCountInfo[CategoryName+'-忘不了count'])=='undefined'?0:glCategoryCountInfo[CategoryName+'-忘不了count']}</Text>
                                            </View>   
                                    </View>   
                              </TouchableOpacity>
                          </View>
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

