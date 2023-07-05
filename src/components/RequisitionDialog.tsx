import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup
    .object({
        name: yup.string().required('cant be empty'),
        category: yup.string().required('cant be empty'),
        text: yup.string().optional()
    })
    .required()

interface RequisitionDialogProps {
    open: boolean,
    title: string,
    onClose: () => void,
    onSave: (data: FormState) => void,
    defaultValues?: {
        name?: string,
        category?: string,
        text?: string
    }
}

interface FormState {
    name: string,
    category: string,
    text: string
}

const fieldConfig = [
    {
        name: 'name',
        type: "text",
        label: "Name"
    },
    {
        name: 'category',
        type: "text",
        label: "Category"
    },
    {
        name: 'text',
        type: "text",
        label: "Text",
        multiline: true,
        rows: 4
    }
]

const RequisitionDialog: React.FC<RequisitionDialogProps> = ({ open, title, onClose, onSave, defaultValues }) => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormState>({
        defaultValues: {
            name: defaultValues?.name || "",
            category: defaultValues?.category || "",
            text: defaultValues?.text || ""
        },
        // @ts-ignore
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<FormState> = data => {
        onSave(data)
        reset()
    };

    return (
        <Dialog open={open}>
            <form id='req-form' onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {fieldConfig.map((fieldConfig) => {
                        return (
                            <Controller
                                key={fieldConfig.name}
                                // @ts-ignore
                                name={fieldConfig.name}
                                control={control}
                                render={({ field }) => <TextField
                                    {...field}
                                    {...fieldConfig}
                                    fullWidth
                                    margin="dense"
                                    label={fieldConfig.label}
                                    size='small'
                                    // @ts-ignore
                                    error={!!errors?.[fieldConfig.name]}
                                    // @ts-ignore
                                    helperText={errors.name && <>{errors?.[fieldConfig.name]?.message}</>}
                                />}
                            />
                        )
                    })}
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='success' onClick={onClose}>Cancel</Button>
                    <Button type='submit' variant='contained' color='success' >Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default RequisitionDialog