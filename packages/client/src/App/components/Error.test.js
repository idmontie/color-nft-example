import { render, screen } from '@testing-library/react';
import Error from './Error';

describe('<Error/>', () => {
    it('should render text', () => {
        render(<Error error="Hello World" />);
        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });
})