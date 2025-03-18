import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Bar from '../src/components/Bar';

describe('Bar Component', () => {
    it('renders without crashing', () => {
        render(<Bar 
            data-testid="bar" 
            row={{id: 1, labelX:1, value:1, labelZ:1}}
            userData={{id: 1}} 
            xLabels={new Set()}
            zLabels={new Set()}
            isTransparent={false} onClick={()=>{}}/>);
        const barElement = screen.getByTestId('cy-canvas');
        expect(barElement).toBeInTheDocument();
    });

/*     it('displays the correct text', () => {
        render(<Bar row={{id: 1, labelX:1, value:1, labelZ:1}} isTransparent={false} onClick={()=>{}}/>);
        const barElement = screen.getByTestId('bar');
        expect(barElement);
    });

    it('has the correct class', () => {
        render(<Bar row={{id: 1, labelX:1, value:1, labelZ:1}} isTransparent={false} onClick={()=>{}}/>);
        const barElement = screen.getByTestId('bar');
        expect(barElement);
    }); */
});