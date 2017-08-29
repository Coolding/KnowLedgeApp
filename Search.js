import React, { Component } from 'react';
import { 
  AppRegistry, 
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
 } from 'react-native';
 import ShowSearchKnowLedge from './ShowSearchKnowLedge';

var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  

export default class Search extends Component  {

constructor(props) {  
    super(props); 
     this.state = {
         toSearchWord:'',
         SearchResult:[]
    }; 

}

SearchKnowLedge=()=>{

  let formData=new FormData();             
    formData.append("toSearchWord",this.state.toSearchWord);  
    let url="http://knowledgeapp.applinzi.com/xkdjejekxiedk/SearchKnowLedge/";
    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response.json())
    .then(data =>{
          this.setState({SearchResult:data})
     }
       )
    .catch(e => alert(e))
}

gotoKnowLedge=(KnowLedgeID)=>{
     this.props.navigation.navigate('ShowSearchKnowLedge', {KnowLedgeID: KnowLedgeID})

}
 
  
  render() {
    return (
      <View>
          
              <View style={styles.header}>  
                    <Text style={styles.headtitle}>搜索</Text> 
              </View>  

              <View  style={{width:w*0.98,marginTop:10,height:40,flexDirection: 'row',alignItems:'flex-start',marginBottom:10}} >
                      <TextInput
                      style={{marginLeft:w*0.02,marginBottom:10,height:40,width:w*0.75, borderColor: 'gray', borderWidth:1,borderRadius:5}}
                      underlineColorAndroid="transparent"
                      placeholder="输入要搜索的关键词"
                      selectTextOnFocus={true}
                      clearTextOnFocus={true}
                      onChangeText={(text) =>   this.setState({toSearchWord:text})  }
                        />
                      <View style={{marginLeft:w*0.02,marginBottom:10,height:45,width:w*0.15}}>
                          <Button           
                              onPress={()=>this.SearchKnowLedge()}
                              title="查找"                
                              color="#1DBAF1"                        
                              accessibilityLabel=""
                              />
                      </View>
                      
                  </View>
<ScrollView>
                 
                  {    
                   this.state.SearchResult.map(
                      (result,index)=>{ 
                          return(
                              <View key={index}
                                  style={{backgroundColor:"white",flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'flex-start',width:w,marginBottom:1}}>
                                          <TouchableOpacity style={styles.textViewStyle} onPress={()=>this.gotoKnowLedge(result['ID'])} >
                                                  <Text style={styles.textStyle}>{index+1}. {result['ask']}</Text>
                                                  <Text style={{backgroundColor:"white",color:'#A7A7A7',fontSize:15,marginLeft:5,marginRight:5,marginBottom:5,lineHeight:30}}>ID:{result['ID']}   类别：{result['Lv1']}-{result['Lv2']}  熟悉度：{result['familiar']}</Text> 
                                        </TouchableOpacity>
                           </View>
                          )
                      })
                  }
        </ScrollView>
 </View>  

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
    height:70,
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