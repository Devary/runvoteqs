import {Component, DestroyRef, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {Table, TableModule} from "primeng/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharacterRole, SharacterRoleImpl} from "../../../model/data-model";
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
import {NgStyle} from "@angular/common";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialog} from "primeng/confirmdialog";
import {Editor} from "primeng/editor";
import {Toast} from "primeng/toast";
import {RoleService} from "../../service/RoleService";
import {tablePageSize} from "../../app.config";
import {MessageTemplateService} from "../../service/MessageTemplateService";
import {EntityRegistry} from "../../service/annotations/entity-registry";
import {MessageAction} from "../../service/annotations/message-action";

@Component({
  selector: 'app-role',
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
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
  outputs: ['message','visibleConfirmation'],
  providers: [ConfirmationService, MessageService]
})
export class RoleComponent implements OnInit,OnDestroy{

  //views
  @ViewChild('dt') dt!: Table;

  //variables
  protected createRoleDialog: boolean = false;
  protected isEdit = false;
  protected isCreate = false;
  role!: SharacterRole;
  selectedRoles!: SharacterRole[];
  roles= signal<SharacterRole[]> ([]);
  loading: boolean = true;
  tuple : [EntityRegistry,MessageAction];

  protected readonly tablePageSize = tablePageSize;

  //icons
  protected readonly faCoffee = faCoffee;

  //behavior
  destroyed = new BehaviorSubject(null)

  constructor(protected roleService: RoleService,
              private destroyRef : DestroyRef,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private messageTemplate: MessageTemplateService) {
    this.roleService.getAll().subscribe( data => this.roles.set(data));
    this.loading= false;
    this.tuple = [EntityRegistry.ROLE,MessageAction.DELETED];
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyed.next(null);
    this.destroyed.complete();
  }

  delete(sharacter :SharacterRole) {
    this.selectedRoles=[];
    this.selectedRoles.push(sharacter);
    this.deleteSelectedSharacters();
  }

  openNew() {
    this.role = new SharacterRoleImpl();
    this.createRoleDialog = true;
    this.isCreate = true;
  }

  hideDialog() {
    this.createRoleDialog = false;
    this.isEdit = false;
    this.isCreate = false;
    this.role = new SharacterRoleImpl() ;
  }

  exportCSV() {
    this.dt.exportCSV();
  }

  edit(role:SharacterRole) {
    this.role = role;
    this.createRoleDialog = true;
    this.isEdit = true;
  }

  processEntity() {
    if(this.isEdit){
      this.tuple[1] = MessageAction.SAVED;
      this.roleService.update(this.role).pipe(catchError((err) => {
        this.messageService.add(this.messageTemplate.generateError(this.tuple,err.statusText))
        return EMPTY;
      })).subscribe(res => this.messageService.add(this.messageTemplate.generateSuccess(this.tuple)));
      this.isEdit = false;
    }else if(this.isCreate){
      this.tuple[1] = MessageAction.CREATED;
      let _roles = this.roles();
      this.roleService.create(this.role)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .pipe(catchError((err) => {
          this.messageService.add(this.messageTemplate.generateError(this.tuple,err.statusText))
          return EMPTY;
        })).subscribe(res => {this.roles.set([..._roles, res]);
          this.messageService.add(this.messageTemplate.generateSuccess(this.tuple))});
      this.isCreate = false;
    }
    this.hideDialog();
  }

  deleteSelectedSharacters() {
    this.confirmationService.confirm({
      message: this.selectedRoles.length>1?'Are you sure you want to delete the selected ('+this.selectedRoles.length+') roles?':
        'Are you sure you want to delete the selected ('+this.selectedRoles.length+') role?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:"Yes delete",
      acceptIcon:"pi pi-trash",
      acceptButtonStyleClass:"danger",
      accept: () => {
        this.selectedRoles.forEach(sc => {
          this.roleService
            .delete(sc.id)
            .pipe(catchError((err) => {
              this.tuple[1] = MessageAction.DELETED;
            this.messageService.add(this.messageTemplate.generateError(this.tuple,err.statusText))
            return EMPTY;
            }))
            .subscribe( res => this.messageService.add(this.messageTemplate.generateSuccess(this.tuple)))
        })
        this.roles.set(this.roles().filter((val) => !this.selectedRoles?.includes(val)));
        this.selectedRoles = [];
      },
      reject: () => {
        this.hideDialog()
      }
    });
  }

}
