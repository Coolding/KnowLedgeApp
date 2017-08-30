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
  TextInput
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import Category from './Category';
import Calc from './Calc';
import ShowOption from './ShowOption';
import ShowKnowledge from './ShowKnowledge';



//本文件用途：显示第一层级的目录


//只有具体的知识内容才是实时获取



var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  


export default class Browse extends Component  {

  constructor(props) {  
    super(props); 
     this.state = {
       addCategoryName:'',
       TodayReviewCount:0,   //今天应复习的知识数量
       PastReviewCount:0,    //已超期未复习的知识数量
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
      this.setState({TodayReviewCount:data['TodayReviewCount'],PastReviewCount:data['PastReviewCount']})
      this.forceUpdate();
      //alert('同步完成')
 
 })
}

//跳转到下一层级
 gotoLowerLevel=(CurrentCategoryName)=>{
    if(typeof(glCategoryCountInfo[CurrentCategoryName])=='undefined')   //如果没有下一级则直接跳转到ShowOption
          this.props.navigation.navigate('ShowOption', {Category:CurrentCategoryName})
    else   //否则进入下一级分类
       this.props.navigation.navigate('Category', {LevelCategory: glCategoryCountInfo[CurrentCategoryName],upperCategory:CurrentCategoryName })
 }

//浏览当前分类下面的知识内容
browseContent=(LevelName)=>{
    this.props.navigation.navigate('ShowOption', {Category:LevelName})

}

//增加一个目录分类(通过在数据库里面增加一条这个分类的空知识来间接实现)
addCategory=()=>{
    if(this.state.addCategoryName=='')
        alert('未输入要增加的分类名称')
    else{
    let url="http://knowledgeapp.applinzi.com/wrionjclvqetyzvfqer/AddKnowLedge/";
    let formData=new FormData();        
    formData.append("Lv1",this.state.addCategoryName);  
    formData.append("Lv2",'');  
    formData.append("Lv3",'');  
    formData.append("Lv4",'');  
    formData.append("ask",'增加分类占位，可删除');  
    formData.append("answer",'增加分类占位，可删除');  
    fetch(url,{method:"POST",headers:{},body:formData}).then(response =>this.synchronize())
    
    }
}

//用于点击代表熟悉度的数字时，直接跳转到知识浏览页面，浏览该熟悉程度下的所有知识
browseKnowLedge=(Category,knowLedgeType)=>{ 
      const { params } = this.props.navigation.state;
      this.props.navigation.navigate('ShowKnowledge', {Category: Category,knowLedgeType:knowLedgeType})

  }





  render() {
    return (
       <View style={styles.container}>  
            <View style={styles.header}>  
               <Text style={styles.headtitle}>主页</Text> 
            </View>  
            <View>
             
              <ScrollView>
                  {    
                   glTopCategory.split("-").map(
                      (CategoryName,index)=>{ 
                          return(
                            <View key={index}
                                  style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',width:w,}}>
                              <TouchableOpacity   //点击进入下一个层级的分类
                                    onPress={()=> this.gotoLowerLevel(CategoryName)}>         
                                    <View style={{backgroundColor:"white",flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',width:0.95*w,height:60,marginBottom:2}}>
                                            <Text style={{fontSize: 18,marginBottom:5,lineHeight:30,width:0.25*w}}>{CategoryName} </Text>
                                                                                       
                                            <View    style={{backgroundColor:"#FB7D81",justifyContent: 'center',alignItems: 'center',marginLeft:w*0.02,height:40,width:40, borderColor: '#FB7D81', borderWidth:1,borderRadius:20}}>
                                                <TouchableOpacity   
                                                       onPress={()=> this.browseKnowLedge(CategoryName,5)}>    
                                                      <Text style={{color:"white",}}>{typeof(glCategoryCountInfo[CategoryName+'-记不清count'])=='undefined'?0:glCategoryCountInfo[CategoryName+'-记不清count']}</Text>
                                                </TouchableOpacity>
                                            </View>   
                                            <View    style={{backgroundColor:"#91D96C",justifyContent: 'center',alignItems: 'center',marginLeft:w*0.02,height:40,width:40, borderColor: '#91D96C', borderWidth:1,borderRadius:20}}>
                                               <TouchableOpacity   
                                                       onPress={()=> this.browseKnowLedge(CategoryName,6)}>    
                                                    <Text style={{color:"white",}}>{typeof(glCategoryCountInfo[CategoryName+'-有点印象count'])=='undefined'?0:glCategoryCountInfo[CategoryName+'-有点印象count']}</Text>
                                               </TouchableOpacity>
                                            </View>   
                                            <View    style={{backgroundColor:"#85B0E7",justifyContent: 'center',alignItems: 'center',marginLeft:w*0.02,height:40,width:40, borderColor: '#85B0E7', borderWidth:1,borderRadius:20}}>
                                                <TouchableOpacity   
                                                       onPress={()=> this.browseKnowLedge(CategoryName,7)}>    
                                                       <Text style={{color:"white",}}>{typeof(glCategoryCountInfo[CategoryName+'-记住了count'])=='undefined'?0:glCategoryCountInfo[CategoryName+'-记住了count']}</Text>
                                                </TouchableOpacity>
                                            </View>   
                                            <View    style={{backgroundColor:"#C185E5",justifyContent: 'center',alignItems: 'center',marginLeft:w*0.02,height:40,width:40, borderColor: '#C185E5', borderWidth:1,borderRadius:20}}>
                                               <TouchableOpacity   
                                                       onPress={()=> this.browseKnowLedge(CategoryName,8)}>    
                                                       <Text style={{color:"white",}}>{typeof(glCategoryCountInfo[CategoryName+'-忘不了count'])=='undefined'?0:glCategoryCountInfo[CategoryName+'-忘不了count']}</Text>
                                               </TouchableOpacity>
                                            </View>   
                                            <View    style={{backgroundColor:"#F7B42E",justifyContent: 'center',alignItems: 'center',marginLeft:w*0.02,height:40,width:40, borderColor: '#F7B42E', borderWidth:1,borderRadius:20}}>
                                                        <Text style={{color:"white",}}>{
                                                          (typeof(glCategoryCountInfo[CategoryName+'-记不清count'])=='undefined'?0:glCategoryCountInfo[CategoryName+'-记不清count'])
                                                          +(typeof(glCategoryCountInfo[CategoryName+'-有点印象count'])=='undefined'?0:glCategoryCountInfo[CategoryName+'-有点印象count'])
                                                          +(typeof(glCategoryCountInfo[CategoryName+'-记住了count'])=='undefined'?0:glCategoryCountInfo[CategoryName+'-记住了count'])
                                                          +(typeof(glCategoryCountInfo[CategoryName+'-忘不了count'])=='undefined'?0:glCategoryCountInfo[CategoryName+'-忘不了count'])}
                                                        </Text>
                                            </View> 
                                      
                                    </View>   
                              </TouchableOpacity>
                              <TouchableOpacity     //点击进入知识浏览
                                    onPress={()=> this.browseContent(CategoryName)}>         
                                    <View style={{backgroundColor:"white",flexDirection: 'column',justifyContent: 'center',alignItems: 'flex-start',width:0.1*w,height:60,marginBottom:2}}>
                                    </View>   
                              </TouchableOpacity>
                          </View>
                          )
                        })
                   
                  }
                  <View style={{backgroundColor:"white",flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',height:60,width:w}}>
                            <View    style={{backgroundColor:"white",justifyContent: 'center',alignItems: 'center',marginLeft:w*0.02,height:60,width:0.5*w}}>
                                    <TouchableOpacity  style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems:'center'}}
                                            onPress={()=> this.browseKnowLedge('',9)}>  
                                            <Text>今日应复习：</Text>  
                                            <View    style={{backgroundColor:"#C185E5",justifyContent: 'center',alignItems: 'center',marginLeft:w*0.02,height:40,width:40, borderColor: '#C185E5', borderWidth:1,borderRadius:20}}>
                                                 <Text style={{color:"white"}}>{this.state.TodayReviewCount}</Text>
                                            </View>
                                    </TouchableOpacity>
                            </View>  
                            <View    style={{backgroundColor:"white",justifyContent: 'center',alignItems: 'flex-start',marginLeft:w*0.02,height:60,width:0.5*w}}>
                                    <TouchableOpacity  style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems:'center'}}
                                            onPress={()=>this.browseKnowLedge('',10)}>  
                                            <Text>已超期未复习：</Text>  
                                            <View    style={{backgroundColor:"#C185E5",justifyContent: 'center',alignItems: 'center',marginLeft:w*0.02,height:40,width:40, borderColor: '#C185E5', borderWidth:1,borderRadius:20}}>
                                                 <Text style={{color:"white"}}>{this.state.PastReviewCount}</Text>
                                            </View>
                                    </TouchableOpacity>
                            </View>  
                  </View>
                </ScrollView>
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
    header: { 
    flexDirection: 'row',
    height: 40, 
    backgroundColor: '#12B7F5', 
    justifyContent: 'center', 
    width:w
}, 
leftitle: { 
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#ffffff', 
}, 
headtitle: { 
    textAlign:'center',
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#FFFFFF', 
}, 
});  

