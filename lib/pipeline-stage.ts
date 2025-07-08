import { CdkintroStack} from "./cdkintro-stack";
import { Stage, CfnOutput, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class WorkshopPipelineStage extends Stage {

    public readonly hcViewUrl: CfnOutput;
    public readonly hcEndpoint: CfnOutput;

    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        const service = new CdkintroStack(this, "WebService");

        this.hcEndpoint = service.hcEndpoint;
        this.hcViewUrl = service.hcViewerUrl;
    }
}