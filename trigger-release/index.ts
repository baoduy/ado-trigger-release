import { TaskResult, getInput, getVariables, setResult, setVariable } from 'vsts-task-lib/task';

import parsePattern from './parsePattern';
import replace from './replace';

export interface ReplacePattern {
  from: string;
  to: string;
}

async function run() {
  try {
    //Get variables
    const allVariables = getVariables();
    //short by name
    var sortedArray = allVariables.sort((obj1, obj2) => {
      if (obj1.name > obj2.name) {
        return 1;
      }

      if (obj1.name < obj2.name) {
        return -1;
      }
      return 0;
    });

    //input
    const replaces = getInput('replaceInput', true)
      .split('\n')
      .map(parsePattern);

    console.log('Replace patterns:', replaces);

    //Remane variables
    sortedArray.forEach(element => {
      const oldName = element.name;
      const newName = replace(element.name, replaces);

      if (oldName === newName) {
        //console.log(`${newName} was skipped as the new name is the same.`);
        return;
      }

      setVariable(newName, element.value, element.secret);
      console.log(`Rename ${oldName} => ${newName}`);
    });

    setResult(TaskResult.Succeeded, '', true);
  } catch (err) {
    setResult(TaskResult.Failed, err.message);
  }
}

run();
