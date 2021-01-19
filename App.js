import React, {useState, useEffect} from 'react';
import {
  Button,
  Image,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import * as ImagePicker from 'react-native-image-picker';

export default function ImagePickerExample() {
  const [response, setResponse] = React.useState(null);
  const [imageResponse, setImageResponse] = useState(null);
  const [objectCount, setObjectCount] = useState(null);
  const [start, setStart] = useState(true);

  useEffect(() => {
    if(start==true)
    {
      Alert.alert(
        'Alerts for a Better Experience ',
        'Make sure the size of the photo you uploaded is less than 5 MB\n\nObjects to be detected must be in the focus of the picture.\n\nRecommended minimum picture PX: 1500x1200',
        [{text: 'OK', onPress: () => console.log('OK')}],
        {cancelable: false},
      );
      setStart(false)
    }
  });
  const pickImagefromCamera = async () => {
    // Image Picking From Device Libary
    setImageResponse(null);
    setObjectCount(null);
    var ws = new WebSocket('ws://xx.xx.xxx.xxx:port');
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 1500,
        maxWidth: 1500,
      },
      (response) => {
        if (response.didCancel == true) {
          Alert.alert(
            'Wrong Choice !!',
            'Please select a photo !!',
            [{text: 'OK', onPress: () => console.log('OK')}],
            {cancelable: false},
          );
        } else {
          setResponse(response);
          ws.send(response.base64);
          ws.onmessage = (e) => {
            // console.log(response.base64)
            // console.log(response.type)
            // console.log(response.uri)
            // console.log(response.fileSize)
            var count = e.data.split('$')[0];
            var res = e.data.split('$')[1];
            setImageResponse(res);
            setObjectCount(count);
          };
        }
      },
    );
  };
  const pickImagefromImageLibrary = async () => {
    // Image Picking From Device Camera
    setImageResponse(null);
    setObjectCount(null);
    var ws = new WebSocket('ws://xx.xx.xxx.xxx:port');
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 1500,
        maxWidth: 1500,
      },
      (response) => {
        if (response.didCancel == true) {
          Alert.alert(
            'Wrong Choice !!',
            'Please select a photo !!',
            [{text: 'OK', onPress: () => console.log('OK')}],
            {cancelable: false},
          );
        } else {
          setResponse(response);
          ws.send(response.base64);
          ws.onmessage = (e) => {
            // console.log(response.base64)
            // console.log(response.type)
            // console.log(response.uri)
            // console.log(response.fileSize)
            var count = e.data.split('$')[0];
            var res = e.data.split('$')[1];
            setImageResponse(res);
            setObjectCount(count);
          };
        }
      },
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });
  const Separator = () => <View style={styles.separator} />;
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{marginTop: 50, alignItems: 'center'}}>
          <Button
            title="Pick an image from Camera"
            onPress={pickImagefromCamera}
          />
        </View>

        <Separator />

        <View style={{alignItems: 'center'}}>
          <Button
            title="Pick an image from Image Lıbary"
            onPress={pickImagefromImageLibrary}
          />
        </View>

        <Separator />

        {response && (
          <View style={{alignItems: 'center', backgroundColor: 'black'}}>
            <ImageZoom
              cropWidth={600}
              cropHeight={400}
              imageWidth={600}
              imageHeight={400}>
              <Image
                source={{uri: response.uri}}
                style={[
                  {
                    width: 600,
                    height: 400,
                  },
                ]}
              />
            </ImageZoom>
          </View>
        )}

        <Separator />

        {objectCount && (
          <Text style={{fontWeight: 'bold', color: 'red', alignSelf: 'center'}}>
            There are {objectCount} object in sent image
          </Text>
        )}

        <Separator />

        {imageResponse && (
          <View style={{alignItems: 'center', backgroundColor: 'black'}}>
            <ImageZoom
              cropWidth={600}
              cropHeight={400}
              imageWidth={600}
              imageHeight={400}>
              <Image
                source={{uri: `data:image/jpeg;base64,${imageResponse}`}}
                style={[
                  {
                    width: 600,
                    height: 400,
                  },
                ]}
              />
            </ImageZoom>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
