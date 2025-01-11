import {Component, DestroyRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Table, TableModule} from "primeng/table";
import {SharacterService} from "../../service/SharacterService";
import {FormsModule} from "@angular/forms";
import {SharacterData, SharacterDataImpl} from "../../model/data-model";
import {Button} from "primeng/button";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {Toolbar} from "primeng/toolbar";
import {Dialog} from "primeng/dialog";
import {Textarea} from "primeng/textarea";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCoffee} from "@fortawesome/free-solid-svg-icons";
import {NgIf} from "@angular/common";
import {BehaviorSubject} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

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
    NgIf,
  ],
  templateUrl: './sharacter.component.html',
  styleUrl: './sharacter.component.scss'
})
export class SharacterComponent implements OnInit,OnDestroy{
  @ViewChild('dt1') dt1!: Table;

  protected submitted: boolean = false;
  protected createSharacterDialog: boolean = false;
  protected isEdit = false;
  protected isCreate = false;


  //destroy
  destroyed = new BehaviorSubject(null)

  ngOnInit(): void {
        this.sharacters = [];
    }
  sharacters : SharacterData[] = [];
    //todo::implement forms
  sharacter: SharacterData= new SharacterDataImpl();

  constructor(private sharacterService: SharacterService,private destroyRef : DestroyRef) {
    this.refreshTable();
  }

  ngOnDestroy(): void {
    this.destroyed.next(null);
    this.destroyed.complete();
    }

  protected create() {
    this.submitted = true;
    this.createSharacterDialog = false;
    this.sharacter = new SharacterDataImpl();
  }

  delete(id :string) {
    this.sharacterService.delete(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => console.log("deleted"));
    this.refreshTable();
  }

  refreshTable(){
    this.sharacterService.getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => this.sharacters = data);
  }

  clear(dt1: Table) {
    dt1.clear();
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
  }

  exportCSV() {
    this.dt1.exportCSV();
  }

  protected readonly faCoffee = faCoffee;

  edit(sharacter:SharacterDataImpl) {
    this.sharacter = sharacter;
    this.createSharacterDialog = true;
    this.isEdit = true;
  }

  processEntity() {
    if(this.isEdit){
      this.edit(this.sharacter);
      this.sharacterService.update(this.sharacter);
      this.isEdit = false;
    }else if(this.isCreate){
      this.sharacterService.create(this.sharacter)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(data => this.sharacters.push(data));
      this.isCreate = false;
    }
    this.refreshTable()
    this.hideDialog();
  }
}
