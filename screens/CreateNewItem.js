import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform,TextInput, Image,AsyncStorage,Alert,Dimensions,FlatList,KeyboardAvoidingView,Keyboard,StatusBar} from 'react-native';
import {CheckBox}from 'react-native-elements';
import { connect } from 'react-redux'
import Firebase from '../config/Firebase'
const { width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
const months = ["January","February","March","April",
                "May","June","July","August","September",
                "October","November","December"];
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
class CreateNewItem extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

    constructor(props) {
      super(props);
      var item=this.props.navigation.getParam('item',null);
      var topic=this.props.navigation.getParam('topic',null);

      var category=this.props.navigation.getParam('category',null);
      console.log(item,'itemitemitemitemitemitem');
      this.state = {
        email:'',
        password:'',
        scrollHeight:Dimensions.get('window').width-100,
        keyboardOpen : false,
        keyboardHeight:0,
        disableSignUp:false,
        error:false,
        ratelist:item,
        category:category,
        topic:topic
      };
      Keyboard.addListener(
             'keyboardDidHide', this.showKeyboard
           )

     Keyboard.addListener(
           'keyboardDidShow', this.hideKeyboard
     )
    }

    onChangeText=(text)=>{
      this.setState({email:text,error:false})
    }


    renderHeader=()=>{
      return(
        <View style={{height:55,width:width,backgroundColor:'#fff',}}>
          <View style={{flexDirection: 'row',height:55,alignItems: 'center',elevation:0,
            borderBottomWidth:0,borderColor:'#f2f2f2'}}>
              <View style={{ flex: 0.2,justifyContent: 'flex-start', alignItems: 'center',}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                  <Icon   name='arrow-back-sharp'size={27} color="#ba60da" />
                </TouchableOpacity>
              </View>
              <View style={{flex:0.6,justifyContent:'center',alignItems:'center'}}>
                <Text  numberOfLines={1}
                style={[styles.text,{color:'#ba60da',fontSize:18,textAlign:'left',fontWeight:'700'}]}>{'Advanced Filter'}</Text>
              </View>
           </View>
         </View>
      )
    }


    createNew=async(item,index)=>{
      var sendData={
        isChecked:false,
        title:this.state.title
      }
      var data = await HttpsClient.post('https://mocki.io/v1/1c396924-1562-413a-9f05-560724f092b0',sendData)
        if(data.type=='success'){
          console.log(data,'jjjjjjjjj');
          this.props.navigation.navigate('HomeScreen')
        }
    }

    listfeed=()=>{
      console.log(this.state.ratelist,'JSON.stringify(this.state.ratelist)');
      return(
        <View style={{flex:1,zIndex:2,}}>
        <View style={{margin:15,padding:15}}>
        <Text style={{fontSize:18,color:'#ba60da',fontWeight:'600',paddingVertical:10}}>{'Category'}</Text>
          {this.state.category.map((item)=>{
            return(
              <View style={{borderTopWidth:0,flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:18,color:'#565656',fontWeight:'600',paddingVertical:10}}>{item.name}</Text>
                  <CheckBox
                           checkedIcon={<Image source={require('../assets/img/checked.png')}
                                               style={{margin:-10}} />}
                           uncheckedIcon={<Image source={require('../assets/img/unchecked.png')}
                                               style={{margin:-10}} />}
                           checked={item.isChecked}
                           onPress={() => this.setState({checked: !this.state.checked})}
                         />
              </View>
            )
          })}

          <Text style={{fontSize:18,color:'#ba60da',fontWeight:'600',paddingVertical:10}}>{'Topic'}</Text>
            {this.state.topic.map((item)=>{
              return(
                <View style={{borderTopWidth:0,flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:18,color:'#565656',fontWeight:'600',paddingVertical:10}}>{item.name}</Text>
                    <CheckBox
                             checkedIcon={<Image source={require('../assets/img/checked.png')}
                                                 style={{margin:-10}} />}
                             uncheckedIcon={<Image source={require('../assets/img/unchecked.png')}
                                                 style={{margin:-10}} />}
                             checked={item.isChecked}
                             onPress={() => this.setState({checked: !this.state.checked})}
                           />
                </View>
              )
            })}

          </View>
        </View>
      )
    }


  render(){
    return(
      <View style={{flex:1,backgroundColor: '#f8fafb',}}>
          <StatusBar animated={true} backgroundColor="#ba60da"/>
           {this.renderHeader()}
           <View style={{flex:1,zIndex:2,}}>
                    {this.listfeed()}
            </View>
            <View style={{alignItems:'center',justifyContent:'center',marginHorizontal:0,width:width,borderRadius:0,marginVertical:0,paddingVertical:20,backgroundColor:'#fff',borderTopWidth:1,borderColor:'#f3f3f3'}}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CreateNewItem')}} style={{paddingHorizontal:25,paddingVertical:10,borderWidth:0,borderRadius:30,backgroundColor:'#ba60da'}} >
              <Text style={{fontSize:18,color:'#fff',fontWeight:'600'}}>Continue</Text>
            </TouchableOpacity>
            </View>

      </View>
     )
  }
}


const styles = StyleSheet.create({

})
const mapStateToProps =(state) => {
    return {
      user:state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateNewItem)
