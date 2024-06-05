import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideServerAuth } from './auth/auth.service';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), provideServerAuth()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
