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

export default function ComparisonTable() {
  const breed1 = [
    [
        {
            "height": {
                "imperial": "9 - 11.5",
                "metric": "23 - 29"
            },
            "image": {
                "height": 1199,
                "id": "BJa4kxc4X",
                "url": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
                "width": 1600
            },
            "weight": "small",
            "_id": "6169acbe99bd0491f8a6c7a4",
            "bred_for": "Small rodent hunting, lapdog",
            "breed_group": "Toy",
            "country_code": "",
            "id": 1,
            "life_span": "10 - 12 years",
            "name": "Affenpinscher",
            "origin": "Germany, France",
            "reference_image_id": "BJa4kxc4X",
            "temperament": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
            "__v": 0
        }
    ],
    [
        {
            "_id": "616af8ffac0f80f68ad2c499",
            "breedName": "affenpinscher",
            "description": "Canines in the Affenpinscher dog breed were originally created to be ratters in homes, stables, and shops. Bred down in size, they moved up in the world, becoming ladies’ companions. Today, they are happy, mischievous companion dogs.",
            "__v": 0
        }
    ]
];

  const breed2 = [
    [
        {
            "height": {
                "imperial": "22 - 26",
                "metric": "56 - 66"
            },
            "image": {
                "height": 478,
                "id": "Sypubg54Q",
                "url": "https://cdn2.thedogapi.com/images/Sypubg54Q.jpg",
                "width": 600
            },
            "weight": "large",
            "_id": "6169acbe99bd0491f8a6c7e1",
            "bred_for": "Sled pulling",
            "breed_group": "Working",
            "country_code": "",
            "id": 80,
            "life_span": "12 - 15 years",
            "name": "Chinook",
            "reference_image_id": "Sypubg54Q",
            "temperament": "Friendly, Alert, Dignified, Intelligent, Calm",
            "__v": 0
        }
    ],
    [
        {
            "_id": "616af8ffac0f80f68ad2c494",
            "breedName": "chinook",
            "description": "Created in the White Mountains of New Hampshire, the Chinook dog breed made his name on Admiral Byrd’s first Antarctic expedition in 1928. These days he’s a multipurpose dog who’s happy hiking, competing in agility and other dog sports, pulling a sled or other conveyance, and playing with the kids.",
            "__v": 0
        }
    ]
];


  // const [breed1, setBreed1] = useState(null);
  // const [breed2, setBreed2] = useState(null);

  const columns = [
    { id: 'feature', label: 'Attributes', minWidth: 50 },
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
      <TableContainer sx={{maxHeight:500, maxWidth:1000}}>
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
            {rows.map((row) => {
              return (
                <TableRow hover key={row.code}>
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
