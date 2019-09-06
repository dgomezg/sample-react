import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux'

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
    /* Former way (and still possible) to initialize state
    this.state = {
      persons : [
        {id:'asd', name: 'David', age: 44},
        {id:'fdas', name: 'Cris', age: 41},
        {id:'rqwe', name: 'Alonso', age: 7},
        {id:'fsgd', name: 'Helena', age: 4}
      ], 
      showPersons: false
    }
    */
  }

  // More Modern way to init state
  state = {
    persons : [
      {id:'asd', name: 'David', age: 44},
      {id:'fdas', name: 'Cris', age: 41},
      {id:'rqwe', name: 'Alonso', age: 7},
      {id:'fsgd', name: 'Helena', age: 4}
    ], 
    showPersons: false, 
    showCockpit: true, 
    isAuthenticated: false,
    changeCounter: 0
  }
  
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentWillMount() {
    console.log('[App.js] componentWillMount');
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    //Can be used for performance improvements
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
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
    
    /* This is a bad use of setState when new state depends on current state
    this.setState({
      persons: newPersons, 
      //now, this.state could not have the right value
      // depending on when React decides to invoque the render
      changeCounter: this.state.changeCounter + 1
    }); */
    // When new state depends on current state, use as parameter
    // a function that receives prevState and props and returns the new state.
    this.setState((prevState, props) => {
      return {
        persons: newPersons, 
        //now, prevState is guaranteed to have the right state.
        changeCounter: prevState.changeCounter + 1
      }
    });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  loginHandler = () => {
    console.log('[App.js] loginHandler');
    this.setState({isAuthenticated : true});
  }

  render() {
    console.log('[App.js] render');
    let persons = null;
    

    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangeHandler}
            isAuthenticated={this.state.isAuthenticated} />
        </div> 
      );
    }

    return (
      <Aux>
        <button onClick={() => {
          this.setState({showCockpit: false});
        }}>Remove cockpit</button>
        {this.state.showCockpit ? 
            <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonsHandler} 
            login={this.loginHandler}/>
          : null
        }
        {persons}
      </Aux>
    );  
  }
}
export default withClass(App, classes.App);
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