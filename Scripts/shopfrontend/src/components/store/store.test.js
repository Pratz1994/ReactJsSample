import React from 'react';
import { expect } from 'chai';
import { render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

import Store from "./store"
import { HasIdList, events } from "../../data/config";

describe('<Store mock test render nav />', () => {
    
    beforeEach(() => {
        fetch.resetMocks()
    });

    it('renders one `.nav`s', () => {
        const wrapper = render(<Store />);
        expect(wrapper.find('.nav').length).to.equal(1);
    });

    it('renders one `table`s', () => {
        fetch.mockResponseOnce(JSON.stringify({ id: 25, name: "Shop25" }))
        const wrapper = render(<Store />, { disableLifecycleMethods: true });
        expect(wrapper.find('table').length).to.equal(1);
    });

    it('StoreList should correctly upsert data', () => {
        var list = new HasIdList([{id: 1, name: "a"}]);
        list.upsert({id: 1, name: "bc"});
        expect(list.get().length).to.equal(1);
        expect(list.get()[0].name).to.equal("bc");

        list.upsert({id: 2, name: "ef"});
        expect(list.get().length).to.equal(2);
        expect(list.get()[0].name).to.equal("bc");
        expect(list.get()[1].name).to.equal("ef");

        list.removeById(1);
        expect(list.get().length).to.equal(1);
        expect(list.get()[0].name).to.equal("ef");

        list.removeById(1);
        expect(list.get().length).to.equal(1);
        expect(list.get()[0].name).to.equal("ef");

    });

    it('Dev should not accidentally add wrong event', () => {
        for(var key in events) {
            expect(key).to.equal(events[key]);
        }
    });

});