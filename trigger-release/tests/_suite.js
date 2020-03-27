"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const ReleaseManager_1 = __importDefault(require("../ReleaseManager"));
const wildcard_match_1 = __importDefault(require("wildcard-match"));
const manager = new ReleaseManager_1.default({
    azureDevOpsUri: 'https://dev.azure.com/drunkcoding/',
    pat: '3plilhh2en44cdlskecwf33u77puiznqgqyejalqd5in6tx57tha',
    projectNameOrId: 'drunkcoding.net'
});
const releaseDefinition = 40;
describe('Test trigger-release', function () {
    // before(() => {});
    // after(() => {});
    // it('should succeed', function(done: MochaDone) {
    //   this.timeout(30000);
    //   const tp = path.join(__dirname, 'success.js');
    //   console.log('Test process file:', tp);
    //   const tr = new tsk.MockTestRunner(tp);
    //   tr.run();
    //   if (!tr.succeeded) console.error('Test error:', tr.errorIssues);
    //   assert.equal(tr.succeeded, true, 'should have succeeded');
    //   done();
    // });
    it('Test getReleaseDefinition func', function (done) {
        this.timeout(10000);
        manager.getReleaseDefinition(releaseDefinition).then(rs => {
            assert.equal(rs.id, releaseDefinition);
            //console.log(rs.lastRelease);
            done();
        });
    });
    it('Test reDeploy not found env func', function (done) {
        this.timeout(10000);
        manager.deploy(675, 'duy').catch(err => {
            assert.equal(err, 'The environment DUY is not found.');
            done();
        });
    });
    it('Test reDeploy dv1 func', function (done) {
        this.timeout(10000);
        manager.reDeploy(releaseDefinition, 'Nuget Internal Push').then(rs => {
            console.log(rs);
            done();
        });
    });
    it('Test wildcard-match dv1 func', function (done) {
        this.timeout(10000);
        assert.equal(wildcard_match_1.default('*-dv1', 'sg-dv1'), true, '*-dv1 should be matched with sg-dv1');
        done();
    });
});
