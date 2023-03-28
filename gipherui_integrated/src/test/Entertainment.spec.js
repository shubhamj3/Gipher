
import Entertainmnet from '../components/category/Entertainment';
import '@testing-library/jest-dom/extend-expect';
import {render, screen} from '@testing-library/react';
import {render as renderer, unmountComponentAtNode } from 'react-dom';
import React from 'react';


describe('Testing Card Component', ()=>{
    let element;
    beforeEach(() => {
        element = document.createElement('div');
        document.body.appendChild(element);
    });
 
    afterEach(() => {
        unmountComponentAtNode(element);
        element.remove();
        element = null;
    });
 

    test('Should have 2 div tag in card component', () => {
        renderer(<Entertainmnet />, element);
        const count = element.getElementsByTagName('div').length;
        expect(count).toBe(2);
    
    });
    test('Should have @ entertainment text in displaycard', () => {
        render(<Entertainmnet />);
     screen.findByText('@ entertainment');
        
    });

    test('Entertainmnet component should have only one i tag', () => {
        renderer(<Entertainmnet/>,element);
        const count = element.getElementsByTagName('i').length;
        expect(count).toBe(1);
    });

    test('Entertainmnet component should have only one h1 tag',()=>{
        renderer(<Entertainmnet/>,element);
        const count = element.getElementsByTagName('h1').length;
        expect(count).toBe(1);
    });

    test('Should have one p tag in card component', () => {
        renderer(<Entertainmnet />, element);
        const count = element.getElementsByTagName('p').length;
        expect(count).toBe(1);
    });

});

