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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReleaseInterfaces_1 = require("azure-devops-node-api/interfaces/ReleaseInterfaces");
const azure_devops_node_api_1 = require("azure-devops-node-api");
const wildcard_match_1 = __importDefault(require("wildcard-match"));
class default_1 {
    constructor(options) {
        this.options = options;
    }
    getApi() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._api)
                return this._api;
            const authHandler = azure_devops_node_api_1.getPersonalAccessTokenHandler(this.options.pat);
            this._api = new azure_devops_node_api_1.WebApi(this.options.azureDevOpsUri, authHandler);
            const connData = yield this._api.connect();
            console.log(`Connected using: ${connData.authenticatedUser.customDisplayName ||
                connData.authenticatedUser.providerDisplayName}.`);
            return this._api;
        });
    }
    getReleaseApi() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._releaseApi)
                return this._releaseApi;
            const api = yield this.getApi();
            this._releaseApi = yield api.getReleaseApi();
            return this._releaseApi;
        });
    }
    getReleaseDefinition(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const api = yield this.getReleaseApi();
            return yield api.getReleaseDefinition(this.options.projectNameOrId, id);
        });
    }
    getRelease(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const api = yield this.getReleaseApi();
            const release = yield api.getRelease(this.options.projectNameOrId, id);
            return release;
        });
    }
    deploy(release, env) {
        return __awaiter(this, void 0, void 0, function* () {
            const api = yield this.getReleaseApi();
            const item = typeof release === 'number' ? yield this.getRelease(release) : release;
            if (!item)
                throw `The release ${release} is not found.`;
            //Find environment
            const environment = item.environments.find(e => e.name.toLowerCase() === env.toLowerCase() || wildcard_match_1.default(e.name.toLowerCase(), env.toLowerCase()));
            if (!environment)
                throw `The environment ${env.toUpperCase()} is not found.`;
            //Re-deploy the Release
            return api.updateReleaseEnvironment({ comment: `Re-deploy the ${environment.name}`, status: ReleaseInterfaces_1.EnvironmentStatus.InProgress }, this.options.projectNameOrId, item.id, environment.id);
        });
    }
    reDeploy(releaseDefinitionId, env) {
        return __awaiter(this, void 0, void 0, function* () {
            const definition = yield this.getReleaseDefinition(releaseDefinitionId);
            if (!definition)
                throw `Release defintion ${releaseDefinitionId} is not found.`;
            return this.deploy(definition.lastRelease.id, env);
        });
    }
}
exports.default = default_1;
