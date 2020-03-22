import * as mock from 'azure-pipelines-task-lib/mock-run';
import * as path from 'path';

const taskPath = path.join(__dirname, '../remaneVariables', 'index.js');
console.log(taskPath);

const tmr = new mock.TaskMockRunner(taskPath);

// tmr.setVariableName('app-0-name', 'val1');
// tmr.setInput('replaceInput', '- => :');

tmr.run();
