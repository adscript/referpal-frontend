import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './styling'

import { OrderContextProvider } from './contexts/OrderContext';
import OrderList from './components/OrderList';
import SearchAppBar from './components/SearchAppBar';
import CategoryList from './components/CategoryList';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <OrderContextProvider>
          <SearchAppBar/>
          <CategoryList/>
          <OrderList />
        </OrderContextProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
