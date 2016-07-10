/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { LoadingComponent } from './loading.component';

describe('Component: Loading', () => {
  it('should create an instance', () => {
    let component = new LoadingComponent();
    expect(component).toBeTruthy();
  });
});
