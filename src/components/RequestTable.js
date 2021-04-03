import React from 'react'

import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(method, endpoint, requests) {
    return { method, endpoint, requests };
}

function RequestTable({ data }) {
    console.log(data);
    let rows = data.map(request => createData(request?.method, request?.endpoint, request?.requests))
    let keys = Object.keys(data[0]);
    return (
        <Container component="main" className="main">
            <TableContainer component={Paper}>
                <Table className="api_table" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {
                                keys.map(key => <TableCell key={key} align="center">{key.toUpperCase()}</TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.method + ' ' + row.endpoint}>
                                {Object.values(row).map(data => <TableCell key={data} align="center">{data}</TableCell>)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default RequestTable;