import * as React from 'react';
import './droppable-component.scss';

export interface IDroppableComponent {
  name: string;
  onDragOver: (ev: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (ev: React.DragEvent<HTMLDivElement>, componentName: string) => void;
  children?: React.ReactNode;
}

export const DroppableComponent = ({ name, onDragOver, onDrop, children }: IDroppableComponent) =>
  <div
    className='droppable-component'
    onDragOver={(ev: React.DragEvent<HTMLDivElement>) => onDragOver(ev)}
    onDrop={(ev: React.DragEvent<HTMLDivElement>) => onDrop(ev, name)}
    data-id={name}
  >
    <span>Drop components here!</span>
    {children}
  </div>;
