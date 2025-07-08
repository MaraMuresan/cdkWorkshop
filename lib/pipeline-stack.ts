import * as cdk from "aws-cdk-lib";
import { Stack, StackProps } from "aws-cdk-lib";
import { CodeBuildStep, CodePipeline, CodePipelineSource } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { WorkshopPipelineStage } from "./pipeline-stage";

export class WorkshopPipelineStack extends Stack {
    constructor (scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // Creates a GitHub repository source
        const repo = CodePipelineSource.gitHub('MaraMuresan/cdkWorkshop', 'main', {
            authentication: cdk.SecretValue.secretsManager('github-token')
        });

        // The basic pipeline declaration. This sets the initial structure
        // of the pipeline
        //on CodePipeline Console I see 3 green boxes:
        // 1. Source: Pipeline pulled code from GitHub repo
        // 2. Build: Pipeline ran the synth commands: npm ci, npm run build, npx cdk synth
        // 3. UpdatePipeline: Pipeline updated itself
        // Eveytime I git push to the GitHub repo, the pipeline will automatically trigger
        const pipeline = new CodePipeline(this, "Pipeline", {
            pipelineName: "WorkshopPipeline",
            synth: new CodeBuildStep("SynthStep", {
                input: repo,
                commands: [
                    "npm ci",
                    "npm run build",
                    "npx cdk synth"
                    // these commands prepare the CDK code to be deployed by converting it from
                    // TypeScript -> JavaScript -> CloudFormation
                ]
            }),
        });

        const deploy = new WorkshopPipelineStage(this, "Deploy");
        const deployStage = pipeline.addStage(deploy);
    }
}