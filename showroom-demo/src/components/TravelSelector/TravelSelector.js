import React, {Component} from 'react';
import Travel from './Travel/Travel';

class TravelSelector extends Component {
    render() {
        return (
            <div>
            <h2>Choose your Travel</h2>
            <div className="Travels">
                <Travel title="Amsterdam"/>
                <Travel title="Egipt"/>
                <Travel title="Caribean"/>
            </div>
          </div>
                    
        );
    }
} 

export default TravelSelector;