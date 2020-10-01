import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { Global } from '@shared/utility/global';
import { Modal } from '@shared/utility/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ItemComponentService } from 'src/app/features/services/item-component/item-component.service';
import { HttpErrorResponse } from '@angular/common/http';
import { field4Mock } from '@core/mocks/field4.mock';
import * as moment from 'moment';

@Component({
  selector: 'app-project-form',
  templateUrl: './item-component-form-modal.component.html',
  styleUrls: ['./item-component-form-modal.component.scss']
})
export class ItemComponentFormModalComponent implements OnInit {

  @Input() itemComponentId: number;
  formGroup: FormGroup;
  loading = true;
  field4Items: Array<any> = field4Mock;
  moment = moment;

  constructor(
    private formBuilder: FormBuilder,
    private modalRef: NzModalRef,
    private global: Global,
    private itemComponentService: ItemComponentService,
    private modal: Modal,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.initialForm();
    if (this.itemComponentId > 0)
      this.loadForm();
    else
      this.loading = false;
  }

  initialForm() {
    this.formGroup = this.formBuilder.group({
      id: 0,
      name: [null, Validators.required],
      description: [null],
      field4: [null, Validators.required],
      field5: [null],
      field6Format: [this.moment().toDate(), Validators.required]
    });
  }

  loadForm() {
    this.itemComponentService.getById(this.itemComponentId)
      .subscribe((response: any) => {
        this.formGroup.patchValue({
          id: response.id,
          name: response.name,
          description: response.description,
          field4: response.field4,
          field5: response.field5,
          field6Format: this.moment(response.field6Format, 'DD/MM/YYYY').toDate()
        });
        this.loading = false;
      }, () => { this.loading = false; });
  }

  onCancel(): void {
    this.modalRef.destroy();
  }

  onSave(): void {
    if (!this.global.validForm(this.formGroup))
      return;

    this.modal.confirm('¿Esta seguro de realizar la acción?', () => {
      this.loading = true;
      if (this.itemComponentId > 0)
        this.handleEdit();
      else
        this.handleCreate();
    });
  }

  handleCreate() {
    var form = this.formGroup.getRawValue();
    form.field6Format = this.moment(this.formGroup.get('field6Format').value).format('DD/MM/YYYY');

    this.itemComponentService.post(form)
      .subscribe((response: any) => {
        this.message.success('Datos guardados correctamente.');
        this.modalRef.destroy({ refresh: true });
        this.loading = false;
      }, () => { this.loading = false; });
  }

  handleEdit() {
    var form = this.formGroup.getRawValue();
    form.field6Format = this.moment(this.formGroup.get('field6Format').value).format('DD/MM/YYYY');

    this.itemComponentService.put(form)
      .subscribe((response: any) => {
        this.message.success('Datos guardados correctamente.');
        this.modalRef.destroy({ refresh: true });
        this.loading = false;
      }, () => { this.loading = false; });
  }
}
