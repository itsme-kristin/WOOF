import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
  } from '@mui/material';
  import CheckIcon from '@mui/icons-material/Check';

const ComparisonTable = (props) => {
  const { breed1, breed2 } = props;

  const columns = [
    { id: 'feature', label: 'Attributes / Breeds', minWidth: 75 },
    { id: 'breed1', label: breed1[0][0].name, minWidth: 30 },
    { id: 'breed2', label: breed2[0][0].name, minWidth: 30 }
  ];

  var rows = [];
  rows.push({  feature: 'Height', breed1: breed1[0][0].height.imperial , breed2: breed2[0][0].height.imperial })
  rows.push({  feature: 'Weight', breed1: breed1[0][0].weight , breed2: breed2[0][0].weight })
  rows.push({  feature: 'Breed Group', breed1: breed1[0][0].breed_group , breed2: breed2[0][0].breed_group })
  rows.push({  feature: 'Bred For', breed1: breed1[0][0].bred_for , breed2: breed2[0][0].bred_for })
  rows.push({  feature: 'Life Span', breed1: breed1[0][0].life_span , breed2: breed2[0][0].life_span })
  rows.push({  feature: 'Temperament', breed1: breed1[0][0].temperament , breed2: breed2[0][0].temperament })
  rows.push({  feature: 'Description', breed1: breed1[1][0].description , breed2: breed2[1][0].description })

  return (
    <Paper sx={{width: '100%', borderRadius: 3}}>
      <TableContainer sx={{maxHeight:700, maxWidth:1100}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              return (
                <TableRow hover key={i}>
                  {columns.map((column, i) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={i} align={column.align}>
                        {value === null ? <CheckIcon></CheckIcon> : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default ComparisonTable;
