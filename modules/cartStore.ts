import { Course } from "@/apis/courses.api";
import { action, makeAutoObservable, observable } from "mobx";

class CartStore {
  @observable cart: Course[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action.bound
  addToCart(course: Course) {
    const existingItem = this.cart.find((item) => item.id === course.id);
    if (existingItem) {
      throw new Error("Item already in cart");
    } else {
      this.cart.push({ ...course });
    }
  }

  @action.bound
  removeFromCart(productId: number) {
    this.cart = this.cart.filter((item) => item.id !== productId);
  }

  @action.bound
  clearCart() {
    this.cart = [];
  }
}

export const cartStore = new CartStore();