import {Component, DestroyRef, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {Table, TableModule} from "primeng/table";
import {SharacterService} from "../../../service/SharacterService";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharacterData, SharacterDataImpl, SharacterRole} from "../../../model/data-model";
import {Button} from "primeng/button";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {Toolbar} from "primeng/toolbar";
import {Dialog} from "primeng/dialog";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCoffee} from "@fortawesome/free-solid-svg-icons";
import {BehaviorSubject} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {NgForOf, NgStyle} from "@angular/common";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialog} from "primeng/confirmdialog";
import {FileUpload} from "primeng/fileupload";
import {Editor} from "primeng/editor";
import {Toast} from "primeng/toast";
import {Tag} from "primeng/tag";

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
    FaIconComponent,
    ReactiveFormsModule,
    NgForOf,
    ConfirmDialog,
    FileUpload,
    Editor,
    Toast,
    NgStyle,
    Tag,
  ],
  templateUrl: './sharacter.component.html',
  styleUrl: './sharacter.component.scss',
  outputs: ['message','visibleConfirmation'],
  providers: [ConfirmationService, MessageService]
})
export class SharacterComponent implements OnInit,OnDestroy{

  //views
  @ViewChild('dt') dt!: Table;

  //variables
  protected createSharacterDialog: boolean = false;
  protected isEdit = false;
  protected isCreate = false;
  sharacters = signal<SharacterData[]>([])
  sharacter: SharacterData= new SharacterDataImpl();
  selectedShars!: SharacterData[];
  roles= signal<SharacterRole[]> ([]);
  _roles: any = {};
  loading: boolean = true;


  //icons
  protected readonly faCoffee = faCoffee;

  //behavior
  destroyed = new BehaviorSubject(null)

  constructor(private sharacterService: SharacterService,private destroyRef : DestroyRef,private confirmationService: ConfirmationService,private messageService: MessageService) {
    this.sharacterService.getAll().subscribe( data => this.sharacters.set(data));
    this.loading= false;
    this.sharacterService.getRoles().subscribe( data => {
      this.roles.set(data);
      this._roles = data;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyed.next(null);
    this.destroyed.complete();
  }

  delete(sharacter :SharacterData) {
    this.selectedShars=[];
    this.selectedShars.push(sharacter);
    this.deleteSelectedSharacters();
  }

  openNew() {
    this.sharacter = new SharacterDataImpl();
    this.createSharacterDialog = true;
    this.isCreate = true;
  }

  hideDialog() {
    this.createSharacterDialog = false;
    this.isEdit = false;
    this.isCreate = false;
    this.sharacter = new SharacterDataImpl();
  }

  exportCSV() {
    this.dt.exportCSV();
  }

  edit(sharacter:SharacterData) {
    this.sharacter = sharacter;
    this.createSharacterDialog = true;
    this.isEdit = true;
  }

  processEntity() {
    if(this.isEdit){
      this.sharacterService.update(this.sharacter).subscribe();
      this.isEdit = false;
    }else if(this.isCreate){
      let _sharacters = this.sharacters();
      this.sharacterService.create(this.sharacter)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(data => this.sharacters.set([..._sharacters, data]));
      this.isCreate = false;
    }
    this.hideDialog();
  }

  deleteSelectedSharacters() {
    this.confirmationService.confirm({
      message: this.selectedShars.length>1?'Are you sure you want to delete the selected ('+this.selectedShars.length+') sharacters?':
        'Are you sure you want to delete the selected ('+this.selectedShars.length+') sharacter?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:"Yes delete",
      acceptIcon:"pi pi-trash",
      acceptButtonStyleClass:"danger",
      accept: () => {
        this.selectedShars.forEach(sc => {
          this.sharacterService.delete(sc.id).subscribe( data =>
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Character Deleted',
              life: 3000
            })
          )
        })
        this.sharacters.set(this.sharacters().filter((val) => !this.selectedShars?.includes(val)));
        this.selectedShars = [];

      }
    });
  }

  protected readonly console = console;
}
