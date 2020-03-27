"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const task = require("vsts-task-lib/task");
const ReleaseManager_1 = require("./ReleaseManager");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Running trigger-release');
        try {
            const releaseDefinitionId = task.getInput('TargetDefinition', true);
            const environments = task.getInput('releaseStagesInput', true).split(',');
            const options = {
                azureDevOpsUri: task.getVariable('system.TeamFoundationServerUri'),
                projectNameOrId: task.getVariable('system.teamProject'),
                pat: task.getVariable('system.AccessToken')
            };
            const manager = new ReleaseManager_1.default(options);
            environments.forEach((env) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const rs = yield manager.reDeploy(Number(releaseDefinitionId), env);
                    console.log(`The ${rs.name} of ${rs.releaseDefinition.name} had been scheduled.`);
                }
                catch (ex) {
                    console.error(ex);
                    task.setResult(task.TaskResult.Failed, ex);
                }
            }));
            task.setResult(task.TaskResult.Succeeded, '', true);
        }
        catch (err) {
            console.error(err);
            task.setResult(task.TaskResult.Failed, err);
        }
    });
}
run();
