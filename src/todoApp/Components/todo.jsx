import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';

// icons
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// context 
import { useContext } from 'react';
import { Todocontext } from '../../contax/todoContax';
// dialoge import 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Todo({ todo }) {
    const { todoList, setTodoList } = useContext(Todocontext)

    // EVANT HANDLERS

    function checkClikced(id) {
        const updateTodo = todoList.map((t) => {
            if (t.id === todo.id) {
                t.isComplied = !t.isComplied
            }
            return t
        })
        setTodoList(updateTodo)
        localStorage.setItem("todos", JSON.stringify(updateTodo))
    }

    // DIALOGE DELETE CONFIRMATION 

    const [openDailog, setOpenDailog] = React.useState(false);
    const [openEditDailog, setOpenEditDailog] = React.useState(false);
    // ============================== DELETE=============================== //
    const handlDeleteClick = () => {
        setOpenDailog(true);

    };

    const handleClose = () => {
        setOpenDailog(false);
    };
    function handleDeleteConfirme() {
        const updatedTodosList = todoList.filter(t => t.id !== todo.id)
        setTodoList(updatedTodosList)
        localStorage.setItem("todos", JSON.stringify(updatedTodosList))
    }
    // ============================== EDITE =============================== //

    const [editTodo, setEditTodo] = useState({ title: todo.title, details: todo.details })

    const handleEditClick = () => {
        setOpenEditDailog(true);

    }
    const handleEditClose = () => {
        setOpenEditDailog(false);
    };
    const handleEditeConfirme = () => {

        const updateTodo = todoList.map((t) => {
            if (t.id === todo.id) {
                return { ...t, title: editTodo.title, details: editTodo.details }
            } else {
                return t
            }
        })
        setTodoList(updateTodo)
        setOpenEditDailog(false)
        localStorage.setItem("todos", JSON.stringify(updateTodo))
    }
    // =====EVANT HANDLERS ===
    return (
        <div style={{ marginRight: '10px' }}>
            {/* DIALOGE  */}
            <Dialog
                open={openDailog}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Are you sure to delete this task ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        if you click on yes , Deletion cannot be undone
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="warning" variant="outlined" onClick={handleClose}>Cancle</Button>
                    <Button style={{ color: "white", background: "red" }} variant="outlined" onClick={handleDeleteConfirme}>Yes Delet</Button>
                </DialogActions>
            </Dialog>
            {/* ===== DIALOGE ===  */}

            {/* UPDATE DIALOGE  */}
            <Dialog

                open={openEditDailog}
                onClose={handleEditClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Edit task ?"}</DialogTitle>
                <DialogContent >
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editTodo.title}
                        onChange={(e) => { setEditTodo({ ...editTodo, title: e.target.value }) }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="details"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editTodo.details}
                        onChange={(e) => { setEditTodo({ ...editTodo, details: e.target.value }) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="warning" variant="outlined" onClick={handleEditClose}>Cancle</Button>
                    <Button color="success" variant="outlined" onClick={handleEditeConfirme}>Yes Edit</Button>

                </DialogActions>
            </Dialog>
            {/* ===== UPDATE DIALOGE ===  */}

            <Card sx={{ minWidth: 500, marginTop: '30px', marginRight: '10px', background: "#b54", color: "white" }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid xs={8} >
                            <Typography variant='h5' style={{ textDecoration: todo.isComplied ? "line-through" :""}}> {todo.title} </Typography>
                            <Typography variant='h6'> {todo.details} </Typography>
                        </Grid>
                        <Grid xs={4} display="flex" justifyContent="space-around" alignItems="center">
                            {/* btn checked */}
                            <IconButton onClick={() => { checkClikced() }} aria-label="delete" style={{ color: todo.isComplied ? "white" : "green", backgroundColor: todo.isComplied ? "green" : "white", border: "2px solid green" }}>
                                <CheckIcon />
                            </IconButton>
                            {/*== btn checked ==*/}
                            {/* btn edit  */}
                            <IconButton aria-label="delete" onClick={handleEditClick} style={{ color: "blue", backgroundColor: "white", border: "2px solid blue" }}>
                                <EditIcon />
                            </IconButton>
                            {/* === btn edit ===  */}
                            {/* btn delete  */}
                            <IconButton aria-label="delete" onClick={handlDeleteClick} style={{ color: "red", backgroundColor: "white", border: "2px solid red" }}>
                                <DeleteForeverIcon />
                            </IconButton>
                            {/* ===btn delete == */}
                        </Grid>
                    </Grid>
                </CardContent>

            </Card>

        </div>
    )
}
