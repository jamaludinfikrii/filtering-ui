import React from 'react'

function dataDummyMaker (a,tanggal,user,totalItem,bukti,status){
    var obj = {
        id : a,
        tanggal,
        user,
        totalItem,
        bukti,
        status
    }
    return obj
}

class Dummy extends React.Component{
    state = {data : [
        dataDummyMaker(1,'23-04-2019','fikri',5,'image','menunggu konfirmasi'),
        dataDummyMaker(2,'23-04-2019','Seto',4,'image','menunggu konfirmasi'),
        dataDummyMaker(3,'23-04-2019','Andi',3,'image','menunggu konfirmasi'),
        dataDummyMaker(4,'23-04-2019','Steve',2,'image','menunggu konfirmasi'),
        dataDummyMaker(5,'23-04-2019','Jo',1,'image','menunggu konfirmasi')
    ]}
    render(){
        return(
            <div className='container'>
                <h1>Manage Transaksi</h1>
                <table className='table'>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Tanggal</td>
                            <td>User</td>
                            <td>Img Bukti</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map((val) => {
                                return(
                                    <tr>
                                        <td>{val.id}</td>
                                        <td>{val.tanggal}</td>
                                        <td>{val.user}</td>
                                        <td>{val.bukti}</td>
                                        <td>{val.status}</td>
                                        <td><input type='button' value='approve' className='btn btn-info'/></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Dummy