

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../redux/UserSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const ageGroups = ['10-20', '21-30', '31-40', '41+'];

const AddUser = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = route.params?.data;

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(userData?.dob ? new Date(userData.dob) : new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [isMarried, setIsMarried] = useState(userData?.isMarried || false);

  const validationSchema = Yup.object().shape({// ye sab use kiya hai validation ke liye

    name: Yup.string()
      .matches(/^[A-Za-z ]+$/, 'Only alphabets are allowed')
      .required('Name is required'),
    dob: Yup.date()
      .max(new Date(), 'DOB cannot be in the future')
      .required('Date of birth is required'),
    age: Yup.string().required('Age group is required'),
    address: Yup.string()
      .matches(/^[A-Za-z0-9\s,.'-]*$/, 'No special characters allowed')
      .required('Address is required'),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const payload = {
        ...values,
        isMarried,
      };
      if (route.params?.type === 'edit') {
        dispatch(updateUser({ ...payload, index: route.params.index }));
      } else {
        dispatch(addUser(payload));
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Formik
          initialValues={{
            name: userData?.name || '',
            dob: userData?.dob || '',  //ye sab formik use kiya hai
            age: userData?.age || ageGroups[0],
            address: userData?.address || '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <>
              <TextInput
                placeholder="Enter User Name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                style={styles.input}
              />
              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}

              <TouchableOpacity style={styles.input} onPress={() => setOpen(true)}>
                <Text style={{ fontSize: 16, color: values.dob ? '#000' : '#999' }}>
                  {values.dob ? values.dob : 'Select Date of Birth'}
                </Text>
              </TouchableOpacity>
              {touched.dob && errors.dob && (
                <Text style={styles.error}>{errors.dob}</Text>
              )}

              <DatePicker
                modal// ye modal se alag box khulta hai

                mode="date" //isko date karne se date picker khulta hai
                open={open}
                date={date}
                maximumDate={new Date()}
                onConfirm={(selectedDate) => {
                  setOpen(false);
                  setDate(selectedDate);
                  setFieldValue('dob', formatDate(selectedDate));
                }}
                onCancel={() => setOpen(false)}
              />

              <Text style={styles.label}>Age Group</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={values.age}
                  onValueChange={(itemValue) => setFieldValue('age', itemValue)}
                  style={styles.picker}>
                  {ageGroups.map((group) => (
                    <Picker.Item key={group} label={group} value={group} />
                  ))}
                </Picker>
              </View>
              {touched.age && errors.age && (
                <Text style={styles.error}>{errors.age}</Text>
              )}

              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>{isMarried ? 'Married' : 'Unmarried'}</Text>
                <Switch
                  value={isMarried}
                  onValueChange={setIsMarried}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}

                  thumbColor={isMarried ? '#f5dd4b' : '#f4f3f4'}// ye css hai zaruri nahi hai yaha
                />
              </View>

              <TextInput
                placeholder="Enter Address"
                value={values.address}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                style={[styles.input, styles.textArea]}
                multiline={true}
                numberOfLines={4}
              />
              {touched.address && errors.address && (
                <Text style={styles.error}>{errors.address}</Text>
              )}

              <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonLoading]}
                onPress={handleSubmit}
                activeOpacity={0.8}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Save User</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  innerContainer: { padding: 20, paddingTop: 40 },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#111827',
    fontWeight: '500',
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginBottom: 10,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  button: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonLoading: { backgroundColor: '#6B7280' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 10,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default AddUser;

