/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  const handleAddProject = async () => {
    const {data} = await api.post('projects', {
      title: 'Mobile com react-native add new',
      owner: 'Anderson B. Silva',
    });

    setProjects([...projects, data]);
  };

  useEffect(() => {
    api.get('projects').then(resp => {
      console.log(resp.data);
      setProjects(resp.data);
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      {/* <View style={styles.container}>
                <Text style={styles.title}>Anderson B. Silva</Text>
            </View> */}

      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({item: project}) => {
            return <Text style={styles.project}> {project.title} </Text>;
          }}
        />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.6}
          onPress={handleAddProject}>
          <Text style={styles.buttonText}>Adiconar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7159c1',
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  project: {
    color: '#fff',
    fontSize: 18,
    // fontWeight:"bold",
  },
  button: {
    alignSelf: 'stretch',
    borderRadius: 4,
    margin: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#111',
  },
});
