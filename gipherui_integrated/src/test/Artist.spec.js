
import Artist from '../components/category/Artist';
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
        renderer(<Artist />, element);
        const count = element.getElementsByTagName('div').length;
        expect(count).toBe(2);
    
    });
    test('Should have @ artist  text in displaycard', () => {
        render(<Artist />);
     screen.findByText('@ artist');
        
    });

    test('Artist component should have only one i tag', () => {
        renderer(<Artist/>,element);
        const count = element.getElementsByTagName('i').length;
        expect(count).toBe(1);
    });

    test('Artist component should have only one h1 tag',()=>{
        renderer(<Artist/>,element);
        const count = element.getElementsByTagName('h1').length;
        expect(count).toBe(1);
    });

    test('Should have one p tag in card component', () => {
        renderer(<Artist />, element);
        const count = element.getElementsByTagName('p').length;
        expect(count).toBe(1);
    });

});

