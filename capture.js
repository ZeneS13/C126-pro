import * as React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

 

export default class Capture extends React.Component{
    constructor(){
        super()
        this.state={
            image:null
        }

    }

    pickImage=async()=>{
        try{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
      
          if (!result.cancelled) {
            this.setState({image:result.uri});
            console.log(result.uri)
            var data1= new FormData()
            var res = result.uri
            var filetype= `image/${res.split('.')[res.split('.').length-1]}`
            var Fname=res.split('/')[res.split('/').length-1]
            var fileToUp={
                uri:res,
                name:Fname,
                type:filetype}
          }
          data1.append(fileToUp)
          fetch("http://05f2-103-157-220-226.ngrok.io/Predict-alphabet",{method:'POST',body:data1, headers:{"content-type":"multipart/form-data"}}).then((response)=>{
          response.json()}).then((result)=>{console.log("The result is "+result)}).catch((error)=>{console.log("err"+error)})
        }
        catch(e){
            console.log(e)
        }
    }

    render(){
        return(
            <View>
              <TouchableOpacity
              style={{
                  alignSelf:'flex-end',
                  alignItems:'center',
                  backgroundColor:'teal'
              }}
              
              onPress={this.pickImage()}>
                  <Text>
                      "Click here to see number"
                  </Text>
                 
              </TouchableOpacity>  
            </View>
        )
    }
}
