#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkintroStack } from '../lib/cdkintro-stack';

const app = new cdk.App();
new CdkintroStack(app, 'CdkintroStack');
