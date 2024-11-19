import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormValues {
  degree: string;
  issuer: string;
  description: string;
  date: string;
}

const useTableModal = (addRow: (row: any) => void) => {
  const [open, setOpen] = useState(false);
  
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      degree: '',
      issuer: '',
      description: '',
      date: '',
    },
  });

  const handleOpen = () => setOpen(true);
  
  const handleClose = () => {
    reset(); 
    setOpen(false);
  };

  const onSubmit = (data: FormValues) => {
    const newRow = {
      id: new Date().getTime().toString(),
      title: data.degree,
      summary: data.issuer,
      text: data.description,
      recordDate: data.date,
    };
    addRow(newRow);
    handleClose();
  };

  return {
    open,
    handleOpen,
    handleClose,
    handleSubmit: handleSubmit(onSubmit),
    control,
    reset, 
  };
};

export default useTableModal;