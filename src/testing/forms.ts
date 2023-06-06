import { ComponentFixture } from '@angular/core/testing';
import { queryById, query } from './finder';

export function setInputValue<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  value: string,
  withTestById = true
) {
  const inputDe = withTestById
    ? queryById(fixture, selector)
    : query(fixture, selector);
  const inputEl: HTMLInputElement = inputDe.nativeElement;

  inputEl.value = value;
  inputEl.dispatchEvent(new Event('input'));
  inputEl.dispatchEvent(new Event('blur'));
}

export function setCheckboxValue<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  value: boolean,
  withTestById = true
) {
  const inputDe = withTestById
    ? queryById(fixture, selector)
    : query(fixture, selector);
  const inputEl: HTMLInputElement = inputDe.nativeElement;

  inputEl.checked = value;
  inputEl.dispatchEvent(new Event('change'));
  inputEl.dispatchEvent(new Event('blur'));
}

export function setSelectValue<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  value: string,
  withTestById = true
) {
  const inputDe = withTestById
    ? queryById(fixture, selector)
    : query(fixture, selector);
  const inputEl: HTMLSelectElement = inputDe.nativeElement;

  inputEl.value = value;
  inputEl.dispatchEvent(new Event('change'));
  inputEl.dispatchEvent(new Event('blur'));
}
