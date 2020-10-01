import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Pagination, Filter } from '@shared/models/pagination';
import { Modal } from '@shared/utility/modal';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ItemComponentService } from '../../services/item-component/item-component.service';
import { ItemComponentFormModalComponent } from './item-component-form-modal/item-component-form-modal.component';

@Component({
  selector: 'app-item-component',
  templateUrl: './item-component.component.html',
  styleUrls: ['./item-component.component.scss']
})
export class ItemComponentComponent implements OnInit {

  formGroup: FormGroup;
  pagination: Pagination = new Pagination();
  paginationLoading = false;
  
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private itemComponentService: ItemComponentService,
    private modalService: NzModalService,
    private modal: Modal,
    private message: NzMessageService,
  ) { }
  
  ngOnInit(): void {
    this.initialForm();
    this.search();
  }

  initialForm() {
    this.formGroup = this.formBuilder.group({
      name: [''],
      ...Filter
    });
  }

  search() {
    this.paginationLoading = true;
    this.itemComponentService.pagination(this.formGroup.getRawValue())
      .subscribe(response => {
        this.pagination = response;
        this.paginationLoading = false;
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.paginationLoading = false;
      });
  }

  changePage(index: any) {
    this.formGroup.patchValue({ page: index });
    this.search();
  }

  sortChange(sort: any): void {
    this.formGroup.patchValue({ field: sort.key ?? '', order: sort.value ?? '' });
    this.search();
  }

  clear(): void {
    this.formGroup.reset(Filter);
  }

  openFormModal(itemComponentId?: number): void {
    const modal = this.modalService.create({
      nzWidth: 650,
      nzTitle: `${ itemComponentId === undefined ? 'Nuevo' : 'Modificar'} Item Component`,
      nzContent: ItemComponentFormModalComponent,
      nzComponentParams: { itemComponentId: itemComponentId }
    });

    modal.afterClose.subscribe(result => {
      if (result?.refresh)
        this.search();
    });
  }

  updateState(item: any) {
    const body = {
      id: item.id,
      is_active: !item.is_active,
      modification_user: 'Admin'
    };

    this.modal.confirm('¿Esta seguro de realizar la acción?', () => {
      this.itemComponentService.updateState(body)
        .subscribe((response: any) => {
          this.modal.success('Estado actualizado correctamente.');
          this.search();
        }, (error: any) => {
          this.message.error('Lo sentimos, ocurrió un error inesperado.');
        });
    });
  }

  onNavigateForm(itemComponentId?: number): void {
    var condiconal = itemComponentId > 0 ? `/${itemComponentId}` : '';
    this.router.navigate([`item-component/form${condiconal}`]);
  }
}
