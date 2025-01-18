import {
  AfterViewInit,
  Component,
  DestroyRef,
  input,
  OnDestroy,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';
import {Table, TableModule} from "primeng/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharacterRoleImpl} from "../../../../model/data-model";
import {Button} from "primeng/button";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {Toolbar} from "primeng/toolbar";
import {Dialog} from "primeng/dialog";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCoffee} from "@fortawesome/free-solid-svg-icons";
import {BehaviorSubject, catchError, EMPTY} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {NgForOf, NgIf, NgStyle, TitleCasePipe} from "@angular/common";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialog} from "primeng/confirmdialog";
import {Editor} from "primeng/editor";
import {Toast} from "primeng/toast";
import {RoleService} from "../../../service/RoleService";
import {tablePageSize} from "../../../app.config";
import {MessageTemplateService} from "../../../service/MessageTemplateService";
import {EntityRegistry} from "../../../service/annotations/entity-registry";
import {MessageAction} from "../../../service/annotations/message-action";
import {ContextService} from "../../../service/ContextService";
import {EntityContext} from "../../../context/EntityContext";
import {TableField} from "../../../context/models/TableField";
import {TableFieldType} from "../../../context/models/TableFieldType";
import {Tag} from "primeng/tag";


@Component({
  selector: 'd-dt',
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
    ConfirmDialog,
    Editor,
    Toast,
    NgStyle,
    NgIf,
    NgForOf,
    Tag,
    TitleCasePipe,
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',
  outputs: ['message','visibleConfirmation'],
  providers: [ConfirmationService, MessageService,ContextService],
})
export class DynamicTableComponent implements OnInit,AfterViewInit,OnDestroy{

  //views
  @ViewChild('dt') dt!: Table;

  //variables
  protected creationDialog: boolean = false;
  protected isEdit = false;
  protected isCreate = false;
  object!: any;
  selectedObjects!:  any[];
  objects= signal<any[]> ([]);
  loading: boolean = true;
  tuple! : [EntityRegistry,MessageAction];
  defaultInitContext: any = {
    name: "",
    fields: [],
    allowActions: true,
    allowedActions: [],
    allowExportAction: true,
    disabledActions: [],
    disableFields: []
  }

  context = input<EntityContext>(this.defaultInitContext);
  protected readonly tablePageSize = tablePageSize;

  //icons
  protected readonly faCoffee = faCoffee;

  //behavior
  destroyed = new BehaviorSubject(null)
  fieldsToShow: TableField[] = [];
  fieldsToShowStrings: string[]=[];

  constructor(protected service: RoleService,
              private destroyRef : DestroyRef,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private messageTemplate: MessageTemplateService,
              private contextService: ContextService) {
    this.loading= true;
  }



  ngOnInit(): void {

  }
  generateFieldsToShow() {
    this.context().fields.forEach(field=>{
      if(this.context().disabledFields?.filter(fth => fth === field.name).length===0){
      this.fieldsToShow.push(field);
    }});
  }
  ngAfterViewInit(): void {
    this.tuple = [EntityRegistry.getByName(this.context()?.name),EMPTY];
    this.contextService.getTableContextFor(this.context()?.name).service.getAll().subscribe((data: any[]) => this.objects.set(data));
    this.generateFieldsToShow();
    this.fieldsToShow.map(field => {
      if (field.isMultiSelect){
        // @ts-ignore
        this.contextService.getTableContextFor(field.listType).service.getAll().subscribe(data =>field.setListObjects(data))
      }
    })



    this.loading = false;
  }

  ngOnDestroy(): void {
    this.destroyed.next(null);
    this.destroyed.complete();
  }

  delete(obj : Object) {
    this.selectedObjects=[];
    this.selectedObjects.push(obj);
    this.deleteSelectedObjects();
  }

  openNew() {
    this.object = {};
    this.creationDialog = true;
    this.isCreate = true;
  }

  hideDialog() {
    this.creationDialog = false;
    this.isEdit = false;
    this.isCreate = false;
    this.object = new SharacterRoleImpl() ;
  }

  exportCSV() {
    this.dt.exportCSV();
  }

  edit(role: Object) {
    this.object = role;
    this.creationDialog = true;
    this.isEdit = true;
  }

  processEntity() {
    if(this.isEdit){
      this.changeActionTransition(MessageAction.SAVED);
      this.service.update(this.object).pipe(catchError((err) => {
        this.messageService.add(this.messageTemplate.generateError(this.tuple,err.statusText))
        return EMPTY;
      })).subscribe(res => this.messageService.add(this.messageTemplate.generateSuccess(this.tuple)));
      this.isEdit = false;
    }else if(this.isCreate){
      this.changeActionTransition(MessageAction.CREATED);
      let _roles = this.objects();
      this.service.create(this.object)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .pipe(catchError((err) => {
          this.messageService.add(this.messageTemplate.generateError(this.tuple,err.statusText))
          return EMPTY;
        })).subscribe(res => {this.objects.set([..._roles, res]);
          this.messageService.add(this.messageTemplate.generateSuccess(this.tuple))});
      this.isCreate = false;
    }
    this.hideDialog();
  }

  deleteSelectedObjects() {
    this.confirmationService.confirm({
      message: this.selectedObjects.length>1?'Are you sure you want to delete the selected ('+this.selectedObjects.length+') '+this.context()?.name+'(s) ?':
        'Are you sure you want to delete the selected ('+this.selectedObjects.length+') '+this.context()?.name+' ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:"Yes delete",
      acceptIcon:"pi pi-trash",
      acceptButtonStyleClass:"danger",
      accept: () => {
        this.changeActionTransition(MessageAction.DELETED);
        this.selectedObjects.forEach(sc => {
          this.service
            .delete(sc.id)
            .pipe(catchError((err) => {
            this.messageService.add(this.messageTemplate.generateError(this.tuple,err.statusText))
            return EMPTY;
            }))
            .subscribe( res => this.messageService.add(this.messageTemplate.generateSuccess(this.tuple)))
        })
        this.objects.set(this.objects().filter((val) => !this.selectedObjects?.includes(val)));
        this.selectedObjects = [];
      },
      reject: () => {
        this.hideDialog()
      }
    });
  }

  changeActionTransition(action : MessageAction){
    this.tuple[1] = action;
  }
}

