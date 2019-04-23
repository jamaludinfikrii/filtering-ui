import React from 'react'
import Axios from 'axios';

class Rajaongkir extends React.Component{
    state = {dataProp : [] , dataKab : [], dataCost : []}

    componentDidMount(){
        this.getDataProp()
    }

    getDataProp = () => {
        Axios.get('http://localhost:4000/rajaongkir/province')
        .then((res) => {
            this.setState({dataProp : res.data.rajaongkir.results})
        })
        .catch((err) => console.log(err))
    }

    renderDataProp = () => {
        var jsx = this.state.dataProp.map((val) => {
            return (
                <option value={val.province_id}>{val.province}</option>
            )
        })
        return jsx
    }

    onChangePropHandler =() => {
        Axios.get('http://localhost:4000/rajaongkir/kabupaten/' + this.refs.provinsi.value)
        .then((res) => {
            this.setState({dataKab : res.data.rajaongkir.results})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderDataKab = () => {
        var jsx = this.state.dataKab.map((val) => {
            return(
                <option value={val.city_id} >{val.city_name}</option>
            )
        })

        return jsx
    }
    onBtnCheckClick = () => {
        Axios.post(`http://localhost:4000/rajaongkir/cost?tujuan=${this.refs.kabupaten.value}&kurir=${this.refs.kurir.value}`)
        .then((res) => {
            alert('masuk')
            console.log(res.data.rajaongkir.results[0].costs)
            this.setState({dataCost : res.data.rajaongkir.results[0].costs})
        })
        .catch((err) => console.log(err))
    }

    renderDataCostJsx = () => {
        var jsx = this.state.dataCost.map((val) => {
            return (
                <tr>
                    <td>{val.service}</td>
                    <td>Rp. {val.cost[0].value}</td>
                    <td>{val.cost[0].etd}</td>
                    <td></td>
                </tr>
            )
        })
        return jsx
    }

    render(){
        return(
            <div className='container'>
                <h1>Cek Ongkir Dari Tangerang Selatan</h1>

                <div className='row'>
                    <div className='col-md-3'>
                        <select ref='provinsi' onChange={this.onChangePropHandler} className='form-control'>
                            <option>Pilih Propinsi</option>
                            {this.renderDataProp()}
                        </select>
                    </div>
                    <div className='col-md-3'>
                        <select ref='kabupaten' className='form-control'>
                            <option>Pilih Kabupaten</option>
                            {this.renderDataKab()}
                        </select>
                    </div>
                    <div className='col-md-3'>
                        <select ref='kurir' className='form-control'>
                            <option>Pilih Kurir</option>
                            <option value='jne'>Jalur Nugraha Ekakurir</option>
                            <option value='pos'>Pos Indonesia</option>
                            <option value='tiki'>Tiki</option>
                        </select>
                    </div>
                    <div className='col-md-3'>
                        <input type='button' onClick={this.onBtnCheckClick} value='Check' className='form-control btn-info' />
                    </div>
                </div>
                <table className='table'>
                    {this.renderDataCostJsx()}
                </table>

            </div>
        )
    }
}

export default Rajaongkir