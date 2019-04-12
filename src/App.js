import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  state = {data : [] , dataPerPage : 10, searchData : '', dataPclass : [], filterPclass : 5}
  componentDidMount(){
    this.getData()
    this.getDataPclass()
  }
  getData = () => {
    axios.get('http://localhost:4000/titanic/allData')
    .then(res => this.setState({data : res.data})) 
  }

  getDataPclass = () => {
    axios.get('http://localhost:4000/titanic/pclassData')
    .then((res) => {
      this.setState({dataPclass : res.data})
    })
  }

  renderTableJsx = () => {
    var arrSearchAndFilter = this.state.data.filter((val) => {
      return val.Name.toLowerCase().startsWith(this.state.searchData) 
      && (val.Pclass == this.state.filterPclass || this.state.filterPclass > 4)
    })
    var data = arrSearchAndFilter.slice(0,this.state.dataPerPage)
    var jsx = data.map((val) => {
      return (
        <tr>
          <td>{val.PassengerId}</td>
          <td>{val.Survived}</td>
          <td>{val.Pclass}</td>
          <td>{val.Name}</td>
          <td>{val.Sex}</td>
          <td>{val.Age}</td>
          <td>{val.Fare}</td>
        </tr>
      )
    })
    return jsx
  }
  onBtnSearchClick =() => {
    var search = this.refs.inputsearch.value
    this.setState({searchData : search.toLowerCase()})
  }
  
  render() {
    return (
      <div className="container">
      <h1>Titanic Dataset</h1>
      <div className='row mb-3'>
        <div className='col-md-3'> 
          <input type='text' ref='inputsearch' placeholder='searchByName' className='form-control' /> 
        </div>
        <div className='col-md-1'> 
          <input type='button' onClick={this.onBtnSearchClick} className='btn btn-info' value='search'/>
        </div>
        <div className='col-md-3'>
          <select ref='dropdown' onChange={() => this.setState({filterPclass : this.refs.dropdown.value})} className='form-control'> 
          <option value={5}>All Class </option>
            {
              this.state.dataPclass.map((val) => {
                return(
                  <option value={val.Pclass}>{val.Pclass}</option>
                )
              })
            }
          </select>
        </div>
        <div>

        </div>
      </div>
        <div>
          <table className='table'>
            <thead>
              <tr>
                <td>PassengerId</td>
                <td>Survived</td>
                <td>Pclass</td>
                <td>Name</td>
                <td>Sex</td>
                <td>Age</td>
                <td>Fare</td>
              </tr>
            </thead>
            <tbody>
              {this.renderTableJsx()}
            </tbody>
          </table>
          <div className='row justify-content-center'> 
              <p onClick={() => this.setState({dataPerPage : this.state.dataPerPage + 10})} style={{fontStyle:'italic', cursor : 'pointer'}}>View More</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
