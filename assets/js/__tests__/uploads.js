import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios'
import App from '../index'
import ReactDOM from 'react-dom';

jest.mock('axios')

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
});

test('loads and makes post on button', async () => {
    const {App} = render(<App/>)

    axiosMock.get.mockResolvedValueOnce({
        data: {'Add': 1, 'Executed': 10}
    });

    expect(axiosMock.post).toHaveBeenCalledTimes(1)
    expect(axiosMock.post).toHaveBeenCalledWith('/api')
    expect(getByRole('heading')).toHaveTextContent('Trade Breakdown')
})

