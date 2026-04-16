import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import BasicTable from './components/table.jsx'
import ApiTable from './components/ApiTable.jsx'
import { AppBar, Toolbar, Button, Box } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppBar position="static" sx={{ marginBottom: '20px' }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button color="inherit">Static Table</Button>
              </Link>
              <Link to="/api-table" style={{ textDecoration: 'none' }}>
                <Button color="inherit">API Table</Button>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route
            path="/"
            element={
                  <BasicTable />
            }
          />
          <Route path="/api-table" element={<ApiTable />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
