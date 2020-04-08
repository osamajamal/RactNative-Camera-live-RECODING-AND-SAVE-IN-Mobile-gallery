import React, { Component } from 'react'
import { Text, View ,Button ,PermissionsAndroid,ScrollView,Image,StyleSheet,TouchableOpacity} from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";
import Video from 'react-native-video';

export default class GetVideosFromGallery extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      videos: [],
      VideoUrl : "",
    }
  }

  

async requestExternalStoreageRead() 
{
    try {
        const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                  {
                       'title': 'Cool App ...',
                       'message': 'App needs access to external storage'
                   }
        );123789
        return granted == PermissionsAndroid.RESULTS.GRANTED
        } 
        catch (err) {
          //Handle this error
          return false;
        }
  }

  async componentDidMount()
  {
    await this.requestExternalStoreageRead()
  }


getVideos = () =>
{
    CameraRoll.getPhotos({
        first: 12,
        assetType: 'Videos',
        groupName :'Pictures'
      })
      .then(r => {
        this.setState({  videos : r.edges});
        
        console.log(r.edges);
        console.log(r.edges[0].node.image.uri);
 
      })
      .catch((err) => {
          console.log("error");
          console.error(err);
          
         //Error Loading Images
      });
}


SetVideoUrl = (url)=>
{
      console.log(url)
      this.setState({ 
      VideoUrl : url },console.log(this.state.VideoUrl));
    
}

    render() {
        
        return (
            <View>
            <View>
                <Button onPress={this.getVideos} title = "Click to Get Videos from Mobile Gallery"> </Button>
            </View>


            <View>
                <ScrollView>
               {
                  this.state.videos.map((videoitem, index) => (
                   
                    <View style={{flex:1,width:"100%",height:300,justifyContent:"center",alignItems:"center"}}>
                <TouchableOpacity
                onPress={() => { this.SetVideoUrl(videoitem.node.image.uri)}}>
        
                  {/* <TouchableOpacity onPress={() => {this.SetVideoUrl(videoitem.node.image.uri)}}> */}
                 
                   <Image style={{height:200,width:200}} source={require('../Assests/mp4.jpg')} resizeMode="cover"/>
                   </TouchableOpacity>
                   
                  
                 </View>
                     
                ))
               }
               
            </ScrollView>
           
            </View>

           
            {console.log(this.state.VideoUrl )}
            {this.state.VideoUrl.length !=0?
            
            <Video source={{uri : this.state.VideoUrl}}   // Can be a URL or a local file.
            ref={(ref) => {
                this.player = ref
       }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo} 
            fullscreen={true}
            resizeMode="cover"
            onEnd={() => 
                    // this.ChangetoLogin()
                    console.log("end")
                 }
            /> : null}
            
            
            </View>
            
        )
    }
}

var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });
