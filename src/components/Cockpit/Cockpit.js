import React, { useEffect } from 'react' 
import classes from './Cockpit.css'

const Cockpit = (props) => {

    //useEffect takes a function that will be run for 
    // every render cycle 
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        //Http request...

    });

    const assignedClasses = [];
    let btnClass = '';
    if (props.showPersons) {
        btnClass = classes.Red;    
    }
    
    if (props.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (props.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working</p>
            <button 
            className={btnClass}
            onClick={props.clicked}>Show/Hide persons</button>
        </div>
    );
};

export default Cockpit;