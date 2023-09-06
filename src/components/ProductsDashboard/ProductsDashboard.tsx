"use client";

import {
  PAGE_SIZE,
  useProductsDashboardService,
} from "@/services/ProductsDashboardService";
import { IProduct } from "@/models/product.model";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import GlobalHeader from "../GlobalHeader";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import UpsertProductDialog from "@/components/UpsertProductDialog/UpsertProductDialog";

const columns = ["title", "price", "category", "description"];

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
    <div className="h-full flex flex-col">
      <GlobalHeader />
      <Paper
        className="h-0 flex-1 flex flex-col"
        sx={{ width: "100%", overflow: "hidden" }}
      >
        <TableContainer sx={{ maxHeight: 440, flex: 1 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={"th_" + column}>{column}</TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleProducts.map((row: IProduct) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column as keyof IProduct];
                      return (
                        <TableCell key={"td_" + column + "_" + row.id}>
                          {value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          deleteProduct(row.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <UpsertProductDialog
                        product={row}
                        onProductUpdate={(product, postRequest) =>
                          updateProduct({
                            payload: { ...row, ...product },
                            postRequest,
                          })
                        }
                      />
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
