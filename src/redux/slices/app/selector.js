import { createSelector } from "@reduxjs/toolkit";

const selectApp = (state) => state.app;

export const makeSelectUserData = () =>
  createSelector(selectApp, (appState) => appState.userData);

export const makeSelectToken = () =>
  createSelector(selectApp, (appState) => appState.token);

export const makeSelectUserName = () =>
  createSelector(selectApp, (appState) => appState.userData?.fullName);

export const makeSelectUserStatus = () =>
  createSelector(selectApp, (appState) => appState.userData?.status);
