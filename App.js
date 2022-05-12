import React, {useState, useEffect} from 'react';
import  torch from 'react-native-torch';
import RNShake from 'react-native-shake';

import {
View,
StyleSheet,
Image,
TouchableOpacity,
Pressable,
Text,
Linking

} from 'react-native';


const imageProfileGithub = 'https://avatars.githubusercontent.com/u/78884474?s=100&v=4';
const Urlgithub = 'https://github.com/igomarcos';
const colorFontdarkGit = '#4F565E';

const App = () => {

  const handlePressGotoGithub = async ()=>{
    const res = await Linking.canOpenURL(Urlgithub);
       if (res) {
            await Linking.openURL(Urlgithub);
       };
    };

  const [toggle, setToggle ] = useState(false);

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect (() =>{
      //liga o flash do celular
      torch.switchState(toggle)
    }, [toggle]);

    //identifica movimento do celular
  useEffect (() =>{
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });

    // essa função vai ser chamada quando o componente for desmontados
      return () => subscription.remove()
  }, []);


  return ( 
    <View style={toggle ? style.containerLight : style.containerBlack}>

      <TouchableOpacity onPress={handleChangeToggle}>


        <Image
          style={toggle ? style.lightingOn : style.lightingOff}
          source={
            toggle  
            ? require('./assets/icons/eco-light.png')
            : require('./assets/icons/eco-light-off.png')
          }
        />

        <Image
          style={style.dioLogo}
          source={
            toggle  
            ? require('./assets/icons/logo-dio.png')
            : require('./assets/icons/logo-dio-white.png')
          }
        />

      </TouchableOpacity>

      <View style={style.foto}>
          <Image
            source={{uri: imageProfileGithub}}
            accessibilityLabel="foto igo" 
            style={style.avatar} 
          />

          <Pressable onPress={ handlePressGotoGithub }>
            <View style = {style.buttom}>
                <Text style = {style.textButtom} >
                    My Github
                </Text>
            </View>
          </Pressable>
        </View>

    </View>
  );
};

export default App;

const style = StyleSheet.create({
  containerBlack: { 
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',    
  },

  containerLight: { 
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',    
  },

  lightingOn: { 
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },

  lightingOff: { 
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },

  dioLogo: { 
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },

  foto: {
    
    alignItems: 'center'
  },

  avatar:{
    height: 75,
    width: 75,
   borderRadius: 75,
   borderColor: 'white',
   borderWidth: 3,
},

buttom : {
  marginTop: 10,
  backgroundColor: colorFontdarkGit,
  borderRadius: 100,
  padding: 20,
},

textButtom : {
  fontWeight: 'bold',
  fontSize: 24,
  color: 'white',
},


});