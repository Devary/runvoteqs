import {Component, DestroyRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Table, TableModule} from "primeng/table";
import {SharacterService} from "../../service/SharacterService";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharacterData, SharacterDataImpl, SharacterRole} from "../../model/data-model";
import {Button} from "primeng/button";
import {MultiSelectChangeEvent, MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {Toolbar} from "primeng/toolbar";
import {Dialog} from "primeng/dialog";
import {Textarea} from "primeng/textarea";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCoffee} from "@fortawesome/free-solid-svg-icons";
import {BehaviorSubject} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-sharacter',
  standalone: true,
  imports: [
    TableModule,
    FormsModule,
    Button,
    MultiSelectModule,
    DropdownModule,
    InputTextModule,
    Toolbar,
    Dialog,
    Textarea,
    FaIconComponent,
    ReactiveFormsModule,
    NgForOf,
  ],
  templateUrl: './sharacter.component.html',
  styleUrl: './sharacter.component.scss',
  outputs: ['message','visibleConfirmation'],
})
export class SharacterComponent implements OnInit,OnDestroy{
  @ViewChild('dt') dt!: Table;

  protected submitted: boolean = false;
  protected createSharacterDialog: boolean = false;
  protected isEdit = false;
  protected isCreate = false;
  sharacters : SharacterData[] = [];
  sharacter: SharacterData= new SharacterDataImpl();
  roles: SharacterRole[] = [];

  //destroy
  destroyed = new BehaviorSubject(null)
  protected readonly faCoffee = faCoffee;

  constructor(private sharacterService: SharacterService,private destroyRef : DestroyRef) {
    this.sharacterService.getAll().subscribe( data => this.sharacters = data);
    this.sharacterService.getRoles().subscribe( data => data.forEach(value => this.roles.push(value)));
  }

  ngOnInit(): void {
    console.log(this.roles)
  }

  ngOnDestroy(): void {
    this.destroyed.next(null);
    this.destroyed.complete();
  }

  refreshTable(){
    this.sharacters = [];
    this.sharacterService.getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => this.sharacters = data);
  }

  delete(id :string) {
    this.sharacterService.delete(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => console.log("deleted"));
  }

  openNew() {
    this.sharacter = new SharacterDataImpl();
    this.submitted = false;
    this.createSharacterDialog = true;
    this.isCreate = true;
  }

  hideDialog() {
    this.createSharacterDialog = false;
    this.submitted = false;
    this.isEdit = false;
    this.isCreate = false;
    this.sharacter = new SharacterDataImpl();
  }

  exportCSV() {
    this.dt.exportCSV();
  }

  edit(id:string) {
    // @ts-ignore
    this.sharacter = this.sharacters.filter(sharacter => id === sharacter.id).at(0);
    this.createSharacterDialog = true;
    this.isEdit = true;
  }

  processEntity() {
    if(this.isEdit){
      this.sharacterService.update(this.sharacter);
      this.isEdit = false;
    }else if(this.isCreate){
      console.log(this.sharacter)
      this.sharacterService.create(this.sharacter)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(data => this.sharacters.push(data));
      this.submitted = true;
      this.isCreate = false;
    }
    this.hideDialog();
  }

  debug($event:any) {
    console.log(this.sharacter.role)
  }
}
