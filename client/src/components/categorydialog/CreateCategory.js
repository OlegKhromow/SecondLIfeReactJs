import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import apiRequest from "../../utils/apiRequest";

const CreateCategory = ({open, setOpen, loadCategories, setSelectedCategory}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const name = formJson.name;
        saveCategory(name);
        loadCategories();
        handleClose();
    }

    const saveCategory = async (name) => {
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name": name})
        }
        const result = await apiRequest('/category/', postOptions);
        setSelectedCategory(result._id);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit
            }}
            fullWidth
            maxWidth="xs"
        >
            <DialogTitle>New category</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    fullWidth
                    id="name"
                    name="name"
                    label="Enter name for new category"
                    type="text"
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button className="" onClick={handleClose}>Cancel</Button>
                <Button type="submit">Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateCategory;