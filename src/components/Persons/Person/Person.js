import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'

import classes from './Person.css';
import withClass from '../../../hoc/withClass';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
    constructor(props) {
        super(props)
        this.inputElementRef = React.createRef();
    }

    componentDidMount() {
        console.log('[Person.js] componentDidMount');
        // This will give focus to the first input in the element.
        //document.querySelector('input').focus();
        //this.inputElement.focus();
        this.inputElementRef.current.focus();
    }

    render() {
        console.log('[Person.js] rendering...')
        return (
            <Fragment>
                <AuthContext.Consumer>
                    {context => context.authenticated ? <p> Authenticated </p> : <p> Please Log In!</p>}
                </AuthContext.Consumer>
                <p  onClick={this.props.clicked}>
                    I'm {this.props.name} and I am {this.props.age} years old!
                </p>
                <p>{this.props.children}</p> 
                <input
                    //ref={(inputEl) => {this.inputElement = inputEl}}
                    ref={this.inputElementRef}
                    type="text"  
                    onChange={this.props.changed} 
                    value={this.props.name}/>
            </Fragment>
        )
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);

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


