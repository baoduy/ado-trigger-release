import * as task from 'vsts-task-lib/task';

import ReleaseManager, { Options } from './ReleaseManager';

export interface ReplacePattern {
  from: string;
  to: string;
}

async function run() {
  console.log('Running trigger-release');

  try {
    const releaseDefinitionId = task.getInput('TargetDefinition', true);
    const environments = task.getInput('releaseStagesInput', true).split(',');

    const options: Options = {
      azureDevOpsUri: task.getVariable('system.TeamFoundationServerUri'),
      projectNameOrId: task.getVariable('system.teamProject'),
      pat: task.getVariable('system.AccessToken')
    };

    const manager = new ReleaseManager(options);

    environments.forEach(async env => {
      const rs = await manager.reDeploy(Number(releaseDefinitionId), env);
      console.log(`The ${rs.name} of ${rs.releaseDefinition.name} had been scheduled.`);
    });

    task.setResult(task.TaskResult.Succeeded, '', true);
  } catch (err) {
    console.error(err);
    task.setResult(task.TaskResult.Failed, err);
  }
}

run();
