import React, {useState, useEffect} from "react";

import { 
    View, 
    Text,
    StyleSheet,
    FlatList,
    TextInput, 
    Platform } from "react-native";

import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

export function Home() {

    //IMUTABILIDADE
    //nweSkill - é o quem o estado / setNewSkill - é a função que atualiza o estado
    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setMySkills] = useState([]);

    function handleAddNewSkill(){
        setMySkills(oldState => [...oldState, newSkill]);
    }
 
    //onChangeText - fica observando toda a vez que muda o valor
    return (
        <View style={styles.container}>
        <Text style={styles.title}>
            Welcome, Bruno
        </Text>

        <TextInput 
        style={styles.input} 
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill} /> 

        <Button onPress={handleAddNewSkill}/>

        <Text style={[styles.input, {marginVertical: 40} ]}>
            My Skills
        </Text>

        <FlatList 
            data={mySkills}
            keyExtractor={item => item}
            renderItem={({ item }) => (
                <SkillCard skill={item}/>
            )}
        />

        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121015",
        paddingHorizontal: 30,
        paddingVertical: 50,
    },
    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    input: {
        backgroundColor: "#1F1E25",
        color: "#FFF",
        fontSize: 18,
        padding: Platform.OS === "ios" ? 15 : 10,
        marginTop: 30,
        borderRadius: 7
    },
    });
