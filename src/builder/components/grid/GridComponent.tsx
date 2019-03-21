import * as React from 'react';

import { IGridItemComponent } from '../grid-item';

export interface IGridComponent {
  children: React.ReactNode;
}

export const GridComponent = ({ children }: IGridComponent) =>
  <div className='mdc-layout-grid'>
    <div className='mdc-layout-grid__inner'>
      {children}
    </div>
  </div>;
