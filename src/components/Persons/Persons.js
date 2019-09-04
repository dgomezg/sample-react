import React, { Component } from 'react'
import Person from './Person/Person';

class Persons extends Component {
    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Persons.js] getDerivedStateFromProps');
    //     return state;
    // }

    componentWillReceiveProps(props) {
        console.log('[Persons.js] componentWillReceiveProps', props);
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Persons.js] shouldComponentUpdate');
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        //Usually it could be the new scroll coordinates or something like that
        return { message: 'Snapshot!' }; 
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate'); 
        console.log(snapshot);
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