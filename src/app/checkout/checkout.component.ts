import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../purchase.service';

declare var Stripe: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  purchase = {
    userName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    creditCardNumber: ''
  };

  stripe: any;
  cardElement: any;
  cardErrors: any;

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.setupStripe();
  }

  loadCartItems() {
    const cartItemsStr = localStorage.getItem('cartItems');
    if (cartItemsStr) {
      this.cartItems = JSON.parse(cartItemsStr);
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + item.price,
      0
    );
  }

  setupStripe() {
    this.stripe = Stripe(
      'pk_test_51RK1822VxHyVMsP6yoJXOqSK7Lf0AFoOA9BFgkbNj01BnFibQZt93GS9c5Lkk8FHlyaMIOiobu74eKc4sLAJKa0r00ZA6Tv3Lc'
    );
    const elements = this.stripe.elements();

    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element');

    this.cardElement.on('change', (event: any) => {
      this.cardErrors = event.error ? event.error.message : null;
    });
  }

  async onSubmit() {
    const { token, error } = await this.stripe.createToken(this.cardElement);

    if (error) {
      alert(error.message);
      return;
    }

    const purchaseData = {
      productName: this.cartItems.map(item => item.name).join(', '),
      price: this.cartItems.reduce((total , item) => total + item.price, 0),
      stripeToken: token.id,
      creditCardNumber: token.card.last4,
      creditType: token.card.brand,
      userName: this.purchase.userName,
      email: this.purchase.email,
      phoneNumber: this.purchase.phoneNumber,
      address: this.purchase.address,
      city: this.purchase.city,
    };

    console.log('Sending to backend:', purchaseData);

    this.purchaseService.confirmPurchase(purchaseData).subscribe(
      (response: any) => {
        localStorage.removeItem('cartItems');
        this.cartItems = [];
        this.totalPrice = 0;
      },
      (error: any) => {
        if (error?.error?.errors) {
          let errorMessages = [];
          for (let field in error.error.errors) {
            errorMessages.push(
              `${field}: ${error.error.errors[field].join(', ')}`
            );
          }
          alert('Validation Errors: ' + errorMessages.join(' | '));
        } else {
          alert(
            'There was an issue with your purchase. Error: ' +
              (error?.error?.message || 'Unknown error')
          );
        }
      }
    );
  }

  clearCart() {
    localStorage.removeItem('cartItems');
    this.cartItems = [];
    this.totalPrice = 0;
  }
}
