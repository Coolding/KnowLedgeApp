import React, { Component } from 'react';
import { 
  AppRegistry, 
  Text,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
 } from 'react-native';
 import Echarts from 'native-echarts';


var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  
var tmpStudyCount=[];
var tmpStudyDate=[];
var tmpStudyTime=[];
var tmpfamiliarCount={};

export default class Calc extends Component  {
  constructor(props) {  
    super(props); 
     this.state = {
         StudyCount:[],
         StudyDate:[],
         StudyTime:[],
         TotalStudyCount:0,   //总学习数
         TotalStudyTime:0,   //总学习时间
         StudyCountRecently:0,  //近期（近7天）学习数
         StudyTimeRecently:0,   //近期（近7天）学习时间
         familiarCount:{},   //各熟悉程度的知识数量

    }; 

   


  }  


 componentWillMount() {
  //从服务器获取近期每天的学习时长、学习数量
   let url="http://knowledgeapp.applinzi.com/duqnaoznmguqxjhgpei/CalcStudyInfo/";  
    fetch(url,{method:"GET"}).then(response => response.json())
    .then(data =>
    {
      
      this.setState({TotalStudyCount:data[0]['总学习数'],TotalStudyTime:data[0]['总学习时间']}) 
      this.setState({StudyCountRecently:data[1]['近七天学习数'],StudyTimeRecently:data[1]['近七天学习时间']}) 
      for(var i = 2;i < data.length; i++) {
          if(data[i].hasOwnProperty('熟悉度'))
            tmpfamiliarCount[data[i]['熟悉度']]=data[i]['知识数']
          else
            break;

      }
      this.setState({familiarCount:tmpfamiliarCount})
      var j=0
      for(;i < data.length; i++) {
        tmpStudyDate[j]=data[i]['日期'].substring(5);  //去掉日期信息前面的2017-，不然图表显示不下
        tmpStudyCount[j]=data[i]['学习知识数量'];
        tmpStudyTime[j]=data[i]['学习分钟数'];     
        j=j+1   
      }
      this.setState({StudyCount:tmpStudyCount})
      this.setState({StudyDate:tmpStudyDate})
      this.setState({StudyTime:tmpStudyTime})
    })

 }

 
  render() {
    const option = {
          //点击某一个点的数据的时候，显示出悬浮窗
          tooltip : {
              trigger: 'axis'
          },
          //可以手动选择现实几个图标
          legend: {
              data:['学习知识数']
          },
          //各种表格
          toolbox: {
              //改变icon的布局朝向
              //orient: 'vertical',
              show : true,
              showTitle:true,
              feature : {
                  //show是否显示表格，readOnly是否只读
                  dataView : {show: true, readOnly: false},
                  magicType : {
                    //折线图  柱形图    总数统计 分开平铺
                    type: [ 'bar'],
                  },

              }
          },
          xAxis : [
              {
                  //就是一月份这个显示为一个线段，而不是数轴那种一个点点
                  boundaryGap:true,
                  type : 'category',
                  name : '时间',
                  data : this.state.StudyDate
              }
          ],
          yAxis : [
              {
                  type : 'value',
                  name : '知识数'
              }
          ],
          //图形的颜色组
          color:['rgb(249,159,94)'],
          //需要显示的图形名称，类型，以及数据设置
          series : [
              {
                  name:'学习知识数',
                  //默认显
                  type:'bar',
                  data:this.state.StudyCount
              },
          ]
        };

        const option2 = {
          //点击某一个点的数据的时候，显示出悬浮窗
          tooltip : {
              trigger: 'axis'
          },
          //可以手动选择现实几个图标
          legend: {
              data:['学习分钟数']
          },
          //各种表格
          toolbox: {
              //改变icon的布局朝向
              //orient: 'vertical',
              show : true,
              showTitle:true,
              feature : {
                  //show是否显示表格，readOnly是否只读
                  dataView : {show: true, readOnly: false},
                  magicType : {
                    //折线图  柱形图    总数统计 分开平铺
                    type: [ 'bar'],
                  },

              }
          },
          xAxis : [
              {
                  //就是一月份这个显示为一个线段，而不是数轴那种一个点点
                  boundaryGap:true,
                  type : 'category',
                  name : '时间',
                  data : this.state.StudyDate
              }
          ],
          yAxis : [
              {
                  type : 'value',
                  name : '分钟数'
              }
          ],
          //图形的颜色组
          color:['rgb(67,205,126)'],
          //需要显示的图形名称，类型，以及数据设置
          series : [
              {
                  name:'学习分钟数',
                  //默认显
                  type:'bar',
                  data:this.state.StudyTime
              },
          ]
        };
    return (
     <ScrollView>
         <View style={styles.header}>  
               <Text style={styles.headtitle}>统计</Text> 
            </View>  
       <Echarts option={option} height={300} width={w}/>
       <Echarts option={option2} height={300} width={w}/>
       <View style={{width:w,}}>   
        

                    <View style={styles.textViewStyle} >
                        <Text style={styles.textStyle}>总共学习了{this.state.TotalStudyCount}条知识，学习时间{this.state.TotalStudyTime}分钟</Text>
                    </View>                    

                    <View style={styles.textViewStyle} >
                         <Text style={styles.textStyle}>近7天学习了{this.state.StudyCountRecently}条知识，学习时间{this.state.StudyTimeRecently}分钟</Text>  
                    </View>
                     

                     <View style={{backgroundColor:"white",flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',marginLeft:w*0.01,marginRight:w*0.01,width:w,height:60,marginTop:1}}>
                       <Text style={{fontSize: 15,marginTop:1,lineHeight:30,width:0.25*w}}>知识数量： </Text>                                    
                     
                      <View    style={{backgroundColor:"#FB7D81",justifyContent: 'center',alignItems: 'center',marginLeft:w*0.02,height:40,width:40, borderColor: '#FB7D81', borderWidth:1,borderRadius:20}}>
                                                <Text style={{color:"white",}}>{typeof(this.state.familiarCount['记不清'])=='undefined'?0:this.state.familiarCount['记不清']}</Text>
                                            </View>   
                                            <View    style={{backgroundColor:"#91D96C",justifyContent: 'center',alignItems: 'center',marginLeft:w*0.02,height:40,width:40, borderColor: '#91D96C', borderWidth:1,borderRadius:20}}>
                                               <Text style={{color:"white",}}>{typeof(this.state.familiarCount['有点印象'])=='undefined'?0:this.state.familiarCount['有点印象']}</Text>
                                            </View>   
                                            <View    style={{backgroundColor:"#85B0E7",justifyContent: 'center',alignItems: 'center',marginLeft:w*0.02,height:40,width:40, borderColor: '#85B0E7', borderWidth:1,borderRadius:20}}>
                                                <Text style={{color:"white",}}>{typeof(this.state.familiarCount['记住了'])=='undefined'?0:this.state.familiarCount['记住了']}</Text>
                                            </View>   
                                            <View    style={{backgroundColor:"#C185E5",justifyContent: 'center',alignItems: 'center',marginLeft:w*0.02,height:40,width:40, borderColor: '#C185E5', borderWidth:1,borderRadius:20}}>
                                               <Text style={{color:"white",}}>{typeof(this.state.familiarCount['忘不了'])=='undefined'?0:this.state.familiarCount['忘不了']}</Text>
                                            </View>   
                                            <View    style={{backgroundColor:"#F7B42E",justifyContent: 'center',alignItems: 'center',marginLeft:w*0.02,height:40,width:40, borderColor: '#F7B42E', borderWidth:1,borderRadius:20}}>
                                                        <Text style={{color:"white",}}>{
                                                          (typeof(this.state.familiarCount['记不清'])=='undefined'?0:this.state.familiarCount['记不清'])
                                                          +(typeof(this.state.familiarCount['有点印象'])=='undefined'?0:this.state.familiarCount['有点印象'])
                                                          +(typeof(this.state.familiarCount['记住了'])=='undefined'?0:this.state.familiarCount['记住了'])
                                                          +(typeof(this.state.familiarCount['忘不了'])=='undefined'?0:this.state.familiarCount['忘不了'])}
                                                        </Text>
                                            </View> 
                </View>   

       </View>
      </ScrollView>    
    );
  }
}





const styles = StyleSheet.create({
 
  textViewStyle:{
    flexDirection: 'column',
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor:"white",
    marginLeft:w*0.01,
    marginRight:w*0.01,
    marginBottom:0,
    marginTop:1,
    height:60,
    borderWidth:0,
    borderRadius:5,
  },
  textStyle:{
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 10,
    marginRight: 10,
    //padding:10,
    //borderWidth:1,
  	//borderRadius:5,
    //borderColor:"white"
},
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
})