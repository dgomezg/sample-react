import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';


class App extends Component {
  state = {
    persons : [
      {id:'asd', name: 'David', age: 44},
      {id:'fdas', name: 'Cris', age: 41},
      {id:'rqwe', name: 'Alonso', age: 7},
      {id:'fsgd', name: 'Helena', age: 4}
    ], 
    showPersons: false
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})

  } 

  nameChangeHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex( p => {
      return p.id === id;
    });
    const person = {...this.state.persons[personIndex]};
    person.name = event.target.value;

    const newPersons = [...this.state.persons]
    newPersons[personIndex] = person
    this.setState({persons: newPersons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {

    const style = {
      backgroundColor: 'green',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px', 
      cursor: 'pointer'
    }

    let persons = null;

    if (this.state.showPersons) {
      style.backgroundColor = 'red';
      persons = (
        <div>
          {this.state.persons.map((person,index) => {
            return (
              <Person key={person.id}
                click={this.deletePersonHandler.bind(this, index)}
                changed={(event) => this.nameChangeHandler(event, person.id)}
                name={person.name} 
                age={person.age}
              />
            );
          })}
        </div> 
      );
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working</p>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Show/Hide persons</button>
        {persons}
      </div>
    );  
  }
}
export default App;
/*
const App = props => {

  const [personsState, setPersonsState] = useState({
    persons : [
      {name: 'David', age: 44},
      {name: 'Cris', age: 41},
      {name: 'Alonso', age: 7},
      {name: 'Helena', age: 4}
    ]
  });

  const [otherState, setOtherState] = useState('some other value')
  console.log(personsState, otherState);

  const switchNameHandler = () => {
    let newPersons = [...personsState.persons]
    newPersons[0].name= "David G."
    newPersons[1].name="Cristina"
    newPersons[1].age=40 
    setPersonsState({persons: newPersons});
  }
  
  return (
    <div className="App">
    <h1>Hi, I'm a React App</h1>
    <p>This is really working</p>
    <button onClick={switchNameHandler}>Switch name</button>

    <Person name={personsState.persons[0].name} age={personsState.persons[0].age}/>
    <Person name={personsState.persons[1].name} age={personsState.persons[1].age}/>
    <Person name={personsState.persons[2].name} age={personsState.persons[2].age}/>
    <Person name={personsState.persons[3].name} age={personsState.persons[3].age}/>
  </div>    
  )
}

export default App;
*/


/*
function App() {

  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
    </div>
  );
}

export default App;
*/