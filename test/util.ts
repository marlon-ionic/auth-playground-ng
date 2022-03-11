import { ComponentFixture } from '@angular/core/testing';

export const deepCopy = (obj: any): any => JSON.parse(JSON.stringify(obj));

export const click = <T>(fixture: ComponentFixture<T>, button: HTMLElement) => {
  const event = new Event('click');
  button.dispatchEvent(event);
  fixture.detectChanges();
};
