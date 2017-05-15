import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input } from './Common';
import firebase from 'firebase';


class LoginForm extends Component {
    state={
        email:'',
        password:'',
        error: '',
    };
    ButtonLogIn(){
        // console.log("working---------------")
        const {email,password} = this.state;
         this.setState({error: ''})
        firebase.auth().signInWithEmailAndPassword(email,password)
        .catch(()=>{
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .catch(()=>{
                this.setState({error: 'Authentication Failed.!'})
            })
        });
    }
    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder='user@gmail.com'
                        label='Email:'
                        value={this.state.email}
                        onChangeText={email => this.setState({email})} 
                    />
                </CardSection> 
                <CardSection>
                    <Input 
                        secureTextEntry
                        placeholder='password'
                        label='Password:'
                        value={this.state.password}
                        onChangeText={password => this.setState({password})} 
                    />
                </CardSection>
                <Text style={styles.errorStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                    <Button onPress={this.ButtonLogIn.bind(this)}>
                        Log In
                    </Button>
                </CardSection>
            </Card>
        );
    }
}
const styles={
    errorStyle:{
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    }
}
export default LoginForm;