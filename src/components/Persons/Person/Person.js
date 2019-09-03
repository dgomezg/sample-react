import React from 'react';
import classes from './Person.css'

const person = (props) => {
    console.log('[Person.js] rendering...')
    return (
        <div className={classes.Person}>
            <p onClick={props.clicked}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    )
}
export default person;

/*
class Person extends Component {
    render() {
        return (
            <div>
                <p>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
            </div>
        )
    
    }
}
export default Person;
*/


