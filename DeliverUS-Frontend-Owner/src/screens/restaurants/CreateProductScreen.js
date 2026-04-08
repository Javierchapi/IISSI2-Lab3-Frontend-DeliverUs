import { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import defaultProductImage from '../../../assets/product.jpeg'
import { getProductCategories, create } from '../../api/ProductEndpoints'
import { showMessage } from 'react-native-flash-message'
import DropDownPicker from 'react-native-dropdown-picker'
import * as yup from 'yup'
import { ErrorMessage, Formik } from 'formik'
import TextError from '../../components/TextError'
import ImagePicker from '../../components/ImagePicker'

export default function CreateProductScreen({ navigation, route }) {
  const [productCategories, setProductCategories] = useState([])
  const [open, setOpen] = useState(false)
  const initialProductValues = {
    name: null,
    description: null,
    price: null,
    image: null,
    order: null,
    productCategory: null,
    availability: null
  }
  useEffect(() => {
    async function fetchProductCategories() {
      try {
        const fetchedProductCategories = await getProductCategories()
        const fetchedProductCategoriesReshaped = fetchedProductCategories.map(
          e => {
            return {
              label: e.name,
              value: e.id
            }
          }
        )
        setProductCategories(fetchedProductCategoriesReshaped)
      } catch (error) {
        showMessage({
          message: `There was an error while retrieving restaurant categories. ${error} `,
          type: 'error',
          style: GlobalStyles.flashStyle,
          titleStyle: GlobalStyles.flashTextStyle
        })
      }
    }
    fetchProductCategories()
  }, [])
  return (
    <Formik initialValues={initialProductValues}>
      {({ setFieldValue, values }) => (
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
              <InputItem name="name" label="name" />
              <DropDownPicker
                open={open}
                value={values.productCategoryId}
                items={productCategories}
                setOpen={setOpen}
                onSelectItem={item => {
                  setFieldValue('productCategoryId', item.value)
                }}
                setItems={setProductCategories}
                placeholder="Select the product category"
                containerStyle={{ height: 40, marginTop: 20 }}
                style={{ backgroundColor: GlobalStyles.brandBackground }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
              />
              <InputItem name="description" label="description" />
              <InputItem name="price" label="price" />
              <TextRegular>Is it available?</TextRegular>
              <Switch
                trackColor={{
                  false: GlobalStyles.brandPrimary,
                  true: GlobalStyles.brandSuccess
                }}
                thumbColor={
                  values.availability ? GlobalStyles.brandSecondary : '#fafafa'
                }
                value={values.availability}
                style={styles.switch}
                onValueChange={value => setFieldValue('availability', value)} // si la función es más compleja, podemos invocar otra función así onValueChange={toggleSwitch}
              />
              <ImagePicker
                label="Product:"
                image={values.image}
                defaultImage={defaultProductImage}
                onImagePicked={result => setFieldValue('logo', result)}
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
                  Create product
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
  },
  switch: {
    marginTop: 20
  }
})
