import React from 'react';
import classes from './Person.css'

const person = (props) => {
    const rnd = Math.random();

    if (rnd > 0.7) {
        throw new Error('Somthing went wrong');
    }
    return (
        <div className={classes.Person}>
            <p  onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
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


