import { Stack, StackProps } from "aws-cdk-lib";
import { CodePipelineSource } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";

export class WorkshopPipelineStack extends Stack {
    constructor (scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // Creates a GitHub repository source
        const repo = CodePipelineSource.gitHub('MaraMuresan/cdkWorkshop', 'main');

        // Pipeline code goes here
    }
}