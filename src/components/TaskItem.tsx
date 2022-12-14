import React, { useRef, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Image, Text, TextInput } from "react-native";
import trashIcon from '../assets/icons/trash/trash.png'
import Icon from 'react-native-vector-icons/Feather';

export interface Task {
  id: number;
  title: string;
  done?: boolean;
}

interface TasksListProps {
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  item: Task ;
  index: number;
}


export function TaskItem ({toggleTaskDone, removeTask, index, item}: TasksListProps) {
  const [editItem, setEditItem] = useState(false);
  const [value, setValue] = useState(item.title);
  const textInputRef = useRef<TextInput>(null)

  console.log(value)


  return(
    <>
      <View>
          <TouchableOpacity
            testID={`button-${index}`}
            activeOpacity={0.7}
            style={styles.taskButton}
            onPress={()=>toggleTaskDone(item.id)}
          >
            <View 
              style={item.done ? styles.taskMarkerDone: styles.taskMarker}
              testID={`marker-${index}`}
              //TODO - use style prop 
            >
              { item.done && (
                <Icon 
                  name="check"
                  size={12}
                  color="#FFF"
                />
              )}
            </View>

            <Text 
            style={item.done ? styles.taskTextDone: styles.taskText}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24 }}
          onPress={()=>removeTask(item.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
    </>
  )
 }
const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
});

