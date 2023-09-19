import logo from "./logo.svg";
import "./App.css";
import MainTodo from "./todoApp/Components/mainTodo";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useState } from "react";

// import { v4 as uuidv4 } from "uuid";
import { Todocontext } from "./contax/todoContax";

const initaiTodos = [];

const theme = createTheme({
  typography: {
    fontFamily: ["MyFont"],
  },
  palette: {
    primary: {
      main: "#ff5722",
    },
  },
});
function App() {
  const [todoList, setTodoList] = useState(initaiTodos);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Todocontext.Provider value={{ todoList, setTodoList }}>
          <MainTodo />
        </Todocontext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
