import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { RowData } from '../hooks/useTableController';

interface TableDataProps {
    data: RowData[],
    onRowDelete: (id: string) => void,
    onRowEdit: (id: string) => void
}

const TableData: React.FC<TableDataProps> = ({ data, onRowDelete, onRowEdit }) => {
    return (
        <TableContainer component='div' className='h-full'>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Text</TableCell>
                        <TableCell align="left">Label</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.id}
                        >
                            <TableCell >
                                {row.category}
                            </TableCell>
                            <TableCell align="left">
                                {row.name}
                            </TableCell>
                            <TableCell align="left">
                                {row.text}
                            </TableCell>
                            <TableCell align="left">
                                {row.label}
                            </TableCell>
                            <TableCell align="right">
                                <div>
                                    <IconButton aria-label="edit" color='success' onClick={() => onRowEdit(row.id)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" color='success' onClick={() => onRowDelete(row.id)} >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableData