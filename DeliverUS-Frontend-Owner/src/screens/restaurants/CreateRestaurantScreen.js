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
  const [restaurantCategories, setRestaurantCategories] = useState([])
  const [open, setOpen] = useState(false)
  const initialRestaurantValues = {
    name: null,
    description: null,
    address: null,
    postalCode: null,
    url: null,
    shippingCosts: null,
    email: null,
    phone: null,
    restaurantCategoryId: null
  }
  useEffect(() => {
    async function fetchRestaurantCategories() {
      try {
        const fetchedRestaurantCategories = await getRestaurantCategories()
        const fetchedRestaurantCategoriesReshaped =
          fetchedRestaurantCategories.map(e => {
            return {
              label: e.name,
              value: e.id
            }
          })
        setRestaurantCategories(fetchedRestaurantCategoriesReshaped)
      } catch (error) {
        showMessage({
          message: `There was an error while retrieving restaurant categories. ${error} `,
          type: 'error',
          style: GlobalStyles.flashStyle,
          titleStyle: GlobalStyles.flashTextStyle
        })
      }
    }
    fetchRestaurantCategories()
  }, [])
  return (
    <Formik initialValues={initialRestaurantValues}>
      {({ setFieldValue, values }) => (
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
              <InputItem name="name" label="name" />
              <DropDownPicker
                open={open}
                value={values.restaurantCategoryId}
                items={restaurantCategories}
                setOpen={setOpen}
                onSelectItem={item => {
                  setFieldValue('restaurantCategoryId', item.value)
                }}
                setItems={setRestaurantCategories}
                placeholder="Select the restaurant category"
                containerStyle={{ height: 40, marginTop: 20 }}
                style={{ backgroundColor: GlobalStyles.brandBackground }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
              />
              <InputItem name="description" label="description" />
              <InputItem name="address" label="address" />
              <InputItem name="postalCode" label="postalCode" />
              <InputItem name="url" label="url" />
              <InputItem name="shippingCosts" label="shippingCosts" />
              <InputItem name="email" label="email" />
              <InputItem name="phone" label="phone" />
              <ImagePicker
                label="Logo:"
                image={values.logo}
                defaultImage={restaurantLogo}
                onImagePicked={result => setFieldValue('logo', result)}
              />
              <ImagePicker
                label="Hero Image:"
                image={values.heroImage}
                defaultImage={restaurantBackground}
                onImagePicked={result => setFieldValue('heroImage', result)}
              />
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
                <TextRegular textStyle={styles.text}>
                  Create restaurant
                </TextRegular>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
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
  },
  imagePicker: {
    height: 40,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 80
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5
  }
})
