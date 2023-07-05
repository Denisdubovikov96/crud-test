import React from 'react';
import { Autocomplete, TextField, Button, TablePagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import usePagination from './hooks/usePagination';
import useTableController from './hooks/useTableController';
import TableData from './components/TableData';
import RequisitionDialog from './components/RequisitionDialog';
import ThemeSwitcher from './components/ThemeSwitcher';


const options = [
  {
    label: 'Label 1'
  },
  {
    label: 'Label 2'
  },
  {
    label: 'Label 3'
  },
]

const mockdata= [
  {
      category: "Some category",
      name: 'Some name',
      text: "Lorem Lorem Lorem  Lorem Lorem LoremLoremLorem ",
      id: '0'
  },
  {
      category: "Some category",
      name: 'Some name',
      text: "Lorem Lorem Lorem  Lorem Lorem LoremLoremLorem ",
      id: '1'
  },
  {
      category: "Some category",
      name: 'Some name',
      text: "Lorem Lorem Lorem  Lorem Lorem LoremLoremLorem ",
      id: '2'
  },
  {
      category: "Some category",
      name: 'Some name',
      text: "Lorem Lorem Lorem  Lorem Lorem LoremLoremLorem ",
      id: '3'
  },
]


function App() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [editId, setEditId] = React.useState<string | null>(null)

  const {
    data,
    addFilter,
    addRow,
    editRow,
    uniqCategories,
    filter,
    deleteRow,
    findById
  } = useTableController({
    initialValue: mockdata
  })

  const { pageNumber,
    onChangeCountPerPage,
    onPageChange,
    itemsPerPage,
    currentPageItems } = usePagination({ items: data })

  const onDialogClose = () => {
    setIsOpen(false)
    setEditId(null)
  }

  const onSaveHandler = (data: {category: string, name: string, text: string}) => {
    if (editId) {
      editRow({
        ...data,
        id: editId,
      })
    } else {
      addRow({
        ...data,
        id: `${Date.now()}`,
      })
    }
    onDialogClose()
  }


  const isDialogOpen = isOpen || !!editId;

  return (
    <div className="app h-full flex flex-col px-8 pt-6">
      <div className='w-full flex flex-row gap-3'>
        <Autocomplete
          disablePortal
          size='small'
          id="combo-box-demo"
          options={options}
          className='flex-1'
          renderInput={(params: any) => <TextField {...params} label="Kind" />}
        />

        <Autocomplete
          disablePortal
          size='small'
          id="combo-box-demo"
          options={uniqCategories}
          value={filter.category}
          className='flex-1'
          onChange={(e, v) => {
            addFilter('category', v)
            onPageChange(0)
          }}
          renderInput={(params: any) => <TextField {...params} label="Category" />}
        />

        <TextField
          size='small'
          label='Name'
          className='flex-2'
          onChange={(e) => {
            addFilter("name", e.target.value)
            onPageChange(0)
          }}
        />

        <ThemeSwitcher />
      </div>

      <div className='h-full flex-grow'>
        <div className='mb-4'>
          <TableData
            data={currentPageItems}
            onRowDelete={deleteRow}
            onRowEdit={setEditId}
          />
        </div>

        <Button variant='outlined' color='success' onClick={() => setIsOpen(true)}>
          <AddIcon />
          <span className='ml-2'>
            Requisition
          </span>
        </Button>

        <RequisitionDialog
          key={editId ? "edit-requisiton" : 'add-requisiton'}
          open={isDialogOpen}
          title={editId ? "Edit Requisiton" : 'Add Requisiton'}
          defaultValues={(editId && findById(editId)) || {}}
          onClose={onDialogClose}
          onSave={onSaveHandler}
        />
      </div>

      <div className='flex justify-center'>
        <TablePagination
          component="div"
          count={data.length}
          page={pageNumber}
          onPageChange={(_, v) => onPageChange(v)}
          rowsPerPage={itemsPerPage}
          onRowsPerPageChange={(e) => onChangeCountPerPage(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export default App;
