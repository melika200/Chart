import { useState, useEffect } from 'react';
import Tabledata from '../Services/Tableurl/Tabledata';

export interface RowData {
  id: string;
  title: string;
  recordDateFa: string;
  position: string;
}

const useCustomizedTable = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [editRow, setEditRow] = useState<RowData | null>(null);
  const [open, setOpen] = useState(false);

  const addRow = (row: RowData) => {
    setRows((prevRows) => [...prevRows, row]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await Tabledata.get('/merchantnew/News/Search?_page=1&_limit=10');

      const formattedData = response.data.value.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        recordDateFa: item.recordDateFa,
        position: item.isActive ? 'فعال' : 'غیر فعال',
      }));
      setRows(formattedData);
    };
    fetchData();
  }, []);

  const handleDelete = (id: string) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleEditOpen = (row: RowData) => {
    setEditRow(row);
    setOpen(true);
  };

  const handleEditClose = () => {
    setEditRow(null);
    setOpen(false);
  };

  const handleSaveEdit = () => {
    if (editRow) {
      setRows(rows.map((row) => (row.id === editRow.id ? editRow : row)));
      handleEditClose();
    }
  };

  return {
    rows,
    editRow,
    open,
    addRow,
    handleDelete,
    handleEditOpen,
    handleEditClose,
    handleSaveEdit,
    setEditRow, 
  };
};

export default useCustomizedTable;
