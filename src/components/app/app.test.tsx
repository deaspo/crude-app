import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'redux-tools/store';
import { App } from './app';

test('renders learn react link', () => {
    render(
        <Provider store={store}>
            <App/>
        </Provider>
    );
    
    expect(screen.getByText(/learn/i)).toBeInTheDocument();
});
