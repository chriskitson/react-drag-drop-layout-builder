import { fromJS } from 'immutable';
import * as React from 'react';

import './builder-layout.scss';

import { ContentBuilderComponent, DraggableComponent } from './components';
import { DraggableComponents } from './draggable-components';
import { IComponent, IComponentType, IContent } from './interfaces';

export interface IBuilderState {
  dashboardState: IContent[];
  isDragging: boolean;
}

const INT_LENGTH = 3;

const originalState: IContent[] = [
  {
    components: []
  },
  {
    components: []
  },
  {
    components: []
  },
];

export class BuilderLayout extends React.Component {

  public state: IBuilderState = {
    dashboardState: originalState,
    isDragging: false
  };

  constructor(props: {}) {
    super(props);

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragDrop = this.onDragDrop.bind(this);
  }

  public render() {
    const { dashboardState } = this.state;
    return (
      <div className='builder'>
        <div className='builder-draggables'>
          {
           DraggableComponents.map(({ name, type }: IComponent, index: number) =>
              <DraggableComponent
                key={`comp-${index}`}
                name={name}
                type={type}
                onDragStart={this.onDragStart}
                dropped={false}
              />
            )}
        </div>
        <div className='builder-droppables'>
          {
            dashboardState.map(({ id, cssClass, components: contentComponents }: IContent, index: number) => (
              <ContentBuilderComponent
                key={`cb_${index}`}
                id={`cb_${index}`}
                cssClass={cssClass}
                components={contentComponents}
                onDragDrop={this.onDragDrop}
                onDragOver={(ev: React.DragEvent<HTMLDivElement>) => this.onDragOver(ev)}
              />
              )
            )}
        </div>
      </div>
    );
  }

  private onDragStart(event: React.DragEvent <HTMLDivElement> , name: string, type: string) {
    event.dataTransfer.setData('id', name);
    event.dataTransfer.setData('type', type);
  }

  private onDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  /**
   * Handles drop into droppable component and updates application state
   * Create new component based on draggable name and type
   * Create an array of indexes to determine position in state
   * Loop through array of indexes and build out path to update
   * Create ImmutableJS object and update path with new component
   * Save state
   * @param event
   * @param containerId
   */
  private onDragDrop(event: React.DragEvent <HTMLDivElement> , containerId: string) {
    const name = event.dataTransfer.getData('id');
    const type = event.dataTransfer.getData('type');
    const newComponent: IComponent =  this.generateComponent(name, type);
    const containerArray: string[] = containerId.split('_');
    containerArray.shift(); // ignore first param, it is string prefix
    const componentsPath: Array<number | string> = [];
    containerArray.forEach((id: string, index: number) => {
      componentsPath.push(parseInt(id, INT_LENGTH));
      componentsPath.push(index === 0 ? 'components' : 'children');
    });
    const { dashboardState } = this.state;
    let componentState = fromJS(dashboardState);
    componentState = componentState.setIn(componentsPath, componentState.getIn(componentsPath).push(newComponent));
    this.setState({ dashboardState: componentState.toJS() });
  }

  private generateComponent(name: string, type: string): IComponent {
    let newComponent: IComponent = {
      name,
      type
    };
    if (type === IComponentType.GRID) { // TODO - predefine this somewhere else (default props)
      const gridItem: IComponent = {
        children: [],
        name: '',
        renderProps: {
          size: 6 // <- make this configurable
        },
        type: IComponentType.GRID_ITEM
      };
      newComponent = {...newComponent,
                      children: [ gridItem, gridItem ] // <- make this configurable
      };
    }
    return newComponent;
  }

}
