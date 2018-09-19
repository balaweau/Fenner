import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {hasData, titleCase, isObject} from '../../Utils/text';
import {Table} from 'reactstrap';
import './Table.css';

//Will auto-populate with data retrieved from the given uri
//Attempts to format the header from the column names, but can be passed a header array instead.
class TableComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      header: [],
      refresh: false,
    };
  }

  componentDidMount() {
    if (!hasData(this.props.data) && this.props.service !== undefined)
      this.getData();
    else
      this.parseData(this.props.data);
  }

  componentWillReceiveProps(props) {
    const refresh = this.props.refresh;
    if (props.refresh !== refresh) {
      this.getData();
    }
  }

  parseData(data) {
    let noDataObj = {};
    noDataObj[this.props.id] = "No Data Found";

    let dataArray = Array.isArray(data) ? data : [data];
    const sdata = hasData(dataArray) ? dataArray : [noDataObj];
    const sheader = hasData(dataArray) ? (this.props.header || Object.keys(dataArray[0])) : [this.props.id];

    this.setState({
      data: sdata,
      header: sheader,
    });
  }

  getData() {
    this.props.service(this.props.uri, this.props.filter)
    .then(response => {
      this.parseData(response);
    })
    .catch(error => {
      this.parseData([]);
    });
  }

  createTable = () => {
    let table = [];
    let header = [];
    const stateData = this.state.data;

    // header
    for (let field of this.state.header) {
      header.push(<th scope="col" key={field} onClick={this.onSort}>{titleCase(field)}</th>);
    }
    table.push(<thead key={'header'}><tr>{header}</tr></thead>);

    // rows
    for (let raw of stateData) {
      //ensure data field order matches the header field order. Fixes issue with json-server data.
      let rec = JSON.parse(JSON.stringify(raw, this.state.header, 4));

      let children = [];
      for (let field in rec) {
        if(!isObject(rec[field]))
          children.push(<td key={field}>{rec[field]}</td>);
        else
          children.push(<td key={field}>{`${field} [Object]`}</td>);
      }
      table.push(<tbody key={rec[this.props.id]}><tr>{children}</tr></tbody>);
    }
    return table
  }

  render() {
    return (
      <div className="well d-flex align-items-center flex-column justify-content-center">
        <div className="FormI9 col-11 align-self-center">
          { (this.props.title !== undefined && <h4 className="gray my-4">{this.props.title}</h4> ) }
          { (this.props.smalltext !== undefined && <small>{this.props.smalltext}</small>) }
          
          <Table className="table table-responsive">
            { this.createTable() }
          </Table>
        </div>
      </div>
    );
  }
}

TableComponent.propTypes = {
  id: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  service: PropTypes.func,
  uri: PropTypes.string,
  data: PropTypes.array,
  header: PropTypes.array,
  title: PropTypes.string,
  smalltext: PropTypes.string,
  filter: PropTypes.any,
}

export default TableComponent;
