import React from "react";
import renderer from "react-test-renderer";
import App from "./App";

describe('CardTable', () => {
    it.skip('should highlight a certain row correctly', function () {
        const component = renderer.create(<App/>);
        const rootInstance = component.root;
        const button = rootInstance.findByType('button');
        button.props.onClick();

        expect(rootInstance.instance.state.darkMode).toBe(true);
    });
});