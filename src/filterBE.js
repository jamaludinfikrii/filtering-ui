import React from 'react'
import Axios from 'axios';

class App2 extends React.Component{
    state ={data : [], page : 1}
    componentDidMount(){
        Axios.get('http://localhost:4000/titanic2/tenData')
        .then((res) => this.setState({data : res.data}))
        .catch((err) => console.log(err))
    }
    viewMoreHandler = () => {
        Axios.get('http://localhost:4000/titanic2/paging/' + this.state.page)
        .then((res) => {
            this.setState({data : [...this.state.data , ...res.data] , page : this.state.page + 1})
        })
    }
    filterBtn = () => {
        var nama = this.refs.search.value
        var pclass = this.refs.dropdown.value
        Axios.get('http://localhost:4000/titanic2/filter?nama=' + nama + '&pclass=' + pclass )
        .then((res) => this.setState({data : res.data}))
    }
    render(){
        return(
            <div className='container'>
            <h1> Filtering Backend</h1>
            <div className = 'row mb-3'>
                <div className='col-md-3'>
                    <input className='form-control' type='text' placeholder='Search by Nama' ref='search' />
                </div>
                <div className='col-md-3'>
                    <select ref='dropdown' className='form-control'>
                        <option value=''>All Class</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                    </select>
                </div>
                <div className='col-md-1'>
                    <input type='button' onClick={this.filterBtn} className='btn btn-info' value='search' />
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
                            {this.state.data.map((val) => {
                                var {PassengerId, Survived,Pclass,Name,Sex, Age, Fare } = val
                                return (
                                    <tr>
                                        <td>{PassengerId}</td>
                                        <td>{Survived}</td>
                                        <td>{Pclass}</td>
                                        <td>{Name}</td>
                                        <td>{Sex}</td>
                                        <td>{Age}</td>
                                        <td>{Fare}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className='row justify-content-center'>
                            <p style={{cursor:'pointer'}} onClick={this.viewMoreHandler}> View More </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default App2