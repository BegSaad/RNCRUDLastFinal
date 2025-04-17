
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteUser} from '../redux/UserSlice';

const Users = () => {
  const navigation = useNavigation();
  const users = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleDelete = index => {// alert se pop hota hai
    Alert.alert('Delete User', 'Are you sure you want to delete this user?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        onPress: () => dispatch(deleteUser(index)),
        style: 'destructive',
      },
    ]);
  };

  const renderItem = ({item, index}) => (
    <View style={styles.card}>
      <View style={styles.cardLeftBar} />

      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>🎂 DOB:</Text>
          <Text style={styles.value}>{item.dob}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>📊 Age Group:</Text>
          <Text style={styles.value}>{item.age}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>💍 Status:</Text>
          <Text style={styles.value}>
            {item.isMarried ? 'Married' : 'Unmarried'}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>📍 Address:</Text>
          <Text style={styles.value}>{item.address}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() =>
              navigation.navigate('AddUser', {
                type: 'edit',
                data: item,
                index,
              })
            }>
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>// ye wala button use karna sahi rehta
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => handleDelete(index)}>
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>  // flatlist me bi 3 prop hote hai
      <FlatList
        data={users.data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 100, paddingTop: 16}}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No users added yet.</Text>
        }
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddUser', {type: 'add'})}>
        <Text style={styles.addBtnText}>＋ Add New User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 3,
  },
  cardLeftBar: {
    width: 6,
    backgroundColor: '#3B82F6',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontWeight: '600',
    color: '#374151',
    marginRight: 6,
  },
  value: {
    color: '#4B5563',
    flexShrink: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 10,
  },
  editBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#3B82F6',
    alignItems: 'center',
  },
  deleteBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#EF4444',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  addBtn: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
    elevation: 6,
  },
  addBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#6B7280',
  },
});

export default Users;
