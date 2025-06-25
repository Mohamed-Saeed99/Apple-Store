import { Component, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit  } from '@angular/core';
import { DBServices } from '../db.services';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css'],
  animations: [
    trigger('fadeInRightBig', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translate3d(100%, 0, 0)' }),
        animate('1.5s', style({ opacity: 1, transform: 'translate3d(0, 0, 0)' }))
      ])
    ])
  ]
})
export class WatchComponent implements OnInit, AfterViewInit  {
  @ViewChild('topButton') topButton!: ElementRef;
  errorMessage: string | undefined;

  constructor(private services: DBServices, private renderer: Renderer2){}
    watchData: any;
    isLoading: boolean = true;
    searchTerm: string = '';
    searchPrice: number | undefined ;
    filteredData: any[] = [];
    ngOnInit(): void {
      this.getData();
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
    getData() {
      this.services.getAllDataWatch().subscribe(
        (data) => {
          console.log('Watch data:', data);
          this.watchData = data;
          this.filteredData = data;
        },
        (error) => {
          console.error('Error fetching Watch data:', error);
          this.errorMessage = 'Failed to fetch Watch data.';
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
    count: number = 0;

    clickPlus() {
      this.count++;
    }
    clickMinus() {
      this.count--;
  }
  addToCart(watch: any) {

    const cartItemsStr = localStorage.getItem('cartItems');
    let cartItems: any[] = [];
    if (cartItemsStr) {
      cartItems = JSON.parse(cartItemsStr);
    }


    if (this.count > 0) {
      for (let i = 0; i < this.count; i++) {
        cartItems.push(watch);
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
      this.filteredData = this.watchData;
    } else {
      // Filter the data based on the search term
      this.filteredData = this.watchData.filter((watch: any) =>
        watch.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  onSearchPrice() {
    const term = this.searchPrice;

    if (term === null || term === undefined ) {
      this.filteredData = this.watchData;
    } else {
      const price = +term;
      this.filteredData = this.watchData.filter((watch: any) =>
        watch.price <= price
      );
    }
  }
  scrollToTop() {
    const element = document.getElementById('watch-video');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  }

