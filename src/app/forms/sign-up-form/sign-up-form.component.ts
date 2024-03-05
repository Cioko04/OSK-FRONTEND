import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';
import { Instructor } from 'src/app/shared/services/instructor/instructor';
import { School } from 'src/app/shared/services/school/school';
import { InitForm } from 'src/app/shared/core/BaseEntityComponent';
import { User } from 'src/app/shared/services/user/user';
import { CategoryEnum } from 'src/app/shared/services/category/category';

@UntilDestroy()
@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css', '../form-style.css'],
})
export class SignUpFormComponent implements OnInit {
  @Input()
  data: any;
  @Input()
  initProperForm: InitForm | any;

  @Output()
  dataChange = new EventEmitter<any>();
  @Output()
  onSubmit = new EventEmitter<any>();

  email: string = '';
  signupForm: FormGroup;
  submitted: boolean = false;
  buttonText: string = 'Zarejestruj';
  categories: Observable<string[]> = of(Object.values(CategoryEnum));

  constructor(private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      profile: [],
      password: [],
      school: [],
      categories: [],
    });
  }

  ngOnInit(): void {
    if (this.initProperForm.update) {
      this.buttonText = 'Zapisz';
      this.patchValues();
    }
  }

  submit() {
    this.updateValueAndValidity();
    if (this.signupForm.valid) {
      this.register();
      this.dataChange.emit(this.data);
      this.onSubmit.emit();
    }
  }

  updateValueAndValidity(){
    this.submitted = true;
    this.signupForm.get('profile')?.updateValueAndValidity();
    this.signupForm.get('password')?.updateValueAndValidity();
    this.signupForm.get('school')?.updateValueAndValidity();
  }

  private register() {
    if (this.initProperForm.school) {
      this.createSchool(this.data);
    } else if (this.initProperForm.instructor) {
      this.createInstructor(this.data);
    } else if (this.initProperForm.user) {
      this.createUser(this.data);
    }
  }

  private createInstructor(instructor: Instructor) {
    this.createUser(instructor.userRequest!);
    instructor.categories = this.signupForm.value.categories;
  }

  private createUser(user: User) {
    user.name = this.signupForm.value.profile.name;
    user.secondName = this.signupForm.value.profile.secondName;
    user.lastName = this.signupForm.value.profile.lastName;
    user.email = this.signupForm.value.profile.email;
    user.password = this.signupForm.value.password.password;
    user.dob = this.signupForm.value.profile.dob;
  }

  private createSchool(school: School) {
    school.schoolName = this.signupForm.value.school.schoolName;
    school.city = this.signupForm.value.school.city;
    school.zipCode = this.signupForm.value.school.zipCode;
    school.nip = this.signupForm.value.school.nip;
    if (this.initProperForm.user) {
       this.createUser(school.userRequest);
    }
  }

  private patchValues() {
    if (this.initProperForm.school) {
      this.patchSchool(this.data);
      if (this.initProperForm.user) {
        this.patchUser(this.data.userRequest);
      }
    } else if (this.initProperForm.instructor) {
      this.patchUser(this.data.userRequest);
      this.patchCategories(this.data.categories);
    } else if (this.initProperForm.user) {
      this.patchUser(this.data);
    }
  }

  private patchUser(user: User) {
    this.email = user.email;
    this.signupForm.get('profile')?.patchValue({
      name: user.name,
      secondName: user.secondName,
      lastName: user.lastName,
      dob: user.dob,
      email: user.email,
    });
    this.signupForm.get('password')?.patchValue({
      password: user.password,
      confirmPassword: user.password,
    });
  }

  private patchSchool(school: School) {
    this.signupForm.get('school')?.patchValue({
      schoolName: school.schoolName,
      city: school.city,
      zipCode: school.zipCode,
      nip: school.nip,
    });
  }

  private patchCategories(categories: string[]) {
    this.signupForm.get('categories')?.patchValue(categories);
  }
}
