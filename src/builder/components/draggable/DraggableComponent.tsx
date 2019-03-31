import * as React from 'react';
import './draggable-component.scss';

export interface IDraggableComponent {
  name: string;
  type: string;
  draggable?: boolean;
  dropped?: boolean;
  onDragStart: (ev: React.DragEvent<HTMLDivElement>, name: string, type: string) => void;
}

export const DraggableComponent = ({
  name,
  type,
  onDragStart,
  draggable = true,
  dropped = false
}: IDraggableComponent) =>
  <div className='draggable-component' draggable={draggable} onDragStart={(ev) => onDragStart(ev, name, type)}>
    {name}
  </div>;
