import { Airpods } from './../db.services';
import { Component, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit  } from '@angular/core';
import { DBServices } from '../db.services';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-airpods',
  templateUrl: './airpods.component.html',
  styleUrls: ['./airpods.component.css'],
  animations: [
    trigger('fadeInRightBig', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translate3d(100%, 0, 0)' }),
        animate('1.5s', style({ opacity: 1, transform: 'translate3d(0, 0, 0)' }))
      ])
    ])
  ]
})
export class AirpodsComponent implements OnInit, AfterViewInit {
  @ViewChild('topButton') topButton!: ElementRef;
  errorMessage: string | undefined;
macData: any;

  constructor(private services: DBServices, private renderer: Renderer2){}
    airpodsData: any;
    isLoading: boolean = true;
    searchTerm: string = '';  // Two-way binding for the search input
    searchPrice: number | undefined ;
    filteredData: any[] = []; // Stores filtered data based on search
    ngOnInit(): void {
      this.getData();
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }


    getData() {
      this.services.getAllAirpods().subscribe(
        (data) => {
          console.log('AirPods data:', data);
          this.airpodsData = data;
          this.filteredData = data;
        },
        (error) => {
          console.error('Error fetching AirPods data:', error);
          this.errorMessage = 'Failed to fetch AirPods data.';
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
  addToCart(airpods: any) {
    const cartItemsStr = localStorage.getItem('cartItems');
    let cartItems: any[] = [];
    if (cartItemsStr) {
      cartItems = JSON.parse(cartItemsStr);
    }
    if (this.count > 0) {
      for (let i = 0; i < this.count; i++) {
        cartItems.push(airpods);
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
      this.filteredData = this.airpodsData;
    } else {
      // Filter the data based on the search term
      this.filteredData = this.airpodsData.filter((airpod: any) =>
        airpod.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  onSearchPrice() {
    const term = this.searchPrice;

    if (term === null || term === undefined ) {
      this.filteredData = this.airpodsData;
    } else {
      const price = +term;
      this.filteredData = this.airpodsData.filter((airpod: any) =>
        airpod.price <= price
      );
    }
  }
  scrollToTop() {
    const element = document.getElementById('airpods-video');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  }

