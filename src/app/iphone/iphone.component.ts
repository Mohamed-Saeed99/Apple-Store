import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DBServices } from '../db.services';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-iphone',
  templateUrl: './iphone.component.html',
  styleUrls: ['./iphone.component.css'],
  animations: [
    trigger('fadeInRightBig', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translate3d(100%, 0, 0)' }),
        animate('1.5s', style({ opacity: 1, transform: 'translate3d(0, 0, 0)' }))
      ])
    ])
  ]
})
export class IphoneComponent implements OnInit, AfterViewInit {
  @ViewChild('topButton') topButton!: ElementRef;
  errorMessage: string | undefined;


  iphoneData: any;
  count: number = 0;
  isLoading: boolean = true;
  searchTerm: string = '';
  searchPrice: number | undefined ;
  filteredData: any[] = []; // Stores filtered data based on search

  constructor(private services: DBServices, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.getData();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  getData() {
    this.services.getAllDataIphone().subscribe(
      (data) => {
        this.iphoneData = data;
        this.filteredData = data;
      },
      (error) => {
        console.error('Error fetching Iphone data:', error);
        this.errorMessage = 'Failed to fetch Iphone data.';
      }
    );
  }

  ngAfterViewInit(): void {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 500) {
        this.renderer.setStyle(this.topButton.nativeElement, 'opacity', '1');
      } else {
        this.renderer.setStyle(this.topButton.nativeElement, 'opacity', '0');
      }
    });
  }

  clickPlus() {
    this.count++;
  }

  clickMinus() {
    this.count--;
  }

  addToCart(iphone: any) {
    const cartItemsStr = localStorage.getItem('cartItems');
    let cartItems: any[] = [];
    if (cartItemsStr) {
      cartItems = JSON.parse(cartItemsStr);
    }

    if (this.count > 0) {
      for (let i = 0; i < this.count; i++) {
        cartItems.push(iphone);
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      location.reload();
    } else {
      console.log('Count must be greater than zero to add to cart.');
    }
  }
  onSearch() {
    if (!this.searchTerm.trim()) {
      // If search term is empty, reset to original data
      this.filteredData = this.iphoneData;
    } else {
      // Filter the data based on the search term
      this.filteredData = this.iphoneData.filter((iphone: any) =>
        iphone.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  onSearchPrice() {
    const term = this.searchPrice;

    if (term === null || term === undefined ) {
      this.filteredData = this.iphoneData;
    } else {
      const price = +term;
      this.filteredData = this.iphoneData.filter((iphone: any) =>
        iphone.price <= price
      );
    }
  }

  scrollToTop() {
    const element = document.getElementById('iphone-video');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
