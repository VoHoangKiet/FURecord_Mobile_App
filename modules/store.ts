// store.ts
import { createContext, useContext } from "react";
import { observable, action } from 'mobx';
import { cartStore } from "./cartStore";

class Todo {
  @observable title = 'Mua banh mi';

  @action // chỉ có action mới có thể modify observable state
  changeTitle = () => {
    this.title = 'Da mua banh my'
  }

  // changeTitle có thể viết lại như sau
  //  @action.bound
  //  changeTitle() {
  //    this.title = 'Da mua banh my'
  //  }
}

export const rootStore = {
  todoStore: new Todo(),
  cartStore
};

export type TRootStore = typeof rootStore;
const RootStoreContext = createContext<null | TRootStore>(null);

export const StoreProvider = RootStoreContext.Provider;

export function useStore() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
