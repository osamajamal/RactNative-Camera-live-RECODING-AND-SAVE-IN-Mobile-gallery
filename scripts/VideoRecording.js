import React, { Component } from 'react'
import { Text, View ,TouchableOpacity,Button,ActivityIndicator,StyleSheet,PermissionsAndroid} from 'react-native'
import { RNCamera } from 'react-native-camera';
import RNFS from 'react-native-fs';
import CameraRoll from "@react-native-community/cameraroll";

export default class VideoRecording extends Component {

  async requestExternalStoreageRead() {
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
  
    state = {
        recording:false, 
        processing :false
      };

      async startRecording() {
        this.setState({ recording: true });
        // default to mp4 for android as codec is not set
  
        const { uri, codec = "mp4" } = await this.camera.recordAsync();
    
        console.log(uri);
        
        this.setState({ recording: false, processing: true });
        const type = `video/${codec}`;
        this.setState({ processing: false });
        
          CameraRoll.saveToCameraRoll(uri, 'video')
          
        
      
        
    }
    
    stopRecording() {
        this.camera.stopRecording();
    }
    render() {
        const { recording, processing } = this.state;
        let button = (
            <TouchableOpacity
              onPress={this.startRecording.bind(this)}
              style={styles.capture}
            >
              <Text style={{ fontSize: 14 }}> RECORD </Text>
            </TouchableOpacity>
          );
      
          if (recording) {
            button = (
              <TouchableOpacity
                onPress={this.stopRecording.bind(this)}
                style={styles.capture}
              >
                <Text style={{ fontSize: 14 }}> STOP </Text>
              </TouchableOpacity>
            );
          }
      
          if (processing) {
            button = (
              <View style={styles.capture}>
                <ActivityIndicator animating size={18} />
              </View>
            );
          }
          return (
            <View style={styles.container}>
              <RNCamera
                ref={ref => {
                  this.camera = ref;
                }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                permissionDialogTitle={"Permission to use camera"}
                permissionDialogMessage={
                  "We need your permission to use your camera phone"
                }
              />
              <View
                style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
              >
                {button}
              </View>
            </View>
          );
        }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    width:"100%"
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
    
    headline: {
      alignSelf: "center",
      fontSize: 18,
      marginTop: 10,
      marginBottom: 30
    },
    videoTile: {
      alignSelf: "center",
      fontSize: 16,
      marginTop: 15
    }
  });
