
import React from "react";
import { View, Text, Button } from "react-native";

export default function LoginScreen({navigation}){
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text>Login</Text>
      <Button title="Entrar" onPress={()=>navigation.navigate('MainTabs')} />
      <Button title="Registrarse" onPress={()=>navigation.navigate('Register')} />
    </View>
  );
}
