import React, { Component } from 'react';
import axios from 'axios'
import { Tooltip } from 'reactstrap';
import TooltipBuatanSendiri from './components/tooltips'
import { withRouter } from 'react-router-dom'
import QueryString from 'query-string'
import './App.css';

class App extends Component {
  state = {
            data : [] ,
            dataPerPage : 10,
            searchData : '', 
            dataPclass : [], 
            filterPclass : 5 , 
            tooltipOpen : false,
            fromAge : 0,
            toAge : 1000
          }
  componentDidMount(){
    this.getDataUrl()
    this.getData()
    this.getDataPclass()
  }

  getDataUrl = () => {

   if(this.props.location.search){
    var obj = QueryString.parse(this.props.location.search)
    if(obj.filternama){
      this.setState({searchData : obj.filternama})
    }
    if(obj.pclass){
      this.setState({filterPclass : obj.pclass})
    }
   } 
   
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

  toggle=()=> {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  renderTableJsx = () => {
    var arrSearchAndFilter = this.state.data.filter((val) => {
      return val.Name.toLowerCase().startsWith(this.state.searchData) 
      && (val.Pclass == this.state.filterPclass || this.state.filterPclass > 4) 
      && (val.Age >= this.state.fromAge && val.Age <= this.state.toAge)
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
    this.pushUrl()
    var search = this.refs.inputsearch.value
    this.setState({searchData : search.toLowerCase()})
  }

  pushUrl = () => {
    var newLink = `/search`
    // search?q=br
    // search?filternama=br
    var params = []
    if(this.refs.inputsearch.value){
      params.push({
        params : 'filternama',
        value : this.refs.inputsearch.value
      })
    }
    if(this.refs.dropdown.value <= 3){
      params.push({
        params : 'pclass',
        value : this.refs.dropdown.value
      })
    }

    for(var i = 0 ; i < params.length; i ++){
      if(i == 0){
        newLink += '?' + params[i].params + '=' + params[i].value
        // /search?filternama=br&pclass=1
      }else{
        newLink += '&' + params[i].params + '=' + params[i].value
      }
    }

    this.props.history.push(newLink)
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
          <select ref='dropdown' onChange={() => {this.pushUrl(); this.setState({filterPclass : this.refs.dropdown.value})}
            } className='form-control'> 
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
        <div className='col-md-1'>
            <input type='number' onChange={() => this.setState({fromAge :this.refs.fromAge.value})} ref='fromAge' className='form-control' id="DisabledAutoHideExample" placeholder='From Age' />
        </div>
        <div className='col-md-1'>
            <input type='number' onChange={() => this.setState({toAge : this.refs.toAge.value ? this.refs.toAge.value : 1000 }) } ref='toAge' className='form-control' id='a' placeholder='To Age' />
        </div>
        <div className='col-md-1'>
            <TooltipBuatanSendiri valueBerubahUbahKarenaDinamis='Ini Tooltips Buatan Kita' />
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
          {/* {this.renderTableJsx().length} */}
              <p onClick={() => this.setState({dataPerPage : this.state.dataPerPage + 10})} style={{fontStyle:'italic', cursor : 'pointer'}}>View More</p>
          </div>
        </div>
            {/* ======== TOLTIPS ========== */}
            <Tooltip placement="top" isOpen={this.state.tooltipOpen} autohide={false} target="DisabledAutoHideExample" toggle={this.toggle}>
              Try to select this text!
            </Tooltip>

      </div>
    );
  }
}

export default withRouter(App);