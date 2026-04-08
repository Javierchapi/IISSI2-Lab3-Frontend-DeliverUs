import { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as yup from 'yup'
import DropDownPicker from 'react-native-dropdown-picker'
import { create, getRestaurantCategories } from '../../api/RestaurantEndpoints'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import restaurantLogo from '../../../assets/restaurantLogo.jpeg'
import restaurantBackground from '../../../assets/restaurantBackground.jpeg'
import { showMessage } from 'react-native-flash-message'
import { ErrorMessage, Formik } from 'formik'
import TextError from '../../components/TextError'
import ImagePicker from '../../components/ImagePicker'

export default function CreateRestaurantScreen() {
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ width: '60%' }}>
        <InputItem name="sampleInput" label="Sample input" />
        <InputItem name="sampleInput" label="Sample input" />
        <InputItem name="sampleInput" label="Sample input" />
        <InputItem name="sampleInput" label="Sample input" />
        <InputItem name="sampleInput" label="Sample input" />
        <InputItem name="sampleInput" label="Sample input" />
        <InputItem name="sampleInput" label="Sample input" />
        <InputItem name="sampleInput" label="Sample input" />
        <Pressable
          onPress={() => console.log('Button pressed')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? GlobalStyles.brandPrimaryTap
                : GlobalStyles.brandPrimary
            },
            styles.button
          ]}
        >
          <TextRegular textStyle={styles.text}>Create restaurant</TextRegular>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginLeft: 5
  }
})
