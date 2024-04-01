import { createSelector } from "@reduxjs/toolkit";

const selectApp = (state) => state.app;

export const makeSelectAccessToken = () =>
  createSelector(selectApp, (appState) => appState.accessToken);

export const makeSelectUserData = () =>
  createSelector(selectApp, (appState) => appState.userData);

export const makeSelectUserName = () =>
  createSelector(selectApp, (appState) => appState.userData?.fullName);

export const makeSelectUserStatus = () =>
  createSelector(selectApp, (appState) => appState.userData?.status);
