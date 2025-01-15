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
import {BehaviorSubject, Observable} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {NgForOf, NgStyle} from "@angular/common";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialog} from "primeng/confirmdialog";
import {FileUpload} from "primeng/fileupload";
import {Editor} from "primeng/editor";
import {Toast} from "primeng/toast";
import {Tag} from "primeng/tag";
import {RoleService} from "../../service/RoleService";
import {tablePageSize} from "../../app.config";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

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
    NgForOf,
    ConfirmDialog,
    FileUpload,
    Editor,
    Toast,
    NgStyle,
    Tag,
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
  protected readonly tablePageSize = tablePageSize;

  //icons
  protected readonly faCoffee = faCoffee;

  //behavior
  destroyed = new BehaviorSubject(null)

  constructor(protected roleService: RoleService,
              private destroyRef : DestroyRef,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
    this.roleService.getAll().subscribe( data => this.roles.set(data));
    this.loading= false;
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
      this.roleService.update(this.role).subscribe();
      this.isEdit = false;
    }else if(this.isCreate){
      let _roles = this.roles();
      this.roleService.create(this.role)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(data => this.roles.set([..._roles, data]));
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
          this.roleService.delete(sc.id).subscribe( res =>
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Character Deleted',
              life: 3000
            }),
            err=>{
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Character could not be Deleted',
                life: 3000
              })
            },
            () => console.log("Deleted successfully")
          )
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
