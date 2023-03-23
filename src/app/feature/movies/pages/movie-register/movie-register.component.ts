import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subject, takeUntil, tap, map, filter, switchMap } from 'rxjs';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-register',
  templateUrl: './movie-register.component.html',
})
export class MovieRegisterComponent implements OnInit, OnDestroy {
  public registerForm!: FormGroup;
  public urlImage = '';
  private idMovie: string | null = '';

  private unsubscribe$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private movieService: MovieService,
    private router: Router
  ) {
    this.createForm();
  }

  public get inputTitle() {
    return this.registerForm.get('title');
  }

  public get inputReleaseDate() {
    return this.registerForm.get('releaseDate');
  }

  public get inputUrlImage() {
    return this.registerForm.get('image');
  }

  public get inputCategory() {
    return this.registerForm.get('category');
  }

  public get inputDescription() {
    return this.registerForm.get('description');
  }

  public get isValidUrl(): boolean {
    return !!this.urlImage && this.urlImage.length > 0;
  }

  public get textSubmitButton(): string {
    return this.idMovie ? 'Edit movie' : 'Create movie';
  }

  public get textSecundaryButton(): string {
    return this.idMovie ? 'Back' : 'Clear form';
  }

  ngOnInit(): void {
    this.listenToImageInput();
    this.listenToEdit();
  }

  public onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const request = this.idMovie
      ? this.movieService.update(this.idMovie, this.registerForm.value)
      : this.movieService.create(this.registerForm.value);

    request.subscribe(() => this.router.navigateByUrl('movies/list'));
  }

  public clearForm(): void {
    if (this.idMovie) {
      this.idMovie = null;
      this.location.back();
      return;
    }

    this.registerForm.reset();
  }

  public loadErrorImage(): void {
    this.urlImage = '';
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  private createForm(): void {
    this.registerForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      releaseDate: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  private listenToImageInput(): void {
    this.inputUrlImage?.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(url => (this.urlImage = url))
      )
      .subscribe();
  }

  private listenToEdit(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((params: ParamMap) => params.get('id')),
        filter((id: string | null) => !!id),
        switchMap(id => this.movieService.getOne(id || '')),
        tap(movies => {
          this.idMovie = movies.id;
          this.registerForm.patchValue(movies);
        })
      )
      .subscribe();
  }
}
