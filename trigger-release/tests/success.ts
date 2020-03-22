import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

const taskPath = path.join(__dirname, '..', 'index.js');
const tr = new tmrm.TaskMockRunner(taskPath);

tr.setVariableName('system.collectionUri', 'https://dev.azure.com/transwap/');
tr.setVariableName('system.teamProjectId', '9092ba21-aeb2-4eae-bcce-ebf84c49bc9a');
tr.setVariableName('system.AccessToken', '6tjdibfcxpyrdve4h7dxfkh6fsxxhoqgue4gspge3v2o4qhrscdq');

tr.run();
