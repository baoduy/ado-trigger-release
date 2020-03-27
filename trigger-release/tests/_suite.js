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
const micromatch_1 = __importDefault(require("micromatch"));
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
    it('Test micromatch func', function (done) {
        this.timeout(10000);
        assert.equal(micromatch_1.default.isMatch('sg-dv1', '*dv1'), true, '*dv1 should matched with sg-dv1');
        assert.equal(micromatch_1.default.isMatch('sg-dv1', '*-dv1'), true, '*-dv1 should matched with sg-dv1');
        assert.equal(micromatch_1.default.isMatch('sg-dv1', '*dv*'), true, '*-dv1 should matched with sg-dv1');
        assert.equal(micromatch_1.default.isMatch('sg-dv1', 'dv1*'), false, 'dv1* should not matched with sg-dv1');
        done();
    });
});
