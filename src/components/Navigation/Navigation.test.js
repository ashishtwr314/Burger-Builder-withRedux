import React from "react"
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Navigation from "./Navigation";
import Nav from "./Nav";
import { NavLink } from 'react-router-dom'
configure({adapter: new Adapter()})

describe("This test is wriiten for Navigation Items in components/Navigation/Navigation.test.js", () => {
    let wrapper;
     
    beforeEach(() => {
        wrapper = shallow(<Nav />)
    })

    it("Should render excatly 2 components if not authenticated", () => {
        // expect(wrapper.find(<NavLink>loknnout</NavLink>))
    })
} )