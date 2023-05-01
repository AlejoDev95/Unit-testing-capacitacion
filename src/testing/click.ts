import { ComponentFixture } from '@angular/core/testing';
import { queryByTestId, query } from './finder';

export function clickEvent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId = false,
  eventName = 'click',
  event: unknown = null
) {
  const element = withTestId
    ? queryByTestId(fixture, selector)
    : query(fixture, selector);

  element.triggerEventHandler(eventName, event);
}

export function clickElement<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId = false
) {
  const elementDebug = withTestId
    ? queryByTestId(fixture, selector)
    : query(fixture, selector);

  const element: HTMLElement = elementDebug.nativeElement;
  element.click();
}
