import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  products: any[] = [];
  categorizedProducts: { [category: string]: any[] } = {};
  apiUrls: { [key: string]: string } = {
    Watch: 'https://new-world.runasp.net/api/Watch',
    iPad: 'https://new-world.runasp.net/api/Ipad',
    Mac: 'https://new-world.runasp.net/api/Mac',
    iPhone: 'https://new-world.runasp.net/api/Iphone',
    AirPods: 'https://new-world.runasp.net/api/Airpods'
  };

  isEditModalOpen = false;
  editableProduct: any = null;
  editableCategory: string = '';
  isCreateModalOpen = false;
  createCategory: string = '';
  newProduct: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  fetchAllProducts() {
    this.categorizedProducts = {};

    Object.keys(this.apiUrls).forEach((category) => {
      this.http.get<any[]>(this.apiUrls[category]).subscribe({
        next: (response) => {
          this.categorizedProducts[category] = response;
        },
        error: (error) => {
          console.error(`Failed to fetch products for ${category}:`, error);
        }
      });
    });
  }

  openCreateModal(category: string) {
    this.createCategory = category;
    this.newProduct = { name: '', price: null, color: '', image: '' };
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
    this.newProduct = {};
    this.createCategory = '';
  }

  createProduct() {
    const url = this.apiUrls[this.createCategory];
    this.http.post(url, this.newProduct).subscribe({
      next: (response) => {
        console.log('Product created successfully:', response);
        this.categorizedProducts[this.createCategory].push(response);
        this.closeCreateModal();
      },
      error: (error) => {
        console.error('Failed to create product:', error);
        alert('Error creating the product.');
      }
    });
  }

  openEditModal(product: any, category: string) {
    this.editableProduct = { ...product };
    this.editableCategory = category;
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.editableProduct = null;
    this.editableCategory = '';
  }

  updateProduct() {
    const url = this.apiUrls[this.editableCategory];

    console.log('Sending PUT request to:', `${url}/${this.editableProduct.id}`);
    console.log('Payload:', this.editableProduct);

    this.http.put(`${url}/${this.editableProduct.id}`, this.editableProduct).subscribe({
      next: () => {
        console.log('Product updated successfully');

        const index = this.categorizedProducts[this.editableCategory].findIndex(
          (p) => p.id === this.editableProduct.id
        );
        if (index !== -1) {
          this.categorizedProducts[this.editableCategory][index] = { ...this.editableProduct };
        }

        this.closeEditModal();
      },
      error: (error) => {
        console.error('Failed to update product:', error);
        console.error('Error Details:', error.status, error.message, error.error);
      }
    });
  }

  deleteProduct(productId: number, category: string) {
    const url = `${this.apiUrls[category]}/${productId}`;
    if (confirm(`Are you sure you want to delete this ${category} product?`)) {
      this.http.delete(url).subscribe({
        next: () => {
          console.log(`Product with ID ${productId} deleted successfully.`);
          this.categorizedProducts[category] = this.categorizedProducts[category].filter(
            (product) => product.id !== productId
          );
        },
        error: (error) => {
          console.error('Failed to delete product:', error);
          alert('An error occurred while trying to delete the product.');
        }
      });
    }
  }





}
