import { connect } from 'react-redux';
import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';
import { setSearchField } from '../actions';

const mapStateToProps = (state) => ({ searchField: state.searchField });

const mapDiscpatchToProps = (dispatch) => ({ onSearchChange: (event) => {dispatch(setSearchField(event.target.value))}});

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            robots: []
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots: users}));
    }

    render() {
        const { robots } = this.state;
        const { searchField, onSearchChange } = this.props;
        const filteredRobots = robots.filter(({ name }) => {
            return name.toLowerCase().includes(searchField.toLowerCase());
        });

        return !robots.length ? 
            (<h1 className="tc">Loading</h1>) :
            (
            <div className="tc">
                <h1 className='f2'>Robofriends</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDiscpatchToProps)(App);