import * as React from 'react';
import { DraggableComponent } from '../';
import { IComponent, IComponentType } from '../../interfaces';
import { ContentBuilderGridComponent } from './';

export interface IContentBuilderDraggableComponent {
  id: string;
  name: string;
  type: string;
  children: IComponent[];
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => (void);
  onDragDrop: (event: React.DragEvent<HTMLDivElement>, id: string) => (void);
}

export const ContentBuilderDraggableComponent = ({
  id,
  name,
  type,
  children,
  onDragOver,
  onDragDrop
}: IContentBuilderDraggableComponent) => {
  if (type === IComponentType.GRID) {
    return <ContentBuilderGridComponent
      id={id}
      children={children}
      onDragOver={onDragOver}
      onDragDrop={onDragDrop}
    />;
  } else {
    return (
      <DraggableComponent
        key={`drag-${id}`}
        name={name}
        type={type}
        onDragStart={() => null}
        draggable={false}
        dropped={true}
      />
    );
  }
};
