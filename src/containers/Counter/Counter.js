import React, { Component } from 'react';
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/action';

class Counter extends Component {

    counterChangedHandler = (action, value) => {
        switch (action) {
            case 'inc':
                this.setState((prevState) => { return { counter: prevState.counter + 1 } })
                break;
            case 'dec':
                this.setState((prevState) => { return { counter: prevState.counter - 1 } })
                break;
            case 'add':
                this.setState((prevState) => { return { counter: prevState.counter + value } })
                break;
            case 'sub':
                this.setState((prevState) => { return { counter: prevState.counter - value } })
                break;
        }
    }

    render() {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 5" clicked={() => this.props.onAddCounter(5)} />
                <CounterControl label="Subtract 10" clicked={() => this.props.onSubtractCounter(10)} />
                <hr />
                <button onClick={() => this.props.onStoreResultHandler(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(( strResult) =>
                        <li key={strResult.id} onClick={() => this.props.onDeleteResultHandler(strResult.id)}>{strResult.value}</li>
                    )}
                </ul>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        storedResults: state.res.results,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
        onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
        onAddCounter: (counterValue) => dispatch({ type: actionTypes.ADD, counterValue }),
        onSubtractCounter: (counterValue) => dispatch({ type: actionTypes.SUBTRACT, counterValue }),
        onStoreResultHandler: (resultValue) => dispatch({type:actionTypes.STORE_RESULT, resultValue }),
        onDeleteResultHandler: (resultId) => dispatch({type:actionTypes.DELETE_RESULT, resultId})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);