import React, {useState, useEffect} from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import {useTable} from 'react-table'
import {columns} from '../components/columns'
import RequestTable from '../components/RequestTable'

export default function AdminPage() {
    const [data, setData] = useState([]);
    const [q, setQ] = useState("");

    useEffect(() => {
        fetch("http://vladkubl.mywhc.ca/users/API/v1/requests")
        .then((response) => response.json())
        .then((json) => setData(json));
    }, [])

    return (
        <div>
            <RequestTable data={data} />
        </div>
    )
}

