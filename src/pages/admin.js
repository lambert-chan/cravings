import React, { useState, useEffect } from 'react'
import RequestTable from '../components/RequestTable'
import axios from 'axios';
import { ENDPOINT } from '../constants/api'
import { WaitingCat } from '../components/Loading'

function AdminPage() {
    const [data, setData] = useState([]);
    // const [q, setQ] = useState("");

    useEffect(() => {
        axios.get(`${ENDPOINT}/requests`)
            .then(res => {
                setData(res.data)
            })
    }, [])

    return (
        <div id="admin-requests-container">
            {
                data.length ?
                    <RequestTable data={data} />
                    : <WaitingCat />
            }
        </div>
    )
}

export default AdminPage;