import React, { useEffect } from 'react' 
import classes from './Cockpit.css'

const Cockpit = (props) => {

    //useEffect takes a function that will be run for 
    // every render cycle 
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        //Http request... (mocking an http request that takes 1 second)
        const timer = setTimeout(() => {
            alert('Save data to cloud!')
        }, 3000 )
        //The function returned by the useEffect will run before the main useEffect
        // but after the (first) render cycle, so, the next time: as we are using
        // ´[] as the second parameter, in fact, the function will be executed
        // before the component is removed.
        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect');
            clearTimeout(timer);  
        }
    }, 
    //The second argum ent for useEffect is an array that points to all 
    // the variables and data that is used on the effect. 
    //[props.persons]);

    //if the effect should be used for multiple fields, those can be added 
    // to the array
   //[props.persons, props.some-other-value]);
     
    //if we pass an empty array as 2nd argument, we instruct react to 
    // that the effect has no dependencies and should be run whenever
    // one of the dependencies changes.
    // In this case, as Cockpit has no dependenices, an empty array will 
    // make run only the first time (the default)
    []);

    //If you have different effects that depend on different data, 
    // different use Effects can be used linking to different data 
    // (using for that the second argument.)
    //useEffect(() => {}, [props.someValue])
    //useEffect(() => {}, [props.somothervalue])

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');
        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');
            //useful when you have operations that should be cancelled 
            // before rendering the next time the component.
        };
    });

    const assignedClasses = [];
    let btnClass = '';
    if (props.showPersons) {
        btnClass = classes.Red;    
    }
    
    if (props.personsLength <= 2) {
      assignedClasses.push(classes.red);
    }
    if (props.personsLength <= 1) {
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

export default React.memo(Cockpit);