import React from 'react';
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

const rows = [
    createData('PUT', '/API/v1/users/id', 79),
    createData('GET', '/API/v1/users/id', 145),
    createData('POST', '/API/v1/users/id', 43),
    createData('PUT', '/API/v1/lists/id', 79),
    createData('GET', '/API/v1/lists/id', 145),
    createData('POST', '/API/v1/lists/id', 43),
];

class AdminPage extends React.Component {


    render() {
        return (
            <Container component="main" className="main">
                <TableContainer component={Paper}>
                    <Table className="api_table" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Method</TableCell>
                                <TableCell align="center">Endpoint</TableCell>
                                <TableCell align="center">Requests</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.method + ' ' + row.endpoint}>
                                    <TableCell align="center" component="th" scope="row">
                                        {row.method}
                                    </TableCell>
                                    <TableCell align="center">{row.endpoint}</TableCell>
                                    <TableCell align="center">{row.requests}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        );
    }
}

export default AdminPage