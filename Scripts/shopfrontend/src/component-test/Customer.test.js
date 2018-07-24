import React from 'react';
import { expect } from 'chai';
import { render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });

import Customer from "../components/Customer"

describe('<Customer mock test render nav />', () => {
  it('renders one `.nav`s', () => {
    const wrapper = render(<Customer />);
    expect(wrapper.find('.nav').length).to.equal(1);
  });
});