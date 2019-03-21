import * as React from 'react';
import * as uuid from 'uuid/v4';

import { ContentComponent, DraggableComponent, DroppableComponent, GridComponent, GridItemComponent } from '../';
import { IComponent, IComponentType } from '../../interfaces';

export interface IContentBuilderComponent {
  id?: string;
  cssClass?: string;
  components: IComponent[];
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => (void);
  onDragDrop: (event: React.DragEvent<HTMLDivElement>, id: string) => (void);
}

export class ContentBuilderComponent extends React.Component<IContentBuilderComponent> {

  public renderComponent(
    id: string,
    name: string,
    type: string,
    children: IComponent[]
    ): React.ReactNode {
    if (type === IComponentType.GRID) {  // TODO: match by type and dynamic grid sizing based on config
        return this.renderGrid(id, children);
    } else {
      return (
        <DraggableComponent
          key={uuid()}
          name={name}
          type={type}
          onDragStart={() => null}
          draggable={false}
          dropped={true}
        />
      );
    }
  }

  public renderGrid(id: string, children: IComponent[]): React.ReactNode {
    return (
      <GridComponent key={id}>
          {
            children.map(({ children: gridItemChildren, renderProps }: IComponent, gridItemIndex: number) => {
              const gridId = `${id}_${gridItemIndex}`;
              return (
                <GridItemComponent key={gridId} size={renderProps.size}>
                  {
                    gridItemChildren.map((child: IComponent, index: number) => {
                      return this.renderComponent(
                        `${gridId}_${index}`,
                        child.name,
                        child.type,
                        child.children
                      );
                    })
                  }
                  {this.renderDroppableComponent(gridId)}
                </GridItemComponent>
              );
            })}
      </GridComponent>
    );
  }

  public renderDroppableComponent(id: string): React.ReactNode {
    const { onDragOver, onDragDrop } = this.props;
    return (
      <DroppableComponent
        name={id}
        onDragOver={(ev) => onDragOver(ev)}
        onDrop={(ev) => onDragDrop(ev, id)}
      />
      );
  }

  public render() {
    const { components, id } = this.props;
    return (
      <ContentComponent>
        {
          components.map(({ name, type, children }: IComponent, componentIndex: number) => {
            return this.renderComponent(`${id}_${componentIndex}`, name, type, children);
          })}
        {this.renderDroppableComponent(id)}
      </ContentComponent>
    );
  }
}
