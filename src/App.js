import React, { Component } from 'react';
import {getData} from './Services/ServiceWrapper';
import TableComponent from './Common/Table/Table';
import {Button, Form, Input, Row} from 'reactstrap';
import { hasData, getEndpoint } from './Utils/text';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.searchOne = this.searchOne.bind(this);
    this.searchTwo = this.searchTwo.bind(this);
    this.searchOneChange = this.searchOneChange.bind(this);
    this.searchTwoChange = this.searchTwoChange.bind(this);
    this.filterTwoChange = this.filterTwoChange.bind(this);

    this.state = {
      uri1: 'http://development-877370342.us-west-2.elb.amazonaws.com/customers',
      uri2: 'http://development-877370342.us-west-2.elb.amazonaws.com/customers',
      filter1: '',
      filter2: '',
      endpoint1: '',
      endpoint2: '',
      refresh1: false,
      refresh2: false,
    }
  }

  searchOne(e) {
    e.preventDefault();

    this.setState({
      endpoint1: getEndpoint(this.state.uri1),
      refresh1: !this.state.refresh1, //refac
    })
  }

  searchTwo(e) {
    e.preventDefault();

    this.setState({
      refresh2: !this.state.refresh2,
      endpoint2: getEndpoint(this.state.uri2),
    })
  }

  searchOneChange(e) {
    this.setState({
      uri1: e.target.value,
    })
  }

  searchTwoChange(e) {
    this.setState({
      uri2: e.target.value,
    })
  }

  filterTwoChange(e) {
    this.setState({
      filter2: e.target.value,
    })
  }

  render() {

    return (
      <div className="App">
        <h4 className='m-4'>API Search</h4>
        <Form id='formone' onSubmit={this.searchOne} >
          <Row className='m-2'>
        <Input className='w-50 m-3' type='text' id='searchone' defaultValue={this.state.uri1} onChange={this.searchOneChange}></Input>
        <Button className='m-3' type='submit'>Search</Button>
        </Row>
        </Form>
        {hasData(this.state.endpoint1) && 
          <TableComponent uri={this.state.uri1} filter={this.state.filter1} id='id' callback={() => {}} title={this.state.endpoint1} service={getData} refresh={this.state.refresh1} />
        }

        <Form id='formtwo' onSubmit={this.searchTwo} >
        <Row className='m-2'>
        <Input className='w-50 m-3' type='text' id='searchtwo' defaultValue={this.state.uri2} onChange={this.searchTwoChange}/>
        <Input className='w-100p m-3' type='text' id='filtertwo' onChange={this.filterTwoChange} placeholder='id'></Input>
        <Button className='m-3' type='submit'>Search</Button>
        </Row>
        </Form>
        {hasData(this.state.endpoint2) && 
          <TableComponent uri={this.state.uri2} filter={this.state.filter2} id='id' callback={() => {}} title={this.state.endpoint2} service={getData} refresh={this.state.refresh2}/>
        }
      </div>
    );
  }
}

export default App;
