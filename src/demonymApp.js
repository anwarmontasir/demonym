import React, { Component } from 'react';
import './demonymApp.css';

import Demonym from './demonym';
import CountrySelector from './countrySelector';

class DemonymApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            selected: null
        }
    }
    setSelected(selected) {
        this.setState({
            selected
        })
    }
    compare(a, b) {
        let comparison = 0;
        if (a.name > b.name) {
          comparison = 1;
        } else {
          comparison = -1;
        }
        return comparison;
    }
    componentDidMount() {
        fetch('https://country.register.gov.uk/records.json?page-size=5000')
            .then(response => {
                console.log('checking for errors');
                if(!response.ok) {
                    throw new Error('something went wrong');
                }
                return response;
            })
            .then(response => response.json())
            .then(data => {
                const countries = Object.keys(data).map(key => data[key].item[0]);
                countries.sort(this.compare);
                this.setState( {
                    countries
                })
            })
            .catch(err => {
                this.setState({
                    error: err.message
                })
            })
        }
    render() {
        const error = this.state.error ? <div className="demonym_app__error">{this.state.error}</div> : "";
        const demonym = this.state.selected ? <Demonym name={this.state.selected['citizen-names']} country={this.state.selected.name} /> : <div className="demonym_app__placeholder">Select a country above</div>;
        return (
            <div className="demonym_app">
                <div className="error">{error}</div>
                <CountrySelector countries={this.state.countries} changeHandler={selected => this.setSelected(selected)} />
                {demonym}
            </div>
        )
    }
}

export default DemonymApp;