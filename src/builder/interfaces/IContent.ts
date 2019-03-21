import { IComponent } from './IComponent';

export interface IContent {
  id?: string;
  cssClass?: string;
  components: IComponent[];
}
