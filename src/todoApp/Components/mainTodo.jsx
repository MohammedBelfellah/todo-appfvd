import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";
/* componenets imports */
import Todo from './todo';

// others 
import { Todocontext } from "../../contax/todoContax";




export default function MainTodo() {

    const { todoList, setTodoList } = useContext(Todocontext)
    const [taskInput, setTaskInput] = useState("")

    const [alignment, setAlignment] = useState("all")

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    }


    const completedTodos = todoList.filter((t) => {
        return t.isComplied;
    })
    const notcompletedTodos = todoList.filter((t) => {
        return !t.isComplied;
    })

    let todosToBeRenderd = todoList

    if (alignment === "completed") {
        todosToBeRenderd = completedTodos
    } else if (alignment === "incomleted") {
        todosToBeRenderd = notcompletedTodos
    } else {
        todosToBeRenderd = todoList
    }
    const todo = todosToBeRenderd.map((t) => {
        return <Todo key={t.id} todo={t} />
    })

    useEffect(() => {
        const storageToods = JSON.parse(localStorage.getItem("todos"))
        if (storageToods === null) {
            setTodoList([])
        } else {
            setTodoList(storageToods)
        }
    }, [])

    function handleAddBtnClicked() {

        const newTask = {
            id: uuidv4(),
            title: taskInput,
            details: "the discription of task",
            isComplied: false
        }
        const addTodos = [...todoList, newTask]
        setTodoList(addTodos)
        localStorage.setItem("todos", JSON.stringify(addTodos))
        setTaskInput("")
    }


    return (
        <>
            <Container maxWidth="sm" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Card sx={{ minWidth: 500, margin: "100px" }}>
                    <CardContent>
                        <Typography variant="h2" display="flex" justifyContent="center" style={{ fontWeight: "700" }}>
                            todo list
                        </Typography>
                        <Divider />

                        <ToggleButtonGroup
                            style={{ display: 'flex', alignItems: 'center', justifyContent: "center", marginTop: "10px" }}
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                        >
                            <ToggleButton value="all">All</ToggleButton>
                            <ToggleButton value="completed">Completed</ToggleButton>
                            <ToggleButton value="incomleted">Incomleted</ToggleButton>
                        </ToggleButtonGroup>

                        {/* input + add */}
                        <Grid container spacing={2} style={{ marginTop: "20px" }}>
                            <Grid xs={8} >
                                <TextField value={taskInput} onChange={(e) => { setTaskInput(e.target.value) }} style={{ width: "100%" }} id="outlined-basic" label="Task Name" variant="outlined" />
                            </Grid>
                            <Grid xs={4} >
                                <Button disabled={taskInput === "" ? true : false} onClick={() => { handleAddBtnClicked() }} style={{ width: "100%", height: "100%" }} variant="contained">Add Task</Button>
                            </Grid>

                        </Grid>
                        {/* ===input + add ===*/}
                        {/* all todos */}
                        {todo}

                        {/* ==== all todos====== */}
                    </CardContent>
                </Card>
            </Container>


        </>
    )
}
