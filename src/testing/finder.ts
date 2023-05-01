import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { Type, DebugElement } from '@angular/core';

export function query<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  canReturnError = true
) {
  const elementDe = fixture.debugElement.query(By.css(selector));
  if (canReturnError) {
    returnErrorMessages(elementDe, selector);
  }
  return elementDe;
}

export function queryByTestId<T>(
  fixture: ComponentFixture<T>,
  testId: string,
  canReturnError = true
) {
  const selector = `[data-id="${testId}"]`;
  return query(fixture, selector, canReturnError);
}

export function queryById<T>(
  fixture: ComponentFixture<T>,
  id: string,
  canReturnError = true
) {
  return query(fixture, `#${id}`, canReturnError);
}

export function queryAll<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  canReturnError = true
) {
  const elementsDe = fixture.debugElement.queryAll(By.css(selector));
  if (canReturnError) {
    returnErrorMessages(elementsDe, selector);
  }
  return elementsDe;
}

export function queryAllByDirective<T, D>(
  fixture: ComponentFixture<T>,
  selector: Type<D>
) {
  const elementDe = fixture.debugElement.queryAll(By.directive(selector));
  return elementDe;
}

export function getText<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestByTestId = false,
  canReturnError = true
) {
  const elementDe = withTestByTestId
    ? queryByTestId(fixture, selector, canReturnError)
    : query(fixture, selector, canReturnError);
  const elementNative: HTMLElement = elementDe.nativeElement;
  return elementNative.textContent;
}

function returnErrorMessages<T>(
  elementDe: DebugElement | DebugElement[],
  selector: string | Type<T>
) {
  if (!elementDe) {
    throw new Error(
      `Query: No se encontro un elemento con el selector: ${selector}`
    );
  }
}
