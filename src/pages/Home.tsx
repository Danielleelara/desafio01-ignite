import React, { useState } from "react";
import { Alert, StyleSheet,  View } from "react-native";

import { Header } from "../components/Header";
import { TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export interface Task {
  id: number;
  title: string;
  done?: boolean;
}

interface TasksListProps {
  item: Task ;
  index: number;
}


export function Home({item ,
  index}:TasksListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  // const [values, setValue] = useState({
  //   name: '',
  // })

  function handleAddTask(newTaskTitle: string) {
    const task = {
      id: Number(new Date().getTime()),
      title: newTaskTitle,
      done: false,
    };

    const foundTask = tasks.find((task) => task.title === newTaskTitle);

    if (foundTask) {
      return Alert.alert("Task já cadastrada");
    }
    setTasks((oldState) => [...oldState, task]);
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) return { ...task, done: true };
      return task;
    });
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "SIM",
          onPress: () => setTasks((oldState) => oldState.filter((task) => task.id !== id)),
        },
        {
          text: "NÃO",
          onPress: () => Alert.alert("Item não removido"),
        },
      ],
    );
  }

  function handleEditTask(taskId:number ,taskNewTitle: string){
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) return { ...task, title: taskNewTitle };
      return task;
    });
    setTasks(newTasks);
  }


  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
       item={item} 
       index={index}
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
