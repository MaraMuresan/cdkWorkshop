import { Stack, StackProps } from "aws-cdk-lib";
import { CodeBuildStep, CodePipeline, CodePipelineSource } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";

export class WorkshopPipelineStack extends Stack {
    constructor (scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // Creates a GitHub repository source
        const repo = CodePipelineSource.gitHub('MaraMuresan/cdkWorkshop', 'main');

        // The basic pipeline declaration. This sets the initial structure
        // of the pipeline
        const pipeline = new CodePipeline(this, "Pipeline", {
            pipelineName: "WorkshopPipeline",
            synth: new CodeBuildStep("SynthStep", {
                input: repo,
                commands: [
                    "npm ci",
                    "npm run build",
                    "npx cdk synth"
                ]
            })
        })
    }
}