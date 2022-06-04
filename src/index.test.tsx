import React from 'react';
import { render, screen } from '@testing-library/react';
const index = require('./index');

describe('Test index.tsx', () => {-

    it("Should render parking app without crashing", () => {
        expect(
            JSON.stringify(
              Object.assign({}, index, { _reactInternalInstance: 'censored' }),
            ),
          ).toMatchSnapshot();
    });
});