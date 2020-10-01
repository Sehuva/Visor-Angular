import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemComponentService } from '../../services/item-component/item-component.service';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { field4Mock } from '@core/mocks/field4.mock';
import { NzMessageService } from 'ng-zorro-antd';
import { Global } from '@shared/utility/global';
import { Modal } from '@shared/utility/modal';

@Component({
  selector: 'app-item-component-form',
  templateUrl: './item-component-form.component.html',
  styleUrls: ['./item-component-form.component.scss']
})
export class ItemComponentFormComponent implements OnInit {

  itemComponentId: any;
  formGroup: FormGroup;
  moment = moment;
  loading: boolean = true;
  field4Items: Array<any> = field4Mock;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private itemComponentService: ItemComponentService,
    private message: NzMessageService,
    private global: Global,
    private modal: Modal,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.itemComponentId = params.get('itemComponentId');
    });
    this.initialForm();
    this.loadForm();
  }

  onCancel(): void {
    this.router.navigate([`item-component`]);
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
    if (!(this.itemComponentId > 0)) {
      this.loading = false;
      return;
    }

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
        this.loading = false;
      }, () => { this.loading = false; });
  }

  handleEdit() {
    var form = this.formGroup.getRawValue();
    form.field6Format = this.moment(this.formGroup.get('field6Format').value).format('DD/MM/YYYY');

    this.itemComponentService.put(form)
      .subscribe((response: any) => {
        this.message.success('Datos guardados correctamente.');
        this.loading = false;
      }, () => { this.loading = false; });
  }
}
