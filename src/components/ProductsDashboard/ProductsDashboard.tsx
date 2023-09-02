'use client';

import {useState} from 'react';
import {useProductsDashboardService, PAGE_SIZE} from '@/services/ProductsDashboardService';
import {IProduct} from '@/models/product.model.ts';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material";
import GlobalHeader from '../GlobalHeader';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = ['title', 'price', 'category', 'description'];

export default function ProductsDashboard() {
  const {
    pageIndex,
    setPageIndex,
    visibleProducts,
    totalCount,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProductsDashboardService();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPageIndex(newPage);
  };

    return (
      <div className='h-full flex flex-col'>
      <GlobalHeader/>
        <Paper className='h-0 flex-1 overflow-auto' sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={'th_' + column}
                    >
                      {column}
                    </TableCell>
                  ))}
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleProducts
                  .map((row: IProduct) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column];
                          return (
                            <TableCell key={'td_' + column + '_' + row.id}>
                              {value}
                            </TableCell>
                          );
                        })}
                        <TableCell>
                        <IconButton onClick={() => {
                          deleteProduct(row.id)
                        }}>
                          <DeleteIcon />
                        </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={totalCount}
            rowsPerPage={PAGE_SIZE}
            page={pageIndex}
            onPageChange={handleChangePage}
          />
        </Paper>
        </div>
      );
}