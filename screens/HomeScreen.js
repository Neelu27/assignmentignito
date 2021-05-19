import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform,TextInput,ScrollView, Image,AsyncStorage,Alert,Dimensions,FlatList,KeyboardAvoidingView,Keyboard,StatusBar} from 'react-native';
import {CheckBox}from 'react-native-elements';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Firebase,{db} from '../config/Firebase'
import { updateEmail, updatePassword, login, getUser } from '../actions/user'
const { width } = Dimensions.get('window');
import generated from '../generated.json';
import HttpsClient from '../helpers/HttpsClient';
import Icon from 'react-native-vector-icons/Ionicons';
import TabComponent  from '../navigationComponenets/TabComponent';
import moment from 'moment';
const months = ["January","February","March","April",
                "May","June","July","August","September",
                "October","November","December"];
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
class HomeScreen extends React.Component {
    static navigationOptions = {
      header:null,
    }

    constructor(props) {
      super(props);
      var user =this.props.navigation.getParam('user',null)
      console.log(user,'user')
      this.state = {
        ratelist:[],
        scrollHeight:Dimensions.get('window').width-100,
        keyboardOpen : false,
        keyboardHeight:0,
        search:false,
        user:props.user,
        topic:[],
        category:[]
      };
      var willFocus = props.navigation.addListener(
     'willFocus',
       payload => {
       this.getData()
       }
     );
    }
    handleSignout = () => {
      console.log('logout');
  		Firebase.auth().signOut()
      console.log('kkkkkkkkkkk');
  		this.props.navigation.navigate('LoginScreen')
      console.log('hhhhhhhhhhhhhhh');
  	}

    componentDidMount(){
      this.getData()
    }
    getData=async()=>{
      var data = await HttpsClient.get('https://ignithocloud.com/rt.json')
       if(data.type=='success'){
         this.setState({category:data.data.result.category})
          this.setState({topic:data.data.result.topic})
        var ck=[];
        var b=[];
         if(data.data.result.list.length>0){
           data.data.result.list.forEach((i)=>{
             var obj3;
             var xyz;
             data.data.result.category.forEach((j)=>{
               if(i.category_id==j.category_id){
                     xyz=j;
               }
             })
             var arr=[];
               i.topic_id.forEach((j)=>{
                 data.data.result.topic.forEach((k)=>{
                 if(j==k.topic_id){
                   arr.push(k);
                 }
               })
             })
                obj3={topic:arr,category:xyz,item_id:i.item_id,title_name:i.title_name,description:i.description,date:i.date};
             ck.push(obj3);
           })
         }
             this.setState({ratelist:ck});
       }else{
         return
       }
     }

    renderHeader=()=>{
  return(
    <View style={{height:55,width:width,backgroundColor:'#fff',}}>
        <View style={{flexDirection: 'row',height:55,alignItems: 'center',elevation:0,
        borderBottomWidth:0,borderColor:'#f2f2f2'}}>
        <View style={{flex:0.2,justifyContent: 'flex-start', alignItems: 'center',}}>
        </View>
        <View style={{flex:0.6,justifyContent:'center'}}>
           <Text
           style={[styles.text,{color:'#ba60da',fontSize:18,textAlign:'left',fontWeight:'700'}]}>{'E-Learning Platefrorm'}</Text>
        </View>
        <View style={{flex:0.2,justifyContent:'flex-end'}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CreateNewItem',{item:this.state.ratelist,topic:this.state.topic,category:this.state.category})}}
             style={{height:45,justifyContent:'center',alignItems:'center',marginHorizontal:10,backgroundColor:'#aaaaaa',borderRadius:70}}>
             <Icon name="paper-plane-sharp" size={22} color="#ba60da"/>
         </TouchableOpacity>
        </View>
       </View>
     </View>
  )
}

searchTopics=(searchText)=>{
console.log(this.state.ratelist,'ratelistratelistratelist');
     const newData = this.state.ratelist.filter(function(item){
         const itemData = item.title_name.toUpperCase()
         var k;
         const textData = searchText.toUpperCase()
         item.topic.filter((j)=>{
           var j =j.name.toUpperCase()
           k=  j.indexOf(textData) > -1
       })
        return (itemData.indexOf(textData) > -1||k);
     })
     this.setState({ratelist: newData})
console.log(newData,'lllllllllllllllllllllllllllll');
 }

searchUi=()=>{
  return(
    <View style={{borderWidth:0,paddingHorizontal:15,paddingVertical:15}}>
    <View style={{width:width*0.92,borderRadius:15,flexDirection:'row',borderWidth:0,marginLeft:0,borderWidth:1,borderColor:'#f3f3f3'}}>
    <View style={{width:'20%',height:40,alignItems:'center',justifyContent:'center',borderTopRightRadius:10,borderBottomRightRadius:10,backgroundColor:'#fff',}} >
    <Icon name='md-search'size={22} color="#ba60da" />
    </View>
      <TextInput
        placeholder={'Search in videos/articles'}
        style={{ height: 40, borderColor: '#373737', borderWidth: 0,
        backgroundColor:'#fff',borderTopLeftRadius:10,borderBottomLeftRadius:10,color:'#000',width:'80%',paddingRight:10 }}
        onChangeText={searchText =>{ this.searchTopics(searchText)}}
        value={this.state.searchText}
      />

   </View>
   </View>
  )
}
listfeed=()=>{
  console.log(this.state.ratelist,'JSON.stringify(this.state.ratelist)');
  return(
    <View style={{flex:1,zIndex:2,}}>
        <FlatList style={{paddingBottom:100}}
               data={this.state.ratelist} keyExtractor={(item, index) => index.toString()}
               ListHeaderComponent={this.renderHeader1}
               renderItem={({item, index})=>(
               <View style={{flex:1,justifyContent:'center',padding:width*0.04,marginVertical:2,
                      borderWidth:1,borderRadius:0,borderColor:'#f2f2f2',backgroundColor:'#ebebeb'}}>
                  <View style={{flexDirection:'row',}}>
                    <View style={{flex:0.04}}>

                    </View>
                    <View style={{flex:0.96,}}>
                      <View style={{flexDirection:'row',alignItems:'center',
                                justifyContent:'space-between',borderWidth:0}}>
                        <Text style={{fontSize:16,color:'#757575',
                                fontWeight:'700',paddingLeft:10,}}numberOfLine={1}>{item.title_name}</Text>
                        <Text style={{fontSize:16,color:'#757575',
                                fontWeight:'700',paddingLeft:10,}}numberOfLine={1}>{moment(moment(item.date)).format('DD-MMM')}</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                          <Text style={{fontSize:16,color:'#757575',fontWeight:'400',
                                paddingLeft:10,paddingBottom:10}}>{'Topic: '}</Text>
                          {
                            item.topic!=null&&<View style={{flexDirection:'row'}}>
                            {item.topic.map((i)=>{return(
                            <Text style={{fontSize:16,color:'#f96e29',fontWeight:'400',
                                        paddingLeft:10,paddingBottom:10}}>{i.name}</Text>
                          )})}</View>
                        }
                      </View>
                      <Text style={{fontSize:16,color:'#757575',fontWeight:'400',
                                paddingLeft:10,paddingBottom:10}}>{item.description}</Text>
                    </View>
                  </View>
               </View>
             )}
             />

               </View>
  )
}

  render(){
    const themeColor ='#2653da'
    return(
      <View style={{flex:1,backgroundColor: '#fff',}}>
          <StatusBar animated={true} backgroundColor="#ba60da"/>
          {this.renderHeader()}
          <ScrollView  stickyHeaderIndicies = {[0]}>
            {this.searchUi()}

            {this.listfeed()}
                   </ScrollView>
                     <TabComponent navigation={this.props.navigation}  />
      </View>
     )
  }
}


const styles = StyleSheet.create({

})
const mapStateToProps =(state) => {
    return {
      user: state.user
  }
}
const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateEmail, updatePassword, login, getUser }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
