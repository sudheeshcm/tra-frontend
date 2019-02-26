/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';

import Networks from '@Scenes/Networks/component';
import networks from './__mocks__/networks';

const props = {
  networks,
};

let networksWrapper;

describe('Network Scene', () => {
  beforeEach(() => {
    networksWrapper = shallow(<Networks {...props} />);
  });

  it('should test if the <Networks /> component renders properly', () => {
    expect(networksWrapper.find('.network__contents__wrapper').length).toBe(1);
    expect(networksWrapper.find('.table--network').length).toBe(1);
    expect(networksWrapper.find('WithStyles(Button)').length).toBe(2);
  });

  it('should list network once network are loaded', () => {
    expect(networksWrapper.find('.loading__wrapper').length).toBe(0);
    expect(networksWrapper.find('WithStyles(CircularProgress)').length).toBe(0);
    expect(networksWrapper.find('.network__contents__wrapper').length).toBe(1);
    expect(networksWrapper.find('.table--network').length).toBe(1);
    expect(networksWrapper.find('WithStyles(TableRow)').length).toBe(5);
    const firstRowcellInfo = networksWrapper
      .find('WithStyles(TableRow)')
      .at(1)
      .find('WithStyles(TableCell)')
      .at(0)
      .dive()
      .dive();
    expect(firstRowcellInfo.text()).toBe('Document Attestation Usecase');
  });
});
