/**
 * @todo - move to either shared or to contracts
 */

export interface Tickable {
  tick: () => void;
}

export interface Initializable {
  initialize: () => void;
}

export interface Disposable {
  dispose: () => void;
}

export interface Lifecycle extends Initializable, Disposable {}

export interface EngineModule extends Tickable, Lifecycle {
  name: string;
  requires: string[];
}
