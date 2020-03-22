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
const task_1 = require("vsts-task-lib/task");
const parsePattern_1 = require("./parsePattern");
const replace_1 = require("./replace");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Get variables
            const allVariables = task_1.getVariables();
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
            const replaces = task_1.getInput('replaceInput', true)
                .split('\n')
                .map(parsePattern_1.default);
            console.log('Replace patterns:', replaces);
            //Remane variables
            sortedArray.forEach(element => {
                const oldName = element.name;
                const newName = replace_1.default(element.name, replaces);
                if (oldName === newName) {
                    //console.log(`${newName} was skipped as the new name is the same.`);
                    return;
                }
                task_1.setVariable(newName, element.value, element.secret);
                console.log(`Rename ${oldName} => ${newName}`);
            });
            task_1.setResult(task_1.TaskResult.Succeeded, '', true);
        }
        catch (err) {
            task_1.setResult(task_1.TaskResult.Failed, err.message);
        }
    });
}
run();
