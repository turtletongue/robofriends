import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';
import { requestRobots, setSearchField } from '../actions';

const mapStateToProps = (state) => ({ 
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
});

const mapDiscpatchToProps = (dispatch) => ({
    onSearchChange: (event) => {dispatch(setSearchField(event.target.value))},
    onRequestRobots: () => dispatch(requestRobots())
});

const App = ({ searchField, robots, isPending, onSearchChange, onRequestRobots }) => {

    useEffect(() => onRequestRobots(), [onRequestRobots]);

    const filteredRobots = robots.filter(({ name }) => {
        return name.toLowerCase().includes(searchField.toLowerCase());
    });

    return isPending ? 
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

export default connect(mapStateToProps, mapDiscpatchToProps)(App);