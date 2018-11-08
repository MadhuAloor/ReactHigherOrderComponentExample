import React, { Component } from 'react';

import Title from './Title';
import Input from './Input';
import Result from './Result';

import calculatePizzasNeeded from './lib/calculate-pizzas-needed';

const initialState = {
  numberOfPeople: 10,
  slicesPerPerson: 2,
};

//Higher Order Component example 
const WithPizzaCalculations = WrappedComponent => {
  return class extends React.Component {
    static displayName = `WithPizzaCalculations(${ WrappedComponent.displayName || WrappedComponent.name })`;
    state = { ...initialState };

    updateNumberOfPeople = event => {
      const numberOfPeople = parseInt(event.target.value, 10);
      this.setState({ numberOfPeople });
    };
  
    updateSlicesPerPerson = event => {
      const slicesPerPerson = parseInt(event.target.value, 10);
      this.setState({ slicesPerPerson });
    };
  
    reset = event => {
      this.setState({ ...initialState });
    };
  
    render() {
      const { numberOfPeople, slicesPerPerson } = this.state;
      const numberOfPizzas = calculatePizzasNeeded(
        numberOfPeople,
        slicesPerPerson,
      );
  
      return (
        <WrappedComponent 
          numberOfPeople = { numberOfPeople}
          updateNumberOfPeople = { this.updateNumberOfPeople}
          slicesPerPerson = {slicesPerPerson}
          updateSlicesPerPerson = {this.updateSlicesPerPerson}
          reset = {this.reset}
          numberOfPizzas = {numberOfPizzas}
          />
      );
    }
  }
}

class PizzaCalculator extends React.Component{
  render(){
    const { numberOfPeople ,numberOfPizzas,  updateNumberOfPeople, slicesPerPerson, updateSlicesPerPerson, reset } = this.props;
    return (
      <div className="Application">
        <Title />
        <Input
          label="Number of Guests"
          type="number"
          min={0}
          value={numberOfPeople}
          onChange={updateNumberOfPeople}
        />
        <Input
          label="Slices Per Person"
          type="number"
          min={0}
          value={slicesPerPerson}
          onChange={updateSlicesPerPerson}
        />
        <Result amount={numberOfPizzas} />
        <button className="full-width" onClick={reset}>
          Reset
        </button>
      </div>
    )
  }
}

/* 
   create container using HOC WithPizzaCalculations by 
   passing presentation component `PizzaCalculator` as param
*/

const PizzaContainer = WithPizzaCalculations(PizzaCalculator)

export default class Application extends React.Component {
  render(){
    return (
      <PizzaContainer />
    );
  }
}
