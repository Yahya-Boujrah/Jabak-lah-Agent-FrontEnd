import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomResponse } from 'src/app/interfaces/Custom-response';
import { ProductService } from 'src/app/services/Product.service';

import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/interfaces/Product.interface';
import { ProductCategory } from 'src/app/interfaces/Product-category.interface';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  faPenToSquare= faPenToSquare;
  faTrash = faTrash;

  editProduct !: Product;
  deleteProduct !: Product;
  deleteCategory !: ProductCategory;

  productResponse!: CustomResponse;
  categoryResponse!: CustomResponse;

  public dataSubject = new BehaviorSubject<any>(null);
  public catSubject = new BehaviorSubject<any>(null);


  currentCategoryId: number = 1;

  constructor(private productService: ProductService, private route: ActivatedRoute, private toast: NgToastService) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      response => {
        this.dataSubject.next(response);

        this.productResponse = response;
        this.productResponse = { ...response, data: { products: response.data.products?.reverse() } };
      }
    )

    this.productService.getCategories().subscribe(
      response => {
        this.catSubject.next(response);

        this.categoryResponse = response;
      }
    )

  }

  addProduct(form : NgForm){
    this.productService.addProduct(form.value).subscribe( response => {
      this.dataSubject.next(
        { ...response, data: { products: [response.data.product, ...this.dataSubject.value.data.products] } }
      )
      this.productResponse = this.dataSubject.value;
      this.toast.success({ detail: 'Success', summary: 'Product added', position: 'tr', duration: 2500 });

    });

  }

  addCategory(form : NgForm){
    this.productService.addCategory(form.value).subscribe( response => {
      this.catSubject.next(
        { ...response, data: { pcategories: [response.data.category, ...this.catSubject.value.data.pcategories] } }
      )
      this.categoryResponse = this.catSubject.value;
      this.toast.success({ detail: 'Success', summary: 'Category added', position: 'tr', duration: 2500 });

    });

  }
  deleteCat(cat: ProductCategory): void {
    this.productService.deleteCategory(cat.id as number).subscribe(response => {
      this.catSubject.next(
        {
          ...response, data:
            { pcategories: this.catSubject.value.data.pcategories.filter((c: { id: number | undefined; }) => c.id !== cat.id) }
        }
      )
      this.categoryResponse = this.catSubject.value;
      this.toast.success({ detail: 'Success', summary: 'Category deleted', position: 'tr', duration: 2500 });

    })
  }

  upateProduct(product : Product) {
    this.productService.updateProduct(product, product.id as number).subscribe(
      response => {
        if (response.data && response.data.product) {
          const updatedProduct = response.data.product;
          const updatedProducts = this.dataSubject.value.data.products.map((p: Product) => {
            if (p.id === updatedProduct.id) {
              return { ...p, ...updatedProduct };
            }
            return p;
          });
  
          this.dataSubject.next({
            ...response,
            data: {
              ...this.dataSubject.value.data,
              products: updatedProducts
            }
          });
  
          this.productResponse = this.dataSubject.value;
          this.toast.success({ detail: 'Success', summary: 'Product updated', position: 'tr', duration: 2500 });

        } else {
          console.error('Invalid response or missing product data.');
        }
      },
      error => {
        this.toast.error({ detail: 'Error', summary: 'Something gone wrong', position: 'tr', duration: 2500 });
      }
    );
  }

  delete(product: Product): void {
    this.productService.deleteProduct(product.id as number).subscribe(response => {
      this.dataSubject.next(
        {
          ...response, data:
            { products: this.dataSubject.value.data.products.filter((pr: { id: number | undefined; }) => pr.id !== product.id) }
        }
      )
      this.productResponse = this.dataSubject.value;
      this.toast.success({ detail: 'Success', summary: 'Product deleted', position: 'tr', duration: 2500 });

    })
  }

  doSearch(value: string) {
    console.log(`value=${value}`);
    this.productService.filterProducts$(value, this.dataSubject.value).subscribe(response =>{
      this.productResponse = response;
    })
  }


  onOpenModal(product: any, mode: string) {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addModal');
    }
    if (mode === 'edit') {
      this.editProduct = product;
      button.setAttribute('data-bs-target', '#updateModal');
    }
    if (mode === 'delete') {
      this.deleteProduct = product;
      button.setAttribute('data-bs-target', '#deleteModal');
    }
    if (mode === 'addCat') {
      button.setAttribute('data-bs-target', '#addCat');
    }
    if (mode === 'deleteCat') {
      this.deleteCategory = product;
      button.setAttribute('data-bs-target', '#deleteCat');
    }
    container?.appendChild(button);
    button.click();
  }
}
