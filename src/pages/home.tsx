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

interface SkillData {
    id: string;
    name: string;
}

export function Home() {

    //IMUTABILIDADE - HOOKS
    //nweSkill - é o quem o estado / setNewSkill - é a função que atualiza o estado
    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setMySkills] = useState<SkillData[]>([]);
    const [gretting, setGretting] = useState('');

    function handleAddNewSkill(){

        const data = {
            id: String(new Date().getTime()),
            name: newSkill
        }

        //console.log("New Skill",data);

        setMySkills(oldState => [...oldState, data]);
    }

    function handleRemoveSkill(id: string){
        setMySkills(oldState => oldState.filter(
            skill => skill.id !== id
        ))
    }
    //useEffect
    useEffect(() => {
        const currentHour = new Date().getHours() - 3;
        console.log(currentHour);
        //console.log(Date());
        //const currentHour = 16;
        if(currentHour < 12){
            setGretting('Good Morning!');
        }
        else if(currentHour >=12 && currentHour < 18){
            setGretting('Good Afternoon!');
        }
        else {
            setGretting('Good Night!');
        }
    }, [])
 
    //onChangeText - fica observando toda a vez que muda o valor
    return (
        <View style={styles.container}>
            
            <Text style={styles.title}>
                Welcome, Bruno
            </Text>

            <Text style={styles.greetings}>
            { gretting } 
            </Text>

            <TextInput 
            style={styles.input} 
            placeholder="New skill"
            placeholderTextColor="#555"
            onChangeText={setNewSkill} /> 

            <Button 
                title="Add"
                onPress={handleAddNewSkill}
            />

            <Text style={[styles.input, {marginVertical: 40, color: '#A370F7', fontWeight: 'bold'} ]}>
                My Skills
            </Text>

            <FlatList 
                data={mySkills}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <SkillCard 
                    skill={item.name}
                    onPress={() =>handleRemoveSkill(item.id)}
                    />
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
    greetings: {
        color: '#FFF'
    }
    });
