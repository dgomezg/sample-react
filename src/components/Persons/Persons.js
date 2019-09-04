import React, { Component } from 'react'
import Person from './Person/Person';

class Persons extends Component {
    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Persons.js] getDerivedStateFromProps');
    //     return state;
    // }

    // componentWillReceiveProps(props) {
    //     console.log('[Persons.js] componentWillReceiveProps', props);
    // }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Persons.js] shouldComponentUpdate');
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        //Usually it could be the new scroll coordinates or something like that
        return { message: 'Snapshot!' }; 
    }

    // componentWillUpdate() {        
    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //This is where you can fetch new data from the server
        // i.e Invoking an HTTP request.
        console.log('[Persons.js] componentDidUpdate'); 
        console.log(snapshot);
    }

    componentWillUnmount() {
        //Allows to do clean up when the component removed.
        console.log('[Persons.js] componentWillUnmont')
    }
    render() {
        console.log('[Persons.js] rendering...')
        return this.props.persons.map((person, index) => {
            return (
              <Person
                key={person.id}
                clicked={() => this.props.clicked(index)}
                changed={(event) => this.props.changed(event, person.id)}
                name={person.name} 
                age={person.age}
              />
            );
          });
        };
    }

export default Persons;